import type {
  ExecutionSequence,
  SequenceStep,
  Proposal,
  ComplianceRuleset,
} from '@renonext/shared/types';
import {
  mockExecutionSequence,
  mockSequenceSteps,
  mockComplianceRuleset,
} from './project';

// =============================================================================
// TRADE TYPE CONFIG
// =============================================================================

export const TRADE_TYPES = {
  WP: { label: 'Waterproofing', badge: 'bg-blue-50 text-blue-700' },
  EX: { label: 'Excavation', badge: 'bg-amber-50 text-amber-700' },
  CF: { label: 'Concrete & Forming', badge: 'bg-gray-100 text-gray-700' },
  EL: { label: 'Electrical', badge: 'bg-yellow-50 text-yellow-700' },
  PL: { label: 'Plumbing', badge: 'bg-cyan-50 text-cyan-700' },
  RF: { label: 'Roofing', badge: 'bg-red-50 text-red-700' },
  HV: { label: 'HVAC', badge: 'bg-emerald-50 text-emerald-700' },
  IN: { label: 'Insulation', badge: 'bg-violet-50 text-violet-700' },
} as const;

export type TradeType = keyof typeof TRADE_TYPES;

// =============================================================================
// PROPOSAL STATUS STYLES
// =============================================================================

export const PROPOSAL_STATUS_STYLES = {
  draft: { label: 'Draft', bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  sent: { label: 'Sent', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  viewed: { label: 'Viewed', bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  accepted: { label: 'Accepted', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  declined: { label: 'Declined', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  expired: { label: 'Expired', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  withdrawn: { label: 'Withdrawn', bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
} as const;

// =============================================================================
// CONTRACTOR ID (shared across mock data)
// =============================================================================

const CONTRACTOR_ID = 'p2000000-0000-0000-0000-000000000002';
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
// ADDITIONAL COMPLIANCE RULESETS
// =============================================================================

const electricalRuleset: ComplianceRuleset = {
  id: 'rs-el-001',
  region: 'ON',
  trade_type: 'EL',
  name: 'Electrical Compliance (Ontario)',
  rules: {
    required_permits: [
      { type: 'electrical_permit', description: 'Electrical permit required for all wiring work', issuing_body: 'Electrical Safety Authority (ESA)' },
    ],
    required_inspections: [
      { type: 'rough_in', stage: 'post_wiring', description: 'Rough-in electrical inspection', authority: 'ESA Inspector' },
      { type: 'final', stage: 'post_completion', description: 'Final electrical inspection', authority: 'ESA Inspector' },
    ],
    code_references: [
      { code: 'OESC', section: '26', description: 'Installation of Electrical Equipment' },
    ],
  },
  version: 1,
  effective_date: '2024-01-01',
  supersedes_id: null,
  is_active: true,
  notes: 'Ontario Electrical Safety Code requirements',
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
};

const roofingRuleset: ComplianceRuleset = {
  id: 'rs-rf-001',
  region: 'ON',
  trade_type: 'RF',
  name: 'Roofing Compliance (Ontario)',
  rules: {
    required_permits: [
      { type: 'building_permit', description: 'Building permit for structural roof work', issuing_body: 'Municipal Building Department' },
    ],
    required_inspections: [
      { type: 'sheathing', stage: 'post_sheathing', description: 'Roof sheathing inspection', authority: 'Municipal Building Inspector' },
      { type: 'final', stage: 'post_completion', description: 'Final roofing inspection', authority: 'Municipal Building Inspector' },
    ],
    code_references: [
      { code: 'OBC', section: '9.26', description: 'Roof Covering' },
    ],
  },
  version: 1,
  effective_date: '2024-01-01',
  supersedes_id: null,
  is_active: true,
  notes: 'Ontario Building Code Part 9 residential roofing requirements',
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
};

// =============================================================================
// MOCK LIBRARY SEQUENCES (8 total)
// =============================================================================

function makeSteps(sequenceId: string, items: Array<{
  title: string;
  summary: string;
  whatToExpect: string;
  days: number;
  inspection: boolean;
  inspectionType?: string;
  milestone: boolean;
  triggersPayment: boolean;
  criticalPath: boolean;
  costPercent: number;
  codeRef?: string;
  authority?: string;
  safetyNotes?: string;
}>): SequenceStep[] {
  return items.map((item, i) => ({
    id: `${sequenceId}-step-${i + 1}`,
    sequence_id: sequenceId,
    step_number: i + 1,
    title: item.title,
    description: item.summary,
    plain_language_summary: item.summary,
    what_to_expect: item.whatToExpect,
    expected_duration_days: item.days,
    min_crew_size: 2,
    required_crew_types: ['tech', 'laborer'],
    requires_inspection: item.inspection,
    inspection_type: item.inspectionType ?? null,
    requires_submittal: false,
    submittal_types: [],
    requires_permit: i === 0,
    requires_jsa: true,
    requires_client_approval: false,
    depends_on_steps: i > 0 ? [i] : [],
    is_milestone: item.milestone,
    triggers_payment: item.triggersPayment,
    is_critical_path: item.criticalPath,
    typical_cost_percent: item.costPercent,
    safety_notes: item.safetyNotes ?? null,
    quality_criteria: `${item.title} completed to specification`,
    industry_standard: true,
    skip_risk_description: null,
    resale_impact_note: null,
    code_reference: item.codeRef ?? null,
    authority_body: item.authority ?? null,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  }));
}

// Sequence 1: Re-use the waterproofing from project.ts
const seq1: ExecutionSequence = { ...mockExecutionSequence };

// Sequence 2: Excavation — Basement Dig & Shore
const seq2Steps = makeSteps('sq-lib-002', [
  { title: 'Site Survey & Utility Locate', summary: 'Survey the dig area and mark all underground utilities.', whatToExpect: 'Spray-paint markings on the ground.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 5 },
  { title: 'Mobilize Equipment', summary: 'Deliver excavator and shoring materials to site.', whatToExpect: 'Heavy equipment arrives. Temporary fencing goes up.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 10 },
  { title: 'Excavate to Footing', summary: 'Dig trench to expose foundation footing.', whatToExpect: 'Loud equipment for 2-3 days. Dirt pile on your property.', days: 3, inspection: true, inspectionType: 'excavation', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 40, codeRef: 'OBC 9.13', authority: 'Municipal Inspector', safetyNotes: 'Trench shoring required > 4ft depth' },
  { title: 'Install Shoring', summary: 'Install trench boxes or hydraulic shoring for safety.', whatToExpect: 'Metal supports placed in the trench.', days: 1, inspection: true, inspectionType: 'shoring', milestone: false, triggersPayment: false, criticalPath: true, costPercent: 15, safetyNotes: 'All workers must be trained on shoring systems' },
  { title: 'Backfill & Compact', summary: 'Replace soil in layers and compact.', whatToExpect: 'Equipment running again. Soil compacted in lifts.', days: 2, inspection: false, milestone: true, triggersPayment: true, criticalPath: true, costPercent: 30 },
]);

const seq2: ExecutionSequence = {
  id: 'sq-lib-002',
  created_by_id: null,
  trade_type: 'EX',
  category_id: null,
  name: 'Basement Excavation & Shoring',
  description: 'Complete excavation to footing level with proper shoring and backfill.',
  plain_language_summary: 'A 5-step plan to safely dig around your foundation, install safety supports, and fill it back in.',
  source: 'platform_template',
  is_public: true,
  is_verified: true,
  ruleset_id: null,
  region: 'ON',
  assembly_id: null,
  version: 1,
  times_used: 42,
  avg_rating: 4.7,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2025-03-01T00:00:00Z',
  updated_at: '2026-01-10T00:00:00Z',
  steps: seq2Steps,
  ruleset: undefined,
};

// Sequence 3: Concrete Forming — Basement Walls
const seq3Steps = makeSteps('sq-lib-003', [
  { title: 'Layout & Snap Lines', summary: 'Mark wall positions on the footing.', whatToExpect: 'Chalk lines on the footing.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 5 },
  { title: 'Erect Forms', summary: 'Set up wall forms with proper bracing.', whatToExpect: 'Plywood and steel forms assembled around the perimeter.', days: 3, inspection: true, inspectionType: 'forming', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 30, codeRef: 'OBC 9.15', authority: 'Municipal Inspector' },
  { title: 'Install Rebar & Embeds', summary: 'Place reinforcing steel and anchor bolts.', whatToExpect: 'Steel bars tied inside the forms.', days: 2, inspection: true, inspectionType: 'rebar', milestone: false, triggersPayment: false, criticalPath: true, costPercent: 15, codeRef: 'OBC 9.15.4', authority: 'Municipal Inspector' },
  { title: 'Pour Concrete', summary: 'Place concrete in forms with vibration.', whatToExpect: 'Concrete trucks and pumping. Very loud. 1 day.', days: 1, inspection: false, milestone: true, triggersPayment: true, criticalPath: true, costPercent: 35, safetyNotes: 'Wet concrete is caustic — PPE required' },
  { title: 'Strip Forms & Cure', summary: 'Remove forms after curing period.', whatToExpect: 'Forms removed after 3-7 days. Walls visible.', days: 5, inspection: false, milestone: false, triggersPayment: false, criticalPath: false, costPercent: 15 },
]);

const seq3: ExecutionSequence = {
  id: 'sq-lib-003',
  created_by_id: null,
  trade_type: 'CF',
  category_id: null,
  name: 'Basement Wall Forming & Pour',
  description: 'Full cycle: layout, forms, rebar, pour, strip for residential basement walls.',
  plain_language_summary: 'Building your basement walls from scratch — forms, steel, concrete, and curing.',
  source: 'platform_template',
  is_public: true,
  is_verified: true,
  ruleset_id: null,
  region: 'ON',
  assembly_id: null,
  version: 1,
  times_used: 38,
  avg_rating: 4.6,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2025-04-01T00:00:00Z',
  updated_at: '2026-01-05T00:00:00Z',
  steps: seq3Steps,
  ruleset: undefined,
};

// Sequence 4: Electrical — Residential Panel Upgrade
const seq4Steps = makeSteps('sq-lib-004', [
  { title: 'Load Calculation & Permit Application', summary: 'Calculate electrical load and apply for ESA permit.', whatToExpect: 'Paperwork phase. 1-2 weeks for permit approval.', days: 2, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 10, codeRef: 'OESC 8', authority: 'ESA' },
  { title: 'Disconnect & Remove Old Panel', summary: 'De-energize and remove existing panel.', whatToExpect: 'Power will be off for several hours.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 15, safetyNotes: 'Lockout/tagout required' },
  { title: 'Install New Panel & Wiring', summary: 'Mount new 200A panel, run new circuits.', whatToExpect: 'Electrician on site 1-2 days. Some wall openings.', days: 2, inspection: false, milestone: true, triggersPayment: true, criticalPath: true, costPercent: 45, codeRef: 'OESC 26', authority: 'ESA' },
  { title: 'ESA Rough-In Inspection', summary: 'ESA inspector verifies wiring before closing walls.', whatToExpect: 'Inspector visit — about 1 hour.', days: 1, inspection: true, inspectionType: 'rough_in_electrical', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 0 },
  { title: 'Final Connections & ESA Final', summary: 'Connect all devices, final ESA inspection.', whatToExpect: 'Power restored. Inspector returns for final sign-off.', days: 1, inspection: true, inspectionType: 'final_electrical', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 30, codeRef: 'OESC 26', authority: 'ESA' },
]);

const seq4: ExecutionSequence = {
  id: 'sq-lib-004',
  created_by_id: CONTRACTOR_ID,
  trade_type: 'EL',
  category_id: null,
  name: 'Residential 200A Panel Upgrade',
  description: 'Full panel upgrade from 100A to 200A service with ESA compliance.',
  plain_language_summary: 'Upgrading your electrical panel to handle modern loads — permits, new panel, inspections.',
  source: 'contractor_template',
  is_public: true,
  is_verified: true,
  ruleset_id: 'rs-el-001',
  region: 'ON',
  assembly_id: null,
  version: 1,
  times_used: 23,
  avg_rating: 4.9,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2025-05-01T00:00:00Z',
  updated_at: '2026-01-20T00:00:00Z',
  steps: seq4Steps,
  ruleset: electricalRuleset,
};

// Sequence 5: Plumbing — Rough-In for Basement Bathroom
const seq5Steps = makeSteps('sq-lib-005', [
  { title: 'Break Concrete Floor', summary: 'Saw-cut and remove concrete for drain routing.', whatToExpect: 'Loud cutting. Dust. Concrete pieces removed.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 15, safetyNotes: 'Silica dust — respirator required' },
  { title: 'Install Drain Lines', summary: 'Run ABS drain and vent piping.', whatToExpect: 'Black plastic pipes laid in the trench.', days: 2, inspection: true, inspectionType: 'underground_plumbing', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 35, codeRef: 'OBC 7.2', authority: 'Municipal Inspector' },
  { title: 'Install Water Supply Lines', summary: 'Run copper or PEX supply to fixture locations.', whatToExpect: 'Copper or plastic pipes run through walls/floor.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 20 },
  { title: 'Backfill & Pour Concrete', summary: 'Fill trench and pour new concrete floor section.', whatToExpect: 'Concrete work. Floor patch will need to cure.', days: 2, inspection: true, inspectionType: 'backfill_plumbing', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 30, codeRef: 'OBC 7.2', authority: 'Municipal Inspector' },
]);

const seq5: ExecutionSequence = {
  id: 'sq-lib-005',
  created_by_id: null,
  trade_type: 'PL',
  category_id: null,
  name: 'Basement Bathroom Rough-In',
  description: 'Plumbing rough-in for basement bathroom: drains, vents, supply lines.',
  plain_language_summary: 'Getting the pipes ready for a new basement bathroom — breaking floor, laying drains, running water lines.',
  source: 'platform_template',
  is_public: true,
  is_verified: true,
  ruleset_id: null,
  region: 'ON',
  assembly_id: null,
  version: 1,
  times_used: 31,
  avg_rating: 4.5,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2025-02-15T00:00:00Z',
  updated_at: '2025-12-20T00:00:00Z',
  steps: seq5Steps,
  ruleset: undefined,
};

// Sequence 6: Roofing — Residential Re-Shingle
const seq6Steps = makeSteps('sq-lib-006', [
  { title: 'Roof Inspection & Material Order', summary: 'Inspect existing roof structure and order materials.', whatToExpect: 'Contractor on roof for 1-2 hours. Materials delivered next day.', days: 2, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 5 },
  { title: 'Tear-Off Existing Shingles', summary: 'Remove old shingles down to decking.', whatToExpect: 'Very loud. Debris falling into dumpster. 1 day for most homes.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 15, safetyNotes: 'Fall protection required at all times' },
  { title: 'Inspect & Repair Decking', summary: 'Check plywood for rot. Replace damaged sheets.', whatToExpect: 'Some areas may need new plywood. Extra cost if rot is found.', days: 1, inspection: true, inspectionType: 'sheathing', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 10, codeRef: 'OBC 9.26', authority: 'Municipal Inspector' },
  { title: 'Install Underlayment & Flashing', summary: 'Apply ice & water shield and metal flashing.', whatToExpect: 'Rolls of material applied to the roof deck.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 15 },
  { title: 'Install Shingles', summary: 'Apply architectural shingles with proper nailing pattern.', whatToExpect: 'Nailing all day. Most roofs completed in 1-2 days.', days: 2, inspection: false, milestone: true, triggersPayment: true, criticalPath: true, costPercent: 40, codeRef: 'OBC 9.26.5', authority: 'Municipal Inspector' },
  { title: 'Ridge Vent & Final Inspection', summary: 'Install ridge vent and schedule final inspection.', whatToExpect: 'Vent cap installed along the peak. Inspector visit.', days: 1, inspection: true, inspectionType: 'final_roofing', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 15, codeRef: 'OBC 9.26', authority: 'Municipal Inspector' },
]);

const seq6: ExecutionSequence = {
  id: 'sq-lib-006',
  created_by_id: CONTRACTOR_ID,
  trade_type: 'RF',
  category_id: null,
  name: 'Residential Re-Shingle (Architectural)',
  description: 'Complete tear-off and re-shingle with architectural shingles.',
  plain_language_summary: 'Replacing your entire roof — strip old shingles, fix any damage, install new architectural shingles.',
  source: 'contractor_template',
  is_public: true,
  is_verified: false,
  ruleset_id: 'rs-rf-001',
  region: 'ON',
  assembly_id: null,
  version: 1,
  times_used: 8,
  avg_rating: 4.3,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2025-08-01T00:00:00Z',
  updated_at: '2025-12-15T00:00:00Z',
  steps: seq6Steps,
  ruleset: roofingRuleset,
};

// Sequence 7: HVAC — Furnace Replacement
const seq7Steps = makeSteps('sq-lib-007', [
  { title: 'Load Calculation (Manual J)', summary: 'Calculate heating/cooling loads for proper equipment sizing.', whatToExpect: 'Technician measures your home. Takes 2-3 hours.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 10 },
  { title: 'Remove Old Furnace', summary: 'Disconnect and remove existing equipment.', whatToExpect: 'Old furnace removed. Temporary no heat/AC (same day install).', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 10, safetyNotes: 'Gas line capped before removal' },
  { title: 'Install New Furnace', summary: 'Set new furnace, connect gas, electrical, ductwork.', whatToExpect: 'New unit installed and connected. Testing same day.', days: 1, inspection: false, milestone: true, triggersPayment: true, criticalPath: true, costPercent: 50 },
  { title: 'TSSA Inspection', summary: 'Technical Standards and Safety Authority gas inspection.', whatToExpect: 'Inspector checks gas connections and venting. About 1 hour.', days: 1, inspection: true, inspectionType: 'tssa_gas', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 0 },
  { title: 'Commissioning & Handover', summary: 'System startup, thermostat programming, owner walkthrough.', whatToExpect: 'Technician shows you how to use the new system. Registers warranty.', days: 1, inspection: false, milestone: true, triggersPayment: true, criticalPath: false, costPercent: 30 },
]);

const seq7: ExecutionSequence = {
  id: 'sq-lib-007',
  created_by_id: null,
  trade_type: 'HV',
  category_id: null,
  name: 'High-Efficiency Furnace Replacement',
  description: 'Remove old furnace and install new high-efficiency unit with TSSA compliance.',
  plain_language_summary: 'Swapping your old furnace for a new high-efficiency model — properly sized, inspected, and warrantied.',
  source: 'platform_template',
  is_public: true,
  is_verified: true,
  ruleset_id: null,
  region: 'ON',
  assembly_id: null,
  version: 1,
  times_used: 56,
  avg_rating: 4.8,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2025-01-15T00:00:00Z',
  updated_at: '2026-01-25T00:00:00Z',
  steps: seq7Steps,
  ruleset: undefined,
};

// Sequence 8: Insulation — Spray Foam Basement
const seq8Steps = makeSteps('sq-lib-008', [
  { title: 'Area Prep & Masking', summary: 'Cover floors, windows, and anything that shouldn\'t get foam.', whatToExpect: 'Plastic sheeting everywhere. Area must be clear of belongings.', days: 1, inspection: false, milestone: false, triggersPayment: false, criticalPath: true, costPercent: 10 },
  { title: 'Apply Closed-Cell Spray Foam', summary: 'Spray 2-inch closed-cell foam on foundation walls.', whatToExpect: 'Strong chemical smell. Vacate the space for 24 hours.', days: 1, inspection: false, milestone: true, triggersPayment: true, criticalPath: true, costPercent: 55, safetyNotes: 'Full PPE required. Space must be evacuated during application.' },
  { title: 'Trim & Inspect', summary: 'Trim excess foam. Verify thickness and coverage.', whatToExpect: 'Trimming with a saw. Thickness measured with a gauge.', days: 1, inspection: true, inspectionType: 'insulation', milestone: true, triggersPayment: true, criticalPath: true, costPercent: 15, codeRef: 'OBC 9.25', authority: 'Municipal Inspector' },
  { title: 'Thermal Barrier & Cleanup', summary: 'Install required thermal barrier over foam. Clean up.', whatToExpect: 'Drywall or intumescent coating applied over foam.', days: 1, inspection: false, milestone: true, triggersPayment: true, criticalPath: false, costPercent: 20 },
]);

const seq8: ExecutionSequence = {
  id: 'sq-lib-008',
  created_by_id: CONTRACTOR_ID,
  trade_type: 'IN',
  category_id: null,
  name: 'Basement Spray Foam Insulation',
  description: 'Closed-cell spray foam insulation for basement foundation walls.',
  plain_language_summary: 'Insulating your basement with spray foam — the most effective method for foundation walls.',
  source: 'custom',
  is_public: false,
  is_verified: false,
  ruleset_id: null,
  region: 'ON',
  assembly_id: null,
  version: 1,
  times_used: 3,
  avg_rating: null,
  deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
  created_at: '2025-11-01T00:00:00Z',
  updated_at: '2026-01-30T00:00:00Z',
  steps: seq8Steps,
  ruleset: undefined,
};

export const mockLibrarySequences: ExecutionSequence[] = [
  seq1, seq2, seq3, seq4, seq5, seq6, seq7, seq8,
];

// =============================================================================
// MOCK CONTRACTOR PROPOSALS (6 with mixed statuses)
// =============================================================================

const JOB_ID = 'j4000000-0000-0000-0000-000000000004';

export const mockContractorProposals: Proposal[] = [
  {
    id: 'pp-cp-001',
    public_token: 'draft-token-001',
    contractor_id: CONTRACTOR_ID,
    job_id: null,
    bid_id: null,
    sequence_id: 'sq500000-0000-0000-0000-000000000005',
    sequence_version: 1,
    steps_snapshot: mockSequenceSteps,
    ruleset_snapshot: mockComplianceRuleset.rules,
    title: 'Basement Waterproofing — 45 Oak St',
    cover_letter: null,
    plain_language_summary: 'Draft proposal for exterior waterproofing.',
    estimated_cost: 16000,
    estimated_duration_days: 15,
    estimated_start_date: null,
    warranty_terms: null,
    energy_tier_target: null,
    contractor_signature: null,
    pdf_url: null,
    pdf_generated_at: null,
    status: 'draft',
    sent_at: null,
    viewed_at: null,
    accepted_at: null,
    expires_at: null,
    total_inspections: 3,
    total_gates: 6,
    compliance_score: 88.0,
    has_code_references: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-10T10:00:00Z',
    updated_at: '2026-02-10T10:00:00Z',
    contractor: mockContractor,
    sequence: seq1,
  },
  {
    id: 'pp-cp-002',
    public_token: 'sent-token-002',
    contractor_id: CONTRACTOR_ID,
    job_id: JOB_ID,
    bid_id: null,
    sequence_id: 'sq-lib-004',
    sequence_version: 1,
    steps_snapshot: seq4Steps,
    ruleset_snapshot: electricalRuleset.rules,
    title: 'Panel Upgrade — 78 Elm Dr',
    cover_letter: 'Hi, here is our proposal for the 200A panel upgrade.',
    plain_language_summary: 'Full 200A panel upgrade with ESA compliance.',
    estimated_cost: 8500,
    estimated_duration_days: 7,
    estimated_start_date: '2026-03-01',
    warranty_terms: '10-year warranty on workmanship. Manufacturer warranty on panel.',
    energy_tier_target: null,
    contractor_signature: { signed: true, name: 'Mike Dubois', date: '2026-02-05', ip: '192.168.1.1' },
    pdf_url: null,
    pdf_generated_at: null,
    status: 'sent',
    sent_at: '2026-02-05T14:00:00Z',
    viewed_at: null,
    accepted_at: null,
    expires_at: '2026-03-05T14:00:00Z',
    total_inspections: 2,
    total_gates: 5,
    compliance_score: 92.0,
    has_code_references: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-02-04T10:00:00Z',
    updated_at: '2026-02-05T14:00:00Z',
    contractor: mockContractor,
    sequence: seq4,
  },
  {
    id: 'pp-cp-003',
    public_token: 'sent-token-003',
    contractor_id: CONTRACTOR_ID,
    job_id: JOB_ID,
    bid_id: null,
    sequence_id: 'sq-lib-006',
    sequence_version: 1,
    steps_snapshot: seq6Steps,
    ruleset_snapshot: roofingRuleset.rules,
    title: 'Roof Replacement — 22 Pine Cres',
    cover_letter: 'Please find our detailed proposal for the roof replacement.',
    plain_language_summary: 'Complete tear-off and re-shingle with 30-year architectural shingles.',
    estimated_cost: 14200,
    estimated_duration_days: 5,
    estimated_start_date: '2026-04-15',
    warranty_terms: '30-year manufacturer warranty. 5-year workmanship warranty.',
    energy_tier_target: null,
    contractor_signature: { signed: true, name: 'Mike Dubois', date: '2026-01-28', ip: '192.168.1.1' },
    pdf_url: null,
    pdf_generated_at: null,
    status: 'sent',
    sent_at: '2026-01-28T10:00:00Z',
    viewed_at: null,
    accepted_at: null,
    expires_at: '2026-02-28T10:00:00Z',
    total_inspections: 2,
    total_gates: 4,
    compliance_score: 85.0,
    has_code_references: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-01-27T10:00:00Z',
    updated_at: '2026-01-28T10:00:00Z',
    contractor: mockContractor,
    sequence: seq6,
  },
  {
    id: 'pp-cp-004',
    public_token: 'viewed-token-004',
    contractor_id: CONTRACTOR_ID,
    job_id: JOB_ID,
    bid_id: null,
    sequence_id: 'sq-lib-007',
    sequence_version: 1,
    steps_snapshot: seq7Steps,
    ruleset_snapshot: {},
    title: 'Furnace Replacement — 99 Birch Lane',
    cover_letter: 'We recommend a high-efficiency furnace upgrade.',
    plain_language_summary: 'Replacing your furnace with a 96% efficient model.',
    estimated_cost: 6800,
    estimated_duration_days: 3,
    estimated_start_date: '2026-03-10',
    warranty_terms: '10-year parts warranty. 2-year labour warranty.',
    energy_tier_target: null,
    contractor_signature: { signed: true, name: 'Mike Dubois', date: '2026-02-01', ip: '192.168.1.1' },
    pdf_url: null,
    pdf_generated_at: null,
    status: 'viewed',
    sent_at: '2026-02-01T12:00:00Z',
    viewed_at: '2026-02-02T09:00:00Z',
    accepted_at: null,
    expires_at: '2026-03-01T12:00:00Z',
    total_inspections: 1,
    total_gates: 3,
    compliance_score: 78.0,
    has_code_references: false,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2026-01-30T10:00:00Z',
    updated_at: '2026-02-02T09:00:00Z',
    contractor: mockContractor,
    sequence: seq7,
  },
  {
    id: 'pp-cp-005',
    public_token: 'accepted-token-005',
    contractor_id: CONTRACTOR_ID,
    job_id: JOB_ID,
    bid_id: null,
    sequence_id: 'sq500000-0000-0000-0000-000000000005',
    sequence_version: 1,
    steps_snapshot: mockSequenceSteps,
    ruleset_snapshot: mockComplianceRuleset.rules,
    title: 'Basement Waterproofing — 123 Maple Ave',
    cover_letter: 'Thank you for choosing Dubois Waterproofing.',
    plain_language_summary: 'A 10-step plan to waterproof your basement from the outside.',
    estimated_cost: 18500,
    estimated_duration_days: 18,
    estimated_start_date: '2026-03-03',
    warranty_terms: '25-year transferable warranty on waterproofing membrane. 5-year warranty on workmanship.',
    energy_tier_target: null,
    contractor_signature: { signed: true, name: 'Mike Dubois', date: '2026-02-18', ip: '192.168.1.1' },
    pdf_url: null,
    pdf_generated_at: null,
    status: 'accepted',
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
    sequence: seq1,
  },
  {
    id: 'pp-cp-006',
    public_token: 'expired-token-006',
    contractor_id: CONTRACTOR_ID,
    job_id: JOB_ID,
    bid_id: null,
    sequence_id: 'sq-lib-005',
    sequence_version: 1,
    steps_snapshot: seq5Steps,
    ruleset_snapshot: {},
    title: 'Basement Bathroom Rough-In — 55 Cedar Rd',
    cover_letter: 'Here is our plumbing rough-in proposal.',
    plain_language_summary: 'Plumbing rough-in for a new basement bathroom.',
    estimated_cost: 9200,
    estimated_duration_days: 6,
    estimated_start_date: '2025-12-01',
    warranty_terms: '5-year warranty on workmanship.',
    energy_tier_target: null,
    contractor_signature: { signed: true, name: 'Mike Dubois', date: '2025-11-15', ip: '192.168.1.1' },
    pdf_url: null,
    pdf_generated_at: null,
    status: 'expired',
    sent_at: '2025-11-15T10:00:00Z',
    viewed_at: '2025-11-16T08:00:00Z',
    accepted_at: null,
    expires_at: '2025-12-15T10:00:00Z',
    total_inspections: 2,
    total_gates: 4,
    compliance_score: 72.0,
    has_code_references: true,
    deleted_at: null, deleted_by_id: null, deletion_reason: null, legal_hold: false,
    created_at: '2025-11-14T10:00:00Z',
    updated_at: '2025-12-15T10:00:00Z',
    contractor: mockContractor,
    sequence: seq5,
  },
];
