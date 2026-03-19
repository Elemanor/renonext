/**
 * FieldForce — Field Worker Mobile App
 * Pure data file for the product showcase page at /apps/field-force
 */

// ============================================================================
// Module Definitions
// ============================================================================

export const fieldForceModules = [
  {
    id: 'dashboard',
    name: 'Worker Dashboard',
    icon: 'dashboard',
    tagline: 'Your shift at a glance',
    description:
      'A personalized home screen with check-in status, assigned projects, weekly hour progress, weather conditions, and recent activity — all before you leave your truck.',
    features: [
      'One-tap GPS check-in with project assignment',
      'Weekly hour tracker with progress bar',
      'Live weather and site conditions',
      'Recent activity feed with shift history',
    ],
  },
  {
    id: 'checkin',
    name: 'GPS Check-in',
    icon: 'location_on',
    tagline: 'Verify presence, verify identity',
    description:
      'Geofenced location verification paired with selfie-based identity confirmation. Tamper-proof, GPS-stamped, and logged to the second.',
    features: [
      'Live map with geofence boundary overlay',
      'Selfie capture vs. reference photo match',
      'GPS coordinates + accuracy percentage',
      'Secure authentication before shift start',
    ],
  },
  {
    id: 'projects',
    name: 'Project Details',
    icon: 'inventory_2',
    tagline: 'Everything about the site',
    description:
      'Full project briefs with satellite map preview, supervisor contact, site access logistics, safety briefing requirements, work order specs, and live weather.',
    features: [
      'Satellite map with GPS-verified address',
      'Supervisor profile with one-tap contact',
      'Safety briefing with hazard and PPE levels',
      'Work order with scheduled start and finish',
    ],
  },
  {
    id: 'attendance',
    name: 'Attendance History',
    icon: 'history',
    tagline: 'Every hour, accounted for',
    description:
      'Complete attendance logs organized by day with check-in/check-out times, total hours, project assignment, and verification status.',
    features: [
      'Monthly summary with total hours and active days',
      'Daily log cards with in/out timestamps',
      'GPS-verified status badge on every entry',
      'Previous month archive with export',
    ],
  },
];

// ============================================================================
// Stats
// ============================================================================

export const heroStats = [
  { value: '4', label: 'Screens' },
  { value: '98%', label: 'GPS Accuracy' },
  { value: '< 3s', label: 'Check-in Time' },
  { value: 'Offline', label: 'Ready' },
];

// ============================================================================
// Mock Data — Dashboard
// ============================================================================

export const recentActivity = [
  { icon: 'done_all', label: 'Shift Completed', detail: 'Yesterday at 17:04 — 8h 12m duration', code: 'WEST-449' },
  { icon: 'file_upload', label: 'Safety Report Submitted', detail: 'Yesterday at 16:45 — North Site', code: 'REP-02' },
];

export const myProjects = [
  { icon: 'foundation', name: 'Foundation Phase B', location: 'Harbor Gateway — 0.8km away' },
  { icon: 'architecture', name: 'Steel Framework', location: 'Central Hub — 2.4km away' },
];

// ============================================================================
// Mock Data — Attendance
// ============================================================================

export const attendanceLogs = [
  { date: 'Today, Oct 24', project: 'Bridge North Expansion', location: 'Sector 7-B, Industrial Park', inTime: '08:00 AM', outTime: '05:30 PM', total: '9.5 hrs' },
  { date: 'Oct 23', project: 'Bridge North Expansion', location: 'Sector 7-B, Industrial Park', inTime: '08:15 AM', outTime: '05:00 PM', total: '8.75 hrs' },
  { date: 'Oct 22', project: 'Warehouse Logistics Hub', location: 'Westside Terminal', inTime: '07:30 AM', outTime: '04:30 PM', total: '9.0 hrs' },
];
