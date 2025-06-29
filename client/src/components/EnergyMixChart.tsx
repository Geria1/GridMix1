import React, { memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Download } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';
import type { EnergyMix } from '@/types/energy';

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

function EnergyMixChartComponent() {
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
      <Card className="lg:col-span-1 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            Error loading energy mix data
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = energyData ? formatEnergyMixData(energyData.energyMix) : [];

  return (
    <div className="lg:col-span-1">
      <Card className="border-gray-200 dark:border-gray-700 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Energy Mix
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={isLoading || !energyData}
              className="text-blue-600 hover:text-blue-700"
            >
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 pt-0">
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
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
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
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Energy Source Legend */}
              <div className="space-y-3">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
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
