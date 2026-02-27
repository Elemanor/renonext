import { createSupabaseServerClient } from '../server';
import type { Proposal, ProposalStatus, SequenceStep } from '@renonext/shared/types';

export async function fetchContractorProposals(
  contractorId: string,
  statusFilter?: ProposalStatus
): Promise<{ data: Proposal[] | null; error: string | null }> {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from('proposals')
    .select(`
      *,
      sequence:execution_sequences(id, name, trade_type, source, is_verified)
    `)
    .eq('contractor_id', contractorId)
    .is('deleted_at', null);

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as unknown as Proposal[], error: null };
}

export async function createProposal(proposal: {
  contractor_id: string;
  job_id?: string | null;
  sequence_id: string;
  sequence_version: number;
  steps_snapshot: SequenceStep[];
  ruleset_snapshot: Record<string, unknown>;
  title: string;
  cover_letter?: string | null;
  estimated_cost?: number | null;
  estimated_duration_days?: number | null;
  estimated_start_date?: string | null;
  warranty_terms?: string | null;
  total_inspections: number;
  total_gates: number;
  compliance_score?: number | null;
  has_code_references: boolean;
}): Promise<{ data: Proposal | null; error: string | null }> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('proposals')
    .insert({
      ...proposal,
      public_token: crypto.randomUUID(),
      status: 'draft' as ProposalStatus,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as unknown as Proposal, error: null };
}
