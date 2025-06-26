import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useCurrentEnergyData, useApiStatus } from '@/hooks/useEnergyData';
import { Skeleton } from '@/components/ui/skeleton';

export function SystemStatus() {
  const { data: energyData, isLoading: energyLoading } = useCurrentEnergyData();
  const { data: apiStatus, isLoading: statusLoading } = useApiStatus();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable':
      case 'operational':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable':
      case 'operational':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const systemStatus = energyData?.systemStatus;

  const statusItems = [
    {
      label: 'Grid Stability',
      value: systemStatus?.gridStability || 'Unknown',
      color: getStatusColor(systemStatus?.gridStability || 'unknown'),
      dotColor: getStatusDotColor(systemStatus?.gridStability || 'unknown'),
    },
    {
      label: 'Net Imports',
      value: systemStatus?.netImports ? `${systemStatus.netImports.toLocaleString()} MW` : 'N/A',
      color: 'text-gray-900 dark:text-white',
      dotColor: 'bg-blue-500',
    },
    {
      label: 'Reserve Margin',
      value: systemStatus?.reserveMargin ? `${systemStatus.reserveMargin}%` : 'N/A',
      color: 'text-gray-900 dark:text-white',
      dotColor: 'bg-amber-500',
    },
  ];

  return (
    <Card className="border-gray-200 dark:border-gray-700 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          System Status
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {statusItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 ${item.dotColor} rounded-full`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              </div>
              {energyLoading ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                <span className={`text-sm font-medium ${item.color}`}>
                  {item.value}
                </span>
              )}
            </div>
          ))}
          
          {/* Data Source */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Data sourced from National Grid ESO via Carbon Intensity API
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="inline-flex items-center">
                <CheckCircle 
                  className={`text-xs mr-1 ${
                    statusLoading 
                      ? 'text-gray-400' 
                      : apiStatus?.status === 'operational' 
                        ? 'text-green-400' 
                        : 'text-red-400'
                  }`} 
                  size={12} 
                />
                API Status: {statusLoading ? 'Checking...' : (apiStatus?.status || 'Unknown')}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
