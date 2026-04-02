import type { Metadata } from 'next';
import { fetchProDirectory } from '@/lib/supabase/queries/profiles';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ProsBrowserClient } from './pros-client';

export const metadata: Metadata = {
  title: 'Browse Verified Pros | RenoNext',
  description: 'Find verified contractors with GPS-tagged proof, real ratings, and escrow protection.',
  alternates: {
    canonical: '/pros',
  },
};

export default async function BrowseProsPage() {
  const { data: pros } = await fetchProDirectory();
  const supabase = await createSupabaseServerClient();

  // Fetch categories and gallery for all pros in parallel
  const proIds = (pros || []).map((p: any) => p.id);

  const [{ data: allCategories }, { data: allGallery }] = await Promise.all([
    supabase
      .from('pro_categories')
      .select('pro_profile_id, category:categories(name)')
      .in('pro_profile_id', proIds.length > 0 ? proIds : ['_none_']),
    supabase
      .from('pro_gallery')
      .select('pro_profile_id, image_url')
      .in('pro_profile_id', proIds.length > 0 ? proIds : ['_none_'])
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false }),
  ]);

  // Group by pro ID
  const catsByPro = new Map<string, string[]>();
  for (const row of allCategories || []) {
    const cats = catsByPro.get(row.pro_profile_id) || [];
    if ((row as any).category?.name) cats.push((row as any).category.name);
    catsByPro.set(row.pro_profile_id, cats);
  }

  const photosByPro = new Map<string, string[]>();
  for (const row of allGallery || []) {
    const photos = photosByPro.get(row.pro_profile_id) || [];
    if (photos.length < 3) photos.push(row.image_url);
    photosByPro.set(row.pro_profile_id, photos);
  }

  // Map DB records to client card interface
  const contractors = (pros || []).map((pro: any) => ({
    id: pro.id,
    slug: pro.id,
    company: pro.profile?.full_name || 'Unknown',
    trade: catsByPro.get(pro.id)?.join(' & ') || 'General Contractor',
    location: [pro.city, pro.province].filter(Boolean).join(', ') || 'Ontario',
    rating: Number(pro.avg_rating) || 0,
    reviewCount: pro.total_reviews || 0,
    projectCount: pro.total_jobs_completed || 0,
    proofCompleteness: 0,
    inspectionPassRate: 0,
    disputeCount: 0,
    lastJobDays: 0,
    wsib: pro.wsib_status === 'active',
    insured: !!pro.insurance_policy_number,
    verified: pro.profile?.is_verified || false,
    photos: photosByPro.get(pro.id) || [],
  }));

  return <ProsBrowserClient contractors={contractors} />;
}
