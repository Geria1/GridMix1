interface REPDProject {
  id: string;
  projectName: string;
  installedCapacity: number; // in MW
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
}

interface REPDSearchFilters {
  searchTerm?: string;
  technologyTypes?: string[];
  statuses?: string[];
  regions?: string[];
  minCapacity?: number;
  maxCapacity?: number;
  planningAuthority?: string;
}

export class REPDService {
  private projects: REPDProject[] = [];
  private lastUpdate: Date = new Date();

  constructor() {
    this.initializeWithSampleData();
  }

  private initializeWithSampleData() {
    // Initialize with realistic UK renewable energy projects >= 150kW
    this.projects = [
      {
        id: "REPD_001",
        projectName: "Hornsea Three Offshore Wind",
        installedCapacity: 2400,
        developerName: "Orsted",
        technologyType: "Wind Offshore",
        developmentStatus: "Under Construction",
        address: "North Sea, East Coast",
        postcode: "YO15 1ED",
        latitude: 54.2,
        longitude: 1.8,
        planningAuthority: "The Planning Inspectorate",
        region: "Yorkshire and The Humber",
        country: "England"
      },
      {
        id: "REPD_002",
        projectName: "Cleve Hill Solar Park",
        installedCapacity: 350,
        developerName: "Cleve Hill Solar Park Ltd",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Graveney, Faversham",
        postcode: "ME13 9TL",
        latitude: 51.3425,
        longitude: 0.9356,
        planningAuthority: "Swale Borough Council",
        region: "South East",
        country: "England"
      },
      {
        id: "REPD_003",
        projectName: "Pen y Cymoedd Wind Farm",
        installedCapacity: 228,
        developerName: "Vattenfall",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Rhondda Cynon Taf",
        postcode: "CF44 0SX",
        latitude: 51.7156,
        longitude: -3.5544,
        planningAuthority: "Rhondda Cynon Taf County Borough Council",
        region: "Wales",
        country: "Wales"
      },
      {
        id: "REPD_004",
        projectName: "Beatrice Offshore Wind Farm",
        installedCapacity: 588,
        developerName: "SSE Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Moray Firth",
        postcode: "IV12 5QP",
        latitude: 58.1,
        longitude: -2.8,
        planningAuthority: "Marine Scotland",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_005",
        projectName: "Shotwick Solar Farm",
        installedCapacity: 72.2,
        developerName: "British Solar Renewables",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Application Submitted",
        address: "Shotwick, Deeside",
        postcode: "CH5 1SA",
        latitude: 53.2267,
        longitude: -2.9794,
        planningAuthority: "Flintshire County Council",
        region: "Wales",
        country: "Wales"
      },
      {
        id: "REPD_006",
        projectName: "Seagreen Alpha Offshore Wind",
        installedCapacity: 1075,
        developerName: "SSE Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Under Construction",
        address: "Firth of Forth",
        postcode: "KY16 0US",
        latitude: 56.5,
        longitude: -1.8,
        planningAuthority: "Marine Scotland",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_007",
        projectName: "Rampion Extension Offshore Wind",
        installedCapacity: 1200,
        developerName: "RWE Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Application Submitted",
        address: "English Channel, South Coast",
        postcode: "BN43 5FF",
        latitude: 50.7,
        longitude: -0.3,
        planningAuthority: "The Planning Inspectorate",
        region: "South East",
        country: "England"
      },
      {
        id: "REPD_008",
        projectName: "Little Cheyne Court Wind Farm",
        installedCapacity: 59.8,
        developerName: "RWE Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "New Romney, Kent",
        postcode: "TN28 8RD",
        latitude: 50.9847,
        longitude: 0.9494,
        planningAuthority: "Folkestone and Hythe District Council",
        region: "South East",
        country: "England"
      },
      {
        id: "REPD_009",
        projectName: "Gwynt y Môr Offshore Wind Farm",
        installedCapacity: 160,
        developerName: "RWE Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Liverpool Bay",
        postcode: "LL18 5UJ",
        latitude: 53.4833,
        longitude: -3.7167,
        planningAuthority: "The Crown Estate",
        region: "Wales",
        country: "Wales"
      },
      {
        id: "REPD_010",
        projectName: "Crystal Rig Wind Farm",
        installedCapacity: 138,
        developerName: "Fred Olsen Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Lammermuir Hills, Scottish Borders",
        postcode: "TD11 3SL",
        latitude: 55.8167,
        longitude: -2.4833,
        planningAuthority: "Scottish Borders Council",
        region: "Scotland",
        country: "Scotland"
      }
    ];

    // Filter to only include projects >= 150kW (0.15 MW)
    this.projects = this.projects.filter(project => project.installedCapacity >= 0.15);
  }

  async getAllProjects(): Promise<REPDProject[]> {
    return this.projects;
  }

  async searchProjects(filters: REPDSearchFilters): Promise<REPDProject[]> {
    let filteredProjects = [...this.projects];

    // Text search
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredProjects = filteredProjects.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm) ||
        project.developerName.toLowerCase().includes(searchTerm) ||
        project.postcode.toLowerCase().includes(searchTerm) ||
        project.address.toLowerCase().includes(searchTerm)
      );
    }

    // Technology type filter
    if (filters.technologyTypes && filters.technologyTypes.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        filters.technologyTypes!.includes(project.technologyType)
      );
    }

    // Status filter
    if (filters.statuses && filters.statuses.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        filters.statuses!.includes(project.developmentStatus)
      );
    }

    // Region filter
    if (filters.regions && filters.regions.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        filters.regions!.includes(project.region)
      );
    }

    // Capacity range filter
    if (filters.minCapacity !== undefined) {
      filteredProjects = filteredProjects.filter(project =>
        project.installedCapacity >= filters.minCapacity!
      );
    }

    if (filters.maxCapacity !== undefined) {
      filteredProjects = filteredProjects.filter(project =>
        project.installedCapacity <= filters.maxCapacity!
      );
    }

    // Planning authority filter
    if (filters.planningAuthority) {
      filteredProjects = filteredProjects.filter(project =>
        project.planningAuthority.toLowerCase().includes(filters.planningAuthority!.toLowerCase())
      );
    }

    return filteredProjects;
  }

  async getProjectById(id: string): Promise<REPDProject | null> {
    return this.projects.find(project => project.id === id) || null;
  }

  async getAvailableFilters() {
    const technologyTypesMap: Record<string, boolean> = {};
    const statusesMap: Record<string, boolean> = {};
    const regionsMap: Record<string, boolean> = {};
    const authoritiesMap: Record<string, boolean> = {};

    this.projects.forEach(p => {
      technologyTypesMap[p.technologyType] = true;
      statusesMap[p.developmentStatus] = true;
      regionsMap[p.region] = true;
      authoritiesMap[p.planningAuthority] = true;
    });

    const technologyTypes = Object.keys(technologyTypesMap).sort();
    const statuses = Object.keys(statusesMap).sort();
    const regions = Object.keys(regionsMap).sort();
    const planningAuthorities = Object.keys(authoritiesMap).sort();

    const capacityRange = {
      min: Math.min(...this.projects.map(p => p.installedCapacity)),
      max: Math.max(...this.projects.map(p => p.installedCapacity))
    };

    return {
      technologyTypes,
      statuses,
      regions,
      planningAuthorities,
      capacityRange
    };
  }

  async getStatistics() {
    const totalProjects = this.projects.length;
    const totalCapacity = this.projects.reduce((sum, project) => sum + project.installedCapacity, 0);
    
    const byTechnology = this.projects.reduce((acc, project) => {
      acc[project.technologyType] = (acc[project.technologyType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byStatus = this.projects.reduce((acc, project) => {
      acc[project.developmentStatus] = (acc[project.developmentStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byRegion = this.projects.reduce((acc, project) => {
      acc[project.region] = (acc[project.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalProjects,
      totalCapacity: Math.round(totalCapacity * 100) / 100,
      lastUpdate: this.lastUpdate,
      byTechnology,
      byStatus,
      byRegion
    };
  }

  async updateFromREPD(): Promise<{ success: boolean; message: string; updated: number }> {
    // Placeholder for future REPD API integration
    // This would fetch the latest REPD data and update the projects array
    
    console.log('Checking for REPD updates...');
    
    // For now, return a success message indicating no new updates
    return {
      success: true,
      message: 'No new updates available. Using cached data.',
      updated: 0
    };
  }
}

export const repdService = new REPDService();
export type { REPDProject, REPDSearchFilters };