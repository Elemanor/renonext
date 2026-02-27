import type { Profile } from './user';
import type { SoftDeletable, Visibility } from './project';

// =============================================================================
// ORGANIZATIONS (Multi-Tenancy)
// =============================================================================

export type OrganizationRole = 'owner' | 'admin' | 'supervisor' | 'foreman' | 'worker';

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  settings: Record<string, unknown>;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_tier: SubscriptionTier;
  created_at: string;
  updated_at: string;
  // Joined fields
  members?: OrganizationMember[];
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: OrganizationRole;
  pin: string | null;
  display_name: string | null;
  is_active: boolean;
  invited_at: string | null;
  accepted_at: string | null;
  created_at: string;
  // Joined fields
  user?: Profile;
  organization?: Organization;
}

// =============================================================================
// SAFETY FORMS
// =============================================================================

export type SafetyFormStatus = 'draft' | 'in_progress' | 'pending_signatures' | 'completed' | 'archived';

export type RiskLevel = 'A' | 'B' | 'C';

export interface SafetyForm extends SoftDeletable {
  id: string;
  organization_id: string;
  project_id: string | null;
  created_by_id: string;
  form_number: string;
  date: string;
  site_address: string | null;
  project_name: string | null;
  crew_supervisor: string | null;
  crew_safety_rep: string | null;
  weather: string | null;
  temperature: string | null;
  formwork: string | null;
  description: string | null;
  tools: string[];
  ppe: string[];
  status: SafetyFormStatus;
  pdf_url: string | null;
  pdf_generated_at: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  created_by?: Profile;
  steps?: SafetyFormStep[];
  signatures?: SafetyFormSignature[];
}

export interface SafetyFormStep {
  id: string;
  form_id: string;
  sequence: number;
  operation: string;
  hazards: string[];
  safety_controls: string[];
  risk_level: RiskLevel;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SafetyFormSignature {
  id: string;
  form_id: string;
  user_id: string | null;
  signer_name: string;
  signed_at: string;
  signature_url: string | null;
  is_mobile: boolean;
  created_at: string;
  // Joined fields
  user?: Profile;
}

// =============================================================================
// TOOLBOX MEETINGS
// =============================================================================

export interface ToolboxMeeting {
  id: string;
  organization_id: string;
  project_id: string | null;
  created_by_id: string;
  meeting_date: string;
  topic: string;
  description: string | null;
  location: string | null;
  hazards_discussed: string[];
  corrective_actions: string | null;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  created_by?: Profile;
  attendees?: MeetingAttendee[];
}

export interface MeetingAttendee {
  id: string;
  meeting_id: string;
  user_id: string | null;
  attendee_name: string;
  company: string | null;
  signed_at: string | null;
  signature_url: string | null;
  created_at: string;
  // Joined fields
  user?: Profile;
}

// =============================================================================
// INCIDENT REPORTS
// =============================================================================

export type IncidentSeverity = 'near_miss' | 'minor' | 'moderate' | 'major' | 'critical';
export type IncidentStatus = 'draft' | 'submitted' | 'under_review' | 'closed';

export interface IncidentReport extends SoftDeletable {
  id: string;
  organization_id: string;
  project_id: string | null;
  reported_by_id: string;
  incident_date: string;
  incident_time: string | null;
  location: string | null;
  severity: IncidentSeverity;
  description: string;
  immediate_actions: string | null;
  root_cause: string | null;
  corrective_actions: string | null;
  witnesses: string[];
  photos: string[];
  injury_details: Record<string, unknown> | null;
  property_damage: string | null;
  status: IncidentStatus;
  reviewed_by_id: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  reported_by?: Profile;
  reviewed_by?: Profile;
}

// =============================================================================
// FALL PROTECTION PLANS
// =============================================================================

export interface FallProtectionPlan {
  id: string;
  organization_id: string;
  project_id: string | null;
  created_by_id: string;
  plan_name: string;
  work_area: string;
  fall_hazards: string[];
  protection_systems: string[];
  rescue_procedures: string | null;
  training_requirements: string[];
  equipment_inspection_schedule: string | null;
  approved_by_id: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  created_by?: Profile;
}

// =============================================================================
// SAFETY CERTIFICATES & TICKETS
// =============================================================================

export type CertificateStatus = 'active' | 'expired' | 'revoked';

export interface SafetyCertificate {
  id: string;
  organization_id: string;
  user_id: string;
  certificate_type: string;
  certificate_number: string | null;
  issuing_body: string | null;
  issued_date: string;
  expiry_date: string | null;
  status: CertificateStatus;
  document_url: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  user?: Profile;
}

export type TicketSeverity = 'observation' | 'minor' | 'major' | 'stop_work';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface SafetyTicket {
  id: string;
  organization_id: string;
  project_id: string | null;
  issued_by_id: string;
  assigned_to_id: string | null;
  severity: TicketSeverity;
  description: string;
  location: string | null;
  corrective_action: string | null;
  due_date: string | null;
  photos: string[];
  status: TicketStatus;
  resolved_at: string | null;
  resolved_by_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  issued_by?: Profile;
  assigned_to?: Profile;
}

// =============================================================================
// FIELD WORK AREAS
// =============================================================================

export type WorkAreaStatus = 'not_started' | 'active' | 'on_hold' | 'completed';

export type WorkAreaStage =
  | 'excavation'
  | 'foundation'
  | 'framing'
  | 'rough_in'
  | 'insulation'
  | 'drywall'
  | 'finishing'
  | 'inspection'
  | 'custom';

export interface FieldWorkArea {
  id: string;
  organization_id: string;
  project_id: string;
  name: string;
  description: string | null;
  building_category: string | null;
  building_sub: string | null;
  foreman_id: string | null;
  current_stage: WorkAreaStage;
  status: WorkAreaStatus;
  sequence_order: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  foreman?: Profile;
  daily_activities?: DailyActivity[];
}

export interface DailyActivity {
  id: string;
  work_area_id: string;
  activity_date: string;
  description: string;
  weather: {
    condition?: string;
    temperature?: number;
    wind_speed?: number;
    humidity?: number;
  } | null;
  crew_count: number;
  hours_worked: number | null;
  progress_notes: string | null;
  issues: string | null;
  created_by_id: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  created_by?: Profile;
  photos?: AreaPhoto[];
}

export interface AreaPhoto {
  id: string;
  work_area_id: string;
  daily_activity_id: string | null;
  photo_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  lat: number | null;
  lng: number | null;
  taken_at: string | null;
  uploaded_by_id: string;
  created_at: string;
  // Joined fields
  uploaded_by?: Profile;
}

// =============================================================================
// WORKER ATTENDANCE
// =============================================================================

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'left_early' | 'day_off';

export interface ClockEvent {
  type: 'check_in' | 'check_out' | 'break_start' | 'break_end';
  timestamp: string;
  lat: number | null;
  lng: number | null;
  address: string | null;
}

export interface WorkerAttendance {
  id: string;
  organization_id: string;
  project_id: string | null;
  worker_id: string;
  date: string;
  status: AttendanceStatus;
  check_in_time: string | null;
  check_out_time: string | null;
  check_in_lat: number | null;
  check_in_lng: number | null;
  check_in_address: string | null;
  check_out_lat: number | null;
  check_out_lng: number | null;
  check_out_address: string | null;
  break_minutes: number;
  total_hours: number | null;
  overtime_hours: number | null;
  notes: string | null;
  clock_events: ClockEvent[];
  created_at: string;
  updated_at: string;
  // Joined fields
  worker?: Profile;
}

// =============================================================================
// SCHEDULING (CPM Extensions)
// =============================================================================

export type DependencyType = 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';

export interface DependencyLink {
  id: string;
  project_id: string;
  task_id: string;
  predecessor_task_id: string;
  dependency_type: DependencyType;
  lag_days: number;
  created_at: string;
}

/** CPM-augmented fields added to ProjectTask via migration 018 */
export interface ScheduledTaskFields {
  duration_days: number | null;
  task_type: string | null;
  early_start: number | null;
  early_finish: number | null;
  late_start: number | null;
  late_finish: number | null;
  slack: number | null;
  is_critical: boolean;
}

// =============================================================================
// CONCRETE TRACKING
// =============================================================================

export type ConcreteOrderStatus = 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type TruckLoadStatus = 'scheduled' | 'dispatched' | 'in_transit' | 'on_site' | 'pouring' | 'completed';

export interface ConcreteOrder {
  id: string;
  organization_id: string;
  project_id: string;
  order_code: string;
  supplier: string;
  mix_design: string | null;
  planned_volume: number;
  actual_volume: number | null;
  pour_date: string;
  pour_location: string | null;
  slump_spec: string | null;
  strength_spec: string | null;
  status: ConcreteOrderStatus;
  notes: string | null;
  created_by_id: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  truck_loads?: ConcreteTruckLoad[];
}

export interface ConcreteTruckLoad {
  id: string;
  order_id: string;
  load_number: number;
  driver_name: string | null;
  truck_id: string | null;
  batch_time: string | null;
  expected_arrival: string | null;
  actual_arrival: string | null;
  volume: number | null;
  slump_test: number | null;
  air_content: number | null;
  temperature: number | null;
  lat: number | null;
  lng: number | null;
  status: TruckLoadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConcreteTrackingEvent {
  type: 'dispatched' | 'location_update' | 'arrived' | 'pour_start' | 'pour_end';
  timestamp: string;
  lat: number | null;
  lng: number | null;
  details: string | null;
}

export interface ConcretePourReport {
  order_id: string;
  total_loads: number;
  total_volume: number;
  avg_slump: number | null;
  avg_air_content: number | null;
  avg_temperature: number | null;
  duration_minutes: number | null;
}

// =============================================================================
// MATERIAL REQUESTS
// =============================================================================

export type MaterialRequestStatus = 'draft' | 'submitted' | 'approved' | 'ordered' | 'delivered' | 'cancelled';
export type MaterialUrgency = 'low' | 'medium' | 'high' | 'critical';

export interface MaterialItem {
  name: string;
  quantity: number;
  unit: string;
  specifications: string | null;
  estimated_cost: number | null;
}

export interface MaterialRequest {
  id: string;
  organization_id: string;
  project_id: string;
  requested_by_id: string;
  request_number: string | null;
  items: MaterialItem[];
  urgency: MaterialUrgency;
  needed_by_date: string | null;
  delivery_date: string | null;
  delivery_location: string | null;
  supplier: string | null;
  total_estimated_cost: number | null;
  actual_cost: number | null;
  status: MaterialRequestStatus;
  approved_by_id: string | null;
  approved_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  requested_by?: Profile;
  approved_by?: Profile;
}

// =============================================================================
// FIELD RFIs
// =============================================================================

export type RFIPriority = 'low' | 'medium' | 'high' | 'urgent';
export type RFIStatus = 'draft' | 'open' | 'in_review' | 'answered' | 'closed';
export type RFIMessageType = 'question' | 'response' | 'comment' | 'clarification';

export interface FieldRFI extends SoftDeletable {
  id: string;
  organization_id: string;
  project_id: string;
  rfi_number: string;
  subject: string;
  question: string;
  context: string | null;
  priority: RFIPriority;
  status: RFIStatus;
  created_by_id: string;
  assigned_to_id: string | null;
  response: string | null;
  responded_by_id: string | null;
  responded_at: string | null;
  due_date: string | null;
  cost_impact: number | null;
  schedule_impact_days: number | null;
  attachments: string[];
  created_at: string;
  updated_at: string;
  // Joined fields
  created_by?: Profile;
  assigned_to?: Profile;
  communications?: RFICommunication[];
}

export interface RFICommunication {
  id: string;
  rfi_id: string;
  sender_id: string;
  message: string;
  message_type: RFIMessageType;
  attachments: string[];
  created_at: string;
  // Joined fields
  sender?: Profile;
}

export interface RFIAttachment {
  id: string;
  rfi_id: string;
  communication_id: string | null;
  file_url: string;
  file_name: string;
  file_size_bytes: number | null;
  mime_type: string | null;
  uploaded_by_id: string;
  created_at: string;
}

// =============================================================================
// WORK AREA NOTIFICATIONS
// =============================================================================

export type FieldNotificationType =
  | 'daily_report_published'
  | 'disruption_logged'
  | 'decision_needed'
  | 'milestone_reached'
  | 'safety_incident'
  | 'material_delivered'
  | 'inspection_scheduled'
  | 'rfi_response';

export interface WorkAreaNotification {
  id: string;
  organization_id: string;
  project_id: string;
  work_area_id: string | null;
  notification_type: FieldNotificationType;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'alert';
  action_required: boolean;
  action_label: string | null;
  action_href: string | null;
  read: boolean;
  created_at: string;
}
