import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEnergyHistory } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';
import type { EnergyData } from '@/types/energy';

export function CarbonIntensityChart() {
  const { data: historyData, isLoading, error } = useEnergyHistory(24);

  const formatCarbonData = (data: EnergyData[]) => {
    return data.map(item => ({
      time: new Date(item.timestamp).getHours().toString().padStart(2, '0') + ':00',
      intensity: item.carbonIntensity,
    }));
  };

  const getCarbonStatus = (intensity: number) => {
    if (intensity < 150) return { label: 'Low Carbon', color: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' };
    if (intensity < 250) return { label: 'Moderate', color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' };
    return { label: 'High Carbon', color: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' };
  };

  if (error) {
    return (
      <Card className="border-gray-200 dark:border-gray-700 mb-8">
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            Error loading carbon intensity data
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = historyData ? formatCarbonData(historyData) : [];
  const currentIntensity = historyData && historyData.length > 0 
    ? historyData[historyData.length - 1].carbonIntensity 
    : 0;
  const carbonStatus = getCarbonStatus(currentIntensity);

  return (
    <Card className="border-gray-200 dark:border-gray-700 mb-8 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Carbon Intensity Tracker
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lower values indicate cleaner energy generation
            </p>
          </div>
          <Badge className={carbonStatus.color}>
            <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
            {carbonStatus.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No carbon intensity data available
          </div>
        ) : (
          <div className="h-64">
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
                  tickFormatter={(value) => `${value}g`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value} gCO₂/kWh`, 'Carbon Intensity']}
                />
                <Line
                  type="monotone"
                  dataKey="intensity"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={false}
                  fill="rgba(76, 175, 80, 0.1)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
