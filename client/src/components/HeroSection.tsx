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
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-emerald-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-white/20 dark:border-gray-700/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-6">
          <div className="inline-block px-6 py-2 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl rounded-full border border-white/40 dark:border-gray-700/40 mb-4 scale-in">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              🌍 Live UK Grid Data
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 fade-in">
            <span className="gradient-text-energy">GridMix</span>
          </h1>

          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4 slide-up">
            UK Energy Dashboard
          </p>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed fade-in">
            Real-time clean energy, carbon emissions, and grid mix analytics — beautifully visualized in one place.
          </p>
        </div>

        {/* Key Stats Row - Bento Box Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scale-in">
          {/* Current Energy Mix */}
          <Card className="bento-card border-blue-300/30 dark:border-blue-700/20 hover:-translate-y-2 hover:glow-blue group">
            <CardContent className="p-8 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Current Energy Mix
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Live generation data from UK grid
              </p>
            </CardContent>
          </Card>

          {/* Progress to Net-Zero */}
          <Card className="bento-card border-emerald-300/30 dark:border-emerald-700/20 hover:-translate-y-2 hover:glow-green group">
            <CardContent className="p-8 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                UK's Journey to Net-Zero
              </h3>
              <div className="w-full bg-gray-200/80 dark:bg-gray-700/50 rounded-full h-4 shadow-inner overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 h-4 rounded-full transition-all duration-1000 shadow-lg relative"
                  style={{ width: `${progressSince1990}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Left Counter */}
          <Card className="bento-card border-orange-300/30 dark:border-orange-700/20 hover:-translate-y-2 hover:shadow-orange-500/20 group sm:col-span-2 lg:col-span-1">
            <CardContent className="p-8 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Countdown to 2050
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {countdown.years}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">YEARS</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {countdown.months}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">MONTHS</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {countdown.days}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">DAYS</div>
                </div>
              </div>
              <div className="flex justify-center gap-2 text-sm font-mono font-semibold text-gray-600 dark:text-gray-400">
                <span className="bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-lg">{countdown.hours.toString().padStart(2, '0')}h</span>
                <span className="bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-lg">{countdown.minutes.toString().padStart(2, '0')}m</span>
                <span className="bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-lg">{countdown.seconds.toString().padStart(2, '0')}s</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}