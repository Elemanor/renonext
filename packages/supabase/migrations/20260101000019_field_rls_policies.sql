-- Migration 019: RLS Policies for Field Operations Tables
-- All field tables filtered by organization_id.
-- Role-based: owner/admin/supervisor = full CRUD, foreman = assigned areas,
-- worker = read-only + own attendance + own signatures.

-- =============================================================================
-- ENABLE RLS ON ALL FIELD TABLES
-- =============================================================================

ALTER TABLE safety_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_form_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_form_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE toolbox_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE toolbox_meeting_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE fall_protection_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_work_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_daily_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_area_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE concrete_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE concrete_truck_loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_rfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_rfi_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_dependencies ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- HELPER: Check if user belongs to organization
-- =============================================================================

CREATE OR REPLACE FUNCTION is_org_member(p_user_id UUID, p_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM organization_members
    WHERE user_id = p_user_id
      AND organization_id = p_org_id
      AND is_active = true
  );
$$;

-- =============================================================================
-- HELPER: Check if user is foreman for a work area
-- =============================================================================

CREATE OR REPLACE FUNCTION is_area_foreman(p_user_id UUID, p_work_area_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM field_work_areas
    WHERE id = p_work_area_id AND foreman_id = p_user_id
  );
$$;

-- =============================================================================
-- SAFETY FORMS — org members can read, supervisor+ can write
-- =============================================================================

CREATE POLICY "sf_select" ON safety_forms FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "sf_insert" ON safety_forms FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "sf_update" ON safety_forms FOR UPDATE
  USING (
    created_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    created_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

CREATE POLICY "sf_delete" ON safety_forms FOR DELETE
  USING (is_org_supervisor_or_above(auth.uid(), organization_id));

-- =============================================================================
-- SAFETY FORM STEPS — follow parent form's org
-- =============================================================================

CREATE POLICY "sfs_select" ON safety_form_steps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM safety_forms sf
      WHERE sf.id = safety_form_steps.form_id
        AND is_org_member(auth.uid(), sf.organization_id)
    )
  );

CREATE POLICY "sfs_insert" ON safety_form_steps FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM safety_forms sf
      WHERE sf.id = safety_form_steps.form_id
        AND is_org_member(auth.uid(), sf.organization_id)
    )
  );

CREATE POLICY "sfs_update" ON safety_form_steps FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM safety_forms sf
      WHERE sf.id = safety_form_steps.form_id
        AND (sf.created_by_id = auth.uid() OR is_org_supervisor_or_above(auth.uid(), sf.organization_id))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM safety_forms sf
      WHERE sf.id = safety_form_steps.form_id
        AND (sf.created_by_id = auth.uid() OR is_org_supervisor_or_above(auth.uid(), sf.organization_id))
    )
  );

CREATE POLICY "sfs_delete" ON safety_form_steps FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM safety_forms sf
      WHERE sf.id = safety_form_steps.form_id
        AND is_org_supervisor_or_above(auth.uid(), sf.organization_id)
    )
  );

-- =============================================================================
-- SAFETY FORM SIGNATURES — org members can read, anyone in org can sign
-- =============================================================================

CREATE POLICY "sig_select" ON safety_form_signatures FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM safety_forms sf
      WHERE sf.id = safety_form_signatures.form_id
        AND is_org_member(auth.uid(), sf.organization_id)
    )
  );

CREATE POLICY "sig_insert" ON safety_form_signatures FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM safety_forms sf
      WHERE sf.id = safety_form_signatures.form_id
        AND is_org_member(auth.uid(), sf.organization_id)
    )
  );

-- =============================================================================
-- TOOLBOX MEETINGS — org members can read, supervisor+ can write
-- =============================================================================

CREATE POLICY "tm_select" ON toolbox_meetings FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "tm_insert" ON toolbox_meetings FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "tm_update" ON toolbox_meetings FOR UPDATE
  USING (
    created_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    created_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

CREATE POLICY "tm_delete" ON toolbox_meetings FOR DELETE
  USING (is_org_supervisor_or_above(auth.uid(), organization_id));

-- TOOLBOX MEETING ATTENDEES
CREATE POLICY "tma_select" ON toolbox_meeting_attendees FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM toolbox_meetings tm
      WHERE tm.id = toolbox_meeting_attendees.meeting_id
        AND is_org_member(auth.uid(), tm.organization_id)
    )
  );

CREATE POLICY "tma_insert" ON toolbox_meeting_attendees FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM toolbox_meetings tm
      WHERE tm.id = toolbox_meeting_attendees.meeting_id
        AND is_org_member(auth.uid(), tm.organization_id)
    )
  );

-- =============================================================================
-- INCIDENT REPORTS — org members can read, reporters + supervisor can write
-- =============================================================================

CREATE POLICY "ir_select" ON incident_reports FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "ir_insert" ON incident_reports FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "ir_update" ON incident_reports FOR UPDATE
  USING (
    reported_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    reported_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

CREATE POLICY "ir_delete" ON incident_reports FOR DELETE
  USING (is_org_supervisor_or_above(auth.uid(), organization_id));

-- =============================================================================
-- FALL PROTECTION PLANS — org members read, supervisor+ write
-- =============================================================================

CREATE POLICY "fpp_select" ON fall_protection_plans FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "fpp_insert" ON fall_protection_plans FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "fpp_update" ON fall_protection_plans FOR UPDATE
  USING (is_org_supervisor_or_above(auth.uid(), organization_id))
  WITH CHECK (is_org_supervisor_or_above(auth.uid(), organization_id));

-- =============================================================================
-- SAFETY CERTIFICATES — org members read, owner of cert or supervisor+ write
-- =============================================================================

CREATE POLICY "sc_select" ON safety_certificates FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "sc_insert" ON safety_certificates FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "sc_update" ON safety_certificates FOR UPDATE
  USING (
    user_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    user_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

-- =============================================================================
-- SAFETY TICKETS — org members read, supervisor+ write
-- =============================================================================

CREATE POLICY "st_select" ON safety_tickets FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "st_insert" ON safety_tickets FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "st_update" ON safety_tickets FOR UPDATE
  USING (
    issued_by_id = auth.uid()
    OR assigned_to_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    issued_by_id = auth.uid()
    OR assigned_to_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

-- =============================================================================
-- FIELD WORK AREAS — org members read, foreman of area or supervisor+ write
-- =============================================================================

CREATE POLICY "fwa_select" ON field_work_areas FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "fwa_insert" ON field_work_areas FOR INSERT
  WITH CHECK (is_org_supervisor_or_above(auth.uid(), organization_id));

CREATE POLICY "fwa_update" ON field_work_areas FOR UPDATE
  USING (
    foreman_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    foreman_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

CREATE POLICY "fwa_delete" ON field_work_areas FOR DELETE
  USING (is_org_supervisor_or_above(auth.uid(), organization_id));

-- =============================================================================
-- DAILY ACTIVITIES — org members read, foreman/supervisor write
-- =============================================================================

CREATE POLICY "fda_select" ON field_daily_activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM field_work_areas wa
      WHERE wa.id = field_daily_activities.work_area_id
        AND is_org_member(auth.uid(), wa.organization_id)
    )
  );

CREATE POLICY "fda_insert" ON field_daily_activities FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM field_work_areas wa
      WHERE wa.id = field_daily_activities.work_area_id
        AND (wa.foreman_id = auth.uid() OR is_org_supervisor_or_above(auth.uid(), wa.organization_id))
    )
  );

CREATE POLICY "fda_update" ON field_daily_activities FOR UPDATE
  USING (
    created_by_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM field_work_areas wa
      WHERE wa.id = field_daily_activities.work_area_id
        AND is_org_supervisor_or_above(auth.uid(), wa.organization_id)
    )
  )
  WITH CHECK (
    created_by_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM field_work_areas wa
      WHERE wa.id = field_daily_activities.work_area_id
        AND is_org_supervisor_or_above(auth.uid(), wa.organization_id)
    )
  );

-- =============================================================================
-- AREA PHOTOS — org members read, foreman/supervisor write
-- =============================================================================

CREATE POLICY "fap_select" ON field_area_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM field_work_areas wa
      WHERE wa.id = field_area_photos.work_area_id
        AND is_org_member(auth.uid(), wa.organization_id)
    )
  );

CREATE POLICY "fap_insert" ON field_area_photos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM field_work_areas wa
      WHERE wa.id = field_area_photos.work_area_id
        AND is_org_member(auth.uid(), wa.organization_id)
    )
  );

-- =============================================================================
-- WORKER ATTENDANCE — workers see own, supervisor+ sees all in org
-- =============================================================================

CREATE POLICY "wa_select" ON worker_attendance FOR SELECT
  USING (
    worker_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

CREATE POLICY "wa_insert" ON worker_attendance FOR INSERT
  WITH CHECK (
    worker_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

CREATE POLICY "wa_update" ON worker_attendance FOR UPDATE
  USING (
    worker_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    worker_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

-- =============================================================================
-- CONCRETE ORDERS — org members read, supervisor+ write
-- =============================================================================

CREATE POLICY "co_select" ON concrete_orders FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "co_insert" ON concrete_orders FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "co_update" ON concrete_orders FOR UPDATE
  USING (
    created_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    created_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

-- CONCRETE TRUCK LOADS — follow parent order's org
CREATE POLICY "ctl_select" ON concrete_truck_loads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM concrete_orders co
      WHERE co.id = concrete_truck_loads.order_id
        AND is_org_member(auth.uid(), co.organization_id)
    )
  );

CREATE POLICY "ctl_insert" ON concrete_truck_loads FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM concrete_orders co
      WHERE co.id = concrete_truck_loads.order_id
        AND is_org_member(auth.uid(), co.organization_id)
    )
  );

CREATE POLICY "ctl_update" ON concrete_truck_loads FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM concrete_orders co
      WHERE co.id = concrete_truck_loads.order_id
        AND is_org_member(auth.uid(), co.organization_id)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM concrete_orders co
      WHERE co.id = concrete_truck_loads.order_id
        AND is_org_member(auth.uid(), co.organization_id)
    )
  );

-- =============================================================================
-- MATERIAL REQUESTS — org members read, requester + supervisor write
-- =============================================================================

CREATE POLICY "mr_select" ON material_requests FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "mr_insert" ON material_requests FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "mr_update" ON material_requests FOR UPDATE
  USING (
    requested_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    requested_by_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

-- =============================================================================
-- FIELD RFIs — org members read, creator + supervisor write
-- =============================================================================

CREATE POLICY "fr_select" ON field_rfis FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "fr_insert" ON field_rfis FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "fr_update" ON field_rfis FOR UPDATE
  USING (
    created_by_id = auth.uid()
    OR assigned_to_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  )
  WITH CHECK (
    created_by_id = auth.uid()
    OR assigned_to_id = auth.uid()
    OR is_org_supervisor_or_above(auth.uid(), organization_id)
  );

-- RFI COMMUNICATIONS — org members read/write
CREATE POLICY "frc_select" ON field_rfi_communications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM field_rfis fr
      WHERE fr.id = field_rfi_communications.rfi_id
        AND is_org_member(auth.uid(), fr.organization_id)
    )
  );

CREATE POLICY "frc_insert" ON field_rfi_communications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM field_rfis fr
      WHERE fr.id = field_rfi_communications.rfi_id
        AND is_org_member(auth.uid(), fr.organization_id)
    )
  );

-- =============================================================================
-- TASK DEPENDENCIES — follow project membership (existing project_members RLS)
-- =============================================================================

CREATE POLICY "td_select" ON task_dependencies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = task_dependencies.project_id
        AND pm.user_id = auth.uid()
        AND pm.is_active = true
    )
  );

CREATE POLICY "td_insert" ON task_dependencies FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = task_dependencies.project_id
        AND pm.user_id = auth.uid()
        AND pm.is_active = true
        AND pm.role IN ('contractor', 'admin', 'engineer')
    )
  );

CREATE POLICY "td_update" ON task_dependencies FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = task_dependencies.project_id
        AND pm.user_id = auth.uid()
        AND pm.is_active = true
        AND pm.role IN ('contractor', 'admin', 'engineer')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = task_dependencies.project_id
        AND pm.user_id = auth.uid()
        AND pm.is_active = true
        AND pm.role IN ('contractor', 'admin', 'engineer')
    )
  );

CREATE POLICY "td_delete" ON task_dependencies FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM project_members pm
      WHERE pm.project_id = task_dependencies.project_id
        AND pm.user_id = auth.uid()
        AND pm.is_active = true
        AND pm.role IN ('contractor', 'admin')
    )
  );
