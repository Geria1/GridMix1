import React from 'react';
import { Header } from '@/components/Header';
import { KeyMetrics } from '@/components/KeyMetrics';
import { EnergyMixChart } from '@/components/EnergyMixChart';
import { TrendChart } from '@/components/TrendChart';
import { CarbonIntensityChart } from '@/components/CarbonIntensityChart';
import { RegionalHighlights } from '@/components/RegionalHighlights';
import { SystemStatus } from '@/components/SystemStatus';
import { NetZeroProgressChart } from '@/components/NetZeroProgressChart';
import { Footer } from '@/components/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useCurrentEnergyData } from '@/hooks/useEnergyData';

export default function Dashboard() {
  const { data: energyData, error } = useCurrentEnergyData();

  const getRenewableAlert = () => {
    if (!energyData?.energyMix) return null;
    
    const renewableShare = energyData.energyMix.wind + energyData.energyMix.solar + 
                          energyData.energyMix.hydro + energyData.energyMix.biomass;
    
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
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        {!error && getRenewableAlert() && (
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-300">
              {getRenewableAlert()}
            </AlertDescription>
          </Alert>
        )}

        <KeyMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <EnergyMixChart />
          <TrendChart />
        </div>

        <CarbonIntensityChart />

        <NetZeroProgressChart />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RegionalHighlights />
          <SystemStatus />
        </div>
      </main>

      <Footer />
    </div>
  );
}
