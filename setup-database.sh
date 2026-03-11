#!/bin/bash

# Swastik CRM - Database Setup Script
# This script will set up your Supabase database

echo "🚀 Setting up Swastik CRM Database..."
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null
then
    echo "❌ Supabase CLI not found. Installing..."
    npm install -g supabase
fi

echo "✅ Supabase CLI ready"
echo ""

# Login to Supabase
echo "📝 Please login to Supabase..."
npx supabase login

echo ""
echo "🔗 Linking to your Supabase project..."
npx supabase link --project-ref xbspnjtvatcfpdazmasd

echo ""
echo "📊 Pushing database migrations..."
npx supabase db push

echo ""
echo "⚡ Deploying edge functions..."
npx supabase functions deploy users
npx supabase functions deploy postmark
npx supabase functions deploy merge_contacts
npx supabase functions deploy update_password
npx supabase functions deploy delete_note_attachments

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Create 'attachments' bucket in Supabase Storage"
echo "2. Run 'npm run build' to build the frontend"
echo "3. Deploy the dist/ folder to your hosting"
echo ""
echo "Visit: https://supabase.com/dashboard/project/xbspnjtvatcfpdazmasd"
