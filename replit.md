# GridMix - UK Real-Time Energy Dashboard

## Overview

GridMix is a real-time UK electricity generation dashboard that provides comprehensive energy data visualization. The application displays live energy mix information, carbon intensity tracking, and renewable energy statistics sourced from the UK's Carbon Intensity API. Built as a full-stack web application, it offers an intuitive interface for monitoring the UK's electrical grid in real-time.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom energy-themed color variables
- **Charts**: Recharts for data visualization (pie charts, line charts, trend analysis)
- **Theme System**: Custom theme provider with light/dark mode support

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for API server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **External API**: UK Carbon Intensity API integration
- **Data Validation**: Zod schemas for type-safe data validation
- **Build System**: Vite for frontend bundling, esbuild for server bundling

### Data Flow
1. **Data Ingestion**: Scheduled intervals fetch data from UK Carbon Intensity API
2. **Data Processing**: Raw API data is transformed and validated using Zod schemas
3. **Data Storage**: Processed data is stored in PostgreSQL via Drizzle ORM
4. **API Layer**: Express routes serve formatted data to frontend
5. **Real-time Updates**: Frontend polls API endpoints every 5 minutes for fresh data
6. **Visualization**: React components render charts and metrics using processed data

## Key Components

### Database Schema
- **Users Table**: Authentication and user management (currently using in-memory storage)
- **Energy Data Table**: Core energy metrics storage
  - Timestamp, total demand, carbon intensity
  - Energy mix breakdown (gas, nuclear, wind, solar, hydro, biomass, coal, imports)
  - Regional data and system status (JSON fields)

### API Endpoints
- `/api/energy/current` - Latest energy data snapshot
- `/api/energy/history` - Historical data with configurable time ranges
- `/api/energy/status` - System health and API status information

### Frontend Components
- **Dashboard**: Main application view with comprehensive energy overview
- **KeyMetrics**: Real-time metrics display (demand, carbon intensity, renewable percentage)
- **EnergyMixChart**: Interactive pie chart showing current energy generation sources
- **TrendChart**: Historical trend analysis with multiple time ranges (24h, 7d, 30d)
- **CarbonIntensityChart**: Carbon intensity tracking over time
- **RegionalHighlights**: Regional energy generation breakdown
- **SystemStatus**: Grid stability and system health indicators

### External Dependencies
- **UK Carbon Intensity API**: Primary data source for real-time energy information
- **Neon Database**: Serverless PostgreSQL for data persistence
- **Replit Infrastructure**: Development and deployment platform

## Data Storage Solutions

### Primary Database
- **Type**: PostgreSQL (via Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Connection**: Environment variable-based configuration

### Fallback Storage
- **In-Memory Storage**: MemStorage class for development/fallback scenarios
- **Interface**: IStorage interface ensures consistent API across storage implementations

## External Service Integrations

### UK Carbon Intensity API
- **Base URL**: `https://api.carbonintensity.org.uk`
- **Endpoints Used**:
  - `/intensity` - Current carbon intensity
  - `/generation` - Generation mix data
  - `/demand` - Current demand data
  - Regional and system status endpoints
- **Rate Limiting**: Respectful polling intervals to avoid API limits
- **Error Handling**: Graceful degradation when API is unavailable

### Replit Platform Integration
- **Development**: Cartographer plugin for enhanced development experience
- **Runtime Error Handling**: Runtime error overlay for development
- **Deployment**: Autoscale deployment target configuration

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Hot Reload**: Vite development server with HMR
- **Database**: Automatic connection to Neon database via environment variables

### Production Build
- **Frontend**: Vite build process creates optimized static assets
- **Backend**: esbuild bundles server code for production deployment
- **Static Assets**: Served from `/dist/public` directory
- **Process**: Express server serves both API and static files

### Configuration
- **Port**: 5000 (configurable via environment)
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Environment Detection**: `NODE_ENV` for development/production behavior switching

## Changelog

- June 27, 2025: Enhanced Net-Zero Progress Chart with BMRS-Derived 2023-2025 Estimates
  - Built complete UK GHG emissions trajectory from 1990 through 2025 using multiple data sources
  - Official BEIS/ONS data (1990-2022): 797.3 MtCO₂e baseline to 417.4 MtCO₂e (47.6% reduction)
  - BMRS energy generation estimates (2023-2025): 395.2 MtCO₂e (2023) continuing decline trajectory
  - Visual distinction: solid green (official data), orange dashed (BMRS estimates), green dashed (targets)
  - Enhanced tooltips showing data source, emissions values, and percentage reductions
  - Professional chart ready for policy presentation and energy system briefings
- June 27, 2025: Fixed Energy Mix Component - Authentic UK Electricity Data Integration
  - Resolved energy mix display issue with proper Carbon Intensity API data processing
  - Implemented specified color scheme (Wind: #00BFFF, Solar: #FFD700, Nuclear: #FF6347, etc.)
  - Added MWh absolute values and percentages in tooltips as requested
  - Current authentic data: Wind 54.2% (16,260 MWh), Gas 21.2% (6,360 MWh), Nuclear 15.7% (4,710 MWh)
  - Enhanced BMRS API authentication with proper fallback to Carbon Intensity API
- June 26, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.