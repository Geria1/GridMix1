# GridMix - UK Real-Time Energy Dashboard

## Overview

GridMix is a real-time UK electricity generation dashboard providing comprehensive energy data visualization. It displays live energy mix information, carbon intensity tracking, and renewable energy statistics sourced from the UK's Carbon Intensity API. This full-stack web application offers an intuitive interface for monitoring the UK's electrical grid, aiming to track the UK's journey to clean power by 2050.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

GridMix is a full-stack web application designed for real-time energy data visualization.

### UI/UX Decisions
- **Color Scheme**: Energy-themed color variables with specific colors for energy sources (e.g., Wind: #00BFFF, Solar: #FFD700).
- **Theme**: Custom theme provider supporting light/dark mode.
- **Visualizations**: Interactive charts (pie charts, line charts) from Recharts for energy mix, trends, and carbon intensity.
- **Layout**: Comprehensive dashboard with hero section, tabbed navigation, analysis panels, and responsive design for mobile, tablet, and desktop.
- **Interactive Elements**: Live countdown to 2050 net-zero target, energy-saving tips carousel, and interactive map popups for live generation data.

### Technical Implementation

**Frontend**:
- **Framework**: React 18 with TypeScript.
- **Routing**: Wouter.
- **State Management**: TanStack Query (React Query).
- **UI Components**: Shadcn/ui with Radix UI primitives.
- **Styling**: Tailwind CSS.

**Backend**:
- **Runtime**: Node.js with TypeScript.
- **Framework**: Express.js for API server.
- **Data Validation**: Zod schemas.
- **Build System**: Vite for frontend, esbuild for backend.

**Data Flow**:
Data is fetched from the UK Carbon Intensity API at scheduled intervals, transformed, validated with Zod, and stored in PostgreSQL. Express routes serve this data to the frontend, which polls for updates every 5 minutes and visualizes it.

**Key Features**:
- **Dashboard**: Centralized view of energy data.
- **Key Metrics**: Real-time display of demand, carbon intensity, and renewable percentage.
- **Energy Mix Chart**: Interactive display of current energy generation sources with accurate percentage and MW values.
- **Trend Charts**: Historical analysis (24h, 7d, 30d) of energy mix and carbon intensity.
- **Regional Highlights**: Breakdown of regional energy generation.
- **System Status**: Grid stability and health indicators.
- **Net-Zero Countdown**: Visualization of progress towards the 2050 net-zero target.
- **Energy-Saving Tips**: Interactive carousel of practical tips.
- **Blog**: Articles on UK energy policy and technical insights.

### System Design Choices
- **Database**: PostgreSQL (via Neon serverless) managed by Drizzle ORM. An in-memory fallback is available for development.
- **API Endpoints**:
    - `/api/energy/current`: Latest energy data.
    - `/api/energy/history`: Historical data.
    - `/api/energy/status`: System health.
    - `/api/repd/live-generation`: Live generation data from renewable sites.
- **Multi-Page Structure**: Includes Dashboard, About GridMix, Blog, and About Me pages with global navigation.
- **Data Source Management**: Intelligent `DataSourceManager` for monitoring and fallback when external APIs are unavailable.
- **Error Handling**: Comprehensive error boundaries and graceful degradation for API failures.

## External Dependencies

- **UK Carbon Intensity API**: Primary data source for real-time energy, generation mix, and demand data.
- **BMRS (Balancing Mechanism Reporting Service) API / Elexon**: Integrated for extended grid monitoring data (frequency, balancing, imbalance, interconnector flows), with intelligent data source selection and fallback mechanisms.
- **Neon Database**: Serverless PostgreSQL for data persistence.
- **Mailchimp**: For newsletter subscription management.
- **Replit Infrastructure**: Used for development and deployment.