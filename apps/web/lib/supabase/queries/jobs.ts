import { createSupabaseServerClient } from '../server';
import type { Job } from '@renonext/shared/types';

interface QueryResult<T> {
  data: T | null;
  error: string | null;
}

interface JobFilters {
  status?: string;
  category_id?: string;
  city?: string;
}

export async function fetchPostedJobs(
  filters?: JobFilters
): Promise<QueryResult<Job[]>> {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from('jobs')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.category_id) {
    query = query.eq('category_id', filters.category_id);
  }
  if (filters?.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Job[], error: null };
}

export async function fetchJobById(
  id: string
): Promise<QueryResult<Job>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('*, category:categories(*), client:profiles!client_id(*)')
    .eq('id', id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Job, error: null };
}

export async function createJob(
  jobData: Partial<Job>
): Promise<QueryResult<Job>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Job, error: null };
}

export async function fetchMyJobs(
  clientId: string
): Promise<QueryResult<Job[]>> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('*, category:categories(*)')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Job[], error: null };
}
