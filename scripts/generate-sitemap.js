#!/usr/bin/env node

/**
 * Generate sitemap.xml for gridmix.co.uk
 * Runs during build process to create an up-to-date sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://gridmix.co.uk';
const OUTPUT_PATH = path.join(__dirname, '../dist/public/sitemap.xml');

// Define all routes with their metadata
const routes = [
  { path: '/', changefreq: 'hourly', priority: 1.0, title: 'Home - Real-Time Energy Dashboard' },
  { path: '/dashboard', changefreq: 'hourly', priority: 0.9, title: 'Dashboard' },
  { path: '/forecast', changefreq: 'daily', priority: 0.8, title: 'Energy Forecast' },
  { path: '/projects', changefreq: 'weekly', priority: 0.7, title: 'UK Renewable Projects' },
  { path: '/carbon-footprint', changefreq: 'daily', priority: 0.8, title: 'Carbon Footprint Tracker' },
  { path: '/blog', changefreq: 'weekly', priority: 0.7, title: 'Energy Blog' },
  { path: '/about', changefreq: 'monthly', priority: 0.6, title: 'About GridMix' },
  { path: '/about-me', changefreq: 'monthly', priority: 0.5, title: 'About the Creator' },
  { path: '/alerts', changefreq: 'daily', priority: 0.6, title: 'Energy Alerts' },
  { path: '/privacy', changefreq: 'yearly', priority: 0.3, title: 'Privacy Policy' },
  { path: '/terms', changefreq: 'yearly', priority: 0.3, title: 'Terms of Service' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString();

  const urlEntries = routes
    .map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;

  // Ensure directory exists
  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write sitemap
  fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf8');

  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📍 Location: ${OUTPUT_PATH}`);
  console.log(`📄 ${routes.length} URLs included`);
  console.log(`🔗 Will be available at: ${SITE_URL}/sitemap.xml`);
}

// Run the generator
try {
  generateSitemap();
  process.exit(0);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
