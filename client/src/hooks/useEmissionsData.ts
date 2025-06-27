import { useQuery } from '@tanstack/react-query';

interface UKEmissionsData {
  year: number;
  totalEmissions: number;
  percentageOf1990: number;
  isActual: boolean;
  source: string;
}

interface EmissionsProgress {
  latestYear: number;
  currentReduction: number;
  targetReduction2030: number;
  onTrackForNetZero: boolean;
  projectedNetZeroYear: number;
}

interface EmissionsMilestone {
  year: number;
  title: string;
  description: string;
  emissions?: number;
  significance: 'policy' | 'target' | 'achievement';
}

interface EmissionsPathway {
  historical: UKEmissionsData[];
  projected: UKEmissionsData[];
  combined: UKEmissionsData[];
}

export function useEmissionsProgress() {
  return useQuery<EmissionsProgress>({
    queryKey: ['/api/emissions/progress'],
    staleTime: 1000 * 60 * 60, // 1 hour - emissions data doesn't change frequently
  });
}

export function useEmissionsHistorical() {
  return useQuery<UKEmissionsData[]>({
    queryKey: ['/api/emissions/historical'],
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useEmissionsMilestones() {
  return useQuery<EmissionsMilestone[]>({
    queryKey: ['/api/emissions/milestones'],
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useEmissionsPathway() {
  return useQuery<EmissionsPathway>({
    queryKey: ['/api/emissions/pathway'],
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}