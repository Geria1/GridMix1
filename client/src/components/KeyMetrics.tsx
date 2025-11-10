import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gauge, Leaf, Wind, Zap } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';

export function KeyMetrics() {
  const { data: energyData, isLoading, error } = useCurrentEnergyData();

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
        <Card className="bg-destructive/5 border-destructive/20 col-span-full">
          <CardContent className="p-7">
            <p className="text-sm font-medium text-destructive">Error loading energy data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateRenewableShare = () => {
    if (!energyData?.energyMix) return 0;
    const mix = energyData.energyMix;
    
    // Calculate total generation (excluding imports as they're not generation)
    const totalGeneration = mix.wind + mix.solar + mix.nuclear + mix.gas + mix.coal + mix.hydro + mix.biomass + mix.other;
    
    // Calculate renewable generation (wind, solar, hydro, biomass)
    const renewableGeneration = mix.wind + mix.solar + mix.hydro + mix.biomass;
    
    if (totalGeneration === 0) return 0;
    
    return (renewableGeneration / totalGeneration) * 100;
  };

  const getCarbonIntensityColor = (intensity: number) => {
    if (intensity < 150) return 'text-emerald-600 dark:text-emerald-400';
    if (intensity < 250) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const metrics = [
    {
      title: 'Total Demand',
      value: isLoading ? '...' : `${energyData?.totalDemand?.toLocaleString() || 0} MW`,
      icon: Gauge,
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/20',
      borderColor: 'border-cyan-200/50 dark:border-cyan-800/30',
    },
    {
      title: 'Carbon Intensity',
      value: isLoading ? '...' : `${energyData?.carbonIntensity || 0} gCO₂/kWh`,
      icon: Leaf,
      iconColor: getCarbonIntensityColor(energyData?.carbonIntensity || 0),
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20',
      borderColor: 'border-emerald-200/50 dark:border-emerald-800/30',
    },
    {
      title: 'Renewables Share',
      value: isLoading ? '...' : `${calculateRenewableShare().toFixed(1)}%`,
      icon: Wind,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/30 dark:to-teal-900/20',
      borderColor: 'border-emerald-200/50 dark:border-emerald-800/30',
    },
    {
      title: 'Grid Frequency',
      value: isLoading ? '...' : `${energyData?.frequency || '50.00'} Hz`,
      icon: Zap,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20',
      borderColor: 'border-indigo-200/50 dark:border-indigo-800/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="bento-card hover:-translate-y-3 hover:shadow-2xl group overflow-hidden relative"
          data-testid={`card-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <CardContent className="p-7 relative z-10">
            {/* Icon Badge */}
            <div className={`inline-flex items-center justify-center w-14 h-14 ${metric.bgColor} rounded-2xl shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
              <metric.icon className={`${metric.iconColor}`} size={28} strokeWidth={2.5} />
            </div>

            {/* Title */}
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">
              {metric.title}
            </p>

            {/* Value */}
            {isLoading ? (
              <Skeleton className="h-10 w-32 rounded-xl" />
            ) : (
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight font-display leading-none">
                {metric.value}
              </p>
            )}

            {/* Decorative gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
