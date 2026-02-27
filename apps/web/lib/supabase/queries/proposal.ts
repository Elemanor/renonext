import { createSupabaseServerClient } from '../server';
import type { ProposalDetailResponse } from '../types';

export async function fetchProposalByToken(
  token: string
): Promise<{ data: ProposalDetailResponse | null; error: string | null }> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc('get_proposal_detail', {
    p_token: token,
  });

  if (error) {
    return { data: null, error: error.message };
  }

  if (!data) {
    return { data: null, error: null };
  }

  return { data: data as unknown as ProposalDetailResponse, error: null };
}
