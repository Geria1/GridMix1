import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, TrendingDown, Clock, Zap, Download } from 'lucide-react';

interface ForecastDataPoint {
  timestamp: string;
  forecast: number;
  upper: number;
  lower: number;
}

interface CleanestPeriod {
  start_time: string;
  end_time: string;
  avg_intensity: number;
  start_hour: string;
  end_hour: string;
}

interface ForecastData {
  forecast: ForecastDataPoint[];
  cleanest_periods: CleanestPeriod[];
  last_updated: string | null;
  next_update?: string;
  error?: string;
}

interface ForecastSummary {
  next24Hours: { min: number; max: number; avg: number };
  next48Hours: { min: number; max: number; avg: number };
  cleanestPeriodToday: CleanestPeriod | null;
}

export function CarbonForecastChart() {
  const [activeTab, setActiveTab] = useState('24h');
  
  const { data: forecastData, isLoading: forecastLoading, error: forecastError, refetch: refetchForecast } = useQuery<ForecastData>({
    queryKey: ['/api/carbon-forecast'],
    refetchInterval: 6 * 60 * 60 * 1000, // Refetch every 6 hours
  });

  const { data: summaryData, isLoading: summaryLoading } = useQuery<ForecastSummary>({
    queryKey: ['/api/carbon-forecast/summary'],
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });

  // Prepare chart data based on active tab
  const getChartData = () => {
    if (!forecastData?.forecast) return [];
    
    const hours = activeTab === '24h' ? 24 : activeTab === '48h' ? 48 : 72;
    const data = forecastData.forecast.slice(0, hours);
    
    return data.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        day: hours > 24 ? '2-digit' : undefined,
        month: hours > 24 ? 'short' : undefined
      }),
      forecast: point.forecast,
      upper: point.upper,
      lower: point.lower,
      timestamp: point.timestamp
    }));
  };

  // Format cleanest period for display
  const formatCleanestPeriod = (period: CleanestPeriod) => {
    const startTime = new Date(period.start_time);
    const endTime = new Date(period.end_time);
    const isToday = startTime.toDateString() === new Date().toDateString();
    const isTomorrow = startTime.toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
    
    const timePrefix = isToday ? 'Today' : isTomorrow ? 'Tomorrow' : startTime.toLocaleDateString('en-GB', { weekday: 'short' });
    const timeRange = `${startTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}–${endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
    
    return `${timePrefix} ${timeRange}`;
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{new Date(data.timestamp).toLocaleString('en-GB')}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm">
              <span className="text-blue-600 dark:text-blue-400">Forecast: </span>
              <span className="font-medium">{Math.round(data.forecast)} gCO₂/kWh</span>
            </p>
            <p className="text-xs text-gray-500">
              Range: {Math.round(data.lower)}–{Math.round(data.upper)} gCO₂/kWh
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Export forecast data as CSV
  const exportForecastCSV = () => {
    if (!forecastData?.forecast) return;
    
    const csvContent = [
      'Timestamp,Forecast (gCO2/kWh),Lower Bound,Upper Bound',
      ...forecastData.forecast.map(point => 
        `${point.timestamp},${point.forecast},${point.lower},${point.upper}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carbon-intensity-forecast-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (forecastLoading || summaryLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading carbon intensity forecast...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (forecastError || forecastData?.error) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <p className="text-red-600 dark:text-red-400">
              {forecastData?.error || 'Failed to load carbon intensity forecast'}
            </p>
            <Button onClick={() => refetchForecast()} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = getChartData();
  const cleanestPeriod = forecastData?.cleanest_periods?.[0];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      {summaryData && summaryData.next24Hours && summaryData.next48Hours && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">Next 24 Hours</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{summaryData.next24Hours.avg} <span className="text-sm font-normal text-gray-500">gCO₂/kWh</span></p>
                <p className="text-xs text-gray-500">
                  Range: {summaryData.next24Hours.min}–{summaryData.next24Hours.max} gCO₂/kWh
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium">48-Hour Outlook</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{summaryData.next48Hours.avg} <span className="text-sm font-normal text-gray-500">gCO₂/kWh</span></p>
                <p className="text-xs text-gray-500">
                  Range: {summaryData.next48Hours.min}–{summaryData.next48Hours.max} gCO₂/kWh
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium">Cleanest Window</span>
              </div>
              {cleanestPeriod ? (
                <div className="space-y-1">
                  <p className="text-sm font-medium">{formatCleanestPeriod(cleanestPeriod)}</p>
                  <p className="text-xs text-gray-500">
                    Avg: {cleanestPeriod.avg_intensity} gCO₂/kWh
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Smart Energy Advice */}
      {cleanestPeriod && (
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100 mb-1">
                  ⚡ Smart Energy Timing
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  The cleanest hours to use electricity: <strong>{formatCleanestPeriod(cleanestPeriod)}</strong>
                  {' '}(avg. {cleanestPeriod.avg_intensity}gCO₂/kWh). Consider scheduling energy-intensive tasks during this window.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Forecast Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Carbon Intensity Forecast
                <Badge variant="outline" className="text-xs">
                  AI Predicted
                </Badge>
              </CardTitle>
              {forecastData?.last_updated && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {new Date(forecastData.last_updated).toLocaleString('en-GB')}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={exportForecastCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="24h">24 Hours</TabsTrigger>
              <TabsTrigger value="48h">48 Hours</TabsTrigger>
              <TabsTrigger value="72h">72 Hours</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      label={{ value: 'gCO₂/kWh', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Confidence band */}
                    <Area
                      type="monotone"
                      dataKey="upper"
                      stackId="1"
                      stroke="none"
                      fill="rgba(59, 130, 246, 0.1)"
                    />
                    <Area
                      type="monotone"
                      dataKey="lower"
                      stackId="1"
                      stroke="none"
                      fill="rgba(255, 255, 255, 1)"
                    />
                    
                    {/* Main forecast line */}
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Blue line shows predicted carbon intensity</p>
                <p>• Shaded area represents confidence interval</p>
                <p>• Lower values indicate cleaner electricity</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Cleanest Periods List */}
      {forecastData?.cleanest_periods && forecastData.cleanest_periods.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top 3 Cleanest 3-Hour Windows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {forecastData.cleanest_periods.slice(0, 3).map((period, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{formatCleanestPeriod(period)}</p>
                    <p className="text-sm text-gray-500">3-hour window</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{period.avg_intensity} gCO₂/kWh</p>
                    <Badge variant={index === 0 ? 'default' : 'secondary'} className="text-xs">
                      {index === 0 ? 'Cleanest' : `#${index + 1}`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}