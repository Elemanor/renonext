import type {
  Project,
  ProjectStage,
  DailyReport,
  ClientNotification,
  ScheduledWorkDay,
  ProjectTask,
  TaskGate,
} from '@renonext/shared/types';

// =============================================================================
// HOMEOWNER-SPECIFIC TYPES
// =============================================================================

export interface CrewMemberStatus {
  name: string;
  trade: string;
  checkInTime: string;
  status: 'on_site' | 'break' | 'completed' | 'expected';
  company: string;
}

export interface InspectionEntry {
  id: string;
  type: string;
  date: string;
  status: 'upcoming' | 'passed' | 'failed' | 'pending_schedule';
  inspectorName: string | null;
  inspectorPhone: string | null;
  prerequisites: string[];
  requiresClientHome: boolean;
  notes: string | null;
}

export interface ActivityFeedItem {
  id: string;
  type: 'daily_report' | 'decision_needed' | 'milestone' | 'delivery' | 'inspection';
  title: string;
  description: string;
  date: string;
  photoUrl?: string;
  actionRequired?: boolean;
  actionHref?: string;
  actionLabel?: string;
}

export interface HomeownerDashboardExtras {
  todayCrew: CrewMemberStatus[];
  inspections: InspectionEntry[];
  currentWeather: { temp: number; condition: string; icon: string };
  daysSinceIncident: number;
  totalHoursThisWeek: number;
  pendingQuestions: number;
  activityFeed: ActivityFeedItem[];
}

export interface HomeownerDashboardData {
  project: Project;
  schedule: ScheduledWorkDay[];
  reports: DailyReport[];
  notifications: ClientNotification[];
  stages: ProjectStage[];
  tasks: ProjectTask[];
  gates: TaskGate[];
  extras: HomeownerDashboardExtras;
}

// =============================================================================
// HOMEOWNER-FRIENDLY LANGUAGE MAPS
// =============================================================================

export const healthLabelsHomeowner: Record<string, string> = {
  on_track: 'On Track',
  at_risk: 'Needs Attention',
  behind: 'Running Behind',
  critical: 'Delayed',
};

export const healthColorsHomeowner: Record<string, string> = {
  on_track: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  at_risk: 'bg-amber-100 text-amber-700 border-amber-200',
  behind: 'bg-orange-100 text-orange-700 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
};

export const healthDotColors: Record<string, string> = {
  on_track: 'bg-emerald-500',
  at_risk: 'bg-amber-500',
  behind: 'bg-orange-500',
  critical: 'bg-red-500',
};

// =============================================================================
// MOCK EXTRAS
// =============================================================================

export const mockTodayCrew: CrewMemberStatus[] = [
  {
    name: 'Mike Dubois',
    trade: 'Supervisor',
    checkInTime: '7:45 AM',
    status: 'on_site',
    company: 'Dubois Waterproofing Ltd.',
  },
  {
    name: 'Jean-Pierre Lafleur',
    trade: 'Waterproofing Tech',
    checkInTime: '8:00 AM',
    status: 'on_site',
    company: 'Dubois Waterproofing Ltd.',
  },
  {
    name: 'Carlos Mendes',
    trade: 'Laborer',
    checkInTime: '8:05 AM',
    status: 'break',
    company: 'Dubois Waterproofing Ltd.',
  },
];

export const mockInspections: InspectionEntry[] = [
  {
    id: 'insp-001',
    type: 'Foundation Excavation',
    date: '2026-03-07',
    status: 'passed',
    inspectorName: 'J. Thompson',
    inspectorPhone: '+1-416-555-0300',
    prerequisites: ['Excavation to footing level', 'Foundation wall fully exposed'],
    requiresClientHome: false,
    notes: 'Passed — depth and exposure confirmed.',
  },
  {
    id: 'insp-002',
    type: 'Membrane Application',
    date: '2026-03-11',
    status: 'passed',
    inspectorName: 'J. Thompson',
    inspectorPhone: '+1-416-555-0300',
    prerequisites: ['60+ mil membrane thickness', 'Full coverage footing to grade', '6-inch overlap on all seams'],
    requiresClientHome: true,
    notes: 'Passed — 65 mil thickness verified.',
  },
  {
    id: 'insp-003',
    type: 'Pre-Backfill Inspection',
    date: '2026-03-17',
    status: 'upcoming',
    inspectorName: 'J. Thompson',
    inspectorPhone: '+1-416-555-0300',
    prerequisites: [
      'Drainage board installed',
      'Weeping tile connected to sump',
      'Gravel bed placed',
      'Filter fabric covering gravel',
    ],
    requiresClientHome: true,
    notes: null,
  },
];

export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: 'af-001',
    type: 'decision_needed',
    title: 'Decision needed: Drainage board upgrade',
    description: 'Your contractor recommends upgrading to premium drainage board (+$450). Better longevity and exceeds code.',
    date: '2026-03-12T10:00:00Z',
    actionRequired: true,
    actionLabel: 'Review Decision',
    actionHref: '/dashboard/projects/pr300000-0000-0000-0000-000000000003?tab=alerts',
  },
  {
    id: 'af-002',
    type: 'daily_report',
    title: 'Daily update — Mar 12',
    description: 'Protection board 60% installed. Waiting on weeping tile delivery.',
    date: '2026-03-12T16:15:00Z',
    photoUrl: '/mock/drainage-board-1.jpg',
  },
  {
    id: 'af-003',
    type: 'inspection',
    title: 'Inspection passed: Membrane Application',
    description: 'City inspector confirmed waterproof coating is properly applied (65 mil thickness).',
    date: '2026-03-11T14:00:00Z',
  },
  {
    id: 'af-004',
    type: 'daily_report',
    title: 'Daily update — Mar 11',
    description: 'Waterproof coating fully applied. Inspector comes tomorrow.',
    date: '2026-03-11T17:00:00Z',
    photoUrl: '/mock/membrane-application-1.jpg',
  },
  {
    id: 'af-005',
    type: 'daily_report',
    title: 'Daily update — Mar 10',
    description: 'Foundation wall cleaned and all cracks sealed. Ready for waterproofing.',
    date: '2026-03-10T16:30:00Z',
    photoUrl: '/mock/wall-patched-1.jpg',
  },
  {
    id: 'af-006',
    type: 'milestone',
    title: 'Stage 1 complete: Preparation & Excavation',
    description: 'Phase 1 is done — foundation fully exposed and ready for waterproofing.',
    date: '2026-03-07T16:00:00Z',
  },
  {
    id: 'af-007',
    type: 'inspection',
    title: 'Inspection passed: Foundation Excavation',
    description: 'City inspector confirmed excavation depth and exposure look perfect.',
    date: '2026-03-07T15:00:00Z',
  },
  {
    id: 'af-008',
    type: 'delivery',
    title: 'Materials delivered: Waterproofing membrane',
    description: 'Blueskin WP200 rubberized asphalt membrane (4 rolls) delivered to site.',
    date: '2026-03-11T08:00:00Z',
  },
  {
    id: 'af-009',
    type: 'daily_report',
    title: 'Daily update — Mar 7',
    description: 'Excavation complete, inspection passed. Stage 1 officially done!',
    date: '2026-03-07T16:00:00Z',
    photoUrl: '/mock/excavation-complete-1.jpg',
  },
  {
    id: 'af-010',
    type: 'daily_report',
    title: 'Daily update — Mar 5',
    description: 'Digging 60% done. Short wind delay but still on track.',
    date: '2026-03-05T16:45:00Z',
    photoUrl: '/mock/excavation-progress-1.jpg',
  },
];

// =============================================================================
// COMPOSITE MOCK DATA
// =============================================================================

import {
  mockProject,
  mockWeeklySchedule,
  mockDailyReports,
  mockClientNotifications,
  mockProjectStages,
  mockProjectTasks,
  mockTaskGates,
} from './project';

export function getMockHomeownerDashboard(): HomeownerDashboardData {
  return {
    project: mockProject,
    schedule: mockWeeklySchedule,
    reports: mockDailyReports,
    notifications: mockClientNotifications,
    stages: mockProjectStages,
    tasks: mockProjectTasks,
    gates: mockTaskGates,
    extras: {
      todayCrew: mockTodayCrew,
      inspections: mockInspections,
      currentWeather: { temp: 6, condition: 'Overcast', icon: 'cloud' },
      daysSinceIncident: 12,
      totalHoursThisWeek: 48,
      pendingQuestions: 1,
      activityFeed: mockActivityFeed,
    },
  };
}
