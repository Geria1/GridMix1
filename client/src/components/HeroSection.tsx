import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, TrendingUp } from 'lucide-react';

interface CountdownTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function HeroSection() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const netZeroTarget = new Date('2050-12-31T23:59:59');
      const timeDiff = netZeroTarget.getTime() - now.getTime();

      if (timeDiff > 0) {
        const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setCountdown({ years, months, days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();
  const progressSince1990 = ((currentYear - 1990) / (2050 - 1990)) * 100;

  return (
    <div className="bg-gradient-to-br from-blue-50/80 via-green-50/60 to-emerald-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 bg-clip-text text-transparent mb-4 md:mb-5">
            GridMix
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 mb-3 font-medium">
            UK Energy Dashboard
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Clean energy, carbon emissions, and grid mix — all in one place.
          </p>
        </div>

        {/* Key Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8">
          {/* Current Energy Mix */}
          <Card className="border-blue-200/60 dark:border-blue-800/40 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 md:p-7 text-center">
              <h3 className="text-lg md:text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Current Energy Mix
              </h3>
              <p className="text-sm md:text-base text-blue-700 dark:text-blue-300">
                Live generation data from UK grid
              </p>
            </CardContent>
          </Card>

          {/* Progress to Net-Zero */}
          <Card className="border-green-200/60 dark:border-green-800/40 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 md:p-7 text-center">
              <h3 className="text-lg md:text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                Progress to Net-Zero
              </h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-medium px-3 py-1">
                  You Are Here: {currentYear}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3.5 mb-2 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3.5 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${progressSince1990}%` }}
                />
              </div>
              <p className="text-xs md:text-sm text-green-700 dark:text-green-300 font-medium">
                {progressSince1990.toFixed(1)}% of timeline (1990 → 2050)
              </p>
            </CardContent>
          </Card>

          {/* Time Left Counter */}
          <Card className="border-orange-200/60 dark:border-orange-800/40 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
                Time Left to 2050
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div>
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {countdown.years}
                  </div>
                  <div className="text-orange-600 dark:text-orange-400">years</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {countdown.months}
                  </div>
                  <div className="text-orange-600 dark:text-orange-400">months</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {countdown.days}
                  </div>
                  <div className="text-orange-600 dark:text-orange-400">days</div>
                </div>
              </div>
              <div className="flex justify-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                <span>{countdown.hours.toString().padStart(2, '0')}h</span>
                <span>{countdown.minutes.toString().padStart(2, '0')}m</span>
                <span>{countdown.seconds.toString().padStart(2, '0')}s</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}