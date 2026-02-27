-- 005_alter_existing.sql
-- Alters payments and notifications tables for project-aware payments
-- and notification digest batching.

-- ============================================================
-- PAYMENTS - project & milestone support
-- ============================================================

-- Nullable FK so existing rows without a project remain valid.
ALTER TABLE payments
  ADD COLUMN project_id UUID REFERENCES projects(id) ON DELETE SET NULL;

-- Milestone number for milestone-based escrow releases.
ALTER TABLE payments
  ADD COLUMN milestone_number INT;

-- Partial index: only index rows that actually belong to a project.
CREATE INDEX idx_payments_project_id
  ON payments (project_id)
  WHERE project_id IS NOT NULL;

-- ============================================================
-- NOTIFICATIONS - priority & digest batching
-- ============================================================

-- Priority level for controlling delivery urgency / digest batching.
ALTER TABLE notifications
  ADD COLUMN priority TEXT NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('critical', 'normal', 'low'));

-- Batch key allows grouping related notifications into a single digest.
ALTER TABLE notifications
  ADD COLUMN batch_key TEXT;

-- Partial index for fast unread-notification queries filtered by priority.
CREATE INDEX idx_notifications_user_priority_unread
  ON notifications (user_id, priority)
  WHERE is_read = FALSE;

-- ============================================================
-- PRO_PROFILES - BCIN (Building Code Identification Number)
-- ============================================================

-- Ontario-specific designer credential. Contractors with BCIN can
-- prepare Part 9 residential drawings in-house, eliminating the
-- need for homeowners to hire a separate designer.
-- Verified via QuARTS Public Search Registry.

ALTER TABLE pro_profiles
  ADD COLUMN bcin TEXT;

ALTER TABLE pro_profiles
  ADD COLUMN bcin_verified BOOLEAN NOT NULL DEFAULT FALSE;

-- Design categories held (e.g., "House", "Small Building", "HVAC", "Plumbing")
ALTER TABLE pro_profiles
  ADD COLUMN bcin_categories JSONB NOT NULL DEFAULT '[]';
