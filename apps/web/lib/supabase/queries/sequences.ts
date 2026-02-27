import { createSupabaseServerClient } from '../server';
import type { ExecutionSequence } from '@renonext/shared/types';

interface SequenceFilters {
  trade_type?: string;
  source?: string;
  is_public?: boolean;
}

export async function fetchSequences(
  filters?: SequenceFilters
): Promise<{ data: ExecutionSequence[] | null; error: string | null }> {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from('execution_sequences')
    .select(`
      *,
      steps:sequence_steps(* order(step_number)),
      ruleset:compliance_rulesets(*)
    `)
    .is('deleted_at', null);

  if (filters?.trade_type) {
    query = query.eq('trade_type', filters.trade_type);
  }
  if (filters?.source) {
    query = query.eq('source', filters.source);
  }
  if (filters?.is_public !== undefined) {
    query = query.eq('is_public', filters.is_public);
  }

  const { data, error } = await query.order('times_used', { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as unknown as ExecutionSequence[], error: null };
}

export async function fetchSequenceById(
  id: string
): Promise<{ data: ExecutionSequence | null; error: string | null }> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('execution_sequences')
    .select(`
      *,
      steps:sequence_steps(* order(step_number)),
      ruleset:compliance_rulesets(*)
    `)
    .eq('id', id)
    .is('deleted_at', null)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as unknown as ExecutionSequence, error: null };
}
