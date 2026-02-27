-- Migration 018: Field Operations Tables
-- Creates all tables needed for the Field app (safety, work areas,
-- attendance, concrete tracking, materials, RFIs, task dependencies).

-- =============================================================================
-- SAFETY FORMS (replaces JSA jsa_forms + job_steps)
-- =============================================================================

CREATE TABLE safety_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  created_by_id UUID NOT NULL REFERENCES auth.users(id),
  form_number TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  site_address TEXT,
  project_name TEXT,
  crew_supervisor TEXT,
  crew_safety_rep TEXT,
  weather TEXT,
  temperature TEXT,
  formwork TEXT,
  description TEXT,
  tools TEXT[] DEFAULT '{}',
  ppe TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'in_progress', 'pending_signatures', 'completed', 'archived')),
  pdf_url TEXT,
  pdf_generated_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  -- Soft delete
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES auth.users(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_safety_forms_org ON safety_forms (organization_id);
CREATE INDEX idx_safety_forms_project ON safety_forms (project_id) WHERE project_id IS NOT NULL;
CREATE INDEX idx_safety_forms_date ON safety_forms (organization_id, date);
CREATE INDEX idx_safety_forms_created_by ON safety_forms (created_by_id);

CREATE TABLE safety_form_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID NOT NULL REFERENCES safety_forms(id) ON DELETE CASCADE,
  sequence INTEGER NOT NULL,
  operation TEXT NOT NULL,
  hazards JSONB NOT NULL DEFAULT '[]',
  safety_controls JSONB NOT NULL DEFAULT '[]',
  risk_level TEXT NOT NULL DEFAULT 'B'
    CHECK (risk_level IN ('A', 'B', 'C')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_safety_form_steps_form ON safety_form_steps (form_id);

CREATE TABLE safety_form_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID NOT NULL REFERENCES safety_forms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  signer_name TEXT NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  signature_url TEXT,
  is_mobile BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_safety_form_sigs_form ON safety_form_signatures (form_id);

-- =============================================================================
-- TOOLBOX MEETINGS
-- =============================================================================

CREATE TABLE toolbox_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  created_by_id UUID NOT NULL REFERENCES auth.users(id),
  meeting_date DATE NOT NULL DEFAULT CURRENT_DATE,
  topic TEXT NOT NULL,
  description TEXT,
  location TEXT,
  hazards_discussed TEXT[] DEFAULT '{}',
  corrective_actions TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_toolbox_meetings_org ON toolbox_meetings (organization_id);
CREATE INDEX idx_toolbox_meetings_date ON toolbox_meetings (organization_id, meeting_date);

CREATE TABLE toolbox_meeting_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES toolbox_meetings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  attendee_name TEXT NOT NULL,
  company TEXT,
  signed_at TIMESTAMPTZ,
  signature_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_toolbox_attendees_meeting ON toolbox_meeting_attendees (meeting_id);

-- =============================================================================
-- INCIDENT REPORTS
-- =============================================================================

CREATE TABLE incident_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  reported_by_id UUID NOT NULL REFERENCES auth.users(id),
  incident_date DATE NOT NULL,
  incident_time TIME,
  location TEXT,
  severity TEXT NOT NULL DEFAULT 'minor'
    CHECK (severity IN ('near_miss', 'minor', 'moderate', 'major', 'critical')),
  description TEXT NOT NULL,
  immediate_actions TEXT,
  root_cause TEXT,
  corrective_actions TEXT,
  witnesses TEXT[] DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  injury_details JSONB,
  property_damage TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'under_review', 'closed')),
  reviewed_by_id UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  -- Soft delete
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES auth.users(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_incident_reports_org ON incident_reports (organization_id);
CREATE INDEX idx_incident_reports_date ON incident_reports (organization_id, incident_date);
CREATE INDEX idx_incident_reports_severity ON incident_reports (severity);

-- =============================================================================
-- FALL PROTECTION PLANS
-- =============================================================================

CREATE TABLE fall_protection_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  created_by_id UUID NOT NULL REFERENCES auth.users(id),
  plan_name TEXT NOT NULL,
  work_area TEXT NOT NULL,
  fall_hazards TEXT[] DEFAULT '{}',
  protection_systems TEXT[] DEFAULT '{}',
  rescue_procedures TEXT,
  training_requirements TEXT[] DEFAULT '{}',
  equipment_inspection_schedule TEXT,
  approved_by_id UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_fall_protection_org ON fall_protection_plans (organization_id);

-- =============================================================================
-- SAFETY CERTIFICATES
-- =============================================================================

CREATE TABLE safety_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  certificate_type TEXT NOT NULL,
  certificate_number TEXT,
  issuing_body TEXT,
  issued_date DATE NOT NULL,
  expiry_date DATE,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'expired', 'revoked')),
  document_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_safety_certs_org ON safety_certificates (organization_id);
CREATE INDEX idx_safety_certs_user ON safety_certificates (user_id);
CREATE INDEX idx_safety_certs_expiry ON safety_certificates (expiry_date) WHERE expiry_date IS NOT NULL;

-- =============================================================================
-- SAFETY TICKETS
-- =============================================================================

CREATE TABLE safety_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  issued_by_id UUID NOT NULL REFERENCES auth.users(id),
  assigned_to_id UUID REFERENCES auth.users(id),
  severity TEXT NOT NULL DEFAULT 'observation'
    CHECK (severity IN ('observation', 'minor', 'major', 'stop_work')),
  description TEXT NOT NULL,
  location TEXT,
  corrective_action TEXT,
  due_date DATE,
  photos TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  resolved_at TIMESTAMPTZ,
  resolved_by_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_safety_tickets_org ON safety_tickets (organization_id);
CREATE INDEX idx_safety_tickets_status ON safety_tickets (status) WHERE status NOT IN ('closed');

-- =============================================================================
-- FIELD WORK AREAS
-- =============================================================================

CREATE TABLE field_work_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  building_category TEXT,
  building_sub TEXT,
  foreman_id UUID REFERENCES auth.users(id),
  current_stage TEXT NOT NULL DEFAULT 'custom'
    CHECK (current_stage IN (
      'excavation', 'foundation', 'framing', 'rough_in',
      'insulation', 'drywall', 'finishing', 'inspection', 'custom'
    )),
  status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (status IN ('not_started', 'active', 'on_hold', 'completed')),
  sequence_order INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_work_areas_org ON field_work_areas (organization_id);
CREATE INDEX idx_work_areas_project ON field_work_areas (project_id);
CREATE INDEX idx_work_areas_foreman ON field_work_areas (foreman_id) WHERE foreman_id IS NOT NULL;

-- =============================================================================
-- FIELD DAILY ACTIVITIES
-- =============================================================================

CREATE TABLE field_daily_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_area_id UUID NOT NULL REFERENCES field_work_areas(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  description TEXT NOT NULL,
  weather JSONB,
  crew_count INTEGER NOT NULL DEFAULT 0,
  hours_worked NUMERIC(5,2),
  progress_notes TEXT,
  issues TEXT,
  created_by_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_daily_activities_area ON field_daily_activities (work_area_id);
CREATE INDEX idx_daily_activities_date ON field_daily_activities (activity_date);

-- =============================================================================
-- FIELD AREA PHOTOS
-- =============================================================================

CREATE TABLE field_area_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_area_id UUID NOT NULL REFERENCES field_work_areas(id) ON DELETE CASCADE,
  daily_activity_id UUID REFERENCES field_daily_activities(id) ON DELETE SET NULL,
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  lat NUMERIC(10,7),
  lng NUMERIC(10,7),
  taken_at TIMESTAMPTZ,
  uploaded_by_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_area_photos_area ON field_area_photos (work_area_id);
CREATE INDEX idx_area_photos_activity ON field_area_photos (daily_activity_id) WHERE daily_activity_id IS NOT NULL;

-- =============================================================================
-- WORKER ATTENDANCE
-- =============================================================================

CREATE TABLE worker_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  worker_id UUID NOT NULL REFERENCES auth.users(id),
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'present'
    CHECK (status IN ('present', 'absent', 'late', 'left_early', 'day_off')),
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  check_in_lat NUMERIC(10,7),
  check_in_lng NUMERIC(10,7),
  check_in_address TEXT,
  check_out_lat NUMERIC(10,7),
  check_out_lng NUMERIC(10,7),
  check_out_address TEXT,
  break_minutes INTEGER NOT NULL DEFAULT 0,
  total_hours NUMERIC(5,2),
  overtime_hours NUMERIC(5,2),
  notes TEXT,
  clock_events JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_attendance_org ON worker_attendance (organization_id);
CREATE INDEX idx_attendance_worker ON worker_attendance (worker_id, date);
CREATE INDEX idx_attendance_project ON worker_attendance (project_id) WHERE project_id IS NOT NULL;
CREATE UNIQUE INDEX idx_attendance_unique ON worker_attendance (organization_id, worker_id, date);

-- =============================================================================
-- CONCRETE ORDERS
-- =============================================================================

CREATE TABLE concrete_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  order_code TEXT NOT NULL,
  supplier TEXT NOT NULL,
  mix_design TEXT,
  planned_volume NUMERIC(10,2) NOT NULL,
  actual_volume NUMERIC(10,2),
  pour_date DATE NOT NULL,
  pour_location TEXT,
  slump_spec TEXT,
  strength_spec TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_by_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_concrete_orders_org ON concrete_orders (organization_id);
CREATE INDEX idx_concrete_orders_project ON concrete_orders (project_id);
CREATE INDEX idx_concrete_orders_date ON concrete_orders (pour_date);

-- =============================================================================
-- CONCRETE TRUCK LOADS
-- =============================================================================

CREATE TABLE concrete_truck_loads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES concrete_orders(id) ON DELETE CASCADE,
  load_number INTEGER NOT NULL,
  driver_name TEXT,
  truck_id TEXT,
  batch_time TIMESTAMPTZ,
  expected_arrival TIMESTAMPTZ,
  actual_arrival TIMESTAMPTZ,
  volume NUMERIC(8,2),
  slump_test NUMERIC(5,2),
  air_content NUMERIC(5,2),
  temperature NUMERIC(5,1),
  lat NUMERIC(10,7),
  lng NUMERIC(10,7),
  status TEXT NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'dispatched', 'in_transit', 'on_site', 'pouring', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_truck_loads_order ON concrete_truck_loads (order_id);

-- =============================================================================
-- MATERIAL REQUESTS
-- =============================================================================

CREATE TABLE material_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  requested_by_id UUID NOT NULL REFERENCES auth.users(id),
  request_number TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  urgency TEXT NOT NULL DEFAULT 'medium'
    CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  needed_by_date DATE,
  delivery_date DATE,
  delivery_location TEXT,
  supplier TEXT,
  total_estimated_cost NUMERIC(12,2),
  actual_cost NUMERIC(12,2),
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'approved', 'ordered', 'delivered', 'cancelled')),
  approved_by_id UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_material_requests_org ON material_requests (organization_id);
CREATE INDEX idx_material_requests_project ON material_requests (project_id);
CREATE INDEX idx_material_requests_status ON material_requests (status) WHERE status NOT IN ('delivered', 'cancelled');

-- =============================================================================
-- FIELD RFIs
-- =============================================================================

CREATE TABLE field_rfis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  rfi_number TEXT NOT NULL,
  subject TEXT NOT NULL,
  question TEXT NOT NULL,
  context TEXT,
  priority TEXT NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('draft', 'open', 'in_review', 'answered', 'closed')),
  created_by_id UUID NOT NULL REFERENCES auth.users(id),
  assigned_to_id UUID REFERENCES auth.users(id),
  response TEXT,
  responded_by_id UUID REFERENCES auth.users(id),
  responded_at TIMESTAMPTZ,
  due_date DATE,
  cost_impact NUMERIC(12,2),
  schedule_impact_days INTEGER,
  attachments TEXT[] DEFAULT '{}',
  -- Soft delete
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES auth.users(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_field_rfis_org ON field_rfis (organization_id);
CREATE INDEX idx_field_rfis_project ON field_rfis (project_id);
CREATE INDEX idx_field_rfis_status ON field_rfis (status) WHERE status NOT IN ('closed');

CREATE TABLE field_rfi_communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rfi_id UUID NOT NULL REFERENCES field_rfis(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'comment'
    CHECK (message_type IN ('question', 'response', 'comment', 'clarification')),
  attachments TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rfi_comms_rfi ON field_rfi_communications (rfi_id);

-- =============================================================================
-- TASK DEPENDENCIES (for CPM scheduling)
-- =============================================================================

CREATE TABLE task_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,
  predecessor_task_id UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,
  dependency_type TEXT NOT NULL DEFAULT 'finish_to_start'
    CHECK (dependency_type IN ('finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish')),
  lag_days INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(task_id, predecessor_task_id)
);

-- Prevent self-dependency
ALTER TABLE task_dependencies
  ADD CONSTRAINT chk_no_self_dependency CHECK (task_id <> predecessor_task_id);

CREATE INDEX idx_task_deps_project ON task_dependencies (project_id);
CREATE INDEX idx_task_deps_task ON task_dependencies (task_id);
CREATE INDEX idx_task_deps_predecessor ON task_dependencies (predecessor_task_id);

-- =============================================================================
-- EXTEND PROJECT_TASKS WITH CPM FIELDS
-- =============================================================================

ALTER TABLE project_tasks ADD COLUMN duration_days INTEGER;
ALTER TABLE project_tasks ADD COLUMN task_type TEXT;
ALTER TABLE project_tasks ADD COLUMN early_start INTEGER;
ALTER TABLE project_tasks ADD COLUMN early_finish INTEGER;
ALTER TABLE project_tasks ADD COLUMN late_start INTEGER;
ALTER TABLE project_tasks ADD COLUMN late_finish INTEGER;
ALTER TABLE project_tasks ADD COLUMN slack INTEGER;
ALTER TABLE project_tasks ADD COLUMN is_critical BOOLEAN NOT NULL DEFAULT false;

-- =============================================================================
-- UPDATED_AT TRIGGERS FOR ALL NEW TABLES
-- =============================================================================

CREATE OR REPLACE FUNCTION field_update_updated_at()
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

CREATE TRIGGER trg_safety_forms_updated_at
  BEFORE UPDATE ON safety_forms
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_safety_form_steps_updated_at
  BEFORE UPDATE ON safety_form_steps
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_toolbox_meetings_updated_at
  BEFORE UPDATE ON toolbox_meetings
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_incident_reports_updated_at
  BEFORE UPDATE ON incident_reports
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_fall_protection_updated_at
  BEFORE UPDATE ON fall_protection_plans
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_safety_certs_updated_at
  BEFORE UPDATE ON safety_certificates
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_safety_tickets_updated_at
  BEFORE UPDATE ON safety_tickets
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_work_areas_updated_at
  BEFORE UPDATE ON field_work_areas
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_daily_activities_updated_at
  BEFORE UPDATE ON field_daily_activities
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_attendance_updated_at
  BEFORE UPDATE ON worker_attendance
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_concrete_orders_updated_at
  BEFORE UPDATE ON concrete_orders
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_truck_loads_updated_at
  BEFORE UPDATE ON concrete_truck_loads
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_material_requests_updated_at
  BEFORE UPDATE ON material_requests
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();

CREATE TRIGGER trg_field_rfis_updated_at
  BEFORE UPDATE ON field_rfis
  FOR EACH ROW EXECUTE FUNCTION field_update_updated_at();
