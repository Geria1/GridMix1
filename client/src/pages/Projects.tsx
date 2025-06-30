import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EnhancedProjectsMap } from '@/components/EnhancedProjectsMap';

export function Projects() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-green-50/30 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                UK Renewable Energy Projects
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore the comprehensive interactive map of renewable energy projects across the United Kingdom, 
              featuring live generation data from operational facilities and sourced from the official government 
              REPD (Renewable Energy Planning Database).
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Generation Data</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>70+ Projects</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>30.3 GW Capacity</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>10 Technologies</span>
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