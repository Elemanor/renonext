import { createClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client for server-only operations (webhooks, admin tasks).
 * NEVER expose this on the client — bypasses RLS.
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder',
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
