import { users, energyData, type User, type InsertUser, type EnergyData, type InsertEnergyData } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq, desc, gte } from "drizzle-orm";
import ws from "ws";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getLatestEnergyData(): Promise<EnergyData | undefined>;
  saveEnergyData(data: InsertEnergyData): Promise<EnergyData>;
  getEnergyDataHistory(hours: number): Promise<EnergyData[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private energyData: Map<number, EnergyData>;
  private currentUserId: number;
  private currentEnergyId: number;

  constructor() {
    this.users = new Map();
    this.energyData = new Map();
    this.currentUserId = 1;
    this.currentEnergyId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getLatestEnergyData(): Promise<EnergyData | undefined> {
    if (this.energyData.size === 0) return undefined;

    const latestId = Math.max(...Array.from(this.energyData.keys()));
    return this.energyData.get(latestId);
  }

  async saveEnergyData(data: InsertEnergyData): Promise<EnergyData> {
    const id = this.currentEnergyId++;
    const energyDataRecord: EnergyData = {
      ...data,
      id,
      regionalData: data.regionalData || null,
      systemStatus: data.systemStatus || null
    };
    this.energyData.set(id, energyDataRecord);
    
    // Keep only last 48 hours of data to prevent memory issues
    const cutoffTime = new Date(Date.now() - 48 * 60 * 60 * 1000);
    Array.from(this.energyData.entries()).forEach(([id, record]) => {
      if (record.timestamp < cutoffTime) {
        this.energyData.delete(id);
      }
    });
    
    return energyDataRecord;
  }

  async getEnergyDataHistory(hours: number): Promise<EnergyData[]> {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    return Array.from(this.energyData.values())
      .filter(record => record.timestamp >= cutoffTime)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
}

// PostgreSQL Database Storage Implementation
export class DbStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor(connectionString: string) {
    this.db = drizzle({
      connection: connectionString,
      ws: ws,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db
      .insert(users)
      .values(insertUser)
      .returning();
    return result[0];
  }

  async getLatestEnergyData(): Promise<EnergyData | undefined> {
    const result = await this.db
      .select()
      .from(energyData)
      .orderBy(desc(energyData.timestamp))
      .limit(1);
    return result[0];
  }

  async saveEnergyData(data: InsertEnergyData): Promise<EnergyData> {
    const result = await this.db
      .insert(energyData)
      .values(data)
      .returning();
    return result[0];
  }

  async getEnergyDataHistory(hours: number): Promise<EnergyData[]> {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);

    const result = await this.db
      .select()
      .from(energyData)
      .where(gte(energyData.timestamp, cutoffTime))
      .orderBy(energyData.timestamp);

    return result;
  }
}

// Use DbStorage if DATABASE_URL is available, otherwise fall back to MemStorage
export const storage = process.env.DATABASE_URL
  ? new DbStorage(process.env.DATABASE_URL)
  : new MemStorage();
