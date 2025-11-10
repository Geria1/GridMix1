# Gridmix Backend

A comprehensive Node.js/Express backend for real-time UK energy grid monitoring and carbon intensity tracking.

## Features

### Core APIs
- **Real-time Energy Data**: Current UK energy grid status including demand, generation mix, and carbon intensity
- **Historical Data**: Access to historical energy data with configurable time ranges
- **Time Series**: Multi-resolution energy mix trends (daily, weekly, monthly)
- **Carbon Forecasting**: 48-hour carbon intensity forecasts with cleanest period recommendations

### Data Sources
- **BMRS (Balancing Mechanism Reporting Service)**: Official Elexon grid data
- **Carbon Intensity API**: National Grid ESO carbon intensity data
- **REPD**: Renewable Energy Planning Database integration
- **UK Emissions**: Historical emissions tracking and net-zero progress

### Additional Features
- **Data Source Management**: Health monitoring and fallback handling
- **Newsletter Integration**: Mailchimp subscription management
- **Regional Data**: England, Scotland, and Wales breakdown
- **System Monitoring**: Health checks and production utilities

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **APIs**: RESTful endpoints
- **Data Validation**: Zod schemas
- **Session Management**: Express-session (ready for authentication)

## Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database
- BMRS API key (optional but recommended)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Run database migrations:
```bash
npm run db:push
```

4. Start development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption

### Optional
- `BMRS_API_KEY`: Elexon BMRS API key for enhanced data
- `MAILCHIMP_API_KEY`: For newsletter subscriptions
- `MAILCHIMP_AUDIENCE_ID`: Mailchimp audience/list ID
- `SENDGRID_API_KEY`: For email notifications
- `TWILIO_ACCOUNT_SID`: For SMS alerts
- `TWILIO_AUTH_TOKEN`: Twilio authentication token

## API Endpoints

### Energy Data
- `GET /api/energy/current` - Current energy grid status
- `GET /api/energy/history?hours=24` - Historical data
- `GET /api/energy/timeseries?resolution=weekly&period=12` - Time series data
- `POST /api/energy/refresh` - Force data refresh
- `GET /api/energy/status` - API status and data sources

### Enhanced Energy Data (BMRS)
- `GET /api/energy/enhanced/current` - Comprehensive grid data
- `GET /api/energy/enhanced/history?hours=24` - Enhanced historical data
- `GET /api/energy/enhanced/status` - Enhanced data source status

### BMRS Specific
- `GET /api/bmrs/grid-status` - Comprehensive grid status
- `GET /api/bmrs/frequency?hours=1` - System frequency data
- `GET /api/bmrs/balancing?hours=1` - Balancing mechanism data
- `GET /api/bmrs/interconnectors?hours=1` - Interconnector flows

### Emissions & Net Zero
- `GET /api/emissions/historical` - UK historical emissions data
- `GET /api/emissions/progress` - Current net-zero progress
- `GET /api/emissions/milestones` - Key climate milestones
- `GET /api/emissions/pathway` - Projected emissions pathway

### Carbon Forecasting
- `GET /api/carbon-forecast` - 48-hour carbon intensity forecast
- `GET /api/carbon-forecast/summary` - Forecast summary statistics
- `GET /api/carbon-forecast/cleanest` - Best times for low-carbon activities
- `GET /api/carbon-forecast/status` - Forecast service status
- `POST /api/carbon-forecast/update` - Force forecast update

### Renewable Projects (REPD)
- `GET /api/repd/projects` - Search renewable energy projects
- `GET /api/repd/projects/:id` - Get project details
- `GET /api/repd/filters` - Available filter options
- `GET /api/repd/statistics` - Project statistics
- `POST /api/repd/update` - Update REPD data
- `GET /api/repd/live-generation` - Projects with live generation
- `GET /api/repd/live-generation/summary` - Total live generation

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/status` - Newsletter service status
- `GET /api/mailchimp/test` - Test Mailchimp connection

### System
- `GET /api/health` - Health check endpoint
- `GET /api/system/status` - System status (sanitized for production)
- `GET /api/data-sources/status` - Data source health monitoring
- `GET /health` - Basic health check

## Data Flow

1. **Automatic Updates**: Energy data fetches every 5 minutes
2. **Data Validation**: All incoming data validated against Zod schemas
3. **Authenticity Checks**: Data source verification before storage
4. **Fallback Handling**: Automatic failover between data sources
5. **Smart Caching**: Returns existing data while triggering background refresh

## Storage

### In-Memory (Development)
Uses `MemStorage` class for development without database setup.

### PostgreSQL (Production)
Uses `DbStorage` class with Drizzle ORM for production deployments.

The system automatically selects storage based on `DATABASE_URL` presence.

## Database Schema

### users
- `id` - Serial primary key
- `username` - Unique username
- `password` - Hashed password

### energy_data
- `id` - Serial primary key
- `timestamp` - Data timestamp
- `total_demand` - Total grid demand (MW)
- `carbon_intensity` - Carbon intensity (gCO2/kWh)
- `frequency` - Grid frequency (Hz)
- `energy_mix` - JSON object with generation sources
- `regional_data` - JSON object with regional breakdown
- `system_status` - JSON object with system metrics

## Production Deployment

### Build
```bash
npm run build
```

### Start
```bash
npm start
```

### Configuration
- Server listens on `0.0.0.0:5000`
- Port reuse enabled for zero-downtime deploys
- Error stack traces hidden in production
- Comprehensive logging via Winston

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check
- `npm run db:push` - Push database schema changes

## Monitoring

### Health Checks
Production deployments should monitor:
- `GET /health` - Overall system health
- `GET /api/data-sources/status` - Individual data source health

### Logging
Uses Winston logger with:
- Console output in development
- File rotation in production
- Error tracking and aggregation

## Security

- Request size limits (10MB)
- Environment-based configuration
- Sanitized error responses in production
- Session security ready (requires SECRET_KEY)
- Input validation via Zod

## Data Sources

### Primary Sources
1. **BMRS API** (Elexon) - Authoritative UK grid data
2. **Carbon Intensity API** (National Grid ESO)
3. **REPD Database** - Government renewable projects

### Fallback Strategy
If BMRS unavailable → Carbon Intensity API → Cached data

## Contributing

The backend is structured for easy extension:
- Add new services in `server/services/`
- Add new routes in `server/routes.ts`
- Update schema in `shared/schema.ts`
- Generate migrations with `npx drizzle-kit generate`

## License

MIT
