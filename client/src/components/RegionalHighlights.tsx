import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Zap, Sun } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';

export function RegionalHighlights() {
  const { data: energyData, isLoading, error } = useCurrentEnergyData();

  if (error) {
    return (
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            Error loading regional data
          </div>
        </CardContent>
      </Card>
    );
  }

  const regionalData = energyData?.regionalData;

  const regions = [
    {
      name: 'Scotland',
      type: 'Wind Generation',
      value: regionalData?.scotland?.wind || 0,
      unit: 'MW',
      icon: Wind,
      iconColor: 'text-blue-600',
    },
    {
      name: 'England',
      type: 'Nuclear Generation',
      value: regionalData?.england?.nuclear || 0,
      unit: 'MW',
      icon: Zap,
      iconColor: 'text-purple-600',
    },
    {
      name: 'South England',
      type: 'Solar Generation',
      value: Math.round((energyData?.energyMix?.solar || 0) * (energyData?.totalDemand || 0) / 100),
      unit: 'MW',
      icon: Sun,
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <Card className="border-gray-200 dark:border-gray-700 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Regional Highlights
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {regions.map((region, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <region.icon className={region.iconColor} size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{region.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{region.type}</p>
                </div>
              </div>
              {isLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <span className={`text-lg font-bold ${region.iconColor}`}>
                  {region.value.toLocaleString()} {region.unit}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
