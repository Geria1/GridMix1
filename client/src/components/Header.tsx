import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Zap } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { data: energyData, isLoading } = useCurrentEnergyData();

  const getTimeSinceUpdate = () => {
    if (!energyData) return 'Loading...';
    
    const now = new Date();
    const updateTime = new Date(energyData.timestamp);
    const diffMinutes = Math.floor((now.getTime() - updateTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Live • Just updated';
    if (diffMinutes === 1) return 'Live • Updated 1 min ago';
    return `Live • Updated ${diffMinutes} min ago`;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 md:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Zap className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                GridMix
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                UK Energy Dashboard
              </p>
            </div>
          </div>

          {/* Live Status */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700">
              <div className={`w-2.5 h-2.5 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse shadow-sm`}></div>
              <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                {getTimeSinceUpdate()}
              </span>
            </div>
            
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 h-10 w-10"
              data-testid="button-header-theme-toggle"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
