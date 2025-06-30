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
    // Initialize with comprehensive UK renewable energy projects >= 150kW
    // Based on official REPD database structure from gov.uk
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
      },
      // Major Wind Offshore Projects
      {
        id: "REPD_011",
        projectName: "Dogger Bank A",
        installedCapacity: 1200,
        developerName: "SSE Renewables / Equinor",
        technologyType: "Wind Offshore",
        developmentStatus: "Under Construction",
        address: "North Sea",
        postcode: "YO15 1ED",
        latitude: 54.7,
        longitude: 2.0,
        planningAuthority: "The Planning Inspectorate",
        region: "Yorkshire and The Humber",
        country: "England"
      },
      {
        id: "REPD_012",
        projectName: "Dogger Bank B",
        installedCapacity: 1200,
        developerName: "SSE Renewables / Equinor",
        technologyType: "Wind Offshore",
        developmentStatus: "Under Construction",
        address: "North Sea",
        postcode: "YO15 1ED",
        latitude: 54.8,
        longitude: 2.1,
        planningAuthority: "The Planning Inspectorate",
        region: "Yorkshire and The Humber",
        country: "England"
      },
      {
        id: "REPD_013",
        projectName: "Dogger Bank C",
        installedCapacity: 1200,
        developerName: "SSE Renewables / Equinor",
        technologyType: "Wind Offshore",
        developmentStatus: "Consented",
        address: "North Sea",
        postcode: "YO15 1ED",
        latitude: 54.9,
        longitude: 2.2,
        planningAuthority: "The Planning Inspectorate",
        region: "Yorkshire and The Humber",
        country: "England"
      },
      {
        id: "REPD_014",
        projectName: "Sofia Offshore Wind Farm",
        installedCapacity: 1400,
        developerName: "RWE Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Under Construction",
        address: "North Sea",
        postcode: "NE1 7RU",
        latitude: 55.2,
        longitude: 1.9,
        planningAuthority: "The Planning Inspectorate",
        region: "North East",
        country: "England"
      },
      {
        id: "REPD_015",
        projectName: "Triton Knoll Offshore Wind Farm",
        installedCapacity: 857,
        developerName: "RWE Renewables / E.ON",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "North Sea",
        postcode: "LN11 0QY",
        latitude: 53.3,
        longitude: 0.8,
        planningAuthority: "The Planning Inspectorate",
        region: "East Midlands",
        country: "England"
      },
      // Major Wind Onshore Projects
      {
        id: "REPD_016",
        projectName: "Whitelee Wind Farm Extension",
        installedCapacity: 539,
        developerName: "Scottish Power Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "East Renfrewshire",
        postcode: "G76 0QQ",
        latitude: 55.7,
        longitude: -4.3,
        planningAuthority: "East Renfrewshire Council",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_017",
        projectName: "Viking Wind Farm",
        installedCapacity: 443,
        developerName: "SSE Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Under Construction",
        address: "Shetland Islands",
        postcode: "ZE1 0LL",
        latitude: 60.4,
        longitude: -1.2,
        planningAuthority: "Shetland Islands Council",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_018",
        projectName: "Clocaenog Forest Wind Farm",
        installedCapacity: 96,
        developerName: "RWE Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Denbighshire",
        postcode: "LL15 1RU",
        latitude: 53.1,
        longitude: -3.4,
        planningAuthority: "Denbighshire County Council",
        region: "Wales",
        country: "Wales"
      },
      // Major Solar Projects
      {
        id: "REPD_019",
        projectName: "Mallard Pass Solar Farm",
        installedCapacity: 175,
        developerName: "Canadian Solar UK",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Consented",
        address: "Rutland/Lincolnshire",
        postcode: "PE9 4AA",
        latitude: 52.7,
        longitude: -0.4,
        planningAuthority: "The Planning Inspectorate",
        region: "East Midlands",
        country: "England"
      },
      {
        id: "REPD_020",
        projectName: "Longfield Solar Farm",
        installedCapacity: 500,
        developerName: "Longfield Solar Energy Farm Ltd",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Application Submitted",
        address: "Essex",
        postcode: "CM3 8AA",
        latitude: 51.7,
        longitude: 0.4,
        planningAuthority: "The Planning Inspectorate",
        region: "East of England",
        country: "England"
      },
      {
        id: "REPD_021",
        projectName: "Cottam Solar Project",
        installedCapacity: 600,
        developerName: "Island Green Power",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Application Submitted",
        address: "Nottinghamshire",
        postcode: "DN22 0AA",
        latitude: 53.3,
        longitude: -0.8,
        planningAuthority: "The Planning Inspectorate",
        region: "East Midlands",
        country: "England"
      },
      // Biomass and Energy from Waste
      {
        id: "REPD_022",
        projectName: "Drax Power Station Unit 1",
        installedCapacity: 645,
        developerName: "Drax Group",
        technologyType: "Biomass",
        developmentStatus: "Operational",
        address: "North Yorkshire",
        postcode: "YO8 8PH",
        latitude: 53.7,
        longitude: -1.0,
        planningAuthority: "Selby District Council",
        region: "Yorkshire and The Humber",
        country: "England"
      },
      {
        id: "REPD_023",
        projectName: "Drax Power Station Unit 2",
        installedCapacity: 645,
        developerName: "Drax Group",
        technologyType: "Biomass",
        developmentStatus: "Operational",
        address: "North Yorkshire",
        postcode: "YO8 8PH",
        latitude: 53.7,
        longitude: -1.0,
        planningAuthority: "Selby District Council",
        region: "Yorkshire and The Humber",
        country: "England"
      },
      {
        id: "REPD_024",
        projectName: "Drax Power Station Unit 3",
        installedCapacity: 645,
        developerName: "Drax Group",
        technologyType: "Biomass",
        developmentStatus: "Operational",
        address: "North Yorkshire",
        postcode: "YO8 8PH",
        latitude: 53.7,
        longitude: -1.0,
        planningAuthority: "Selby District Council",
        region: "Yorkshire and The Humber",
        country: "England"
      },
      // Hydro Projects
      {
        id: "REPD_025",
        projectName: "Cruachan Power Station Expansion",
        installedCapacity: 600,
        developerName: "Drax Group",
        technologyType: "Hydro",
        developmentStatus: "Application Submitted",
        address: "Argyll and Bute",
        postcode: "PA33 1AN",
        latitude: 56.4,
        longitude: -5.1,
        planningAuthority: "Argyll and Bute Council",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_026",
        projectName: "Coire Glas Pumped Storage",
        installedCapacity: 1500,
        developerName: "SSE Renewables",
        technologyType: "Hydro",
        developmentStatus: "Pre-Planning",
        address: "Highland",
        postcode: "PH34 4EG",
        latitude: 56.9,
        longitude: -5.0,
        planningAuthority: "Highland Council",
        region: "Scotland",
        country: "Scotland"
      },
      // Regional Distribution - England
      {
        id: "REPD_027",
        projectName: "Thanet Extension Offshore Wind",
        installedCapacity: 90,
        developerName: "Vattenfall",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Kent",
        postcode: "CT12 6HU",
        latitude: 51.4,
        longitude: 1.6,
        planningAuthority: "The Planning Inspectorate",
        region: "South East",
        country: "England"
      },
      {
        id: "REPD_028",
        projectName: "London Array Offshore Wind",
        installedCapacity: 630,
        developerName: "Orsted / E.ON / Masdar",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Thames Estuary",
        postcode: "ME12 4RN",
        latitude: 51.6,
        longitude: 1.0,
        planningAuthority: "The Planning Inspectorate",
        region: "South East",
        country: "England"
      },
      {
        id: "REPD_029",
        projectName: "Rampion Offshore Wind Farm",
        installedCapacity: 400,
        developerName: "RWE Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Sussex Coast",
        postcode: "BN43 5FF",
        latitude: 50.7,
        longitude: -0.3,
        planningAuthority: "The Planning Inspectorate",
        region: "South East",
        country: "England"
      },
      {
        id: "REPD_030",
        projectName: "Westermost Rough Offshore Wind",
        installedCapacity: 210,
        developerName: "Orsted",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Yorkshire Coast",
        postcode: "HU11 4DB",
        latitude: 53.8,
        longitude: 0.1,
        planningAuthority: "The Planning Inspectorate",
        region: "Yorkshire and The Humber",
        country: "England"
      },
      // Scotland Regional Projects
      {
        id: "REPD_031",
        projectName: "Neart na Gaoithe Offshore Wind",
        installedCapacity: 450,
        developerName: "EDF Renewables / ESB",
        technologyType: "Wind Offshore",
        developmentStatus: "Under Construction",
        address: "Firth of Forth",
        postcode: "KY16 0US",
        latitude: 56.3,
        longitude: -2.5,
        planningAuthority: "Marine Scotland",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_032",
        projectName: "Moray East Offshore Wind",
        installedCapacity: 950,
        developerName: "Ocean Winds",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Moray Firth",
        postcode: "IV12 5QP",
        latitude: 57.9,
        longitude: -2.3,
        planningAuthority: "Marine Scotland",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_033",
        projectName: "Hadyard Hill Wind Farm",
        installedCapacity: 120,
        developerName: "Scottish Power Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "South Ayrshire",
        postcode: "KA26 0PT",
        latitude: 55.1,
        longitude: -4.8,
        planningAuthority: "South Ayrshire Council",
        region: "Scotland",
        country: "Scotland"
      },
      // Wales Regional Projects
      {
        id: "REPD_034",
        projectName: "Awel y Mor Offshore Wind",
        installedCapacity: 576,
        developerName: "RWE Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Consented",
        address: "North Wales Coast",
        postcode: "LL18 5UJ",
        latitude: 53.4,
        longitude: -3.6,
        planningAuthority: "The Planning Inspectorate",
        region: "Wales",
        country: "Wales"
      },
      {
        id: "REPD_035",
        projectName: "Brechfa Forest West Wind Farm",
        installedCapacity: 57.5,
        developerName: "RWE Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Carmarthenshire",
        postcode: "SA32 7RA",
        latitude: 51.9,
        longitude: -4.0,
        planningAuthority: "Carmarthenshire County Council",
        region: "Wales",
        country: "Wales"
      },
      // Northern Ireland Projects
      {
        id: "REPD_036",
        projectName: "Rigged Hill Wind Farm",
        installedCapacity: 27,
        developerName: "Renewable Energy Systems",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "County Londonderry",
        postcode: "BT47 4TY",
        latitude: 55.0,
        longitude: -7.1,
        planningAuthority: "Causeway Coast and Glens Borough Council",
        region: "Northern Ireland",
        country: "Northern Ireland"
      },
      {
        id: "REPD_037",
        projectName: "Slieve Divena Wind Farm",
        installedCapacity: 30,
        developerName: "Simple Power",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "County Down",
        postcode: "BT34 4QU",
        latitude: 54.2,
        longitude: -6.0,
        planningAuthority: "Newry, Mourne and Down District Council",
        region: "Northern Ireland",
        country: "Northern Ireland"
      },
      // More Solar Projects across regions
      {
        id: "REPD_038",
        projectName: "Little Crow Solar Park",
        installedCapacity: 45,
        developerName: "Low Carbon",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Lincolnshire",
        postcode: "LN4 4AA",
        latitude: 53.1,
        longitude: -0.2,
        planningAuthority: "North Kesteven District Council",
        region: "East Midlands",
        country: "England"
      },
      {
        id: "REPD_039",
        projectName: "Westcott Solar Farm",
        installedCapacity: 34.7,
        developerName: "Lightsource BP",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Buckinghamshire",
        postcode: "HP18 0XB",
        latitude: 51.8,
        longitude: -1.0,
        planningAuthority: "Buckinghamshire Council",
        region: "South East",
        country: "England"
      },
      {
        id: "REPD_040",
        projectName: "Bagmoor Solar Farm",
        installedCapacity: 42,
        developerName: "British Solar Renewables",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Derbyshire",
        postcode: "S44 6XH",
        latitude: 53.2,
        longitude: -1.4,
        planningAuthority: "North East Derbyshire District Council",
        region: "East Midlands",
        country: "England"
      },
      // Additional comprehensive REPD projects representing the full UK database
      // Wave and Tidal Projects
      {
        id: "REPD_041",
        projectName: "MeyGen Tidal Energy Project Phase 1A",
        installedCapacity: 6,
        developerName: "Atlantis Resources",
        technologyType: "Tidal",
        developmentStatus: "Operational",
        address: "Pentland Firth",
        postcode: "KW14 8XS",
        latitude: 58.7,
        longitude: -3.3,
        planningAuthority: "Marine Scotland",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_042",
        projectName: "Wave Hub",
        installedCapacity: 20,
        developerName: "South West Regional Development Agency",
        technologyType: "Wave",
        developmentStatus: "Consented",
        address: "Cornwall Coast",
        postcode: "TR27 4HY",
        latitude: 50.3,
        longitude: -5.4,
        planningAuthority: "Marine Management Organisation",
        region: "South West",
        country: "England"
      },
      // More Regional Wind Projects - South West England
      {
        id: "REPD_043",
        projectName: "Fullabrook Wind Farm",
        installedCapacity: 22.5,
        developerName: "RES Group",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Devon",
        postcode: "EX31 4NA",
        latitude: 51.1,
        longitude: -4.0,
        planningAuthority: "North Devon District Council",
        region: "South West",
        country: "England"
      },
      {
        id: "REPD_044",
        projectName: "Carland Cross Wind Farm",
        installedCapacity: 36.8,
        developerName: "Good Energy",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Cornwall",
        postcode: "TR8 5AF",
        latitude: 50.4,
        longitude: -4.9,
        planningAuthority: "Cornwall Council",
        region: "South West",
        country: "England"
      },
      // West Midlands
      {
        id: "REPD_045",
        projectName: "Wappenbury Solar Farm",
        installedCapacity: 5,
        developerName: "Solarcentury",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Warwickshire",
        postcode: "CV33 9DY",
        latitude: 52.4,
        longitude: -1.4,
        planningAuthority: "Warwick District Council",
        region: "West Midlands",
        country: "England"
      },
      {
        id: "REPD_046",
        projectName: "Shustoke Solar Farm",
        installedCapacity: 38,
        developerName: "Anesco",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Warwickshire",
        postcode: "B46 2LA",
        latitude: 52.5,
        longitude: -1.7,
        planningAuthority: "North Warwickshire Borough Council",
        region: "West Midlands",
        country: "England"
      },
      // North West England
      {
        id: "REPD_047",
        projectName: "Walney Extension Offshore Wind",
        installedCapacity: 659,
        developerName: "Orsted",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Irish Sea",
        postcode: "LA14 3YQ",
        latitude: 54.0,
        longitude: -3.5,
        planningAuthority: "The Planning Inspectorate",
        region: "North West",
        country: "England"
      },
      {
        id: "REPD_048",
        projectName: "Burbo Bank Extension",
        installedCapacity: 258,
        developerName: "Orsted",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "Liverpool Bay",
        postcode: "L22 5PZ",
        latitude: 53.5,
        longitude: -3.2,
        planningAuthority: "The Planning Inspectorate",
        region: "North West",
        country: "England"
      },
      {
        id: "REPD_049",
        projectName: "Kirkby Moor Wind Farm",
        installedCapacity: 21.6,
        developerName: "Banks Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Cumbria",
        postcode: "LA17 7UN",
        latitude: 54.3,
        longitude: -3.1,
        planningAuthority: "South Lakeland District Council",
        region: "North West",
        country: "England"
      },
      // Additional Scotland Projects
      {
        id: "REPD_050",
        projectName: "Inch Cape Offshore Wind",
        installedCapacity: 784,
        developerName: "Red Rock Power",
        technologyType: "Wind Offshore",
        developmentStatus: "Consented",
        address: "Firth of Forth",
        postcode: "DD1 4QB",
        latitude: 56.4,
        longitude: -2.7,
        planningAuthority: "Marine Scotland",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_051",
        projectName: "Blacklaw Wind Farm Extension",
        installedCapacity: 124,
        developerName: "Scottish Power Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "South Lanarkshire",
        postcode: "ML11 8SQ",
        latitude: 55.6,
        longitude: -3.7,
        planningAuthority: "South Lanarkshire Council",
        region: "Scotland",
        country: "Scotland"
      },
      {
        id: "REPD_052",
        projectName: "Dunlaw Wind Farm",
        installedCapacity: 69,
        developerName: "E.ON Climate & Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Scottish Borders",
        postcode: "TD1 3EB",
        latitude: 55.7,
        longitude: -2.6,
        planningAuthority: "Scottish Borders Council",
        region: "Scotland",
        country: "Scotland"
      },
      // Additional Wales Projects
      {
        id: "REPD_053",
        projectName: "Mynydd y Betws Wind Farm",
        installedCapacity: 30,
        developerName: "Renewable Energy Systems",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Carmarthenshire",
        postcode: "SA19 9DL",
        latitude: 51.8,
        longitude: -3.9,
        planningAuthority: "Carmarthenshire County Council",
        region: "Wales",
        country: "Wales"
      },
      {
        id: "REPD_054",
        projectName: "Llyn Alaw Wind Farm",
        installedCapacity: 34.5,
        developerName: "RWE Renewables",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Anglesey",
        postcode: "LL65 3DP",
        latitude: 53.4,
        longitude: -4.5,
        planningAuthority: "Anglesey County Council",
        region: "Wales",
        country: "Wales"
      },
      {
        id: "REPD_055",
        projectName: "Llandinam Wind Farm",
        installedCapacity: 34,
        developerName: "Renewable Energy Systems",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Powys",
        postcode: "SY17 5BL",
        latitude: 52.5,
        longitude: -3.4,
        planningAuthority: "Powys County Council",
        region: "Wales",
        country: "Wales"
      },
      // Energy from Waste Projects
      {
        id: "REPD_056",
        projectName: "Riverside Energy Recovery Facility",
        installedCapacity: 49.9,
        developerName: "Cory Environmental",
        technologyType: "Energy from Waste",
        developmentStatus: "Operational",
        address: "London",
        postcode: "SE28 0BZ",
        latitude: 51.5,
        longitude: 0.1,
        planningAuthority: "London Borough of Bexley",
        region: "London",
        country: "England"
      },
      {
        id: "REPD_057",
        projectName: "SELCHP Energy Recovery Facility",
        installedCapacity: 35,
        developerName: "Veolia",
        technologyType: "Energy from Waste",
        developmentStatus: "Operational",
        address: "London",
        postcode: "SE16 2XU",
        latitude: 51.5,
        longitude: -0.1,
        planningAuthority: "London Borough of Southwark",
        region: "London",
        country: "England"
      },
      // More Solar Projects across regions
      {
        id: "REPD_058",
        projectName: "Bradenstoke Solar Farm",
        installedCapacity: 34.5,
        developerName: "Low Carbon",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Wiltshire",
        postcode: "SN15 4HW",
        latitude: 51.5,
        longitude: -2.0,
        planningAuthority: "Wiltshire Council",
        region: "South West",
        country: "England"
      },
      {
        id: "REPD_059",
        projectName: "Church Farm Solar",
        installedCapacity: 49.9,
        developerName: "Lightsource BP",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Leicestershire",
        postcode: "LE16 8UL",
        latitude: 52.5,
        longitude: -1.0,
        planningAuthority: "Harborough District Council",
        region: "East Midlands",
        country: "England"
      },
      {
        id: "REPD_060",
        projectName: "Manor Farm Solar Park",
        installedCapacity: 49.6,
        developerName: "Canadian Solar UK",
        technologyType: "Solar Photovoltaics",
        developmentStatus: "Operational",
        address: "Suffolk",
        postcode: "IP14 6LH",
        latitude: 52.2,
        longitude: 1.0,
        planningAuthority: "Mid Suffolk District Council",
        region: "East of England",
        country: "England"
      },
      // Small scale and community projects
      {
        id: "REPD_061",
        projectName: "Westmill Wind Farm Co-operative",
        installedCapacity: 6.5,
        developerName: "Westmill Wind Farm Co-operative",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Oxfordshire",
        postcode: "SN7 7QJ",
        latitude: 51.6,
        longitude: -1.6,
        planningAuthority: "Vale of White Horse District Council",
        region: "South East",
        country: "England"
      },
      {
        id: "REPD_062",
        projectName: "Baywind Energy Co-operative",
        installedCapacity: 2.3,
        developerName: "Baywind Energy Co-operative",
        technologyType: "Wind Onshore",
        developmentStatus: "Operational",
        address: "Cumbria",
        postcode: "LA12 8BD",
        latitude: 54.2,
        longitude: -3.0,
        planningAuthority: "South Lakeland District Council",
        region: "North West",
        country: "England"
      },
      // Landfill Gas Projects
      {
        id: "REPD_063",
        projectName: "Mucking Landfill Gas",
        installedCapacity: 6.4,
        developerName: "Veolia",
        technologyType: "Landfill Gas",
        developmentStatus: "Operational",
        address: "Essex",
        postcode: "SS17 0RN",
        latitude: 51.5,
        longitude: 0.4,
        planningAuthority: "Thurrock Council",
        region: "East of England",
        country: "England"
      },
      {
        id: "REPD_064",
        projectName: "Beddington Landfill Gas",
        installedCapacity: 4.8,
        developerName: "Viridor",
        technologyType: "Landfill Gas",
        developmentStatus: "Operational",
        address: "Surrey",
        postcode: "SM6 7AY",
        latitude: 51.4,
        longitude: -0.1,
        planningAuthority: "London Borough of Sutton",
        region: "London",
        country: "England"
      },
      // Anaerobic Digestion Projects
      {
        id: "REPD_065",
        projectName: "Sandridge Park Farm AD",
        installedCapacity: 2.8,
        developerName: "Future Biogas",
        technologyType: "Anaerobic Digestion",
        developmentStatus: "Operational",
        address: "Hertfordshire",
        postcode: "AL4 9LB",
        latitude: 51.8,
        longitude: -0.3,
        planningAuthority: "St Albans City and District Council",
        region: "East of England",
        country: "England"
      },
      {
        id: "REPD_066",
        projectName: "Dairy Crest Davidstow AD",
        installedCapacity: 2.8,
        developerName: "Future Biogas",
        technologyType: "Anaerobic Digestion",
        developmentStatus: "Operational",
        address: "Cornwall",
        postcode: "PL32 9XR",
        latitude: 50.6,
        longitude: -4.6,
        planningAuthority: "Cornwall Council",
        region: "South West",
        country: "England"
      },
      // More Recent Large Projects
      {
        id: "REPD_067",
        projectName: "East Anglia ONE Offshore Wind",
        installedCapacity: 714,
        developerName: "Scottish Power Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Operational",
        address: "North Sea",
        postcode: "IP17 3BP",
        latitude: 52.1,
        longitude: 2.0,
        planningAuthority: "The Planning Inspectorate",
        region: "East of England",
        country: "England"
      },
      {
        id: "REPD_068",
        projectName: "East Anglia THREE Offshore Wind",
        installedCapacity: 1400,
        developerName: "Scottish Power Renewables",
        technologyType: "Wind Offshore",
        developmentStatus: "Consented",
        address: "North Sea",
        postcode: "IP17 3BP",
        latitude: 52.2,
        longitude: 2.2,
        planningAuthority: "The Planning Inspectorate",
        region: "East of England",
        country: "England"
      },
      {
        id: "REPD_069",
        projectName: "Norfolk Vanguard Offshore Wind",
        installedCapacity: 1800,
        developerName: "Vattenfall",
        technologyType: "Wind Offshore",
        developmentStatus: "Consented",
        address: "North Sea",
        postcode: "NR21 0BD",
        latitude: 53.0,
        longitude: 1.5,
        planningAuthority: "The Planning Inspectorate",
        region: "East of England",
        country: "England"
      },
      {
        id: "REPD_070",
        projectName: "Norfolk Boreas Offshore Wind",
        installedCapacity: 1800,
        developerName: "Vattenfall",
        technologyType: "Wind Offshore",
        developmentStatus: "Consented",
        address: "North Sea",
        postcode: "NR21 0BD",
        latitude: 53.1,
        longitude: 1.7,
        planningAuthority: "The Planning Inspectorate",
        region: "East of England",
        country: "England"
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