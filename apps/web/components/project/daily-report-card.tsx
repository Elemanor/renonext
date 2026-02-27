'use client';

import { useState } from 'react';
import type { DailyReport } from '@renonext/shared/types';
import { ChevronDown, Users, CheckSquare, Camera, Sun, CloudRain, Cloud, Snowflake } from 'lucide-react';
import { cn } from '@/lib/utils';

const weatherIcons: Record<string, typeof Sun> = {
  Sunny: Sun,
  Clear: Sun,
  'Partly cloudy': Cloud,
  Overcast: Cloud,
  Rain: CloudRain,
  Snow: Snowflake,
};

interface DailyReportCardProps {
  report: DailyReport;
  onClickImage?: (url: string) => void;
}

export function DailyReportCard({ report, onClickImage }: DailyReportCardProps) {
  const [expanded, setExpanded] = useState(false);
  const workers = report.workers as { name: string; role: string; hours: number }[];
  const tasks = report.tasks_performed as { task_id: string; title: string; progress: string }[];
  const materials = report.materials_delivered as { material: string; quantity: string; cost: number }[];
  const WeatherIcon = weatherIcons[report.weather?.conditions ?? ''] ?? Cloud;
  const dateStr = new Date(report.report_date + 'T00:00:00').toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white transition-all duration-200">
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <WeatherIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">{dateStr}</p>
          <p className="truncate text-xs text-gray-500">
            {workers.length} workers, {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            {report.photos.length > 0 && ` · ${report.photos.length} photo${report.photos.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        {report.client_summary && (
          <p className="hidden max-w-xs truncate text-xs text-gray-500 lg:block">
            {report.client_summary}
          </p>
        )}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-100 p-4 pt-3">
          {/* Client summary */}
          {report.client_summary && (
            <p className="mb-3 text-sm leading-relaxed text-gray-700">{report.client_summary}</p>
          )}

          {/* Crew */}
          <div className="mb-3">
            <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-gray-500">
              <Users className="h-3 w-3" />
              Crew ({workers.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {workers.map((w, i) => (
                <span key={i} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                  {w.role} · {w.hours}h
                </span>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="mb-3">
            <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-gray-500">
              <CheckSquare className="h-3 w-3" />
              Tasks
            </p>
            <ul className="space-y-1">
              {tasks.map((t) => (
                <li key={t.task_id} className="text-xs text-gray-700">
                  <span className="font-medium">{t.title}</span>
                  <span className="text-gray-500"> — {t.progress}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Photos */}
          {report.photos.length > 0 && (
            <div className="mb-3">
              <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-gray-500">
                <Camera className="h-3 w-3" />
                Photos ({report.photos.length})
              </p>
              <div className="flex gap-2">
                {report.photos.map((url) => (
                  <button
                    key={url}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickImage?.(url);
                    }}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-all hover:ring-2 hover:ring-blue-300"
                  >
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <Camera className="h-5 w-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Materials (if any) */}
          {materials.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-semibold text-gray-500">Materials Delivered</p>
              <ul className="space-y-1">
                {materials.map((m, i) => (
                  <li key={i} className="text-xs text-gray-700">
                    {m.material} — {m.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weather summary */}
          {report.weather && (
            <div className="mt-3 flex items-center gap-3 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-500">
              <WeatherIcon className="h-3.5 w-3.5" />
              <span>{report.weather.conditions}</span>
              {report.weather.temp_high != null && <span>{report.weather.temp_high}°C high</span>}
              {report.weather.wind_speed != null && <span>{report.weather.wind_speed} km/h wind</span>}
            </div>
          )}

          {/* Delays */}
          {report.delays.length > 0 && (
            <div className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
              {report.delays.map((d, i) => (
                <p key={i}>
                  {d.hours}h delay — {d.description || d.reason}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
