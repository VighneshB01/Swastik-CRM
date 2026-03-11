# Deploying Swastik CRM to Vercel

This guide will help you deploy Swastik CRM to Vercel.

## Prerequisites

1. A GitHub account with the repository pushed
2. A Vercel account (sign up at https://vercel.com)
3. A Supabase project (the one configured in `.env.development`)

## Step 1: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository: `VighneshB01/Swastik-CRM`
4. Click "Import"

## Step 2: Configure Build Settings

Vercel should auto-detect the Vite framework. Verify these settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Step 3: Add Environment Variables

In the Vercel project settings, add these environment variables:

### Required Variables

```
VITE_SUPABASE_URL=https://xbspnjtvatcfpdazmasd.supabase.co
VITE_SB_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhic3BuanR2YXRjZnBkYXptYXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDE3OTMsImV4cCI6MjA4ODIxNzc5M30.c8okeXxiV29C-13NQjBWraoHRsjQzDzlVJOL0UdUS0o
VITE_IS_DEMO=false
```

### Optional Variables

```
VITE_INBOUND_EMAIL=your_postmark_inbound_email
```

**Note**: Use your actual Supabase project URL and anon key from your Supabase dashboard.

## Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll get a URL like `https://swastik-crm.vercel.app`

## Step 5: Configure Supabase Redirect URLs

After deployment, update your Supabase project settings:

1. Go to your Supabase Dashboard
2. Navigate to Authentication → URL Configuration
3. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: Add `https://your-app.vercel.app/**`

## Step 6: Test the Deployment

1. Visit your Vercel URL
2. Try logging in with your Supabase credentials
3. Test creating a contact, task, or deal

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Authentication Issues

- Verify Supabase URL and keys are correct
- Check that redirect URLs are configured in Supabase
- Ensure the Supabase project is not paused

### Environment Variables Not Working

- Make sure variable names start with `VITE_`
- Redeploy after adding/changing environment variables
- Check that variables are set for the correct environment (Production)

## Custom Domain (Optional)

To use a custom domain:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update Supabase redirect URLs with your custom domain

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to the `main` branch
- **Preview**: When you create a pull request

Every commit triggers a new deployment with a unique preview URL.

## Next Steps

- Set up your Supabase database with migrations
- Configure email templates in Supabase
- Set up Postmark for inbound email (optional)
- Invite team members to your CRM

## Support

For issues specific to:
- **Vercel**: https://vercel.com/docs
- **Supabase**: https://supabase.com/docs
- **Swastik CRM**: Check the main README.md
