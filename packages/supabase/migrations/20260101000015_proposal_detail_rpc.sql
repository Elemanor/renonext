-- =============================================================================
-- Migration 015: Add company_name to pro_profiles + get_proposal_detail() RPC
-- =============================================================================
-- A) Add company_name column to pro_profiles
-- B) Create get_proposal_detail() SECURITY DEFINER RPC that joins
--    proposal + profile + pro_profile for public proposal viewing
-- =============================================================================

-- =========================================================================
-- A) Add company_name to pro_profiles
-- =========================================================================

ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS company_name TEXT;

-- =========================================================================
-- B) get_proposal_detail(p_token UUID) RETURNS JSONB
--    Joins proposal + profiles (contractor) + pro_profiles
--    SECURITY DEFINER so anon can access profile data for the proposal
-- =========================================================================

CREATE OR REPLACE FUNCTION get_proposal_detail(p_token UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_proposal proposals%ROWTYPE;
  v_profile  profiles%ROWTYPE;
  v_pro      pro_profiles%ROWTYPE;
  v_result   JSONB;
BEGIN
  -- Fetch proposal by public token (must not be deleted, must be in visible statuses)
  SELECT * INTO v_proposal
  FROM proposals
  WHERE public_token = p_token
    AND deleted_at IS NULL
    AND status IN ('sent', 'viewed', 'accepted', 'declined', 'expired');

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Fetch contractor profile
  SELECT * INTO v_profile
  FROM profiles
  WHERE id = v_proposal.contractor_id;

  -- Fetch pro profile (may not exist)
  SELECT * INTO v_pro
  FROM pro_profiles
  WHERE user_id = v_proposal.contractor_id;

  -- Build response
  v_result := jsonb_build_object(
    'proposal', jsonb_build_object(
      'id', v_proposal.id,
      'public_token', v_proposal.public_token,
      'contractor_id', v_proposal.contractor_id,
      'job_id', v_proposal.job_id,
      'bid_id', v_proposal.bid_id,
      'sequence_id', v_proposal.sequence_id,
      'sequence_version', v_proposal.sequence_version,
      'steps_snapshot', v_proposal.steps_snapshot,
      'ruleset_snapshot', v_proposal.ruleset_snapshot,
      'title', v_proposal.title,
      'cover_letter', v_proposal.cover_letter,
      'plain_language_summary', v_proposal.plain_language_summary,
      'estimated_cost', v_proposal.estimated_cost,
      'estimated_duration_days', v_proposal.estimated_duration_days,
      'estimated_start_date', v_proposal.estimated_start_date,
      'warranty_terms', v_proposal.warranty_terms,
      'contractor_signature', v_proposal.contractor_signature,
      'pdf_url', v_proposal.pdf_url,
      'pdf_generated_at', v_proposal.pdf_generated_at,
      'status', v_proposal.status,
      'sent_at', v_proposal.sent_at,
      'viewed_at', v_proposal.viewed_at,
      'accepted_at', v_proposal.accepted_at,
      'expires_at', v_proposal.expires_at,
      'total_inspections', v_proposal.total_inspections,
      'total_gates', v_proposal.total_gates,
      'compliance_score', v_proposal.compliance_score,
      'has_code_references', v_proposal.has_code_references,
      'created_at', v_proposal.created_at,
      'updated_at', v_proposal.updated_at
    ),
    'contractor_profile', CASE WHEN v_profile.id IS NOT NULL THEN jsonb_build_object(
      'id', v_profile.id,
      'email', v_profile.email,
      'full_name', v_profile.full_name,
      'phone', v_profile.phone,
      'avatar_url', v_profile.avatar_url,
      'role', v_profile.role,
      'is_verified', v_profile.is_verified
    ) ELSE NULL END,
    'pro_profile', CASE WHEN v_pro.id IS NOT NULL THEN jsonb_build_object(
      'id', v_pro.id,
      'user_id', v_pro.user_id,
      'bio', v_pro.bio,
      'years_experience', v_pro.years_experience,
      'avg_rating', v_pro.avg_rating,
      'total_reviews', v_pro.total_reviews,
      'total_jobs_completed', v_pro.total_jobs_completed,
      'response_time_minutes', v_pro.response_time_minutes,
      'bcin', v_pro.bcin,
      'bcin_verified', v_pro.bcin_verified,
      'bcin_categories', v_pro.bcin_categories,
      'company_name', v_pro.company_name
    ) ELSE NULL END
  );

  RETURN v_result;
END;
$$;

GRANT EXECUTE ON FUNCTION get_proposal_detail(uuid) TO anon, authenticated;
