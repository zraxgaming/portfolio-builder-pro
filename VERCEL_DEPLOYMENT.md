# Vercel Deployment Guide

This portfolio builder project is now configured for deployment on Vercel.

## What Changed

The following modifications were made to enable Vercel deployment:

### Configuration Files
- **Vercel.json** - Updated with proper build and output settings
- **package.json** - Added `@vercel/node` dependency for serverless functions
- **.vercelignore** - Created to exclude unnecessary files from deployment

### Server Code
- **api/handler.ts** - Created a Vercel serverless function that handles all requests
  - Acts as the main server entry point for the full-stack application
  - Routes all requests through TanStack Start's SSR handler
  - Manages error handling and response formatting for Vercel

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `Vercel.json`

3. **Environment Variables** (if needed)
   - Add any required environment variables in the Vercel dashboard
   - Project Settings → Environment Variables

4. **Deploy**
   - Vercel will automatically deploy on push to main
   - Or click "Deploy" in the dashboard

## How It Works

- **Static Assets**: Built client files (`dist/client/`) are served directly from Vercel's edge
- **Dynamic Content**: All requests route through `api/handler.ts`
- **Server-Side Rendering**: TanStack Start handles SSR for your portfolio pages
- **API Routes**: Any server functions will be handled by the same handler

## Local Testing

To test the Vercel setup locally:

```bash
npm run build
npm run preview
```

This builds the project and previews it locally, simulating the production environment.

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check Node version matches project requirements
- Review build logs in Vercel dashboard

### Runtime Errors
- Check Vercel function logs in the dashboard
- Verify environment variables are set correctly
- Ensure APIs and resources are accessible from Vercel's servers

### Cold Start Issues
- Vercel serverless functions may have cold start delays
- This is normal and typically improves with usage
- Consider using Vercel's "Standby" feature for critical functions

## Reverting to Original Setup

If you need to go back to Cloudflare Workers, the original `wrangler.jsonc` is preserved in the .vercelignore file.

To redeploy to Cloudflare Workers instead:
```bash
npm install -g wrangler
wrangler deploy
```
