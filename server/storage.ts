import { users, energyData, type User, type InsertUser, type EnergyData, type InsertEnergyData } from "@shared/schema";

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
    
    const latestId = Math.max(...this.energyData.keys());
    return this.energyData.get(latestId);
  }

  async saveEnergyData(data: InsertEnergyData): Promise<EnergyData> {
    const id = this.currentEnergyId++;
    const energyDataRecord: EnergyData = { ...data, id };
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

export const storage = new MemStorage();
