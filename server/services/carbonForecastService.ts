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
        console.error('Error fetching forecast:', error);
        
        // Return fallback data if Python service fails
        return {
          forecast: [],
          cleanest_periods: [],
          last_updated: null,
          error: 'Forecasting service temporarily unavailable'
        };
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