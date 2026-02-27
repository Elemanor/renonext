// Chart-specific mock data for web app project views
// Used by KPI sparklines, schedule chart, reports chart, progress tab charts

export const kpiSparklines = {
  progress: [12, 18, 22, 25, 28, 32, 40],
  scheduleConfidence: [92, 90, 88, 85, 88, 88, 88],
  workers: [2, 3, 3, 3, 3, 3, 3],
  spent: [1850, 3200, 4400, 5550, 6100, 6800, 7400],
};

export const crewPerDay = [
  { day: 'Mon', crew: 3 },
  { day: 'Tue', crew: 3 },
  { day: 'Wed', crew: 3 },
  { day: 'Thu', crew: 3 },
  { day: 'Fri', crew: 4 },
  { day: 'Sat', crew: 0 },
  { day: 'Sun', crew: 0 },
];

export const workerHoursPerReport = [
  { date: 'Mar 3', hours: 10 },
  { date: 'Mar 5', hours: 24 },
  { date: 'Mar 7', hours: 24 },
  { date: 'Mar 10', hours: 22 },
  { date: 'Mar 11', hours: 24 },
  { date: 'Mar 12', hours: 24 },
];

export const stageTimeline = [
  { stage: 'Prep & Excavation', planned: 5, actual: 5 },
  { stage: 'Waterproofing', planned: 7, actual: 3 },
  { stage: 'Backfill & Restore', planned: 4, actual: 0 },
];

export const costSCurve = [
  { week: 'Week 1', planned: 1850, actual: 1850 },
  { week: 'Week 2', planned: 7400, actual: 7400 },
  { week: 'Week 3', planned: 14800, actual: 7400 },
  { week: 'Week 4', planned: 18500, actual: null },
];

// Additional mock projects for portfolio view
export const mockProjects = [
  {
    id: 'pr300000-0000-0000-0000-000000000003',
    title: 'Basement Waterproofing — 123 Maple Ave',
    address: '123 Maple Avenue, Toronto, ON M4E 1W3',
    health: 'on_track' as const,
    percent_complete: 40,
    contract_value: 18500,
    status: 'active' as const,
  },
  {
    id: 'pr300000-0000-0000-0000-000000000010',
    title: 'Foundation Repair — 45 Oak Street',
    address: '45 Oak Street, Markham, ON L3P 2T1',
    health: 'at_risk' as const,
    percent_complete: 65,
    contract_value: 24200,
    status: 'active' as const,
  },
  {
    id: 'pr300000-0000-0000-0000-000000000011',
    title: 'Exterior Drainage — 8 Pine Crescent',
    address: '8 Pine Crescent, Scarborough, ON M1B 5K7',
    health: 'on_track' as const,
    percent_complete: 90,
    contract_value: 12800,
    status: 'active' as const,
  },
];

export const portfolioHealth = [
  { name: 'On Track', value: 2, color: '#10b981' },
  { name: 'At Risk', value: 1, color: '#f59e0b' },
  { name: 'Behind', value: 0, color: '#ef4444' },
];

export const clientNotificationsRecent = [
  {
    id: 'cn-002',
    title: 'Decision needed: Drainage board upgrade',
    severity: 'alert' as const,
    created_at: '2026-03-12T10:00:00Z',
  },
  {
    id: 'cn-001',
    title: 'Vibration expected Thursday',
    severity: 'warning' as const,
    created_at: '2026-03-11T17:30:00Z',
  },
  {
    id: 'cn-006',
    title: 'Rain forecast may delay Wednesday work',
    severity: 'warning' as const,
    created_at: '2026-03-10T20:00:00Z',
  },
  {
    id: 'cn-004',
    title: 'Driveway blocked Friday morning',
    severity: 'warning' as const,
    created_at: '2026-03-12T14:00:00Z',
  },
  {
    id: 'cn-005',
    title: 'Stage 1 payment released — $5,550',
    severity: 'info' as const,
    created_at: '2026-03-07T16:30:00Z',
  },
];
