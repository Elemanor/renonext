import type { ScheduledWorkDay } from '@renonext/shared/types';
import { CalendarDays } from 'lucide-react';
import { WeekDayCard } from './week-day-card';

interface WeekAheadProps {
  schedule: ScheduledWorkDay[];
}

export function WeekAhead({ schedule }: WeekAheadProps) {
  // Determine which day is tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toISOString().split('T')[0];

  const isTomorrow = (dateString: string) => {
    return dateString === tomorrowDateString;
  };

  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-900">This Week Ahead</h2>
      </div>

      {/* Schedule cards */}
      <div className="space-y-3">
        {schedule.map((day, idx) => (
          <WeekDayCard
            key={idx}
            day={day}
            isTomorrow={isTomorrow(day.date)}
          />
        ))}
      </div>
    </section>
  );
}
