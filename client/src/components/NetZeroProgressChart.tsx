import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { TrendingDown, Target, Calendar } from 'lucide-react';
import { useEmissionsPathway, useEmissionsProgress, useEmissionsMilestones } from '@/hooks/useEmissionsData';
import { Skeleton } from '@/components/ui/skeleton';

// UK GHG emissions data based on official BEIS/ONS statistics
const netZeroProgressData = [
  { year: 1990, emissions: 100, actual: true, label: "1990 Baseline", note: "~800 MtCO₂e" },
  { year: 1995, emissions: 94, actual: true },
  { year: 2000, emissions: 88, actual: true },
  { year: 2005, emissions: 82, actual: true },
  { year: 2010, emissions: 75, actual: true, label: "Climate Change Act", note: "First carbon budgets" },
  { year: 2015, emissions: 67, actual: true },
  { year: 2019, emissions: 61, actual: true, label: "Net Zero Commitment", note: "Legal target set" },
  { year: 2020, emissions: 59, actual: true, label: "COVID Impact" },
  { year: 2021, emissions: 58, actual: true },
  { year: 2022, emissions: 52, actual: true },
  { year: 2023, emissions: 50, actual: true, label: "50% Reduction", note: "Milestone achieved" },
  { year: 2025, emissions: 42, actual: false, projected: true },
  { year: 2030, emissions: 32, actual: false, projected: true, label: "6th Carbon Budget", note: "68% reduction target" },
  { year: 2035, emissions: 22, actual: false, projected: true },
  { year: 2040, emissions: 12, actual: false, projected: true },
  { year: 2045, emissions: 5, actual: false, projected: true },
  { year: 2050, emissions: 0, actual: false, projected: true, label: "Net Zero Target", note: "Legally binding commitment" }
];

const milestones = [
  { year: 1990, title: "Baseline Year", description: "~800 MtCO₂e total emissions" },
  { year: 2008, title: "Climate Change Act", description: "World's first legally binding framework" },
  { year: 2019, title: "Net Zero Commitment", description: "Legal target enshrined in law" },
  { year: 2023, title: "50% Reduction", description: "Halfway to net zero achieved" },
  { year: 2030, title: "6th Carbon Budget", description: "68% reduction from 1990 levels" },
  { year: 2050, title: "Net Zero Target", description: "Zero net greenhouse gas emissions" }
];

export function NetZeroProgressChart() {
  const { data: pathwayData, isLoading: pathwayLoading, error: pathwayError } = useEmissionsPathway();
  const { data: progressData, isLoading: progressLoading } = useEmissionsProgress();
  const { data: milestonesData, isLoading: milestonesLoading } = useEmissionsMilestones();

  const formatTooltip = (value: number, name: string, props: any) => {
    const point = props.payload;
    if (name === 'percentageOf1990') {
      let dataType = 'Projected Pathway';
      if (point.isActual) {
        dataType = 'Official Data';
      } else if (point.source?.includes('BMRS')) {
        dataType = 'BMRS Estimate';
      } else if (point.source?.includes('Carbon Budget')) {
        dataType = 'Carbon Budget Target';
      }
      
      return [
        `${value.toFixed(1)}% of 1990 levels (${point.totalEmissions?.toFixed(1)} MtCO₂e)`,
        `${dataType} - ${point.source}`
      ];
    }
    return [value, name];
  };

  const formatLabel = (label: string) => {
    return `Year ${label}`;
  };

  if (pathwayLoading || progressLoading || milestonesLoading) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pathwayError) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="text-center text-red-600 dark:text-red-400">
              Unable to load UK emissions data from government sources
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartData = pathwayData?.combined || [];
  const currentReduction = progressData?.currentReduction || 50;
  const yearsToNetZero = 2050 - (progressData?.latestYear || 2023);

  return (
    <div className="lg:col-span-2">
      <Card className="border-gray-200 dark:border-gray-700 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
                UK GHG Emissions Pathway to 2050
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Including 2025 Estimates via Energy Generation
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{currentReduction.toFixed(1)}%</div>
              <div className="text-xs text-gray-500">reduction achieved</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 pt-0">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Official Data (BEIS/ONS)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-b-2 border-dashed border-orange-500"></div>
              <span className="text-gray-600 dark:text-gray-400">BMRS Estimates (2023-2025)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-b border-dashed border-green-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Carbon Budget Targets</span>
            </div>
          </div>
          
          {/* Main Chart */}
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netZeroProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                
                <XAxis 
                  dataKey="year" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => value.toString()}
                />
                
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                />
                
                <Tooltip 
                  formatter={formatTooltip}
                  labelFormatter={formatLabel}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                
                {/* Historical area (actual government data) */}
                <Area
                  type="monotone"
                  dataKey="percentageOf1990"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#emissionsGradient)"
                  fillOpacity={0.6}
                  data={chartData.filter(d => d.isActual)}
                />
                
                {/* BMRS-derived estimates (2023-2025) */}
                <Line
                  type="monotone"
                  dataKey="percentageOf1990"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  strokeDasharray="8 4"
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                  data={chartData.filter(d => !d.isActual && d.source?.includes('BMRS'))}
                />
                
                {/* Future carbon budget pathway */}
                <Line
                  type="monotone"
                  dataKey="percentageOf1990"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  data={chartData.filter(d => !d.isActual && !d.source?.includes('BMRS'))}
                />
                
                {/* Reference lines for key milestones */}
                <ReferenceLine y={0} stroke="#dc2626" strokeWidth={2} strokeDasharray="3 3" />
                <ReferenceLine y={50} stroke="#f59e0b" strokeWidth={1} strokeDasharray="2 2" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Key Milestones */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Key Milestones
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(milestonesData || milestones).map((milestone, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-600">{milestone.year}</span>
                    <Target className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                    {milestone.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {milestone.description}
                    {milestone.emissions && (
                      <span className="block mt-1 font-medium">
                        {milestone.emissions.toFixed(1)} MtCO₂e
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentReduction.toFixed(1)}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Emissions Reduced ({progressData?.latestYear || 2022})
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{progressData?.targetReduction2030 || 68}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">2030 Target</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{yearsToNetZero}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Years to Net Zero</div>
              </div>
            </div>
          </div>

          {/* Data Source */}
          <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Data sources: BEIS Annual Greenhouse Gas Statistics, Committee on Climate Change, ONS Environmental Accounts
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}