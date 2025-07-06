import { db } from '../db';
import { 
  alertUsers, 
  userAlerts, 
  alertLogs, 
  notificationSettings,
  type InsertAlertUser,
  type InsertUserAlert,
  type InsertAlertLog,
  type InsertNotificationSettings,
  type AlertUser,
  type UserAlert,
  type AlertLog,
  type NotificationSettings
} from '@shared/schema';
import { eq, and, gte, lt, desc } from 'drizzle-orm';
import { notificationService } from './notificationService';

interface EnergyMetrics {
  carbonIntensity: number;
  renewableShare: number;
  totalDemand: number;
  timestamp: Date;
}

interface AlertCheck {
  alertId: number;
  userId: number;
  alertName: string;
  alertType: string;
  condition: string;
  threshold: number;
  deliveryMethods: string[];
  lastTriggered?: Date | null;
  userEmail: string;
  userPhone?: string | null;
}

export class AlertService {
  private isProcessing = false;

  // User management
  async createAlertUser(userData: InsertAlertUser): Promise<AlertUser> {
    const [user] = await db.insert(alertUsers).values(userData).returning();
    
    // Create default notification settings
    await db.insert(notificationSettings).values({
      userId: user.id,
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: false,
      maxAlertsPerHour: 10,
    });
    
    return user;
  }

  async getAlertUser(email: string): Promise<AlertUser | undefined> {
    const [user] = await db.select().from(alertUsers).where(eq(alertUsers.email, email));
    return user;
  }

  async updateAlertUser(userId: number, updates: Partial<InsertAlertUser>): Promise<AlertUser> {
    const [user] = await db
      .update(alertUsers)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(alertUsers.id, userId))
      .returning();
    return user;
  }

  // Alert management
  async createUserAlert(alertData: InsertUserAlert): Promise<UserAlert> {
    const [alert] = await db.insert(userAlerts).values(alertData).returning();
    return alert;
  }

  async getUserAlerts(userId: number): Promise<UserAlert[]> {
    return await db
      .select()
      .from(userAlerts)
      .where(and(eq(userAlerts.userId, userId), eq(userAlerts.isActive, true)))
      .orderBy(desc(userAlerts.createdAt));
  }

  async updateUserAlert(alertId: number, updates: Partial<InsertUserAlert>): Promise<UserAlert> {
    const [alert] = await db
      .update(userAlerts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userAlerts.id, alertId))
      .returning();
    return alert;
  }

  async deleteUserAlert(alertId: number): Promise<void> {
    await db.update(userAlerts)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(userAlerts.id, alertId));
  }

  // Notification settings
  async updateNotificationSettings(
    userId: number, 
    settings: Partial<InsertNotificationSettings>
  ): Promise<NotificationSettings> {
    const [updated] = await db
      .update(notificationSettings)
      .set({ ...settings, updatedAt: new Date() })
      .where(eq(notificationSettings.userId, userId))
      .returning();
    return updated;
  }

  async getNotificationSettings(userId: number): Promise<NotificationSettings | undefined> {
    const [settings] = await db
      .select()
      .from(notificationSettings)
      .where(eq(notificationSettings.userId, userId));
    return settings;
  }

  // Core alert processing
  calculateRenewableShare(energyMix: any): number {
    const totalGeneration = 
      energyMix.wind + energyMix.solar + energyMix.nuclear + 
      energyMix.gas + energyMix.coal + energyMix.hydro + 
      energyMix.biomass + energyMix.other;
    
    const renewableGeneration = 
      energyMix.wind + energyMix.solar + energyMix.hydro + energyMix.biomass;
    
    return totalGeneration > 0 ? (renewableGeneration / totalGeneration) * 100 : 0;
  }

  async getActiveAlertsToCheck(): Promise<AlertCheck[]> {
    const results = await db
      .select({
        alertId: userAlerts.id,
        userId: userAlerts.userId,
        alertName: userAlerts.name,
        alertType: userAlerts.alertType,
        condition: userAlerts.condition,
        threshold: userAlerts.threshold,
        deliveryMethods: userAlerts.deliveryMethods,
        lastTriggered: userAlerts.lastTriggered,
        userEmail: alertUsers.email,
        userPhone: alertUsers.phone,
      })
      .from(userAlerts)
      .innerJoin(alertUsers, eq(userAlerts.userId, alertUsers.id))
      .where(
        and(
          eq(userAlerts.isActive, true),
          eq(alertUsers.isActive, true)
        )
      );

    return results
      .filter(result => result.userId !== null)
      .map(result => ({
        ...result,
        userId: result.userId!,
        deliveryMethods: Array.isArray(result.deliveryMethods) 
          ? result.deliveryMethods 
          : [],
        threshold: Number(result.threshold),
      }));
  }

  checkAlertCondition(value: number, condition: string, threshold: number): boolean {
    switch (condition) {
      case 'below':
        return value < threshold;
      case 'above':
        return value > threshold;
      case 'equals':
        return Math.abs(value - threshold) < 0.01; // Small tolerance for floating point
      default:
        return false;
    }
  }

  async shouldTriggerAlert(alert: AlertCheck): Promise<boolean> {
    // Check if alert was recently triggered to prevent spam
    if (alert.lastTriggered) {
      const timeSinceLastTrigger = Date.now() - alert.lastTriggered.getTime();
      const minimumInterval = 15 * 60 * 1000; // 15 minutes minimum between triggers
      
      if (timeSinceLastTrigger < minimumInterval) {
        return false;
      }
    }

    // Check notification settings for rate limiting
    const settings = await this.getNotificationSettings(alert.userId);
    if (settings) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentAlerts = await db
        .select()
        .from(alertLogs)
        .where(
          and(
            eq(alertLogs.userId, alert.userId),
            gte(alertLogs.triggeredAt, oneHourAgo)
          )
        );

      if (recentAlerts.length >= (settings.maxAlertsPerHour || 10)) {
        console.log(`Rate limit exceeded for user ${alert.userId}`);
        return false;
      }

      // Check quiet hours
      if (settings.quietHoursStart && settings.quietHoursEnd) {
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0');
        const currentMinute = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${currentHour}:${currentMinute}`;

        const isInQuietHours = 
          currentTime >= settings.quietHoursStart && 
          currentTime <= settings.quietHoursEnd;

        if (isInQuietHours) {
          console.log(`Alert suppressed due to quiet hours for user ${alert.userId}`);
          return false;
        }
      }
    }

    return true;
  }

  async processAlerts(energyData: EnergyMetrics): Promise<void> {
    if (this.isProcessing) {
      console.log('Alert processing already in progress, skipping...');
      return;
    }

    this.isProcessing = true;

    try {
      console.log('Processing alerts for energy data:', {
        carbonIntensity: energyData.carbonIntensity,
        renewableShare: energyData.renewableShare,
        totalDemand: energyData.totalDemand,
        timestamp: energyData.timestamp,
      });

      const activeAlerts = await this.getActiveAlertsToCheck();
      console.log(`Found ${activeAlerts.length} active alerts to check`);

      for (const alert of activeAlerts) {
        try {
          let currentValue: number;

          // Get the current value based on alert type
          switch (alert.alertType) {
            case 'carbon_intensity':
              currentValue = energyData.carbonIntensity;
              break;
            case 'renewable_share':
              currentValue = energyData.renewableShare;
              break;
            case 'total_demand':
              currentValue = energyData.totalDemand;
              break;
            default:
              console.log(`Unknown alert type: ${alert.alertType}`);
              continue;
          }

          // Check if condition is met
          const conditionMet = this.checkAlertCondition(
            currentValue, 
            alert.condition, 
            alert.threshold
          );

          if (conditionMet && await this.shouldTriggerAlert(alert)) {
            console.log(`Triggering alert ${alert.alertId}: ${alert.alertName}`);

            // Send notification
            const notificationResult = await notificationService.sendAlertNotification(
              { email: alert.userEmail, phone: alert.userPhone },
              {
                alertName: alert.alertName,
                alertType: alert.alertType,
                threshold: alert.threshold,
                currentValue,
                condition: alert.condition,
                timestamp: energyData.timestamp,
              },
              alert.deliveryMethods
            );

            // Log each delivery attempt
            for (const method of alert.deliveryMethods) {
              const wasSuccessful = method === 'email' ? notificationResult.email : notificationResult.sms;
              const status = wasSuccessful === true ? 'sent' : 'failed';
              const errorMessage = notificationResult.errors.find(err => err.includes(method.toUpperCase()));

              await db.insert(alertLogs).values({
                alertId: alert.alertId,
                userId: alert.userId,
                triggerValue: currentValue.toString(),
                deliveryMethod: method,
                deliveryStatus: status,
                errorMessage: errorMessage || undefined,
              });
            }

            // Update last triggered timestamp
            await db
              .update(userAlerts)
              .set({ lastTriggered: energyData.timestamp })
              .where(eq(userAlerts.id, alert.alertId));

            console.log(`Alert ${alert.alertId} processed successfully`);
          }
        } catch (error) {
          console.error(`Error processing alert ${alert.alertId}:`, error);
        }
      }
    } catch (error) {
      console.error('Error in alert processing:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  // Analytics and reporting
  async getAlertLogs(userId: number, limit = 50): Promise<AlertLog[]> {
    return await db
      .select()
      .from(alertLogs)
      .where(eq(alertLogs.userId, userId))
      .orderBy(desc(alertLogs.triggeredAt))
      .limit(limit);
  }

  async getAlertStatistics(): Promise<{
    totalUsers: number;
    totalAlerts: number;
    alertsByType: Record<string, number>;
    recentTriggers: number;
  }> {
    const [userCount] = await db
      .select({ count: db.$count(alertUsers) })
      .from(alertUsers)
      .where(eq(alertUsers.isActive, true));

    const [alertCount] = await db
      .select({ count: db.$count(userAlerts) })
      .from(userAlerts)
      .where(eq(userAlerts.isActive, true));

    const alertTypes = await db
      .select({ 
        alertType: userAlerts.alertType,
        count: db.$count(userAlerts)
      })
      .from(userAlerts)
      .where(eq(userAlerts.isActive, true))
      .groupBy(userAlerts.alertType);

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [recentTriggersCount] = await db
      .select({ count: db.$count(alertLogs) })
      .from(alertLogs)
      .where(gte(alertLogs.triggeredAt, oneDayAgo));

    return {
      totalUsers: userCount?.count || 0,
      totalAlerts: alertCount?.count || 0,
      alertsByType: alertTypes.reduce((acc, item) => {
        acc[item.alertType] = item.count;
        return acc;
      }, {} as Record<string, number>),
      recentTriggers: recentTriggersCount?.count || 0,
    };
  }
}

export const alertService = new AlertService();