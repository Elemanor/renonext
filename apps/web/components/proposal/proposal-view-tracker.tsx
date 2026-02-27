'use client';

import { useEffect, useRef } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface ProposalViewTrackerProps {
  token: string;
}

export function ProposalViewTracker({ token }: ProposalViewTrackerProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    const supabase = createSupabaseBrowserClient();
    supabase.rpc('mark_proposal_viewed', { p_token: token }).then(({ error }) => {
      if (error) {
        console.error('[ProposalViewTracker] Failed to mark viewed:', error.message);
      }
    });
  }, [token]);

  return null;
}
