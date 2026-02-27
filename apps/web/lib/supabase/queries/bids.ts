import { createSupabaseServerClient } from '../server';
import type { JobBid } from '@renonext/shared/types';

interface QueryResult<T> {
  data: T | null;
  error: string | null;
}

export async function createBid(
  bidData: Partial<JobBid>
): Promise<QueryResult<JobBid>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('job_bids')
    .insert(bidData)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as JobBid, error: null };
}

export async function fetchBidsForJob(
  jobId: string
): Promise<QueryResult<JobBid[]>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('job_bids')
    .select('*, pro:pro_profiles(*, profile:profiles(*))')
    .eq('job_id', jobId)
    .order('created_at', { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as JobBid[], error: null };
}

export async function fetchMyBids(
  proId: string
): Promise<QueryResult<JobBid[]>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('job_bids')
    .select('*, job:jobs(*, category:categories(*))')
    .eq('pro_id', proId)
    .order('created_at', { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as JobBid[], error: null };
}
