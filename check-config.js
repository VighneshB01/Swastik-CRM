// Quick script to verify environment variables are loaded
console.log('=== Swastik CRM Configuration Check ===');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SB_PUBLISHABLE_KEY:', import.meta.env.VITE_SB_PUBLISHABLE_KEY ? 'SET (length: ' + import.meta.env.VITE_SB_PUBLISHABLE_KEY.length + ')' : 'NOT SET');
console.log('Expected URL: https://xbspnjtvatcfpdazmasd.supabase.co');
console.log('Is correct?', import.meta.env.VITE_SUPABASE_URL === 'https://xbspnjtvatcfpdazmasd.supabase.co');
