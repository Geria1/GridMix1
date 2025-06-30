import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Wind, Sun, Zap, Waves, MapPin, Search, Filter, RefreshCw, BarChart3 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  region: string;
  country: string;
}

interface SearchFilters {
  searchTerm: string;
  technologyTypes: string[];
  statuses: string[];
  regions: string[];
  minCapacity: number;
  maxCapacity: number;
}

const getTechnologyIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'wind onshore':
    case 'wind offshore':
      return Wind;
    case 'solar photovoltaics':
      return Sun;
    case 'nuclear':
      return Zap;
    case 'hydro':
    case 'tidal':
      return Waves;
    default:
      return Zap;
  }
};

const getTechnologyColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'wind onshore':
    case 'wind offshore':
      return '#00BFFF';
    case 'solar photovoltaics':
      return '#FFD700';
    case 'nuclear':
      return '#FF6347';
    case 'hydro':
    case 'tidal':
      return '#4682B4';
    default:
      return '#808080';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'operational':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'under construction':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'application submitted':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'planning permission granted':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const createCustomIcon = (type: string) => {
  const color = getTechnologyColor(type);
  const iconHtml = `
    <div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

export function ProjectsMap() {
  const [selectedProject, setSelectedProject] = useState<REPDProject | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    technologyTypes: [],
    statuses: [],
    regions: [],
    minCapacity: 0.15,
    maxCapacity: 3000
  });
  const [showFilters, setShowFilters] = useState(false);

  const queryClient = useQueryClient();

  // Fetch projects based on current filters
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['/api/repd/projects', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.searchTerm) params.append('search', filters.searchTerm);
      if (filters.technologyTypes.length > 0) {
        filters.technologyTypes.forEach(tech => params.append('technology', tech));
      }
      if (filters.statuses.length > 0) {
        filters.statuses.forEach(status => params.append('status', status));
      }
      if (filters.regions.length > 0) {
        filters.regions.forEach(region => params.append('region', region));
      }
      if (filters.minCapacity > 0.15) params.append('minCapacity', filters.minCapacity.toString());
      if (filters.maxCapacity < 3000) params.append('maxCapacity', filters.maxCapacity.toString());

      const response = await fetch(`/api/repd/projects?${params}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    }
  });

  // Fetch available filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['/api/repd/filters'],
    queryFn: async () => {
      const response = await fetch('/api/repd/filters');
      if (!response.ok) throw new Error('Failed to fetch filter options');
      return response.json();
    }
  });

  // Fetch statistics
  const { data: statistics } = useQuery({
    queryKey: ['/api/repd/statistics'],
    queryFn: async () => {
      const response = await fetch('/api/repd/statistics');
      if (!response.ok) throw new Error('Failed to fetch statistics');
      return response.json();
    }
  });

  // Update data mutation
  const updateMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/repd/update', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to update data');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/repd/projects'] });
      queryClient.invalidateQueries({ queryKey: ['/api/repd/statistics'] });
    }
  });

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      technologyTypes: [],
      statuses: [],
      regions: [],
      minCapacity: 0.15,
      maxCapacity: 3000
    });
  };

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 dark:border-red-700">
          <CardContent className="p-6">
            <div className="text-center text-red-600 dark:text-red-400">
              Error loading renewable energy projects: {(error as Error).message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              UK Renewable Energy Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive map of projects ≥ 150kW from the REPD database
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateMutation.mutate()}
              disabled={updateMutation.isPending}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={updateMutation.isPending ? 'animate-spin' : ''} />
              Update
            </Button>
          </div>
        </div>

        {/* Statistics */}
        {statistics && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {statistics.totalProjects}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {statistics.totalCapacity.toLocaleString()} MW
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {projects.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Filtered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {new Date(statistics.lastUpdate).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Last Update</div>
            </div>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="search"
                  placeholder="Project name, developer, postcode..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Technology Type */}
            <div>
              <Label>Technology</Label>
              <Select 
                value={filters.technologyTypes[0] || ''} 
                onValueChange={(value) => handleFilterChange('technologyTypes', value ? [value] : [])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All technologies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All technologies</SelectItem>
                  {filterOptions?.technologyTypes?.map((tech: string) => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <Select 
                value={filters.statuses[0] || ''} 
                onValueChange={(value) => handleFilterChange('statuses', value ? [value] : [])}
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
            <div>
              <Label>Region</Label>
              <Select 
                value={filters.regions[0] || ''} 
                onValueChange={(value) => handleFilterChange('regions', value ? [value] : [])}
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
          </div>

          {/* Capacity Range */}
          <div className="mt-4">
            <Label>Capacity Range (MW): {filters.minCapacity} - {filters.maxCapacity}</Label>
            <div className="mt-2 px-2">
              <Slider
                value={[filters.minCapacity, filters.maxCapacity]}
                min={0.15}
                max={3000}
                step={0.1}
                onValueChange={([min, max]) => {
                  handleFilterChange('minCapacity', min);
                  handleFilterChange('maxCapacity', max);
                }}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <Skeleton className="h-8 w-32 mb-2" />
              <p className="text-gray-600 dark:text-gray-400">Loading renewable energy projects...</p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={[54.5, -3.0]} // Center of UK
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {projects.map((project: REPDProject) => (
              <Marker
                key={project.id}
                position={[project.latitude, project.longitude]}
                icon={createCustomIcon(project.technologyType)}
                eventHandlers={{
                  click: () => setSelectedProject(project)
                }}
              >
                <Popup>
                  <div className="min-w-[250px]">
                    <h3 className="font-semibold text-lg mb-2">{project.projectName}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">{project.installedCapacity} MW</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Technology:</span>
                        <span className="font-medium">{project.technologyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Developer:</span>
                        <span className="font-medium">{project.developerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(project.developmentStatus)}>
                          {project.developmentStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{project.region}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Project Details Panel */}
        {selectedProject && (
          <div className="absolute top-4 right-4 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{selectedProject.projectName}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {React.createElement(getTechnologyIcon(selectedProject.technologyType), {
                      size: 20,
                      className: "text-blue-600"
                    })}
                    <span className="font-medium">{selectedProject.technologyType}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Capacity</span>
                      <div className="font-semibold">{selectedProject.installedCapacity} MW</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Developer</span>
                      <div className="font-semibold">{selectedProject.developerName}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Status</span>
                    <div className="mt-1">
                      <Badge className={getStatusColor(selectedProject.developmentStatus)}>
                        {selectedProject.developmentStatus}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Location</span>
                    <div className="font-medium">{selectedProject.address}</div>
                    <div className="text-sm text-gray-500">{selectedProject.postcode}, {selectedProject.region}</div>
                  </div>

                  <div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Planning Authority</span>
                    <div className="font-medium text-sm">{selectedProject.planningAuthority}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}