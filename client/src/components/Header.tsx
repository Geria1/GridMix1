import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';
// GridMix logo will be displayed as CSS background to avoid import issues
const gridmixLogoStyle = {
  backgroundImage: 'url("/attached_assets/grimix logo green and blue_1751223794918.PNG")',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
};

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
            <div className="w-12 h-12 bg-gray-900 dark:bg-gray-800 rounded-lg p-1">
              <div 
                style={gridmixLogoStyle}
                className="w-full h-full"
                role="img"
                aria-label="GridMix Logo"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                GridMix
              </h1>
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
