-- =============================================================================
-- Migration 014: Data Integrity — constraints, indexes, RLS for payments/BCIN
-- =============================================================================
-- Fixes:
--   A) Payments: project member RLS (client/contractor/admin only)
--   B) Payments: milestone + project constraints
--   C) Payments: composite index for project ledger
--   D) Notifications: batch + created_at indexes for digest queries
--   E) BCIN: verified requires value, unique BCIN, categories array check
-- =============================================================================

-- =========================================================================
-- A) Payments: allow project client/contractor/admin to see project payments
-- =========================================================================

CREATE POLICY "payments_select_project_member"
  ON payments FOR SELECT
  USING (
    project_id IS NOT NULL
    AND (
      is_project_client(project_id)
      OR is_project_contractor(project_id)
      OR is_project_admin(project_id)
    )
  );

-- =========================================================================
-- B) Payments: data constraints
-- =========================================================================

-- Milestone must be positive when set
ALTER TABLE payments
  ADD CONSTRAINT payments_milestone_positive
  CHECK (milestone_number IS NULL OR milestone_number > 0);

-- =========================================================================
-- C) Payments: composite index for project ledger (ordered by date)
-- =========================================================================

-- Replace simple project_id index with composite
DROP INDEX IF EXISTS idx_payments_project_id;

CREATE INDEX idx_payments_project_created
  ON payments(project_id, created_at DESC)
  WHERE project_id IS NOT NULL;

-- =========================================================================
-- D) Notifications: indexes for digest batching + unread feed
-- =========================================================================

-- Batch key grouping for digest queries
CREATE INDEX idx_notifications_user_unread_batch
  ON notifications(user_id, batch_key)
  WHERE is_read = FALSE AND batch_key IS NOT NULL;

-- Unread feed ordered by newest
CREATE INDEX idx_notifications_user_unread_created
  ON notifications(user_id, created_at DESC)
  WHERE is_read = FALSE;

-- =========================================================================
-- E) BCIN: integrity constraints
-- =========================================================================

-- Can't be "verified" without an actual BCIN value
ALTER TABLE pro_profiles
  ADD CONSTRAINT bcin_verified_requires_value
  CHECK (bcin_verified = FALSE OR (bcin IS NOT NULL AND length(trim(bcin)) > 0));

-- One BCIN per pro (no duplicates)
CREATE UNIQUE INDEX idx_pro_profiles_bcin_unique
  ON pro_profiles (bcin)
  WHERE bcin IS NOT NULL AND bcin <> '';

-- bcin_categories must be a JSON array
ALTER TABLE pro_profiles
  ADD CONSTRAINT bcin_categories_is_array
  CHECK (jsonb_typeof(bcin_categories) = 'array');
