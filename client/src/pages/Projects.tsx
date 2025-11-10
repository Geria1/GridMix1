import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EnhancedProjectsMap } from '@/components/EnhancedProjectsMap';
import { MapPin, Zap, Activity, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Projects() {
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
                <MapPin className="w-4 h-4" />
                Interactive Map
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in">
              UK Renewable Energy Projects
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto slide-up">
              Explore live data and locations of renewable energy sites across the UK
            </p>

            <p className="text-sm text-white/70 max-w-2xl mx-auto">
              Source: Renewable Energy Planning Database (REPD), UK — Projects &gt;150kW
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 scale-in">
          <Card className="bento-card border-emerald-300/30 dark:border-emerald-700/20 hover:-translate-y-2 hover:glow-green">
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl mb-3 shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Live Data
              </div>
            </CardContent>
          </Card>

          <Card className="bento-card border-blue-300/30 dark:border-blue-700/20 hover:-translate-y-2 hover:glow-blue">
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-3 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Projects</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">70+</div>
            </CardContent>
          </Card>

          <Card className="bento-card border-purple-300/30 dark:border-purple-700/20 hover:-translate-y-2 hover:glow-purple">
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-3 shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Capacity</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">30.3 GW</div>
            </CardContent>
          </Card>

          <Card className="bento-card border-orange-300/30 dark:border-orange-700/20 hover:-translate-y-2 hover:shadow-orange-500/20">
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-3 shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Technologies</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">10 Types</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Projects Map */}
        <div className="bento-card overflow-hidden fade-in">
          <EnhancedProjectsMap />
        </div>
      </div>

      <Footer />
    </div>
  );
}