import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEnergyHistory } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';
import type { EnergyData } from '@/types/energy';

const TREND_COLORS = {
  wind: '#06B6D4',      // Vibrant cyan
  gas: '#64748B',       // Slate gray
  nuclear: '#6366F1',   // Deep indigo
  solar: '#F59E0B',     // Bright amber
  hydro: '#0EA5E9',     // Sky blue
  biomass: '#D97706',   // Amber brown
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
        wind: Number(((item.energyMix.wind || 0) / 1000).toFixed(2)),
        gas: Number(((item.energyMix.gas || 0) / 1000).toFixed(2)),
        nuclear: Number(((item.energyMix.nuclear || 0) / 1000).toFixed(2)),
        solar: Number(((item.energyMix.solar || 0) / 1000).toFixed(2)),
        hydro: Number(((item.energyMix.hydro || 0) / 1000).toFixed(2)),
        biomass: Number(((item.energyMix.biomass || 0) / 1000).toFixed(2)),
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
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-8">
            <div className="text-center text-destructive font-medium">
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
      <Card className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold tracking-tight">
              Energy Mix Trend (GW)
            </CardTitle>
            <div className="flex items-center gap-2">
              {[24, 168, 720].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range as 24 | 168 | 720)}
                  className={timeRange === range ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'hover:bg-muted'}
                >
                  {getTimeRangeLabel(range)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-2">
          {isLoading ? (
            <Skeleton className="h-96 w-full rounded-xl" />
          ) : chartData.length === 0 ? (
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              No historical data available
            </div>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
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
                    tickFormatter={(value) => `${value}GW`}
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
                    formatter={(value: number, name: string) => [`${value} GW`, name]}
                    labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '20px',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  />
                  {Object.entries(TREND_COLORS).map(([key, color]) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={color}
                      strokeWidth={3}
                      dot={false}
                      name={key.charAt(0).toUpperCase() + key.slice(1)}
                      activeDot={{ r: 5, strokeWidth: 2 }}
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
