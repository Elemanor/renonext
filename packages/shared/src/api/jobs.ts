import { supabase } from './supabase';
import type { Job, JobStatus, JobProgress, ProgressUpdateType } from '../types/job';
import { PLATFORM_FEE_PERCENT } from '../constants/config';

export async function createJob(
  data: Omit<
    Job,
    | 'id'
    | 'status'
    | 'accepted_bid_id'
    | 'assigned_pro_id'
    | 'started_at'
    | 'completed_at'
    | 'cancelled_at'
    | 'cancellation_reason'
    | 'total_cost'
    | 'platform_fee'
    | 'pro_payout'
    | 'created_at'
    | 'updated_at'
    | 'category'
    | 'client'
    | 'assigned_pro'
    | 'bids'
    | 'progress'
  >
): Promise<Job> {
  const { data: job, error } = await supabase
    .from('jobs')
    .insert({ ...data, status: 'posted' as JobStatus })
    .select(
      `
      *,
      category:categories(*),
      client:profiles!jobs_client_id_fkey(*)
    `
    )
    .single();
  if (error) throw error;
  return job as Job;
}

export async function getJob(id: string): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .select(
      `
      *,
      category:categories(*),
      client:profiles!jobs_client_id_fkey(*),
      assigned_pro:pro_profiles!jobs_assigned_pro_id_fkey(
        *,
        profile:profiles(*)
      ),
      bids:job_bids(
        *,
        pro:pro_profiles(
          *,
          profile:profiles(*)
        )
      ),
      progress:job_progress(*)
    `
    )
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Job;
}

export async function updateJob(
  id: string,
  updates: Partial<
    Pick<
      Job,
      | 'title'
      | 'description'
      | 'status'
      | 'scheduled_date'
      | 'scheduled_time_start'
      | 'scheduled_time_end'
      | 'is_urgent'
      | 'details'
      | 'photos'
      | 'cancellation_reason'
    >
  >
): Promise<Job> {
  const updateData: Record<string, unknown> = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (updates.status === 'cancelled') {
    updateData.cancelled_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('jobs')
    .update(updateData)
    .eq('id', id)
    .select(
      `
      *,
      category:categories(*),
      client:profiles!jobs_client_id_fkey(*)
    `
    )
    .single();
  if (error) throw error;
  return data as Job;
}

export async function getClientJobs(
  clientId: string,
  status?: JobStatus
): Promise<Job[]> {
  let query = supabase
    .from('jobs')
    .select(
      `
      *,
      category:categories(*),
      bids:job_bids(count),
      assigned_pro:pro_profiles!jobs_assigned_pro_id_fkey(
        *,
        profile:profiles(*)
      )
    `
    )
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Job[];
}

export async function getNearbyJobs(
  lat: number,
  lng: number,
  radiusKm: number,
  categoryId?: string
): Promise<Job[]> {
  let query = supabase.rpc('get_nearby_jobs', {
    p_latitude: lat,
    p_longitude: lng,
    p_radius_km: radiusKm,
  });

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Job[];
}

export async function getJobProgress(jobId: string): Promise<JobProgress[]> {
  const { data, error } = await supabase
    .from('job_progress')
    .select('*')
    .eq('job_id', jobId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as JobProgress[];
}

export async function addJobProgress(progressData: {
  job_id: string;
  pro_id: string;
  update_type: ProgressUpdateType;
  title: string;
  description?: string;
  photos?: string[];
  metadata?: Record<string, unknown>;
}): Promise<JobProgress> {
  const { data, error } = await supabase
    .from('job_progress')
    .insert({
      ...progressData,
      photos: progressData.photos ?? [],
      metadata: progressData.metadata ?? {},
    })
    .select()
    .single();
  if (error) throw error;
  return data as JobProgress;
}

export async function completeJob(jobId: string): Promise<Job> {
  const job = await getJob(jobId);

  if (!job.accepted_bid_id) {
    throw new Error('No accepted bid found for this job');
  }

  const totalCost = job.total_cost ?? 0;
  const platformFee = totalCost * (PLATFORM_FEE_PERCENT / 100);
  const proPayout = totalCost - platformFee;

  const { data, error } = await supabase
    .from('jobs')
    .update({
      status: 'completed' as JobStatus,
      completed_at: new Date().toISOString(),
      platform_fee: platformFee,
      pro_payout: proPayout,
      updated_at: new Date().toISOString(),
    })
    .eq('id', jobId)
    .select(
      `
      *,
      category:categories(*),
      client:profiles!jobs_client_id_fkey(*),
      assigned_pro:pro_profiles!jobs_assigned_pro_id_fkey(
        *,
        profile:profiles(*)
      )
    `
    )
    .single();
  if (error) throw error;
  return data as Job;
}
