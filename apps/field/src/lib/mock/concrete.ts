export const MOCK_CONCRETE = {
  orders: [
    { id: 'co1', code: 'CO-038', supplier: 'Holcim Ready Mix', pourDate: '2026-02-10', plannedVol: 12, actualVol: 11.5, status: 'completed' as const, loads: 3 },
    { id: 'co2', code: 'CO-039', supplier: 'Lafarge Toronto', pourDate: '2026-02-11', plannedVol: 8, actualVol: 8.2, status: 'completed' as const, loads: 2 },
    { id: 'co3', code: 'CO-040', supplier: 'Holcim Ready Mix', pourDate: '2026-02-12', plannedVol: 15, actualVol: 14.8, status: 'completed' as const, loads: 4 },
    { id: 'co4', code: 'CO-041', supplier: 'Lafarge Toronto', pourDate: '2026-02-13', plannedVol: 10, actualVol: 6, status: 'in_progress' as const, loads: 2 },
    { id: 'co5', code: 'CO-042', supplier: 'Holcim Ready Mix', pourDate: '2026-02-14', plannedVol: 18, actualVol: 0, status: 'scheduled' as const, loads: 5 },
  ],
  volumeChart: [
    { order: 'CO-038', planned: 12, actual: 11.5 },
    { order: 'CO-039', planned: 8, actual: 8.2 },
    { order: 'CO-040', planned: 15, actual: 14.8 },
    { order: 'CO-041', planned: 10, actual: 6 },
    { order: 'CO-042', planned: 18, actual: 0 },
  ],
  efficiency: 93,
};
