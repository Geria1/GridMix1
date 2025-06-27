import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, ComposedChart } from 'recharts';
import { Clock, Target, Calendar, TrendingDown } from 'lucide-react';
import { useEmissionsPathway, useEmissionsProgress } from '@/hooks/useEmissionsData';

interface CountdownTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function NetZeroCountdownChart() {
  const { data: pathwayData, isLoading: pathwayLoading, error: pathwayError } = useEmissionsPathway();
  const { data: progressData, isLoading: progressLoading } = useEmissionsProgress();
  const [countdown, setCountdown] = useState<CountdownTime>({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // Calculate countdown to UK Net-Zero target
  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date("2050-12-31T23:59:59Z");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ years, months, days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTooltip = (value: number, name: string, props: any) => {
    const point = props.payload;
    if (name === 'percentageOf1990') {
      let dataType = 'Projected Pathway';
      if (point.isActual) {
        dataType = 'Official Data';
      } else if (point.source?.includes('BMRS')) {
        dataType = 'BMRS Estimate';
      }
      
      return [
        `${value.toFixed(1)}% of 1990 levels (${point.totalEmissions?.toFixed(1)} MtCO₂e)`,
        `${dataType} - ${point.source}`
      ];
    }
    return [value, name];
  };

  const formatLabel = (label: string) => {
    const year = parseInt(label);
    if (year === 1990) return `${year} - Baseline`;
    if (year === 2025) return `${year} - You Are Here`;
    if (year === 2050) return `${year} - Net Zero Target`;
    return `Year ${year}`;
  };

  if (pathwayLoading || progressLoading) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="h-8 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="h-24 w-full lg:col-span-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
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

  // Prepare chart data: historical + BMRS estimates (1990-2025)
  const historicalData = pathwayData?.historical || [];
  const projectedData = pathwayData?.projected?.filter(d => d.year <= 2025) || [];
  const chartData = [...historicalData, ...projectedData].sort((a, b) => a.year - b.year);
  
  // Create milestone markers
  const milestones = [
    { year: 1990, label: "Baseline", value: 100 },
    { year: 2025, label: "You Are Here", value: chartData.find(d => d.year === 2025)?.percentageOf1990 || 45 },
    { year: 2050, label: "Net Zero Target", value: 0 }
  ];

  const currentReduction = progressData?.currentReduction || 47.6;

  return (
    <div className="lg:col-span-2">
      <Card className="border-gray-200 dark:border-gray-700 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Target className="h-6 w-6 text-green-600" />
                UK's Journey to Net-Zero: 1990-2050
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Live countdown to UK's legally binding climate target under the Climate Change Act
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{currentReduction.toFixed(1)}%</div>
              <div className="text-xs text-gray-500">reduction achieved</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 pt-0">
          {/* Live Countdown Clock */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Time Left to UK Net-Zero (2050)
                  </h3>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{countdown.years}</div>
                    <div className="text-xs text-gray-500">years</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{countdown.months}</div>
                    <div className="text-xs text-gray-500">months</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{countdown.days}</div>
                    <div className="text-xs text-gray-500">days</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-600">{countdown.hours}</div>
                    <div className="text-xs text-gray-500">hours</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-600">{countdown.minutes}</div>
                    <div className="text-xs text-gray-500">mins</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-600">{countdown.seconds}</div>
                    <div className="text-xs text-gray-500">secs</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Summary */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">2025</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">You Are Here</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <TrendingDown className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">25</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Remaining</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Official Data (BEIS/ONS)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-b-2 border-dashed border-orange-500"></div>
              <span className="text-gray-600 dark:text-gray-400">BMRS Estimates (2023-2025)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-gray-200 dark:bg-gray-600 rounded opacity-50"></div>
              <span className="text-gray-600 dark:text-gray-400">Path to Net Zero (2026-2050)</span>
            </div>
          </div>
          
          {/* Main Chart */}
          <div className="h-96 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="futurePathGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e5e7eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e5e7eb" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                
                <XAxis 
                  dataKey="year"
                  domain={[1990, 2050]}
                  type="number"
                  scale="linear"
                  tickCount={7}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => {
                    if ([1990, 2020, 2023, 2025, 2030, 2040, 2050].includes(value)) {
                      return value.toString();
                    }
                    return '';
                  }}
                />
                
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `${value}%`}
                  label={{ 
                    value: '% of 1990 Emissions', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#6b7280', fontSize: '14px' }
                  }}
                />
                
                <Tooltip 
                  content={(props) => {
                    if (!props.active || !props.payload?.[0]) return null;
                    const data = props.payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                        <p className="font-medium text-gray-900 dark:text-white">{formatLabel(data.year.toString())}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {data.percentageOf1990 !== undefined && data.percentageOf1990 !== null ? `${data.percentageOf1990.toFixed(1)}% of 1990 levels` : 'Net Zero Target'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {data.totalEmissions ? `${data.totalEmissions.toFixed(1)} MtCO₂e` : 'N/A'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{data.source}</p>
                      </div>
                    );
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
                
                {/* Future path visualization (empty space to 2050) */}
                <Area
                  type="linear"
                  dataKey={() => 0}
                  stroke="none"
                  fill="url(#futurePathGradient)"
                  fillOpacity={0.2}
                  data={[
                    { year: 2025, value: chartData.find(d => d.year === 2025)?.percentageOf1990 || 45 },
                    { year: 2050, value: 0 }
                  ]}
                />
                
                {/* Milestone reference lines */}
                <ReferenceLine x={1990} stroke="#6b7280" strokeDasharray="2 2" />
                <ReferenceLine x={2025} stroke="#f59e0b" strokeDasharray="2 2" />
                <ReferenceLine x={2050} stroke="#10b981" strokeDasharray="2 2" />
                <ReferenceLine y={0} stroke="#10b981" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Milestone Annotations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{milestone.year}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{milestone.label}</div>
                <div className="text-xl font-bold text-green-600">{milestone.value.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}