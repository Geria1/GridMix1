import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Database, Shield, Clock } from 'lucide-react';

export function TechnicalNotesSection() {
  const [isOpen, setIsOpen] = useState(false);

  const dataSources = [
    {
      name: 'Elexon BMRS API',
      type: 'Primary',
      description: 'Official UK electricity market data including generation by fuel type, demand forecasts, and system balancing',
      updateFrequency: 'Every 5 minutes',
      coverage: 'Real-time and historical generation data',
      status: 'Active with fallback'
    },
    {
      name: 'Carbon Intensity API',
      type: 'Primary',
      description: 'National Grid ESO carbon intensity data and generation mix information',
      updateFrequency: 'Every 30 minutes',
      coverage: 'Carbon intensity, regional data, generation forecasts',
      status: 'Operational'
    },
    {
      name: 'UK Government BEIS',
      type: 'Historical',
      description: 'Official UK greenhouse gas emissions inventory and energy statistics',
      updateFrequency: 'Annual',
      coverage: '1990-2022 verified emissions data',
      status: 'Reference data'
    },
    {
      name: 'Climate Change Committee',
      type: 'Policy',
      description: 'Carbon budget targets and net-zero pathway recommendations',
      updateFrequency: 'Policy updates',
      coverage: 'Target frameworks and progress assessments',
      status: 'Policy reference'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'active with fallback':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'reference data':
      case 'policy reference':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="mb-8">
      <Card className="border-gray-200 dark:border-gray-700">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Technical Notes & Data Sources
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Click to expand
                  </Badge>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="pt-0">
              {/* Data Sources Overview */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-medium">Data Integrity Statement:</span> All energy generation data is sourced from official UK government APIs and authorized electricity market operators. Emission data comes from verified UK inventory datasets and official Climate Change Committee reports.
                </p>
              </div>

              {/* Data Sources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {dataSources.map((source, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {source.name}
                      </h4>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {source.type}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(source.status)}`}>
                          {source.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      {source.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>Updates:</span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          {source.updateFrequency}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Shield className="w-3 h-3" />
                          <span>Coverage:</span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          {source.coverage}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Implementation */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-sm">
                  Implementation Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data Processing
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Real-time aggregation and validation of generation by fuel type. Historical data normalized for trend analysis.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Update Cycle
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Live data refreshes every 5 minutes. Historical emissions updated annually from official UK inventory.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data Quality
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      All sources verified against official UK government publications and electricity market operator data.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}