import { createSupabaseServerClient } from '../server';
import type { ProWithProfile } from '@renonext/shared/types';

interface QueryResult<T> {
  data: T | null;
  error: string | null;
}

interface DirectoryFilters {
  city?: string;
  category_id?: string;
  is_available?: boolean;
}

export async function fetchProProfile(
  userId: string
): Promise<QueryResult<ProWithProfile>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('pro_profiles')
    .select('*, profile:profiles!user_id(*)')
    .eq('user_id', userId)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as ProWithProfile, error: null };
}

export async function fetchProById(
  proId: string
): Promise<QueryResult<ProWithProfile>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('pro_profiles')
    .select('*, profile:profiles!user_id(*)')
    .eq('id', proId)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as ProWithProfile, error: null };
}

export async function fetchProDirectory(
  filters?: DirectoryFilters
): Promise<QueryResult<ProWithProfile[]>> {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from('pro_profiles')
    .select('*, profile:profiles!user_id(*)')
    .eq('is_available', true)
    .order('avg_rating', { ascending: false });

  if (filters?.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as ProWithProfile[], error: null };
}
