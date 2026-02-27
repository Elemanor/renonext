import { supabase } from './supabase';
import type { JobBid, BidStatus } from '../types/job';

export async function createBid(data: {
  job_id: string;
  pro_id: string;
  amount: number;
  estimated_hours: number;
  message?: string;
  proposed_date?: string;
  proposed_time_start?: string;
  proposed_time_end?: string;
  includes_materials?: boolean;
  material_cost?: number;
}): Promise<JobBid> {
  const { data: bid, error } = await supabase
    .from('job_bids')
    .insert({
      ...data,
      status: 'pending' as BidStatus,
      includes_materials: data.includes_materials ?? false,
      material_cost: data.material_cost ?? null,
    })
    .select(
      `
      *,
      pro:pro_profiles(
        *,
        profile:profiles(*)
      )
    `
    )
    .single();
  if (error) throw error;
  return bid as JobBid;
}

export async function getBidsForJob(jobId: string): Promise<JobBid[]> {
  const { data, error } = await supabase
    .from('job_bids')
    .select(
      `
      *,
      pro:pro_profiles(
        *,
        profile:profiles(*)
      )
    `
    )
    .eq('job_id', jobId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as JobBid[];
}

export async function getMyBids(proId: string): Promise<JobBid[]> {
  const { data, error } = await supabase
    .from('job_bids')
    .select(
      `
      *,
      job:jobs(
        *,
        category:categories(*),
        client:profiles!jobs_client_id_fkey(*)
      )
    `
    )
    .eq('pro_id', proId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as JobBid[];
}

export async function acceptBid(
  bidId: string,
  jobId: string
): Promise<JobBid> {
  // Reject all other bids for this job
  const { error: rejectError } = await supabase
    .from('job_bids')
    .update({
      status: 'rejected' as BidStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('job_id', jobId)
    .neq('id', bidId)
    .eq('status', 'pending');
  if (rejectError) throw rejectError;

  // Accept the chosen bid
  const { data: bid, error: acceptError } = await supabase
    .from('job_bids')
    .update({
      status: 'accepted' as BidStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bidId)
    .select(
      `
      *,
      pro:pro_profiles(
        *,
        profile:profiles(*)
      )
    `
    )
    .single();
  if (acceptError) throw acceptError;

  // Update the job with accepted bid info
  const totalCost = bid.amount + (bid.material_cost ?? 0);
  const { error: jobError } = await supabase
    .from('jobs')
    .update({
      status: 'accepted',
      accepted_bid_id: bidId,
      assigned_pro_id: bid.pro_id,
      total_cost: totalCost,
      updated_at: new Date().toISOString(),
    })
    .eq('id', jobId);
  if (jobError) throw jobError;

  return bid as JobBid;
}

export async function rejectBid(bidId: string): Promise<JobBid> {
  const { data, error } = await supabase
    .from('job_bids')
    .update({
      status: 'rejected' as BidStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bidId)
    .select()
    .single();
  if (error) throw error;
  return data as JobBid;
}

export async function withdrawBid(bidId: string): Promise<JobBid> {
  const { data, error } = await supabase
    .from('job_bids')
    .update({
      status: 'withdrawn' as BidStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bidId)
    .select()
    .single();
  if (error) throw error;
  return data as JobBid;
}
