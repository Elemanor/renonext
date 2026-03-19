/**
 * The Proof — Immutable Verification Ledger
 * Pure data file for the product showcase page at /apps/the-proof
 */

// ============================================================================
// Types
// ============================================================================

export interface VerificationTicket {
  ticketId: string;
  type: string;
  material: string;
  location: string;
  coordinates: string;
  date: string;
  timestamp: string;
  hash: string;
  node: string;
  status: 'verified' | 'pending' | 'disputed';
  authenticityScore: number;
}

// ============================================================================
// Module Definitions
// ============================================================================

export const proofModules = [
  {
    id: 'capture',
    name: 'Evidence Capture',
    icon: 'photo_camera',
    tagline: 'GPS-stamped proof in one tap',
    description:
      'Every photo is automatically tagged with GPS coordinates, UTC timestamp, and device metadata. No manual input required.',
    features: [
      'Auto GPS geotagging on every capture',
      'UTC timestamp with millisecond precision',
      'Device fingerprint and sensor metadata',
      'Offline capture with deferred verification',
    ],
  },
  {
    id: 'hash',
    name: 'Cryptographic Hashing',
    icon: 'enhanced_encryption',
    tagline: 'Tamper-proof from the first byte',
    description:
      'SHA-256 hashing creates a unique digital fingerprint for every piece of evidence. Any modification breaks the chain.',
    features: [
      'SHA-256 asset hashing on capture',
      'Chain-of-custody verification',
      'Tamper detection with hash comparison',
      'Multi-file batch hashing support',
    ],
  },
  {
    id: 'verify',
    name: 'Verification Engine',
    icon: 'fact_check',
    tagline: 'Compliance in 2.4 milliseconds',
    description:
      'Automated compliance checking against project specifications, building codes, and contractual requirements.',
    features: [
      'ASTM/CSA compliance verification',
      'Blueprint spec matching',
      'Material grade validation',
      'Automated pass/fail with audit notes',
    ],
  },
  {
    id: 'seal',
    name: 'Immutable Ledger',
    icon: 'history_edu',
    tagline: 'Once sealed, forever proven',
    description:
      'Verified records are sealed into an immutable ledger. No edits, no deletions — permanent proof of what happened on site.',
    features: [
      'Append-only immutable records',
      'Zero-knowledge identity protocol',
      'AES-256 metadata encryption',
      'Cross-node replication for redundancy',
    ],
  },
];

// ============================================================================
// Mock Data — Recent Verifications
// ============================================================================

export const recentVerifications: VerificationTicket[] = [
  {
    ticketId: '#4532',
    type: 'CONCRETE_LOG',
    material: 'Ready-Mix Concrete C30',
    location: 'Manhattan, NYC',
    coordinates: '40.7128\u00B0 N, 74.0060\u00B0 W',
    date: 'Oct 24, 2024',
    timestamp: '14:22:11 GMT-4',
    hash: '0x821f...921a',
    node: 'ProofNode-04',
    status: 'verified',
    authenticityScore: 99.9,
  },
  {
    ticketId: '#4531',
    type: 'REBAR_DELIVERY',
    material: 'Rebar Type 4 (12mm)',
    location: 'Oakville, ON',
    coordinates: '43.4675\u00B0 N, 79.6877\u00B0 W',
    date: 'Oct 24, 2024',
    timestamp: '11:08:42 GMT-4',
    hash: '0x3f1a...b82c',
    node: 'ProofNode-02',
    status: 'verified',
    authenticityScore: 99.8,
  },
  {
    ticketId: '#4530',
    type: 'INSPECTION_LOG',
    material: 'Foundation Wall \u2014 Section B',
    location: 'Mississauga, ON',
    coordinates: '43.5890\u00B0 N, 79.6441\u00B0 W',
    date: 'Oct 23, 2024',
    timestamp: '16:45:03 GMT-4',
    hash: '0x7c2d...e41f',
    node: 'ProofNode-01',
    status: 'verified',
    authenticityScore: 99.9,
  },
  {
    ticketId: '#4529',
    type: 'MATERIAL_RECEIPT',
    material: 'PVC Drainage 150mm',
    location: 'Toronto, ON',
    coordinates: '43.6532\u00B0 N, 79.3832\u00B0 W',
    date: 'Oct 23, 2024',
    timestamp: '09:12:28 GMT-4',
    hash: '0x91ab...d73e',
    node: 'ProofNode-03',
    status: 'pending',
    authenticityScore: 97.2,
  },
];

// ============================================================================
// Stats
// ============================================================================

export const heroStats = [
  { value: 4, suffix: '', label: 'Modules' },
  { value: 99, suffix: '%', label: 'Accuracy' },
  { value: 2, suffix: 'ms', label: 'Latency' },
];

export const ledgerStats = [
  { label: 'Verified This Month', value: '2,847' },
  { label: 'Active Nodes', value: '14' },
  { label: 'Avg Latency', value: '2.4ms' },
  { label: 'Uptime', value: '99.99%' },
];

// ============================================================================
// Verification Flow Steps
// ============================================================================

export const verificationFlow = [
  {
    step: 1,
    icon: 'photo_camera',
    title: 'Capture',
    description: 'GPS-tagged photo with UTC timestamp and device metadata.',
  },
  {
    step: 2,
    icon: 'enhanced_encryption',
    title: 'Hash',
    description:
      'SHA-256 fingerprint generated \u2014 any future change breaks the chain.',
  },
  {
    step: 3,
    icon: 'fact_check',
    title: 'Verify',
    description:
      'Automated compliance check against specs and building codes.',
  },
  {
    step: 4,
    icon: 'history_edu',
    title: 'Seal',
    description: 'Immutable record etched into the ledger. Permanent.',
  },
];

// ============================================================================
// Integrations
// ============================================================================

export const integrations = [
  {
    app: 'Digital Foreman',
    icon: 'precision_manufacturing',
    href: '/apps/digital-foreman',
    description:
      'Every material delivery logged in Digital Foreman gets a Proof verification ticket automatically.',
  },
  {
    app: 'Obsidian Sentinel',
    icon: 'security',
    href: '/apps/sentinel',
    description:
      'Project milestones and inspections in Sentinel generate immutable audit trails via The Proof.',
  },
  {
    app: 'HouseFax',
    icon: 'home',
    href: '/house-fax',
    description:
      'Property records in HouseFax are backed by Proof verification for every renovation event.',
  },
];

// ============================================================================
// Status Styles
// ============================================================================

export const statusStyles: Record<
  string,
  { bg: string; text: string; icon: string }
> = {
  verified: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: 'verified',
  },
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    icon: 'pending',
  },
  disputed: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: 'gpp_bad',
  },
};
