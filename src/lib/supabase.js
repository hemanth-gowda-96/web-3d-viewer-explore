import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = supabaseUrl && supabaseUrl !== 'YOUR_URL' && supabaseAnonKey && supabaseAnonKey !== 'YOUR_KEY';

if (!isConfigured) {
    console.warn("Supabase credentials are missing or default! Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.")
}

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            getSession: async () => ({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: async () => ({ error: new Error('Supabase is not configured.') }),
            signOut: async () => ({ error: null })
        }
    };
