/**
 * SafetyHub — Construction Safety App
 * Pure data file for the product showcase page at /apps/safety
 */

// ============================================================================
// Module Definitions
// ============================================================================

export const safetyModules = [
  {
    id: 'jsa-generator',
    name: 'JSA Generator',
    icon: 'assignment',
    tagline: 'Two-page forms in under 60 seconds',
    description:
      'Pre-built templates for every trade. Select your task, confirm hazards, assign controls, and generate a two-page PDF — signed by every crew member before work starts.',
    features: [
      '15 industry-standard templates by trade',
      'Step-by-step hazard identification with risk ratings',
      'Control measures auto-suggested per hazard type',
      'Digital crew signatures with timestamp',
    ],
  },
  {
    id: 'crew-signoff',
    name: 'Crew Sign-Off',
    icon: 'draw',
    tagline: 'Every name, every shift',
    description:
      'Digital signature capture for toolbox talks, JSAs, and safety briefings. Each crew member signs on-screen with their name, trade, and timestamp — creating an auditable compliance record.',
    features: [
      'Touch-based signature capture on any device',
      'Automatic crew roster from project assignment',
      'Signature status tracking (signed / pending / absent)',
      'Exportable sign-off sheets for MOL inspections',
    ],
  },
  {
    id: 'form-types',
    name: 'Five Form Types',
    icon: 'content_paste',
    tagline: 'One app, every safety doc',
    description:
      'JSA, Toolbox Talk, Scissor Lift Inspection, Forklift Pre-Op, and Fall Protection Plan — all built-in with field-tested layouts and auto-populated site data.',
    features: [
      'JSA with hazard matrix and crew sign-off',
      'Toolbox Talk with topic library and attendance',
      'Equipment inspection checklists (scissor lift, forklift)',
      'Fall Protection Plans with anchor point documentation',
    ],
  },
  {
    id: 'pdf-export',
    name: 'Instant PDF Export',
    icon: 'picture_as_pdf',
    tagline: 'Print-ready in one tap',
    description:
      'Every form generates a professionally formatted PDF with company branding, digital signatures, timestamps, and GPS coordinates — ready for email, print, or MOL submission.',
    features: [
      'Branded PDF with company logo and project details',
      'All signatures embedded with date and time',
      'GPS coordinates stamped on every document',
      'Email, share, or save to device instantly',
    ],
  },
];

// ============================================================================
// Hero Stats
// ============================================================================

export const heroStats = [
  { value: '15', label: 'Templates' },
  { value: '5', label: 'Form Types' },
  { value: '< 60s', label: 'Per Form' },
  { value: '100%', label: 'Offline' },
];

// ============================================================================
// Mock Data — JSA Form
// ============================================================================

export const jsaFormMock = {
  projectName: 'Maple Ridge Phase 2',
  projectId: 'MR-2026-014',
  date: 'Mar 20, 2026',
  supervisor: 'D. Marchetti',
  steps: [
    {
      step: 'Excavation & Trenching',
      hazards: ['Cave-in', 'Underground utilities'],
      risk: 'high',
      controls: ['Trench box installed', 'Utility locate completed'],
    },
    {
      step: 'Form Setting',
      hazards: ['Pinch points', 'Manual lifting'],
      risk: 'medium',
      controls: ['Gloves required', 'Two-person lift protocol'],
    },
    {
      step: 'Concrete Pour',
      hazards: ['Chemical burns', 'Slips on wet surface'],
      risk: 'medium',
      controls: ['Full PPE: boots, gloves, goggles', 'Non-slip mats at pour zone'],
    },
  ],
};

// ============================================================================
// Mock Data — Template Picker
// ============================================================================

export const templateCategories = [
  { label: 'All', count: 15 },
  { label: 'Excavation', count: 3 },
  { label: 'Concrete', count: 3 },
  { label: 'Steel', count: 2 },
  { label: 'Electrical', count: 2 },
  { label: 'General', count: 5 },
];

export const templatePickerMock = [
  { name: 'Excavation & Trenching', category: 'Excavation', icon: 'landscape', hazards: 8 },
  { name: 'Concrete Pour & Finishing', category: 'Concrete', icon: 'water_drop', hazards: 6 },
  { name: 'Structural Steel Erection', category: 'Steel', icon: 'construction', hazards: 9 },
  { name: 'Electrical Rough-In', category: 'Electrical', icon: 'bolt', hazards: 7 },
  { name: 'General Site Cleanup', category: 'General', icon: 'cleaning_services', hazards: 4 },
];

// ============================================================================
// Mock Data — Crew Sign-Off
// ============================================================================

export const crewMock = [
  { name: 'Alex Torres', trade: 'Foreman', signed: true, time: '6:42 AM' },
  { name: 'Mike Chen', trade: 'Operator', signed: true, time: '6:43 AM' },
  { name: 'Sarah Kim', trade: 'Labourer', signed: true, time: '6:44 AM' },
  { name: 'James Rivera', trade: 'Apprentice', signed: false, time: null },
  { name: 'Priya Patel', trade: 'Electrician', signed: true, time: '6:45 AM' },
];

// ============================================================================
// Mock Data — PPE Requirements
// ============================================================================

export const ppeMock = [
  { icon: 'hard_hat', label: 'Hard Hat', required: true },
  { icon: 'safety_goggles', label: 'Safety Glasses', required: true },
  { icon: 'do_not_touch', label: 'Gloves', required: true },
  { icon: 'footprint', label: 'Steel Toes', required: true },
  { icon: 'hearing', label: 'Ear Protection', required: false },
  { icon: 'masks', label: 'Respirator', required: false },
];

// ============================================================================
// Mock Data — Form Types
// ============================================================================

export const formTypes = [
  {
    name: 'Job Safety Analysis',
    abbr: 'JSA',
    icon: 'assignment',
    description: 'Step-by-step hazard identification with controls and crew sign-off.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Toolbox Talk',
    abbr: 'TBT',
    icon: 'groups',
    description: 'Pre-shift safety meeting with topic discussion and attendance.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Scissor Lift Inspection',
    abbr: 'SLI',
    icon: 'vertical_align_top',
    description: 'Pre-operation checklist: guardrails, controls, tires, battery.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Forklift Pre-Op',
    abbr: 'FPO',
    icon: 'forklift',
    description: 'Daily operator inspection: forks, mast, hydraulics, horn, lights.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Fall Protection Plan',
    abbr: 'FPP',
    icon: 'swap_vert',
    description: 'Anchor points, harness check, rescue plan, and crew certification.',
    color: 'from-red-500 to-rose-600',
  },
];

// ============================================================================
// Mock Data — Dashboard Stats
// ============================================================================

export const formStats = [
  { label: 'Forms This Week', value: '24', change: '+8', trend: 'up' },
  { label: 'Crew Compliance', value: '97%', change: '+2%', trend: 'up' },
  { label: 'Avg. Completion', value: '48s', change: '-12s', trend: 'up' },
  { label: 'Open Issues', value: '0', change: '—', trend: 'neutral' },
];

// ============================================================================
// Risk Colors
// ============================================================================

export const riskColors: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: 'bg-red-100', text: 'text-red-700', label: 'High' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Medium' },
  low: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Low' },
};
