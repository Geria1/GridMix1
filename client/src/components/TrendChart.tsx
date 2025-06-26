import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEnergyHistory } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';
import type { EnergyData } from '@/types/energy';

const TREND_COLORS = {
  wind: '#2196F3',
  gas: '#757575',
  nuclear: '#9C27B0',
  solar: '#FF9800',
  hydro: '#00BCD4',
  biomass: '#795548',
};

export function TrendChart() {
  const [timeRange, setTimeRange] = useState<24 | 168 | 720>(24); // 24h, 7d, 30d
  const { data: historyData, isLoading, error } = useEnergyHistory(timeRange);

  const formatTrendData = (data: EnergyData[]) => {
    return data.map(item => {
      const time = new Date(item.timestamp);
      const timeLabel = timeRange === 24 
        ? time.getHours().toString().padStart(2, '0') + ':00'
        : timeRange === 168
        ? time.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })
        : time.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });

      return {
        time: timeLabel,
        wind: Number((item.energyMix.wind || 0).toFixed(1)),
        gas: Number((item.energyMix.gas || 0).toFixed(1)),
        nuclear: Number((item.energyMix.nuclear || 0).toFixed(1)),
        solar: Number((item.energyMix.solar || 0).toFixed(1)),
        hydro: Number((item.energyMix.hydro || 0).toFixed(1)),
        biomass: Number((item.energyMix.biomass || 0).toFixed(1)),
      };
    });
  };

  const getTimeRangeLabel = (range: number) => {
    switch (range) {
      case 24: return '24H';
      case 168: return '7D';
      case 720: return '30D';
      default: return '24H';
    }
  };

  if (error) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="text-center text-red-600 dark:text-red-400">
              Error loading trend data
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartData = historyData ? formatTrendData(historyData) : [];

  return (
    <div className="lg:col-span-2">
      <Card className="border-gray-200 dark:border-gray-700 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Energy Mix Trend
            </CardTitle>
            <div className="flex items-center space-x-2">
              {[24, 168, 720].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range as 24 | 168 | 720)}
                  className={timeRange === range ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  {getTimeRangeLabel(range)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 pt-0">
          {isLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : chartData.length === 0 ? (
            <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No historical data available
            </div>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                  <Legend />
                  {Object.entries(TREND_COLORS).map(([key, color]) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={color}
                      strokeWidth={2}
                      dot={false}
                      name={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
