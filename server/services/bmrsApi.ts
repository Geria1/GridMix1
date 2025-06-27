interface BMRSDemandResponse {
  settlementDate: string;
  settlementPeriod: number;
  totalDemand: number;
  publishingPeriodCommencingTime: string;
}

interface BMRSGenerationResponse {
  settlementDate: string;
  fuelType: string;
  quantity: number;
  activeFlag: string;
}

export class BMRSApiService {
  private baseUrl = 'https://bmrs.elexon.co.uk/api/v1';
  private apiKey = process.env.BMRS_API_KEY;

  constructor() {
    if (!this.apiKey) {
      console.warn('BMRS_API_KEY not found - BMRS API calls will fail');
    }
  }

  private getAuthHeaders() {
    if (!this.apiKey) {
      throw new Error('BMRS API key not configured');
    }
    return {
      'Authorization': `Basic ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async getActualDemand(from: string, to: string): Promise<BMRSDemandResponse[]> {
    try {
      const url = `${this.baseUrl}/demand/actual/total?from=${from}&to=${to}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`BMRS Demand API error: ${response.status} ${response.statusText}`);
      }

      const data: BMRSDemandResponse[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching BMRS demand data:', error);
      throw error;
    }
  }

  async getActualGenerationByType(settlementDate: string): Promise<BMRSGenerationResponse[]> {
    try {
      const url = `${this.baseUrl}/generation/actual/per-type/day-total?settlementDate=${settlementDate}`;
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`BMRS Generation API error: ${response.status} ${response.statusText}`);
      }

      const data: BMRSGenerationResponse[] = await response.json();
      return data.filter(item => item.activeFlag === 'Y');
    } catch (error) {
      console.error('Error fetching BMRS generation data:', error);
      throw error;
    }
  }

  async getCurrentDemand(): Promise<number> {
    try {
      // Get demand for the last 2 hours to ensure we have recent data
      const to = new Date();
      const from = new Date(to.getTime() - 2 * 60 * 60 * 1000);
      
      const demandData = await this.getActualDemand(
        from.toISOString(),
        to.toISOString()
      );

      if (demandData.length === 0) {
        throw new Error('No recent demand data available');
      }

      // Return the most recent demand value
      const latestDemand = demandData[demandData.length - 1];
      return latestDemand.totalDemand;
    } catch (error) {
      console.error('Error getting current demand:', error);
      throw error;
    }
  }

  async getTodaysGenerationMix(): Promise<Record<string, number>> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const generationData = await this.getActualGenerationByType(today);

      if (generationData.length === 0) {
        // Try yesterday's data if today's is not available yet
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const yesterdayData = await this.getActualGenerationByType(yesterdayStr);
        
        if (yesterdayData.length === 0) {
          throw new Error('No generation data available for today or yesterday');
        }
        
        return this.normalizeGenerationData(yesterdayData);
      }

      return this.normalizeGenerationData(generationData);
    } catch (error) {
      console.error('Error getting today\'s generation mix:', error);
      throw error;
    }
  }

  public normalizeGenerationData(data: BMRSGenerationResponse[]): Record<string, number> {
    // Calculate total generation to get percentages
    const totalGeneration = data.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalGeneration === 0) {
      throw new Error('Total generation is zero - invalid data');
    }

    // Map BMRS fuel types to our standardized names
    const fuelTypeMap: Record<string, string> = {
      'CCGT': 'gas',
      'OCGT': 'gas',
      'OIL': 'other',
      'COAL': 'coal',
      'NUCLEAR': 'nuclear',
      'WIND': 'wind',
      'PS': 'hydro', // Pumped Storage
      'NPSHYD': 'hydro', // Non-Pumped Storage Hydro
      'HYDRO': 'hydro',
      'BIOMASS': 'biomass',
      'OTHER': 'other',
      'SOLAR': 'solar',
      'INTFR': 'imports', // Interconnector France
      'INTIRL': 'imports', // Interconnector Ireland
      'INTNED': 'imports', // Interconnector Netherlands
      'INTBEL': 'imports', // Interconnector Belgium
      'INTNOR': 'imports', // Interconnector Norway
      'INTEW': 'imports', // East-West Interconnector
      'INTNEM': 'imports', // NEMO Interconnector
      'INTELEC': 'imports', // ElecLink
      'INTVIK': 'imports', // Viking Link
    };

    const normalizedMix: Record<string, number> = {
      gas: 0,
      coal: 0,
      nuclear: 0,
      wind: 0,
      solar: 0,
      hydro: 0,
      biomass: 0,
      imports: 0,
      other: 0,
    };

    // Aggregate by normalized fuel type and convert to percentages
    data.forEach(item => {
      const normalizedType = fuelTypeMap[item.fuelType] || 'other';
      const percentage = (item.quantity / totalGeneration) * 100;
      normalizedMix[normalizedType] += percentage;
    });

    // Round to 1 decimal place
    Object.keys(normalizedMix).forEach(key => {
      normalizedMix[key] = Math.round(normalizedMix[key] * 10) / 10;
    });

    return normalizedMix;
  }

  async getHistoricalDemand(hours: number): Promise<Array<{ time: string; demand: number }>> {
    try {
      const to = new Date();
      const from = new Date(to.getTime() - hours * 60 * 60 * 1000);
      
      const demandData = await this.getActualDemand(
        from.toISOString(),
        to.toISOString()
      );

      return demandData.map(item => ({
        time: item.publishingPeriodCommencingTime,
        demand: item.totalDemand,
      }));
    } catch (error) {
      console.error('Error getting historical demand:', error);
      throw error;
    }
  }

  // Get grid frequency - this would need a different endpoint or service
  // For now, we'll simulate realistic UK grid frequency around 50Hz
  getGridFrequency(): number {
    // UK grid frequency should be very close to 50Hz
    // Real implementation would use National Grid ESO frequency data
    return 50.0 + (Math.random() - 0.5) * 0.1;
  }
}

export const bmrsApiService = new BMRSApiService();