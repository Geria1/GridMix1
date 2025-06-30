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
  coal: '#2F4F4F',
  hydro: '#4682B4',
  biomass: '#32CD32',
  oil: '#000000',
  imports: '#FF69B4',
  other: '#708090'
};

const ENERGY_LABELS = {
  wind: 'Wind',
  solar: 'Solar',
  nuclear: 'Nuclear',
  gas: 'Gas',
  coal: 'Coal',
  hydro: 'Hydro',
  biomass: 'Biomass',
  oil: 'Oil',
  imports: 'Imports',
  other: 'Other'
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

  const { data: rawTimeSeriesData, isLoading, error } = useEnergyMixTimeSeries(resolution, period);

  // Process and validate the data to ensure proper percentage values
  const timeSeriesData = rawTimeSeriesData?.map(item => {
    console.log('Raw data item:', item);
    return {
      ...item,
      // Ensure all values are proper percentages (0-100)
      wind: Math.min(100, Math.max(0, item.wind)),
      solar: Math.min(100, Math.max(0, item.solar)),
      nuclear: Math.min(100, Math.max(0, item.nuclear)),
      gas: Math.min(100, Math.max(0, item.gas)),
      coal: Math.min(100, Math.max(0, item.coal)),
      hydro: Math.min(100, Math.max(0, item.hydro)),
      biomass: Math.min(100, Math.max(0, item.biomass)),
      oil: Math.min(100, Math.max(0, item.oil)),
      imports: Math.min(100, Math.max(0, item.imports)),
      other: Math.min(100, Math.max(0, item.other))
    };
  });

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
    // Debug log to check data values
    console.log('Tooltip data:', data);
    console.log('Payload:', payload);
    
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
            console.log(`${entry.dataKey}: ${entry.value} -> ${percentage}%`);
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Energy Mix Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center">
            <div className="text-gray-500">Loading energy mix trends...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Energy Mix Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center">
            <div className="text-red-500">Error loading energy mix trends</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Energy Mix Trend
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Live Data
            </Badge>
          </div>
          
          {/* Time Resolution Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={resolution === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setResolution('weekly');
                  setPeriod(12);
                }}
              >
                Weekly
              </Button>
              <Button
                variant={resolution === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setResolution('monthly');
                  setPeriod(12);
                }}
              >
                Monthly
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={period === 4 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(4)}
              >
                {resolution === 'monthly' ? '4M' : '4W'}
              </Button>
              <Button
                variant={period === 12 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(12)}
              >
                {resolution === 'monthly' ? '1Y' : '12W'}
              </Button>
              <Button
                variant={period === 24 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(24)}
              >
                {resolution === 'monthly' ? '2Y' : '6M'}
              </Button>
            </div>
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
                domain={[0, 60]}
                ticks={[0, 10, 20, 30, 40, 50, 60]}
                tickFormatter={(value) => `${value}%`}
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
              <Line
                type="monotone"
                dataKey="solar"
                stroke={ENERGY_COLORS.solar}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="hydro"
                stroke={ENERGY_COLORS.hydro}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="biomass"
                stroke={ENERGY_COLORS.biomass}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              
              {/* Non-renewable sources */}
              <Line
                type="monotone"
                dataKey="nuclear"
                stroke={ENERGY_COLORS.nuclear}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="gas"
                stroke={ENERGY_COLORS.gas}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="imports"
                stroke={ENERGY_COLORS.imports}
                strokeWidth={2}
                dot={{ r: 3 }}
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
                <p className="font-medium text-blue-600 dark:text-blue-400">
                  {(timeSeriesData.reduce((sum, d) => sum + d.wind, 0) / timeSeriesData.length).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg Solar</p>
                <p className="font-medium text-yellow-600 dark:text-yellow-400">
                  {(timeSeriesData.reduce((sum, d) => sum + d.solar, 0) / timeSeriesData.length).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg Nuclear</p>
                <p className="font-medium text-red-600 dark:text-red-400">
                  {(timeSeriesData.reduce((sum, d) => sum + d.nuclear, 0) / timeSeriesData.length).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg Gas</p>
                <p className="font-medium text-purple-600 dark:text-purple-400">
                  {(timeSeriesData.reduce((sum, d) => sum + d.gas, 0) / timeSeriesData.length).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Avg Renewables</p>
                <p className="font-medium text-green-600 dark:text-green-400">
                  {(timeSeriesData.reduce((sum, d) => sum + d.wind + d.solar + d.hydro + d.biomass, 0) / timeSeriesData.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}