import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gauge, Leaf, Wind, Zap } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';

export function KeyMetrics() {
  const { data: energyData, isLoading, error } = useCurrentEnergyData();

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <p className="text-sm text-red-600 dark:text-red-400">Error loading energy data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateRenewableShare = () => {
    if (!energyData?.energyMix) return 0;
    const mix = energyData.energyMix;
    return mix.wind + mix.solar + mix.hydro + mix.biomass;
  };

  const getCarbonIntensityColor = (intensity: number) => {
    if (intensity < 150) return 'text-green-600';
    if (intensity < 250) return 'text-yellow-600';
    return 'text-red-600';
  };

  const metrics = [
    {
      title: 'Total Demand',
      value: isLoading ? '...' : `${energyData?.totalDemand?.toLocaleString() || 0} MW`,
      icon: Gauge,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Carbon Intensity',
      value: isLoading ? '...' : `${energyData?.carbonIntensity || 0} gCO₂/kWh`,
      icon: Leaf,
      iconColor: getCarbonIntensityColor(energyData?.carbonIntensity || 0),
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Renewables Share',
      value: isLoading ? '...' : `${calculateRenewableShare().toFixed(1)}%`,
      icon: Wind,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Grid Frequency',
      value: isLoading ? '...' : `${energyData?.frequency || '50.00'} Hz`,
      icon: Zap,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-gray-200 dark:border-gray-700 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-24 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                )}
              </div>
              <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                <metric.icon className={`${metric.iconColor} text-xl`} size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
