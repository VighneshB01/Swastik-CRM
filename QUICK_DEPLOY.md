# Quick Deploy to Vercel - Swastik CRM

## 🚀 Fast Track Deployment

### 1. Go to Vercel
Visit: https://vercel.com/new

### 2. Import Your Repository
- Click "Import Git Repository"
- Select: `VighneshB01/Swastik-CRM`
- Click "Import"

### 3. Add Environment Variables
Click "Environment Variables" and add:

```
VITE_SUPABASE_URL=https://xbspnjtvatcfpdazmasd.supabase.co
VITE_SB_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhic3BuanR2YXRjZnBkYXptYXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDE3OTMsImV4cCI6MjA4ODIxNzc5M30.c8okeXxiV29C-13NQjBWraoHRsjQzDzlVJOL0UdUS0o
VITE_IS_DEMO=false
```

### 4. Deploy
Click "Deploy" and wait 2-3 minutes

### 5. Update Supabase
After deployment:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel URL to Site URL and Redirect URLs

### 6. Done! 🎉
Your CRM is live at: `https://your-app.vercel.app`

---

For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
