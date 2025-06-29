import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface DataSourceStatus {
  bmrsAvailable: boolean;
  carbonIntensityAvailable: boolean;
  lastSuccessfulUpdate: string;
  failureCount: number;
  dataQuality: string;
}

interface EnhancedEnergyData {
  timestamp: string;
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
  dataSource: string;
  dataQuality: string;
}

interface BMRSGridStatus {
  frequency: number;
  reserveMargin: number;
  systemImbalance: number;
  interconnectorFlows: Record<string, number>;
  timestamp: string;
}

export function EnhancedDataSources() {
  const [selectedView, setSelectedView] = useState<'overview' | 'bmrs' | 'enhanced'>('overview');

  const { data: dataSourceStatus } = useQuery<DataSourceStatus>({
    queryKey: ['/api/energy/enhanced/status'],
    refetchInterval: 30000,
  });

  const { data: enhancedData } = useQuery<EnhancedEnergyData>({
    queryKey: ['/api/energy/enhanced/current'],
    refetchInterval: 60000,
  });

  const { data: bmrsGridStatus } = useQuery<BMRSGridStatus>({
    queryKey: ['/api/bmrs/grid-status'],
    refetchInterval: 60000,
  });

  const getDataQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStabilityColor = (stability: string) => {
    switch (stability) {
      case 'stable': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'stable-high-renewables': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'managing-renewables': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'warning': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'stressed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'unstable': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={selectedView === 'overview' ? 'default' : 'outline'}
          onClick={() => setSelectedView('overview')}
          size="sm"
        >
          Data Sources Overview
        </Button>
        <Button
          variant={selectedView === 'enhanced' ? 'default' : 'outline'}
          onClick={() => setSelectedView('enhanced')}
          size="sm"
        >
          Enhanced Data
        </Button>
        <Button
          variant={selectedView === 'bmrs' ? 'default' : 'outline'}
          onClick={() => setSelectedView('bmrs')}
          size="sm"
        >
          BMRS Grid Status
        </Button>
      </div>

      {/* Data Sources Overview */}
      {selectedView === 'overview' && dataSourceStatus && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Data Source Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">BMRS API</span>
                  <Badge variant={(dataSourceStatus as any)?.bmrsAvailable ? 'default' : 'destructive'}>
                    {(dataSourceStatus as any)?.bmrsAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Carbon Intensity API</span>
                  <Badge variant={(dataSourceStatus as any)?.carbonIntensityAvailable ? 'default' : 'destructive'}>
                    {(dataSourceStatus as any)?.carbonIntensityAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Data Quality</span>
                  <Badge className={getDataQualityColor((dataSourceStatus as any)?.dataQuality || 'unknown')}>
                    {(dataSourceStatus as any)?.dataQuality || 'unknown'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Failure Count</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(dataSourceStatus as any)?.failureCount || 0}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Last Update: {(dataSourceStatus as any)?.lastSuccessfulUpdate ? new Date((dataSourceStatus as any).lastSuccessfulUpdate).toLocaleTimeString() : 'Unknown'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Primary Source:</strong> {(dataSourceStatus as any)?.bmrsAvailable ? 'BMRS (Elexon)' : 'Carbon Intensity API'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Fallback Available:</strong> {(dataSourceStatus as any)?.carbonIntensityAvailable ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Enhanced Features:</strong> 
                  <ul className="mt-1 ml-4 space-y-1">
                    <li>• Grid frequency monitoring</li>
                    <li>• System balancing data</li>
                    <li>• Interconnector flows</li>
                    <li>• Reserve margin tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Data View */}
      {selectedView === 'enhanced' && enhancedData && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Enhanced Energy Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Data Source</span>
                  <Badge variant="secondary">{(enhancedData as any)?.dataSource || 'Unknown'}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Data Quality</span>
                  <Badge className={getDataQualityColor((enhancedData as any)?.dataQuality || 'unknown')}>
                    {(enhancedData as any)?.dataQuality || 'unknown'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Grid Frequency</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {((enhancedData as any)?.frequency || 50.0).toFixed(2)} Hz
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Demand</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(((enhancedData as any)?.totalDemand || 30000) / 1000).toFixed(1)} GW
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Carbon Intensity</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(enhancedData as any)?.carbonIntensity || 0} g/kWh
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Grid Stability</span>
                  <Badge className={getStabilityColor((enhancedData as any)?.systemStatus?.gridStability || 'stable')}>
                    {((enhancedData as any)?.systemStatus?.gridStability || 'stable').replace('-', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Reserve Margin</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {((enhancedData as any)?.systemStatus?.reserveMargin || 0).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Net Imports</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(((enhancedData as any)?.systemStatus?.netImports || 0) / 1000).toFixed(1)} GW
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">System Imbalance</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {((enhancedData as any)?.systemStatus?.systemImbalance || 0).toFixed(0)} MW
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* BMRS Grid Status */}
      {selectedView === 'bmrs' && bmrsGridStatus && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                BMRS Grid Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">System Frequency</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {((bmrsGridStatus as any)?.frequency || 50.0).toFixed(3)} Hz
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Reserve Margin</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {((bmrsGridStatus as any)?.reserveMargin || 0).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">System Imbalance</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {((bmrsGridStatus as any)?.systemImbalance || 0).toFixed(0)} MW
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Updated: {(bmrsGridStatus as any)?.timestamp ? new Date((bmrsGridStatus as any).timestamp).toLocaleTimeString() : 'Unknown'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Interconnector Flows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries((bmrsGridStatus as any)?.interconnectorFlows || {}).length > 0 ? (
                  Object.entries((bmrsGridStatus as any).interconnectorFlows).map(([country, flow]) => (
                    <div key={country} className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300 capitalize">
                        {country}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {((flow as number) / 1000).toFixed(1)} GW
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Interconnector data not available from BMRS
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Status Message */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Enhanced Data Integration:</strong> GridMix now integrates multiple BMRS endpoints 
            providing comprehensive grid monitoring including frequency tracking, balancing services, 
            interconnector flows, and system reserve margins. Data quality is automatically assessed 
            and fallback sources ensure continuous operation.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}