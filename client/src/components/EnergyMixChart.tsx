import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Download } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';
import type { EnergyMix } from '@/types/energy';

const ENERGY_COLORS = {
  wind: '#06B6D4',      // Vibrant cyan
  solar: '#F59E0B',     // Bright amber
  nuclear: '#6366F1',   // Deep indigo
  gas: '#64748B',       // Slate gray
  coal: '#334155',      // Dark slate
  hydro: '#0EA5E9',     // Sky blue
  biomass: '#D97706',   // Amber brown
  oil: '#78716C',       // Stone gray
  imports: '#94A3B8',   // Light slate
  other: '#CBD5E1',     // Lighter slate
};

const ENERGY_LABELS = {
  wind: 'Wind',
  gas: 'Gas (CCGT)',
  nuclear: 'Nuclear',
  solar: 'Solar',
  hydro: 'Hydro',
  biomass: 'Biomass',
  coal: 'Coal',
  oil: 'Oil',
  imports: 'Imports',
  other: 'Other',
};

export function EnergyMixChart() {
  const { data: energyData, isLoading, error } = useCurrentEnergyData();

  const formatEnergyMixData = (energyMix: EnergyMix) => {
    // Calculate total generation to compute percentages
    const totalGeneration = Object.values(energyMix).reduce((sum, value) => sum + value, 0);
    
    if (totalGeneration === 0) {
      console.warn('Total generation is zero - no energy mix data available');
      return [];
    }

    return Object.entries(energyMix)
      .filter(([_, value]) => value > 0)
      .map(([key, absoluteValue]) => {
      const percentage = (absoluteValue / totalGeneration) * 100;
      return {
        name: ENERGY_LABELS[key as keyof typeof ENERGY_LABELS] || key,
        value: Number(percentage.toFixed(1)), // Percentage for chart display
        absoluteValue: Math.round(absoluteValue), // MWh for tooltip
        color: ENERGY_COLORS[key as keyof typeof ENERGY_COLORS] || '#CCCCCC',
        fuelType: key,
      };
    })
    .sort((a, b) => b.absoluteValue - a.absoluteValue); // Sort by absolute generation
  };

  const handleExport = () => {
    if (!energyData) return;
    
    const dataStr = JSON.stringify(energyData.energyMix, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `energy-mix-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <Card className="lg:col-span-1 border-destructive/20 bg-destructive/5">
        <CardContent className="p-8">
          <div className="text-center text-destructive">
            Error loading energy mix data
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = energyData ? formatEnergyMixData(energyData.energyMix) : [];

  return (
    <div className="lg:col-span-1">
      <Card className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold tracking-tight">
              Current Energy Mix
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={isLoading || !energyData}
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-2">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-64 w-full rounded-full" />
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="h-72 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string, props: any) => [
                        `${props.payload.absoluteValue.toLocaleString()} MWh (${value}%)`,
                        props.payload.name
                      ]}
                      labelFormatter={() => 'Energy Generation'}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        fontSize: '14px',
                        padding: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Energy Source Legend */}
              <div className="space-y-3 mt-6">
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full shadow-sm ring-2 ring-white dark:ring-card"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-foreground tabular-nums">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


