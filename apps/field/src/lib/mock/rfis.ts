export const MOCK_RFIS = {
  items: [
    { id: 'r1', number: 'RFI-019', subject: 'Foundation wall crack treatment method', status: 'open' as const, priority: 'high' as const, createdAt: '2026-02-08', daysOpen: 5 },
    { id: 'r2', number: 'RFI-020', subject: 'Drainage board overlap specification', status: 'in_review' as const, priority: 'medium' as const, createdAt: '2026-02-09', daysOpen: 4 },
    { id: 'r3', number: 'RFI-021', subject: 'Gravel specification — 3/4 clear vs pea gravel', status: 'answered' as const, priority: 'medium' as const, createdAt: '2026-02-07', daysOpen: 0, responseTime: 3 },
    { id: 'r4', number: 'RFI-022', subject: 'Weeping tile connection to existing sump', status: 'open' as const, priority: 'urgent' as const, createdAt: '2026-02-10', daysOpen: 3 },
    { id: 'r5', number: 'RFI-023', subject: 'Backfill material approval — native vs imported', status: 'answered' as const, priority: 'low' as const, createdAt: '2026-02-05', daysOpen: 0, responseTime: 2 },
    { id: 'r6', number: 'RFI-024', subject: 'Membrane thickness at window wells', status: 'answered' as const, priority: 'high' as const, createdAt: '2026-02-06', daysOpen: 0, responseTime: 4 },
    { id: 'r7', number: 'RFI-025', subject: 'Grading slope requirement at property line', status: 'closed' as const, priority: 'medium' as const, createdAt: '2026-02-03', daysOpen: 0 },
    { id: 'r8', number: 'RFI-026', subject: 'EPS insulation R-value for below grade', status: 'open' as const, priority: 'medium' as const, createdAt: '2026-02-11', daysOpen: 2 },
  ],
  statusDistribution: [
    { name: 'Open', value: 3, color: '#3b82f6' },
    { name: 'In Review', value: 1, color: '#f59e0b' },
    { name: 'Answered', value: 3, color: '#10b981' },
    { name: 'Closed', value: 1, color: '#64748b' },
  ],
  avgResponseTime: 3,
};
