-- Migration 021: Managed Projects for RenoNext Managed Tier
-- ============================================================================
-- Creates managed_projects table where RenoNext acts as General Contractor.
-- Links clients to assigned contractor orgs with margin tracking and RLS.

-- =============================================================================
-- 1. CREATE MANAGED_PROJECTS TABLE
-- =============================================================================

CREATE TABLE managed_projects (
  -- IDs & Foreign Keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  pm_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Business Logic
  margin_percent NUMERIC(5,2) DEFAULT 30.00 CHECK (margin_percent >= 0 AND margin_percent <= 100),
  status TEXT NOT NULL DEFAULT 'pending_review'
    CHECK (status IN (
      'pending_review',     -- Initial submission, awaiting RenoNext review
      'pending_assignment', -- Approved, seeking contractor assignment
      'assigned',           -- Assigned to contractor org, awaiting kickoff
      'active',             -- Project in progress
      'completed',          -- Project completed
      'cancelled'           -- Client or RenoNext cancelled
    )),

  -- Request Details (filled by client)
  title TEXT NOT NULL,
  description TEXT,
  address TEXT,
  budget_range TEXT,  -- e.g., '$10k-25k', '$25k-50k', etc.
  timeline TEXT,      -- e.g., 'ASAP', '1-2 months', '3-6 months'
  trade_type TEXT,

  -- PM Review & Notes
  internal_notes TEXT,
  estimated_cost NUMERIC(12,2) CHECK (estimated_cost IS NULL OR estimated_cost > 0),

  -- Lifecycle Timestamps
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  assigned_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- 2. INDEXES
-- =============================================================================

CREATE INDEX idx_managed_projects_client ON managed_projects(client_id);
CREATE INDEX idx_managed_projects_org ON managed_projects(assigned_org_id) WHERE assigned_org_id IS NOT NULL;
CREATE INDEX idx_managed_projects_pm ON managed_projects(pm_user_id) WHERE pm_user_id IS NOT NULL;
CREATE INDEX idx_managed_projects_status ON managed_projects(status);
CREATE INDEX idx_managed_projects_created ON managed_projects(created_at);
-- Composite for common queries
CREATE INDEX idx_managed_projects_org_status ON managed_projects(assigned_org_id, status) WHERE assigned_org_id IS NOT NULL;

-- =============================================================================
-- 3. UPDATED_AT TRIGGER
-- =============================================================================

CREATE OR REPLACE FUNCTION update_managed_projects_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_managed_projects_updated_at
  BEFORE UPDATE ON managed_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_managed_projects_updated_at();

-- =============================================================================
-- 4. ENABLE ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE managed_projects ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 5. RLS POLICIES
-- =============================================================================

-- Policy: Client can view their own requests
CREATE POLICY "managed_projects_client_select_own"
  ON managed_projects FOR SELECT
  USING (client_id = auth.uid());

-- Policy: Assigned org members can view their assignments
-- Organization members see all projects assigned to their org (any active member)
CREATE POLICY "managed_projects_org_member_select"
  ON managed_projects FOR SELECT
  USING (
    assigned_org_id IS NOT NULL
    AND assigned_org_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Policy: PM can view their assignments
CREATE POLICY "managed_projects_pm_select_own"
  ON managed_projects FOR SELECT
  USING (pm_user_id = auth.uid());

-- Policy: Admin users can view all (check if user is in organizations with owner/admin role)
-- Admins in any org can see all managed projects (assumes org admins are platform admins)
CREATE POLICY "managed_projects_admin_select_all"
  ON managed_projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE user_id = auth.uid()
        AND is_active = true
        AND role IN ('owner', 'admin')
    )
  );

-- Policy: Any authenticated user can CREATE a managed project request
-- (becomes the client_id automatically)
CREATE POLICY "managed_projects_authenticated_insert"
  ON managed_projects FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND client_id = auth.uid()
  );

-- Policy: PM or assigned org admin can UPDATE status, assignment, and notes
-- Allows PM to update their own projects or org admins to update their org's projects
CREATE POLICY "managed_projects_pm_or_org_admin_update"
  ON managed_projects FOR UPDATE
  USING (
    pm_user_id = auth.uid()
    OR (
      assigned_org_id IS NOT NULL
      AND is_org_supervisor_or_above(auth.uid(), assigned_org_id)
    )
  )
  WITH CHECK (
    pm_user_id = auth.uid()
    OR (
      assigned_org_id IS NOT NULL
      AND is_org_supervisor_or_above(auth.uid(), assigned_org_id)
    )
  );

-- Policy: Client can UPDATE their own pending requests (before assignment)
-- Allows client to update title/description/budget while still pending_review
CREATE POLICY "managed_projects_client_update_own_pending"
  ON managed_projects FOR UPDATE
  USING (
    client_id = auth.uid()
    AND status IN ('pending_review', 'pending_assignment')
  )
  WITH CHECK (
    client_id = auth.uid()
    AND status IN ('pending_review', 'pending_assignment')
  );

-- Policy: Client can CANCEL their own pending requests
-- Allows client to set status to cancelled for pending or unassigned projects
CREATE POLICY "managed_projects_client_cancel_own"
  ON managed_projects FOR UPDATE
  USING (
    client_id = auth.uid()
    AND status IN ('pending_review', 'pending_assignment')
  )
  WITH CHECK (
    client_id = auth.uid()
    AND status = 'cancelled'
  );

-- =============================================================================
-- 6. HELPER FUNCTION: Get managed project details (with org + pm info)
-- =============================================================================

CREATE OR REPLACE FUNCTION get_managed_project_detail(p_managed_project_id UUID)
RETURNS TABLE (
  id UUID,
  project_id UUID,
  client_id UUID,
  assigned_org_id UUID,
  pm_user_id UUID,
  margin_percent NUMERIC,
  status TEXT,
  title TEXT,
  description TEXT,
  address TEXT,
  budget_range TEXT,
  timeline TEXT,
  trade_type TEXT,
  internal_notes TEXT,
  estimated_cost NUMERIC,
  requested_at TIMESTAMPTZ,
  assigned_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  -- Joined data
  org_name TEXT,
  pm_name TEXT,
  client_name TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    mp.id,
    mp.project_id,
    mp.client_id,
    mp.assigned_org_id,
    mp.pm_user_id,
    mp.margin_percent,
    mp.status,
    mp.title,
    mp.description,
    mp.address,
    mp.budget_range,
    mp.timeline,
    mp.trade_type,
    mp.internal_notes,
    mp.estimated_cost,
    mp.requested_at,
    mp.assigned_at,
    mp.started_at,
    mp.completed_at,
    mp.created_at,
    mp.updated_at,
    -- Left joins for optional fields
    o.name AS org_name,
    p_pm.full_name AS pm_name,
    p_client.full_name AS client_name
  FROM managed_projects mp
  LEFT JOIN organizations o ON mp.assigned_org_id = o.id
  LEFT JOIN profiles p_pm ON mp.pm_user_id = p_pm.id
  LEFT JOIN profiles p_client ON mp.client_id = p_client.id
  WHERE mp.id = p_managed_project_id;
$$;

-- =============================================================================
-- 7. HELPER FUNCTION: List managed projects for current user
-- =============================================================================

CREATE OR REPLACE FUNCTION list_user_managed_projects()
RETURNS TABLE (
  id UUID,
  project_id UUID,
  client_id UUID,
  assigned_org_id UUID,
  pm_user_id UUID,
  margin_percent NUMERIC,
  status TEXT,
  title TEXT,
  address TEXT,
  budget_range TEXT,
  estimated_cost NUMERIC,
  requested_at TIMESTAMPTZ,
  assigned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  org_name TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    mp.id,
    mp.project_id,
    mp.client_id,
    mp.assigned_org_id,
    mp.pm_user_id,
    mp.margin_percent,
    mp.status,
    mp.title,
    mp.address,
    mp.budget_range,
    mp.estimated_cost,
    mp.requested_at,
    mp.assigned_at,
    mp.created_at,
    o.name AS org_name
  FROM managed_projects mp
  LEFT JOIN organizations o ON mp.assigned_org_id = o.id
  WHERE
    -- Client sees their own requests
    mp.client_id = auth.uid()
    OR
    -- PM sees their assignments
    mp.pm_user_id = auth.uid()
    OR
    -- Org member sees their org's assignments
    (
      mp.assigned_org_id IS NOT NULL
      AND mp.assigned_org_id IN (
        SELECT organization_id FROM organization_members
        WHERE user_id = auth.uid() AND is_active = true
      )
    )
    OR
    -- Admins see all
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE user_id = auth.uid()
        AND is_active = true
        AND role IN ('owner', 'admin')
    )
  ORDER BY mp.created_at DESC;
$$;

-- =============================================================================
-- 8. GRANT PERMISSIONS
-- =============================================================================

-- Allow authenticated users to query helper functions
GRANT EXECUTE ON FUNCTION get_managed_project_detail(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION list_user_managed_projects() TO authenticated;
