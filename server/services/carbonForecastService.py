#!/usr/bin/env python3

import json
import requests
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import asyncio
import threading
import time
from typing import Dict, List, Tuple, Optional
from prophet import Prophet
import warnings
warnings.filterwarnings('ignore')

class CarbonForecastService:
    def __init__(self):
        self.base_url = 'https://api.carbonintensity.org.uk'
        self.forecast_cache = {}
        self.last_update = None
        self.update_interval = 6 * 3600  # 6 hours in seconds
        self.forecast_horizon = 72  # hours
        
    def fetch_historical_data(self, days_back: int = 30) -> pd.DataFrame:
        """Fetch historical carbon intensity data for training."""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days_back)
        
        # Format dates for API
        start_str = start_date.strftime('%Y-%m-%dT%H:%MZ')
        end_str = end_date.strftime('%Y-%m-%dT%H:%MZ')
        
        try:
            url = f"{self.base_url}/intensity/{start_str}/{end_str}"
            response = requests.get(url, timeout=30)
            
            if response.status_code == 200:
                data = response.json()['data']
                
                records = []
                for item in data:
                    if item['intensity']['actual'] is not None:
                        records.append({
                            'ds': pd.to_datetime(item['from']),
                            'y': item['intensity']['actual'],
                            'forecast': item['intensity']['forecast'] if item['intensity']['forecast'] else item['intensity']['actual']
                        })
                
                df = pd.DataFrame(records)
                if len(df) > 0:
                    # Add time-based features
                    df['hour'] = df['ds'].dt.hour
                    df['day_of_week'] = df['ds'].dt.dayofweek
                    df['month'] = df['ds'].dt.month
                    df['is_weekend'] = (df['day_of_week'] >= 5).astype(int)
                    
                return df
                
        except Exception as e:
            pass
            
        return pd.DataFrame()
    
    def get_weather_features(self, lat: float = 51.5074, lon: float = -0.1278) -> Dict:
        """Get weather data that affects renewable generation (simplified)."""
        try:
            # For demo purposes, we'll use basic weather patterns
            # In production, you'd integrate with OpenWeatherMap or similar
            current_hour = datetime.now().hour
            
            # Simulate wind patterns (higher at night and winter)
            wind_factor = 0.7 + 0.3 * np.sin(2 * np.pi * current_hour / 24)
            
            # Simulate solar patterns (peak around midday)
            solar_factor = max(0, np.sin(np.pi * (current_hour - 6) / 12))
            
            return {
                'wind_factor': wind_factor,
                'solar_factor': solar_factor,
                'temperature': 15 + 10 * np.sin(2 * np.pi * current_hour / 24)
            }
            
        except Exception as e:
            return {'wind_factor': 0.5, 'solar_factor': 0.3, 'temperature': 15}
    
    def train_forecast_model(self, df: pd.DataFrame) -> Prophet:
        """Train Prophet model with carbon intensity data."""
        if len(df) < 48:  # Need at least 48 hours of data
            raise ValueError("Insufficient historical data for forecasting")
        
        # Prepare data for Prophet
        prophet_df = df[['ds', 'y']].copy()
        
        # Add regressors for time-based patterns
        prophet_df['hour'] = df['hour']
        prophet_df['day_of_week'] = df['day_of_week']
        prophet_df['is_weekend'] = df['is_weekend']
        
        # Initialize Prophet model
        model = Prophet(
            changepoint_prior_scale=0.05,
            seasonality_prior_scale=10,
            holidays_prior_scale=10,
            daily_seasonality=True,
            weekly_seasonality=True,
            yearly_seasonality=False,
            interval_width=0.8
        )
        
        # Add custom regressors
        model.add_regressor('hour')
        model.add_regressor('day_of_week')
        model.add_regressor('is_weekend')
        
        # Fit the model
        model.fit(prophet_df)
        
        return model
    
    def generate_forecast(self, model: Prophet, periods: int = 72) -> pd.DataFrame:
        """Generate forecast for the next N hours."""
        # Create future dataframe
        future = model.make_future_dataframe(periods=periods, freq='H')
        
        # Add regressor values for future periods
        future['hour'] = future['ds'].dt.hour
        future['day_of_week'] = future['ds'].dt.dayofweek
        future['is_weekend'] = (future['day_of_week'] >= 5).astype(int)
        
        # Generate forecast
        forecast = model.predict(future)
        
        # Filter to only future periods
        future_forecast = forecast.tail(periods).copy()
        
        # Ensure non-negative values and reasonable bounds
        future_forecast['yhat'] = np.clip(future_forecast['yhat'], 50, 800)
        future_forecast['yhat_lower'] = np.clip(future_forecast['yhat_lower'], 30, 750)
        future_forecast['yhat_upper'] = np.clip(future_forecast['yhat_upper'], 70, 850)
        
        return future_forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
    
    def find_cleanest_periods(self, forecast_df: pd.DataFrame, window_hours: int = 3) -> List[Dict]:
        """Find the cleanest N-hour periods in the forecast."""
        if len(forecast_df) < window_hours:
            return []
        
        periods = []
        for i in range(len(forecast_df) - window_hours + 1):
            window = forecast_df.iloc[i:i + window_hours]
            avg_intensity = window['yhat'].mean()
            
            periods.append({
                'start_time': window.iloc[0]['ds'],
                'end_time': window.iloc[-1]['ds'],
                'avg_intensity': round(avg_intensity, 1),
                'start_hour': window.iloc[0]['ds'].strftime('%I%p').lower().replace('0', ''),
                'end_hour': window.iloc[-1]['ds'].strftime('%I%p').lower().replace('0', '')
            })
        
        # Sort by average intensity (cleanest first)
        periods.sort(key=lambda x: x['avg_intensity'])
        
        return periods[:3]  # Return top 3 cleanest periods
    
    def update_forecast(self):
        """Update the carbon intensity forecast."""
        try:
            # Fetch historical data
            historical_df = self.fetch_historical_data(days_back=30)
            
            if len(historical_df) < 48:
                return False
            
            # Train model
            model = self.train_forecast_model(historical_df)
            
            # Generate forecast
            forecast_df = self.generate_forecast(model, self.forecast_horizon)
            
            # Find cleanest periods
            cleanest_periods = self.find_cleanest_periods(forecast_df)
            
            # Prepare forecast data for API
            forecast_data = []
            for _, row in forecast_df.iterrows():
                forecast_data.append({
                    'timestamp': row['ds'].isoformat(),
                    'forecast': round(float(row['yhat']), 1),
                    'upper': round(float(row['yhat_upper']), 1),
                    'lower': round(float(row['yhat_lower']), 1)
                })
            
            # Cache the results
            self.forecast_cache = {
                'forecast': forecast_data,
                'cleanest_periods': cleanest_periods,
                'last_updated': datetime.now().isoformat(),
                'next_update': (datetime.now() + timedelta(seconds=self.update_interval)).isoformat()
            }
            
            self.last_update = datetime.now()
            
            # Save to file for persistence
            with open('/tmp/carbon_forecast.json', 'w') as f:
                json.dump(self.forecast_cache, f, indent=2)
            
            return True
            
        except Exception as e:
            return False
    
    def get_forecast(self) -> Dict:
        """Get the current forecast data."""
        # Check if we need to update
        if (self.last_update is None or 
            datetime.now() - self.last_update > timedelta(seconds=self.update_interval)):
            self.update_forecast()
        
        # Try to load from file if cache is empty
        if not self.forecast_cache:
            try:
                with open('/tmp/carbon_forecast.json', 'r') as f:
                    self.forecast_cache = json.load(f)
            except FileNotFoundError:
                # Generate initial forecast
                self.update_forecast()
        
        return self.forecast_cache
    
    def start_background_updates(self):
        """Start background thread for periodic updates."""
        def update_loop():
            while True:
                try:
                    self.update_forecast()
                    time.sleep(self.update_interval)
                except Exception as e:
                    print(f"Background update error: {e}")
                    time.sleep(3600)  # Wait 1 hour on error
        
        thread = threading.Thread(target=update_loop, daemon=True)
        thread.start()

# Global instance
carbon_forecast_service = CarbonForecastService()

def get_carbon_forecast():
    """Export function for use in Node.js via subprocess."""
    try:
        forecast_data = carbon_forecast_service.get_forecast()
        return json.dumps(forecast_data)
    except Exception as e:
        error_response = {
            'error': str(e),
            'forecast': [],
            'cleanest_periods': [],
            'last_updated': None
        }
        return json.dumps(error_response)

if __name__ == "__main__":
    # CLI interface for testing
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "update":
        service = CarbonForecastService()
        success = service.update_forecast()
        print(json.dumps({"success": success}))
    else:
        print(get_carbon_forecast())