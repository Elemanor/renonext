/**
 * Obsidian Sentinel — Construction Intelligence Platform
 * Pure data file for the product showcase page at /apps/sentinel
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface SentinelModule {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  stats?: { label: string; value: string }[];
}

export interface PersonnelMember {
  initials: string;
  name: string;
  role: string;
  trade: string;
  certifications: string[];
  hoursThisWeek: number;
  status: 'on-site' | 'off-site' | 'break';
  statusColor: string;
}

export interface ProjectPhase {
  name: string;
  progress: number;
  status: 'complete' | 'in-progress' | 'upcoming';
  color: string;
  tasks: number;
  completedTasks: number;
}

export interface ProjectTask {
  title: string;
  assignee: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'done' | 'in-progress' | 'blocked' | 'todo';
}

export interface IssueItem {
  id: string;
  title: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  workstream: string;
  assignee: string;
  daysOpen: number;
}

export interface EscrowMilestone {
  name: string;
  amount: number;
  percentage: number;
  status: 'released' | 'pending-approval' | 'locked';
}

export interface ChangeOrder {
  id: string;
  title: string;
  amount: number;
  status: 'draft' | 'under-review' | 'approved' | 'rejected';
  submittedBy: string;
  date: string;
}

export interface RFIItem {
  id: string;
  subject: string;
  priority: 'urgent' | 'high' | 'normal';
  status: 'open' | 'answered' | 'closed';
  daysOpen: number;
  assignee: string;
}

export interface DocumentItem {
  name: string;
  type: string;
  size: string;
  version: string;
  updatedAt: string;
  icon: string;
}

export interface SafetyItem {
  title: string;
  status: 'pass' | 'fail' | 'pending';
  inspector: string;
  date: string;
}

export interface NoiseLevel {
  day: string;
  hours: number[];
}

// ============================================================================
// Module Definitions
// ============================================================================

export const sentinelModules: SentinelModule[] = [
  {
    id: 'site-briefing',
    name: 'Site Briefing',
    tagline: 'Your daily command center',
    description:
      'Start every day with a complete operational snapshot. Personnel on site, escrow health, noise compliance, and active alerts — all in one dark-mode dashboard.',
    icon: 'dashboard',
    features: [
      'Personnel tracking with real-time headcount',
      'Noise compliance heatmap by hour',
      'Active alert management with severity tiers',
      'Escrow balance and milestone progress at a glance',
    ],
  },
  {
    id: 'timeline',
    name: 'Project Timeline',
    tagline: 'Phase-level intelligence',
    description:
      'Track every phase from excavation to finishing with granular progress bars, health indicators, and automatic dependency mapping.',
    icon: 'timeline',
    features: [
      'Multi-phase progress visualization',
      'Automatic health scoring per phase',
      'Sub-task breakdown with assignees',
      'Phase telemetry: quantities, incidents, labor hours',
    ],
  },
  {
    id: 'issues',
    name: 'Issue Tracker',
    tagline: 'Nothing falls through the cracks',
    description:
      'Centralized issue management with priority classification, workstream filtering, and resolution tracking across every trade on site.',
    icon: 'bug_report',
    features: [
      'Priority classification: Critical / High / Medium / Low',
      'Workstream filtering (Structural, Mechanical, Electrical)',
      'Age tracking with escalation alerts',
      'Resolution workflow with photo evidence',
    ],
  },
  {
    id: 'budget',
    name: 'Budget & Escrow',
    tagline: 'Every dollar accounted for',
    description:
      'Milestone-based escrow with real-time balance tracking, segmented progress visualization, and automatic holdback calculations.',
    icon: 'account_balance_wallet',
    features: [
      'Milestone-based payment schedule',
      'Real-time escrow balance with segmented bar',
      'Automatic 10% holdback calculation',
      'Payment history with receipt generation',
    ],
  },
  {
    id: 'change-orders',
    name: 'Change Orders',
    tagline: 'Control scope creep',
    description:
      'Manage scope changes with a structured approval workflow. Track financial impact, review queues, and maintain a complete audit trail.',
    icon: 'swap_horiz',
    features: [
      'Draft → Review → Approve workflow',
      'Financial impact tracking per CO',
      'Cumulative impact dashboard',
      'Client notification and digital signatures',
    ],
  },
  {
    id: 'personnel',
    name: 'Personnel Registry',
    tagline: 'Your crew, fully documented',
    description:
      'Complete team management with certification tracking, hours logging, and real-time status for every worker on site.',
    icon: 'badge',
    features: [
      'Certification and license tracking',
      'Weekly hours with overtime alerts',
      'Trade-based team organization',
      'On-site / off-site status indicators',
    ],
  },
  {
    id: 'rfi',
    name: 'RFI Management',
    tagline: 'Answers on record',
    description:
      'Formal request-for-information workflow with priority routing, response tracking, and automatic archival for dispute protection.',
    icon: 'help_center',
    features: [
      'Priority-based routing (Urgent / High / Normal)',
      'Response time tracking with SLA alerts',
      'Linked document attachments',
      'Searchable archive for dispute resolution',
    ],
  },
  {
    id: 'documents',
    name: 'Document Vault',
    tagline: 'Your project file system',
    description:
      'Organized file repository with version control, folder hierarchy, storage tracking, and instant search across all project documents.',
    icon: 'folder_open',
    features: [
      'Version-controlled document management',
      'Folder hierarchy: Drawings, Permits, Reports, Photos',
      'Storage capacity tracking',
      'Quick search with file type filtering',
    ],
  },
  {
    id: 'safety',
    name: 'Safety Protocols',
    tagline: 'Zero incidents is the only goal',
    description:
      'Comprehensive safety management with daily checklists, incident reporting, compliance scoring, and streak tracking.',
    icon: 'health_and_safety',
    features: [
      'Daily safety checklist with inspector sign-off',
      'Incident reporting with severity classification',
      'Compliance score out of 100',
      'Safety streak tracking with milestones',
    ],
  },
  {
    id: 'weather',
    name: 'Weather Intelligence',
    tagline: 'Plan around the forecast',
    description:
      'Hyperlocal weather integration with work-impact assessment, rain delay tracking, and automatic schedule adjustments.',
    icon: 'wb_sunny',
    features: [
      '7-day forecast with hourly detail',
      'Work-impact severity assessment',
      'Rain delay tracking and logging',
      'Automatic schedule adjustment suggestions',
    ],
  },
  {
    id: 'photos',
    name: 'Photo Documentation',
    tagline: 'Visual proof of progress',
    description:
      'Timestamped, geotagged photo documentation with daily progress albums, before/after comparisons, and markup tools.',
    icon: 'photo_camera',
    features: [
      'Timestamped and geotagged captures',
      'Daily progress photo albums',
      'Before/after comparison views',
      'Markup and annotation tools',
    ],
  },
];

// ============================================================================
// Mock Data — Site Briefing
// ============================================================================

export const siteAddress = '47 Oakwood Ave, Toronto, ON';
export const projectDayCount = 84;

export const personnelOnSite: PersonnelMember[] = [
  {
    initials: 'MR',
    name: 'Marco Rossi',
    role: 'Site Superintendent',
    trade: 'General',
    certifications: ['OHSA', 'First Aid', 'WHMIS'],
    hoursThisWeek: 42,
    status: 'on-site',
    statusColor: '#22c55e',
  },
  {
    initials: 'JC',
    name: 'James Chen',
    role: 'Foreman',
    trade: 'Concrete',
    certifications: ['OHSA', 'Confined Space'],
    hoursThisWeek: 38,
    status: 'on-site',
    statusColor: '#22c55e',
  },
  {
    initials: 'SK',
    name: 'Sarah Kim',
    role: 'Electrician',
    trade: 'Electrical',
    certifications: ['ESA License', 'OHSA'],
    hoursThisWeek: 36,
    status: 'on-site',
    statusColor: '#22c55e',
  },
  {
    initials: 'DP',
    name: 'Derek Peters',
    role: 'Plumber',
    trade: 'Plumbing',
    certifications: ['TSSA', 'OHSA', 'Backflow'],
    hoursThisWeek: 34,
    status: 'break',
    statusColor: '#E8AA42',
  },
];

export const noiseHeatmap: NoiseLevel[] = [
  { day: 'Mon', hours: [0, 0, 2, 3, 3, 2, 1, 0] },
  { day: 'Tue', hours: [0, 1, 3, 3, 2, 3, 1, 0] },
  { day: 'Wed', hours: [0, 0, 1, 2, 3, 3, 2, 0] },
  { day: 'Thu', hours: [0, 1, 2, 3, 3, 2, 1, 0] },
  { day: 'Fri', hours: [0, 0, 2, 2, 3, 2, 1, 0] },
  { day: 'Sat', hours: [0, 0, 1, 1, 0, 0, 0, 0] },
  { day: 'Sun', hours: [0, 0, 0, 0, 0, 0, 0, 0] },
];

export const noiseHours = ['7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p'];

export const alertCards = [
  {
    severity: 'warning' as const,
    icon: 'warning',
    title: 'Concrete Pour Delayed',
    description: 'Rain forecast Thursday — reschedule to Friday',
    time: '2h ago',
    color: '#E8AA42',
  },
  {
    severity: 'info' as const,
    icon: 'local_shipping',
    title: 'Material Delivery',
    description: 'Rebar shipment arriving 10:30 AM tomorrow',
    time: '4h ago',
    color: '#0fbabd',
  },
];

// ============================================================================
// Mock Data — Project Timeline & Phases
// ============================================================================

export const projectPhases: ProjectPhase[] = [
  {
    name: 'Excavation',
    progress: 100,
    status: 'complete',
    color: '#22c55e',
    tasks: 12,
    completedTasks: 12,
  },
  {
    name: 'Foundation',
    progress: 45,
    status: 'in-progress',
    color: '#0fbabd',
    tasks: 18,
    completedTasks: 8,
  },
  {
    name: 'Framing',
    progress: 0,
    status: 'upcoming',
    color: '#6b7280',
    tasks: 24,
    completedTasks: 0,
  },
];

export const phaseTasks: ProjectTask[] = [
  {
    title: 'Form footings — west wall',
    assignee: 'James Chen',
    priority: 'high',
    dueDate: 'Mar 20',
    status: 'in-progress',
  },
  {
    title: 'Rebar inspection — section B',
    assignee: 'Marco Rossi',
    priority: 'critical',
    dueDate: 'Mar 21',
    status: 'todo',
  },
  {
    title: 'Waterproof membrane — east wall',
    assignee: 'Derek Peters',
    priority: 'medium',
    dueDate: 'Mar 24',
    status: 'todo',
  },
  {
    title: 'Backfill prep — north section',
    assignee: 'James Chen',
    priority: 'low',
    dueDate: 'Mar 26',
    status: 'todo',
  },
];

export const phaseTelemetry = [
  { label: 'Concrete', value: '1,240 m\u00B3' },
  { label: 'Incidents', value: '0' },
  { label: 'Labor Hrs', value: '2,680' },
  { label: 'Inspections', value: '6 / 6' },
];

// ============================================================================
// Mock Data — Issues
// ============================================================================

export const issueStats = [
  { label: 'Active', value: '42', color: '#0fbabd' },
  { label: 'Critical', value: '8', color: '#ef4444' },
  { label: 'Delayed', value: '14', color: '#E8AA42' },
  { label: 'Resolved', value: '20', color: '#22c55e' },
];

export const issueItems: IssueItem[] = [
  {
    id: 'ISS-042',
    title: 'Load-bearing wall crack detected — section C3',
    priority: 'critical',
    workstream: 'Structural',
    assignee: 'Marco Rossi',
    daysOpen: 2,
  },
  {
    id: 'ISS-038',
    title: 'Electrical panel placement conflicts with HVAC duct',
    priority: 'high',
    workstream: 'Electrical',
    assignee: 'Sarah Kim',
    daysOpen: 5,
  },
  {
    id: 'ISS-035',
    title: 'Drainage grade insufficient at south perimeter',
    priority: 'medium',
    workstream: 'Civil',
    assignee: 'James Chen',
    daysOpen: 8,
  },
];

export const workstreamFilters = [
  'All',
  'Structural',
  'Electrical',
  'Mechanical',
  'Civil',
  'Safety',
];

// ============================================================================
// Mock Data — Budget & Escrow
// ============================================================================

export const escrowBalance = 247500;
export const totalBudget = 380000;

export const escrowMilestones: EscrowMilestone[] = [
  {
    name: 'Excavation Complete',
    amount: 38000,
    percentage: 10,
    status: 'released',
  },
  {
    name: 'Foundation Poured',
    amount: 57000,
    percentage: 15,
    status: 'released',
  },
  {
    name: 'Framing Rough-In',
    amount: 76000,
    percentage: 20,
    status: 'pending-approval',
  },
  {
    name: 'Mechanical Complete',
    amount: 57000,
    percentage: 15,
    status: 'locked',
  },
];

export const recentPayments = [
  {
    description: 'Milestone 2 — Foundation Poured',
    amount: 57000,
    date: 'Mar 12, 2026',
    method: 'Escrow Release',
    status: 'completed' as const,
  },
  {
    description: 'Milestone 1 — Excavation Complete',
    amount: 38000,
    date: 'Feb 28, 2026',
    method: 'Escrow Release',
    status: 'completed' as const,
  },
  {
    description: 'Deposit — Project Mobilization',
    amount: 19000,
    date: 'Feb 14, 2026',
    method: 'Direct Transfer',
    status: 'completed' as const,
  },
];

// ============================================================================
// Mock Data — Change Orders
// ============================================================================

export const changeOrderImpact = 248420;

export const changeOrders: ChangeOrder[] = [
  {
    id: 'CO-007',
    title: 'Upgrade to triple-pane windows',
    amount: 18500,
    status: 'draft',
    submittedBy: 'Marco Rossi',
    date: 'Mar 18, 2026',
  },
  {
    id: 'CO-006',
    title: 'Add radiant floor heating — basement',
    amount: 34200,
    status: 'under-review',
    submittedBy: 'Derek Peters',
    date: 'Mar 15, 2026',
  },
  {
    id: 'CO-005',
    title: 'Relocate electrical panel to garage',
    amount: 8750,
    status: 'approved',
    submittedBy: 'Sarah Kim',
    date: 'Mar 10, 2026',
  },
];

// ============================================================================
// Mock Data — RFI
// ============================================================================

export const rfiStats = [
  { label: 'Total', value: '24' },
  { label: 'Open', value: '8' },
  { label: 'Avg Response', value: '14.2h' },
];

export const rfiItems: RFIItem[] = [
  {
    id: 'RFI-024',
    subject: 'Clarify footing depth at column grid C-4',
    priority: 'urgent',
    status: 'open',
    daysOpen: 1,
    assignee: 'Architect',
  },
  {
    id: 'RFI-022',
    subject: 'Confirm rebar spacing for grade beam',
    priority: 'high',
    status: 'open',
    daysOpen: 3,
    assignee: 'Structural Eng.',
  },
  {
    id: 'RFI-019',
    subject: 'Material substitution for vapor barrier',
    priority: 'normal',
    status: 'answered',
    daysOpen: 7,
    assignee: 'Architect',
  },
];

// ============================================================================
// Mock Data — Documents
// ============================================================================

export const storageUsed = 74.2;
export const storageTotal = 100;

export const documentFolders = [
  { name: 'Drawings', icon: 'architecture', count: 48, size: '28.4 GB' },
  { name: 'Permits', icon: 'description', count: 12, size: '1.2 GB' },
  { name: 'Reports', icon: 'summarize', count: 34, size: '8.6 GB' },
  { name: 'Photos', icon: 'photo_library', count: 312, size: '36.0 GB' },
];

export const recentDocuments: DocumentItem[] = [
  {
    name: 'Foundation Plan Rev.C',
    type: 'PDF',
    size: '14.2 MB',
    version: 'v3.0',
    updatedAt: 'Mar 17',
    icon: 'picture_as_pdf',
  },
  {
    name: 'Site Progress — Week 12',
    type: 'XLSX',
    size: '2.8 MB',
    version: 'v1.2',
    updatedAt: 'Mar 16',
    icon: 'table_chart',
  },
];

// ============================================================================
// Mock Data — Safety
// ============================================================================

export const safetyStreak = 128;
export const complianceScore = 98;

export const safetyChecklist: SafetyItem[] = [
  {
    title: 'PPE compliance — all workers',
    status: 'pass',
    inspector: 'Marco Rossi',
    date: 'Today',
  },
  {
    title: 'Fall protection — scaffolding level 2',
    status: 'pass',
    inspector: 'Marco Rossi',
    date: 'Today',
  },
  {
    title: 'Excavation shoring inspection',
    status: 'pass',
    inspector: 'James Chen',
    date: 'Today',
  },
  {
    title: 'Fire extinguisher stations',
    status: 'pending',
    inspector: 'Unassigned',
    date: 'Due today',
  },
];

export const safetyIncident = {
  id: 'INC-003',
  title: 'Near-miss: unsecured load on crane swing',
  severity: 'medium' as const,
  date: 'Mar 2, 2026',
  status: 'Investigated — corrective action complete',
};

export const safetyFeed = [
  {
    icon: 'verified',
    text: 'Daily safety briefing completed — 12 attendees',
    time: '7:15 AM',
  },
  {
    icon: 'shield',
    text: 'OHSA inspector visit — no violations found',
    time: 'Yesterday',
  },
];

// ============================================================================
// Hero Stats
// ============================================================================

export const heroStats = [
  { value: 11, suffix: '', label: 'Modules' },
  { value: 128, suffix: '', label: 'Days Safety Streak' },
  { value: 100, suffix: '%', label: 'Offline-Ready' },
];

// ============================================================================
// Priority Colors
// ============================================================================

export const priorityColors: Record<string, string> = {
  critical: '#ef4444',
  urgent: '#ef4444',
  high: '#E8AA42',
  medium: '#0fbabd',
  normal: '#0fbabd',
  low: '#6b7280',
};

export const statusColors: Record<string, string> = {
  released: '#22c55e',
  'pending-approval': '#E8AA42',
  locked: '#6b7280',
  draft: '#6b7280',
  'under-review': '#E8AA42',
  approved: '#22c55e',
  rejected: '#ef4444',
  open: '#0fbabd',
  answered: '#22c55e',
  closed: '#6b7280',
  pass: '#22c55e',
  fail: '#ef4444',
  pending: '#E8AA42',
};
