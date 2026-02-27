export const MOCK_MATERIALS = {
  stats: {
    totalRequests: 14,
    pendingApproval: 3,
    totalEstimatedCost: 28750,
  },
  costByStatus: [
    { status: 'Submitted', cost: 4200 },
    { status: 'Approved', cost: 8500 },
    { status: 'Ordered', cost: 12300 },
    { status: 'Delivered', cost: 3750 },
  ],
  requests: [
    { id: 'm1', number: 'MR-101', items: ['Rubberized membrane (4 rolls)', 'Primer (2 gal)'], urgency: 'high' as const, status: 'delivered' as const, cost: 3200, neededBy: '2026-02-10' },
    { id: 'm2', number: 'MR-102', items: ['Hydraulic cement (2 pails)'], urgency: 'medium' as const, status: 'delivered' as const, cost: 340, neededBy: '2026-02-09' },
    { id: 'm3', number: 'MR-103', items: ['Dimple drainage board (200 sqft)', 'Fasteners'], urgency: 'high' as const, status: 'ordered' as const, cost: 1400, neededBy: '2026-02-12' },
    { id: 'm4', number: 'MR-104', items: ['4" PVC weeping tile (100ft)', 'Filter fabric (200ft)'], urgency: 'critical' as const, status: 'submitted' as const, cost: 850, neededBy: '2026-02-13' },
    { id: 'm5', number: 'MR-105', items: ['3/4" clear gravel (8 tons)'], urgency: 'medium' as const, status: 'approved' as const, cost: 960, neededBy: '2026-02-14' },
    { id: 'm6', number: 'MR-106', items: ['Topsoil (5 yards)', 'Grass seed (20 lbs)'], urgency: 'low' as const, status: 'submitted' as const, cost: 450, neededBy: '2026-02-20' },
  ],
};
