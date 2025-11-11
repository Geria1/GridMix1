import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import ProductionUtils from "./utils/production";
import { logger } from "./utils/logger";

// Initialize production environment and validate configuration
const envValidation = ProductionUtils.validateEnvironment();
if (!envValidation.valid) {
  logger.error(`Environment validation failed. Missing: ${envValidation.missing.join(', ')}`);
}

// Create and configure the Express app
export async function createApp() {
  const app = express();

  // Security middleware with request size limits
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));

  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        log(logLine);
      }
    });

    next();
  });

  // Health monitoring endpoint for production
  app.get('/health', (req, res) => {
    const systemStatus = ProductionUtils.getSystemStatus();
    res.status(systemStatus.healthy ? 200 : 503).json(systemStatus);
  });

  // System info endpoint (secured for production)
  app.get('/api/system/status', (req, res) => {
    const status = ProductionUtils.getSystemStatus();
    const publicStatus = ProductionUtils.sanitizeForProduction(status);
    res.json(publicStatus);
  });

  // Register API routes
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error for monitoring
    logger.error(`${req.method} ${req.path} - ${message}`, {
      status,
      stack: ProductionUtils.getConfig().isProduction ? undefined : err.stack,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    // Don't expose stack traces in production
    const response = ProductionUtils.getConfig().isProduction
      ? { error: status >= 500 ? "Internal Server Error" : message }
      : { error: message, stack: err.stack };

    res.status(status).json(response);
  });

  // Setup Vite in development or serve static files in production
  // Skip this for Vercel serverless (static files served separately)
  if (!process.env.VERCEL) {
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
  }

  return { app, server };
}

// Start server if not in Vercel environment
if (!process.env.VERCEL && require.main === module) {
  (async () => {
    const { app, server } = await createApp();

    // ALWAYS serve the app on port 5000
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = 5000;
    server.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
    });
  })();
}

// Export initialized app for Vercel serverless function
let appInstance: express.Express | null = null;
let initError: Error | null = null;

export default async function handler(req: any, res: any) {
  try {
    // If previous initialization failed, try again
    if (!appInstance && !initError) {
      try {
        log('[Serverless] Initializing Express app');
        const { app } = await createApp();
        appInstance = app;
        log('[Serverless] Express app initialized successfully');
      } catch (error: any) {
        initError = error;
        logger.error('[Serverless] Failed to initialize app', error);

        // Return error response
        res.status(500).json({
          error: 'Server initialization failed',
          message: ProductionUtils.getConfig().isProduction
            ? 'Internal server error'
            : error.message
        });
        return;
      }
    }

    // If initialization previously failed, return error
    if (initError) {
      res.status(500).json({
        error: 'Server initialization failed',
        message: ProductionUtils.getConfig().isProduction
          ? 'Internal server error'
          : initError.message
      });
      return;
    }

    // Let Express handle the request
    return new Promise((resolve, reject) => {
      appInstance!(req, res, (err: any) => {
        if (err) {
          logger.error('[Serverless] Request handler error', err);
          reject(err);
        } else {
          resolve(undefined);
        }
      });
    });
  } catch (error: any) {
    logger.error('[Serverless] Unexpected error in handler', error);

    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal server error',
        message: ProductionUtils.getConfig().isProduction
          ? 'An unexpected error occurred'
          : error.message
      });
    }
  }
}
