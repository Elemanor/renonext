/**
 * EquipmentFix — Mechanical Work Center
 * Pure data file for the product showcase page at /apps/equipment-fix
 */

// ============================================================================
// Types
// ============================================================================

export interface WorkOrder {
  id: string;
  equipment: string;
  issue: string;
  severity: 'critical' | 'urgent' | 'high' | 'medium' | 'low';
  dispatchedAt: string;
  assignee?: string;
  status: 'new' | 'acknowledged' | 'in-progress' | 'waiting-parts' | 'fixed' | 'closed';
  site: string;
}

export interface FleetItem {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'down' | 'maintenance' | 'idle';
  hoursToday: number;
  site: string;
  lastService: string;
  healthScore: number;
}

export interface PartItem {
  partId: string;
  name: string;
  linkedWO: string;
  status: 'in-stock' | 'backorder' | 'ordered' | 'in-transit';
  eta: string;
  daysWaiting: number;
}

export interface MechanicProfile {
  initials: string;
  name: string;
  specialty: string;
  activeJobs: number;
  resolvedToday: number;
  avgResponseMin: number;
  status: 'available' | 'on-job' | 'off-shift';
  statusColor: string;
}

export interface DowntimeEvent {
  equipment: string;
  site: string;
  hoursDown: number;
  cost: number;
  cause: string;
}

// ============================================================================
// Module Definitions
// ============================================================================

export const equipmentFixModules = [
  {
    id: 'dispatch',
    name: 'Dispatch Center',
    icon: 'send',
    tagline: 'Assign in seconds, not minutes',
    description:
      'Incoming work orders land in a real-time queue with severity classification. One tap assigns a mechanic with push notification delivery.',
    features: [
      'Real-time dispatch queue with severity tiers',
      'One-tap mechanic assignment with push notification',
      'Auto-escalation for unacknowledged critical issues',
      'Multi-site queue aggregation',
    ],
  },
  {
    id: 'fleet',
    name: 'Fleet Overview',
    icon: 'local_shipping',
    tagline: 'Every machine, every site',
    description:
      'Bird\'s-eye view of your entire fleet. See which equipment is operational, which is down, and where your maintenance bottlenecks are.',
    features: [
      'Real-time equipment status across all sites',
      'Health scoring based on service history',
      'Downtime hours and cost tracking',
      'Predictive maintenance alerts',
    ],
  },
  {
    id: 'reporting',
    name: 'Field Reporting',
    icon: 'photo_camera',
    tagline: 'Snap, tag, submit',
    description:
      'Field crews report equipment issues with GPS-tagged photos and severity levels. No forms, no radio calls — the dispatcher sees it instantly.',
    features: [
      'Photo capture with GPS geotag',
      'Severity classification: Critical to Low',
      'Equipment selection from site inventory',
      'Offline-first with automatic sync',
    ],
  },
  {
    id: 'parts',
    name: 'Parts & Inventory',
    icon: 'inventory_2',
    tagline: 'No part, no fix — track everything',
    description:
      'Track part availability, backorders, and delivery ETAs linked directly to open work orders. Never lose a repair to missing parts.',
    features: [
      'Parts linked to work orders automatically',
      'Backorder tracking with ETA alerts',
      'Part request workflow for field mechanics',
      'Inventory levels across warehouses',
    ],
  },
  {
    id: 'resolution',
    name: 'Resolution Timeline',
    icon: 'timeline',
    tagline: 'Full history, every issue',
    description:
      'Track every work order from creation to close with timestamped status changes, notes, and photo evidence at each step.',
    features: [
      'New → Acknowledged → In Progress → Fixed → Closed',
      'Timestamped notes and photo evidence',
      'SLA tracking with escalation rules',
      'Exportable audit trail for compliance',
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    icon: 'bar_chart',
    tagline: 'Data-driven maintenance',
    description:
      'Downtime reports, repeat failure analysis, mechanic performance metrics, and cost tracking across your entire operation.',
    features: [
      'Downtime hours and cost per equipment',
      'Repeat failure identification',
      'Mechanic response time benchmarks',
      'Monthly/quarterly trend reports',
    ],
  },
];

// ============================================================================
// Mock Data — Dispatch Queue
// ============================================================================

export const dispatchQueue: WorkOrder[] = [
  {
    id: 'S-202',
    equipment: 'Scissor Lift',
    issue: 'Hydraulic Leak',
    severity: 'urgent',
    dispatchedAt: '6:45 AM',
    status: 'new',
    site: 'Site A — 47 Oakwood Ave',
  },
  {
    id: 'T-404',
    equipment: 'Telehandler',
    issue: 'Hydraulic Pump Noise',
    severity: 'high',
    dispatchedAt: '5:48 AM',
    status: 'new',
    site: 'Site B — 12 Elm Street',
  },
  {
    id: 'C-101',
    equipment: 'Crawler Crane',
    issue: 'Gearbox Noise',
    severity: 'urgent',
    dispatchedAt: '8:45 AM',
    status: 'new',
    site: 'Site A — 47 Oakwood Ave',
  },
  {
    id: 'E-303',
    equipment: 'Aerial Work Platform',
    issue: 'Platform Tilt Sensor',
    severity: 'high',
    dispatchedAt: '8:53 AM',
    status: 'acknowledged',
    site: 'Site C — 88 King West',
  },
];

// ============================================================================
// Mock Data — Fleet
// ============================================================================

export const fleetItems: FleetItem[] = [
  {
    id: 'EQ-001',
    name: 'CAT 320 Excavator',
    type: 'Excavator',
    status: 'operational',
    hoursToday: 6.5,
    site: 'Site A',
    lastService: 'Mar 12',
    healthScore: 92,
  },
  {
    id: 'EQ-002',
    name: 'JLG 1932R Scissor Lift',
    type: 'Scissor Lift',
    status: 'down',
    hoursToday: 0,
    site: 'Site A',
    lastService: 'Mar 8',
    healthScore: 24,
  },
  {
    id: 'EQ-003',
    name: 'Bobcat T770 Loader',
    type: 'Skid Steer',
    status: 'operational',
    hoursToday: 4.2,
    site: 'Site B',
    lastService: 'Mar 15',
    healthScore: 87,
  },
  {
    id: 'EQ-004',
    name: 'Liebherr LTM 1060',
    type: 'Crawler Crane',
    status: 'maintenance',
    hoursToday: 0,
    site: 'Site A',
    lastService: 'Mar 1',
    healthScore: 45,
  },
  {
    id: 'EQ-005',
    name: 'Genie Z-45 Boom Lift',
    type: 'Aerial Platform',
    status: 'operational',
    hoursToday: 5.8,
    site: 'Site C',
    lastService: 'Mar 14',
    healthScore: 78,
  },
  {
    id: 'EQ-006',
    name: 'Kubota KX080 Mini Excavator',
    type: 'Excavator',
    status: 'idle',
    hoursToday: 0,
    site: 'Site B',
    lastService: 'Feb 28',
    healthScore: 65,
  },
];

// ============================================================================
// Mock Data — Parts On Hold
// ============================================================================

export const partsOnHold: PartItem[] = [
  {
    partId: 'P-617',
    name: 'Hydraulic Cylinder',
    linkedWO: 'S-202',
    status: 'backorder',
    eta: '2 days',
    daysWaiting: 2,
  },
  {
    partId: 'P-201',
    name: 'Drive Motor Kit',
    linkedWO: 'C-101',
    status: 'backorder',
    eta: '3 days',
    daysWaiting: 3,
  },
  {
    partId: 'P-445',
    name: 'Tilt Sensor Assembly',
    linkedWO: 'E-303',
    status: 'in-transit',
    eta: 'Tomorrow',
    daysWaiting: 1,
  },
];

// ============================================================================
// Mock Data — Mechanics
// ============================================================================

export const mechanics: MechanicProfile[] = [
  {
    initials: 'MF',
    name: 'Mark Ferraro',
    specialty: 'Hydraulics & Heavy Equipment',
    activeJobs: 2,
    resolvedToday: 3,
    avgResponseMin: 12,
    status: 'on-job',
    statusColor: '#FFB300',
  },
  {
    initials: 'JR',
    name: 'Jake Robinson',
    specialty: 'Electrical & Controls',
    activeJobs: 1,
    resolvedToday: 4,
    avgResponseMin: 8,
    status: 'available',
    statusColor: '#22c55e',
  },
  {
    initials: 'SL',
    name: 'Sandra Lee',
    specialty: 'Engines & Drivetrain',
    activeJobs: 0,
    resolvedToday: 2,
    avgResponseMin: 15,
    status: 'off-shift',
    statusColor: '#6b7280',
  },
];

// ============================================================================
// Mock Data — Downtime
// ============================================================================

export const recentDowntime: DowntimeEvent[] = [
  {
    equipment: 'JLG 1932R Scissor Lift',
    site: 'Site A',
    hoursDown: 18,
    cost: 2400,
    cause: 'Hydraulic Leak',
  },
  {
    equipment: 'Liebherr LTM 1060',
    site: 'Site A',
    hoursDown: 48,
    cost: 12800,
    cause: 'Gearbox Failure',
  },
  {
    equipment: 'Genie Z-45 Boom Lift',
    site: 'Site C',
    hoursDown: 4,
    cost: 640,
    cause: 'Sensor Calibration',
  },
];

// ============================================================================
// Stats
// ============================================================================

export const heroStats = [
  { value: 6, suffix: '', label: 'Modules' },
  { value: 40, suffix: '%', label: 'Less Downtime' },
  { value: 12, suffix: 'min', label: 'Avg Response' },
];

export const fleetStats = [
  { label: 'Operational', value: '3', color: '#22c55e' },
  { label: 'Down', value: '1', color: '#ef4444' },
  { label: 'Maintenance', value: '1', color: '#FFB300' },
  { label: 'Idle', value: '1', color: '#6b7280' },
];

export const weeklyMetrics = [
  { label: 'Work Orders', value: '24' },
  { label: 'Resolved', value: '19' },
  { label: 'Avg Fix Time', value: '3.2h' },
  { label: 'Parts Used', value: '14' },
];

// ============================================================================
// Severity & Status Colors
// ============================================================================

export const severityColors: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: 'bg-red-900/40', text: 'text-red-400', border: 'border-red-500/20' },
  urgent: { bg: 'bg-red-900/40', text: 'text-red-400', border: 'border-red-500/20' },
  high: { bg: 'bg-[#FFB300]/10', text: 'text-[#FFB300]', border: 'border-[#FFB300]/20' },
  medium: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  low: { bg: 'bg-gray-700/40', text: 'text-gray-400', border: 'border-gray-500/20' },
};

export const fleetStatusColors: Record<string, string> = {
  operational: '#22c55e',
  down: '#ef4444',
  maintenance: '#FFB300',
  idle: '#6b7280',
};

export const partStatusColors: Record<string, string> = {
  'in-stock': '#22c55e',
  backorder: '#ef4444',
  ordered: '#FFB300',
  'in-transit': '#0fbabd',
};
