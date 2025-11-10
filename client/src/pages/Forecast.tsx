import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CarbonForecastChart } from '@/components/CarbonForecastChart';
import { TrendingDown, Clock, Target, RefreshCw, Brain, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default function Forecast() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 dark:from-blue-900 dark:via-cyan-900 dark:to-emerald-900">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center space-y-6">
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 mb-4 scale-in">
              <span className="text-sm font-semibold text-white flex items-center gap-2 justify-center">
                <TrendingDown className="w-4 h-4" />
                AI-Powered Forecasting
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in">
              Carbon Intensity Forecast
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto slide-up">
              72-hour AI predictions for smarter energy timing
            </p>

            <p className="text-sm text-white/70 max-w-2xl mx-auto">
              Machine learning forecasts using Prophet algorithm trained on historical UK electricity data
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 scale-in">
          <Card className="bento-card border-blue-300/30 dark:border-blue-700/20 hover:-translate-y-2 hover:glow-blue">
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-3 shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Forecast Range</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                72 Hours
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card border-emerald-300/30 dark:border-emerald-700/20 hover:-translate-y-2 hover:glow-green">
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl mb-3 shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Smart Timing</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">Enabled</div>
            </CardContent>
          </Card>

          <Card className="bento-card border-purple-300/30 dark:border-purple-700/20 hover:-translate-y-2 hover:glow-purple">
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-3 shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Confidence</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">±15%</div>
            </CardContent>
          </Card>

          <Card className="bento-card border-orange-300/30 dark:border-orange-700/20 hover:-translate-y-2 hover:shadow-orange-500/20">
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-3 shadow-lg">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Updates</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">Every 6h</div>
            </CardContent>
          </Card>
        </div>

        {/* Carbon Forecast Chart Component */}
        <div className="bento-card overflow-hidden mb-12 fade-in">
          <CarbonForecastChart />
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 slide-up">
          <Card className="bento-card hover:-translate-y-2 overflow-hidden">
            <div className="relative bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-emerald-600/10 dark:from-blue-600/20 dark:via-cyan-600/20 dark:to-emerald-600/20 p-6 border-b border-white/20 dark:border-gray-700/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
              <CardTitle className="relative text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                How It Works
              </CardTitle>
            </div>
            <CardContent className="p-6">
              <div className="space-y-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>AI model trained on 30 days of historical carbon intensity data</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">•</span>
                  <span>Considers time patterns, weather factors, and seasonal variations</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span>Predictions include confidence intervals showing uncertainty</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span>Updates automatically every 6 hours with fresh data</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                  <span>Uses Facebook Prophet algorithm for time series forecasting</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card hover:-translate-y-2 overflow-hidden">
            <div className="relative bg-gradient-to-br from-emerald-600/10 via-green-600/10 to-teal-600/10 dark:from-emerald-600/20 dark:via-green-600/20 dark:to-teal-600/20 p-6 border-b border-white/20 dark:border-gray-700/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-3xl"></div>
              <CardTitle className="relative text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                Using the Forecast
              </CardTitle>
            </div>
            <CardContent className="p-6">
              <div className="space-y-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span>Lower values (gCO₂/kWh) mean cleaner electricity</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                  <span>Schedule energy-intensive tasks during predicted low periods</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                  <span>3-hour windows provide optimal planning flexibility</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">•</span>
                  <span>Export CSV data for integration with smart home systems</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Monitor trends to understand grid decarbonization progress</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}