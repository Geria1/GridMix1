// Vercel Serverless Function wrapper for Express app
// Import and run the built server, which returns the Express app

let handler;

export default async function(req, res) {
  // Lazy load and initialize the app only once
  if (!handler) {
    try {
      // Dynamic import of the built server
      const module = await import('../dist/index.js');
      handler = module.default;

      // If handler is still undefined, the server might not be exporting properly
      if (!handler) {
        console.error('Server module did not export an app');
        return res.status(500).json({ error: 'Server initialization failed' });
      }
    } catch (error) {
      console.error('Failed to initialize server:', error);
      return res.status(500).json({ error: 'Server initialization failed', message: error.message });
    }
  }

  // Forward the request to the Express app
  return handler(req, res);
}
