import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { EnergyMixChart } from '@/components/EnergyMixChart';
import { EnergyMixTrendChart } from '@/components/EnergyMixTrendChart';
import { TrendChart } from '@/components/TrendChart';
import { Calendar, BarChart3, Clock } from 'lucide-react';

export function EnergyMixDashboard() {
  const [activeTab, setActiveTab] = useState('realtime');

  const tabConfig = [
    {
      value: 'monthly',
      label: 'Monthly Trends',
      icon: Calendar,
      description: 'View seasonal patterns and long-term shifts in energy sources'
    },
    {
      value: 'weekly',
      label: 'Weekly Fluctuations', 
      icon: BarChart3,
      description: 'Explore week-to-week variations in renewable and fossil generation'
    },
    {
      value: 'realtime',
      label: 'Real-Time Snapshot',
      icon: Clock,
      description: 'Current live generation data from the UK electricity grid'
    }
  ];

  return (
    <div className="mb-8">
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Energy Mix Dashboard
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Interactive visualization of UK electricity generation by fuel type
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800">
              {tabConfig.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value}
                  className="text-xs md:text-sm py-3 px-3 touch-target data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  <tab.icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">
                    {tab.label.split(' ')[1] || tab.label.split(' ')[0]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content Descriptions */}
            <div className="mb-4">
              {tabConfig.map((tab) => (
                activeTab === tab.value && (
                  <div key={tab.value} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <tab.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {tab.description}
                    </p>
                  </div>
                )
              ))}
            </div>

            <TabsContent value="realtime" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Current Generation Mix
                  </h3>
                  <EnergyMixChart />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    24-Hour Trends
                  </h3>
                  <TrendChart />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Live Data:</span> This view shows current electricity generation from the UK grid. 
                  Data refreshes every 5 minutes from National Grid ESO via the Carbon Intensity API.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="mt-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Weekly Energy Mix Patterns
                </h3>
                <EnergyMixTrendChart />
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Weekly Analysis:</span> This dashboard shows how the UK's electricity generation changes 
                  over weekly periods. You can observe how renewable sources fluctuate with weather patterns and how 
                  gas generation fills gaps during low wind/solar periods.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="mt-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Monthly & Seasonal Trends
                </h3>
                <EnergyMixTrendChart />
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Seasonal Insights:</span> Monthly aggregation reveals clear seasonal patterns - 
                  higher wind generation in winter months, solar peaks in summer, and increased gas usage during 
                  heating seasons. Nuclear provides consistent baseload throughout the year.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}