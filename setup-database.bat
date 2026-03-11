@echo off
REM Swastik CRM - Database Setup Script (Windows)
REM This script will set up your Supabase database

echo.
echo 🚀 Setting up Swastik CRM Database...
echo.

REM Check if Supabase CLI is installed
where supabase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Supabase CLI not found. Installing...
    call npm install -g supabase
)

echo ✅ Supabase CLI ready
echo.

REM Login to Supabase
echo 📝 Please login to Supabase...
call npx supabase login

echo.
echo 🔗 Linking to your Supabase project...
call npx supabase link --project-ref xbspnjtvatcfpdazmasd

echo.
echo 📊 Pushing database migrations...
call npx supabase db push

echo.
echo ⚡ Deploying edge functions...
call npx supabase functions deploy users
call npx supabase functions deploy postmark
call npx supabase functions deploy merge_contacts
call npx supabase functions deploy update_password
call npx supabase functions deploy delete_note_attachments

echo.
echo ✅ Database setup complete!
echo.
echo Next steps:
echo 1. Create 'attachments' bucket in Supabase Storage
echo 2. Run 'npm run build' to build the frontend
echo 3. Deploy the dist/ folder to your hosting
echo.
echo Visit: https://supabase.com/dashboard/project/xbspnjtvatcfpdazmasd
echo.
pause
