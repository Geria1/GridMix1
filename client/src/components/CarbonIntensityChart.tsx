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
    if (intensity < 150) return { label: 'Low Carbon', color: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
    if (intensity < 250) return { label: 'Moderate', color: 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' };
    return { label: 'High Carbon', color: 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' };
  };

  if (error) {
    return (
      <Card className="border-destructive/20 bg-destructive/5 mb-10">
        <CardContent className="p-8">
          <div className="text-center text-destructive font-medium">
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
    <Card className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mb-10">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight">
              Carbon Intensity Tracker
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Lower values indicate cleaner energy generation
            </p>
          </div>
          <Badge className={`${carbonStatus.color} font-semibold px-4 py-2 border`}>
            <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
            {carbonStatus.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-8 pt-2">
        {isLoading ? (
          <Skeleton className="h-72 w-full rounded-xl" />
        ) : chartData.length === 0 ? (
          <div className="h-72 flex items-center justify-center text-muted-foreground">
            No carbon intensity data available
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={13}
                  fontWeight={500}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={13}
                  fontWeight={500}
                  tickFormatter={(value) => `${value}g`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: number) => [`${value} gCO₂/kWh`, 'Carbon Intensity']}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                />
                <Line
                  type="monotone"
                  dataKey="intensity"
                  stroke="hsl(160, 84%, 39%)"
                  strokeWidth={3}
                  dot={false}
                  fill="url(#carbonGradient)"
                  activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(160, 84%, 39%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
