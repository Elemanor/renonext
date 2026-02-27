export const MOCK_ATTENDANCE = {
  stats: {
    totalWorkers: 12,
    avgHours: 7.8,
    totalOT: 4.5,
    onTimePercent: 92,
  },
  weeklyHours: [
    { day: 'Mon', regular: 84, overtime: 2 },
    { day: 'Tue', regular: 90, overtime: 5 },
    { day: 'Wed', regular: 78, overtime: 0 },
    { day: 'Thu', regular: 88, overtime: 3 },
    { day: 'Fri', regular: 82, overtime: 4 },
    { day: 'Sat', regular: 24, overtime: 6 },
    { day: 'Sun', regular: 0, overtime: 0 },
  ],
  workers: [
    { id: 'w1', name: 'Carlos Mendes', status: 'present' as const, checkIn: '06:45', checkOut: '15:30', hours: 8.0, overtime: 0, location: '123 Maple Ave' },
    { id: 'w2', name: 'Jean-Pierre Lafleur', status: 'present' as const, checkIn: '07:00', checkOut: '16:15', hours: 8.5, overtime: 0.5, location: '123 Maple Ave' },
    { id: 'w3', name: 'Andre Nguyen', status: 'present' as const, checkIn: '06:30', checkOut: '15:45', hours: 8.5, overtime: 0.5, location: '456 Oak Dr' },
    { id: 'w4', name: 'Mike Dubois', status: 'present' as const, checkIn: '07:15', checkOut: '16:00', hours: 8.0, overtime: 0, location: '123 Maple Ave' },
    { id: 'w5', name: 'Raj Patel', status: 'present' as const, checkIn: '07:00', checkOut: '15:30', hours: 7.5, overtime: 0, location: '789 Elm St' },
    { id: 'w6', name: 'Tom Wilson', status: 'absent' as const, checkIn: null, checkOut: null, hours: 0, overtime: 0, location: null },
  ],
};
