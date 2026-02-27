import type { ScheduledWorkDay } from '@renonext/shared/types';
import { Users, Clock, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DisruptionBadge } from './disruption-badge';

interface ScheduleAgendaRowProps {
  day: ScheduledWorkDay;
  isToday?: boolean;
}

export function ScheduleAgendaRow({ day, isToday }: ScheduleAgendaRowProps) {
  const isOff = day.crew_size === 0;
  const dateObj = new Date(day.date + 'T00:00:00');

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border p-3 transition-all duration-200',
        isToday ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200 bg-white',
        isOff && 'opacity-60'
      )}
    >
      {/* Date badge */}
      <div
        className={cn(
          'flex w-12 shrink-0 flex-col items-center rounded-lg py-1.5',
          isToday ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
        )}
      >
        <span className="text-[10px] font-bold uppercase">
          {dateObj.toLocaleDateString('en-CA', { weekday: 'short' })}
        </span>
        <span className="text-lg font-bold tabular-nums leading-tight">
          {dateObj.getDate()}
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {isOff ? (
          <p className="text-sm text-gray-400">No work scheduled</p>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-900">{day.work_planned}</p>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {day.crew_size} crew
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {day.work_hours.start}–{day.work_hours.end}
              </span>
              {day.is_inspection_day && (
                <span className="flex items-center gap-1 font-medium text-emerald-600">
                  <Eye className="h-3 w-3" />
                  Inspection
                </span>
              )}
            </div>
            {day.disruptions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {day.disruptions.map((d) => (
                  <DisruptionBadge key={d} type={d} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
