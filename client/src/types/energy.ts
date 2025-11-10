export interface EnergyMix {
  wind: number;
  solar: number;
  nuclear: number;
  gas: number;
  coal: number;
  hydro: number;
  biomass: number;
  oil: number;
  imports: number;
  other: number;
}

export interface RegionalData {
  england?: {
    nuclear: number;
    gas: number;
  };
  scotland?: {
    wind: number;
    hydro: number;
  };
  wales?: {
    wind: number;
  };
}

export interface SystemStatus {
  gridStability: string;
  netImports: number;
  reserveMargin: number;
  apiStatus: string;
}

export interface EnergyData {
  timestamp: string;
  totalDemand: number;
  carbonIntensity: number;
  frequency: string;
  energyMix: EnergyMix;
  regionalData?: RegionalData;
  systemStatus?: SystemStatus;
}

export interface ApiStatus {
  status: string;
  lastUpdate: string;
  dataSource: string;
  dataQuality: string;
  sources?: {
    bmrs?: string;
    carbonIntensity?: string;
  };
  error?: string;
}
