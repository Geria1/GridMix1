# GridMix Vercel Deployment Guide

This guide will help you deploy the complete GridMix application (frontend + backend) to Vercel using serverless functions.

## Architecture

- **Frontend**: Static React app served from `dist/public/`
- **Backend**: Serverless function at `/api` endpoint
- **Database**: PostgreSQL on Neon (or other provider)

## Prerequisites

1. A Vercel account (free tier is fine)
2. A Neon PostgreSQL database (or other PostgreSQL provider)
3. Your project pushed to GitHub

## Deployment Steps

### Step 1: Connect Repository to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository: `Geria1/GridMix1`
4. Select the root directory or configure it to use `gridmixxx` as the root

### Step 2: Configure Build Settings

Vercel should auto-detect settings from `vercel.json`, but verify:

- **Framework Preset**: Other
- **Root Directory**: `gridmixxx` (if your repo has multiple folders)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel project dashboard, go to **Settings** → **Environment Variables** and add the following:

#### Required Variables

```
NODE_ENV=production
DATABASE_URL=your_neon_postgresql_connection_string
SESSION_SECRET=your_random_secret_here
```

**How to generate SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use this random string:
```
4f8a2c6b9d3e1f7a5c8b2d4e6f8a1c3b5d7e9f1a3c5b7d9e1f3a5c7b9d1e3f5a
```

#### Optional Variables (if you have API keys)

```
BMRS_API_KEY=your_bmrs_api_key_if_available
MAILCHIMP_API_KEY=your_mailchimp_key_if_available
```

**Important**: Make sure to select **"Production"** environment for all variables (you can also add them to Preview and Development if needed).

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Vercel will provide you with a URL like: `https://gridmixxx.vercel.app`

### Step 5: Verify Deployment

#### Test the Backend API

Open your browser or use curl to test:

```bash
curl https://your-project.vercel.app/api/health
```

You should see a JSON response with system status.

#### Test a Data Endpoint

```bash
curl https://your-project.vercel.app/api/bmrs/interconnectors?hours=1
```

You should see JSON data returned (not demo data).

#### Test the Frontend

1. Visit `https://your-project.vercel.app`
2. Check that the Interconnector Flows chart loads with real data
3. Open browser DevTools → Console and verify no errors
4. Check that data is being fetched from `/api/` endpoints

## Current Configuration

Your project is already configured for Vercel deployment:

✅ **vercel.json**: Configured with proper headers, redirects, and API rewrites
✅ **api/index.js**: Serverless function wrapper for Express backend
✅ **Build script**: Builds both frontend and backend correctly
✅ **Output directory**: Correctly set to `dist/public`

## Troubleshooting

### Issue: "500 Internal Server Error" on API calls

**Solutions:**
1. Check Vercel function logs in Dashboard → Deployments → [Your deployment] → Functions
2. Verify environment variables are set correctly
3. Ensure `DATABASE_URL` is valid and accessible
4. Check that the database connection string includes `?sslmode=require` for Neon

### Issue: "Function timeout"

**Cause**: Vercel serverless functions have a 10-second timeout on free tier
**Solutions:**
1. Optimize slow database queries
2. Add caching for frequently accessed data
3. Upgrade to Vercel Pro for 60-second timeout

### Issue: "Module not found" errors

**Solutions:**
1. Ensure all dependencies are in `dependencies` (not `devDependencies`)
2. Clear Vercel cache and redeploy
3. Check that `package.json` has all required packages

### Issue: Database connection fails

**Solutions:**
1. Verify `DATABASE_URL` format: `postgresql://user:password@host.neon.tech/database?sslmode=require`
2. Check that your Neon database is accessible from external connections
3. Verify the database user has proper permissions

### Issue: Frontend shows demo data

**Causes:**
- API endpoints are not responding
- CORS issues (shouldn't happen on same domain)
- Frontend not finding the API

**Solutions:**
1. Open browser DevTools → Network tab
2. Check if API calls are being made to `/api/*`
3. Verify API responses are not errors
4. Check Console for JavaScript errors

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `SESSION_SECRET` | Yes | Secret for session encryption | Generate with crypto |
| `BMRS_API_KEY` | No | Elexon BMRS API key | Get from Elexon portal |
| `MAILCHIMP_API_KEY` | No | Mailchimp API key | Get from Mailchimp |

## Performance Optimization

### Vercel Free Tier Limits

- **Bandwidth**: 100 GB/month
- **Function Execution**: 100 GB-hours/month
- **Function Duration**: 10 seconds max
- **Deployments**: Unlimited

### Tips for Staying Within Limits

1. **Enable caching** for API responses
2. **Optimize images** (already done via Vite)
3. **Use CDN caching** for static assets (automatic)
4. **Monitor usage** in Vercel dashboard

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you open a pull request

To manually redeploy:
1. Go to Vercel Dashboard → Deployments
2. Click on the three dots → Redeploy

## Custom Domain (Optional)

To use your own domain:

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `gridmix.co.uk`)
3. Configure DNS records as instructed by Vercel
4. Wait for DNS propagation (up to 48 hours)

## Monitoring and Logs

### View Function Logs

1. Go to Vercel Dashboard
2. Select your project
3. Go to Deployments → [Select deployment] → Functions
4. Click on the function to see logs

### View Build Logs

1. Go to Deployments
2. Click on any deployment
3. View the build output and errors

## Cost Estimate

**Free Tier (Current Setup)**
- Vercel: Free (Hobby plan)
- Neon DB: Free tier (0.5GB storage)
- **Total: $0/month**

**Recommended for Production**
- Vercel Pro: $20/month (longer function timeout, more bandwidth)
- Neon DB: $19/month (more storage, better performance)
- **Total: $39/month**

## Next Steps

1. ✅ Build completed successfully
2. 🔄 Push to GitHub
3. 🚀 Deploy to Vercel
4. ⚙️ Set environment variables
5. ✅ Test deployment
6. 🎉 Go live!

## Support

If you encounter issues:
1. Check Vercel function logs
2. Review error messages in browser console
3. Test API endpoints directly with curl
4. Verify all environment variables are set correctly
5. Check Vercel status page: https://www.vercel-status.com/

## API Endpoints

Your backend provides these endpoints:

- `GET /health` - Health check endpoint
- `GET /api/system/status` - System status
- `GET /api/bmrs/interconnectors` - Interconnector data
- And all other routes defined in your Express app

All API calls should be made to `/api/*` and Vercel will route them to the serverless function automatically.
