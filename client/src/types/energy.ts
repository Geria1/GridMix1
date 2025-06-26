export interface EnergyMix {
  gas: number;
  coal: number;
  nuclear: number;
  wind: number;
  solar: number;
  hydro: number;
  biomass: number;
  imports: number;
  other: number;
}

export interface RegionalData {
  england: {
    nuclear: number;
    gas: number;
  };
  scotland: {
    wind: number;
    hydro: number;
  };
  wales: {
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
  id: number;
  timestamp: Date;
  totalDemand: number;
  carbonIntensity: number;
  frequency: string;
  energyMix: EnergyMix;
  regionalData?: RegionalData;
  systemStatus?: SystemStatus;
}

export interface ApiStatus {
  status: string;
  lastUpdate: Date;
  dataSource: string;
  error?: string;
}
