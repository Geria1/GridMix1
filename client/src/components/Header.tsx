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
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white text-xl" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">GridMix</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">UK Energy Dashboard</p>
            </div>
          </div>

          {/* Live Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {getTimeSinceUpdate()}
              </span>
            </div>
            
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
