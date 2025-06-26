import { useQuery } from '@tanstack/react-query';
import type { EnergyData, ApiStatus } from '@/types/energy';

export function useCurrentEnergyData() {
  return useQuery<EnergyData>({
    queryKey: ['/api/energy/current'],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 4 * 60 * 1000, // Consider data stale after 4 minutes
  });
}

export function useEnergyHistory(hours: number = 24) {
  return useQuery<EnergyData[]>({
    queryKey: ['/api/energy/history', hours],
    refetchInterval: 5 * 60 * 1000,
    staleTime: 4 * 60 * 1000,
  });
}

export function useApiStatus() {
  return useQuery<ApiStatus>({
    queryKey: ['/api/energy/status'],
    refetchInterval: 2 * 60 * 1000, // Check status every 2 minutes
    staleTime: 1 * 60 * 1000,
  });
}
