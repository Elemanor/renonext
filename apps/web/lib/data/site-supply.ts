/**
 * SiteSupply — Supply Chain Command Center
 * Pure data file for the product showcase page at /apps/site-supply
 * Design system: KINETIC MONOLITH (dark industrial)
 */

// ============================================================================
// Types
// ============================================================================

export interface SiteSupplyModule {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
}

export interface ExpectedDelivery {
  id: string;
  material: string;
  supplier: string;
  status: 'critical-delay' | 'on-schedule' | 'awaiting-departure';
  delayMinutes?: number;
  eta: string;
  progress: number;
  complianceNote?: string;
}

export interface InTransitItem {
  id: string;
  material: string;
  distance: string;
  eta: string;
}

export interface PendingRequest {
  id: string;
  material: string;
  quantity: string;
  zone: string;
  priority: 'urgent' | 'standard';
  status: 'pending-approval' | 'in-transit' | 'awaiting-stock';
  requestedBy: string;
  timestamp: string;
}

export interface RentalAsset {
  assetId: string;
  name: string;
  provider: string;
  dailyCost: number;
  returnDate: string;
  zone: string;
  status: 'urgent-return' | 'active' | 'scheduled';
  hoursUsed?: number;
}

// ============================================================================
// Module Definitions
// ============================================================================

export const siteSupplyModules: SiteSupplyModule[] = [
  {
    id: 'delivery-tracking',
    name: 'Delivery Tracking',
    icon: 'local_shipping',
    tagline: 'Real-time fleet visibility',
    description:
      'Track every inbound delivery with GPS positions, ETAs, and delay alerts. Critical shipments get auto-escalated when windows slip.',
    features: [
      'Live GPS tracking for all inbound deliveries',
      'Critical delay alerts with auto-escalation',
      'Delivery compliance and documentation logging',
      'Historical delivery performance analytics',
    ],
  },
  {
    id: 'material-requests',
    name: 'Material Requests',
    icon: 'order_approve',
    tagline: 'Streamlined procurement',
    description:
      'Field crews submit material requests by zone and priority. Approval workflows route through PMs and procurement automatically.',
    features: [
      'One-tap material request from the field',
      'Zone-based allocation and priority routing',
      'Multi-level approval workflow',
      'Budget tracking per request and zone',
    ],
  },
  {
    id: 'rental-management',
    name: 'Rental Management',
    icon: 'precision_manufacturing',
    tagline: 'Control rental burn rate',
    description:
      'Track daily rental costs, return deadlines, and utilization across sites. Never overpay for idle equipment again.',
    features: [
      'Daily burn rate dashboard ($X,XXX/day)',
      'Urgent return alerts for expiring rentals',
      'Asset utilization tracking by zone',
      'Provider contract and cost comparison',
    ],
  },
  {
    id: 'inventory-control',
    name: 'Inventory Control',
    icon: 'inventory_2',
    tagline: 'Know what you have, where',
    description:
      'QR-scanned inventory across all storage zones. Auto-alerts when stock drops below reorder thresholds.',
    features: [
      'QR/barcode scanning for fast intake',
      'Zone-level stock visibility',
      'Auto reorder threshold alerts',
      'Material waste and shrinkage tracking',
    ],
  },
  {
    id: 'equipment-dispatch',
    name: 'Equipment Dispatch',
    icon: 'build',
    tagline: 'Report, assign, resolve',
    description:
      'Field crews report equipment issues with photos and severity. Dispatchers assign mechanics instantly with push notifications.',
    features: [
      'Photo-based issue reporting with GPS',
      'One-tap mechanic assignment and escalation',
      'Resolution timeline with full audit trail',
      'Downtime cost tracking per asset',
    ],
  },
  {
    id: 'analytics',
    name: 'Supply Analytics',
    icon: 'bar_chart',
    tagline: 'Data-driven logistics',
    description:
      'Delivery performance, material burn rate, rental costs, and procurement trends — all in one analytics dashboard.',
    features: [
      'Delivery on-time performance scoring',
      'Material cost trends by project phase',
      'Rental ROI vs. purchase analysis',
      'Supplier reliability rankings',
    ],
  },
];

// ============================================================================
// Mock Data — Expected Deliveries
// ============================================================================

export const expectedDeliveries: ExpectedDelivery[] = [
  {
    id: 'DEL-1047',
    material: 'Pre-cast Concrete Panels',
    supplier: 'TITAN LOGISTICS',
    status: 'critical-delay',
    delayMinutes: 45,
    eta: '10:45 AM',
    progress: 62,
    complianceNote: 'OVERWEIGHT PERMIT REQUIRED — Region of Peel §4.2',
  },
  {
    id: 'DEL-1048',
    material: 'Structural Steel Joists',
    supplier: 'NORTH STAR FREIGHT',
    status: 'on-schedule',
    eta: '11:30 AM',
    progress: 78,
  },
  {
    id: 'DEL-1049',
    material: 'HVAC Ducting — 24" Round',
    supplier: 'EXPRESS MECHANICAL',
    status: 'awaiting-departure',
    eta: '2:15 PM',
    progress: 0,
  },
];

// ============================================================================
// Mock Data — In Transit
// ============================================================================

export const inTransitItems: InTransitItem[] = [
  {
    id: 'TR-201',
    material: 'Bulk Aggregate (40mm)',
    distance: '2.4 mi',
    eta: '10:55 AM',
  },
  {
    id: 'TR-202',
    material: 'Road Base Material',
    distance: '8.1 mi',
    eta: '15:40',
  },
];

// ============================================================================
// Mock Data — Pending Material Requests
// ============================================================================

export const pendingRequests: PendingRequest[] = [
  {
    id: 'REQ-3041',
    material: 'Concrete C35/45 — Ready Mix',
    quantity: '12 m\u00B3',
    zone: 'Zone A — Foundation',
    priority: 'urgent',
    status: 'pending-approval',
    requestedBy: 'M. Ferraro',
    timestamp: '08:22 AM',
  },
  {
    id: 'REQ-3042',
    material: 'Structural Steel Bolts M24',
    quantity: '400 UNIT',
    zone: 'Zone B — Framing',
    priority: 'standard',
    status: 'in-transit',
    requestedBy: 'J. Robinson',
    timestamp: '07:45 AM',
  },
  {
    id: 'REQ-3043',
    material: 'Plywood Sheeting 3/4"',
    quantity: '80 SHEET',
    zone: 'Zone C — Formwork',
    priority: 'standard',
    status: 'awaiting-stock',
    requestedBy: 'S. Lee',
    timestamp: '09:10 AM',
  },
];

// ============================================================================
// Mock Data — Rental Assets
// ============================================================================

export const rentalAssets: RentalAsset[] = [
  {
    assetId: 'RNT-4401',
    name: 'JLG 1930ES Scissor Lift',
    provider: 'HERC RENTALS',
    dailyCost: 185,
    returnDate: 'Tomorrow',
    zone: 'Zone A',
    status: 'urgent-return',
    hoursUsed: 142,
  },
  {
    assetId: 'RNT-4402',
    name: 'Generac Mobile MMG45 Generator',
    provider: 'SUNBELT RENTALS',
    dailyCost: 420,
    returnDate: 'Mar 24',
    zone: 'Zone B',
    status: 'active',
    hoursUsed: 88,
  },
  {
    assetId: 'RNT-4403',
    name: 'Hilti DD 150 Core Drill',
    provider: 'HILTI FLEET',
    dailyCost: 65,
    returnDate: 'Mar 26',
    zone: 'Zone A',
    status: 'active',
    hoursUsed: 24,
  },
];

// ============================================================================
// Stats
// ============================================================================

export const dailyBurnRate = 4820;

export const heroStats = [
  { value: '12', label: 'Scheduled' },
  { value: '2', label: 'Delayed' },
  { value: '$4.8K', label: 'Daily Burn' },
  { value: '3', label: 'In-Transit' },
];

// ============================================================================
// Status Colors (KINETIC MONOLITH palette)
// ============================================================================

export const deliveryStatusConfig: Record<
  string,
  { label: string; color: string; borderColor: string; bgColor: string }
> = {
  'critical-delay': {
    label: 'CRITICAL DELAY',
    color: '#FFB4AB',
    borderColor: '#ef4444',
    bgColor: 'rgba(239,68,68,0.15)',
  },
  'on-schedule': {
    label: 'ON SCHEDULE',
    color: '#FFDB3C',
    borderColor: '#FFDB3C',
    bgColor: 'rgba(255,219,60,0.15)',
  },
  'awaiting-departure': {
    label: 'AWAITING',
    color: '#E4E2E1',
    borderColor: '#555',
    bgColor: 'rgba(228,226,225,0.1)',
  },
};

export const requestStatusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  'pending-approval': { label: 'PENDING', color: '#FF6B00', bg: 'rgba(255,107,0,0.15)' },
  'in-transit': { label: 'IN TRANSIT', color: '#FFDB3C', bg: 'rgba(255,219,60,0.15)' },
  'awaiting-stock': { label: 'AWAITING STOCK', color: '#E4E2E1', bg: 'rgba(228,226,225,0.1)' },
};

export const rentalStatusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  'urgent-return': { label: 'URGENT', color: '#FFB4AB', bg: 'rgba(255,180,171,0.15)' },
  active: { label: 'ACTIVE', color: '#FFDB3C', bg: 'rgba(255,219,60,0.15)' },
  scheduled: { label: 'SCHEDULED', color: '#E4E2E1', bg: 'rgba(228,226,225,0.1)' },
};
