import { createSupabaseServerClient } from '../server';
import type {
  Project,
  ProjectStage,
  ProjectTask,
  TaskGate,
  DailyReport,
  ClientNotification,
  ScheduledWorkDay,
} from '@renonext/shared/types/project';

export interface ProjectCommandCenterData {
  project: Project;
  schedule: ScheduledWorkDay[];
  reports: DailyReport[];
  notifications: ClientNotification[];
  stages: ProjectStage[];
  tasks: ProjectTask[];
  gates: TaskGate[];
}

/**
 * Fetch all data needed for the Command Center project detail view.
 * Falls back to null if the project doesn't exist or the user lacks access.
 */
export async function fetchProjectCommandCenter(
  projectId: string
): Promise<ProjectCommandCenterData | null> {
  const supabase = await createSupabaseServerClient();

  // Fetch project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .is('deleted_at', null)
    .single();

  if (projectError || !project) return null;

  // Fetch all related data in parallel
  const [stagesRes, tasksRes, reportsRes, notificationsRes] = await Promise.all([
    supabase
      .from('project_stages')
      .select('*')
      .eq('project_id', projectId)
      .is('deleted_at', null)
      .order('stage_number', { ascending: true }),

    supabase
      .from('project_tasks')
      .select('*')
      .eq('project_id', projectId)
      .is('deleted_at', null)
      .order('planned_start', { ascending: true }),

    supabase
      .from('daily_reports')
      .select('*')
      .eq('project_id', projectId)
      .is('deleted_at', null)
      .order('report_date', { ascending: false })
      .limit(30),

    supabase
      .from('client_notifications')
      .select('*')
      .eq('project_id', projectId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  const stages = (stagesRes.data ?? []) as ProjectStage[];
  const tasks = (tasksRes.data ?? []) as ProjectTask[];
  const reports = (reportsRes.data ?? []) as DailyReport[];
  const notifications = (notificationsRes.data ?? []) as ClientNotification[];

  // Fetch gates for all tasks
  const taskIds = tasks.map((t) => t.id);
  let gates: TaskGate[] = [];
  if (taskIds.length > 0) {
    const { data: gatesData } = await supabase
      .from('task_gates')
      .select('*')
      .in('task_id', taskIds);
    gates = (gatesData ?? []) as TaskGate[];
  }

  // Derive schedule from active tasks (ScheduledWorkDay is a UI concept)
  const schedule = deriveWeeklySchedule(tasks, stages);

  return {
    project: project as Project,
    schedule,
    reports,
    notifications,
    stages,
    tasks,
    gates,
  };
}

/**
 * Derive a weekly schedule view from project tasks.
 * Creates ScheduledWorkDay entries for the current/upcoming work week.
 */
function deriveWeeklySchedule(
  tasks: ProjectTask[],
  stages: ProjectStage[]
): ScheduledWorkDay[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const schedule: ScheduledWorkDay[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    // Find tasks planned for this date
    const dayTasks = tasks.filter((t) => {
      if (!t.planned_start || !t.planned_end) return false;
      return t.planned_start <= dateStr && t.planned_end >= dateStr;
    });

    // Weekend: no work unless tasks are explicitly scheduled
    const isWeekend = i >= 5;
    if (isWeekend && dayTasks.length === 0) {
      schedule.push({
        id: `schedule-${dateStr}`,
        date: dateStr,
        day_label: dayNames[i],
        work_planned: 'No work scheduled',
        crew_size: 0,
        work_hours: { start: '', end: '' },
        disruptions: [],
        disruption_notes: null,
        requires_client_home: false,
        is_inspection_day: false,
        inspection_type: null,
      });
      continue;
    }

    const workPlanned = dayTasks.length > 0
      ? dayTasks.map((t) => t.title).join('; ')
      : 'No work scheduled';

    // Check if any task has inspection gates
    const taskIds = dayTasks.map((t) => t.id);
    const isInspection = dayTasks.some((t) => t.is_milestone);

    schedule.push({
      id: `schedule-${dateStr}`,
      date: dateStr,
      day_label: dayNames[i],
      work_planned: workPlanned,
      crew_size: dayTasks.length > 0 ? Math.max(2, dayTasks.length) : 0,
      work_hours: dayTasks.length > 0 ? { start: '08:00', end: '16:00' } : { start: '', end: '' },
      disruptions: [],
      disruption_notes: null,
      requires_client_home: false,
      is_inspection_day: isInspection,
      inspection_type: isInspection ? 'Milestone inspection' : null,
    });
  }

  return schedule;
}

/**
 * Fetch just the project for metadata/title generation.
 */
export async function fetchProjectTitle(
  projectId: string
): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('projects')
    .select('title')
    .eq('id', projectId)
    .single();
  return data?.title ?? null;
}
