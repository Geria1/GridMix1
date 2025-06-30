import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface DataSource {
  name: string;
  available: boolean;
  lastCheck: string;
  errorMessage?: string;
  priority: number;
}

interface SystemStatus {
  status: 'operational' | 'degraded' | 'offline';
  message: string;
  sources: DataSource[];
}

export function DataSourceAlert() {
  const { data: systemStatus, error } = useQuery<SystemStatus>({
    queryKey: ['/api/data-sources/status'],
    refetchInterval: 2 * 60 * 1000, // Check every 2 minutes
    staleTime: 60 * 1000, // Consider stale after 1 minute
  });

  if (error || !systemStatus || !systemStatus.sources) {
    return null; // Don't show alert if we can't determine status
  }

  const getAlertVariant = (status: string) => {
    switch (status) {
      case 'operational': return 'default';
      case 'degraded': return 'destructive';
      case 'offline': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'offline': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getSourceStatusColor = (available: boolean) => {
    return available 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  // Only show alert if system is not fully operational
  if (systemStatus.status === 'operational') {
    return null;
  }

  return (
    <Alert className="mb-6" variant={getAlertVariant(systemStatus.status)}>
      <div className="flex items-center gap-2">
        {getStatusIcon(systemStatus.status)}
        <AlertDescription className="flex-1">
          <div className="flex flex-col gap-2">
            <span className="font-medium">{systemStatus.message}</span>
            
            {/* Data Source Status */}
            <div className="flex flex-wrap gap-2 mt-2">
              {systemStatus.sources.map((source, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className={`text-xs ${getSourceStatusColor(source.available)}`}
                >
                  {source.name}: {source.available ? 'Active' : 'Unavailable'}
                </Badge>
              ))}
            </div>

            {/* Show specific error for unavailable sources */}
            {systemStatus.sources.some(s => !s.available) && (
              <div className="text-xs text-muted-foreground mt-1">
                {systemStatus.status === 'degraded' 
                  ? 'Dashboard continues to operate with available data sources.' 
                  : 'Some features may be limited until all data sources are restored.'}
              </div>
            )}
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
}