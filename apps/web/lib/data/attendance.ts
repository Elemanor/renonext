/**
 * SiteSafe — GPS Attendance App
 * Pure data file for the product showcase page at /apps/attendance
 */

// ============================================================================
// Module Definitions
// ============================================================================

export const attendanceModules = [
  {
    id: 'gps-clockin',
    name: 'GPS Clock-In',
    icon: 'location_on',
    tagline: 'Geofenced presence verification',
    description:
      'Workers clock in with a single tap. The app confirms they are physically inside the site geofence before accepting the check-in — no more signing in from the parking lot.',
    features: [
      'One-tap clock-in with geofence verification',
      'GPS coordinates logged with ±3 m accuracy',
      'Location proof attached to every shift record',
      'Offline clock-in syncs when connection returns',
    ],
  },
  {
    id: 'crew-board',
    name: 'Crew Presence Board',
    icon: 'groups',
    tagline: 'Real-time site headcount',
    description:
      'Foremen see who is on site right now, who is late, who is absent, and who clocked out early — across every active project in a single view.',
    features: [
      'Live headcount per site with status badges',
      'Absent / late / on-site filtering',
      'Multi-site overview for superintendents',
      'Push alerts for no-shows and early departures',
    ],
  },
  {
    id: 'timesheets',
    name: 'Digital Timesheets',
    icon: 'description',
    tagline: 'Auto-populated, zero data entry',
    description:
      'Weekly timesheets build themselves from daily clock-ins. Workers review, foremen approve, and payroll exports — no paper, no spreadsheets, no disputes.',
    features: [
      'Auto-populated from daily clock-in / clock-out',
      'Weekly approval workflow: Draft → Submitted → Approved',
      'Edit history with audit trail',
      'Bulk approval for foremen and superintendents',
    ],
  },
  {
    id: 'overtime',
    name: 'Overtime & Pay Codes',
    icon: 'calculate',
    tagline: 'Automatic OT calculation',
    description:
      'Configure regular, OT, double-time, travel, and standby multipliers once. The system calculates pay codes automatically as hours accumulate each week.',
    features: [
      'Configurable OT thresholds (daily / weekly)',
      'Multiple pay-code multipliers (1×, 1.5×, 2×)',
      'Cost-code tagging per work segment',
      'Real-time weekly OT tracker for workers',
    ],
  },
  {
    id: 'payroll-export',
    name: 'Payroll Export',
    icon: 'download',
    tagline: 'CSV to your payroll system',
    description:
      'Export approved timesheets grouped by contract, cost code, or worker. Drop the CSV straight into your payroll system — no re-keying required.',
    features: [
      'Export by contract, cost code, or worker',
      'CSV and PDF report formats',
      'Date-range and site filters',
      'Integrates with QuickBooks and Sage',
    ],
  },
];

// ============================================================================
// Hero Stats
// ============================================================================

export const heroStats = [
  { value: '6', label: 'Features' },
  { value: '±3 m', label: 'GPS Accuracy' },
  { value: '< 2s', label: 'Clock-in' },
  { value: 'Offline', label: 'First' },
];

// ============================================================================
// Mock Data — Crew Board
// ============================================================================

export const crewMembers = [
  { name: 'Marcus Cole', role: 'Carpenter', status: 'on-site', time: '06:58 AM', initials: 'MC', color: 'bg-emerald-500' },
  { name: 'Diana Reyes', role: 'Electrician', status: 'on-site', time: '07:02 AM', initials: 'DR', color: 'bg-primary' },
  { name: 'Jake Okafor', role: 'Labourer', status: 'on-site', time: '07:11 AM', initials: 'JO', color: 'bg-sky-500' },
  { name: 'Priya Sharma', role: 'Plumber', status: 'late', time: '—', initials: 'PS', color: 'bg-amber-500' },
  { name: 'Tyler Banks', role: 'Iron Worker', status: 'on-site', time: '06:45 AM', initials: 'TB', color: 'bg-violet-500' },
  { name: 'Nadia Petrova', role: 'Safety Officer', status: 'absent', time: '—', initials: 'NP', color: 'bg-rose-500' },
];

// ============================================================================
// Mock Data — Timesheet Entries
// ============================================================================

export const timesheetEntries = [
  { date: 'Mon, Mar 16', project: 'Lakeshore Condos — Phase 2', inTime: '07:00 AM', outTime: '03:30 PM', hours: 8.5, ot: false },
  { date: 'Tue, Mar 17', project: 'Lakeshore Condos — Phase 2', inTime: '06:45 AM', outTime: '05:15 PM', hours: 10.5, ot: true },
  { date: 'Wed, Mar 18', project: 'Highway 401 Bridge Deck', inTime: '07:00 AM', outTime: '03:00 PM', hours: 8.0, ot: false },
];
