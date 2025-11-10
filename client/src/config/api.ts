/**
 * API Configuration
 *
 * This file centralizes API endpoint configuration.
 * Update the BACKEND_URL when deploying to production.
 */

// Backend API URL - update this after deploying to Render
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

/**
 * Get the full API URL for a given endpoint
 * @param endpoint - API endpoint path (e.g., '/api/energy/current')
 * @returns Full URL to the API endpoint
 */
export function getApiUrl(endpoint: string): string {
  // If BACKEND_URL is set, use it; otherwise use relative paths (same domain)
  if (BACKEND_URL) {
    return `${BACKEND_URL}${endpoint}`;
  }
  return endpoint;
}
