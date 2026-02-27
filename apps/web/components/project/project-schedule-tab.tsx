'use client';

import type { ScheduledWorkDay } from '@renonext/shared/types';
import { AlertTriangle, CalendarOff } from 'lucide-react';
import { ScheduleDayCard } from './schedule-day-card';
import { ScheduleAgendaRow } from './schedule-agenda-row';
import { WebBarChart } from '@/components/charts/bar-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { crewPerDay } from '@/lib/mock-data/project-charts';

interface ProjectScheduleTabProps {
  schedule: ScheduledWorkDay[];
  todayDate?: string; // ISO YYYY-MM-DD
}

export function ProjectScheduleTab({ schedule, todayDate }: ProjectScheduleTabProps) {
  if (schedule.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CalendarOff className="mb-3 h-10 w-10 text-gray-300" />
        <p className="text-sm font-medium text-gray-500">No scheduled work this week.</p>
      </div>
    );
  }

  // Find next disruption for callout banner
  const nextDisruption = schedule.find(
    (d) => d.disruptions.length > 0 && d.crew_size > 0 && (!todayDate || d.date >= todayDate)
  );

  return (
    <div className="space-y-4">
      {/* Crew per day chart */}
      <WebBarChart
        title="Crew Size This Week"
        data={crewPerDay}
        xKey="day"
        yKeys={['crew']}
        height={160}
        colors={[CHART_COLORS.primary]}
        formatter={(v) => `${v} workers`}
        ariaLabel="Crew size per day of the week"
      />

      {/* Disruption callout banner */}
      {nextDisruption && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            <span className="font-semibold">{nextDisruption.day_label}:</span>{' '}
            {nextDisruption.disruptions.join(', ')} expected
            {nextDisruption.disruption_notes && ` — ${nextDisruption.disruption_notes}`}
          </span>
        </div>
      )}

      {/* Desktop grid (7 columns) */}
      <div className="hidden gap-2 md:grid md:grid-cols-7">
        {schedule.map((day) => (
          <ScheduleDayCard key={day.id} day={day} isToday={day.date === todayDate} />
        ))}
      </div>

      {/* Mobile agenda list */}
      <div className="flex flex-col gap-2 md:hidden">
        {schedule.map((day) => (
          <ScheduleAgendaRow key={day.id} day={day} isToday={day.date === todayDate} />
        ))}
      </div>
    </div>
  );
}
