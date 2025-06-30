import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const ENERGY_COLORS = {
  wind: '#00BFFF',
  solar: '#FFD700',
  nuclear: '#FF6347',
  gas: '#8A2BE2',
  coal: '#4B4B4B',
  hydro: '#1E90FF',
  biomass: '#228B22',
  oil: '#A52A2A',
  imports: '#999999',
  other: '#CCCCCC',
};

const ENERGY_LABELS = {
  wind: 'Wind',
  gas: 'Gas',
  nuclear: 'Nuclear',
  solar: 'Solar',
  hydro: 'Hydro',
  biomass: 'Biomass',
  coal: 'Coal',
  oil: 'Oil',
  imports: 'Imports',
  other: 'Other',
};

type TimeResolution = 'daily' | 'weekly' | 'monthly';

interface EnergyMixTimeSeriesData {
  date: string;
  timestamp: Date;
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
  totalDemand: number;
}

function useEnergyMixTimeSeries(resolution: TimeResolution, period: number) {
  return useQuery({
    queryKey: ['/api/energy/timeseries', resolution, period],
    queryFn: async (): Promise<EnergyMixTimeSeriesData[]> => {
      const response = await fetch(`/api/energy/timeseries?resolution=${resolution}&period=${period}`);
      if (!response.ok) throw new Error('Failed to fetch energy mix time series');
      return await response.json();
    },
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
}

export function EnergyMixTrendChart() {
  const [resolution, setResolution] = useState<TimeResolution>('weekly');
  const [period, setPeriod] = useState(12); // weeks/months depending on resolution

  const { data: timeSeriesData, isLoading, error } = useEnergyMixTimeSeries(resolution, period);

  const formatTooltipLabel = (date: string) => {
    const dateObj = new Date(date);
    if (resolution === 'monthly') {
      return dateObj.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    } else if (resolution === 'weekly') {
      return `Week of ${dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    return dateObj.toLocaleDateString('en-GB');
  };

  const formatXAxisLabel = (date: string) => {
    const dateObj = new Date(date);
    if (resolution === 'monthly') {
      return dateObj.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
    } else if (resolution === 'weekly') {
      return dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    }
    return dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;
    // Calculate renewable share from percentage data
    const renewableGeneration = data.wind + data.solar + data.hydro + data.biomass;
    const totalGeneration = 100 - data.imports; // Total domestic generation percentage
    const renewableShare = totalGeneration > 0 ? ((renewableGeneration / totalGeneration) * 100).toFixed(1) : '0.0';

    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 dark:text-white mb-2">
          {formatTooltipLabel(label)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          Total Demand: {data.totalDemand?.toLocaleString()} MW
        </p>
        <p className="text-sm text-green-600 dark:text-green-400 mb-2 font-medium">
          Renewables: {renewableShare}% (of domestic generation)
        </p>
        <div className="space-y-1">
          {payload.map((entry: any) => {
            const percentage = entry.value?.toFixed(1) || '0.0';
            // Convert percentage back to approximate MW for display
            const mwValue = data.totalDemand ? Math.round((entry.value / 100) * data.totalDemand) : 0;
            return (
              <div key={entry.dataKey} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{ENERGY_LABELS[entry.dataKey as keyof typeof ENERGY_LABELS]}</span>
                </div>
                <span className="font-medium">
                  {percentage}% ({mwValue?.toLocaleString()} MW)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            Energy Mix Trends - Data Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Unable to load energy mix time series data. Please check your connection.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <TrendingUp className="w-5 h-5" />
              UK Energy Mix Trends
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {resolution === 'monthly' ? 'Monthly' : resolution === 'weekly' ? 'Weekly' : 'Daily'} generation patterns from BMRS data
            </p>
          </div>
          <Badge variant="outline" className="text-green-600 dark:text-green-400">
            Live BMRS Data
          </Badge>
        </div>
        
        {/* Time Resolution Controls */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex gap-1">
            <Button
              variant={resolution === 'weekly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setResolution('weekly');
                setPeriod(12);
              }}
              className="text-xs"
            >
              <Clock className="w-3 h-3 mr-1" />
              12 Weeks
            </Button>
            <Button
              variant={resolution === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setResolution('monthly');
                setPeriod(12);
              }}
              className="text-xs"
            >
              <Calendar className="w-3 h-3 mr-1" />
              12 Months
            </Button>
          </div>
          
          {/* Period Controls */}
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPeriod(resolution === 'monthly' ? 6 : 4)}
              className="text-xs"
            >
              {resolution === 'monthly' ? '6M' : '4W'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPeriod(resolution === 'monthly' ? 24 : 26)}
              className="text-xs"
            >
              {resolution === 'monthly' ? '2Y' : '6M'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date"
                tickFormatter={formatXAxisLabel}
                className="text-xs"
                interval="preserveStartEnd"
              />
              <YAxis 
                className="text-xs"
                domain={[0, 100]}
                tickFormatter={(value) => `${value.toFixed(0)}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                formatter={(value) => ENERGY_LABELS[value as keyof typeof ENERGY_LABELS] || value}
              />
              
              {/* Renewable sources */}
              <Line
                type="monotone"
                dataKey="wind"
                stroke={ENERGY_COLORS.wind}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Area
                type="monotone"
                dataKey="solar"
                stackId="1"
                stroke={ENERGY_COLORS.solar}
                fill={`url(#gradient-solar)`}
                strokeWidth={1}
              />
              <Area
                type="monotone"
                dataKey="hydro"
                stackId="1"
                stroke={ENERGY_COLORS.hydro}
                fill={`url(#gradient-hydro)`}
                strokeWidth={1}
              />
              
              {/* Low-carbon sources */}
              <Area
                type="monotone"
                dataKey="nuclear"
                stackId="1"
                stroke={ENERGY_COLORS.nuclear}
                fill={`url(#gradient-nuclear)`}
                strokeWidth={1}
              />
              <Area
                type="monotone"
                dataKey="biomass"
                stackId="1"
                stroke={ENERGY_COLORS.biomass}
                fill={`url(#gradient-biomass)`}
                strokeWidth={1}
              />
              
              {/* Fossil fuels */}
              <Area
                type="monotone"
                dataKey="gas"
                stackId="1"
                stroke={ENERGY_COLORS.gas}
                fill={`url(#gradient-gas)`}
                strokeWidth={1}
              />
              <Area
                type="monotone"
                dataKey="coal"
                stackId="1"
                stroke={ENERGY_COLORS.coal}
                fill={`url(#gradient-coal)`}
                strokeWidth={1}
              />
              
              {/* Other sources */}
              <Area
                type="monotone"
                dataKey="imports"
                stackId="1"
                stroke={ENERGY_COLORS.imports}
                fill={`url(#gradient-imports)`}
                strokeWidth={1}
              />
              <Area
                type="monotone"
                dataKey="other"
                stackId="1"
                stroke={ENERGY_COLORS.other}
                fill={`url(#gradient-other)`}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Stats */}
        {timeSeriesData && timeSeriesData.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {resolution === 'monthly' ? 'Monthly' : 'Weekly'} Trends Summary
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg Wind</p>
                <p className="font-medium">
                  {(timeSeriesData.reduce((sum, d) => sum + d.wind, 0) / timeSeriesData.length / 1000).toFixed(1)}GW
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg Gas</p>
                <p className="font-medium">
                  {(timeSeriesData.reduce((sum, d) => sum + d.gas, 0) / timeSeriesData.length / 1000).toFixed(1)}GW
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg Nuclear</p>
                <p className="font-medium">
                  {(timeSeriesData.reduce((sum, d) => sum + d.nuclear, 0) / timeSeriesData.length / 1000).toFixed(1)}GW
                </p>
              </div>
              <div>
                <p className="text-green-600 dark:text-green-400">Avg Renewables</p>
                <p className="font-medium text-green-600 dark:text-green-400">
                  {(() => {
                    const avgRenewableShare = timeSeriesData.reduce((sum, d) => {
                      const totalGen = d.wind + d.solar + d.nuclear + d.gas + d.coal + d.hydro + d.biomass + d.other;
                      const renewableGen = d.wind + d.solar + d.hydro + d.biomass;
                      return sum + (totalGen > 0 ? (renewableGen / totalGen) * 100 : 0);
                    }, 0) / timeSeriesData.length;
                    return avgRenewableShare.toFixed(1);
                  })()}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg Generation</p>
                <p className="font-medium">
                  {(timeSeriesData.reduce((sum, d) => {
                    const totalGen = d.wind + d.solar + d.nuclear + d.gas + d.coal + d.hydro + d.biomass + d.other;
                    return sum + totalGen;
                  }, 0) / timeSeriesData.length / 1000).toFixed(1)}GW
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}