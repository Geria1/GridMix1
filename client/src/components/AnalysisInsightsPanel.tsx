import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';
import { useEmissionsProgress } from '@/hooks/useEmissionsData';

export function AnalysisInsightsPanel() {
  const { data: energyData } = useCurrentEnergyData();
  const { data: emissionsData } = useEmissionsProgress();

  const calculateRenewableShare = () => {
    if (!energyData?.energyMix) return 0;
    const mix = energyData.energyMix;
    const totalGeneration = mix.wind + mix.solar + mix.nuclear + mix.gas + mix.coal + mix.hydro + mix.biomass + mix.other;
    const renewableGeneration = mix.wind + mix.solar + mix.hydro + mix.biomass;
    return totalGeneration > 0 ? (renewableGeneration / totalGeneration) * 100 : 0;
  };

  const getFuelTypeTrend = () => {
    if (!energyData?.energyMix) return 'No data available';
    
    const renewableShare = calculateRenewableShare();
    const windShare = energyData.energyMix.wind / (energyData.energyMix.wind + energyData.energyMix.solar + energyData.energyMix.nuclear + energyData.energyMix.gas + energyData.energyMix.coal + energyData.energyMix.hydro + energyData.energyMix.biomass + energyData.energyMix.other) * 100;
    
    if (renewableShare > 60) {
      return `Renewables dominating at ${renewableShare.toFixed(1)}%. Wind leading with ${windShare.toFixed(1)}% of total generation.`;
    } else if (renewableShare > 40) {
      return `Balanced renewable-fossil mix. Renewables at ${renewableShare.toFixed(1)}%, requiring gas backup during low wind periods.`;
    } else {
      return `Fossil fuels dominant today. Renewables at ${renewableShare.toFixed(1)}%. Likely low wind conditions requiring gas generation.`;
    }
  };

  const getVolatilityInsight = () => {
    if (!energyData?.energyMix) return 'Monitoring grid stability...';
    
    const windGeneration = energyData.energyMix.wind / 1000; // Convert to GW
    
    if (windGeneration > 15) {
      return `High wind output (${windGeneration.toFixed(1)}GW) providing excellent renewable generation. Grid balancing services active to manage variability.`;
    } else if (windGeneration > 8) {
      return `Moderate wind conditions (${windGeneration.toFixed(1)}GW). Grid operators balancing renewable intermittency with dispatchable sources.`;
    } else {
      return `Low wind output (${windGeneration.toFixed(1)}GW). Increased reliance on gas generation and imports for grid stability.`;
    }
  };

  const getPolicyMilestone = () => {
    const currentYear = new Date().getFullYear();
    
    if (currentYear >= 2025) {
      return 'Coal phase-out complete (2025). UK now focuses on gas reduction and renewable capacity expansion toward 2030 targets.';
    } else {
      return 'Approaching coal phase-out deadline (2025). Current policy focuses on renewable capacity auctions and grid flexibility.';
    }
  };

  const insights = [
    {
      title: 'Fuel Type Trends',
      description: getFuelTypeTrend(),
      color: 'blue'
    },
    {
      title: 'Volatility & Resilience',
      description: getVolatilityInsight(),
      color: 'green'
    },
    {
      title: 'Policy Milestones',
      description: getPolicyMilestone(),
      color: 'purple'
    },
    {
      title: 'Regional Focus',
      description: 'Scotland leading offshore wind deployment. England hosting major solar farms. Wales expanding onshore wind capacity.',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600 dark:text-blue-400',
        title: 'text-blue-900 dark:text-blue-100'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600 dark:text-green-400',
        title: 'text-green-900 dark:text-green-100'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        icon: 'text-purple-600 dark:text-purple-400',
        title: 'text-purple-900 dark:text-purple-100'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800',
        icon: 'text-orange-600 dark:text-orange-400',
        title: 'text-orange-900 dark:text-orange-100'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analysis & Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time analysis of UK energy trends, grid dynamics, and policy progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const colors = getColorClasses(insight.color);
          return (
            <Card key={index} className={`${colors.border} ${colors.bg} transition-colors hover:shadow-md`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  <span className={colors.title}>{insight.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {insight.description}
                </p>
                
                {/* Add relevant badges for some insights */}
                {insight.title.includes('Fuel Type') && energyData && (
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      Wind: {((energyData.energyMix.wind / (energyData.energyMix.wind + energyData.energyMix.solar + energyData.energyMix.nuclear + energyData.energyMix.gas + energyData.energyMix.coal + energyData.energyMix.hydro + energyData.energyMix.biomass + energyData.energyMix.other)) * 100).toFixed(1)}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Renewables: {calculateRenewableShare().toFixed(1)}%
                    </Badge>
                  </div>
                )}
                
                {insight.title.includes('Policy') && emissionsData && (
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      Current: {emissionsData.currentReduction.toFixed(1)}% reduction
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Target 2030: {emissionsData.targetReduction2030}%
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}