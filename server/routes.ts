import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { energyApiService } from "./services/energyApi";
import { bmrsApiService } from "./services/bmrsApi";
import { insertEnergyDataSchema } from "@shared/schema";

let dataUpdateInterval: NodeJS.Timeout;

async function fetchAndStoreEnergyData() {
  try {
    console.log('Fetching energy data from BMRS and Carbon Intensity APIs...');
    
    // Try to get authentic data from BMRS API first
    let demand: number;
    let generationMix: Record<string, number>;
    
    try {
      // Get authentic UK electricity data from BMRS
      const [bmrsDemand, bmrsGeneration] = await Promise.all([
        bmrsApiService.getCurrentDemand(),
        bmrsApiService.getTodaysGenerationMix()
      ]);
      
      demand = bmrsDemand;
      generationMix = bmrsGeneration;
      console.log('Using authentic BMRS data');
    } catch (bmrsError) {
      console.warn('BMRS API unavailable, falling back to Carbon Intensity API:', bmrsError);
      // Fallback to Carbon Intensity API
      const [fallbackDemand, fallbackMix] = await Promise.all([
        energyApiService.getDemandData(),
        energyApiService.getGenerationMix()
      ]);
      demand = fallbackDemand;
      generationMix = fallbackMix;
    }

    // Get carbon intensity and other data from Carbon Intensity API
    const [carbonIntensity, regionalData, systemStatus] = await Promise.all([
      energyApiService.getCurrentCarbonIntensity(),
      energyApiService.getRegionalData(),
      energyApiService.getSystemStatus()
    ]);

    const frequency = bmrsApiService.getGridFrequency().toFixed(2);

    const energyData = {
      timestamp: new Date(),
      totalDemand: demand,
      carbonIntensity,
      frequency,
      energyMix: generationMix,
      regionalData,
      systemStatus,
    };

    // Validate data before storing
    const validatedData = insertEnergyDataSchema.parse(energyData);
    await storage.saveEnergyData(validatedData);
    
    console.log('Energy data updated successfully');
  } catch (error) {
    console.error('Error fetching/storing energy data:', error);
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
        // If no historical data, try to fetch from API
        try {
          // Try to get historical data from BMRS first
          try {
            const bmrsHistoricalDemand = await bmrsApiService.getHistoricalDemand(hours);
            
            // Get generation mix for recent dates
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            const [todayGeneration, yesterdayGeneration] = await Promise.all([
              bmrsApiService.getTodaysGenerationMix().catch(() => null),
              bmrsApiService.getActualGenerationByType(yesterdayStr).then(data => 
                bmrsApiService['normalizeGenerationData'](data)
              ).catch(() => null)
            ]);
            
            const generationMix = todayGeneration || yesterdayGeneration;
            
            if (generationMix && bmrsHistoricalDemand.length > 0) {
              // Store BMRS historical data
              for (const dataPoint of bmrsHistoricalDemand) {
                const energyData = {
                  timestamp: new Date(dataPoint.time),
                  totalDemand: dataPoint.demand,
                  carbonIntensity: await energyApiService.getCurrentCarbonIntensity(),
                  frequency: bmrsApiService.getGridFrequency().toFixed(2),
                  energyMix: generationMix,
                  regionalData: energyApiService.getRegionalData(),
                  systemStatus: energyApiService.getSystemStatus(),
                };
                
                const validatedData = insertEnergyDataSchema.parse(energyData);
                await storage.saveEnergyData(validatedData);
              }
            } else {
              throw new Error('BMRS historical data unavailable');
            }
          } catch (bmrsError) {
            // Fallback to Carbon Intensity API
            const apiHistoryData = await energyApiService.get24HourData();
            
            // Store the historical data
            for (const dataPoint of apiHistoryData) {
              const energyData = {
                timestamp: new Date(dataPoint.time),
                totalDemand: await energyApiService.getDemandData(),
                carbonIntensity: dataPoint.carbonIntensity,
                frequency: bmrsApiService.getGridFrequency().toFixed(2),
                energyMix: dataPoint.mix,
                regionalData: energyApiService.getRegionalData(),
                systemStatus: energyApiService.getSystemStatus(),
              };
              
              const validatedData = insertEnergyDataSchema.parse(energyData);
              await storage.saveEnergyData(validatedData);
            }
          }
          
          const newHistoryData = await storage.getEnergyDataHistory(hours);
          return res.json(newHistoryData);
        } catch (apiError) {
          console.error('Error fetching historical data from API:', apiError);
          return res.json([]);
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
      // Test basic API connectivity
      await energyApiService.getCurrentCarbonIntensity();
      
      res.json({
        status: 'operational',
        lastUpdate: new Date(),
        dataSource: 'Carbon Intensity API'
      });
    } catch (error) {
      res.json({
        status: 'error',
        lastUpdate: new Date(),
        dataSource: 'Carbon Intensity API',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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
