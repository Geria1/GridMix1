import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, decimal } from "drizzle-orm/pg-core";
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
