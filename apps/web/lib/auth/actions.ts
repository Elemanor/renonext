'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server';
import type { UserRole } from '@renonext/shared/types/user';

interface SignUpPayload {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  companyName?: string;
}

export async function signUpWithEmail({
  email,
  password,
  fullName,
  role,
  companyName,
}: SignUpPayload) {
  if (!isSupabaseConfigured()) return { error: 'Authentication service is not configured' };
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
        company_name: companyName || null,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is disabled, user is immediately active
  if (data.session) {
    return { success: true, confirmed: true };
  }

  // Email confirmation required
  return { success: true, confirmed: false };
}

export async function signInWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured()) return { error: 'Authentication service is not configured' };
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect('/');
}

export async function resetPassword(email: string) {
  if (!isSupabaseConfigured()) return { error: 'Authentication service is not configured' };
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/dashboard/settings`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
