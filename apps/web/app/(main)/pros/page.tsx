import type { Metadata } from 'next';
import { fetchProDirectory } from '@/lib/supabase/queries/profiles';
import { ProsBrowserClient } from './pros-client';

export const metadata: Metadata = {
  title: 'Browse Verified Pros | RenoNext',
  description: 'Find verified contractors with GPS-tagged proof, real ratings, and escrow protection.',
};

export default async function BrowseProsPage() {
  const { data: pros } = await fetchProDirectory();

  // Map DB records to client card interface
  const contractors = (pros || []).map((pro: any) => ({
    id: pro.id,
    slug: pro.id,
    company: pro.profile?.full_name || 'Unknown',
    trade: 'General Contractor', // Will be enhanced when categories are joined
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
    photos: [] as string[],
  }));

  return <ProsBrowserClient contractors={contractors} />;
}
