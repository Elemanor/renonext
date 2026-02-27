import { useState, useEffect, useCallback, useMemo } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { MOCK_SCHEDULE } from '@/lib/mock/schedule';
import { FieldBarChart } from '@/components/charts/bar-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { Calendar, AlertTriangle, Timer, Info, Target } from 'lucide-react';
import {
  calculateCriticalPath,
  getDelayStatus,
  getDelayStatusColor,
  type CPMTask,
  type CPMDependencyLink,
} from '@renonext/shared/utils/critical-path';

interface TaskRow {
  id: string;
  title: string;
  status: string;
  planned_start: string | null;
  planned_end: string | null;
  actual_start: string | null;
  actual_end: string | null;
  duration_days: number | null;
  is_critical: boolean;
  percent_complete: number;
  assigned_company: string | null;
  work_area_name?: string;
}

interface DependencyRow {
  id: string;
  task_id: string;
  predecessor_task_id: string;
  dependency_type: string;
  lag_days: number;
}

type ViewMode = 'lookahead' | 'list';

export function SchedulePage() {
  const { membership } = useAuth();
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [dependencies, setDependencies] = useState<DependencyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('lookahead');
  const [weekOffset, setWeekOffset] = useState(0);
  const demo = isDemoMode();
  const mock = MOCK_SCHEDULE;

  const fetchData = useCallback(async () => {
    if (!membership?.organization_id) return;
    setLoading(true);
    const { data: projects } = await supabase
      .from('projects')
      .select('id')
      .eq('organization_id', membership.organization_id)
      .limit(1);
    if (!projects?.length) {
      setLoading(false);
      return;
    }
    const projectId = projects[0].id;

    const [tasksRes, depsRes] = await Promise.all([
      supabase
        .from('project_tasks')
        .select('id, title, status, planned_start, planned_end, actual_start, actual_end, duration_days, is_critical, percent_complete, assigned_company')
        .eq('project_id', projectId)
        .is('deleted_at', null)
        .order('sort_order'),
      supabase
        .from('task_dependencies')
        .select('id, task_id, predecessor_task_id, dependency_type, lag_days')
        .eq('project_id', projectId),
    ]);

    if (tasksRes.data) setTasks(tasksRes.data as TaskRow[]);
    if (depsRes.data) setDependencies(depsRes.data as DependencyRow[]);
    setLoading(false);
  }, [membership?.organization_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cpmResult = useMemo(() => {
    if (!tasks.length) return null;
    const cpmTasks: CPMTask[] = tasks.map((t) => ({
      id: t.id,
      task_type: 'task',
      start_date: t.planned_start ?? undefined,
      end_date: t.planned_end ?? undefined,
      duration_days: t.duration_days ?? 1,
      status: t.status,
    }));
    const cpmDeps: CPMDependencyLink[] = dependencies.map((d) => ({
      id: d.id,
      predecessor_task_id: d.predecessor_task_id,
      successor_task_id: d.task_id,
      dependency_type: d.dependency_type as CPMDependencyLink['dependency_type'],
      lag_days: d.lag_days,
    }));
    return calculateCriticalPath(cpmTasks, cpmDeps);
  }, [tasks, dependencies]);

  const showMock = demo || tasks.length === 0;

  // Progress chart data
  const progressChartData = useMemo(() => {
    const src = showMock ? mock.tasks : tasks.map((t) => ({
      name: t.title.length > 20 ? t.title.slice(0, 18) + '...' : t.title,
      percent: t.percent_complete,
      status: t.status,
      isCritical: t.is_critical,
    }));
    return (showMock ? src : src).map((t) => ({
      name: 'name' in t ? t.name : '',
      'Progress': 'percent' in t ? t.percent : 0,
    }));
  }, [showMock, mock.tasks, tasks]);

  const weekStart = startOfWeek(addDays(new Date(), weekOffset * 7), { weekStartsOn: 1 });
  const days = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));

  const getTasksForDay = (day: Date) =>
    tasks.filter((t) => {
      const start = t.planned_start ? new Date(t.planned_start) : null;
      const end = t.planned_end ? new Date(t.planned_end) : start;
      if (!start) return false;
      return day >= start && day <= (end ?? start);
    });

  const stats = showMock ? mock.cpmStats : {
    totalDuration: cpmResult?.projectDuration ?? 0,
    criticalTasks: cpmResult?.criticalPath.length ?? 0,
    avgFloat: 0,
    overallPercent: tasks.length > 0 ? Math.round(tasks.reduce((s, t) => s + t.percent_complete, 0) / tasks.length) : 0,
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Schedule</h1>
          <p className="mt-1 text-sm text-slate-500">
            {stats.totalDuration} day project · {stats.criticalTasks} critical tasks
          </p>
        </div>
        <div className="flex rounded-md border">
          <button
            onClick={() => setViewMode('lookahead')}
            className={`px-3 py-1.5 text-sm font-medium ${viewMode === 'lookahead' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}
          >
            Lookahead
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 text-sm font-medium ${viewMode === 'list' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* CPM Stat Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CPMStatCard icon={Calendar} label="Duration" value={`${stats.totalDuration}d`} />
        <CPMStatCard
          icon={AlertTriangle}
          label="Critical Tasks"
          value={String(stats.criticalTasks)}
          highlight
        />
        <CPMStatCard
          icon={Timer}
          label="Avg Float"
          value={`${stats.avgFloat}d`}
          tooltip="Average slack time before a task delays the project"
        />
        <CPMStatCard
          icon={Target}
          label="Overall"
          value={`${stats.overallPercent}%`}
          ring={stats.overallPercent}
        />
      </div>

      {/* Horizontal Progress Chart */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">Task Progress</h2>
        <FieldBarChart
          data={progressChartData}
          xKey="name"
          yKeys={['Progress']}
          height={Math.max(180, progressChartData.length * 36)}
          layout="horizontal"
          colors={[CHART_COLORS.primary]}
          formatter={(v) => `${v}%`}
          ariaLabel="Task progress horizontal bar chart"
        />
      </div>

      {viewMode === 'lookahead' ? (
        <>
          <div className="flex items-center gap-3">
            <button onClick={() => setWeekOffset((w) => w - 1)} className="rounded border px-2 py-1 text-sm">
              &larr; Prev
            </button>
            <button onClick={() => setWeekOffset(0)} className="rounded border px-2 py-1 text-sm">
              This Week
            </button>
            <button onClick={() => setWeekOffset((w) => w + 1)} className="rounded border px-2 py-1 text-sm">
              Next &rarr;
            </button>
            <span className="text-sm text-slate-500">
              {format(weekStart, 'MMM d')} &ndash;{' '}
              {format(addDays(weekStart, 4), 'MMM d, yyyy')}
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border bg-white">
            <div className="grid grid-cols-5 divide-x">
              {days.map((day) => {
                const dayTasks = showMock ? [] : getTasksForDay(day);
                const isToday = isSameDay(day, new Date());
                return (
                  <div key={day.toISOString()} className="min-w-[180px]">
                    <div className={`border-b px-3 py-2 text-center text-xs font-medium ${isToday ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-500'}`}>
                      {format(day, 'EEE, MMM d')}
                    </div>
                    <div className="space-y-1 p-2">
                      {dayTasks.length === 0 ? (
                        <p className="py-4 text-center text-xs text-slate-300">No tasks</p>
                      ) : (
                        dayTasks.map((t) => {
                          const delay = getDelayStatus(t.planned_end ?? undefined, t.actual_end ?? undefined, t.status);
                          return (
                            <div
                              key={t.id}
                              className="rounded border p-2 text-xs"
                              style={{
                                borderLeftWidth: 3,
                                borderLeftColor: t.is_critical ? '#ef4444' : getDelayStatusColor(delay),
                              }}
                            >
                              <p className="font-medium text-slate-900 line-clamp-2">{t.title}</p>
                              <div className="mt-1.5 h-1 w-full rounded-full bg-slate-100">
                                <div className="h-1 rounded-full bg-blue-500" style={{ width: `${t.percent_complete}%` }} />
                              </div>
                              <div className="mt-1 flex items-center justify-between text-slate-500">
                                <span>{t.percent_complete}%</span>
                                {t.is_critical && (
                                  <span className="rounded bg-red-100 px-1 text-red-600">Critical</span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          {(showMock ? mock.tasks : tasks).length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">No tasks scheduled</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                  <th className="px-4 py-2">Task</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Progress</th>
                  <th className="px-4 py-2">Assignee</th>
                  <th className="px-4 py-2">Critical</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(showMock ? mock.tasks : tasks.map((t) => ({
                  id: t.id,
                  name: t.title,
                  status: t.status,
                  duration: t.duration_days ?? 1,
                  percent: t.percent_complete,
                  isCritical: t.is_critical,
                  assignee: t.assigned_company ?? '-',
                }))).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{t.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        t.status === 'completed' ? 'bg-green-100 text-green-700' :
                        t.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>{t.status.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{t.duration}d</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-slate-200">
                          <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${t.percent}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{t.percent}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {t.assignee}
                    </td>
                    <td className="px-4 py-3">
                      {t.isCritical && (
                        <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-600">Yes</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- CPM Stat Card ---------- */

function CPMStatCard({
  icon: Icon,
  label,
  value,
  highlight,
  tooltip,
  ring,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
  tooltip?: string;
  ring?: number;
}) {
  return (
    <div className="rounded-xl border bg-white p-3 transition-transform duration-200 hover:scale-[1.02]">
      <div className="mb-1 flex items-center justify-between">
        <Icon className={`h-4 w-4 ${highlight ? 'text-red-500' : 'text-slate-400'}`} />
        {tooltip && (
          <div className="group relative">
            <Info className="h-3 w-3 text-slate-300 group-hover:text-slate-500" />
            <div className="pointer-events-none absolute right-0 top-5 z-10 w-48 rounded-lg border bg-white p-2 text-xs text-slate-600 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {ring != null && (
          <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke={CHART_COLORS.primary}
              strokeWidth="3"
              strokeDasharray={`${ring * 0.94} 94`}
              strokeLinecap="round"
            />
          </svg>
        )}
        <div>
          <p className={`text-lg font-bold tabular-nums ${highlight ? 'text-red-600' : 'text-slate-900'}`}>
            {value}
          </p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
