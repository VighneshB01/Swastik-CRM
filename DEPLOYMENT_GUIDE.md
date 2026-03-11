# Swastik CRM - Deployment Guide

## Your Supabase Configuration ✅

Your production Supabase credentials have been configured:
- **URL**: https://xbspnjtvatcfpdazmasd.supabase.co
- **API Key**: Configured in `.env.production.local`

## Step-by-Step Deployment

### 1. Set Up Database Schema

First, you need to push your database migrations to your Supabase project:

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
npx supabase login

# Link to your remote project
npx supabase link --project-ref xbspnjtvatcfpdazmasd

# Push all migrations to create tables, views, triggers, etc.
npx supabase db push
```

This will create all the necessary tables:
- contacts
- companies
- deals
- tasks
- notes (contact_notes, deal_notes)
- sales (users)
- tags

### 2. Deploy Edge Functions

Deploy the backend functions to Supabase:

```bash
# Deploy all edge functions
npx supabase functions deploy users
npx supabase functions deploy postmark
npx supabase functions deploy merge_contacts
npx supabase functions deploy update_password
npx supabase functions deploy delete_note_attachments
```

### 3. Configure Storage

Set up the attachments bucket in Supabase:

1. Go to https://supabase.com/dashboard/project/xbspnjtvatcfpdazmasd/storage/buckets
2. Create a new bucket named `attachments`
3. Set it to **public** (or configure RLS policies)

### 4. Build for Production

```bash
# Build the frontend
npm run build
```

This creates a `dist/` folder with your production-ready app.

### 5. Deploy Frontend

#### Option A: GitHub Pages (Free)

```bash
# Deploy to GitHub Pages
npm run ghpages:deploy
```

Your app will be available at: `https://your-username.github.io/swastik-crm/`

#### Option B: Netlify (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist/` folder
3. Or connect your GitHub repo for auto-deployment

#### Option C: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect Vite and deploy

#### Option D: Your Own Server

Upload the `dist/` folder to any web server (Apache, Nginx, etc.)

### 6. Configure Authentication (Optional)

#### Email/Password (Already Enabled)
No additional setup needed!

#### Google OAuth (Optional)
1. Go to https://console.cloud.google.com
2. Create OAuth 2.0 credentials
3. Add to Supabase: Dashboard → Authentication → Providers → Google
4. Add your client ID and secret

#### Azure AD (Optional)
1. Go to Azure Portal
2. Register an application
3. Add to Supabase: Dashboard → Authentication → Providers → Azure

### 7. Configure Inbound Email (Optional)

If you want the email capture feature:

1. Sign up at [Postmark](https://postmarkapp.com/)
2. Set up an inbound email stream
3. Configure webhook URL: `https://xbspnjtvatcfpdazmasd.supabase.co/functions/v1/postmark`
4. Update your production env:
   ```bash
   # Add to .env.production.local
   VITE_INBOUND_EMAIL=your-inbound-email@inbound.postmarkapp.com
   ```

### 8. Test Your Deployment

1. Visit your deployed URL
2. Create the first admin user
3. Import sample data from `test-data/contacts.csv`
4. Test all features:
   - Create contacts
   - Add companies
   - Create deals
   - Add tasks and notes
   - Test authentication

## Environment Variables Summary

### Development (Local Supabase)
Uses `.env.development` - already configured for local Docker instance

### Production (Your Supabase)
Uses `.env.production.local` - already configured with your credentials:
```
VITE_SUPABASE_URL=https://xbspnjtvatcfpdazmasd.supabase.co
VITE_SB_PUBLISHABLE_KEY=sb_publishable_q3pN_RvIwHGQqv4FcLVrww_ga1Gp5T9
```

## Quick Commands Reference

```bash
# Development
npm run dev                    # Start local dev server
npx supabase start            # Start local Supabase (Docker)
npx supabase stop             # Stop local Supabase

# Database
npx supabase db push          # Push migrations to remote
npx supabase db pull          # Pull schema from remote
npx supabase db reset         # Reset local database

# Production
npm run build                 # Build for production
npm run preview               # Preview production build locally
npm run ghpages:deploy        # Deploy to GitHub Pages

# Testing
npm run test                  # Run tests
npm run typecheck             # Check TypeScript
npm run lint                  # Check code quality
```

## Troubleshooting

### Database Connection Issues
- Verify your Supabase project is active
- Check that migrations were pushed successfully
- Ensure RLS policies are configured (migrations handle this)

### Authentication Issues
- Check Supabase Dashboard → Authentication → URL Configuration
- Add your deployment URL to allowed redirect URLs
- Format: `https://your-domain.com/**`

### Storage Issues
- Verify `attachments` bucket exists
- Check bucket is public or has proper RLS policies
- Test file upload in Supabase dashboard first

## Security Checklist

✅ Environment variables are in `.gitignore`
✅ API keys are in `.env.production.local` (not committed)
✅ RLS (Row Level Security) policies are enabled via migrations
✅ Edge functions verify JWT tokens
✅ CORS is configured in Supabase

## Next Steps

1. ✅ Database setup: `npx supabase db push`
2. ✅ Deploy edge functions: `npx supabase functions deploy`
3. ✅ Build frontend: `npm run build`
4. ✅ Deploy to hosting platform
5. ✅ Create first admin user
6. ✅ Import sample data
7. ✅ Customize branding and features

Your Swastik CRM is ready to deploy! 🚀
