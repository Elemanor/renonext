-- =============================================================================
-- Migration 004: Row Level Security for Project Management Tables
-- =============================================================================
-- Covers all 14 tables from 003_project_management.sql
-- Dependencies: 003_project_management.sql (all project tables)
-- =============================================================================

-- =============================================================================
-- Helper functions: membership and role checks
-- =============================================================================

-- Check if current user is an active member of the given project
CREATE OR REPLACE FUNCTION is_project_member(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;
-- Check if current user holds the contractor role on the given project
CREATE OR REPLACE FUNCTION is_project_contractor(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
      AND role = 'contractor'
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if current user holds the client role on the given project
CREATE OR REPLACE FUNCTION is_project_client(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
      AND role = 'client'
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if current user holds the admin role on the given project
CREATE OR REPLACE FUNCTION is_project_admin(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
      AND role = 'admin'
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: resolve project_id from task_id (for task_gates table)
CREATE OR REPLACE FUNCTION task_gate_project_id(p_task_id UUID)
RETURNS UUID AS $$
  SELECT project_id FROM project_tasks WHERE id = p_task_id;
$$ LANGUAGE sql SECURITY DEFINER STABLE;
-- =============================================================================
-- Enable RLS on all 14 tables
-- =============================================================================
ALTER TABLE compliance_rulesets ENABLE ROW LEVEL SECURITY;
ALTER TABLE execution_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sequence_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_gates ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
-- =============================================================================
-- 1. compliance_rulesets: public read (credibility metadata), admin manages
-- =============================================================================
CREATE POLICY "compliance_rulesets_select_public"
  ON compliance_rulesets FOR SELECT
  USING (true);

CREATE POLICY "compliance_rulesets_insert_admin"
  ON compliance_rulesets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "compliance_rulesets_update_admin"
  ON compliance_rulesets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "compliance_rulesets_delete_admin"
  ON compliance_rulesets FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
-- =============================================================================
-- 2. execution_sequences: public read if is_public, creator can CRUD own
-- =============================================================================
CREATE POLICY "execution_sequences_select_visible"
  ON execution_sequences FOR SELECT
  USING (
    deleted_at IS NULL
    AND (
      is_public = TRUE
      OR created_by_id = auth.uid()
    )
  );

CREATE POLICY "execution_sequences_insert_own"
  ON execution_sequences FOR INSERT
  WITH CHECK (created_by_id = auth.uid());

CREATE POLICY "execution_sequences_update_own"
  ON execution_sequences FOR UPDATE
  USING (
    created_by_id = auth.uid()
    AND deleted_at IS NULL
  )
  WITH CHECK (created_by_id = auth.uid());

CREATE POLICY "execution_sequences_delete_own"
  ON execution_sequences FOR DELETE
  USING (
    created_by_id = auth.uid()
    AND deleted_at IS NULL
    AND legal_hold = FALSE
  );
-- =============================================================================
-- 3. sequence_steps: same visibility as parent execution_sequences
-- =============================================================================
CREATE POLICY "sequence_steps_select_visible"
  ON sequence_steps FOR SELECT
  USING (
    sequence_id IN (
      SELECT id FROM execution_sequences
      WHERE deleted_at IS NULL
        AND (is_public = TRUE OR created_by_id = auth.uid())
    )
  );

CREATE POLICY "sequence_steps_insert_own"
  ON sequence_steps FOR INSERT
  WITH CHECK (
    sequence_id IN (
      SELECT id FROM execution_sequences
      WHERE created_by_id = auth.uid() AND deleted_at IS NULL
    )
  );

CREATE POLICY "sequence_steps_update_own"
  ON sequence_steps FOR UPDATE
  USING (
    sequence_id IN (
      SELECT id FROM execution_sequences
      WHERE created_by_id = auth.uid() AND deleted_at IS NULL
    )
  )
  WITH CHECK (
    sequence_id IN (
      SELECT id FROM execution_sequences
      WHERE created_by_id = auth.uid() AND deleted_at IS NULL
    )
  );

CREATE POLICY "sequence_steps_delete_own"
  ON sequence_steps FOR DELETE
  USING (
    sequence_id IN (
      SELECT id FROM execution_sequences
      WHERE created_by_id = auth.uid() AND deleted_at IS NULL
    )
  );
-- =============================================================================
-- 4. projects: members only (via project_members)
-- =============================================================================
CREATE POLICY "projects_select_member"
  ON projects FOR SELECT
  USING (
    deleted_at IS NULL
    AND is_project_member(id)
  );

CREATE POLICY "projects_insert_participant"
  ON projects FOR INSERT
  WITH CHECK (
    client_id = auth.uid() OR contractor_id = auth.uid()
  );

CREATE POLICY "projects_update_contractor"
  ON projects FOR UPDATE
  USING (
    deleted_at IS NULL
    AND (is_project_contractor(id) OR is_project_admin(id))
  )
  WITH CHECK (
    deleted_at IS NULL
    AND (is_project_contractor(id) OR is_project_admin(id))
  );

CREATE POLICY "projects_delete_admin"
  ON projects FOR DELETE
  USING (
    is_project_admin(id)
    AND legal_hold = FALSE
  );
-- =============================================================================
-- 5. project_members: project participants can view, admin/contractor manage
-- =============================================================================
CREATE POLICY "project_members_select_member"
  ON project_members FOR SELECT
  USING (is_project_member(project_id));

CREATE POLICY "project_members_insert_manage"
  ON project_members FOR INSERT
  WITH CHECK (
    is_project_admin(project_id)
    OR is_project_contractor(project_id)
    -- Allow initial self-insert for project creator (client_id or contractor_id)
    OR (
      user_id = auth.uid()
      AND EXISTS (
        SELECT 1 FROM projects
        WHERE id = project_id
          AND (client_id = auth.uid() OR contractor_id = auth.uid())
          AND deleted_at IS NULL
      )
    )
  );

CREATE POLICY "project_members_update_manage"
  ON project_members FOR UPDATE
  USING (
    is_project_admin(project_id) OR is_project_contractor(project_id)
  )
  WITH CHECK (
    is_project_admin(project_id) OR is_project_contractor(project_id)
  );

CREATE POLICY "project_members_delete_admin"
  ON project_members FOR DELETE
  USING (is_project_admin(project_id));
-- =============================================================================
-- 6. project_counters: members can view, contractor/admin can update
-- =============================================================================
CREATE POLICY "project_counters_select_member"
  ON project_counters FOR SELECT
  USING (is_project_member(project_id));

CREATE POLICY "project_counters_update_contractor"
  ON project_counters FOR UPDATE
  USING (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  )
  WITH CHECK (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );

-- Note: INSERT handled by trigger (create_project_counters), no user-facing INSERT policy needed
-- =============================================================================
-- 7. project_sequence_instances: members can view, contractor can manage
-- =============================================================================
CREATE POLICY "project_sequence_instances_select_member"
  ON project_sequence_instances FOR SELECT
  USING (is_project_member(project_id));

CREATE POLICY "project_sequence_instances_insert_contractor"
  ON project_sequence_instances FOR INSERT
  WITH CHECK (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );

CREATE POLICY "project_sequence_instances_update_contractor"
  ON project_sequence_instances FOR UPDATE
  USING (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  )
  WITH CHECK (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );

CREATE POLICY "project_sequence_instances_delete_contractor"
  ON project_sequence_instances FOR DELETE
  USING (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );
-- =============================================================================
-- 8. project_stages: members can view, contractor can manage
-- =============================================================================
CREATE POLICY "project_stages_select_member"
  ON project_stages FOR SELECT
  USING (
    deleted_at IS NULL
    AND is_project_member(project_id)
  );

CREATE POLICY "project_stages_insert_contractor"
  ON project_stages FOR INSERT
  WITH CHECK (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );

CREATE POLICY "project_stages_update_contractor"
  ON project_stages FOR UPDATE
  USING (
    deleted_at IS NULL
    AND (is_project_contractor(project_id) OR is_project_admin(project_id))
  )
  WITH CHECK (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );

CREATE POLICY "project_stages_delete_contractor"
  ON project_stages FOR DELETE
  USING (
    (is_project_contractor(project_id) OR is_project_admin(project_id))
    AND legal_hold = FALSE
  );
-- =============================================================================
-- 9. project_tasks: members can view, contractor can manage
-- =============================================================================
CREATE POLICY "project_tasks_select_member"
  ON project_tasks FOR SELECT
  USING (
    deleted_at IS NULL
    AND is_project_member(project_id)
  );

CREATE POLICY "project_tasks_insert_contractor"
  ON project_tasks FOR INSERT
  WITH CHECK (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );

CREATE POLICY "project_tasks_update_contractor"
  ON project_tasks FOR UPDATE
  USING (
    deleted_at IS NULL
    AND (is_project_contractor(project_id) OR is_project_admin(project_id))
  )
  WITH CHECK (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );

CREATE POLICY "project_tasks_delete_contractor"
  ON project_tasks FOR DELETE
  USING (
    (is_project_contractor(project_id) OR is_project_admin(project_id))
    AND legal_hold = FALSE
  );
-- =============================================================================
-- 10. task_gates: members can view, contractor + admin can manage
-- =============================================================================
CREATE POLICY "task_gates_select_member"
  ON task_gates FOR SELECT
  USING (
    is_project_member(task_gate_project_id(task_id))
  );

CREATE POLICY "task_gates_insert_contractor"
  ON task_gates FOR INSERT
  WITH CHECK (
    is_project_contractor(task_gate_project_id(task_id))
    OR is_project_admin(task_gate_project_id(task_id))
  );

CREATE POLICY "task_gates_update_contractor"
  ON task_gates FOR UPDATE
  USING (
    is_project_contractor(task_gate_project_id(task_id))
    OR is_project_admin(task_gate_project_id(task_id))
  )
  WITH CHECK (
    is_project_contractor(task_gate_project_id(task_id))
    OR is_project_admin(task_gate_project_id(task_id))
  );

CREATE POLICY "task_gates_delete_contractor"
  ON task_gates FOR DELETE
  USING (
    is_project_contractor(task_gate_project_id(task_id))
    OR is_project_admin(task_gate_project_id(task_id))
  );
-- =============================================================================
-- 11. timeline_events: members can view, both can insert (immutable audit trail)
-- =============================================================================
CREATE POLICY "timeline_events_select_member"
  ON timeline_events FOR SELECT
  USING (is_project_member(project_id));

CREATE POLICY "timeline_events_insert_member"
  ON timeline_events FOR INSERT
  WITH CHECK (
    is_project_member(project_id)
    AND actor_id = auth.uid()
  );

-- No UPDATE or DELETE: timeline_events are an immutable audit trail
-- =============================================================================
-- 12. decisions: members can view, both can insert, assigned_to can update
-- =============================================================================
CREATE POLICY "decisions_select_member"
  ON decisions FOR SELECT
  USING (
    deleted_at IS NULL
    AND is_project_member(project_id)
  );

CREATE POLICY "decisions_insert_member"
  ON decisions FOR INSERT
  WITH CHECK (
    is_project_member(project_id)
    AND requested_by_id = auth.uid()
  );

CREATE POLICY "decisions_update_assigned"
  ON decisions FOR UPDATE
  USING (
    deleted_at IS NULL
    AND (
      assigned_to_id = auth.uid()
      OR requested_by_id = auth.uid()
      OR is_project_admin(project_id)
    )
  )
  WITH CHECK (
    assigned_to_id = auth.uid()
    OR requested_by_id = auth.uid()
    OR is_project_admin(project_id)
  );

CREATE POLICY "decisions_delete_admin"
  ON decisions FOR DELETE
  USING (
    is_project_admin(project_id)
    AND legal_hold = FALSE
  );
-- =============================================================================
-- 13. daily_reports: members can view, contractor can manage
-- =============================================================================
CREATE POLICY "daily_reports_select_member"
  ON daily_reports FOR SELECT
  USING (
    deleted_at IS NULL
    AND is_project_member(project_id)
  );

CREATE POLICY "daily_reports_insert_contractor"
  ON daily_reports FOR INSERT
  WITH CHECK (
    (is_project_contractor(project_id) OR is_project_admin(project_id))
    AND created_by_id = auth.uid()
  );

CREATE POLICY "daily_reports_update_contractor"
  ON daily_reports FOR UPDATE
  USING (
    deleted_at IS NULL
    AND (is_project_contractor(project_id) OR is_project_admin(project_id))
  )
  WITH CHECK (
    is_project_contractor(project_id) OR is_project_admin(project_id)
  );

CREATE POLICY "daily_reports_delete_contractor"
  ON daily_reports FOR DELETE
  USING (
    (is_project_contractor(project_id) OR is_project_admin(project_id))
    AND legal_hold = FALSE
  );
-- =============================================================================
-- 14. proposals: contractor owns, public read via public_token
-- =============================================================================

-- Public can view sent/active proposals (for public_token sharing, no auth needed)
CREATE POLICY "proposals_select_public_token"
  ON proposals FOR SELECT
  USING (
    deleted_at IS NULL
    AND status IN ('sent', 'viewed', 'accepted', 'declined', 'expired')
  );

-- Contractor can see all own proposals including drafts
CREATE POLICY "proposals_select_own"
  ON proposals FOR SELECT
  USING (
    deleted_at IS NULL
    AND contractor_id = auth.uid()
  );

CREATE POLICY "proposals_insert_contractor"
  ON proposals FOR INSERT
  WITH CHECK (contractor_id = auth.uid());

CREATE POLICY "proposals_update_own"
  ON proposals FOR UPDATE
  USING (
    deleted_at IS NULL
    AND contractor_id = auth.uid()
  )
  WITH CHECK (contractor_id = auth.uid());

CREATE POLICY "proposals_delete_own"
  ON proposals FOR DELETE
  USING (
    contractor_id = auth.uid()
    AND legal_hold = FALSE
  );
