import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const energyData = pgTable("energy_data", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull(),
  totalDemand: integer("total_demand").notNull(),
  carbonIntensity: integer("carbon_intensity").notNull(),
  frequency: text("frequency").notNull(),
  energyMix: jsonb("energy_mix").notNull(),
  regionalData: jsonb("regional_data"),
  systemStatus: jsonb("system_status"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEnergyDataSchema = createInsertSchema(energyData).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type EnergyData = typeof energyData.$inferSelect;
export type InsertEnergyData = z.infer<typeof insertEnergyDataSchema>;

export const EnergyMixSchema = z.object({
  gas: z.number(),
  coal: z.number(),
  nuclear: z.number(),
  wind: z.number(),
  solar: z.number(),
  hydro: z.number(),
  biomass: z.number(),
  imports: z.number(),
  other: z.number(),
});

export const RegionalDataSchema = z.object({
  england: z.object({
    nuclear: z.number(),
    gas: z.number(),
  }),
  scotland: z.object({
    wind: z.number(),
    hydro: z.number(),
  }),
  wales: z.object({
    wind: z.number(),
  }),
});

export const SystemStatusSchema = z.object({
  gridStability: z.string(),
  netImports: z.number(),
  reserveMargin: z.number(),
  apiStatus: z.string(),
});

export type EnergyMix = z.infer<typeof EnergyMixSchema>;
export type RegionalData = z.infer<typeof RegionalDataSchema>;
export type SystemStatus = z.infer<typeof SystemStatusSchema>;
