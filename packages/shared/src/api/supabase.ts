import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getEnvVar(name: string): string {
  // Support multiple env variable naming patterns across platforms
  const prefixes = ['EXPO_PUBLIC_', 'NEXT_PUBLIC_', 'VITE_', ''];
  for (const prefix of prefixes) {
    const key = `${prefix}${name}`;
    const value =
      typeof process !== 'undefined' && process.env
        ? process.env[key]
        : undefined;
    if (value) return value;
  }
  return '';
}

const supabaseUrl = getEnvVar('SUPABASE_URL');
const supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY');

const isServer = typeof window === 'undefined';

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      storage: isServer ? undefined : (typeof localStorage !== 'undefined' ? localStorage : undefined),
      autoRefreshToken: !isServer,
      persistSession: !isServer,
      detectSessionInUrl: !isServer,
    },
  }
);

export type { SupabaseClient };
