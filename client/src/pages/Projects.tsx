import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EnhancedProjectsMap } from '@/components/EnhancedProjectsMap';

export function Projects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/60 via-white to-green-50/60 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-8 md:space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-5 md:space-y-7">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 bg-clip-text text-transparent px-4">
                UK Renewable Energy Projects
              </h1>
              <div className="w-28 h-1.5 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full shadow-sm"></div>
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Explore live data and locations of renewable energy sites [&gt;150kW] across the UK
            </p>
            
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Source: Renewable Energy Planning Database (REPD), UK
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm md:text-base px-4">
              <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                <span className="font-medium">Live Generation Data</span>
              </div>
              <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
                <span className="font-medium">70+ Projects</span>
              </div>
              <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm"></div>
                <span className="font-medium">30.3 GW Capacity</span>
              </div>
              <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-orange-500 rounded-full shadow-sm"></div>
                <span className="font-medium">10 Technologies</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Projects Map */}
          <EnhancedProjectsMap />
        </div>
      </div>

      <Footer />
    </div>
  );
}