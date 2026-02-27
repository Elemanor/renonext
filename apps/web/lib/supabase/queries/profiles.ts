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
    .eq('application_status', 'approved')
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

export async function fetchProByIdWithDetails(proId: string) {
  const supabase = await createSupabaseServerClient();

  // Fetch pro profile with profile join
  const { data: pro, error: proError } = await supabase
    .from('pro_profiles')
    .select('*, profile:profiles!user_id(*)')
    .eq('id', proId)
    .eq('application_status', 'approved')
    .single();

  if (proError || !pro) {
    return { data: null, error: proError?.message || 'Not found' };
  }

  // Fetch categories
  const { data: categories } = await supabase
    .from('pro_categories')
    .select('*, category:categories(*)')
    .eq('pro_profile_id', proId);

  // Fetch gallery
  const { data: gallery } = await supabase
    .from('pro_gallery')
    .select('*')
    .eq('pro_profile_id', proId)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  // Fetch reviews (reviewee_id = pro's user_id)
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, reviewer:profiles!reviewer_id(full_name, avatar_url), job:jobs!job_id(title)')
    .eq('reviewee_id', pro.user_id)
    .order('created_at', { ascending: false });

  return {
    data: {
      ...pro,
      categories: categories || [],
      gallery: gallery || [],
      reviews: reviews || [],
    },
    error: null,
  };
}

export async function fetchProReviews(proUserId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('reviews')
    .select('*, reviewer:profiles!reviewer_id(full_name, avatar_url), job:jobs!job_id(title)')
    .eq('reviewee_id', proUserId)
    .order('created_at', { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data || [], error: null };
}
