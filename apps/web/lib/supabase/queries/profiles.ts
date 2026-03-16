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

export async function fetchProsByCategory(categorySlug: string) {
  const supabase = await createSupabaseServerClient();

  // Look up category by slug
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', categorySlug)
    .single();

  if (catError || !category) {
    return { data: [], error: catError?.message || 'Category not found' };
  }

  // Find pro_profile_ids in this category
  const { data: proCats } = await supabase
    .from('pro_categories')
    .select('pro_profile_id')
    .eq('category_id', category.id);

  const proIds = (proCats || []).map((pc: any) => pc.pro_profile_id);
  if (proIds.length === 0) {
    return { data: [], error: null };
  }

  // Fetch approved pro profiles
  const { data: pros, error: proError } = await supabase
    .from('pro_profiles')
    .select('*, profile:profiles!user_id(*)')
    .in('id', proIds)
    .eq('application_status', 'approved')
    .order('avg_rating', { ascending: false });

  if (proError) {
    return { data: [], error: proError.message };
  }

  // Fetch categories and gallery for these pros
  const approvedIds = (pros || []).map((p: any) => p.id);
  if (approvedIds.length === 0) {
    return { data: [], error: null };
  }

  const [{ data: allCategories }, { data: allGallery }] = await Promise.all([
    supabase
      .from('pro_categories')
      .select('pro_profile_id, category:categories(name)')
      .in('pro_profile_id', approvedIds),
    supabase
      .from('pro_gallery')
      .select('pro_profile_id, image_url')
      .in('pro_profile_id', approvedIds)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false }),
  ]);

  // Group categories by pro
  const catsByPro = new Map<string, string[]>();
  for (const row of allCategories || []) {
    const cats = catsByPro.get(row.pro_profile_id) || [];
    if ((row as any).category?.name) cats.push((row as any).category.name);
    catsByPro.set(row.pro_profile_id, cats);
  }

  // Group photos by pro (max 3)
  const photosByPro = new Map<string, string[]>();
  for (const row of allGallery || []) {
    const photos = photosByPro.get(row.pro_profile_id) || [];
    if (photos.length < 3) photos.push(row.image_url);
    photosByPro.set(row.pro_profile_id, photos);
  }

  const mapped = (pros || []).map((pro: any) => ({
    id: pro.id,
    company: pro.profile?.full_name || 'Unknown',
    trade: catsByPro.get(pro.id)?.join(' & ') || 'General Contractor',
    location: [pro.city, pro.province].filter(Boolean).join(', ') || 'Ontario',
    rating: Number(pro.avg_rating) || 0,
    reviewCount: pro.total_reviews || 0,
    projectCount: pro.total_jobs_completed || 0,
    wsib: pro.wsib_status === 'active',
    insured: !!pro.insurance_policy_number,
    verified: pro.profile?.is_verified || false,
    photos: photosByPro.get(pro.id) || [],
    yearsExperience: pro.years_experience || 0,
  }));

  return { data: mapped, error: null };
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
