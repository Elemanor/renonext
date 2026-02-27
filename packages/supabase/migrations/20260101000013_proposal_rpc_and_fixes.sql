-- =============================================================================
-- Migration 013: Fix proposal public access + minor hardening
-- =============================================================================
-- Fixes:
--   A) CRITICAL: Replace globally-readable proposals policy with secure RPC
--   B) execution_sequences: remove hard DELETE policy (use soft-delete only)
--   C) Grant proposal RPC to anon + authenticated
-- =============================================================================

-- =========================================================================
-- A) CRITICAL: proposals_select_public_token leaks ALL sent proposals
--    Replace with RPC that requires the actual token
-- =========================================================================

-- Drop the dangerous policy that lets anyone read all sent proposals
DROP POLICY IF EXISTS "proposals_select_public_token" ON proposals;

-- Create secure RPC: caller must know the token to access the proposal
CREATE OR REPLACE FUNCTION get_proposal_by_token(p_token UUID)
RETURNS SETOF proposals
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM proposals
  WHERE deleted_at IS NULL
    AND public_token = p_token
    AND status IN ('sent', 'viewed', 'accepted', 'declined', 'expired');
$$;

-- Grant to both anon (public link, no login) and authenticated
GRANT EXECUTE ON FUNCTION get_proposal_by_token(uuid) TO anon, authenticated;

-- Also create a function to mark proposal as viewed (when client opens link)
CREATE OR REPLACE FUNCTION mark_proposal_viewed(p_token UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE proposals
  SET
    status = 'viewed',
    viewed_at = NOW()
  WHERE public_token = p_token
    AND deleted_at IS NULL
    AND status = 'sent';
END;
$$;

GRANT EXECUTE ON FUNCTION mark_proposal_viewed(uuid) TO anon, authenticated;

-- =========================================================================
-- B) execution_sequences: soft-delete only (already has deleted_at/deleted_by_id)
--    Remove hard DELETE policy — sequences should never be physically deleted
-- =========================================================================

DROP POLICY IF EXISTS "execution_sequences_delete_own" ON execution_sequences;

-- Replace with an update policy that allows setting deleted_at (soft delete)
-- The existing update policy already covers this since it allows creator to update

-- Also remove hard DELETE on sequence_steps (cascade from sequence soft-delete)
DROP POLICY IF EXISTS "sequence_steps_delete_own" ON sequence_steps;
