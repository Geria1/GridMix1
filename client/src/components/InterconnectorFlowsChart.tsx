import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Cable, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InterconnectorData {
  settlementDate: string;
  fuelType: string;
  quantity: number;
  activeFlag: string;
}

interface ChartDataPoint {
  time: string;
  timestamp: number;
  france: number;
  ireland: number;
  netherlands: number;
  belgium: number;
  norway: number;
  other: number;
  total: number;
}

const interconnectorNames: Record<string, string> = {
  'INTFR': 'France',
  'INTIRL': 'Ireland',
  'INTNED': 'Netherlands',
  'INTBEL': 'Belgium',
  'INTNOR': 'Norway',
  'INTEW': 'Ireland (EW)',
  'INTNEM': 'Belgium (NEMO)',
  'INTELEC': 'France (ElecLink)',
  'INTVIK': 'Denmark (Viking)',
};

const interconnectorColors: Record<string, string> = {
  france: '#3b82f6',      // blue
  ireland: '#10b981',     // green
  netherlands: '#f59e0b', // orange
  belgium: '#ef4444',     // red
  norway: '#8b5cf6',      // purple
  other: '#6b7280',       // gray
};

export function InterconnectorFlowsChart() {
  const { data, isLoading, error } = useQuery<InterconnectorData[]>({
    queryKey: ['interconnectors'],
    queryFn: async () => {
      const response = await fetch('/api/bmrs/interconnectors?hours=24');
      if (!response.ok) throw new Error('Failed to fetch interconnector data');
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  // Process data into chart format
  const chartData: ChartDataPoint[] = [];
  if (data && data.length > 0) {
    // Group by settlement period
    const groupedData = data.reduce((acc, item) => {
      const key = item.settlementDate;
      if (!acc[key]) {
        acc[key] = {
          time: new Date(item.settlementDate).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          timestamp: new Date(item.settlementDate).getTime(),
          france: 0,
          ireland: 0,
          netherlands: 0,
          belgium: 0,
          norway: 0,
          other: 0,
          total: 0,
        };
      }

      // Map fuel types to countries
      const quantity = item.quantity || 0;
      if (item.fuelType.includes('FR') || item.fuelType === 'INTELEC') {
        acc[key].france += quantity;
      } else if (item.fuelType.includes('IRL') || item.fuelType === 'INTEW') {
        acc[key].ireland += quantity;
      } else if (item.fuelType.includes('NED')) {
        acc[key].netherlands += quantity;
      } else if (item.fuelType.includes('BEL') || item.fuelType === 'INTNEM') {
        acc[key].belgium += quantity;
      } else if (item.fuelType.includes('NOR')) {
        acc[key].norway += quantity;
      } else {
        acc[key].other += quantity;
      }

      return acc;
    }, {} as Record<string, ChartDataPoint>);

    // Convert to array and calculate totals
    Object.values(groupedData).forEach(point => {
      point.total = point.france + point.ireland + point.netherlands +
                    point.belgium + point.norway + point.other;
      chartData.push(point);
    });

    // Sort by timestamp
    chartData.sort((a, b) => a.timestamp - b.timestamp);
  }

  // Calculate statistics
  const stats = chartData.length > 0 ? {
    currentFlow: chartData[chartData.length - 1]?.total || 0,
    avgFlow: chartData.reduce((sum, p) => sum + p.total, 0) / chartData.length,
    maxImport: Math.max(...chartData.map(p => p.total)),
    maxExport: Math.min(...chartData.map(p => p.total)),
  } : { currentFlow: 0, avgFlow: 0, maxImport: 0, maxExport: 0 };

  const isImporting = stats.currentFlow > 0;

  if (isLoading) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="h-8 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="text-center text-red-600 dark:text-red-400">
              Unable to load interconnector flow data
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <Card className="border-gray-200 dark:border-gray-700 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Cable className="h-6 w-6 text-blue-600" />
                UK Energy Interconnectors - Live Import/Export Flows
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Real-time electricity flows between UK and European partners over the last 24 hours
              </p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${isImporting ? 'text-blue-600' : 'text-green-600'}`}>
                {isImporting ? '+' : ''}{stats.currentFlow.toFixed(0)} MW
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                {isImporting ? (
                  <><TrendingDown className="h-3 w-3" /> Importing</>
                ) : (
                  <><TrendingUp className="h-3 w-3" /> Exporting</>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          {/* Info Alert */}
          <Alert className="mb-6 bg-blue-50/80 dark:bg-blue-900/20 border-blue-300/50 dark:border-blue-700/50">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-sm text-blue-800 dark:text-blue-300">
              Positive values indicate imports (buying electricity), negative values indicate exports (selling electricity).
              The UK has interconnectors with France, Ireland, Netherlands, Belgium, Norway, and Denmark.
            </AlertDescription>
          </Alert>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Current Flow</div>
              <div className={`text-xl font-bold ${isImporting ? 'text-blue-600' : 'text-green-600'}`}>
                {isImporting ? '+' : ''}{stats.currentFlow.toFixed(0)} MW
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">24h Average</div>
              <div className="text-xl font-bold text-purple-600">{stats.avgFlow.toFixed(0)} MW</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Peak Import</div>
              <div className="text-xl font-bold text-orange-600">+{stats.maxImport.toFixed(0)} MW</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Peak Export</div>
              <div className="text-xl font-bold text-green-600">{stats.maxExport.toFixed(0)} MW</div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="franceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={interconnectorColors.france} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={interconnectorColors.france} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="irelandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={interconnectorColors.ireland} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={interconnectorColors.ireland} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="netherlandsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={interconnectorColors.netherlands} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={interconnectorColors.netherlands} stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />

                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  interval={Math.floor(chartData.length / 8)}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}`}
                  label={{
                    value: 'MW (+ Import / - Export)',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#6b7280', fontSize: '12px' }
                  }}
                />

                <Tooltip
                  content={(props) => {
                    if (!props.active || !props.payload?.[0]) return null;
                    const data = props.payload[0].payload as ChartDataPoint;
                    return (
                      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                        <p className="font-semibold text-gray-900 dark:text-white mb-2">{data.time}</p>
                        <div className="space-y-1 text-sm">
                          {data.france !== 0 && (
                            <p style={{ color: interconnectorColors.france }}>
                              France: {data.france > 0 ? '+' : ''}{data.france.toFixed(0)} MW
                            </p>
                          )}
                          {data.ireland !== 0 && (
                            <p style={{ color: interconnectorColors.ireland }}>
                              Ireland: {data.ireland > 0 ? '+' : ''}{data.ireland.toFixed(0)} MW
                            </p>
                          )}
                          {data.netherlands !== 0 && (
                            <p style={{ color: interconnectorColors.netherlands }}>
                              Netherlands: {data.netherlands > 0 ? '+' : ''}{data.netherlands.toFixed(0)} MW
                            </p>
                          )}
                          {data.belgium !== 0 && (
                            <p style={{ color: interconnectorColors.belgium }}>
                              Belgium: {data.belgium > 0 ? '+' : ''}{data.belgium.toFixed(0)} MW
                            </p>
                          )}
                          {data.norway !== 0 && (
                            <p style={{ color: interconnectorColors.norway }}>
                              Norway: {data.norway > 0 ? '+' : ''}{data.norway.toFixed(0)} MW
                            </p>
                          )}
                          <p className="font-semibold text-gray-900 dark:text-white pt-1 border-t border-gray-200 dark:border-gray-700">
                            Total: {data.total > 0 ? '+' : ''}{data.total.toFixed(0)} MW
                          </p>
                        </div>
                      </div>
                    );
                  }}
                />

                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="line"
                />

                {/* Zero reference line */}
                <ReferenceLine y={0} stroke="#374151" strokeWidth={2} strokeDasharray="3 3" />

                {/* Stacked areas for each interconnector */}
                <Area
                  type="monotone"
                  dataKey="france"
                  stackId="1"
                  stroke={interconnectorColors.france}
                  fill="url(#franceGradient)"
                  strokeWidth={2}
                  name="France"
                />
                <Area
                  type="monotone"
                  dataKey="ireland"
                  stackId="1"
                  stroke={interconnectorColors.ireland}
                  fill="url(#irelandGradient)"
                  strokeWidth={2}
                  name="Ireland"
                />
                <Area
                  type="monotone"
                  dataKey="netherlands"
                  stackId="1"
                  stroke={interconnectorColors.netherlands}
                  fill="url(#netherlandsGradient)"
                  strokeWidth={2}
                  name="Netherlands"
                />
                <Line
                  type="monotone"
                  dataKey="belgium"
                  stroke={interconnectorColors.belgium}
                  strokeWidth={2}
                  dot={false}
                  name="Belgium"
                />
                <Line
                  type="monotone"
                  dataKey="norway"
                  stroke={interconnectorColors.norway}
                  strokeWidth={2}
                  dot={false}
                  name="Norway"
                />

                {/* Total flow line */}
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#1f2937"
                  strokeWidth={3}
                  dot={false}
                  name="Total Net Flow"
                  strokeDasharray="5 5"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>Data source: Elexon BMRS (Balancing Mechanism Reporting Service)</p>
            <p>Updates every 5 minutes with live interconnector flow data</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
