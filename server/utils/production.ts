/**
 * Production environment configuration and security hardening
 */

import { logger } from './logger';

interface ProductionConfig {
  nodeEnv: string;
  isProduction: boolean;
  port: number;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
}

export class ProductionUtils {
  private static config: ProductionConfig = {
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    port: parseInt(process.env.PORT || '5000'),
    logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
  };

  static getConfig(): ProductionConfig {
    return this.config;
  }

  static safeLog(level: 'info' | 'warn' | 'error' | 'debug', message: string, context?: any) {
    logger[level](message, context);
  }

  static sanitizeForProduction<T>(data: T): T {
    if (this.config.isProduction) {
      // Remove sensitive fields in production
      if (typeof data === 'object' && data !== null) {
        const sanitized = { ...data };
        // Remove potentially sensitive fields
        const sensitiveFields = ['password', 'secret', 'key', 'token', 'apiKey'];
        sensitiveFields.forEach(field => {
          if (field in sanitized) {
            delete (sanitized as any)[field];
          }
        });
        return sanitized;
      }
    }
    return data;
  }

  static validateEnvironment(): { valid: boolean; missing: string[] } {
    const requiredEnvVars = [];
    const optionalEnvVars = ['BMRS_API_KEY', 'MAILCHIMP_API_KEY'];
    
    const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missing.length > 0) {
      logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    optionalEnvVars.forEach(envVar => {
      if (!process.env[envVar]) {
        logger.warn(`Optional environment variable not set: ${envVar}`);
      }
    });

    return {
      valid: missing.length === 0,
      missing
    };
  }

  static getSystemStatus() {
    const health = logger.getSystemHealth();
    const env = this.validateEnvironment();
    
    return {
      environment: this.config.nodeEnv,
      healthy: health.status === 'healthy' && env.valid,
      status: health.status,
      recentErrors: health.recentErrors,
      missingEnvVars: env.missing,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    };
  }
}

// Production security measures
if (ProductionUtils.getConfig().isProduction) {
  // Override console methods in production
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };

  console.log = (...args) => logger.info(args.join(' '));
  console.warn = (...args) => logger.warn(args.join(' '));
  console.error = (...args) => logger.error(args.join(' '));
  console.info = (...args) => logger.info(args.join(' '));
  console.debug = (...args) => logger.debug(args.join(' '));
}

export default ProductionUtils;