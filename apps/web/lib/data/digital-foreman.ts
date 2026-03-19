/**
 * Digital Foreman — GPS-Verified Material Tracking
 * Pure data file for the product showcase page at /apps/digital-foreman
 */

// ============================================================================
// Types
// ============================================================================

export interface DeliveryEntry {
  ticketId: string;
  material: string;
  quantity: string;
  unit: string;
  supplier: string;
  time: string;
  date: string;
  status: 'verified' | 'pending' | 'flagged';
  lat: string;
  lng: string;
}

export interface MaterialSpec {
  label: string;
  value: string;
}

export interface InvoiceItem {
  invoiceId: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'outstanding' | 'processing';
}

// ============================================================================
// Module Definitions
// ============================================================================

export const foremanModules = [
  {
    id: 'entry',
    name: 'Material Entry',
    icon: 'add_a_photo',
    tagline: 'Log deliveries in under 60 seconds',
    description:
      'GPS-tagged, photo-verified delivery logging. Select material type, enter quantity, snap a proof photo — the system timestamps and geolocates everything automatically.',
    features: [
      'One-screen delivery entry with auto-GPS capture',
      'Photo proof of delivery with geospatial stamp',
      'Material type selection from project-specific catalog',
      'Truck ID and supplier tracking',
    ],
  },
  {
    id: 'log',
    name: 'Material Log',
    icon: 'inventory',
    tagline: 'Every delivery, searchable and verified',
    description:
      'Bento-style delivery dashboard with search, filters, and daily intake statistics. Featured entries with photo evidence front and center.',
    features: [
      'Searchable log with status and date filters',
      'Featured delivery cards with photo evidence',
      'Daily intake statistics and tonnage totals',
      'Exportable daily reports for project managers',
    ],
  },
  {
    id: 'verify',
    name: 'Material Verification',
    icon: 'fact_check',
    tagline: 'GPS-stamped proof you can trust',
    description:
      'Full verification workflow with geospatial stamps, asset hashing, compliance checks against project specifications, and digital receipts.',
    features: [
      'GPS coordinates and UTC timestamp on every photo',
      'SHA-256 asset hashing for tamper-proof records',
      'ASTM/CSA compliance checking against blueprints',
      'Digital receipt generation with material specs',
    ],
  },
  {
    id: 'billing',
    name: 'Billing & Invoicing',
    icon: 'receipt_long',
    tagline: 'From delivery to invoice, automated',
    description:
      'Thermal-receipt-style invoices with line items, HST calculation, barcode generation, and billing history with fiscal summaries.',
    features: [
      'Auto-generated invoices from verified deliveries',
      'Line items with tonnage pricing and surcharges',
      'HST calculation and fiscal period summaries',
      'PDF export and digital sharing',
    ],
  },
];

// ============================================================================
// Mock Data — Delivery Log
// ============================================================================

export const recentDeliveries: DeliveryEntry[] = [
  {
    ticketId: 'DF-8829-X',
    material: 'Rebar Type 4 (12mm)',
    quantity: '14.5',
    unit: 'Tonnes',
    supplier: 'Iron-Core Logistics',
    time: '08:14 AM',
    date: 'Nov 24',
    status: 'verified',
    lat: '34.0522° N',
    lng: '118.2437° W',
  },
  {
    ticketId: 'DF-8827',
    material: 'Ready-Mix Concrete C30',
    quantity: '8.5',
    unit: 'm\u00B3',
    supplier: 'CementPro GTA',
    time: '14:22',
    date: 'Nov 23',
    status: 'verified',
    lat: '34.0518° N',
    lng: '118.2440° W',
  },
  {
    ticketId: 'DF-8825',
    material: 'PVC Drainage 150mm',
    quantity: '48',
    unit: 'Units',
    supplier: 'BuildSupply Co',
    time: '09:15',
    date: 'Nov 23',
    status: 'pending',
    lat: '34.0525° N',
    lng: '118.2435° W',
  },
  {
    ticketId: 'DF-8820',
    material: 'Crushed Aggregate 20mm',
    quantity: '12.0',
    unit: 'Tonnes',
    supplier: 'Gravel King Inc',
    time: '16:45',
    date: 'Nov 22',
    status: 'verified',
    lat: '34.0520° N',
    lng: '118.2442° W',
  },
];

// ============================================================================
// Mock Data — Daily Stats
// ============================================================================

export const dailyStats = [
  { label: 'Total Tonnes', value: '242.8' },
  { label: 'Verified', value: '18' },
  { label: 'Pending', value: '3' },
  { label: 'Suppliers', value: '6' },
];

// ============================================================================
// Mock Data — Material Verification
// ============================================================================

export const verificationSpecs: MaterialSpec[] = [
  { label: 'Grade Type', value: 'Industrial C40/50' },
  { label: 'Aggregate Size', value: '20mm Crushed' },
  { label: 'Slump Class', value: 'S3 (100-150mm)' },
];

export const verificationMetrics = {
  netTonnage: '18.42',
  volume: '7.5',
  gpsCoords: 'N 79.9232\u00B0 W 82.4101\u00B0',
  timestamp: '14:32:01 UTC',
  assetHash: 'SH256: 8F2A...9C11',
  compliance: 'ASTM C94 Certified',
  complianceNote:
    'This material meets all structural load requirements as specified in project blueprint ARCH-802.',
  totalBilling: 1245.8,
};

// ============================================================================
// Mock Data — Invoices
// ============================================================================

export const invoiceItems: InvoiceItem[] = [
  {
    invoiceId: 'DF-8829',
    date: 'Oct 24, 2023',
    description: 'Gravel Grade A — 22.4 Tonnes',
    amount: 1398.94,
    status: 'processing',
  },
  {
    invoiceId: 'DF-8791',
    date: 'Oct 18, 2023',
    description: 'Concrete Paving',
    amount: 4250.0,
    status: 'paid',
  },
  {
    invoiceId: 'DF-8755',
    date: 'Oct 12, 2023',
    description: 'Steel Reinforcements',
    amount: 12890.15,
    status: 'outstanding',
  },
  {
    invoiceId: 'DF-8740',
    date: 'Oct 05, 2023',
    description: 'Equipment Rental',
    amount: 840.0,
    status: 'paid',
  },
];

export const fiscalSummary = {
  month: 'October',
  total: 18539.09,
  paid: 5648.94,
  outstanding: 12890.15,
};

// ============================================================================
// Mock Data — Receipt Line Items
// ============================================================================

export const receiptLines = [
  { item: 'Gravel — Grade A', detail: '22.4 Tonnes @ $45.00/T', amount: 1008.0 },
  { item: 'Delivery Surcharge', detail: 'Zone 4 — Heavy Logistics', amount: 145.0 },
  { item: 'Site Processing', detail: 'Standard Handling', amount: 85.0 },
];

export const receiptTotals = {
  subtotal: 1238.0,
  taxRate: 0.13,
  tax: 160.94,
  total: 1398.94,
};

// ============================================================================
// Stats & Colors
// ============================================================================

export const heroStats = [
  { value: 4, suffix: '', label: 'Modules' },
  { value: 242, suffix: 't', label: 'Logged Today' },
  { value: 60, suffix: 's', label: 'Per Entry' },
];

export const statusStyles: Record<string, { bg: string; text: string; icon: string }> = {
  verified: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: 'verified',
  },
  pending: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: 'pending',
  },
  flagged: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: 'warning',
  },
  paid: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: 'check_circle',
  },
  outstanding: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: 'warning',
  },
  processing: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: 'pending',
  },
};
