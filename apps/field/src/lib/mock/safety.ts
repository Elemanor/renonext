export const MOCK_SAFETY = {
  daysWithoutIncident: 47,
  incidentTrend: [
    { month: 'Sep', incidents: 3 },
    { month: 'Oct', incidents: 2 },
    { month: 'Nov', incidents: 1 },
    { month: 'Dec', incidents: 1 },
    { month: 'Jan', incidents: 0 },
    { month: 'Feb', incidents: 0 },
  ],
  stats: {
    meetingsThisMonth: 8,
    expiringCerts: 2,
    openTickets: 3,
  },
  certExpiry: [
    { range: '>90 days', count: 18, color: '#10b981' },
    { range: '30-90 days', count: 5, color: '#f59e0b' },
    { range: '<30 days', count: 2, color: '#ef4444' },
  ],
  safetyScore: { value: 94, trend: [88, 90, 91, 89, 92, 93, 94] },
};
