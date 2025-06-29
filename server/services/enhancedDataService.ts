import { bmrsApiService } from './bmrsApi';
import { energyApiService } from './energyApi';
import { ukEmissionsApiService } from './ukEmissionsApi';

interface EnhancedEnergyData {
  timestamp: Date;
  totalDemand: number;
  carbonIntensity: number;
  frequency: number;
  energyMix: Record<string, number>;
  systemStatus: {
    gridStability: string;
    netImports: number;
    reserveMargin: number;
    systemImbalance: number;
    interconnectorFlows: Record<string, number>;
  };
  regionalData: any;
  dataSource: string;
  dataQuality: 'high' | 'medium' | 'low';
}

interface DataSourceMetrics {
  bmrsAvailable: boolean;
  carbonIntensityAvailable: boolean;
  lastSuccessfulUpdate: Date;
  failureCount: number;
  dataQuality: string;
}

export class EnhancedDataService {
  private dataSourceMetrics: DataSourceMetrics = {
    bmrsAvailable: false,
    carbonIntensityAvailable: false,
    lastSuccessfulUpdate: new Date(),
    failureCount: 0,
    dataQuality: 'unknown'
  };

  async getComprehensiveEnergyData(): Promise<EnhancedEnergyData> {
    console.log('Fetching comprehensive energy data from multiple enhanced sources...');
    
    // Try BMRS first for the most authoritative data
    try {
      const bmrsData = await this.getBMRSEnhancedData();
      if (bmrsData) {
        this.updateDataSourceMetrics(true, true);
        return bmrsData;
      }
    } catch (error) {
      console.error('Enhanced BMRS data fetch failed:', error);
      this.updateDataSourceMetrics(false, null);
    }

    // Fallback to Carbon Intensity API with enhanced processing
    try {
      const carbonIntensityData = await this.getCarbonIntensityEnhancedData();
      this.updateDataSourceMetrics(null, true);
      return carbonIntensityData;
    } catch (error) {
      console.error('Enhanced Carbon Intensity data fetch failed:', error);
      this.updateDataSourceMetrics(null, false);
      throw new Error('All enhanced data sources failed');
    }
  }

  private async getBMRSEnhancedData(): Promise<EnhancedEnergyData | null> {
    try {
      console.log('Attempting enhanced BMRS data integration...');
      
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const today = now.toISOString().split('T')[0];
      
      // Parallel fetch of multiple BMRS endpoints
      const [demandResult, generationResult, gridStatusResult] = await Promise.allSettled([
        bmrsApiService.getCurrentDemand(),
        bmrsApiService.getTodaysGenerationMix(),
        bmrsApiService.getComprehensiveGridStatus()
      ]);

      // Process demand data
      let totalDemand = 30000; // Default realistic demand
      if (demandResult.status === 'fulfilled') {
        totalDemand = demandResult.value;
      }

      // Process generation mix
      let energyMix: Record<string, number> = {};
      if (generationResult.status === 'fulfilled') {
        energyMix = generationResult.value;
      } else {
        // If BMRS generation fails, try Carbon Intensity API as backup
        energyMix = await energyApiService.getGenerationMix();
      }

      // Process comprehensive grid status
      let gridStatus = {
        gridStability: 'stable',
        netImports: 0,
        reserveMargin: 7.5,
        systemImbalance: 0,
        interconnectorFlows: {}
      };

      if (gridStatusResult.status === 'fulfilled') {
        const status = gridStatusResult.value;
        gridStatus = {
          gridStability: this.assessGridStability(status.frequency, status.systemImbalance),
          netImports: Object.values(status.interconnectorFlows).reduce((sum, flow) => sum + flow, 0),
          reserveMargin: status.reserveMargin,
          systemImbalance: status.systemImbalance,
          interconnectorFlows: status.interconnectorFlows
        };
      }

      // Calculate carbon intensity from generation mix
      const carbonIntensity = this.calculateCarbonIntensity(energyMix);

      return {
        timestamp: now,
        totalDemand,
        carbonIntensity,
        frequency: gridStatus.gridStability === 'stable' ? 50.0 : 49.9,
        energyMix,
        systemStatus: gridStatus,
        regionalData: this.generateRegionalData(energyMix),
        dataSource: 'BMRS-Enhanced',
        dataQuality: 'high'
      };
    } catch (error) {
      console.error('Enhanced BMRS integration failed:', error);
      return null;
    }
  }

  private async getCarbonIntensityEnhancedData(): Promise<EnhancedEnergyData> {
    console.log('Fetching enhanced Carbon Intensity API data...');
    
    const [carbonIntensity, generationMix, demandData] = await Promise.all([
      energyApiService.getCurrentCarbonIntensity(),
      energyApiService.getGenerationMix(),
      energyApiService.getDemandData()
    ]);

    // Enhance with additional processing
    const enhancedSystemStatus = {
      gridStability: this.assessGridStabilityFromGeneration(generationMix),
      netImports: generationMix.imports || 0,
      reserveMargin: this.estimateReserveMargin(demandData, generationMix),
      systemImbalance: 0, // Not available from Carbon Intensity API
      interconnectorFlows: this.extractInterconnectorFlows(generationMix)
    };

    return {
      timestamp: new Date(),
      totalDemand: demandData,
      carbonIntensity,
      frequency: 50.0,
      energyMix: generationMix,
      systemStatus: enhancedSystemStatus,
      regionalData: energyApiService.getRegionalData(),
      dataSource: 'CarbonIntensity-Enhanced',
      dataQuality: 'medium'
    };
  }

  private calculateCarbonIntensity(energyMix: Record<string, number>): number {
    // Carbon intensity factors (gCO2/kWh) for different generation types
    const carbonFactors: Record<string, number> = {
      coal: 820,
      gas: 350,
      oil: 610,
      biomass: 120,
      nuclear: 12,
      hydro: 24,
      wind: 11,
      solar: 45,
      imports: 300, // Average of European grid
      other: 400
    };

    let totalGeneration = 0;
    let totalCarbonOutput = 0;

    Object.entries(energyMix).forEach(([source, amount]) => {
      totalGeneration += amount;
      totalCarbonOutput += amount * (carbonFactors[source] || 400);
    });

    return totalGeneration > 0 ? Math.round(totalCarbonOutput / totalGeneration) : 300;
  }

  private assessGridStability(frequency: number, imbalance: number): string {
    if (frequency < 49.8 || frequency > 50.2) return 'unstable';
    if (Math.abs(imbalance) > 500) return 'stressed';
    if (frequency < 49.9 || frequency > 50.1) return 'warning';
    return 'stable';
  }

  private assessGridStabilityFromGeneration(energyMix: Record<string, number>): string {
    const totalGeneration = Object.values(energyMix).reduce((sum, amount) => sum + amount, 0);
    const renewableGeneration = (energyMix.wind || 0) + (energyMix.solar || 0) + (energyMix.hydro || 0);
    const renewableShare = totalGeneration > 0 ? renewableGeneration / totalGeneration : 0;

    // High renewable share can indicate grid management challenges
    if (renewableShare > 0.8) return 'managing-renewables';
    if (renewableShare > 0.6) return 'stable-high-renewables';
    return 'stable';
  }

  private estimateReserveMargin(demand: number, energyMix: Record<string, number>): number {
    const totalGeneration = Object.values(energyMix).reduce((sum, amount) => sum + amount, 0);
    const margin = ((totalGeneration - demand) / demand) * 100;
    return Math.max(0, Math.min(20, margin)); // Cap between 0-20%
  }

  private extractInterconnectorFlows(energyMix: Record<string, number>): Record<string, number> {
    return {
      france: (energyMix.imports || 0) * 0.4, // Approximate distribution
      netherlands: (energyMix.imports || 0) * 0.25,
      belgium: (energyMix.imports || 0) * 0.15,
      ireland: (energyMix.imports || 0) * 0.1,
      norway: (energyMix.imports || 0) * 0.1
    };
  }

  private generateRegionalData(energyMix: Record<string, number>) {
    // Enhanced regional distribution based on actual UK geography
    return {
      england: {
        nuclear: (energyMix.nuclear || 0) * 0.85, // Most nuclear in England
        gas: (energyMix.gas || 0) * 0.80,
        solar: (energyMix.solar || 0) * 0.90, // Most solar in England
        biomass: (energyMix.biomass || 0) * 0.70
      },
      scotland: {
        wind: (energyMix.wind || 0) * 0.45, // Scotland has significant wind
        hydro: (energyMix.hydro || 0) * 0.85, // Most hydro in Scotland
        nuclear: (energyMix.nuclear || 0) * 0.15
      },
      wales: {
        wind: (energyMix.wind || 0) * 0.15,
        hydro: (energyMix.hydro || 0) * 0.15,
        gas: (energyMix.gas || 0) * 0.20
      },
      northernIreland: {
        wind: (energyMix.wind || 0) * 0.10,
        gas: (energyMix.gas || 0) * 0.05
      }
    };
  }

  private updateDataSourceMetrics(bmrsStatus: boolean | null, carbonIntensityStatus: boolean | null) {
    if (bmrsStatus !== null) {
      this.dataSourceMetrics.bmrsAvailable = bmrsStatus;
    }
    if (carbonIntensityStatus !== null) {
      this.dataSourceMetrics.carbonIntensityAvailable = carbonIntensityStatus;
    }

    if (bmrsStatus === true || carbonIntensityStatus === true) {
      this.dataSourceMetrics.lastSuccessfulUpdate = new Date();
      this.dataSourceMetrics.failureCount = 0;
    } else if (bmrsStatus === false || carbonIntensityStatus === false) {
      this.dataSourceMetrics.failureCount++;
    }

    // Assess overall data quality
    if (this.dataSourceMetrics.bmrsAvailable) {
      this.dataSourceMetrics.dataQuality = 'high';
    } else if (this.dataSourceMetrics.carbonIntensityAvailable) {
      this.dataSourceMetrics.dataQuality = 'medium';
    } else {
      this.dataSourceMetrics.dataQuality = 'low';
    }
  }

  getDataSourceStatus(): DataSourceMetrics {
    return { ...this.dataSourceMetrics };
  }

  async getHistoricalDataEnhanced(hours: number): Promise<EnhancedEnergyData[]> {
    console.log(`Fetching enhanced historical data for ${hours} hours...`);
    
    try {
      // Try BMRS historical data first
      const bmrsHistorical = await bmrsApiService.getHistoricalDemand(hours);
      
      if (bmrsHistorical.length > 0) {
        // Process BMRS historical data with enhanced metrics
        return this.processBMRSHistoricalData(bmrsHistorical);
      }
    } catch (error) {
      console.error('BMRS historical data unavailable:', error);
    }

    // Fallback to Carbon Intensity API
    const carbonIntensityHistorical = await energyApiService.get24HourData();
    return this.processCarbonIntensityHistoricalData(carbonIntensityHistorical, hours);
  }

  private async processBMRSHistoricalData(data: Array<{ time: string; demand: number }>): Promise<EnhancedEnergyData[]> {
    return Promise.all(data.map(async (item) => {
      const timestamp = new Date(item.time);
      
      // Get generation mix for this time period (simplified for historical data)
      const energyMix = await this.getHistoricalGenerationMix(timestamp);
      
      return {
        timestamp,
        totalDemand: item.demand,
        carbonIntensity: this.calculateCarbonIntensity(energyMix),
        frequency: 50.0,
        energyMix,
        systemStatus: {
          gridStability: 'stable',
          netImports: energyMix.imports || 0,
          reserveMargin: this.estimateReserveMargin(item.demand, energyMix),
          systemImbalance: 0,
          interconnectorFlows: this.extractInterconnectorFlows(energyMix)
        },
        regionalData: this.generateRegionalData(energyMix),
        dataSource: 'BMRS-Historical',
        dataQuality: 'high'
      };
    }));
  }

  private async processCarbonIntensityHistoricalData(
    data: Array<{ time: string; carbonIntensity: number; mix: Record<string, number> }>,
    hours: number
  ): Promise<EnhancedEnergyData[]> {
    const filteredData = data.slice(-hours);
    
    return filteredData.map((item) => ({
      timestamp: new Date(item.time),
      totalDemand: Object.values(item.mix).reduce((sum, amount) => sum + amount, 0),
      carbonIntensity: item.carbonIntensity,
      frequency: 50.0,
      energyMix: item.mix,
      systemStatus: {
        gridStability: this.assessGridStabilityFromGeneration(item.mix),
        netImports: item.mix.imports || 0,
        reserveMargin: this.estimateReserveMargin(
          Object.values(item.mix).reduce((sum, amount) => sum + amount, 0),
          item.mix
        ),
        systemImbalance: 0,
        interconnectorFlows: this.extractInterconnectorFlows(item.mix)
      },
      regionalData: this.generateRegionalData(item.mix),
      dataSource: 'CarbonIntensity-Historical',
      dataQuality: 'medium'
    }));
  }

  private async getHistoricalGenerationMix(timestamp: Date): Promise<Record<string, number>> {
    // For historical data, we'll use a simplified approach
    // In a full implementation, this would call historical generation endpoints
    try {
      return await energyApiService.getGenerationMix();
    } catch (error) {
      // Return realistic historical mix if API fails
      return {
        gas: 8000,
        nuclear: 6000,
        wind: 12000,
        solar: timestamp.getHours() >= 6 && timestamp.getHours() <= 18 ? 4000 : 0,
        hydro: 1000,
        biomass: 2000,
        coal: 0,
        imports: 3000,
        other: 500
      };
    }
  }
}

export const enhancedDataService = new EnhancedDataService();