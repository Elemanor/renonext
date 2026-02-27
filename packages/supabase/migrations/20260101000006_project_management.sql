-- =============================================================================
-- Migration 003: Project Management — v1 Tables (15 tables)
-- =============================================================================
-- Tables: compliance_rulesets, execution_sequences, sequence_steps,
--         projects, project_members, project_counters,
--         project_sequence_instances, project_stages, project_tasks,
--         task_gates, timeline_events, decisions, daily_reports, proposals
--
-- Dependencies: 001_initial_schema.sql (profiles, jobs, job_bids, categories)
-- =============================================================================

-- 1. compliance_rulesets — jurisdiction rules
CREATE TABLE compliance_rulesets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region TEXT NOT NULL,
  trade_type TEXT NOT NULL,
  name TEXT NOT NULL,
  rules JSONB NOT NULL DEFAULT '{}',
  version INT NOT NULL DEFAULT 1,
  effective_date DATE,
  supersedes_id UUID REFERENCES compliance_rulesets(id),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER compliance_rulesets_updated_at BEFORE UPDATE ON compliance_rulesets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE UNIQUE INDEX idx_compliance_rulesets_active ON compliance_rulesets(region, trade_type) WHERE is_active = TRUE;
CREATE INDEX idx_compliance_rulesets_trade ON compliance_rulesets(trade_type);

-- 2. execution_sequences — Golden Library templates
CREATE TABLE execution_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by_id UUID REFERENCES profiles(id),
  trade_type TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  plain_language_summary TEXT,
  source TEXT NOT NULL DEFAULT 'custom' CHECK (source IN ('platform_template', 'contractor_template', 'custom')),
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  ruleset_id UUID REFERENCES compliance_rulesets(id) ON DELETE SET NULL,
  region TEXT,
  version INT NOT NULL DEFAULT 1,
  times_used INT NOT NULL DEFAULT 0,
  avg_rating DECIMAL(3,2),
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES profiles(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER execution_sequences_updated_at BEFORE UPDATE ON execution_sequences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_exec_sequences_trade ON execution_sequences(trade_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_exec_sequences_creator ON execution_sequences(created_by_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_exec_sequences_public ON execution_sequences(is_public, trade_type) WHERE is_public = TRUE AND deleted_at IS NULL;

-- 3. sequence_steps — steps within sequences
CREATE TABLE sequence_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID NOT NULL REFERENCES execution_sequences(id) ON DELETE CASCADE,
  step_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  plain_language_summary TEXT,
  what_to_expect TEXT,
  expected_duration_days INT,
  min_crew_size INT,
  required_crew_types TEXT[],
  requires_inspection BOOLEAN NOT NULL DEFAULT FALSE,
  inspection_type TEXT,
  requires_submittal BOOLEAN NOT NULL DEFAULT FALSE,
  submittal_types TEXT[],
  requires_permit BOOLEAN NOT NULL DEFAULT FALSE,
  requires_jsa BOOLEAN NOT NULL DEFAULT TRUE,
  requires_client_approval BOOLEAN NOT NULL DEFAULT FALSE,
  depends_on_steps INT[] NOT NULL DEFAULT '{}',
  is_milestone BOOLEAN NOT NULL DEFAULT FALSE,
  triggers_payment BOOLEAN NOT NULL DEFAULT FALSE,
  is_critical_path BOOLEAN NOT NULL DEFAULT FALSE,
  typical_cost_percent DECIMAL(5,2),
  safety_notes TEXT,
  quality_criteria TEXT,
  industry_standard BOOLEAN NOT NULL DEFAULT TRUE,
  skip_risk_description TEXT,
  resale_impact_note TEXT,
  code_reference TEXT,
  authority_body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (sequence_id, step_number)
);
CREATE TRIGGER sequence_steps_updated_at BEFORE UPDATE ON sequence_steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_sequence_steps_sequence ON sequence_steps(sequence_id);

-- 4. projects — top-level project entity (references jobs table from 001)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE UNIQUE,
  client_id UUID NOT NULL REFERENCES profiles(id),
  contractor_id UUID NOT NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  planned_start DATE,
  planned_end DATE,
  actual_start DATE,
  actual_end DATE,
  contract_value DECIMAL(12,2),
  approved_changes DECIMAL(12,2) NOT NULL DEFAULT 0,
  spent_to_date DECIMAL(12,2) NOT NULL DEFAULT 0,
  schedule_confidence DECIMAL(5,2),
  cost_performance DECIMAL(5,4),
  schedule_performance DECIMAL(5,4),
  percent_complete DECIMAL(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'on_hold', 'completed', 'cancelled')),
  health TEXT NOT NULL DEFAULT 'on_track' CHECK (health IN ('on_track', 'at_risk', 'behind', 'critical')),
  open_decisions INT NOT NULL DEFAULT 0,
  open_rfis INT NOT NULL DEFAULT 0,
  open_issues INT NOT NULL DEFAULT 0,
  workers_on_site INT NOT NULL DEFAULT 0,

  -- Closeout (Jackson Ch 5)
  closeout_started_at TIMESTAMPTZ,
  substantial_completion_at TIMESTAMPTZ,
  final_completion_at TIMESTAMPTZ,
  certificate_of_occupancy TEXT,
  warranty_start_date DATE,
  warranty_end_date DATE,

  -- Retainage (Jackson Ch 9)
  retainage_percent DECIMAL(5,2) DEFAULT 10.00,
  retainage_released BOOLEAN NOT NULL DEFAULT FALSE,
  retainage_released_at TIMESTAMPTZ,

  -- Site Logistics (Jackson Ch 10)
  site_plan_url TEXT,
  site_access_notes TEXT,
  work_hours JSONB DEFAULT '{}',

  -- Post-Project (Jackson Ch 5)
  debrief_completed_at TIMESTAMPTZ,
  lessons_learned JSONB DEFAULT '[]',

  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES profiles(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_projects_client ON projects(client_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_contractor ON projects(contractor_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;

-- 5. project_members — unified access control
CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('client', 'contractor', 'worker', 'sub', 'engineer', 'inspector', 'admin')),
  company TEXT,
  permissions JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  invited_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, user_id)
);
CREATE INDEX idx_project_members_project ON project_members(project_id) WHERE is_active = TRUE;
CREATE INDEX idx_project_members_user ON project_members(user_id) WHERE is_active = TRUE;

-- 6. project_counters — atomic numbering
CREATE TABLE project_counters (
  project_id UUID PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  next_rfi INT NOT NULL DEFAULT 1,
  next_submittal INT NOT NULL DEFAULT 1,
  next_issue INT NOT NULL DEFAULT 1,
  next_change_event INT NOT NULL DEFAULT 1,
  next_change_order INT NOT NULL DEFAULT 1,
  next_drawing INT NOT NULL DEFAULT 1
);

-- 7. project_sequence_instances — locked blueprint per project
CREATE TABLE project_sequence_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sequence_id UUID NOT NULL REFERENCES execution_sequences(id),
  sequence_version INT NOT NULL,
  steps_snapshot JSONB NOT NULL DEFAULT '[]',
  ruleset_snapshot JSONB NOT NULL DEFAULT '{}',
  presented_at TIMESTAMPTZ,
  approved_by_client BOOLEAN NOT NULL DEFAULT FALSE,
  approved_at TIMESTAMPTZ,
  locked BOOLEAN NOT NULL DEFAULT FALSE,
  customized BOOLEAN NOT NULL DEFAULT FALSE,
  customization_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, sequence_id)
);
CREATE TRIGGER project_sequence_instances_updated_at BEFORE UPDATE ON project_sequence_instances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_proj_seq_instances_project ON project_sequence_instances(project_id);
CREATE INDEX idx_proj_seq_instances_sequence ON project_sequence_instances(sequence_id);

-- 8. project_stages — named phases of work
CREATE TABLE project_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  plain_description TEXT,
  what_to_expect TEXT,
  safety_notes TEXT,
  estimated_duration_days INT,
  planned_start DATE,
  planned_end DATE,
  actual_start DATE,
  actual_end DATE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'ready', 'active', 'blocked', 'completed', 'skipped')),
  blocked_reason TEXT,
  percent_complete DECIMAL(5,2) NOT NULL DEFAULT 0,
  completion_criteria JSONB NOT NULL DEFAULT '[]',
  triggers_payment BOOLEAN NOT NULL DEFAULT FALSE,
  payment_amount DECIMAL(10,2),
  payment_released BOOLEAN NOT NULL DEFAULT FALSE,

  -- Schedule Baseline (Jackson Ch 11)
  baseline_start DATE,
  baseline_end DATE,

  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES profiles(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, stage_number)
);
CREATE TRIGGER project_stages_updated_at BEFORE UPDATE ON project_stages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_project_stages_project ON project_stages(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_stages_status ON project_stages(project_id, status) WHERE deleted_at IS NULL;

-- 9. project_tasks — individual tasks (Gantt items)
CREATE TABLE project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_id UUID REFERENCES project_stages(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  plain_description TEXT,
  assigned_worker_id UUID REFERENCES profiles(id),
  assigned_company TEXT,
  planned_start DATE,
  planned_end DATE,
  actual_start DATE,
  actual_end DATE,
  estimated_hours DECIMAL(6,1),
  actual_hours DECIMAL(6,1),
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  percent_complete DECIMAL(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'ready', 'in_progress', 'paused', 'completed', 'cancelled')),
  depends_on UUID[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  is_milestone BOOLEAN NOT NULL DEFAULT FALSE,

  -- Schedule Baseline (Jackson Ch 11)
  baseline_start DATE,
  baseline_end DATE,

  -- Cost Code (Jackson Ch 12)
  cost_code TEXT,

  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES profiles(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER project_tasks_updated_at BEFORE UPDATE ON project_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_project_tasks_project ON project_tasks(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_tasks_stage ON project_tasks(stage_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_tasks_status ON project_tasks(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_tasks_assigned ON project_tasks(assigned_worker_id) WHERE deleted_at IS NULL;

-- 10. task_gates — readiness prerequisites with "Proceed at Risk"
CREATE TABLE task_gates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,
  gate_type TEXT NOT NULL CHECK (gate_type IN ('submittal_approved', 'rfi_closed', 'jsa_complete', 'materials_delivered', 'inspection_passed', 'client_approval', 'permit_obtained', 'previous_task_complete')),
  title TEXT NOT NULL,
  description TEXT,
  reference_id UUID,
  reference_type TEXT,
  required BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'satisfied', 'waived', 'bypassed')),
  satisfied_at TIMESTAMPTZ,
  satisfied_by TEXT,
  waived_by_id UUID REFERENCES profiles(id),
  waiver_reason TEXT,
  bypassed BOOLEAN NOT NULL DEFAULT FALSE,
  bypassed_at TIMESTAMPTZ,
  bypassed_by_id UUID REFERENCES profiles(id),
  bypass_reason TEXT,
  bypass_liability_acknowledgment BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_task_gates_task ON task_gates(task_id);
CREATE INDEX idx_task_gates_status ON task_gates(status) WHERE status = 'pending';
CREATE INDEX idx_task_gates_bypassed ON task_gates(task_id) WHERE bypassed = TRUE;

-- 11. timeline_events — immutable audit trail
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  source_entity_id UUID,
  source_entity_type TEXT,
  actor_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  plain_language_summary TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  is_client_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_timeline_events_project ON timeline_events(project_id, created_at DESC);
CREATE INDEX idx_timeline_events_type ON timeline_events(project_id, event_type);
CREATE INDEX idx_timeline_events_client ON timeline_events(project_id, is_client_visible) WHERE is_client_visible = TRUE;

-- 12. decisions — unified decision inbox
CREATE TABLE decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  decision_type TEXT NOT NULL CHECK (decision_type IN ('change_order', 'material_substitution', 'schedule_adjustment', 'design_confirmation', 'worker_approval', 'scope_change', 'inspection_response', 'general')),
  title TEXT NOT NULL,
  description TEXT,
  plain_language_summary TEXT,
  requested_by_id UUID NOT NULL REFERENCES profiles(id),
  assigned_to_id UUID NOT NULL REFERENCES profiles(id),
  cost_impact DECIMAL(10,2),
  schedule_impact_days INT,
  compliance_impact TEXT,
  source_entity_id UUID,
  source_entity_type TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  deadline DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'deferred')),
  decision_notes TEXT,
  decided_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES profiles(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER decisions_updated_at BEFORE UPDATE ON decisions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_decisions_project ON decisions(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_decisions_assigned ON decisions(assigned_to_id, status) WHERE status = 'pending' AND deleted_at IS NULL;
CREATE INDEX idx_decisions_status ON decisions(status) WHERE status = 'pending' AND deleted_at IS NULL;

-- 13. daily_reports — construction daily log
CREATE TABLE daily_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  report_date DATE NOT NULL,
  created_by_id UUID NOT NULL REFERENCES profiles(id),
  workers JSONB NOT NULL DEFAULT '[]',
  tasks_performed JSONB NOT NULL DEFAULT '[]',
  materials_delivered JSONB NOT NULL DEFAULT '[]',
  weather JSONB NOT NULL DEFAULT '{}',
  delays JSONB NOT NULL DEFAULT '[]',
  photos JSONB NOT NULL DEFAULT '[]',
  notes TEXT,
  client_summary TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES profiles(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, report_date)
);
CREATE TRIGGER daily_reports_updated_at BEFORE UPDATE ON daily_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_daily_reports_project_date ON daily_reports(project_id, report_date) WHERE deleted_at IS NULL;

-- 14. proposals — pre-hire trust artifact
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  contractor_id UUID NOT NULL REFERENCES profiles(id),
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  bid_id UUID REFERENCES job_bids(id) ON DELETE SET NULL,
  sequence_id UUID NOT NULL REFERENCES execution_sequences(id),
  sequence_version INT NOT NULL,
  steps_snapshot JSONB NOT NULL DEFAULT '[]',
  ruleset_snapshot JSONB NOT NULL DEFAULT '{}',
  title TEXT NOT NULL,
  cover_letter TEXT,
  plain_language_summary TEXT,
  estimated_cost DECIMAL(12,2),
  estimated_duration_days INT,
  estimated_start_date DATE,
  warranty_terms TEXT,
  contractor_signature JSONB,
  pdf_url TEXT,
  pdf_generated_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'declined', 'expired', 'withdrawn')),
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  total_inspections INT NOT NULL DEFAULT 0,
  total_gates INT NOT NULL DEFAULT 0,
  compliance_score DECIMAL(5,2),
  has_code_references BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  deleted_by_id UUID REFERENCES profiles(id),
  deletion_reason TEXT,
  legal_hold BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER proposals_updated_at BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX idx_proposals_contractor ON proposals(contractor_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_proposals_job ON proposals(job_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_proposals_token ON proposals(public_token);
CREATE INDEX idx_proposals_status ON proposals(status) WHERE status IN ('sent', 'viewed') AND deleted_at IS NULL;

-- Auto-create project_counters when a project is created
CREATE OR REPLACE FUNCTION create_project_counters()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO project_counters (project_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_create_counters
  AFTER INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION create_project_counters();
