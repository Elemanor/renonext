export const MOCK_SCHEDULE = {
  cpmStats: {
    totalDuration: 18,
    criticalTasks: 4,
    avgFloat: 1.8,
    overallPercent: 42,
  },
  tasks: [
    { id: 't1', name: 'Excavation Planning', percent: 100, status: 'completed' as const, duration: 2, isCritical: true, assignee: 'Dubois WP' },
    { id: 't2', name: 'Foundation Excavation', percent: 100, status: 'completed' as const, duration: 3, isCritical: true, assignee: 'Dubois WP' },
    { id: 't3', name: 'Wall Cleaning & Repair', percent: 100, status: 'completed' as const, duration: 2, isCritical: true, assignee: 'Dubois WP' },
    { id: 't4', name: 'Apply Membrane', percent: 100, status: 'completed' as const, duration: 2, isCritical: true, assignee: 'Dubois WP' },
    { id: 't5', name: 'Drainage Board', percent: 60, status: 'in_progress' as const, duration: 1, isCritical: false, assignee: 'Dubois WP' },
    { id: 't6', name: 'Weeping Tile', percent: 0, status: 'pending' as const, duration: 2, isCritical: false, assignee: 'Dubois WP' },
    { id: 't7', name: 'Gravel & Filter', percent: 0, status: 'pending' as const, duration: 1, isCritical: false, assignee: 'Dubois WP' },
    { id: 't8', name: 'Pre-Backfill Inspection', percent: 0, status: 'pending' as const, duration: 1, isCritical: true, assignee: 'City Inspector' },
    { id: 't9', name: 'Backfill & Compact', percent: 0, status: 'pending' as const, duration: 2, isCritical: false, assignee: 'Dubois WP' },
    { id: 't10', name: 'Landscape Restoration', percent: 0, status: 'pending' as const, duration: 2, isCritical: false, assignee: 'Landscaper' },
  ],
};
