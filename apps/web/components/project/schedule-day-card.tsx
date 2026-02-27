import type { ScheduledWorkDay } from '@renonext/shared/types';
import { Users, Clock, Sun, CloudRain, Snowflake, Wind, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DisruptionBadge } from './disruption-badge';

const weatherIcons = {
  sunny: Sun,
  rain: CloudRain,
  snow: Snowflake,
  wind: Wind,
};

const riskColors = {
  low: 'text-emerald-600',
  delay_likely: 'text-amber-600',
  reschedule_required: 'text-red-600',
};

interface ScheduleDayCardProps {
  day: ScheduledWorkDay;
  isToday?: boolean;
}

export function ScheduleDayCard({ day, isToday }: ScheduleDayCardProps) {
  const isOff = day.crew_size === 0;
  const WeatherIcon = day.weather_forecast ? weatherIcons[day.weather_forecast.condition] : null;

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border p-3 transition-all duration-200',
        isToday ? 'border-blue-300 bg-blue-50/50 ring-1 ring-blue-200' : 'border-gray-200 bg-white',
        isOff && 'opacity-60'
      )}
    >
      {/* Date header */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className={cn('text-xs font-bold', isToday ? 'text-blue-700' : 'text-gray-900')}>
            {day.day_label}
          </p>
          <p className="text-[11px] tabular-nums text-gray-500">
            {new Date(day.date + 'T00:00:00').toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
          </p>
        </div>
        {WeatherIcon && day.weather_forecast && (
          <div className="flex items-center gap-1">
            <WeatherIcon className={cn('h-4 w-4', riskColors[day.weather_forecast.risk_level])} />
            <span className="text-[11px] tabular-nums text-gray-500">{day.weather_forecast.temp_high}°</span>
          </div>
        )}
      </div>

      {isOff ? (
        <p className="flex-1 text-xs text-gray-400">No work</p>
      ) : (
        <>
          {/* Work description */}
          <p className="mb-2 flex-1 text-xs leading-relaxed text-gray-700">{day.work_planned}</p>

          {/* Crew + hours */}
          <div className="mb-2 flex items-center gap-3 text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {day.crew_size}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {day.work_hours.start}–{day.work_hours.end}
            </span>
          </div>

          {/* Inspection highlight */}
          {day.is_inspection_day && (
            <div className="mb-2 flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
              <Eye className="h-3 w-3" />
              {day.inspection_type}
            </div>
          )}

          {/* Disruptions */}
          {day.disruptions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {day.disruptions.map((d) => (
                <DisruptionBadge key={d} type={d} showLabel={false} className="px-1.5 py-0 text-[10px]" />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
