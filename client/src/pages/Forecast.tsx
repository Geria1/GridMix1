import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CarbonForecastChart } from '@/components/CarbonForecastChart';

export function Forecast() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-green-50/30 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Carbon Intensity Forecast
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              AI-powered 72-hour carbon intensity predictions with smart energy timing recommendations
            </p>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Machine learning forecasts using Prophet algorithm trained on historical UK electricity data
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>72-Hour Predictions</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Smart Energy Timing</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Confidence Intervals</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Auto-Updated</span>
              </div>
            </div>
          </div>
          
          {/* Carbon Forecast Chart Component */}
          <CarbonForecastChart />
          
          {/* Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                How It Works
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>Our AI model continuously learns from 30 days of historical carbon intensity data to forecast how clean or carbon-heavy the UK's electricity grid will be.</p>
                
                <p className="font-medium text-gray-700 dark:text-gray-300">It takes into account:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Time-of-day and weekly patterns in grid behaviour</li>
                  <li>• Weather conditions like wind and solar output</li>
                  <li>• Seasonal variations affecting renewable generation</li>
                </ul>
                
                <p>Every 6 hours, the model refreshes with the latest data, ensuring up-to-date forecasts. Predictions include confidence intervals, helping you understand uncertainty and plan smarter.</p>
                
                <p>Built using Meta's Prophet algorithm, our forecasting system delivers reliable, interpretable, and transparent results.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Using the Forecast
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• Lower values (gCO₂/kWh) mean cleaner electricity</p>
                <p>• Schedule energy-intensive tasks during predicted low periods</p>
                <p>• 3-hour windows provide optimal planning flexibility</p>
                <p>• Export CSV data for integration with smart home systems</p>
                <p>• Monitor trends to understand grid decarbonization progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}