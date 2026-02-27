-- Migration 016: Accept/Decline Proposal RPCs + stripe_checkout_session_id column
-- ============================================================================

-- 1. Add stripe_checkout_session_id to proposals for audit + idempotency
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT;

-- ============================================================================
-- 2. decline_proposal(p_token UUID)
--    Transitions sent/viewed → declined. Notifies contractor.
-- ============================================================================
CREATE OR REPLACE FUNCTION public.decline_proposal(p_token UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_proposal RECORD;
BEGIN
  -- Lock the proposal row
  SELECT id, contractor_id, title, status
    INTO v_proposal
    FROM proposals
   WHERE public_token = p_token
     AND deleted_at IS NULL
   FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Proposal not found');
  END IF;

  -- Only allow transition from sent/viewed
  IF v_proposal.status NOT IN ('sent', 'viewed') THEN
    RETURN jsonb_build_object('success', false, 'error',
      format('Cannot decline a proposal with status "%s"', v_proposal.status));
  END IF;

  -- Update status
  UPDATE proposals
     SET status = 'declined',
         updated_at = NOW()
   WHERE id = v_proposal.id;

  -- Notify contractor
  INSERT INTO notifications (user_id, type, title, body, priority)
  VALUES (
    v_proposal.contractor_id,
    'proposal_update',
    'Proposal Declined',
    format('Your proposal "%s" has been declined by the client.', v_proposal.title),
    'normal'
  );

  RETURN jsonb_build_object('success', true, 'status', 'declined');
END;
$$;

-- ============================================================================
-- 3. accept_proposal(p_token UUID, p_stripe_session_id TEXT)
--    Called via service role from Stripe webhook only.
--    Transitions sent/viewed → accepted, assigns job, creates payment record.
-- ============================================================================
CREATE OR REPLACE FUNCTION public.accept_proposal(
  p_token UUID,
  p_stripe_session_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_proposal RECORD;
  v_deposit NUMERIC;
  v_platform_fee NUMERIC;
BEGIN
  -- Lock the proposal row
  SELECT id, contractor_id, job_id, title, status, estimated_cost,
         expires_at, stripe_checkout_session_id
    INTO v_proposal
    FROM proposals
   WHERE public_token = p_token
     AND deleted_at IS NULL
   FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Proposal not found');
  END IF;

  -- Idempotency: already accepted with same session_id → return success
  IF v_proposal.status = 'accepted'
     AND v_proposal.stripe_checkout_session_id = p_stripe_session_id THEN
    RETURN jsonb_build_object('success', true, 'status', 'accepted', 'idempotent', true);
  END IF;

  -- Only allow transition from sent/viewed
  IF v_proposal.status NOT IN ('sent', 'viewed') THEN
    RETURN jsonb_build_object('success', false, 'error',
      format('Cannot accept a proposal with status "%s"', v_proposal.status));
  END IF;

  -- Check expiry
  IF v_proposal.expires_at IS NOT NULL AND v_proposal.expires_at < NOW() THEN
    UPDATE proposals SET status = 'expired', updated_at = NOW() WHERE id = v_proposal.id;
    RETURN jsonb_build_object('success', false, 'error', 'Proposal has expired');
  END IF;

  -- Calculate deposit (10% of estimated_cost) and platform fee (10% of deposit)
  v_deposit := COALESCE(v_proposal.estimated_cost, 0) * 0.10;
  v_platform_fee := v_deposit * 0.10;

  -- Update proposal
  UPDATE proposals
     SET status = 'accepted',
         accepted_at = NOW(),
         stripe_checkout_session_id = p_stripe_session_id,
         updated_at = NOW()
   WHERE id = v_proposal.id;

  -- If linked to a job, transition to assigned
  IF v_proposal.job_id IS NOT NULL THEN
    UPDATE jobs
       SET status = 'assigned',
           assigned_pro_id = v_proposal.contractor_id,
           assigned_at = NOW(),
           final_price = v_proposal.estimated_cost,
           updated_at = NOW()
     WHERE id = v_proposal.job_id;
  END IF;

  -- Insert payment record (deposit / milestone 1)
  INSERT INTO payments (
    job_id, payer_id, payee_id, amount, platform_fee,
    type, status, milestone_number, description
  )
  SELECT
    v_proposal.job_id,
    j.client_id,
    v_proposal.contractor_id,
    v_deposit,
    v_platform_fee,
    'job_payment',
    'held',
    1,
    format('Deposit for "%s"', v_proposal.title)
  FROM jobs j
  WHERE j.id = v_proposal.job_id;

  -- Notify contractor
  INSERT INTO notifications (user_id, type, title, body, priority)
  VALUES (
    v_proposal.contractor_id,
    'proposal_update',
    'Proposal Accepted!',
    format('Your proposal "%s" has been accepted! Deposit has been received.', v_proposal.title),
    'critical'
  );

  RETURN jsonb_build_object('success', true, 'status', 'accepted');
END;
$$;

-- ============================================================================
-- 4. Grant permissions
-- ============================================================================
-- decline_proposal: accessible to anon + authenticated (public link, no money)
GRANT EXECUTE ON FUNCTION public.decline_proposal(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.decline_proposal(UUID) TO authenticated;

-- accept_proposal: only called via service role from webhook — no grant to anon
GRANT EXECUTE ON FUNCTION public.accept_proposal(UUID, TEXT) TO authenticated;
