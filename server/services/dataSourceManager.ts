import { logger } from '../utils/logger';
import { bmrsApiService } from './bmrsApi';
import { energyApiService } from './energyApi';

interface DataSourceStatus {
  name: string;
  available: boolean;
  lastCheck: Date;
  errorMessage?: string;
  priority: number; // 1 = highest priority
}

export class DataSourceManager {
  private sources: Map<string, DataSourceStatus> = new Map();

  constructor() {
    this.initializeSources();
  }

  private initializeSources() {
    this.sources.set('carbon-intensity', {
      name: 'UK Carbon Intensity API',
      available: true,
      lastCheck: new Date(),
      priority: 1
    });

    this.sources.set('bmrs', {
      name: 'BMRS Elexon API',
      available: false,
      lastCheck: new Date(),
      errorMessage: 'API endpoints returning HTML instead of JSON data',
      priority: 2
    });
  }

  async checkDataSourceHealth(): Promise<void> {
    logger.info('🔍 Checking data source health...');

    // Test Carbon Intensity API
    try {
      await energyApiService.getCurrentCarbonIntensity();
      this.updateSourceStatus('carbon-intensity', true);
      logger.info('✅ Carbon Intensity API: Operational');
    } catch (error) {
      this.updateSourceStatus('carbon-intensity', false, `Error: ${error}`);
      logger.error('❌ Carbon Intensity API: Failed');
    }

    // Test BMRS API with a simple call
    try {
      const today = new Date().toISOString().split('T')[0];
      await bmrsApiService.getActualGenerationByType(today);
      this.updateSourceStatus('bmrs', true);
      logger.info('✅ BMRS API: Operational');
    } catch (error) {
      this.updateSourceStatus('bmrs', false, `Authentication/endpoint issue: ${error}`);
      logger.warn('⚠️  BMRS API: Using fallback data source');
    }
  }

  private updateSourceStatus(sourceKey: string, available: boolean, errorMessage?: string) {
    const source = this.sources.get(sourceKey);
    if (source) {
      source.available = available;
      source.lastCheck = new Date();
      source.errorMessage = errorMessage;
    }
  }

  getAvailableSources(): DataSourceStatus[] {
    return Array.from(this.sources.values())
      .filter(source => source.available)
      .sort((a, b) => a.priority - b.priority);
  }

  getAllSources(): DataSourceStatus[] {
    return Array.from(this.sources.values())
      .sort((a, b) => a.priority - b.priority);
  }

  isPrimarySourceAvailable(): boolean {
    const carbonIntensity = this.sources.get('carbon-intensity');
    return carbonIntensity?.available ?? false;
  }

  getSystemStatus(): {
    status: 'operational' | 'degraded' | 'offline';
    message: string;
    sources: DataSourceStatus[];
  } {
    const availableSources = this.getAvailableSources();
    const allSources = this.getAllSources();

    if (availableSources.length === 0) {
      return {
        status: 'offline',
        message: 'All data sources are unavailable',
        sources: allSources
      };
    }

    const primaryAvailable = this.isPrimarySourceAvailable();
    
    if (primaryAvailable && availableSources.length === allSources.length) {
      return {
        status: 'operational',
        message: 'All data sources operational',
        sources: allSources
      };
    }

    if (primaryAvailable) {
      return {
        status: 'degraded',
        message: 'Primary data source operational, some secondary sources unavailable',
        sources: allSources
      };
    }

    return {
      status: 'degraded',
      message: 'Operating on secondary data sources',
      sources: allSources
    };
  }
}

export const dataSourceManager = new DataSourceManager();