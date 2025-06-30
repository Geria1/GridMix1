import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  MapPin, 
  Building2, 
  Calendar, 
  TrendingUp, 
  Activity,
  Wind,
  Sun,
  Waves,
  Factory,
  Fuel,
  Recycle,
  Search,
  Filter,
  RotateCcw,
  Eye,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in production
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LiveGeneration {
  currentOutput: number;
  capacityFactor: number;
  lastUpdated: Date;
  status: 'online' | 'offline' | 'maintenance' | 'unavailable';
  dailyOutput: number;
  monthlyOutput: number;
  annualOutput: number;
}

interface REPDProject {
  id: string;
  projectName: string;
  installedCapacity: number;
  developerName: string;
  technologyType: string;
  developmentStatus: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  planningAuthority: string;
  submissionDate?: string;
  commissioningDate?: string;
  region: string;
  country: string;
  liveGeneration?: LiveGeneration;
}

interface SearchFilters {
  searchTerm?: string;
  technologyTypes?: string[];
  statuses?: string[];
  regions?: string[];
  minCapacity?: number;
  maxCapacity?: number;
  planningAuthority?: string;
}

interface LiveGenerationSummary {
  totalCurrentOutput: number;
  totalInstalledCapacity: number;
  averageCapacityFactor: number;
  onlineProjects: number;
  offlineProjects: number;
}

// Technology type icons and colors
const getTechnologyIcon = (type: string) => {
  switch (type) {
    case 'Wind Offshore':
    case 'Wind Onshore':
      return <Wind className="h-4 w-4" />;
    case 'Solar Photovoltaics':
      return <Sun className="h-4 w-4" />;
    case 'Hydro':
    case 'Tidal':
      return <Waves className="h-4 w-4" />;
    case 'Biomass':
    case 'Energy from Waste':
      return <Factory className="h-4 w-4" />;
    case 'Landfill Gas':
    case 'Anaerobic Digestion':
      return <Fuel className="h-4 w-4" />;
    default:
      return <Recycle className="h-4 w-4" />;
  }
};

const getTechnologyColor = (type: string) => {
  switch (type) {
    case 'Wind Offshore':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'Wind Onshore':
      return 'text-blue-500 bg-blue-50 border-blue-200';
    case 'Solar Photovoltaics':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Hydro':
      return 'text-cyan-600 bg-cyan-50 border-cyan-200';
    case 'Biomass':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'Tidal':
      return 'text-teal-600 bg-teal-50 border-teal-200';
    case 'Wave':
      return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    case 'Energy from Waste':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Landfill Gas':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'Anaerobic Digestion':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Operational':
      return 'text-green-700 bg-green-50 border-green-200';
    case 'Under Construction':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'Consented':
      return 'text-purple-700 bg-purple-50 border-purple-200';
    case 'Application Submitted':
      return 'text-orange-700 bg-orange-50 border-orange-200';
    case 'Pre-Planning':
      return 'text-gray-700 bg-gray-50 border-gray-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

const getGenerationStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'text-green-700 bg-green-50 border-green-200';
    case 'offline':
      return 'text-red-700 bg-red-50 border-red-200';
    case 'maintenance':
      return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    case 'unavailable':
      return 'text-gray-700 bg-gray-50 border-gray-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

export function EnhancedProjectsMap() {
  const [selectedProject, setSelectedProject] = useState<REPDProject | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [capacityRange, setCapacityRange] = useState<[number, number]>([0, 2400]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Responsive design detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch projects data
  const { data: projects = [], isLoading: projectsLoading } = useQuery<REPDProject[]>({
    queryKey: ['/api/repd/projects'],
    refetchInterval: 30000, // Refresh every 30 seconds for live data
  });

  // Fetch filter options
  const { data: filterOptions } = useQuery<{
    technologyTypes: string[];
    statuses: string[];
    regions: string[];
    planningAuthorities: string[];
    capacityRange: { min: number; max: number };
  }>({
    queryKey: ['/api/repd/filters'],
  });

  // Fetch live generation summary
  const { data: liveSummary } = useQuery<LiveGenerationSummary>({
    queryKey: ['/api/repd/live-generation/summary'],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Filter projects based on current filters
  const filteredProjects = projects.filter((project) => {
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      if (!project.projectName.toLowerCase().includes(term) &&
          !project.developerName.toLowerCase().includes(term) &&
          !project.postcode.toLowerCase().includes(term)) {
        return false;
      }
    }

    if (filters.technologyTypes && filters.technologyTypes.length > 0) {
      if (!filters.technologyTypes.includes(project.technologyType)) {
        return false;
      }
    }

    if (filters.statuses && filters.statuses.length > 0) {
      if (!filters.statuses.includes(project.developmentStatus)) {
        return false;
      }
    }

    if (filters.regions && filters.regions.length > 0) {
      if (!filters.regions.includes(project.region)) {
        return false;
      }
    }

    if (project.installedCapacity < capacityRange[0] || project.installedCapacity > capacityRange[1]) {
      return false;
    }

    return true;
  });

  const clearFilters = () => {
    setFilters({});
    setCapacityRange([0, 2400]);
  };

  const createCustomIcon = (project: REPDProject) => {
    const isOperational = project.developmentStatus === 'Operational';
    const hasLiveData = project.liveGeneration;
    const isOnline = hasLiveData?.status === 'online';
    
    let color = '#6b7280'; // gray
    if (isOperational && hasLiveData) {
      color = isOnline ? '#059669' : '#dc2626'; // green if online, red if offline
    } else if (project.developmentStatus === 'Under Construction') {
      color = '#2563eb'; // blue
    } else if (project.developmentStatus === 'Consented') {
      color = '#7c3aed'; // purple
    }

    const svgIcon = `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="8" fill="white"/>
        <circle cx="12.5" cy="12.5" r="4" fill="${color}"/>
      </svg>
    `;

    return new L.DivIcon({
      html: svgIcon,
      className: 'custom-marker',
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
      popupAnchor: [0, -41],
    });
  };

  if (projectsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Generation Summary */}
      {liveSummary && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-green-600" />
              Live Generation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {liveSummary.totalCurrentOutput.toLocaleString()} MW
                </div>
                <div className="text-sm text-gray-600">Current Output</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  {liveSummary.averageCapacityFactor}%
                </div>
                <div className="text-sm text-gray-600">Capacity Factor</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">
                  {liveSummary.totalInstalledCapacity.toLocaleString()} MW
                </div>
                <div className="text-sm text-gray-600">Total Capacity</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {liveSummary.onlineProjects}
                </div>
                <div className="text-sm text-gray-600">Online</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {liveSummary.offlineProjects}
                </div>
                <div className="text-sm text-gray-600">Offline</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className={cn(
        "flex gap-6",
        isMobileView ? "flex-col" : "flex-row"
      )}>
        {/* Filters Panel */}
        <Card className={cn(
          "transition-all duration-300",
          isMobileView ? "w-full" : "w-80 flex-shrink-0"
        )}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              {isMobileView && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                >
                  {isFilterExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className={cn(
            "space-y-4",
            isMobileView && !isFilterExpanded && "hidden"
          )}>
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Projects</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Project name, developer, postcode..."
                  value={filters.searchTerm || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Technology Type */}
            <div className="space-y-2">
              <Label>Technology Type</Label>
              <Select 
                value={filters.technologyTypes?.[0] || ''} 
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  technologyTypes: value ? [value] : undefined 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All technologies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All technologies</SelectItem>
                  {filterOptions?.technologyTypes?.map((type: string) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        {getTechnologyIcon(type)}
                        {type}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Development Status */}
            <div className="space-y-2">
              <Label>Development Status</Label>
              <Select 
                value={filters.statuses?.[0] || ''} 
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  statuses: value ? [value] : undefined 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  {filterOptions?.statuses?.map((status: string) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label>Region</Label>
              <Select 
                value={filters.regions?.[0] || ''} 
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  regions: value ? [value] : undefined 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All regions</SelectItem>
                  {filterOptions?.regions?.map((region: string) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Capacity Range */}
            <div className="space-y-3">
              <Label>Capacity Range (MW)</Label>
              <div className="px-2">
                <Slider
                  value={capacityRange}
                  onValueChange={(value) => setCapacityRange(value as [number, number])}
                  max={2400}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{capacityRange[0]} MW</span>
                <span>{capacityRange[1]} MW</span>
              </div>
            </div>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>

            {/* Results Count */}
            <div className="text-sm text-gray-600 text-center pt-2 border-t">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Interactive Map
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Project List
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="h-[600px] w-full rounded-lg overflow-hidden">
                    <MapContainer
                      center={[54.5, -2.0]}
                      zoom={6}
                      style={{ height: '100%', width: '100%' }}
                      className="rounded-lg"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      
                      <MarkerClusterGroup>
                        {filteredProjects.map((project: REPDProject) => (
                          <Marker
                            key={project.id}
                            position={[project.latitude, project.longitude]}
                            icon={createCustomIcon(project)}
                            eventHandlers={{
                              click: () => setSelectedProject(project)
                            }}
                          >
                            <Popup>
                              <div className="p-2 max-w-xs">
                                <h3 className="font-semibold text-sm mb-2">{project.projectName}</h3>
                                <div className="space-y-1 text-xs">
                                  <div className="flex justify-between">
                                    <span>Capacity:</span>
                                    <span className="font-medium">{project.installedCapacity} MW</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Developer:</span>
                                    <span className="font-medium">{project.developerName}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Status:</span>
                                    <Badge className={cn("text-xs px-1 py-0", getStatusColor(project.developmentStatus))}>
                                      {project.developmentStatus}
                                    </Badge>
                                  </div>
                                  {project.liveGeneration && (
                                    <div className="mt-2 pt-2 border-t border-gray-200">
                                      <div className="flex justify-between">
                                        <span>Live Output:</span>
                                        <span className="font-medium text-green-600">
                                          {project.liveGeneration.currentOutput} MW
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Capacity Factor:</span>
                                        <span className="font-medium">
                                          {project.liveGeneration.capacityFactor}%
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </MarkerClusterGroup>
                    </MapContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <ScrollArea className="h-[600px] w-full">
                <div className="space-y-3 pr-4">
                  {filteredProjects.map((project: REPDProject) => (
                    <Card 
                      key={project.id} 
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        selectedProject?.id === project.id && "ring-2 ring-blue-500"
                      )}
                      onClick={() => setSelectedProject(project)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{project.projectName}</h3>
                            <p className="text-gray-600 text-sm mb-2">{project.developerName}</p>
                            
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={cn("text-xs", getTechnologyColor(project.technologyType))}>
                                {getTechnologyIcon(project.technologyType)}
                                <span className="ml-1">{project.technologyType}</span>
                              </Badge>
                              <Badge className={cn("text-xs", getStatusColor(project.developmentStatus))}>
                                {project.developmentStatus}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                {project.installedCapacity} MW
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {project.region}
                              </span>
                            </div>
                          </div>

                          {project.liveGeneration && (
                            <div className="flex flex-col items-end gap-1 min-w-[120px]">
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">
                                  {project.liveGeneration.currentOutput} MW
                                </div>
                                <div className="text-xs text-gray-500">Live Output</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {project.liveGeneration.capacityFactor}%
                                </div>
                                <div className="text-xs text-gray-500">Capacity Factor</div>
                              </div>
                              <Badge className={cn("text-xs mt-1", getGenerationStatusColor(project.liveGeneration.status))}>
                                {project.liveGeneration.status}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Project Details Panel */}
        {selectedProject && (
          <Card className={cn(
            "transition-all duration-300",
            isMobileView ? "w-full" : "w-80 flex-shrink-0"
          )}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Project Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{selectedProject.projectName}</h3>
                <p className="text-gray-600">{selectedProject.developerName}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className={cn("text-xs", getTechnologyColor(selectedProject.technologyType))}>
                  {getTechnologyIcon(selectedProject.technologyType)}
                  <span className="ml-1">{selectedProject.technologyType}</span>
                </Badge>
                <Badge className={cn("text-xs", getStatusColor(selectedProject.developmentStatus))}>
                  {selectedProject.developmentStatus}
                </Badge>
              </div>

              {selectedProject.liveGeneration && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      Live Generation Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-white rounded border">
                        <div className="font-bold text-green-600">
                          {selectedProject.liveGeneration.currentOutput} MW
                        </div>
                        <div className="text-xs text-gray-600">Current Output</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded border">
                        <div className="font-bold">
                          {selectedProject.liveGeneration.capacityFactor}%
                        </div>
                        <div className="text-xs text-gray-600">Capacity Factor</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Status:</span>
                        <Badge className={cn("text-xs", getGenerationStatusColor(selectedProject.liveGeneration.status))}>
                          {selectedProject.liveGeneration.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Daily Output:</span>
                        <span className="text-sm font-medium">{selectedProject.liveGeneration.dailyOutput.toLocaleString()} MWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Output:</span>
                        <span className="text-sm font-medium">{selectedProject.liveGeneration.monthlyOutput.toLocaleString()} MWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Annual Output:</span>
                        <span className="text-sm font-medium">{selectedProject.liveGeneration.annualOutput.toLocaleString()} MWh</span>
                      </div>
                    </div>

                    <Progress 
                      value={selectedProject.liveGeneration.capacityFactor} 
                      className="h-2"
                    />
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-gray-400" />
                  <span>Installed Capacity:</span>
                  <span className="font-medium">{selectedProject.installedCapacity} MW</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>Location:</span>
                  <span className="font-medium">{selectedProject.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span>Planning Authority:</span>
                  <span className="font-medium text-xs">{selectedProject.planningAuthority}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>Region:</span>
                  <span className="font-medium">{selectedProject.region}, {selectedProject.country}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Postcode:</span>
                  <span className="font-medium">{selectedProject.postcode}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Coordinates:</span>
                  <span className="font-medium text-xs">
                    {selectedProject.latitude.toFixed(4)}, {selectedProject.longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}