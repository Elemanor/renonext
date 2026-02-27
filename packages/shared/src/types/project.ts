import type { Profile } from './user';

// =============================================================================
// DISRUPTIONS & NOTIFICATIONS
// =============================================================================

export type DisruptionType =
  | 'noise' | 'vibration' | 'parking' | 'dust'
  | 'odor' | 'access_blocked' | 'water_shutoff' | 'power_outage';

export type NotificationSeverity = 'info' | 'warning' | 'alert';

export interface ScheduledWorkDay {
  id: string;
  date: string;
  day_label: string;
  work_planned: string;
  crew_size: number;
  work_hours: { start: string; end: string };
  disruptions: DisruptionType[];
  disruption_notes: string | null;
  requires_client_home: boolean;
  is_inspection_day: boolean;
  inspection_type: string | null;
  weather_forecast?: {
    condition: 'sunny' | 'rain' | 'snow' | 'wind';
    temp_high: number;
    risk_level: 'low' | 'delay_likely' | 'reschedule_required';
  };
}

export interface ClientNotification {
  id: string;
  project_id: string;
  title: string;
  description: string;
  severity: NotificationSeverity;
  disruption_types: DisruptionType[];
  scheduled_date: string;
  time_range: string | null;
  action_required: boolean;
  action_label: string | null;
  action_href: string | null;
  read: boolean;
  created_at: string;
}

// =============================================================================
// BASE TYPES
// =============================================================================

export interface SoftDeletable {
  deleted_at: string | null;
  deleted_by_id: string | null;
  deletion_reason: string | null;
  legal_hold: boolean;
}

export interface ResponsibilitySnapshot {
  user_id: string;
  full_name: string;
  company: string | null;
  role: string;
  trade_license: string | null;
  captured_at: string;
}

export type Visibility = 'project_team' | 'client_visible' | 'contractor_only' | 'admin_only';

// =============================================================================
// COMPLIANCE RULESETS
// =============================================================================

export interface ComplianceRuleset {
  id: string;
  region: string;
  trade_type: string;
  name: string;
  rules: Record<string, unknown>;
  version: number;
  effective_date: string | null;
  supersedes_id: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// EXECUTION SEQUENCES
// =============================================================================

export type SequenceSource = 'platform_template' | 'contractor_template' | 'custom';

export interface ExecutionSequence extends SoftDeletable {
  id: string;
  created_by_id: string | null;
  trade_type: string;
  category_id: string | null;
  name: string;
  description: string | null;
  plain_language_summary: string | null;
  source: SequenceSource;
  is_public: boolean;
  is_verified: boolean;
  ruleset_id: string | null;
  region: string | null;
  // 3D assembly (Pattern J)
  assembly_id: string | null;
  version: number;
  times_used: number;
  avg_rating: number | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  steps?: SequenceStep[];
  ruleset?: ComplianceRuleset;
}

// =============================================================================
// SEQUENCE STEPS
// =============================================================================

export interface SequenceStep {
  id: string;
  sequence_id: string;
  step_number: number;
  title: string;
  description: string | null;
  plain_language_summary: string | null;
  what_to_expect: string | null;
  expected_duration_days: number | null;
  min_crew_size: number | null;
  required_crew_types: string[];
  requires_inspection: boolean;
  inspection_type: string | null;
  requires_submittal: boolean;
  submittal_types: string[];
  requires_permit: boolean;
  requires_jsa: boolean;
  requires_client_approval: boolean;
  depends_on_steps: number[];
  is_milestone: boolean;
  triggers_payment: boolean;
  is_critical_path: boolean;
  typical_cost_percent: number | null;
  safety_notes: string | null;
  quality_criteria: string | null;
  industry_standard: boolean;
  skip_risk_description: string | null;
  resale_impact_note: string | null;
  code_reference: string | null;
  authority_body: string | null;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// PROJECTS
// =============================================================================

export type ProjectStatus = 'active' | 'on_hold' | 'completed' | 'cancelled';
export type ProjectHealth = 'on_track' | 'at_risk' | 'behind' | 'critical';

export interface Project extends SoftDeletable {
  id: string;
  job_id: string;
  client_id: string;
  contractor_id: string;
  organization_id: string | null;
  title: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  planned_start: string | null;
  planned_end: string | null;
  actual_start: string | null;
  actual_end: string | null;
  contract_value: number | null;
  approved_changes: number;
  spent_to_date: number;
  schedule_confidence: number | null;
  cost_performance: number | null;
  schedule_performance: number | null;
  percent_complete: number;
  status: ProjectStatus;
  health: ProjectHealth;
  open_decisions: number;
  open_rfis: number;
  open_issues: number;
  workers_on_site: number;
  // Closeout (Jackson Ch 5)
  closeout_started_at: string | null;
  substantial_completion_at: string | null;
  final_completion_at: string | null;
  certificate_of_occupancy: string | null;
  warranty_start_date: string | null;
  warranty_end_date: string | null;
  // Retainage (Jackson Ch 9)
  retainage_percent: number;
  retainage_released: boolean;
  retainage_released_at: string | null;
  // Site Logistics (Jackson Ch 10)
  site_plan_url: string | null;
  site_access_notes: string | null;
  work_hours: Record<string, unknown>;
  // Post-Project (Jackson Ch 5)
  debrief_completed_at: string | null;
  lessons_learned: unknown[];
  created_at: string;
  updated_at: string;
  // Joined fields
  client?: Profile;
  contractor?: Profile;
  members?: ProjectMember[];
  stages?: ProjectStage[];
}

// =============================================================================
// PROJECT MEMBERS
// =============================================================================

export type ProjectMemberRole =
  | 'client'
  | 'contractor'
  | 'worker'
  | 'sub'
  | 'engineer'
  | 'inspector'
  | 'admin';

export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  role: ProjectMemberRole;
  company: string | null;
  permissions: Record<string, unknown>;
  is_active: boolean;
  invited_at: string | null;
  accepted_at: string | null;
  created_at: string;
  // Joined fields
  user?: Profile;
}

// =============================================================================
// PROJECT COUNTERS
// =============================================================================

export interface ProjectCounters {
  project_id: string;
  next_rfi: number;
  next_submittal: number;
  next_issue: number;
  next_change_event: number;
  next_change_order: number;
  next_drawing: number;
}

// =============================================================================
// PROJECT SEQUENCE INSTANCES
// =============================================================================

export interface ProjectSequenceInstance {
  id: string;
  project_id: string;
  sequence_id: string;
  sequence_version: number;
  steps_snapshot: unknown[];
  ruleset_snapshot: Record<string, unknown>;
  // 3D assembly parameter overrides for this project
  assembly_params: Record<string, number>;
  presented_at: string | null;
  approved_by_client: boolean;
  approved_at: string | null;
  locked: boolean;
  customized: boolean;
  customization_notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  sequence?: ExecutionSequence;
}

// =============================================================================
// PROJECT STAGES
// =============================================================================

export type StageStatus =
  | 'not_started'
  | 'ready'
  | 'active'
  | 'blocked'
  | 'completed'
  | 'skipped';

export interface CompletionCriterion {
  type: string;
  reference_id?: string;
  satisfied: boolean;
  satisfied_at?: string;
}

export interface ProjectStage extends SoftDeletable {
  id: string;
  project_id: string;
  stage_number: number;
  title: string;
  description: string | null;
  plain_description: string | null;
  what_to_expect: string | null;
  safety_notes: string | null;
  estimated_duration_days: number | null;
  planned_start: string | null;
  planned_end: string | null;
  actual_start: string | null;
  actual_end: string | null;
  status: StageStatus;
  blocked_reason: string | null;
  percent_complete: number;
  completion_criteria: CompletionCriterion[];
  triggers_payment: boolean;
  payment_amount: number | null;
  payment_released: boolean;
  // Schedule Baseline (Jackson Ch 11)
  baseline_start: string | null;
  baseline_end: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  tasks?: ProjectTask[];
}

// =============================================================================
// PROJECT TASKS
// =============================================================================

export type TaskStatus =
  | 'pending'
  | 'ready'
  | 'in_progress'
  | 'paused'
  | 'completed'
  | 'cancelled';

export interface ProjectTask extends SoftDeletable {
  id: string;
  project_id: string;
  stage_id: string | null;
  title: string;
  description: string | null;
  plain_description: string | null;
  assigned_worker_id: string | null;
  assigned_company: string | null;
  planned_start: string | null;
  planned_end: string | null;
  actual_start: string | null;
  actual_end: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  estimated_cost: number | null;
  actual_cost: number | null;
  percent_complete: number;
  status: TaskStatus;
  depends_on: string[];
  sort_order: number;
  is_milestone: boolean;
  // Schedule Baseline (Jackson Ch 11)
  baseline_start: string | null;
  baseline_end: string | null;
  // Cost Code (Jackson Ch 12)
  cost_code: string | null;
  // CPM fields (added in migration 018)
  duration_days: number | null;
  task_type: string | null;
  early_start: number | null;
  early_finish: number | null;
  late_start: number | null;
  late_finish: number | null;
  slack: number | null;
  is_critical: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  assigned_worker?: Profile;
  gates?: TaskGate[];
}

// =============================================================================
// TASK GATES
// =============================================================================

export type GateType =
  | 'submittal_approved'
  | 'rfi_closed'
  | 'jsa_complete'
  | 'materials_delivered'
  | 'inspection_passed'
  | 'client_approval'
  | 'permit_obtained'
  | 'previous_task_complete'
  | 'radon_roughin_verified';

export type GateStatus = 'pending' | 'satisfied' | 'waived' | 'bypassed';

export interface TaskGate {
  id: string;
  task_id: string;
  gate_type: GateType;
  title: string;
  description: string | null;
  reference_id: string | null;
  reference_type: string | null;
  required: boolean;
  status: GateStatus;
  satisfied_at: string | null;
  satisfied_by: string | null;
  waived_by_id: string | null;
  waiver_reason: string | null;
  bypassed: boolean;
  bypassed_at: string | null;
  bypassed_by_id: string | null;
  bypass_reason: string | null;
  bypass_liability_acknowledgment: boolean;
  created_at: string;
}

// =============================================================================
// TIMELINE EVENTS
// =============================================================================

export interface TimelineEvent {
  id: string;
  project_id: string;
  event_type: string;
  source_entity_id: string | null;
  source_entity_type: string | null;
  actor_id: string | null;
  title: string;
  description: string | null;
  plain_language_summary: string | null;
  metadata: Record<string, unknown>;
  is_client_visible: boolean;
  created_at: string;
  // Joined fields
  actor?: Profile;
}

// =============================================================================
// DECISIONS
// =============================================================================

export type DecisionType =
  | 'change_order'
  | 'material_substitution'
  | 'schedule_adjustment'
  | 'design_confirmation'
  | 'worker_approval'
  | 'scope_change'
  | 'inspection_response'
  | 'general';

export type DecisionPriority = 'low' | 'medium' | 'high' | 'critical';
export type DecisionStatus = 'pending' | 'approved' | 'rejected' | 'deferred';

export interface Decision extends SoftDeletable {
  id: string;
  project_id: string;
  decision_type: DecisionType;
  title: string;
  description: string | null;
  plain_language_summary: string | null;
  requested_by_id: string;
  assigned_to_id: string;
  cost_impact: number | null;
  schedule_impact_days: number | null;
  compliance_impact: string | null;
  source_entity_id: string | null;
  source_entity_type: string | null;
  priority: DecisionPriority;
  deadline: string | null;
  status: DecisionStatus;
  decision_notes: string | null;
  decided_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  requested_by?: Profile;
  assigned_to?: Profile;
}

// =============================================================================
// DAILY REPORTS
// =============================================================================

export interface WeatherData {
  temp_high?: number;
  temp_low?: number;
  conditions?: string;
  humidity?: number;
  wind_speed?: number;
}

export interface DelayRecord {
  reason: string;
  hours: number;
  description?: string;
}

export interface DailyReport extends SoftDeletable {
  id: string;
  project_id: string;
  report_date: string;
  created_by_id: string;
  workers: unknown[];
  tasks_performed: unknown[];
  materials_delivered: unknown[];
  weather: WeatherData;
  delays: DelayRecord[];
  photos: string[];
  notes: string | null;
  client_summary: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  created_by?: Profile;
}

// =============================================================================
// PROPOSALS
// =============================================================================

export type ProposalStatus =
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'accepted'
  | 'declined'
  | 'expired'
  | 'withdrawn';

export interface Proposal extends SoftDeletable {
  id: string;
  public_token: string;
  contractor_id: string;
  job_id: string | null;
  bid_id: string | null;
  sequence_id: string;
  sequence_version: number;
  steps_snapshot: unknown[];
  ruleset_snapshot: Record<string, unknown>;
  title: string;
  cover_letter: string | null;
  plain_language_summary: string | null;
  estimated_cost: number | null;
  estimated_duration_days: number | null;
  estimated_start_date: string | null;
  warranty_terms: string | null;
  // Energy performance (NBC §9.36 — v1.5)
  energy_tier_target: number | null;
  contractor_signature: Record<string, unknown> | null;
  pdf_url: string | null;
  pdf_generated_at: string | null;
  status: ProposalStatus;
  sent_at: string | null;
  viewed_at: string | null;
  accepted_at: string | null;
  expires_at: string | null;
  total_inspections: number;
  total_gates: number;
  compliance_score: number | null;
  has_code_references: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  contractor?: Profile;
  sequence?: ExecutionSequence;
  job?: { id: string; title: string };
}

// =============================================================================
// PROJECT DOCUMENTS
// =============================================================================

export type DocumentType =
  | 'proposal'
  | 'contract'
  | 'permit'
  | 'drawing'
  | 'photo'
  | 'inspection_report'
  | 'invoice'
  | 'receipt'
  | 'warranty'
  | 'closeout_package'
  | 'lien_waiver'
  | 'insurance'
  | 'other';

export interface WarrantyMetadata {
  manufacturer: string;
  product: string;
  coverage_years: number;
  start_date: string;
  expiry_date: string;
  conditions: string | null;
  subcontractor_company: string | null;
}

export interface ProjectDocument extends SoftDeletable {
  id: string;
  project_id: string;
  uploaded_by_id: string;
  document_type: DocumentType;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string;
  file_size_bytes: number | null;
  mime_type: string | null;
  version: number;
  replaces_id: string | null;
  tags: string[];
  warranty_metadata: WarrantyMetadata | null;
  visibility: Visibility;
  created_at: string;
  updated_at: string;
  // Joined fields
  uploaded_by?: Profile;
}
