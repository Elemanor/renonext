// SitePulse — GPS Check-In/Check-Out Time Tracking (Construction Central)
// Workers never manually fill timesheets. Tap Check In / Check Out with GPS.

export const sitePulseModules = [
  {
    name: 'GPS Clock-In',
    icon: 'location_on',
    description: 'Geofenced check-in confirms workers are physically on site.',
    features: [
      'GPS-verified location within 50m of job site perimeter',
      'Photo capture at check-in for visual verification',
      'Safety sign-off acknowledgment before shift starts',
      'Automatic overtime trigger when shift exceeds 8 hours',
    ],
  },
  {
    name: 'Crew Board',
    icon: 'groups',
    description: 'Real-time view of who is on site, their trades, and current status.',
    features: [
      'Live status updates: on-site, on-break, off-site, or absent',
      'Hours logged today per worker with running totals',
      'Trade and role badges for quick crew composition view',
      'Drill-down to individual timesheets and shift history',
    ],
  },
  {
    name: 'Timesheets',
    icon: 'schedule',
    description: 'Automated time tracking with site codes and project allocation.',
    features: [
      'Daily breakdown of regular vs overtime hours per worker',
      'Multi-site time allocation with project cost codes',
      'Export to CSV or Excel for payroll processing',
      'Historical archive with search and filter capabilities',
    ],
  },
  {
    name: 'Overtime Automation',
    icon: 'timer',
    description: 'Auto-detect OT based on provincial labor rules and union contracts.',
    features: [
      'Configurable thresholds: daily (>8h), weekly (>40h), statutory holidays',
      'Union rate multipliers: 1.5x, 2x, or custom rates',
      'Real-time alerts when workers approach OT thresholds',
      'Built-in compliance with Ontario ESA and BC Employment Standards',
    ],
  },
  {
    name: 'Payroll Export',
    icon: 'account_balance',
    description: 'One-click export to QuickBooks, ADP, Sage, or generic CSV.',
    features: [
      'Formatted output matches payroll system import specs',
      'Includes worker ID, hours, rates, cost codes, and site allocation',
      'Batch export by pay period (weekly, bi-weekly, semi-monthly)',
      'Audit trail logs all exports with timestamp and user',
    ],
  },
  {
    name: 'Shift Management',
    icon: 'event_note',
    description: 'Schedule shifts, assign crews, and track attendance patterns.',
    features: [
      'Drag-and-drop shift scheduler with conflict detection',
      'Template shifts for recurring weekly schedules',
      'Absence tracking with reason codes (sick, vacation, personal)',
      'Notification system for shift assignments and changes',
    ],
  },
];

// Hero stats
export const heroStats = [
  { label: 'Workers Tracked', value: '2,400+' },
  { label: 'Hours Logged / Day', value: '18K' },
  { label: 'Payroll Accuracy', value: '99.7%' },
  { label: 'Sites Active', value: '140' },
];

// Team Pulse stats (Dashboard screen)
export const teamPulseStats = {
  present: 42,
  remote: 12,
  away: 5,
};

// Weekly Focus widget (Dashboard screen)
export const weeklyFocus = {
  totalHours: 164.5,
  avgArrival: '06:42',
  efficiency: 94,
};

// Team members for Team Pulse screen
export const teamMembers: {
  name: string;
  initials: string;
  role: string;
  unit: string;
  zone: string;
  checkIn: string;
  status: 'present' | 'remote' | 'away';
}[] = [
  { name: 'J. Overton', initials: 'JO', role: 'Site Supervisor', unit: 'Operations', zone: 'Zone A – Foundation', checkIn: '06:30 AM', status: 'present' },
  { name: 'A. Miller', initials: 'AM', role: 'Electrician', unit: 'Engineering', zone: 'Zone B – Electrical', checkIn: '06:45 AM', status: 'present' },
  { name: 'R. Kumar', initials: 'RK', role: 'Concrete Foreman', unit: 'Operations', zone: 'Zone A – Foundation', checkIn: '06:38 AM', status: 'present' },
  { name: 'S. Davis', initials: 'SD', role: 'Safety Officer', unit: 'Safety', zone: 'Zone C – General', checkIn: '07:00 AM', status: 'present' },
  { name: 'L. Chen', initials: 'LC', role: 'Plumber', unit: 'Engineering', zone: 'Zone D – Plumbing', checkIn: '—', status: 'remote' },
  { name: 'M. Brown', initials: 'MB', role: 'Carpenter', unit: 'Operations', zone: 'Zone B – Framing', checkIn: '—', status: 'remote' },
  { name: 'T. Wilson', initials: 'TW', role: 'Laborer', unit: 'Logistics', zone: 'Zone A – Foundation', checkIn: '—', status: 'away' },
];

// Timesheet summary (Timesheet screen hero)
export const timesheetSummary = {
  totalHours: 42.5,
  regular: 40,
  overtime: 2.5,
  gpsVerified: 100,
};

// Project allocations (Timesheet screen)
export const projectAllocations = [
  { code: 'PRJ-2847', name: 'Riverside Tower – Foundation', hours: 24.0, percentage: 56, color: '#FF6D00' },
  { code: 'PRJ-1923', name: 'Harbor View – Structural', hours: 12.5, percentage: 29, color: '#005DB7' },
  { code: 'PRJ-3156', name: 'Metro Station – Electrical', hours: 6.0, percentage: 15, color: '#22c55e' },
];

// Daily timesheet entries (Timesheet screen)
export const dailyEntries = [
  { day: 'Mon', date: 'Mar 10', project: 'Riverside Tower', timeIn: '06:30', timeOut: '15:30', total: 9.0, verified: true },
  { day: 'Tue', date: 'Mar 11', project: 'Harbor View', timeIn: '06:45', timeOut: '15:15', total: 8.5, verified: true },
  { day: 'Wed', date: 'Mar 12', project: 'Riverside Tower', timeIn: '06:30', timeOut: '15:00', total: 8.5, verified: true },
];

// Admin metrics (Admin Overview screen)
export const adminMetrics = {
  totalActive: 142,
  healthIndex: 94.2,
  present: 158,
  late: 4,
  onLeave: 12,
  changeVsYesterday: 12,
};

// Weekly trends bar chart (Admin Overview)
export const weeklyTrends = [
  { day: 'Mon', actual: 85, target: 90 },
  { day: 'Tue', actual: 90, target: 90 },
  { day: 'Wed', actual: 88, target: 90 },
  { day: 'Thu', actual: 92, target: 90 },
  { day: 'Fri', actual: 87, target: 90 },
  { day: 'Sat', actual: 45, target: 50 },
  { day: 'Sun', actual: 20, target: 25 },
];

// Recent status list (Admin Overview)
export const recentStatus: {
  name: string;
  initials: string;
  role: string;
  status: 'on-site' | 'off-site' | 'late';
}[] = [
  { name: 'J. Overton', initials: 'JO', role: 'Site Supervisor', status: 'on-site' },
  { name: 'A. Miller', initials: 'AM', role: 'Electrician', status: 'on-site' },
  { name: 'T. Wilson', initials: 'TW', role: 'Laborer', status: 'late' },
  { name: 'L. Chen', initials: 'LC', role: 'Plumber', status: 'off-site' },
];
