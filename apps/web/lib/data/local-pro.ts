/**
 * LocalPro — Project Control Platform
 * Pure data file for the product showcase page at /apps/local-pro
 */

// ============================================================================
// Module Definitions
// ============================================================================

export const localProModules = [
  {
    id: 'gps',
    name: 'GPS Verified Check-in',
    icon: 'location_on',
    tagline: 'Know who\u2019s on site, always',
    description:
      'Geofenced attendance tracking with precision GPS coordinates. Every check-in is verified, timestamped, and logged automatically.',
    features: [
      'Automatic geofence-based check-in/check-out',
      'Precision GPS coordinates on every entry',
      'Crew status dashboard with active headcount',
      'Historical attendance logs with export',
    ],
  },
  {
    id: 'photos',
    name: 'Photo Compliance Logs',
    icon: 'photo_library',
    tagline: 'Visual proof, organized by trade',
    description:
      'Timestamped, GPS-tagged photos organized by inspection type. Upload daily progress, tag by sector, and build a compliance archive.',
    features: [
      'Grid-based photo organization by sector',
      'GPS and timestamp metadata on every photo',
      'Inspection categorization (rebar, concrete, electrical)',
      'One-tap daily photo upload from the field',
    ],
  },
  {
    id: 'vault',
    name: 'Project Vault',
    icon: 'account_balance_wallet',
    tagline: 'Funds secured. Milestones proven.',
    description:
      'Real-time financial dashboard with escrow protection. See total disbursements, utilization rates, and milestone funding status at a glance.',
    features: [
      'Live disbursement tracking with utilization %',
      'Escrow-secured milestone funds',
      'Phase-by-phase financial breakdown',
      'Proof-based fund release workflow',
    ],
  },
  {
    id: 'team',
    name: 'Team Management',
    icon: 'group',
    tagline: 'Your crew, fully documented',
    description:
      'Manage site teams with role-based permissions, instant messaging, and certification tracking for every crew member.',
    features: [
      'Role-based access: Inspector, Lead, Manager',
      'In-app messaging per project',
      'Certification and license tracking',
      'Permission management per site',
    ],
  },
];

// ============================================================================
// Stats
// ============================================================================

export const heroStats = [
  { value: 4, suffix: '', label: 'Modules' },
  { value: 14, suffix: '', label: 'Crew Active' },
  { value: 80, suffix: '%', label: 'Utilized' },
];

export const projectStats = [
  { label: 'Total Disbursed', value: '$1,245,000' },
  { label: 'Utilization', value: '80%' },
  { label: 'Active Crew', value: '14' },
  { label: 'Status', value: 'On Schedule' },
];

// ============================================================================
// Mock Data — Team
// ============================================================================

export const teamMembers = [
  { name: 'Marcus Thorne', role: 'Site Manager', initials: 'MT' },
  { name: 'Elena Rodriguez', role: 'Chief Inspector', initials: 'ER' },
  { name: 'David Chen', role: 'Structural Lead', initials: 'DC' },
];

// ============================================================================
// Mock Data — Photo Entries
// ============================================================================

export const photoEntries = [
  { label: 'Grid Sector A-1', category: 'Rebar', icon: 'straighten' },
  { label: 'Joint Tie-off Details', category: 'Rebar', icon: 'link' },
  { label: 'Support Columns #4-8', category: 'Structural', icon: 'foundation' },
];

// ============================================================================
// Mock Data — Check-in Log
// ============================================================================

export const checkInLog = [
  { name: 'J. Ramirez (Foreman)', time: '06:58 AM', active: true },
  { name: 'M. Thorne (Site Mgr)', time: '07:42 AM', active: true },
  { name: 'S. Park (Electrician)', time: '08:15 AM', active: true },
  { name: 'K. Wu (Plumbing)', time: 'Expected: 09:00 AM', active: false },
];

// ============================================================================
// Mock Data — Milestones
// ============================================================================

export const milestones = [
  { name: 'Excavation & Grading', status: 'complete' as const, pct: 100 },
  { name: 'Foundation Concrete Pour', status: 'pending' as const, pct: 0 },
  { name: 'Structural Steel', status: 'locked' as const, pct: 0 },
  { name: 'Mechanical / Electrical', status: 'locked' as const, pct: 0 },
];
