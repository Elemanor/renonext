'use client';

import { Calendar } from 'lucide-react';
import type { WeeklySchedule as WeeklyScheduleType } from '@/lib/mock-data/jobs';

interface WeeklyScheduleProps {
  schedule: WeeklyScheduleType;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function WeeklySchedule({ schedule }: WeeklyScheduleProps) {
  const today = new Date().toLocaleDateString('en-CA', { weekday: 'long' });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Weekly Schedule
        </span>
      </div>
      <div className="divide-y divide-gray-100">
        {DAYS.map((day) => {
          const slot = schedule[day];
          const isToday = day === today;
          return (
            <div
              key={day}
              className={`flex items-center justify-between px-4 py-2.5 ${
                isToday ? 'bg-reno-green-light' : ''
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  isToday ? 'text-reno-green-dark' : 'text-gray-700'
                }`}
              >
                {day}
                {isToday && (
                  <span className="ml-1.5 text-xs font-semibold text-reno-green">
                    (Today)
                  </span>
                )}
              </span>
              {slot ? (
                <span className="text-sm font-semibold text-gray-900">
                  {slot.start} – {slot.end}
                </span>
              ) : (
                <span className="text-sm text-gray-400">Off</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
