/**
 * Production-safe logging utility
 * Only logs in development, stores critical errors for production monitoring
 */

interface LogLevel {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private errorLog: LogLevel[] = [];
  private readonly maxErrorLogSize = 100;

  info(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, context || '');
    }
  }

  warn(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context || '');
    }
    this.addToErrorLog('warn', message, context);
  }

  error(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, context || '');
    }
    this.addToErrorLog('error', message, context);
  }

  debug(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  }

  private addToErrorLog(level: 'warn' | 'error', message: string, context?: Record<string, any>) {
    this.errorLog.push({
      level,
      message,
      timestamp: new Date(),
      context
    });
    
    // Keep only recent errors
    if (this.errorLog.length > this.maxErrorLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxErrorLogSize);
    }
  }

  getRecentErrors(): LogLevel[] {
    return this.errorLog.slice();
  }

  getSystemHealth(): { status: 'healthy' | 'degraded' | 'critical'; recentErrors: number } {
    const recentErrors = this.errorLog.filter(
      log => Date.now() - log.timestamp.getTime() < 60000 // Last minute
    );
    
    const errorCount = recentErrors.filter(log => log.level === 'error').length;
    
    if (errorCount > 5) return { status: 'critical', recentErrors: errorCount };
    if (errorCount > 2) return { status: 'degraded', recentErrors: errorCount };
    return { status: 'healthy', recentErrors: errorCount };
  }
}

export const logger = new Logger();