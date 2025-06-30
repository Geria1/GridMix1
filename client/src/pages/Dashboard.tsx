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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Data Source Health Alert */}
        <ErrorBoundary>
          <DataSourceAlert />
        </ErrorBoundary>

        {/* Alert Banner */}
        {!error && getRenewableAlert() && (
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-300">
              {getRenewableAlert()}
            </AlertDescription>
          </Alert>
        )}

        {/* Key Metrics */}
        <KeyMetrics />

        {/* Energy Mix Dashboard with Tabs */}
        <EnergyMixDashboard />

        {/* Carbon Intensity Tracking */}
        <CarbonIntensityChart />

        {/* Emissions Trajectory Section */}
        <NetZeroCountdownChart />

        {/* Analysis & Insights Panels */}
        <AnalysisInsightsPanel />

        {/* Regional and System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <RegionalHighlights />
          <SystemStatus />
        </div>

        {/* Energy Saving Tips Carousel */}
        <section className="mb-8">
          <EnergySavingTipsCarousel />
        </section>

        {/* Enhanced Data Sources */}
        <EnhancedDataSources />
      </main>

      <Footer />
    </div>
  );
}
