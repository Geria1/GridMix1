import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { energyApiService } from "./services/energyApi";
import { bmrsApiService } from "./services/bmrsApi";
import { authenticDataService } from "./services/authenticDataService";
import { ukEmissionsApiService } from "./services/ukEmissionsApi";
import { insertEnergyDataSchema } from "@shared/schema";

let dataUpdateInterval: NodeJS.Timeout;

async function fetchAndStoreEnergyData() {
  try {
    // Get comprehensive authentic energy data
    const authenticData = await authenticDataService.getComprehensiveEnergyData();
    
    // Validate data authenticity
    const isAuthentic = await authenticDataService.validateDataAuthenticity(authenticData);
    if (!isAuthentic) {
      throw new Error('Data authenticity validation failed - cannot store inauthentic data');
    }

    const energyData = {
      timestamp: authenticData.timestamp,
      totalDemand: authenticData.totalDemand,
      carbonIntensity: authenticData.carbonIntensity,
      frequency: authenticData.frequency,
      energyMix: authenticData.energyMix,
      regionalData: authenticData.regionalData,
      systemStatus: authenticData.systemStatus,
    };

    // Validate data before storing
    const validatedData = insertEnergyDataSchema.parse(energyData);
    await storage.saveEnergyData(validatedData);
    
    console.log(`Energy data updated successfully from ${authenticData.dataSource}`);
  } catch (error) {
    console.error('Error fetching/storing authentic energy data:', error);
    throw error; // Don't store inauthentic data
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current energy data
  app.get("/api/energy/current", async (req, res) => {
    try {
      const latestData = await storage.getLatestEnergyData();
      
      if (!latestData) {
        // If no data exists, fetch it immediately
        await fetchAndStoreEnergyData();
        const newData = await storage.getLatestEnergyData();
        return res.json(newData);
      }
      
      // Check if data is older than 10 minutes
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      if (latestData.timestamp < tenMinutesAgo) {
        // Trigger background update but return existing data
        fetchAndStoreEnergyData().catch(console.error);
      }
      
      res.json(latestData);
    } catch (error) {
      console.error('Error getting current energy data:', error);
      res.status(500).json({ error: 'Failed to get current energy data' });
    }
  });

  // Get 24-hour historical data
  app.get("/api/energy/history", async (req, res) => {
    try {
      const hours = parseInt(req.query.hours as string) || 24;
      const historyData = await storage.getEnergyDataHistory(hours);
      
      if (historyData.length === 0) {
        // If no historical data, try to fetch from authentic sources
        try {
          const authenticHistoricalData = await authenticDataService.getHistoricalData(hours);
          
          // Store authentic historical data
          for (const dataPoint of authenticHistoricalData) {
            const isAuthentic = await authenticDataService.validateDataAuthenticity(dataPoint);
            if (!isAuthentic) {
              console.warn('Skipping inauthentic historical data point');
              continue;
            }
            
            const energyData = {
              timestamp: dataPoint.timestamp,
              totalDemand: dataPoint.totalDemand,
              carbonIntensity: dataPoint.carbonIntensity,
              frequency: dataPoint.frequency,
              energyMix: dataPoint.energyMix,
              regionalData: dataPoint.regionalData,
              systemStatus: dataPoint.systemStatus,
            };
            
            const validatedData = insertEnergyDataSchema.parse(energyData);
            await storage.saveEnergyData(validatedData);
          }
          
          const newHistoryData = await storage.getEnergyDataHistory(hours);
          return res.json(newHistoryData);
        } catch (apiError) {
          console.error('Error fetching authentic historical data:', apiError);
          return res.status(503).json({ 
            error: 'Authentic historical data temporarily unavailable',
            message: 'Please check back later for updated data from official sources'
          });
        }
      }
      
      res.json(historyData);
    } catch (error) {
      console.error('Error getting energy history:', error);
      res.status(500).json({ error: 'Failed to get energy history' });
    }
  });

  // Force data refresh
  app.post("/api/energy/refresh", async (req, res) => {
    try {
      await fetchAndStoreEnergyData();
      const latestData = await storage.getLatestEnergyData();
      res.json(latestData);
    } catch (error) {
      console.error('Error refreshing energy data:', error);
      res.status(500).json({ error: 'Failed to refresh energy data' });
    }
  });

  // Get API status
  app.get("/api/energy/status", async (req, res) => {
    try {
      // Test authentic data sources
      const bmrsAvailable = await bmrsApiService.getCurrentDemand()
        .then(() => true)
        .catch(() => false);
      
      const carbonIntensityAvailable = await energyApiService.getCurrentCarbonIntensity()
        .then(() => true)
        .catch(() => false);

      const primarySource = bmrsAvailable ? 'BMRS (Elexon)' : 
                           carbonIntensityAvailable ? 'Carbon Intensity API (National Grid)' : 
                           'None';
      
      const status = (bmrsAvailable || carbonIntensityAvailable) ? 'operational' : 'error';
      
      res.json({
        status,
        lastUpdate: new Date(),
        dataSource: primarySource,
        dataQuality: 'authentic',
        sources: {
          bmrs: bmrsAvailable ? 'available' : 'unavailable',
          carbonIntensity: carbonIntensityAvailable ? 'available' : 'unavailable'
        }
      });
    } catch (error) {
      res.json({
        status: 'error',
        lastUpdate: new Date(),
        dataSource: 'All sources unavailable',
        dataQuality: 'no-data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // UK Emissions and Net Zero Progress endpoints
  app.get("/api/emissions/historical", async (req, res) => {
    try {
      const historicalData = await ukEmissionsApiService.getHistoricalEmissions();
      res.json(historicalData);
    } catch (error) {
      console.error('Error fetching historical emissions:', error);
      res.status(500).json({ error: 'Failed to fetch historical emissions data' });
    }
  });

  app.get("/api/emissions/progress", async (req, res) => {
    try {
      const progress = await ukEmissionsApiService.getCurrentProgress();
      res.json(progress);
    } catch (error) {
      console.error('Error fetching emissions progress:', error);
      res.status(500).json({ error: 'Failed to fetch emissions progress' });
    }
  });

  app.get("/api/emissions/milestones", async (req, res) => {
    try {
      const milestones = await ukEmissionsApiService.getKeyMilestones();
      res.json(milestones);
    } catch (error) {
      console.error('Error fetching emissions milestones:', error);
      res.status(500).json({ error: 'Failed to fetch emissions milestones' });
    }
  });

  app.get("/api/emissions/pathway", async (req, res) => {
    try {
      const [historical, projected] = await Promise.all([
        ukEmissionsApiService.getHistoricalEmissions(),
        ukEmissionsApiService.getProjectedPathway()
      ]);
      
      res.json({
        historical,
        projected,
        combined: [...historical, ...projected].sort((a, b) => a.year - b.year)
      });
    } catch (error) {
      console.error('Error fetching emissions pathway:', error);
      res.status(500).json({ error: 'Failed to fetch emissions pathway' });
    }
  });

  const httpServer = createServer(app);

  // Start data fetching interval (every 5 minutes)
  dataUpdateInterval = setInterval(fetchAndStoreEnergyData, 5 * 60 * 1000);
  
  // Fetch initial data
  fetchAndStoreEnergyData().catch(console.error);

  // Cleanup on process exit
  process.on('SIGTERM', () => {
    if (dataUpdateInterval) {
      clearInterval(dataUpdateInterval);
    }
  });

  return httpServer;
}
