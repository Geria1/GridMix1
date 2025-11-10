# GridMix Deployment Guide

This guide explains how to deploy the GridMix application with the backend on Render.com and the frontend on Vercel.

## Architecture

- **Frontend**: Static React app deployed on Vercel
- **Backend**: Node.js Express server deployed on Render.com
- **Database**: PostgreSQL on Neon (or other provider)

## Step 1: Deploy Backend to Render.com

### 1.1 Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account

### 1.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Geria1/GridMix1`
3. Configure the service:
   - **Name**: `gridmix-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `gridmixxx`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (512MB RAM)

### 1.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=your_neon_postgresql_url
SESSION_SECRET=generate_a_random_string_here
```

Optional API keys (if needed):
```
ELEXON_API_KEY=your_key
MAILCHIMP_API_KEY=your_key
```

### 1.4 Deploy
1. Click **"Create Web Service"**
2. Wait for the build to complete (3-5 minutes)
3. Copy your backend URL: `https://gridmix-backend.onrender.com`

**Note**: Free tier on Render spins down after 15 minutes of inactivity. First request after spin-down may take 30-60 seconds.

## Step 2: Configure Frontend for Production Backend

### 2.1 Add Environment Variable to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://gridmix-backend.onrender.com` (your Render backend URL)
   - **Environment**: Production

### 2.2 Redeploy Frontend
```bash
cd gridmixxx
git add .
git commit -m "Update frontend to use production backend"
git push origin main
```

Vercel will automatically redeploy with the new environment variable.

## Step 3: Verify Deployment

### Test Backend
```bash
curl https://gridmix-backend.onrender.com/api/bmrs/interconnectors?hours=1
```

You should see JSON data returned.

### Test Frontend
Visit `https://gridmixxx.vercel.app` and check:
1. Interconnector Flows chart loads with real data
2. No "demo data" message appears
3. Browser console shows no CORS or API errors

## Troubleshooting

### Backend Issues

**Build Fails**
- Check build logs in Render dashboard
- Ensure `package.json` has correct scripts
- Verify Node version compatibility

**500 Errors**
- Check application logs in Render dashboard
- Verify environment variables are set correctly
- Check database connection string

**Slow Cold Starts (Free Tier)**
- This is normal for Render's free tier
- Upgrade to paid tier for always-on service

### Frontend Issues

**API Calls Fail**
- Check VITE_BACKEND_URL is set in Vercel
- Verify backend URL is correct and accessible
- Check CORS configuration on backend

**Still Shows Demo Data**
- Redeploy frontend after setting environment variable
- Clear browser cache
- Check browser console for errors

## Alternative Deployment Platforms

### Railway.app
- Similar to Render
- Better performance on free tier
- Auto-deploy from GitHub

### Fly.io
- Global edge deployment
- Good for international users
- Slightly more complex setup

### Self-Hosted VPS
- DigitalOcean, Linode, AWS EC2
- Full control, more configuration needed
- Use PM2 for process management

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Environment variables configured on both platforms
- [ ] Database connection working
- [ ] API endpoints returning data
- [ ] Frontend connecting to backend
- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] Error monitoring setup (optional: Sentry)
- [ ] Backup strategy for database

## Monitoring

### Render Dashboard
- View application logs
- Monitor resource usage
- Check deployment history

### Vercel Dashboard
- View build logs
- Monitor function invocations
- Check bandwidth usage

## Cost Estimates

**Free Tier (Current Setup)**
- Render: Free (spins down after inactivity)
- Vercel: Free (hobby plan)
- Neon DB: Free tier (0.5GB storage)
- **Total: $0/month**

**Production Tier (Recommended)**
- Render: $7/month (always-on, 512MB RAM)
- Vercel: Free or $20/month (Pro features)
- Neon DB: Free or $19/month (more storage)
- **Total: $7-46/month**

## Support

If you encounter issues:
1. Check Render/Vercel logs
2. Review error messages in browser console
3. Test API endpoints directly with curl
4. Verify environment variables are set correctly
