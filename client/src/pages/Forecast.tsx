import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CarbonForecastChart } from '@/components/CarbonForecastChart';

export function Forecast() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/60 via-white to-green-50/60 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-8 md:space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-5 md:space-y-7">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 bg-clip-text text-transparent px-4">
                Carbon Intensity Forecast
              </h1>
              <div className="w-28 h-1.5 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full shadow-sm"></div>
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              AI-powered 72-hour carbon intensity predictions with smart energy timing recommendations
            </p>
            
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Machine learning forecasts using Prophet algorithm trained on historical UK electricity data
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm md:text-base px-4">
              <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
                <span className="font-medium">72-Hour Predictions</span>
              </div>
              <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                <span className="font-medium">Smart Energy Timing</span>
              </div>
              <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm"></div>
                <span className="font-medium">Confidence Intervals</span>
              </div>
              <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-orange-500 rounded-full shadow-sm"></div>
                <span className="font-medium">Auto-Updated</span>
              </div>
            </div>
          </div>
          
          {/* Carbon Forecast Chart Component */}
          <CarbonForecastChart />
          
          {/* Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                How It Works
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>Our AI model continuously learns from 30 days of historical carbon intensity data to forecast how clean or carbon-heavy the UK's electricity grid will be.</p>
                
                <p className="font-medium text-gray-700 dark:text-gray-300">It takes into account:</p>
                <ul className="space-y-1 ml-4">
                  <li>Time-of-day and weekly patterns in grid behaviour</li>
                  <li>Weather conditions like wind and solar output</li>
                  <li>Seasonal variations affecting renewable generation</li>
                </ul>
                
                <p>Every 6 hours, the model refreshes with the latest data, ensuring up-to-date forecasts. Predictions include confidence intervals, helping you understand uncertainty and plan smarter.</p>
                
                <p>Built using Meta's Prophet algorithm for reliable, interpretable, and transparent results.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Using the Forecast
              </h3>
              <div className="space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <p>• Lower values (gCO₂/kWh) indicate cleaner, greener electricity</p>
                <p>• Plan energy-intensive tasks—like EV charging or laundry—during predicted low-carbon periods</p>
                <p>• Each forecast covers 3-hour windows for optimal flexibility</p>
                <p>• Export forecasts as CSV to integrate with smart home or automation systems</p>
                <p>• Track long-term trends to see how the grid is decarbonising over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}