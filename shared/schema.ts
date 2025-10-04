import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, decimal, date } from "drizzle-orm/pg-core";
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

// Alert system tables
export const alertUsers = pgTable("alert_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userAlerts = pgTable("user_alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => alertUsers.id),
  name: varchar("name", { length: 255 }).notNull(),
  alertType: varchar("alert_type", { length: 50 }).notNull(), // 'carbon_intensity', 'renewable_share', 'total_demand'
  condition: varchar("condition", { length: 20 }).notNull(), // 'below', 'above', 'equals'
  threshold: decimal("threshold", { precision: 10, scale: 2 }).notNull(),
  frequency: varchar("frequency", { length: 20 }).notNull(), // 'realtime', '15min', '1hour', 'daily'
  deliveryMethods: jsonb("delivery_methods").notNull(), // ['email', 'sms', 'push']
  isActive: boolean("is_active").default(true),
  lastTriggered: timestamp("last_triggered"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const alertLogs = pgTable("alert_logs", {
  id: serial("id").primaryKey(),
  alertId: integer("alert_id").references(() => userAlerts.id),
  userId: integer("user_id").references(() => alertUsers.id),
  triggerValue: decimal("trigger_value", { precision: 10, scale: 2 }).notNull(),
  deliveryMethod: varchar("delivery_method", { length: 20 }).notNull(),
  deliveryStatus: varchar("delivery_status", { length: 20 }).notNull(), // 'sent', 'failed', 'pending'
  errorMessage: text("error_message"),
  triggeredAt: timestamp("triggered_at").defaultNow(),
});

export const notificationSettings = pgTable("notification_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => alertUsers.id),
  emailEnabled: boolean("email_enabled").default(true),
  smsEnabled: boolean("sms_enabled").default(false),
  pushEnabled: boolean("push_enabled").default(false),
  quietHoursStart: varchar("quiet_hours_start", { length: 5 }), // '22:00'
  quietHoursEnd: varchar("quiet_hours_end", { length: 5 }), // '07:00'
  maxAlertsPerHour: integer("max_alerts_per_hour").default(10),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEnergyDataSchema = createInsertSchema(energyData).omit({
  id: true,
});

// Alert system schemas
export const insertAlertUserSchema = createInsertSchema(alertUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserAlertSchema = createInsertSchema(userAlerts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastTriggered: true,
}).extend({
  threshold: z.union([z.string(), z.number()]).transform(val => String(val)),
});

export const insertAlertLogSchema = createInsertSchema(alertLogs).omit({
  id: true,
  triggeredAt: true,
});

export const insertNotificationSettingsSchema = createInsertSchema(notificationSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Carbon Footprint Tracking Tables
export const carbonUsers = pgTable("carbon_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => carbonUsers.id).notNull(),
  householdSize: integer("household_size").default(1),
  homeType: varchar("home_type", { length: 50 }), // flat, house, etc.
  heatingType: varchar("heating_type", { length: 50 }), // gas, electric, heat_pump
  hasSmartMeter: boolean("has_smart_meter").default(false),
  annualEnergyUsage: decimal("annual_energy_usage", { precision: 10, scale: 2 }), // kWh
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const lifestyleData = pgTable("lifestyle_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => carbonUsers.id).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // transport, diet, energy, shopping
  subcategory: varchar("subcategory", { length: 100 }), // car_petrol, flights_domestic, meat_beef
  value: decimal("value", { precision: 10, scale: 2 }).notNull(), // miles, kg, kWh, etc.
  unit: varchar("unit", { length: 20 }).notNull(), // miles, kg, kWh
  frequency: varchar("frequency", { length: 20 }).notNull(), // daily, weekly, monthly, annually
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const carbonFootprints = pgTable("carbon_footprints", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => carbonUsers.id).notNull(),
  date: date("date").notNull(),
  totalEmissions: decimal("total_emissions", { precision: 10, scale: 3 }).notNull(), // kg CO2e
  energyEmissions: decimal("energy_emissions", { precision: 10, scale: 3 }).notNull(),
  transportEmissions: decimal("transport_emissions", { precision: 10, scale: 3 }).notNull(),
  dietEmissions: decimal("diet_emissions", { precision: 10, scale: 3 }).notNull(),
  shoppingEmissions: decimal("shopping_emissions", { precision: 10, scale: 3 }).notNull(),
  gridCarbonIntensity: decimal("grid_carbon_intensity", { precision: 10, scale: 3 }), // gCO2/kWh
  energyUsage: decimal("energy_usage", { precision: 10, scale: 2 }), // kWh
  createdAt: timestamp("created_at").defaultNow(),
});

export const carbonGoals = pgTable("carbon_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => carbonUsers.id).notNull(),
  goalType: varchar("goal_type", { length: 50 }).notNull(), // weekly, monthly, annual
  targetReduction: decimal("target_reduction", { precision: 5, scale: 2 }).notNull(), // percentage
  currentReduction: decimal("current_reduction", { precision: 5, scale: 2 }).default("0"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const carbonBadges = pgTable("carbon_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => carbonUsers.id).notNull(),
  badgeType: varchar("badge_type", { length: 50 }).notNull(), // first_week, low_carbon_day, etc.
  badgeName: varchar("badge_name", { length: 100 }).notNull(),
  description: text("description"),
  earnedAt: timestamp("earned_at").defaultNow(),
});

// Insert schemas for carbon footprint tables
export const insertCarbonUserSchema = createInsertSchema(carbonUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLifestyleDataSchema = createInsertSchema(lifestyleData).omit({
  id: true,
  createdAt: true,
});

export const insertCarbonFootprintSchema = createInsertSchema(carbonFootprints).omit({
  id: true,
  createdAt: true,
});

export const insertCarbonGoalSchema = createInsertSchema(carbonGoals).omit({
  id: true,
  createdAt: true,
});

export const insertCarbonBadgeSchema = createInsertSchema(carbonBadges).omit({
  id: true,
  earnedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type EnergyData = typeof energyData.$inferSelect;
export type InsertEnergyData = z.infer<typeof insertEnergyDataSchema>;

export type AlertUser = typeof alertUsers.$inferSelect;
export type InsertAlertUser = z.infer<typeof insertAlertUserSchema>;
export type UserAlert = typeof userAlerts.$inferSelect;
export type InsertUserAlert = z.infer<typeof insertUserAlertSchema>;
export type AlertLog = typeof alertLogs.$inferSelect;
export type InsertAlertLog = z.infer<typeof insertAlertLogSchema>;
export type NotificationSettings = typeof notificationSettings.$inferSelect;
export type InsertNotificationSettings = z.infer<typeof insertNotificationSettingsSchema>;

// Carbon Footprint Types
export type CarbonUser = typeof carbonUsers.$inferSelect;
export type InsertCarbonUser = z.infer<typeof insertCarbonUserSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type LifestyleData = typeof lifestyleData.$inferSelect;
export type InsertLifestyleData = z.infer<typeof insertLifestyleDataSchema>;
export type CarbonFootprint = typeof carbonFootprints.$inferSelect;
export type InsertCarbonFootprint = z.infer<typeof insertCarbonFootprintSchema>;
export type CarbonGoal = typeof carbonGoals.$inferSelect;
export type InsertCarbonGoal = z.infer<typeof insertCarbonGoalSchema>;
export type CarbonBadge = typeof carbonBadges.$inferSelect;
export type InsertCarbonBadge = z.infer<typeof insertCarbonBadgeSchema>;

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
