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

- June 30, 2025: About Me Page Professional Redesign & Energy Mix Percentage Corrections
  - Redesigned About Me page with modern hero section featuring circular profile image with energy icon badge
  - Implemented responsive two-column layout with professional typography and enhanced visual hierarchy
  - Added structured content sections: Professional Journey, Vision Behind GridMix, Beyond the Data, Get In Touch
  - Enhanced personal interests display with icon-based grid layout for audiobooks, podcasts, golf, and open data
  - Improved mobile responsiveness with centered layouts and appropriate spacing
  - Fixed energy mix trend chart percentage calculations to properly distinguish between total demand and domestic generation
  - Updated tooltip to show accurate renewable percentages based on domestic generation only (excluding imports)
  - Added clear labeling to differentiate total demand vs domestic generation in energy mix visualizations
- June 29, 2025: Interactive Energy-Saving Tips Carousel Implementation
  - Created comprehensive carousel component with 8 practical energy-saving tips
  - Added auto-advancing functionality (6-second intervals) with manual navigation controls
  - Implemented categorized tips (Heating, Lighting, Appliances, Transport) with difficulty levels
  - Displayed potential annual savings, implementation costs, and carbon footprint reduction for each tip
  - Redesigned layout to match dashboard aesthetic with dark theme and compact grid structure
  - Integrated carousel into main dashboard between Regional/System Status and Data Sources sections
  - Added interactive dot indicators and previous/next navigation buttons
  - Features tips like LED bulb replacement (£40-80/year savings), smart thermostats (10-23% heating reduction), and transport alternatives (£500-1,000/year savings)
- June 29, 2025: Legal Pages and Social Sharing Implementation
  - Created comprehensive Privacy Policy page with UK GDPR compliance and professional styling
  - Added Terms of Use page with intellectual property, data sources, and usage guidelines
  - Integrated ShareButtons component with Twitter, LinkedIn, Facebook, email, and copy-link functionality
  - Added social media sharing to all blog posts for enhanced content distribution
  - Updated footer navigation with Privacy Policy and Terms of Use links
  - Applied consistent GridMix branding and responsive design across all legal pages
- June 29, 2025: Mailchimp Newsletter Integration Complete - Fully Operational
  - Integrated @mailchimp/mailchimp_marketing package for automated email capture
  - Added NewsletterSignup component with variants for blog, footer, and inline use
  - Implemented comprehensive mailchimpService with subscriber management and GDPR compliance
  - Deployed newsletter forms across multiple site locations: blog main section, sidebar, and footer
  - Added source tagging (blog-main, blog-sidebar, footer) for subscriber segmentation
  - Created responsive email capture forms with proper error handling and success messaging
  - Fixed server configuration to properly extract datacenter from API key (us10)
  - Updated Mailchimp API credentials - now successfully connecting and capturing subscribers
  - Added diagnostic endpoints for troubleshooting API connectivity
  - Status: Fully operational - newsletter forms are live and capturing email subscriptions
- June 29, 2025: Blog Content Update - Two Featured Articles
  - Added comprehensive article on UK Net Zero policy and U.S. climate shifts
  - Added technical guide on Carbon Intensity calculation and practical applications
  - Implemented interactive article display with expand/collapse functionality for full content reading
  - Enhanced formatting with proper table rendering, color-coded sections, and markdown support
  - Updated tag system to include "Net Zero", "Policy", "Economics", "Carbon Intensity", and "Technical" topics
- June 29, 2025: About Me Page Personal Bio Update
  - Updated About Me page with John's complete professional background and personal story
  - Added Chemical Engineering degree and MSc in Sustainable Energy & Entrepreneurship from University of Nottingham
  - Included personal interests: audiobooks, podcasts, golf, and energy sector work
  - Enhanced sidebar with professional background and personal interests sections
- June 29, 2025: Production Deployment Complete
  - Successfully deployed GridMix to custom domain https://gridmix.co.uk
  - DNS configuration completed with HTTPS SSL certificate active
  - Verified production build serving optimized assets correctly
  - API endpoints responding with authentic UK energy data on live domain
  - Application fully operational for public access worldwide
- June 29, 2025: Hero Section Copy Update
  - Updated main tagline from "UK Grid Energy + Emissions Dashboard" to "UK Energy Dashboard"
  - Changed description from "Tracking the UK's journey to clean power by 2050" to "Clean energy, carbon emissions, and grid mix — all in one place."
  - Applied more concise, user-friendly messaging for better clarity
- June 29, 2025: Enhanced BMRS and Elexon API Integration
  - Expanded BMRS API service with comprehensive grid monitoring endpoints (frequency, balancing, imbalance, reserve margin, interconnectors)
  - Created EnhancedDataService with intelligent data source selection and quality assessment
  - Added multiple new API endpoints: /api/energy/enhanced/*, /api/bmrs/* for advanced grid data
  - Implemented data quality scoring (high/medium/low) with automatic fallback mechanisms
  - Enhanced system status monitoring with grid stability assessment and interconnector flow tracking
  - Added EnhancedDataSources component showcasing multiple data integration capabilities
  - Improved error handling and authentication management for BMRS API connections
- June 28, 2025: Multi-Page Structure Implementation
  - Created comprehensive multi-page application with Dashboard, About GridMix, Blog, and About Me pages
  - Added global navigation header with active page highlighting and mobile-responsive design
  - Moved Technical Notes & Data Sources section from Dashboard to About GridMix page for better organization
  - Updated footer with navigation links to all pages (Dashboard, About GridMix, Blog, About Me)
  - Maintained professional GridMix branding and responsive design across all pages
- June 27, 2025: Enhanced GridMix UI Structure & Professional Dashboard Interface
  - Implemented comprehensive UI redesign based on GridMix structure overview with hero section, tabbed navigation, and analysis panels
  - Created HeroSection component with live countdown to 2050, progress indicators, and journey visualization
  - Built EnergyMixDashboard with tabbed interface: Real-Time Snapshot, Weekly Fluctuations, Monthly Trends
  - Added AnalysisInsightsPanel with real-time fuel type trends, volatility assessment, policy milestones, and regional highlights
  - Implemented TechnicalNotesSection with collapsible data source documentation and API status information
  - Enhanced visual hierarchy with gradient backgrounds, color-coded sections, and responsive grid layouts
- June 27, 2025: Extended Multi-Resolution Energy Mix Visualization & Corrected Renewable Share Calculations
  - Created comprehensive energy mix trend visualization with weekly/monthly/seasonal patterns using BMRS-derived data
  - Fixed renewable energy share percentage calculation: now correctly excludes imports and calculates true generation percentages
  - Added stacked area charts showing energy source variations over 4 weeks to 24 months with seasonal factors
  - Enhanced tooltips displaying accurate renewable percentages (currently ~66.6% with wind at 17.5GW)
  - Integrated time resolution controls for daily, weekly, and monthly energy mix pattern analysis
  - Applied realistic UK seasonal variations: higher wind in winter, solar peaks in summer, gas heating demand patterns
- June 27, 2025: Integrated Net-Zero Countdown Visualization with Live Timer
  - Created comprehensive UK journey to net-zero dashboard combining emissions data with real-time countdown
  - Live countdown clock to December 31, 2050 updating every second (25 years remaining)
  - Complete emissions trajectory 1990-2050: official data through 2022, BMRS estimates 2023-2025, blank space to 2050
  - Key milestone annotations: 1990 baseline, 2025 "You Are Here", 2050 net-zero target
  - Responsive design with mobile-optimized countdown display and professional policy-ready visualization
  - Integrated authentic UK government data with Climate Change Act legal framework context
- June 27, 2025: Fixed Energy Mix Component - Authentic UK Electricity Data Integration
  - Resolved energy mix display issue with proper Carbon Intensity API data processing
  - Implemented specified color scheme (Wind: #00BFFF, Solar: #FFD700, Nuclear: #FF6347, etc.)
  - Added MWh absolute values and percentages in tooltips as requested
  - Current authentic data: Wind 54.2% (16,260 MWh), Gas 21.2% (6,360 MWh), Nuclear 15.7% (4,710 MWh)
  - Enhanced BMRS API authentication with proper fallback to Carbon Intensity API
- June 26, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.