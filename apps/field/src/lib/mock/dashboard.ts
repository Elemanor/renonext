export const MOCK_DASHBOARD = {
  weather: { temp: 12, condition: 'Partly Cloudy', icon: '⛅', wind: '12 km/h NW', humidity: 65 },
  project: { name: 'Riverside Commons Phase 2', address: '1240 River Rd, Austin TX' },
  notifications: { unread: 3 },
  stats: {
    workersOnSite: { value: 6, trend: [4, 5, 7, 6, 5, 8, 6] },
    safetyScore: { value: 94, trend: [90, 88, 91, 93, 92, 95, 94] },
    scheduleStatus: { label: 'On Track', detail: '2 days ahead' },
    openItems: { value: 3, breakdown: '1 RFI · 2 tickets' },
  },
  weeklySchedule: [
    {
      day: 'Mon', date: '9', crew: 8, status: 'completed' as const,
      tasks: [
        { name: 'Foundation pour - A', time: '7a–2p', progress: 100, color: '#3B82F6', photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop' },
        { name: 'Rebar inspection', time: '9a–11a', progress: 100, color: '#10B981', photo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop' },
        { name: 'Survey stakeout', time: '1p–4p', progress: 100, color: '#8B5CF6' },
      ],
    },
    {
      day: 'Tue', date: '10', crew: 10, status: 'completed' as const,
      tasks: [
        { name: 'Framing L1 walls', time: '7a–3p', progress: 100, color: '#3B82F6', photo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop' },
        { name: 'Sheathing delivery', time: '8a–10a', progress: 100, color: '#F59E0B', photo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop' },
        { name: 'Window rough open', time: '10a–2p', progress: 100, color: '#10B981', photo: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&h=400&fit=crop' },
        { name: 'Cleanup & staging', time: '2p–4p', progress: 100, color: '#64748B' },
      ],
    },
    {
      day: 'Wed', date: '11', crew: 7, status: 'completed' as const,
      tasks: [
        { name: 'Electrical rough-in', time: '7a–4p', progress: 100, color: '#F59E0B', photo: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop' },
        { name: 'Panel upgrade', time: '8a–12p', progress: 100, color: '#3B82F6', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop' },
        { name: 'Conduit run L2', time: '12p–4p', progress: 100, color: '#8B5CF6' },
      ],
    },
    {
      day: 'Thu', date: '12', crew: 11, status: 'today' as const,
      tasks: [
        { name: 'Foundation pour - B', time: '7a–2p', progress: 65, color: '#EF4444', photo: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&h=400&fit=crop' },
        { name: 'Framing inspection', time: '9a–12p', progress: 90, color: '#10B981', photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop' },
        { name: 'Electrical rough-in L2', time: '8a–4p', progress: 40, color: '#F59E0B', photo: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop' },
        { name: 'Material staging', time: '1p–4p', progress: 20, color: '#64748B' },
        { name: 'Site safety audit', time: '2p–4p', progress: 0, color: '#8B5CF6' },
      ],
    },
    {
      day: 'Fri', date: '13', crew: 9, status: 'upcoming' as const,
      tasks: [
        { name: 'Plumbing inspection', time: '7a–10a', progress: 0, color: '#3B82F6', photo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop' },
        { name: 'Framing L2 start', time: '8a–4p', progress: 0, color: '#10B981' },
        { name: 'HVAC rough-in', time: '10a–3p', progress: 0, color: '#F59E0B' },
        { name: 'Drywall delivery', time: '1p–4p', progress: 0, color: '#64748B' },
      ],
    },
    {
      day: 'Sat', date: '14', crew: 4, status: 'upcoming' as const,
      tasks: [
        { name: 'Site cleanup', time: '8a–2p', progress: 0, color: '#64748B', photo: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=600&h=400&fit=crop' },
        { name: 'Material inventory', time: '9a–12p', progress: 0, color: '#3B82F6' },
      ],
    },
  ],
  upcomingDeliveries: [
    { id: 'd1', item: 'Ready-Mix Concrete', qty: '12 m³', supplier: 'Austin Concrete Co.', eta: '11:30 AM Today', status: 'in-transit' as const, icon: 'Truck' },
    { id: 'd2', item: 'Rebar #5 Bundles', qty: '2.4 tons', supplier: 'SteelPro Supply', eta: '2:00 PM Today', status: 'confirmed' as const, icon: 'Package' },
    { id: 'd3', item: 'Drywall Sheets 4×8', qty: '120 pcs', supplier: 'BuildRight Materials', eta: 'Tomorrow 8 AM', status: 'confirmed' as const, icon: 'Package' },
    { id: 'd4', item: 'Electrical Panels', qty: '6 units', supplier: 'Spark Electrical Dist.', eta: 'Tomorrow 10 AM', status: 'pending' as const, icon: 'Zap' },
    { id: 'd5', item: 'Lumber 2×6×12', qty: '400 pcs', supplier: 'TimberWorks', eta: 'Fri 7 AM', status: 'pending' as const, icon: 'Package' },
  ],
  quickActions: [
    { id: 'checkin', label: 'Check In', icon: 'UserCheck' },
    { id: 'rfi', label: 'New RFI', icon: 'FileQuestion' },
    { id: 'safety', label: 'Safety Form', icon: 'ShieldCheck' },
    { id: 'activity', label: 'Log Activity', icon: 'ClipboardList' },
  ],
  recentActivity: [
    { id: '1', icon: 'UserCheck', description: 'Carlos M. checked in at Site A', time: '2026-02-13T06:45:00Z' },
    { id: '2', icon: 'ShieldCheck', description: 'Toolbox talk completed — Trench Safety', time: '2026-02-13T07:15:00Z' },
    { id: '3', icon: 'Truck', description: 'Concrete delivery arrived — 8m³ Order #CO-042', time: '2026-02-13T08:30:00Z' },
    { id: '4', icon: 'FileQuestion', description: 'RFI-024 answered by engineer', time: '2026-02-13T09:10:00Z' },
    { id: '5', icon: 'Camera', description: 'Progress photos uploaded — Building A L3', time: '2026-02-13T10:00:00Z' },
    { id: '6', icon: 'AlertCircle', description: 'Safety ticket #ST-008 resolved', time: '2026-02-13T10:45:00Z' },
  ],
  alerts: [
    { type: 'warning' as const, message: '2 items need attention: 1 open RFI past due, 1 cert expiring' },
  ],
  crewOnSite: [
    { id: 'c1', name: 'Carlos Mendes', trade: 'Foreman', status: 'on-site' as const, checkIn: '6:45 AM', avatar: '#3B82F6', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face' },
    { id: 'c2', name: 'Jean-Pierre Lafleur', trade: 'Electrician', status: 'on-site' as const, checkIn: '7:00 AM', avatar: '#8B5CF6', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face' },
    { id: 'c3', name: 'Andre Nguyen', trade: 'Concrete', status: 'on-site' as const, checkIn: '6:30 AM', avatar: '#10B981', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face' },
    { id: 'c4', name: 'Mike Dubois', trade: 'Framing', status: 'break' as const, checkIn: '7:15 AM', avatar: '#F59E0B', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face' },
    { id: 'c5', name: 'Raj Patel', trade: 'Plumbing', status: 'on-site' as const, checkIn: '7:00 AM', avatar: '#EF4444', photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=96&h=96&fit=crop&crop=face' },
    { id: 'c6', name: 'Tom Wilson', trade: 'Laborer', status: 'on-site' as const, checkIn: '7:30 AM', avatar: '#64748B', photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=96&h=96&fit=crop&crop=face' },
    { id: 'c7', name: 'Sarah Chen', trade: 'Safety Officer', status: 'on-site' as const, checkIn: '6:50 AM', avatar: '#EC4899', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face' },
    { id: 'c8', name: 'James Brown', trade: 'Operator', status: 'checked-out' as const, checkIn: '5:30 AM', avatar: '#14B8A6', photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=96&h=96&fit=crop&crop=face' },
  ],
};
