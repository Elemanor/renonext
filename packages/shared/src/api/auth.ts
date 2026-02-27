import { supabase } from './supabase';
import type { UserRole } from '../types/user';

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: UserRole
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
      },
    },
  });

  if (authError) throw authError;

  if (authData.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      role,
      is_verified: false,
    });

    if (profileError) throw profileError;

    if (role === 'pro') {
      const { error: proError } = await supabase.from('pro_profiles').insert({
        user_id: authData.user.id,
        province: 'ON',
        service_radius_km: 25,
        is_available: false,
        avg_rating: 0,
        total_reviews: 0,
        total_jobs_completed: 0,
        current_status: 'offline',
        id_verified: false,
        background_check_passed: false,
      });
      if (proError) throw proError;
    } else if (role === 'client') {
      const { error: clientError } = await supabase
        .from('client_profiles')
        .insert({
          user_id: authData.user.id,
          total_jobs_posted: 0,
        });
      if (clientError) throw clientError;
    }
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback`
        : undefined,
    },
  });
  if (error) throw error;
  return data;
}

export async function signInWithApple() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback`
        : undefined,
    },
  });
  if (error) throw error;
  return data;
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: typeof window !== 'undefined'
      ? `${window.location.origin}/auth/reset-password`
      : undefined,
  });
  if (error) throw error;
  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  return data;
}
