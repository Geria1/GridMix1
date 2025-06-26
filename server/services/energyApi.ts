interface CarbonIntensityResponse {
  data: Array<{
    from: string;
    to: string;
    intensity: {
      forecast: number;
      actual: number;
      index: string;
    };
  }>;
}

interface GenerationMixResponse {
  data: Array<{
    from: string;
    to: string;
    generationmix: Array<{
      fuel: string;
      perc: number;
    }>;
  }>;
}

interface SystemDataResponse {
  data: Array<{
    from: string;
    to: string;
    demand: {
      actual: number;
      forecast: number;
    };
  }>;
}

export class EnergyApiService {
  private baseUrl = 'https://api.carbonintensity.org.uk';
  
  async getCurrentCarbonIntensity(): Promise<number> {
    try {
      const response = await fetch(`${this.baseUrl}/intensity`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CarbonIntensityResponse = await response.json();
      return data.data[0]?.intensity?.actual || data.data[0]?.intensity?.forecast || 0;
    } catch (error) {
      console.error('Error fetching carbon intensity:', error);
      throw error;
    }
  }

  async getGenerationMix(): Promise<Record<string, number>> {
    try {
      const response = await fetch(`${this.baseUrl}/generation`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: GenerationMixResponse = await response.json();
      const mix: Record<string, number> = {};
      
      if (data.data[0]?.generationmix) {
        data.data[0].generationmix.forEach(item => {
          // Map API fuel types to our standardized names
          const fuelMap: Record<string, string> = {
            'gas': 'gas',
            'coal': 'coal',
            'nuclear': 'nuclear',
            'wind': 'wind',
            'solar': 'solar',
            'hydro': 'hydro',
            'biomass': 'biomass',
            'imports': 'imports',
            'other': 'other'
          };
          
          const mappedFuel = fuelMap[item.fuel.toLowerCase()] || 'other';
          mix[mappedFuel] = (mix[mappedFuel] || 0) + item.perc;
        });
      }
      
      return mix;
    } catch (error) {
      console.error('Error fetching generation mix:', error);
      throw error;
    }
  }

  async getDemandData(): Promise<number> {
    try {
      const response = await fetch(`${this.baseUrl}/intensity`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Note: The Carbon Intensity API doesn't provide demand data directly
      // In a real implementation, you'd use the BMRS API or National Grid ESO API
      // For now, we'll estimate based on typical UK demand patterns
      const hour = new Date().getHours();
      const baseDemand = 30000; // 30 GW base demand
      const peakMultiplier = hour >= 17 && hour <= 20 ? 1.4 : 
                           hour >= 7 && hour <= 9 ? 1.3 :
                           hour >= 10 && hour <= 16 ? 1.2 : 1.0;
      
      return Math.round(baseDemand * peakMultiplier);
    } catch (error) {
      console.error('Error fetching demand data:', error);
      throw error;
    }
  }

  async get24HourData(): Promise<Array<{ time: string; carbonIntensity: number; mix: Record<string, number> }>> {
    try {
      const to = new Date();
      const from = new Date(to.getTime() - 24 * 60 * 60 * 1000);
      
      const fromStr = from.toISOString();
      const toStr = to.toISOString();
      
      const [intensityResponse, mixResponse] = await Promise.all([
        fetch(`${this.baseUrl}/intensity/${fromStr}/${toStr}`),
        fetch(`${this.baseUrl}/generation/${fromStr}/${toStr}`)
      ]);

      if (!intensityResponse.ok || !mixResponse.ok) {
        throw new Error('Failed to fetch historical data');
      }

      const intensityData: CarbonIntensityResponse = await intensityResponse.json();
      const mixData: GenerationMixResponse = await mixResponse.json();

      const result: Array<{ time: string; carbonIntensity: number; mix: Record<string, number> }> = [];
      
      // Combine the data points
      intensityData.data.forEach((intensityPoint, index) => {
        const mixPoint = mixData.data[index];
        if (mixPoint) {
          const mix: Record<string, number> = {};
          mixPoint.generationmix.forEach(item => {
            const fuelMap: Record<string, string> = {
              'gas': 'gas',
              'coal': 'coal',
              'nuclear': 'nuclear',
              'wind': 'wind',
              'solar': 'solar',
              'hydro': 'hydro',
              'biomass': 'biomass',
              'imports': 'imports',
              'other': 'other'
            };
            
            const mappedFuel = fuelMap[item.fuel.toLowerCase()] || 'other';
            mix[mappedFuel] = (mix[mappedFuel] || 0) + item.perc;
          });

          result.push({
            time: intensityPoint.from,
            carbonIntensity: intensityPoint.intensity.actual || intensityPoint.intensity.forecast,
            mix
          });
        }
      });

      return result;
    } catch (error) {
      console.error('Error fetching 24-hour data:', error);
      throw error;
    }
  }

  getGridFrequency(): number {
    // Grid frequency is typically around 50 Hz in the UK
    // In a real implementation, this would come from National Grid ESO
    return 49.98 + (Math.random() - 0.5) * 0.1;
  }

  getRegionalData() {
    // This would come from detailed regional APIs in a real implementation
    return {
      england: {
        nuclear: 6432,
        gas: 4200,
      },
      scotland: {
        wind: 8245,
        hydro: 1200,
      },
      wales: {
        wind: 800,
      },
    };
  }

  getSystemStatus() {
    return {
      gridStability: 'Stable',
      netImports: 2156,
      reserveMargin: 18.2,
      apiStatus: 'Operational',
    };
  }
}

export const energyApiService = new EnergyApiService();
