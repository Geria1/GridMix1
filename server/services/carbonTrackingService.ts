import { db } from '../db';
import { eq, and, desc, sql, between } from 'drizzle-orm';
import {
  carbonUsers,
  userProfiles,
  lifestyleData,
  carbonFootprints,
  carbonGoals,
  carbonBadges,
  type CarbonUser,
  type InsertCarbonUser,
  type UserProfile,
  type InsertUserProfile,
  type LifestyleData,
  type InsertLifestyleData,
  type CarbonFootprint,
  type InsertCarbonFootprint,
  type CarbonGoal,
  type InsertCarbonGoal,
  type CarbonBadge,
  type InsertCarbonBadge,
} from '@shared/schema';

// DEFRA Carbon Emission Factors (2024) - kg CO2e per unit
const EMISSION_FACTORS = {
  // Transport (per mile)
  transport: {
    car_petrol: 0.176, // kg CO2e per mile
    car_diesel: 0.168,
    car_hybrid: 0.109,
    car_electric: 0.047, // depends on grid intensity
    bus: 0.103,
    train: 0.041,
    taxi: 0.211,
    motorcycle: 0.113,
    flights_domestic: 0.246, // per mile
    flights_short_haul: 0.156, // per mile  
    flights_long_haul: 0.195, // per mile
  },
  
  // Diet (per kg of food)
  diet: {
    meat_beef: 27.0, // kg CO2e per kg
    meat_lamb: 24.5,
    meat_pork: 12.1,
    meat_chicken: 6.9,
    fish_farmed: 6.0,
    fish_wild: 2.9,
    dairy_milk: 3.2, // per liter
    dairy_cheese: 13.5,
    eggs: 4.8,
    vegetables: 2.0,
    fruits: 1.1,
    grains: 2.5,
    nuts: 0.3,
  },
  
  // Energy (per kWh) - this will be calculated dynamically from grid data
  energy: {
    electricity_grid: 0.193, // UK average - will be replaced with real-time data
    gas_heating: 0.185, // per kWh of gas
    oil_heating: 0.245,
    lpg_heating: 0.214,
  },
  
  // Shopping (per £ spent)
  shopping: {
    clothing: 0.024, // kg CO2e per £
    electronics: 0.039,
    furniture: 0.027,
    books_media: 0.015,
    household_goods: 0.032,
    personal_care: 0.018,
  },
};

interface EmissionCalculation {
  category: string;
  dailyEmissions: number;
  weeklyEmissions: number;
  monthlyEmissions: number;
  annualEmissions: number;
}

interface CarbonInsights {
  currentIntensity: number;
  gridComposition: any;
  cleanestHours: Array<{ hour: number; intensity: number }>;
  suggestions: string[];
}

export class CarbonTrackingService {
  
  // User Management
  async createCarbonUser(userData: InsertCarbonUser): Promise<CarbonUser> {
    const [user] = await db
      .insert(carbonUsers)
      .values(userData)
      .returning();
    return user;
  }

  async getCarbonUser(email: string): Promise<CarbonUser | undefined> {
    const [user] = await db
      .select()
      .from(carbonUsers)
      .where(eq(carbonUsers.email, email));
    return user;
  }

  async getCarbonUserById(userId: number): Promise<CarbonUser | undefined> {
    const [user] = await db
      .select()
      .from(carbonUsers)
      .where(eq(carbonUsers.id, userId));
    return user;
  }

  // User Profile Management
  async createUserProfile(profileData: InsertUserProfile): Promise<UserProfile> {
    const [profile] = await db
      .insert(userProfiles)
      .values(profileData)
      .returning();
    return profile;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async updateUserProfile(userId: number, updates: Partial<InsertUserProfile>): Promise<UserProfile> {
    const [profile] = await db
      .update(userProfiles)
      .set(updates)
      .where(eq(userProfiles.userId, userId))
      .returning();
    return profile;
  }

  // Lifestyle Data Management
  async addLifestyleData(data: InsertLifestyleData): Promise<LifestyleData> {
    const [lifestyle] = await db
      .insert(lifestyleData)
      .values(data)
      .returning();
    return lifestyle;
  }

  async getLifestyleData(userId: number, dateFrom: string, dateTo: string): Promise<LifestyleData[]> {
    return await db
      .select()
      .from(lifestyleData)
      .where(
        and(
          eq(lifestyleData.userId, userId),
          between(lifestyleData.date, dateFrom, dateTo)
        )
      )
      .orderBy(desc(lifestyleData.date));
  }

  async updateLifestyleData(id: number, updates: Partial<InsertLifestyleData>): Promise<LifestyleData> {
    const [data] = await db
      .update(lifestyleData)
      .set(updates)
      .where(eq(lifestyleData.id, id))
      .returning();
    return data;
  }

  async deleteLifestyleData(id: number): Promise<void> {
    await db.delete(lifestyleData).where(eq(lifestyleData.id, id));
  }

  // Carbon Footprint Calculations
  calculateEmissionsFromLifestyle(
    lifestyle: LifestyleData[],
    gridCarbonIntensity: number = EMISSION_FACTORS.energy.electricity_grid * 1000 // convert to g/kWh
  ): EmissionCalculation {
    const emissionsByCategory: Record<string, number> = {
      transport: 0,
      diet: 0,
      energy: 0,
      shopping: 0,
    };

    lifestyle.forEach((item) => {
      const value = parseFloat(item.value);
      let emissionFactor = 0;

      // Get emission factor based on category and subcategory
      if (item.category === 'transport' && EMISSION_FACTORS.transport[item.subcategory as keyof typeof EMISSION_FACTORS.transport]) {
        emissionFactor = EMISSION_FACTORS.transport[item.subcategory as keyof typeof EMISSION_FACTORS.transport];
      } else if (item.category === 'diet' && EMISSION_FACTORS.diet[item.subcategory as keyof typeof EMISSION_FACTORS.diet]) {
        emissionFactor = EMISSION_FACTORS.diet[item.subcategory as keyof typeof EMISSION_FACTORS.diet];
      } else if (item.category === 'energy') {
        if (item.subcategory === 'electricity_grid') {
          // Use real-time grid carbon intensity
          emissionFactor = gridCarbonIntensity / 1000; // convert g/kWh to kg/kWh
        } else if (EMISSION_FACTORS.energy[item.subcategory as keyof typeof EMISSION_FACTORS.energy]) {
          emissionFactor = EMISSION_FACTORS.energy[item.subcategory as keyof typeof EMISSION_FACTORS.energy];
        }
      } else if (item.category === 'shopping' && EMISSION_FACTORS.shopping[item.subcategory as keyof typeof EMISSION_FACTORS.shopping]) {
        emissionFactor = EMISSION_FACTORS.shopping[item.subcategory as keyof typeof EMISSION_FACTORS.shopping];
      }

      // Convert to daily emissions based on frequency
      let dailyEmissions = 0;
      switch (item.frequency) {
        case 'daily':
          dailyEmissions = value * emissionFactor;
          break;
        case 'weekly':
          dailyEmissions = (value * emissionFactor) / 7;
          break;
        case 'monthly':
          dailyEmissions = (value * emissionFactor) / 30;
          break;
        case 'annually':
          dailyEmissions = (value * emissionFactor) / 365;
          break;
      }

      emissionsByCategory[item.category] += dailyEmissions;
    });

    const totalDaily = Object.values(emissionsByCategory).reduce((sum, val) => sum + val, 0);

    return {
      category: 'total',
      dailyEmissions: totalDaily,
      weeklyEmissions: totalDaily * 7,
      monthlyEmissions: totalDaily * 30,
      annualEmissions: totalDaily * 365,
    };
  }

  // Store calculated carbon footprint
  async storeCarbonFootprint(footprintData: InsertCarbonFootprint): Promise<CarbonFootprint> {
    const [footprint] = await db
      .insert(carbonFootprints)
      .values(footprintData)
      .returning();
    return footprint;
  }

  async getCarbonFootprints(userId: number, dateFrom: string, dateTo: string): Promise<CarbonFootprint[]> {
    return await db
      .select()
      .from(carbonFootprints)
      .where(
        and(
          eq(carbonFootprints.userId, userId),
          between(carbonFootprints.date, dateFrom, dateTo)
        )
      )
      .orderBy(desc(carbonFootprints.date));
  }

  // Goal Management
  async createCarbonGoal(goalData: InsertCarbonGoal): Promise<CarbonGoal> {
    const [goal] = await db
      .insert(carbonGoals)
      .values(goalData)
      .returning();
    return goal;
  }

  async getCarbonGoals(userId: number): Promise<CarbonGoal[]> {
    return await db
      .select()
      .from(carbonGoals)
      .where(eq(carbonGoals.userId, userId))
      .orderBy(desc(carbonGoals.createdAt));
  }

  async updateCarbonGoal(goalId: number, updates: Partial<InsertCarbonGoal>): Promise<CarbonGoal> {
    const [goal] = await db
      .update(carbonGoals)
      .set(updates)
      .where(eq(carbonGoals.id, goalId))
      .returning();
    return goal;
  }

  // Badge System
  async awardBadge(badgeData: InsertCarbonBadge): Promise<CarbonBadge> {
    const [badge] = await db
      .insert(carbonBadges)
      .values(badgeData)
      .returning();
    return badge;
  }

  async getUserBadges(userId: number): Promise<CarbonBadge[]> {
    return await db
      .select()
      .from(carbonBadges)
      .where(eq(carbonBadges.userId, userId))
      .orderBy(desc(carbonBadges.earnedAt));
  }

  // Check and award badges based on achievements
  async checkAndAwardBadges(userId: number, footprintData: CarbonFootprint): Promise<CarbonBadge[]> {
    const badges: CarbonBadge[] = [];
    const existingBadges = await this.getUserBadges(userId);
    const existingBadgeTypes = existingBadges.map(b => b.badgeType);

    // First week badge
    if (!existingBadgeTypes.includes('first_week')) {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const recentFootprints = await this.getCarbonFootprints(
        userId,
        weekAgo.toISOString().split('T')[0],
        new Date().toISOString().split('T')[0]
      );
      
      if (recentFootprints.length >= 7) {
        const badge = await this.awardBadge({
          userId,
          badgeType: 'first_week',
          badgeName: 'First Week Tracked',
          description: 'Completed your first week of carbon footprint tracking',
        });
        badges.push(badge);
      }
    }

    // Low carbon day badge (under 5kg CO2e)
    if (parseFloat(footprintData.totalEmissions) < 5.0 && !existingBadgeTypes.includes('low_carbon_day')) {
      const badge = await this.awardBadge({
        userId,
        badgeType: 'low_carbon_day',
        badgeName: 'Low Carbon Day',
        description: 'Achieved a daily footprint under 5kg CO2e',
      });
      badges.push(badge);
    }

    return badges;
  }

  // Generate insights and suggestions
  async generateCarbonInsights(userId: number, currentGridData: any): Promise<CarbonInsights> {
    const recentData = await this.getLifestyleData(
      userId,
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      new Date().toISOString().split('T')[0]
    );

    const suggestions: string[] = [];
    
    // Analyze energy usage patterns
    const energyData = recentData.filter(d => d.category === 'energy');
    if (energyData.length > 0) {
      const avgDailyEnergy = energyData.reduce((sum, d) => sum + parseFloat(d.value), 0) / 7;
      if (avgDailyEnergy > 30) { // kWh per day
        suggestions.push(
          `Your daily energy usage (${avgDailyEnergy.toFixed(1)} kWh) is above average. Consider using appliances during low-carbon hours.`
        );
      }
    }

    // Analyze transport patterns
    const transportData = recentData.filter(d => d.category === 'transport');
    const carMiles = transportData
      .filter(d => d.subcategory?.includes('car'))
      .reduce((sum, d) => sum + parseFloat(d.value), 0);
    
    if (carMiles > 200) { // weekly miles
      suggestions.push(
        `You've driven ${carMiles} miles this week. Consider public transport or cycling for shorter trips.`
      );
    }

    // Grid-specific suggestions
    if (currentGridData.carbonIntensity > 300) {
      suggestions.push(
        'Grid carbon intensity is high right now. Consider delaying energy-intensive activities.'
      );
    } else if (currentGridData.carbonIntensity < 150) {
      suggestions.push(
        'Grid carbon intensity is low! Great time to use electricity for heating, charging, or laundry.'
      );
    }

    return {
      currentIntensity: currentGridData.carbonIntensity,
      gridComposition: currentGridData.energyMix,
      cleanestHours: [], // This would be populated from forecast data
      suggestions,
    };
  }

  // Calculate daily footprint with real-time grid data
  async calculateDailyFootprint(userId: number, date: string, gridCarbonIntensity: number): Promise<CarbonFootprint> {
    const lifestyle = await this.getLifestyleData(userId, date, date);
    const emissions = this.calculateEmissionsFromLifestyle(lifestyle, gridCarbonIntensity);
    
    // Break down by category
    const categoryEmissions = {
      transport: 0,
      diet: 0,
      energy: 0,
      shopping: 0,
    };

    lifestyle.forEach((item) => {
      const value = parseFloat(item.value);
      let emissionFactor = 0;
      
      if (item.category === 'transport' && EMISSION_FACTORS.transport[item.subcategory as keyof typeof EMISSION_FACTORS.transport]) {
        emissionFactor = EMISSION_FACTORS.transport[item.subcategory as keyof typeof EMISSION_FACTORS.transport];
      } else if (item.category === 'diet' && EMISSION_FACTORS.diet[item.subcategory as keyof typeof EMISSION_FACTORS.diet]) {
        emissionFactor = EMISSION_FACTORS.diet[item.subcategory as keyof typeof EMISSION_FACTORS.diet];
      } else if (item.category === 'energy') {
        if (item.subcategory === 'electricity_grid') {
          emissionFactor = gridCarbonIntensity / 1000;
        } else if (EMISSION_FACTORS.energy[item.subcategory as keyof typeof EMISSION_FACTORS.energy]) {
          emissionFactor = EMISSION_FACTORS.energy[item.subcategory as keyof typeof EMISSION_FACTORS.energy];
        }
      } else if (item.category === 'shopping' && EMISSION_FACTORS.shopping[item.subcategory as keyof typeof EMISSION_FACTORS.shopping]) {
        emissionFactor = EMISSION_FACTORS.shopping[item.subcategory as keyof typeof EMISSION_FACTORS.shopping];
      }

      let dailyEmissions = 0;
      switch (item.frequency) {
        case 'daily':
          dailyEmissions = value * emissionFactor;
          break;
        case 'weekly':
          dailyEmissions = (value * emissionFactor) / 7;
          break;
        case 'monthly':
          dailyEmissions = (value * emissionFactor) / 30;
          break;
        case 'annually':
          dailyEmissions = (value * emissionFactor) / 365;
          break;
      }

      categoryEmissions[item.category as keyof typeof categoryEmissions] += dailyEmissions;
    });

    const totalEnergyUsage = lifestyle
      .filter(d => d.category === 'energy')
      .reduce((sum, d) => sum + parseFloat(d.value), 0);

    const footprintData: InsertCarbonFootprint = {
      userId,
      date,
      totalEmissions: emissions.dailyEmissions.toString(),
      energyEmissions: categoryEmissions.energy.toString(),
      transportEmissions: categoryEmissions.transport.toString(),
      dietEmissions: categoryEmissions.diet.toString(),
      shoppingEmissions: categoryEmissions.shopping.toString(),
      gridCarbonIntensity: gridCarbonIntensity.toString(),
      energyUsage: totalEnergyUsage.toString(),
    };

    return await this.storeCarbonFootprint(footprintData);
  }
}

export const carbonTrackingService = new CarbonTrackingService();