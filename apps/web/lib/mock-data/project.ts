import type {
  ComplianceRuleset,
  ExecutionSequence,
  SequenceStep,
  Project,
  ProjectMember,
  ProjectCounters,
  ProjectSequenceInstance,
  ProjectStage,
  ProjectTask,
  TaskGate,
  TimelineEvent,
  Decision,
  DailyReport,
  Proposal,
  ScheduledWorkDay,
  ClientNotification,
} from '@renonext/shared/types';

// =============================================================================
// USERS (minimal profile stubs for joined fields)
// =============================================================================

const CLIENT_ID = 'c1000000-0000-0000-0000-000000000001';
const CONTRACTOR_ID = 'p2000000-0000-0000-0000-000000000002';
const PROJECT_ID = 'pr300000-0000-0000-0000-000000000003';
const JOB_ID = 'j4000000-0000-0000-0000-000000000004';
const SEQUENCE_ID = 'sq500000-0000-0000-0000-000000000005';
const PROPOSAL_ID = 'pp600000-0000-0000-0000-000000000006';
const RULESET_ID = 'rs700000-0000-0000-0000-000000000007';

const mockClient = {
  id: CLIENT_ID,
  email: 'sarah.chen@example.com',
  full_name: 'Sarah Chen',
  phone: '+1-416-555-0101',
  avatar_url: null,
  role: 'client' as const,
  is_verified: true,
  created_at: '2025-09-15T10:00:00Z',
  updated_at: '2025-09-15T10:00:00Z',
};

const mockContractor = {
  id: CONTRACTOR_ID,
  email: 'mike.dubois@example.com',
  full_name: 'Mike Dubois',
  phone: '+1-416-555-0202',
  avatar_url: null,
  role: 'pro' as const,
  is_verified: true,
  created_at: '2024-03-01T10:00:00Z',
  updated_at: '2025-12-01T10:00:00Z',
};

// =============================================================================
// COMPLIANCE RULESET — Ontario Waterproofing
// =============================================================================

export const mockComplianceRuleset: ComplianceRuleset = {
  id: RULESET_ID,
  region: 'ON',
  trade_type: 'WP',
  name: 'Waterproofing Compliance (Ontario)',
  rules: {
    required_permits: [
      { type: 'building_permit', description: 'Building permit for foundation work', issuing_body: 'Municipal Building Department' },
    ],
    required_inspections: [
      { type: 'foundation_excavation', stage: 'post_excavation', description: 'Foundation excavation inspection', authority: 'Municipal Building Inspector' },
      { type: 'membrane_application', stage: 'post_waterproofing', description: 'Waterproof membrane inspection', authority: 'Municipal Building Inspector' },
      { type: 'backfill', stage: 'pre_backfill', description: 'Pre-backfill inspection', authority: 'Municipal Building Inspector' },
    ],
    code_references: [
      { code: 'OBC', section: '9.13', description: 'Dampproofing and Waterproofing' },
      { code: 'OBC', section: '9.13.2', description: 'Materials for waterproofing' },
      { code: 'OBC', section: '9.14', description: 'Drainage — Foundation' },
    ],
  },
  version: 1,
  effective_date: '2024-01-01',
  supersedes_id: null,
  is_active: true,
  notes: 'Ontario Building Code Part 9 residential waterproofing requirements',
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
};

// =============================================================================
// EXECUTION SEQUENCE — Basement Waterproofing (12 steps)
// =============================================================================

export const mockSequenceSteps: SequenceStep[] = [
  {
    id: 'ss-001', sequence_id: SEQUENCE_ID, step_number: 1,
    title: 'Excavation Planning & Utility Locate',
    description: 'Survey excavation area. Call Ontario One-Call for utility locates. Mark dig zone.',
    plain_language_summary: 'We mark exactly where we need to dig and check for underground pipes and wires first.',
    what_to_expect: 'You\'ll see utility markers on your lawn. This takes 1-2 days before digging starts.',
    expected_duration_days: 2, min_crew_size: 2, required_crew_types: ['excavator_operator', 'laborer'],
    requires_inspection: false, inspection_type: null,
    requires_submittal: false, submittal_types: [],
    requires_permit: true, requires_jsa: true, requires_client_approval: false,
    depends_on_steps: [], is_milestone: false, triggers_payment: false, is_critical_path: true,
    typical_cost_percent: 5, safety_notes: 'Check for underground utilities before any digging',
    quality_criteria: 'All utilities located and marked; dig zone clearly defined',
    industry_standard: true,
    skip_risk_description: 'Hitting a gas line or water main during excavation',
    resale_impact_note: null,
    code_reference: 'OBC 9.13', authority_body: 'Ontario One-Call',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-002', sequence_id: SEQUENCE_ID, step_number: 2,
    title: 'Foundation Excavation',
    description: 'Excavate around foundation to footing level. Maintain safe slope angles. Protect adjacent structures.',
    plain_language_summary: 'We carefully dig down along your foundation wall until we reach the bottom (the footing).',
    what_to_expect: 'Heavy equipment in your yard for 1-3 days. The trench will be 4-6 feet deep.',
    expected_duration_days: 3, min_crew_size: 3, required_crew_types: ['excavator_operator', 'laborer'],
    requires_inspection: true, inspection_type: 'foundation_excavation',
    requires_submittal: false, submittal_types: [],
    requires_permit: false, requires_jsa: true, requires_client_approval: false,
    depends_on_steps: [1], is_milestone: true, triggers_payment: true, is_critical_path: true,
    typical_cost_percent: 20, safety_notes: 'Trench shoring required for depths > 4 feet',
    quality_criteria: 'Excavation reaches footing; walls exposed fully; no damage to footing',
    industry_standard: true,
    skip_risk_description: 'Cannot apply waterproofing without access to foundation wall',
    resale_impact_note: 'Proper excavation depth ensures complete waterproofing coverage',
    code_reference: 'OBC 9.13.2', authority_body: 'Municipal Building Department',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-003', sequence_id: SEQUENCE_ID, step_number: 3,
    title: 'Foundation Wall Cleaning & Repair',
    description: 'Power wash foundation wall. Patch cracks with hydraulic cement. Fill voids. Ensure surface is clean and dry.',
    plain_language_summary: 'We clean the foundation wall and fix any cracks before applying the waterproofing.',
    what_to_expect: 'Power washing and patching. 1 day for cleaning, then curing time for patches.',
    expected_duration_days: 2, min_crew_size: 2, required_crew_types: ['waterproofing_tech', 'laborer'],
    requires_inspection: false, inspection_type: null,
    requires_submittal: true, submittal_types: ['hydraulic_cement_spec'],
    requires_permit: false, requires_jsa: true, requires_client_approval: false,
    depends_on_steps: [2], is_milestone: false, triggers_payment: false, is_critical_path: true,
    typical_cost_percent: 8, safety_notes: 'Wear eye protection during power washing',
    quality_criteria: 'All cracks filled; surface clean and dry; no loose material',
    industry_standard: true,
    skip_risk_description: 'Waterproofing membrane will not adhere to dirty or cracked surfaces',
    resale_impact_note: null,
    code_reference: 'OBC 9.13.2', authority_body: 'Ontario Building Code',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-004', sequence_id: SEQUENCE_ID, step_number: 4,
    title: 'Apply Waterproof Membrane',
    description: 'Apply rubberized asphalt membrane from footing to grade line. Minimum 60 mil thickness. Overlap seams 6 inches.',
    plain_language_summary: 'We apply a thick rubber coating to the entire foundation wall. This is the main waterproof barrier.',
    what_to_expect: 'Strong smell from membrane materials. 1-2 days depending on wall area.',
    expected_duration_days: 2, min_crew_size: 3, required_crew_types: ['waterproofing_tech', 'laborer'],
    requires_inspection: true, inspection_type: 'membrane_application',
    requires_submittal: true, submittal_types: ['membrane_product_data', 'manufacturer_warranty'],
    requires_permit: false, requires_jsa: true, requires_client_approval: false,
    depends_on_steps: [3], is_milestone: true, triggers_payment: true, is_critical_path: true,
    typical_cost_percent: 25, safety_notes: 'Adequate ventilation required; no open flames near solvents',
    quality_criteria: 'Full coverage footing to grade; 60+ mil thickness; 6-inch overlaps; no pinholes',
    industry_standard: true,
    skip_risk_description: 'Without membrane, water penetrates foundation causing mold, structural damage, and health hazards',
    resale_impact_note: 'Certified waterproofing membrane adds significant resale value and is required for finished basements',
    code_reference: 'OBC 9.13.2', authority_body: 'Municipal Building Inspector',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-005', sequence_id: SEQUENCE_ID, step_number: 5,
    title: 'Install Drainage Board',
    description: 'Install dimple drainage board over membrane from footing to grade. Protects membrane during backfill.',
    plain_language_summary: 'We install a bumpy plastic board over the waterproofing to protect it and channel water down to the drain.',
    what_to_expect: 'Quick installation — usually same day as membrane inspection passes.',
    expected_duration_days: 1, min_crew_size: 2, required_crew_types: ['waterproofing_tech', 'laborer'],
    requires_inspection: false, inspection_type: null,
    requires_submittal: false, submittal_types: [],
    requires_permit: false, requires_jsa: true, requires_client_approval: false,
    depends_on_steps: [4], is_milestone: false, triggers_payment: false, is_critical_path: true,
    typical_cost_percent: 8, safety_notes: 'Secure board properly to prevent displacement during backfill',
    quality_criteria: 'Full coverage; dimples face wall; secured at top; extends to footing',
    industry_standard: true,
    skip_risk_description: 'Membrane can be damaged during backfill without drainage board protection',
    resale_impact_note: null,
    code_reference: 'OBC 9.13.2', authority_body: 'Ontario Building Code',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-006', sequence_id: SEQUENCE_ID, step_number: 6,
    title: 'Install / Replace Weeping Tile',
    description: 'Install new 4-inch perforated PVC weeping tile at footing level. Wrap in filter fabric. Connect to sump or storm.',
    plain_language_summary: 'We install a drainage pipe at the bottom of the foundation to carry water away from your house.',
    what_to_expect: 'Pipe installation along the footing. We\'ll connect it to your sump pump or storm drain.',
    expected_duration_days: 2, min_crew_size: 3, required_crew_types: ['plumber', 'laborer'],
    requires_inspection: true, inspection_type: 'drainage_installation',
    requires_submittal: false, submittal_types: [],
    requires_permit: false, requires_jsa: true, requires_client_approval: false,
    depends_on_steps: [4], is_milestone: false, triggers_payment: false, is_critical_path: true,
    typical_cost_percent: 12, safety_notes: 'Ensure proper slope for drainage (1/8 inch per foot minimum)',
    quality_criteria: 'Proper slope; filter fabric wrap; clean gravel bed; connected to discharge',
    industry_standard: true,
    skip_risk_description: 'Without weeping tile, hydrostatic pressure builds against foundation causing cracks and leaks',
    resale_impact_note: 'New weeping tile is a major selling point for homes with basement waterproofing',
    code_reference: 'OBC 9.14', authority_body: 'Municipal Building Inspector',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-007', sequence_id: SEQUENCE_ID, step_number: 7,
    title: 'Place Clear Gravel & Filter Fabric',
    description: 'Place 12 inches of clear gravel around weeping tile. Cover with filter fabric to prevent silting.',
    plain_language_summary: 'We surround the drain pipe with gravel so water flows easily into it, then cover it so dirt doesn\'t clog it.',
    what_to_expect: 'Gravel delivery and placement. Usually done same day as weeping tile.',
    expected_duration_days: 1, min_crew_size: 2, required_crew_types: ['laborer'],
    requires_inspection: false, inspection_type: null,
    requires_submittal: false, submittal_types: [],
    requires_permit: false, requires_jsa: true, requires_client_approval: false,
    depends_on_steps: [6], is_milestone: false, triggers_payment: false, is_critical_path: false,
    typical_cost_percent: 5, safety_notes: null,
    quality_criteria: '12-inch gravel bed; clean stone; filter fabric covers gravel completely',
    industry_standard: true,
    skip_risk_description: 'Weeping tile will silt up within 2-5 years without proper gravel and filter fabric',
    resale_impact_note: null,
    code_reference: 'OBC 9.14', authority_body: 'Ontario Building Code',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-008', sequence_id: SEQUENCE_ID, step_number: 8,
    title: 'Pre-Backfill Inspection',
    description: 'City inspector verifies membrane, drainage board, weeping tile, gravel, and connections before burial.',
    plain_language_summary: 'The city inspector checks everything before we bury it. This is your proof that the work was done right.',
    what_to_expect: 'Inspector visit. We\'ll schedule this and be on-site. Takes about 1 hour.',
    expected_duration_days: 1, min_crew_size: 1, required_crew_types: ['waterproofing_tech'],
    requires_inspection: true, inspection_type: 'pre_backfill',
    requires_submittal: false, submittal_types: [],
    requires_permit: false, requires_jsa: false, requires_client_approval: false,
    depends_on_steps: [5, 7], is_milestone: true, triggers_payment: true, is_critical_path: true,
    typical_cost_percent: 0, safety_notes: null,
    quality_criteria: 'City inspector signs off on all waterproofing, drainage, and gravel installation',
    industry_standard: true,
    skip_risk_description: 'Burying work without inspection means no official record it was done to code',
    resale_impact_note: 'Passed inspection certificate is invaluable for resale — proves work was done properly',
    code_reference: 'OBC 9.13', authority_body: 'Municipal Building Inspector',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-009', sequence_id: SEQUENCE_ID, step_number: 9,
    title: 'Backfill & Compact',
    description: 'Backfill excavation with approved fill material. Compact in 12-inch lifts. Grade away from foundation.',
    plain_language_summary: 'We fill the trench back in, compacting the soil in layers so it doesn\'t settle later.',
    what_to_expect: 'Heavy equipment returns. Your yard will look rough — final grading comes next.',
    expected_duration_days: 2, min_crew_size: 3, required_crew_types: ['excavator_operator', 'laborer'],
    requires_inspection: false, inspection_type: null,
    requires_submittal: false, submittal_types: [],
    requires_permit: false, requires_jsa: true, requires_client_approval: false,
    depends_on_steps: [8], is_milestone: false, triggers_payment: false, is_critical_path: true,
    typical_cost_percent: 10, safety_notes: 'Maintain safe slope angles during backfill; keep people away from trench edge',
    quality_criteria: 'Compacted in lifts; positive grade away from foundation; no debris in fill',
    industry_standard: true,
    skip_risk_description: 'Improper compaction causes settlement, which directs water toward foundation',
    resale_impact_note: null,
    code_reference: 'OBC 9.14', authority_body: 'Ontario Building Code',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ss-010', sequence_id: SEQUENCE_ID, step_number: 10,
    title: 'Grade, Seed & Restore Landscape',
    description: 'Final grading with positive slope from foundation. Seed/sod disturbed areas. Restore hardscape.',
    plain_language_summary: 'We shape your yard so water flows away from the house, then restore the lawn and landscape.',
    what_to_expect: 'Your yard will look like a construction zone, then gradually return to normal over 2-4 weeks.',
    expected_duration_days: 2, min_crew_size: 2, required_crew_types: ['laborer', 'landscaper'],
    requires_inspection: false, inspection_type: null,
    requires_submittal: false, submittal_types: [],
    requires_permit: false, requires_jsa: false, requires_client_approval: true,
    depends_on_steps: [9], is_milestone: true, triggers_payment: true, is_critical_path: false,
    typical_cost_percent: 7, safety_notes: null,
    quality_criteria: 'Positive grade 6+ inches over first 10 feet; seed/sod applied; hardscape restored',
    industry_standard: true,
    skip_risk_description: 'Poor grading directs surface water back toward foundation, defeating the waterproofing',
    resale_impact_note: 'Proper grading is visible proof of professional work',
    code_reference: 'OBC 9.14', authority_body: 'Ontario Building Code',
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
];

export const mockExecutionSequence: ExecutionSequence = {
  id: SEQUENCE_ID,
  created_by_id: CONTRACTOR_ID,
  trade_type: 'WP',
  category_id: null,
  name: 'Residential Basement Waterproofing — Exterior',
  description: 'Complete exterior basement waterproofing including excavation, membrane, drainage, and landscape restoration.',
  plain_language_summary: 'A proven 10-step process to waterproof your basement from the outside — the gold standard method.',
  source: 'contractor_template',
  is_public: true,
  is_verified: true,
  ruleset_id: RULESET_ID,
  region: 'ON',
  assembly_id: null, // v1: hardcoded waterproofing assembly, no DB reference yet
  version: 1,
  times_used: 14,
  avg_rating: 4.8,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2025-06-01T00:00:00Z',
  updated_at: '2026-01-15T00:00:00Z',
  steps: mockSequenceSteps,
  ruleset: mockComplianceRuleset,
};

// =============================================================================
// PROJECT
// =============================================================================

export const mockProject: Project = {
  id: PROJECT_ID,
  job_id: JOB_ID,
  client_id: CLIENT_ID,
  contractor_id: CONTRACTOR_ID,
  organization_id: null,
  title: 'Basement Waterproofing — 123 Maple Ave',
  address: '123 Maple Avenue, Toronto, ON M4E 1W3',
  lat: 43.6762,
  lng: -79.2930,
  planned_start: '2026-03-03',
  planned_end: '2026-03-21',
  actual_start: '2026-03-03',
  actual_end: null,
  contract_value: 18500.00,
  approved_changes: 0,
  spent_to_date: 7400.00,
  schedule_confidence: 88.0,
  cost_performance: 1.02,
  schedule_performance: 0.95,
  percent_complete: 40,
  status: 'active',
  health: 'on_track',
  open_decisions: 1,
  open_rfis: 0,
  open_issues: 0,
  workers_on_site: 3,
  // Closeout — null (project still active)
  closeout_started_at: null, substantial_completion_at: null, final_completion_at: null,
  certificate_of_occupancy: null, warranty_start_date: null, warranty_end_date: null,
  // Retainage
  retainage_percent: 10.00, retainage_released: false, retainage_released_at: null,
  // Site Logistics
  site_plan_url: null,
  site_access_notes: 'Rear lane access only. No parking on Maple Ave during school hours (8-9am, 3-4pm).',
  work_hours: { start: '07:00', end: '16:00', restrictions: 'No heavy equipment before 8am', saturday: false, sunday: false },
  // Post-Project — null (project still active)
  debrief_completed_at: null, lessons_learned: [],
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2026-02-28T10:00:00Z',
  updated_at: '2026-03-10T17:30:00Z',
  client: mockClient,
  contractor: mockContractor,
};

// =============================================================================
// PROJECT MEMBERS
// =============================================================================

export const mockProjectMembers: ProjectMember[] = [
  {
    id: 'pm-001', project_id: PROJECT_ID, user_id: CLIENT_ID,
    role: 'client', company: null,
    permissions: { view_finances: true, approve_decisions: true },
    is_active: true, invited_at: null, accepted_at: '2026-02-28T10:00:00Z',
    created_at: '2026-02-28T10:00:00Z',
    user: mockClient,
  },
  {
    id: 'pm-002', project_id: PROJECT_ID, user_id: CONTRACTOR_ID,
    role: 'contractor', company: 'Dubois Waterproofing Ltd.',
    permissions: { manage_tasks: true, manage_crew: true, edit_daily_log: true },
    is_active: true, invited_at: null, accepted_at: '2026-02-28T10:00:00Z',
    created_at: '2026-02-28T10:00:00Z',
    user: mockContractor,
  },
];

// =============================================================================
// PROJECT COUNTERS
// =============================================================================

export const mockProjectCounters: ProjectCounters = {
  project_id: PROJECT_ID,
  next_rfi: 1,
  next_submittal: 3,
  next_issue: 1,
  next_change_event: 1,
  next_change_order: 1,
  next_drawing: 1,
};

// =============================================================================
// PROJECT SEQUENCE INSTANCE (locked blueprint)
// =============================================================================

export const mockSequenceInstance: ProjectSequenceInstance = {
  id: 'psi-001',
  project_id: PROJECT_ID,
  sequence_id: SEQUENCE_ID,
  sequence_version: 1,
  steps_snapshot: mockSequenceSteps,
  ruleset_snapshot: mockComplianceRuleset.rules,
  assembly_params: {},  // v1: uses hardcoded defaults, no overrides yet
  presented_at: '2026-02-20T14:00:00Z',
  approved_by_client: true,
  approved_at: '2026-02-22T09:30:00Z',
  locked: true,
  customized: false,
  customization_notes: null,
  created_at: '2026-02-20T14:00:00Z',
  updated_at: '2026-02-22T09:30:00Z',
};

// =============================================================================
// PROJECT STAGES (3 stages for waterproofing)
// =============================================================================

export const mockProjectStages: ProjectStage[] = [
  {
    id: 'ps-001', project_id: PROJECT_ID, stage_number: 1,
    title: 'Preparation & Excavation',
    description: 'Site preparation, utility locates, and foundation excavation.',
    plain_description: 'Getting the site ready and digging down to expose the foundation.',
    what_to_expect: 'You\'ll see heavy equipment arrive. Your yard will be disrupted. This is the noisiest phase.',
    safety_notes: 'Stay away from the open trench. It\'s deep and the edges can collapse.',
    estimated_duration_days: 5, planned_start: '2026-03-03', planned_end: '2026-03-07',
    actual_start: '2026-03-03', actual_end: '2026-03-07',
    status: 'completed', blocked_reason: null, percent_complete: 100,
    completion_criteria: [
      { type: 'inspection', reference_id: 'tg-002', satisfied: true, satisfied_at: '2026-03-07T15:00:00Z' },
    ],
    triggers_payment: true, payment_amount: 5550.00, payment_released: true,
    baseline_start: '2026-03-03', baseline_end: '2026-03-07',
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-28T10:00:00Z', updated_at: '2026-03-07T16:00:00Z',
  },
  {
    id: 'ps-002', project_id: PROJECT_ID, stage_number: 2,
    title: 'Waterproofing & Drainage',
    description: 'Wall repair, membrane application, drainage board, weeping tile, and gravel installation.',
    plain_description: 'The main waterproofing work — coating the walls and installing the drainage system.',
    what_to_expect: 'Strong chemical smells from the membrane. Multiple inspections needed before we can bury the work.',
    safety_notes: 'The membrane materials have strong fumes. Keep windows closed on the dig side.',
    estimated_duration_days: 7, planned_start: '2026-03-10', planned_end: '2026-03-14',
    actual_start: '2026-03-10', actual_end: null,
    status: 'active', blocked_reason: null, percent_complete: 45,
    completion_criteria: [
      { type: 'inspection', reference_id: 'tg-membrane', satisfied: true, satisfied_at: '2026-03-11T14:00:00Z' },
      { type: 'inspection', reference_id: 'tg-prebackfill', satisfied: false },
    ],
    triggers_payment: true, payment_amount: 9250.00, payment_released: false,
    baseline_start: '2026-03-10', baseline_end: '2026-03-14',
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-28T10:00:00Z', updated_at: '2026-03-10T17:30:00Z',
  },
  {
    id: 'ps-003', project_id: PROJECT_ID, stage_number: 3,
    title: 'Backfill & Restoration',
    description: 'Backfill, compaction, grading, and landscape restoration.',
    plain_description: 'Filling the trench back in and making your yard look like new.',
    what_to_expect: 'Heavy equipment one more time, then landscaping. Your yard will settle over 2-4 weeks.',
    safety_notes: null,
    estimated_duration_days: 4, planned_start: '2026-03-17', planned_end: '2026-03-21',
    actual_start: null, actual_end: null,
    status: 'not_started', blocked_reason: null, percent_complete: 0,
    completion_criteria: [
      { type: 'client_approval', satisfied: false },
    ],
    triggers_payment: true, payment_amount: 3700.00, payment_released: false,
    baseline_start: '2026-03-17', baseline_end: '2026-03-21',
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-28T10:00:00Z', updated_at: '2026-02-28T10:00:00Z',
  },
];

// =============================================================================
// PROJECT TASKS (subset — stage 2 tasks showing current work)
// =============================================================================

export const mockProjectTasks: ProjectTask[] = [
  {
    id: 'pt-003', project_id: PROJECT_ID, stage_id: 'ps-002',
    title: 'Foundation Wall Cleaning & Repair',
    description: 'Power wash and patch cracks with hydraulic cement.',
    plain_description: 'Clean the wall and fix cracks.',
    assigned_worker_id: CONTRACTOR_ID, assigned_company: 'Dubois Waterproofing Ltd.',
    planned_start: '2026-03-10', planned_end: '2026-03-11',
    actual_start: '2026-03-10', actual_end: '2026-03-10',
    estimated_hours: 8, actual_hours: 6, estimated_cost: 1200, actual_cost: 1100,
    percent_complete: 100, status: 'completed',
    depends_on: [], sort_order: 3, is_milestone: false,
    baseline_start: '2026-03-10', baseline_end: '2026-03-11', cost_code: null,
    duration_days: 2, task_type: null, early_start: null, early_finish: null,
    late_start: null, late_finish: null, slack: null, is_critical: false,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-28T10:00:00Z', updated_at: '2026-03-10T16:00:00Z',
  },
  {
    id: 'pt-004', project_id: PROJECT_ID, stage_id: 'ps-002',
    title: 'Apply Waterproof Membrane',
    description: 'Apply rubberized asphalt membrane from footing to grade line.',
    plain_description: 'Apply the main waterproof coating to the wall.',
    assigned_worker_id: CONTRACTOR_ID, assigned_company: 'Dubois Waterproofing Ltd.',
    planned_start: '2026-03-11', planned_end: '2026-03-12',
    actual_start: '2026-03-11', actual_end: '2026-03-11',
    estimated_hours: 12, actual_hours: 10, estimated_cost: 4500, actual_cost: 4500,
    percent_complete: 100, status: 'completed',
    depends_on: ['pt-003'], sort_order: 4, is_milestone: true,
    baseline_start: '2026-03-11', baseline_end: '2026-03-12', cost_code: null,
    duration_days: 2, task_type: null, early_start: null, early_finish: null,
    late_start: null, late_finish: null, slack: null, is_critical: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-28T10:00:00Z', updated_at: '2026-03-11T17:00:00Z',
  },
  {
    id: 'pt-005', project_id: PROJECT_ID, stage_id: 'ps-002',
    title: 'Install Drainage Board',
    description: 'Install dimple drainage board over membrane.',
    plain_description: 'Install the protection board over the waterproofing.',
    assigned_worker_id: CONTRACTOR_ID, assigned_company: 'Dubois Waterproofing Ltd.',
    planned_start: '2026-03-12', planned_end: '2026-03-12',
    actual_start: '2026-03-12', actual_end: null,
    estimated_hours: 6, actual_hours: null, estimated_cost: 1400, actual_cost: null,
    percent_complete: 60, status: 'in_progress',
    depends_on: ['pt-004'], sort_order: 5, is_milestone: false,
    baseline_start: '2026-03-12', baseline_end: '2026-03-12', cost_code: null,
    duration_days: 1, task_type: null, early_start: null, early_finish: null,
    late_start: null, late_finish: null, slack: null, is_critical: false,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-28T10:00:00Z', updated_at: '2026-03-12T14:00:00Z',
  },
  {
    id: 'pt-006', project_id: PROJECT_ID, stage_id: 'ps-002',
    title: 'Install / Replace Weeping Tile',
    description: 'Install 4-inch perforated PVC weeping tile at footing level.',
    plain_description: 'Install the drain pipe at the bottom of the foundation.',
    assigned_worker_id: null, assigned_company: 'Dubois Waterproofing Ltd.',
    planned_start: '2026-03-12', planned_end: '2026-03-13',
    actual_start: null, actual_end: null,
    estimated_hours: 10, actual_hours: null, estimated_cost: 2200, actual_cost: null,
    percent_complete: 0, status: 'pending',
    depends_on: ['pt-004'], sort_order: 6, is_milestone: false,
    baseline_start: '2026-03-12', baseline_end: '2026-03-13', cost_code: null,
    duration_days: 2, task_type: null, early_start: null, early_finish: null,
    late_start: null, late_finish: null, slack: null, is_critical: false,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-28T10:00:00Z', updated_at: '2026-02-28T10:00:00Z',
  },
];

// =============================================================================
// TASK GATES (on current tasks)
// =============================================================================

export const mockTaskGates: TaskGate[] = [
  {
    id: 'tg-001', task_id: 'pt-004', gate_type: 'submittal_approved',
    title: 'Membrane product data sheet',
    description: 'Manufacturer data sheet for waterproofing membrane must be submitted and approved.',
    reference_id: null, reference_type: 'submittal',
    required: true, status: 'satisfied',
    satisfied_at: '2026-03-10T11:00:00Z', satisfied_by: 'Manufacturer submittal received',
    waived_by_id: null, waiver_reason: null,
    bypassed: false, bypassed_at: null, bypassed_by_id: null,
    bypass_reason: null, bypass_liability_acknowledgment: false,
    created_at: '2026-02-28T10:00:00Z',
  },
  {
    id: 'tg-002', task_id: 'pt-004', gate_type: 'inspection_passed',
    title: 'Membrane application inspection',
    description: 'City inspector must verify membrane coverage, thickness, and overlap.',
    reference_id: null, reference_type: 'inspection',
    required: true, status: 'satisfied',
    satisfied_at: '2026-03-11T14:00:00Z', satisfied_by: 'Inspector J. Thompson, City of Toronto',
    waived_by_id: null, waiver_reason: null,
    bypassed: false, bypassed_at: null, bypassed_by_id: null,
    bypass_reason: null, bypass_liability_acknowledgment: false,
    created_at: '2026-02-28T10:00:00Z',
  },
  {
    id: 'tg-003', task_id: 'pt-006', gate_type: 'previous_task_complete',
    title: 'Membrane must be applied first',
    description: 'Weeping tile installation requires membrane to be complete.',
    reference_id: 'pt-004', reference_type: 'task',
    required: true, status: 'satisfied',
    satisfied_at: '2026-03-11T17:00:00Z', satisfied_by: 'Task completed',
    waived_by_id: null, waiver_reason: null,
    bypassed: false, bypassed_at: null, bypassed_by_id: null,
    bypass_reason: null, bypass_liability_acknowledgment: false,
    created_at: '2026-02-28T10:00:00Z',
  },
  {
    id: 'tg-004', task_id: 'pt-006', gate_type: 'materials_delivered',
    title: 'Weeping tile and filter fabric delivered',
    description: '4-inch perforated PVC pipe, fittings, and filter fabric must be on site.',
    reference_id: null, reference_type: 'material',
    required: true, status: 'pending',
    satisfied_at: null, satisfied_by: null,
    waived_by_id: null, waiver_reason: null,
    bypassed: false, bypassed_at: null, bypassed_by_id: null,
    bypass_reason: null, bypass_liability_acknowledgment: false,
    created_at: '2026-02-28T10:00:00Z',
  },
];

// =============================================================================
// TIMELINE EVENTS
// =============================================================================

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'te-001', project_id: PROJECT_ID, event_type: 'project_created',
    source_entity_id: PROJECT_ID, source_entity_type: 'project',
    actor_id: null, title: 'Project Created',
    description: 'Project created from accepted proposal.',
    plain_language_summary: 'Your basement waterproofing project has officially started.',
    metadata: { proposal_id: PROPOSAL_ID }, is_client_visible: true,
    created_at: '2026-02-28T10:00:00Z',
  },
  {
    id: 'te-002', project_id: PROJECT_ID, event_type: 'stage_started',
    source_entity_id: 'ps-001', source_entity_type: 'stage',
    actor_id: CONTRACTOR_ID, title: 'Stage 1 Started: Preparation & Excavation',
    description: 'Crew arrived on site. Utility locates confirmed.',
    plain_language_summary: 'The team is on site and the digging begins today.',
    metadata: {}, is_client_visible: true,
    created_at: '2026-03-03T08:00:00Z',
  },
  {
    id: 'te-003', project_id: PROJECT_ID, event_type: 'inspection_passed',
    source_entity_id: 'tg-002', source_entity_type: 'task_gate',
    actor_id: CONTRACTOR_ID, title: 'Inspection Passed: Foundation Excavation',
    description: 'Municipal inspector confirmed excavation depth and foundation exposure.',
    plain_language_summary: 'The city inspector checked the dig and confirmed everything looks good.',
    metadata: { inspector: 'J. Thompson' }, is_client_visible: true,
    created_at: '2026-03-07T15:00:00Z',
  },
  {
    id: 'te-004', project_id: PROJECT_ID, event_type: 'stage_completed',
    source_entity_id: 'ps-001', source_entity_type: 'stage',
    actor_id: CONTRACTOR_ID, title: 'Stage 1 Completed',
    description: 'Excavation complete. Foundation fully exposed. Ready for waterproofing.',
    plain_language_summary: 'Phase 1 is done — the foundation is fully exposed and ready for the waterproof coating.',
    metadata: {}, is_client_visible: true,
    created_at: '2026-03-07T16:00:00Z',
  },
  {
    id: 'te-005', project_id: PROJECT_ID, event_type: 'payment_released',
    source_entity_id: 'ps-001', source_entity_type: 'stage',
    actor_id: null, title: 'Milestone Payment Released: $5,550',
    description: 'Stage 1 payment released from escrow.',
    plain_language_summary: 'The first payment ($5,550) has been released to the contractor for completing the excavation.',
    metadata: { amount: 5550, milestone: 1 }, is_client_visible: true,
    created_at: '2026-03-07T16:30:00Z',
  },
  {
    id: 'te-006', project_id: PROJECT_ID, event_type: 'stage_started',
    source_entity_id: 'ps-002', source_entity_type: 'stage',
    actor_id: CONTRACTOR_ID, title: 'Stage 2 Started: Waterproofing & Drainage',
    description: 'Wall cleaning and crack repair underway.',
    plain_language_summary: 'The waterproofing phase has begun — they\'re cleaning the walls and fixing cracks.',
    metadata: {}, is_client_visible: true,
    created_at: '2026-03-10T08:00:00Z',
  },
  {
    id: 'te-007', project_id: PROJECT_ID, event_type: 'inspection_passed',
    source_entity_id: 'tg-002', source_entity_type: 'task_gate',
    actor_id: CONTRACTOR_ID, title: 'Inspection Passed: Membrane Application',
    description: 'Inspector verified 60+ mil thickness, full coverage, proper overlaps.',
    plain_language_summary: 'The city inspector checked the waterproof coating and confirmed it\'s properly applied.',
    metadata: { inspector: 'J. Thompson', thickness_mil: 65 }, is_client_visible: true,
    created_at: '2026-03-11T14:00:00Z',
  },
];

// =============================================================================
// DECISIONS
// =============================================================================

export const mockDecisions: Decision[] = [
  {
    id: 'dc-001', project_id: PROJECT_ID,
    decision_type: 'material_substitution',
    title: 'Drainage Board Upgrade: Standard → Premium',
    description: 'Contractor recommends upgrading from standard 8mm dimple board to premium 20mm with integrated filter fabric.',
    plain_language_summary: 'Your contractor suggests a better drainage board. It costs $450 more but lasts much longer and provides better protection.',
    requested_by_id: CONTRACTOR_ID, assigned_to_id: CLIENT_ID,
    cost_impact: 450, schedule_impact_days: 0,
    compliance_impact: 'Exceeds OBC 9.13.2 minimum requirements',
    source_entity_id: 'pt-005', source_entity_type: 'task',
    priority: 'medium', deadline: '2026-03-13',
    status: 'pending', decision_notes: null, decided_at: null,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-03-12T10:00:00Z', updated_at: '2026-03-12T10:00:00Z',
    requested_by: mockContractor, assigned_to: mockClient,
  },
];

// =============================================================================
// DAILY REPORT
// =============================================================================

export const mockDailyReports: DailyReport[] = [
  {
    id: 'dr-006', project_id: PROJECT_ID,
    report_date: '2026-03-12', created_by_id: CONTRACTOR_ID,
    workers: [
      { name: 'Mike Dubois', role: 'Supervisor', hours: 8 },
      { name: 'Jean-Pierre Lafleur', role: 'Waterproofing Tech', hours: 8 },
      { name: 'Carlos Mendes', role: 'Laborer', hours: 8 },
    ],
    tasks_performed: [
      { task_id: 'pt-005', title: 'Install Drainage Board', progress: 'In progress — 60% complete' },
    ],
    materials_delivered: [],
    weather: { temp_high: 6, temp_low: -1, conditions: 'Overcast', humidity: 70, wind_speed: 18 },
    delays: [],
    photos: ['/mock/drainage-board-1.jpg'],
    notes: 'Drainage board installation progressing well. Waiting on weeping tile delivery.',
    client_summary: 'The protection board is going up over the waterproof coating. About 60% done today — finishing tomorrow.',
    is_published: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-03-12T16:15:00Z', updated_at: '2026-03-12T16:15:00Z',
    created_by: mockContractor,
  },
  {
    id: 'dr-005', project_id: PROJECT_ID,
    report_date: '2026-03-11', created_by_id: CONTRACTOR_ID,
    workers: [
      { name: 'Mike Dubois', role: 'Supervisor', hours: 8 },
      { name: 'Jean-Pierre Lafleur', role: 'Waterproofing Tech', hours: 8 },
      { name: 'Carlos Mendes', role: 'Laborer', hours: 8 },
    ],
    tasks_performed: [
      { task_id: 'pt-004', title: 'Apply Waterproof Membrane', progress: 'Completed — full coverage footing to grade' },
    ],
    materials_delivered: [
      { material: 'Rubberized Asphalt Membrane (Blueskin WP200)', quantity: '4 rolls', cost: 2800 },
    ],
    weather: { temp_high: 8, temp_low: 2, conditions: 'Partly cloudy', humidity: 55, wind_speed: 12 },
    delays: [],
    photos: ['/mock/membrane-application-1.jpg', '/mock/membrane-application-2.jpg'],
    notes: 'Membrane applied successfully. Inspector scheduled for tomorrow morning.',
    client_summary: 'Great progress today — the waterproof coating is fully applied. City inspector comes tomorrow to verify everything.',
    is_published: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-03-11T17:00:00Z', updated_at: '2026-03-11T17:00:00Z',
    created_by: mockContractor,
  },
  {
    id: 'dr-004', project_id: PROJECT_ID,
    report_date: '2026-03-10', created_by_id: CONTRACTOR_ID,
    workers: [
      { name: 'Mike Dubois', role: 'Supervisor', hours: 8 },
      { name: 'Jean-Pierre Lafleur', role: 'Waterproofing Tech', hours: 6 },
      { name: 'Carlos Mendes', role: 'Laborer', hours: 8 },
    ],
    tasks_performed: [
      { task_id: 'pt-003', title: 'Foundation Wall Cleaning & Repair', progress: 'Completed — all cracks patched' },
    ],
    materials_delivered: [
      { material: 'Hydraulic Cement (Xypex Concentrate)', quantity: '2 pails', cost: 340 },
    ],
    weather: { temp_high: 10, temp_low: 3, conditions: 'Sunny', humidity: 40, wind_speed: 8 },
    delays: [],
    photos: ['/mock/wall-cleaning-1.jpg', '/mock/wall-patched-1.jpg'],
    notes: 'Wall cleaning and crack repair completed ahead of schedule.',
    client_summary: 'The foundation wall is clean and all cracks are sealed. Ready for the waterproof membrane tomorrow.',
    is_published: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-03-10T16:30:00Z', updated_at: '2026-03-10T16:30:00Z',
    created_by: mockContractor,
  },
  {
    id: 'dr-003', project_id: PROJECT_ID,
    report_date: '2026-03-07', created_by_id: CONTRACTOR_ID,
    workers: [
      { name: 'Mike Dubois', role: 'Supervisor', hours: 8 },
      { name: 'Andre Nguyen', role: 'Excavator Operator', hours: 8 },
      { name: 'Carlos Mendes', role: 'Laborer', hours: 8 },
    ],
    tasks_performed: [
      { task_id: 'pt-002', title: 'Foundation Excavation', progress: 'Completed — inspection passed' },
    ],
    materials_delivered: [],
    weather: { temp_high: 5, temp_low: -2, conditions: 'Clear', humidity: 35, wind_speed: 15 },
    delays: [],
    photos: ['/mock/excavation-complete-1.jpg', '/mock/excavation-complete-2.jpg', '/mock/inspection-sign-1.jpg'],
    notes: 'Excavation completed. Inspector J. Thompson confirmed depth and exposure. Stage 1 done.',
    client_summary: 'Great news — the excavation is complete and the city inspector confirmed everything looks perfect. Stage 1 is officially done!',
    is_published: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-03-07T16:00:00Z', updated_at: '2026-03-07T16:00:00Z',
    created_by: mockContractor,
  },
  {
    id: 'dr-002', project_id: PROJECT_ID,
    report_date: '2026-03-05', created_by_id: CONTRACTOR_ID,
    workers: [
      { name: 'Mike Dubois', role: 'Supervisor', hours: 8 },
      { name: 'Andre Nguyen', role: 'Excavator Operator', hours: 8 },
      { name: 'Carlos Mendes', role: 'Laborer', hours: 8 },
    ],
    tasks_performed: [
      { task_id: 'pt-002', title: 'Foundation Excavation', progress: 'In progress — 60% of wall exposed' },
    ],
    materials_delivered: [],
    weather: { temp_high: 4, temp_low: -3, conditions: 'Partly cloudy', humidity: 50, wind_speed: 20 },
    delays: [{ reason: 'weather', hours: 1, description: 'High wind pause for crane safety' }],
    photos: ['/mock/excavation-progress-1.jpg'],
    notes: 'Excavation 60% complete. Brief wind delay. On track for Friday inspection.',
    client_summary: 'Digging is about 60% done. Had a short pause due to wind but still on track for the inspection on Friday.',
    is_published: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-03-05T16:45:00Z', updated_at: '2026-03-05T16:45:00Z',
    created_by: mockContractor,
  },
  {
    id: 'dr-001', project_id: PROJECT_ID,
    report_date: '2026-03-03', created_by_id: CONTRACTOR_ID,
    workers: [
      { name: 'Mike Dubois', role: 'Supervisor', hours: 6 },
      { name: 'Andre Nguyen', role: 'Excavator Operator', hours: 4 },
    ],
    tasks_performed: [
      { task_id: 'pt-001', title: 'Excavation Planning & Utility Locate', progress: 'Completed — all utilities marked' },
    ],
    materials_delivered: [],
    weather: { temp_high: 7, temp_low: 1, conditions: 'Sunny', humidity: 45, wind_speed: 10 },
    delays: [],
    photos: ['/mock/utility-marks-1.jpg'],
    notes: 'Day 1 complete. Utility locates confirmed. Excavation starts tomorrow.',
    client_summary: 'Project kicked off today! We confirmed all underground utilities are marked and safe. Digging begins tomorrow morning.',
    is_published: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-03-03T15:00:00Z', updated_at: '2026-03-03T15:00:00Z',
    created_by: mockContractor,
  },
];

// =============================================================================
// PRO PROFILE (for proposal contractor card)
// =============================================================================

export const mockProProfile = {
  id: CONTRACTOR_ID,
  user_id: CONTRACTOR_ID,
  bio: 'Owner-operator of Dubois Waterproofing Ltd. Specializing in exterior basement waterproofing across the Greater Toronto Area since 2014. Every project is personally supervised.',
  years_experience: 12,
  avg_rating: 4.9,
  total_reviews: 47,
  total_jobs_completed: 128,
  bcin: '38291',
  bcin_verified: true,
  bcin_categories: ['Part 9 Residential Design'],
  response_time_minutes: 35,
  company_name: 'Dubois Waterproofing Ltd.',
  service_area: 'Greater Toronto Area',
  created_at: '2024-03-01T10:00:00Z',
  updated_at: '2025-12-01T10:00:00Z',
};

// =============================================================================
// PAYMENT MILESTONES (derived from project stages)
// =============================================================================

export const mockPaymentMilestones = [
  { label: 'Deposit', amount: 1850, percent: 10, dueAt: 'On signing' },
  { label: 'Excavation Complete', amount: 5550, percent: 30, dueAt: 'Stage 1 complete' },
  { label: 'Waterproofing Complete', amount: 7400, percent: 40, dueAt: 'Stage 2 complete' },
  { label: 'Final — Restoration', amount: 3700, percent: 20, dueAt: 'Stage 3 complete' },
];

// =============================================================================
// PROPOSAL
// =============================================================================

// =============================================================================
// WEEKLY SCHEDULE (Mon–Sun of active week)
// =============================================================================

export const mockWeeklySchedule: ScheduledWorkDay[] = [
  {
    id: `${PROJECT_ID}-2026-03-09`, date: '2026-03-09', day_label: 'Monday',
    work_planned: 'Foundation wall cleaning & crack repair',
    crew_size: 3, work_hours: { start: '08:00', end: '16:00' },
    disruptions: ['noise', 'dust'], disruption_notes: 'Power washing generates noise and dust — close nearby windows.',
    requires_client_home: false, is_inspection_day: false, inspection_type: null,
    weather_forecast: { condition: 'sunny', temp_high: 10, risk_level: 'low' },
  },
  {
    id: `${PROJECT_ID}-2026-03-10`, date: '2026-03-10', day_label: 'Tuesday',
    work_planned: 'Apply waterproof membrane — Layer 1',
    crew_size: 3, work_hours: { start: '07:30', end: '16:00' },
    disruptions: ['odor', 'noise'], disruption_notes: 'Membrane has strong chemical smell. Keep downwind windows closed.',
    requires_client_home: false, is_inspection_day: false, inspection_type: null,
    weather_forecast: { condition: 'sunny', temp_high: 8, risk_level: 'low' },
  },
  {
    id: `${PROJECT_ID}-2026-03-11`, date: '2026-03-11', day_label: 'Wednesday',
    work_planned: 'Membrane application — Layer 2 + inspector visit',
    crew_size: 3, work_hours: { start: '08:00', end: '15:00' },
    disruptions: ['odor'], disruption_notes: null,
    requires_client_home: true, is_inspection_day: true, inspection_type: 'Membrane application',
    weather_forecast: { condition: 'rain', temp_high: 6, risk_level: 'delay_likely' },
  },
  {
    id: `${PROJECT_ID}-2026-03-12`, date: '2026-03-12', day_label: 'Thursday',
    work_planned: 'Install drainage board + begin weeping tile',
    crew_size: 3, work_hours: { start: '08:00', end: '16:00' },
    disruptions: ['vibration', 'noise'], disruption_notes: 'Vibration from board attachment. Intermittent throughout the day.',
    requires_client_home: false, is_inspection_day: false, inspection_type: null,
    weather_forecast: { condition: 'sunny', temp_high: 7, risk_level: 'low' },
  },
  {
    id: `${PROJECT_ID}-2026-03-13`, date: '2026-03-13', day_label: 'Friday',
    work_planned: 'Complete weeping tile + gravel placement',
    crew_size: 4, work_hours: { start: '07:30', end: '15:30' },
    disruptions: ['noise', 'parking'], disruption_notes: 'Gravel delivery truck — driveway blocked 8–9 AM.',
    requires_client_home: false, is_inspection_day: false, inspection_type: null,
    weather_forecast: { condition: 'wind', temp_high: 4, risk_level: 'low' },
  },
  {
    id: `${PROJECT_ID}-2026-03-14`, date: '2026-03-14', day_label: 'Saturday',
    work_planned: 'No work scheduled',
    crew_size: 0, work_hours: { start: '00:00', end: '00:00' },
    disruptions: [], disruption_notes: null,
    requires_client_home: false, is_inspection_day: false, inspection_type: null,
  },
  {
    id: `${PROJECT_ID}-2026-03-15`, date: '2026-03-15', day_label: 'Sunday',
    work_planned: 'No work scheduled',
    crew_size: 0, work_hours: { start: '00:00', end: '00:00' },
    disruptions: [], disruption_notes: null,
    requires_client_home: false, is_inspection_day: false, inspection_type: null,
  },
];

// =============================================================================
// CLIENT NOTIFICATIONS
// =============================================================================

export const mockClientNotifications: ClientNotification[] = [
  {
    id: 'cn-001', project_id: PROJECT_ID,
    title: 'Vibration expected Thursday',
    description: 'Drainage board installation involves drilling and hammering. Expect intermittent vibration from 8 AM to 4 PM.',
    severity: 'warning', disruption_types: ['vibration', 'noise'],
    scheduled_date: '2026-03-12', time_range: '08:00–16:00',
    action_required: false, action_label: null, action_href: null,
    read: false, created_at: '2026-03-11T17:30:00Z',
  },
  {
    id: 'cn-002', project_id: PROJECT_ID,
    title: 'Decision needed: Drainage board upgrade',
    description: 'Your contractor recommends upgrading to premium drainage board (+$450). This improves longevity and exceeds code requirements.',
    severity: 'alert', disruption_types: [],
    scheduled_date: '2026-03-12', time_range: null,
    action_required: true, action_label: 'Review Decision', action_href: `/dashboard/projects/${PROJECT_ID}?tab=alerts`,
    read: false, created_at: '2026-03-12T10:00:00Z',
  },
  {
    id: 'cn-003', project_id: PROJECT_ID,
    title: 'Inspector visit Wednesday — please be available',
    description: 'The city inspector will check the waterproof membrane. You should be reachable by phone in case questions come up.',
    severity: 'info', disruption_types: [],
    scheduled_date: '2026-03-11', time_range: '10:00–12:00',
    action_required: true, action_label: 'Confirm Availability', action_href: `/dashboard/projects/${PROJECT_ID}?tab=schedule`,
    read: true, created_at: '2026-03-10T09:00:00Z',
  },
  {
    id: 'cn-004', project_id: PROJECT_ID,
    title: 'Driveway blocked Friday morning',
    description: 'A gravel delivery truck will block your driveway from approximately 8–9 AM. Please park on the street.',
    severity: 'warning', disruption_types: ['parking'],
    scheduled_date: '2026-03-13', time_range: '08:00–09:00',
    action_required: false, action_label: null, action_href: null,
    read: false, created_at: '2026-03-12T14:00:00Z',
  },
  {
    id: 'cn-005', project_id: PROJECT_ID,
    title: 'Stage 1 payment released — $5,550',
    description: 'The excavation milestone is complete and your payment of $5,550 has been released from escrow to the contractor.',
    severity: 'info', disruption_types: [],
    scheduled_date: '2026-03-07', time_range: null,
    action_required: false, action_label: null, action_href: null,
    read: true, created_at: '2026-03-07T16:30:00Z',
  },
  {
    id: 'cn-006', project_id: PROJECT_ID,
    title: 'Rain forecast may delay Wednesday work',
    description: 'Rain is forecasted for Wednesday. Membrane application requires dry conditions — we may reschedule this step if rain persists.',
    severity: 'warning', disruption_types: [],
    scheduled_date: '2026-03-11', time_range: null,
    action_required: false, action_label: null, action_href: null,
    read: false, created_at: '2026-03-10T20:00:00Z',
  },
];

// =============================================================================
// COMMAND CENTER SELECTOR HELPER
// =============================================================================

export function getMockProjectCommandCenter(projectId: string) {
  // In production this would query by projectId; mock always returns the one project
  return {
    project: mockProject,
    schedule: mockWeeklySchedule,
    reports: mockDailyReports,
    notifications: mockClientNotifications,
    stages: mockProjectStages,
    tasks: mockProjectTasks,
    gates: mockTaskGates,
  };
}

// =============================================================================
// PROPOSAL
// =============================================================================

export const mockProposal: Proposal = {
  id: PROPOSAL_ID,
  public_token: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  contractor_id: CONTRACTOR_ID,
  job_id: JOB_ID,
  bid_id: null,
  sequence_id: SEQUENCE_ID,
  sequence_version: 1,
  steps_snapshot: mockSequenceSteps,
  ruleset_snapshot: mockComplianceRuleset.rules,
  title: 'Basement Waterproofing Proposal — 123 Maple Ave',
  cover_letter: 'Hi Sarah,\n\nThank you for considering Dubois Waterproofing for your basement project. With 12 years of experience in the GTA, we specialize in exterior waterproofing — the gold standard method.\n\nOur 10-step process includes 3 city inspections, full OBC compliance, and a 25-year transferable warranty. Every step is documented so you know exactly what\'s happening and why.\n\nI\'d be happy to walk you through the plan in person.\n\n— Mike Dubois',
  plain_language_summary: 'A 10-step plan to waterproof your basement from the outside, including 3 inspections and full building code compliance.',
  estimated_cost: 18500,
  estimated_duration_days: 18,
  estimated_start_date: '2026-03-03',
  warranty_terms: '25-year transferable warranty on waterproofing membrane. 5-year warranty on workmanship.',
  energy_tier_target: null,
  contractor_signature: { signed: true, name: 'Mike Dubois', date: '2026-02-18', ip: '192.168.1.1' },
  pdf_url: null,
  pdf_generated_at: null,
  status: 'sent',
  sent_at: '2026-02-18T15:00:00Z',
  viewed_at: '2026-02-19T09:00:00Z',
  accepted_at: '2026-02-22T09:30:00Z',
  expires_at: '2026-03-18T15:00:00Z',
  total_inspections: 3,
  total_gates: 8,
  compliance_score: 94.0,
  has_code_references: true,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2026-02-18T14:00:00Z',
  updated_at: '2026-02-22T09:30:00Z',
  contractor: mockContractor,
  sequence: mockExecutionSequence,
};
