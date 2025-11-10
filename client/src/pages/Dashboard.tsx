import React, { memo } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { KeyMetrics } from '@/components/KeyMetrics';
import { EnergyMixDashboard } from '@/components/EnergyMixDashboard';
import { CarbonIntensityChart } from '@/components/CarbonIntensityChart';
import { NetZeroCountdownChart } from '@/components/NetZeroCountdownChart';
import { AnalysisInsightsPanel } from '@/components/AnalysisInsightsPanel';
import { RegionalHighlights } from '@/components/RegionalHighlights';
import { SystemStatus } from '@/components/SystemStatus';
import { EnhancedDataSources } from '@/components/EnhancedDataSources';
import { EnergySavingTipsCarousel } from '@/components/EnergySavingTipsCarousel';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DataSourceAlert } from '@/components/DataSourceAlert';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';

export default function Dashboard() {
  const { data: energyData, error } = useCurrentEnergyData();

  const getRenewableAlert = () => {
    if (!energyData?.energyMix) return null;
    
    const mix = energyData.energyMix;
    const totalGeneration = mix.wind + mix.solar + mix.nuclear + mix.gas + mix.coal + mix.hydro + mix.biomass + mix.other;
    const renewableGeneration = mix.wind + mix.solar + mix.hydro + mix.biomass;
    const renewableShare = totalGeneration > 0 ? (renewableGeneration / totalGeneration) * 100 : 0;
    
    if (renewableShare > 60) {
      return `High renewable generation today: ${renewableShare.toFixed(1)}% from renewable sources`;
    }
    
    if (energyData.carbonIntensity < 100) {
      return `Very low carbon intensity: ${energyData.carbonIntensity} gCO₂/kWh - cleanest energy mix of the day`;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mesh-gradient transition-colors">
      {/* Hero Section */}
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Data Source Health Alert */}
        <div className="fade-in">
          <ErrorBoundary>
            <DataSourceAlert />
          </ErrorBoundary>
        </div>

        {/* Alert Banner */}
        {!error && getRenewableAlert() && (
          <div className="scale-in">
            <Alert className="mb-6 glass-card bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-300/50 dark:border-blue-700/50">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-300 font-medium">
                {getRenewableAlert()}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Key Metrics */}
        <div className="slide-up">
          <KeyMetrics />
        </div>

        {/* Energy Mix Dashboard with Tabs */}
        <div className="fade-in">
          <EnergyMixDashboard />
        </div>

        {/* Carbon Intensity Tracking */}
        <div className="slide-up">
          <CarbonIntensityChart />
        </div>

        {/* Emissions Trajectory Section */}
        <div className="fade-in">
          <NetZeroCountdownChart />
        </div>

        {/* Analysis & Insights Panels */}
        <div className="scale-in">
          <AnalysisInsightsPanel />
        </div>

        {/* Regional and System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 slide-up">
          <RegionalHighlights />
          <SystemStatus />
        </div>

        {/* Energy Saving Tips Carousel */}
        <section className="mb-8 fade-in">
          <EnergySavingTipsCarousel />
        </section>

        {/* Enhanced Data Sources */}
        <div className="scale-in">
          <EnhancedDataSources />
        </div>
      </main>

      <Footer />
    </div>
  );
}
