import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

interface ForecastDataPoint {
  timestamp: string;
  forecast: number;
  upper: number;
  lower: number;
}

interface CleanestPeriod {
  start_time: string;
  end_time: string;
  avg_intensity: number;
  start_hour: string;
  end_hour: string;
}

interface CarbonForecastData {
  forecast: ForecastDataPoint[];
  cleanest_periods: CleanestPeriod[];
  last_updated: string | null;
  next_update?: string;
  error?: string;
}

export class CarbonForecastService {
  private pythonScriptPath: string;
  private cache: CarbonForecastData | null = null;
  private lastFetch: Date | null = null;
  private readonly cacheTimeout = 30 * 60 * 1000; // 30 minutes

  constructor() {
    this.pythonScriptPath = path.join(process.cwd(), 'server/services/carbonForecastService.py');
    
    // Start background updates
    this.initializeForecasting();
  }

  private async initializeForecasting(): Promise<void> {
    try {
      // Try to trigger initial forecast generation
      await this.updateForecast();
      
      // Set up periodic updates every 6 hours
      setInterval(() => {
        this.updateForecast().catch(err => 
          console.error('Background forecast update failed:', err)
        );
      }, 6 * 60 * 60 * 1000); // 6 hours
      
      console.log('✓ Carbon intensity forecasting service initialized');
    } catch (error) {
      console.error('Failed to initialize forecasting service:', error);
    }
  }

  private async runPythonScript(command?: string): Promise<CarbonForecastData> {
    return new Promise((resolve, reject) => {
      const args = command ? [this.pythonScriptPath, command] : [this.pythonScriptPath];
      const pythonProcess = spawn('python3', args, {
        cwd: process.cwd(),
        env: { ...process.env, PYTHONPATH: process.cwd() }
      });

      let stdout = '';
      let stderr = '';

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          try {
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (parseError) {
            reject(new Error(`Failed to parse Python output: ${parseError}`));
          }
        } else {
          reject(new Error(`Python script failed (code ${code}): ${stderr}`));
        }
      });

      pythonProcess.on('error', (error) => {
        reject(new Error(`Failed to execute Python script: ${error.message}`));
      });
    });
  }

  // Generate fallback forecast data for demo/development
  private generateFallbackForecast(): CarbonForecastData {
    const forecast: ForecastDataPoint[] = [];
    const now = new Date();
    
    // Generate 72 hours of realistic-looking forecast data
    for (let i = 0; i < 72; i++) {
      const timestamp = new Date(now.getTime() + i * 60 * 60 * 1000);
      const hour = timestamp.getHours();
      
      // Base carbon intensity with realistic patterns
      let baseIntensity = 200;
      
      // Daily cycle - higher during peak hours, lower at night and during high renewable periods
      const dailyCycle = 50 * Math.sin(2 * Math.PI * (hour - 6) / 24);
      
      // Weekly cycle - slightly higher on weekdays
      const weekday = timestamp.getDay();
      const weeklyCycle = weekday >= 1 && weekday <= 5 ? 20 : 0;
      
      // Random variation
      const randomVariation = (Math.random() - 0.5) * 60;
      
      // Wind/solar favorable hours (lower intensity)
      const renewableFactor = hour >= 10 && hour <= 16 ? -40 : 0; // Midday solar
      const windFactor = Math.random() > 0.7 ? -30 : 0; // Random wind periods
      
      const forecast_value = Math.max(50, Math.min(400, 
        baseIntensity + dailyCycle + weeklyCycle + randomVariation + renewableFactor + windFactor
      ));
      
      forecast.push({
        timestamp: timestamp.toISOString(),
        forecast: Math.round(forecast_value),
        upper: Math.round(forecast_value + 30 + Math.random() * 20),
        lower: Math.round(Math.max(30, forecast_value - 30 - Math.random() * 20))
      });
    }
    
    // Generate cleanest periods
    const cleanest_periods: CleanestPeriod[] = [];
    for (let i = 0; i < forecast.length - 2; i++) {
      const window = forecast.slice(i, i + 3);
      const avg = window.reduce((sum, p) => sum + p.forecast, 0) / 3;
      
      const startTime = new Date(window[0].timestamp);
      const endTime = new Date(window[2].timestamp);
      
      cleanest_periods.push({
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        avg_intensity: Math.round(avg * 10) / 10,
        start_hour: startTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        end_hour: endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      });
    }
    
    // Sort by intensity and take top 3
    cleanest_periods.sort((a, b) => a.avg_intensity - b.avg_intensity);
    
    return {
      forecast,
      cleanest_periods: cleanest_periods.slice(0, 3),
      last_updated: now.toISOString(),
      next_update: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString()
    };
  }

  async updateForecast(): Promise<boolean> {
    try {
      console.log('Updating carbon intensity forecast...');
      const result = await this.runPythonScript('update');
      
      if ('success' in result && result.success) {
        // After successful update, fetch the latest forecast
        this.cache = await this.runPythonScript();
        this.lastFetch = new Date();
        console.log('✓ Carbon forecast updated successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating forecast:', error);
      return false;
    }
  }

  async getForecast(): Promise<CarbonForecastData> {
    // Check if we need to refresh cache
    if (!this.cache || 
        !this.lastFetch || 
        Date.now() - this.lastFetch.getTime() > this.cacheTimeout) {
      
      try {
        this.cache = await this.runPythonScript();
        this.lastFetch = new Date();
      } catch (error) {
        console.error('Python forecasting service unavailable, using fallback data');
        
        // Use fallback forecast data for demo purposes
        this.cache = this.generateFallbackForecast();
        this.lastFetch = new Date();
      }
    }

    return this.cache;
  }

  async getCleanestPeriods(): Promise<CleanestPeriod[]> {
    const forecastData = await this.getForecast();
    return forecastData.cleanest_periods || [];
  }

  async getForecastSummary(): Promise<{
    next24Hours: { min: number; max: number; avg: number };
    next72Hours: { min: number; max: number; avg: number };
    cleanestPeriodToday: CleanestPeriod | null;
  }> {
    const forecastData = await this.getForecast();
    const forecast = forecastData.forecast || [];
    
    if (forecast.length === 0) {
      return {
        next24Hours: { min: 0, max: 0, avg: 0 },
        next72Hours: { min: 0, max: 0, avg: 0 },
        cleanestPeriodToday: null
      };
    }

    // Calculate stats for next 24 hours
    const next24 = forecast.slice(0, 24);
    const values24 = next24.map(d => d.forecast);
    
    // Calculate stats for next 72 hours
    const values72 = forecast.map(d => d.forecast);
    
    // Find cleanest period for today
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const cleanestToday = forecastData.cleanest_periods?.find(period => 
      new Date(period.start_time) <= today
    ) || null;

    return {
      next24Hours: {
        min: Math.round(Math.min(...values24)),
        max: Math.round(Math.max(...values24)),
        avg: Math.round(values24.reduce((a, b) => a + b, 0) / values24.length)
      },
      next72Hours: {
        min: Math.round(Math.min(...values72)),
        max: Math.round(Math.max(...values72)),
        avg: Math.round(values72.reduce((a, b) => a + b, 0) / values72.length)
      },
      cleanestPeriodToday: cleanestToday
    };
  }

  // Method to check service health
  async getServiceStatus(): Promise<{
    isAvailable: boolean;
    lastUpdate: string | null;
    nextUpdate: string | null;
    dataPoints: number;
  }> {
    try {
      const forecastData = await this.getForecast();
      
      return {
        isAvailable: !forecastData.error,
        lastUpdate: forecastData.last_updated,
        nextUpdate: forecastData.next_update || null,
        dataPoints: forecastData.forecast?.length || 0
      };
    } catch (error) {
      return {
        isAvailable: false,
        lastUpdate: null,
        nextUpdate: null,
        dataPoints: 0
      };
    }
  }
}

export const carbonForecastService = new CarbonForecastService();