'use client';

import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const workAreas = [
  {
    name: 'GEB Foundation B2',
    bars: [
      {
        start: 0,
        duration: 18,
        color: 'bg-green-500',
        label: 'Complete',
      },
      {
        start: 18,
        duration: 7,
        color: 'bg-amber-500',
        label: 'Current',
        isCritical: true,
      },
    ],
    status: 'behind',
  },
  {
    name: 'GEB Slab A',
    bars: [
      {
        start: 7,
        duration: 4,
        color: 'bg-green-500',
        label: 'Started',
      },
      {
        start: 11,
        duration: 14,
        color: 'bg-gray-300',
        label: 'Scheduled',
      },
    ],
    status: 'on-schedule',
  },
  {
    name: 'RPS Foundation',
    bars: [
      {
        start: 0,
        duration: 11,
        color: 'bg-green-500',
        label: 'Complete',
      },
    ],
    status: 'ahead',
  },
  {
    name: 'RPS Walls',
    bars: [
      {
        start: 14,
        duration: 18,
        color: 'bg-blue-500',
        label: 'In Progress',
      },
    ],
    status: 'on-schedule',
  },
  {
    name: 'Site Grading',
    bars: [
      {
        start: 28,
        duration: 11,
        color: 'bg-gray-300',
        label: 'Scheduled',
      },
    ],
    status: 'on-schedule',
  },
] as const;

const weekLabels = ['Feb 3', 'Feb 10', 'Feb 17', 'Feb 24', 'Mar 3', 'Mar 10'];
const todayPosition = 24; // Feb 27 is 24 days from Feb 3

export function GanttShowcase() {
  return (
    <Card className="w-full border-2 shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-lg font-bold text-gray-900">
          Project Timeline
        </CardTitle>
        <p className="mt-1 text-sm text-gray-500">
          GEBOOTH WasteWater Treatment Plant
        </p>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {/* Timeline Header */}
        <div className="mb-4 flex">
          <div className="w-32 sm:w-40" />
          <div className="relative flex flex-1">
            {weekLabels.map((label, index) => (
              <div
                key={index}
                className="flex-1 text-center text-xs font-medium text-gray-600"
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Gantt Bars */}
        <div className="space-y-3">
          {workAreas.map((area, areaIndex) => (
            <div key={areaIndex} className="flex items-center gap-2">
              {/* Area Name */}
              <div className="w-32 flex-shrink-0 sm:w-40">
                <div className="text-xs font-semibold text-gray-900">
                  {area.name}
                </div>
              </div>

              {/* Timeline Bar Container */}
              <div className="relative flex-1">
                {/* Background grid */}
                <div className="flex h-10 rounded border border-gray-200 bg-gray-50">
                  {weekLabels.map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 border-r border-gray-200 last:border-r-0"
                    />
                  ))}
                </div>

                {/* Today marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                  style={{
                    left: `${(todayPosition / 39) * 100}%`,
                  }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-red-600">
                    Today
                  </div>
                </div>

                {/* Progress bars */}
                {area.bars.map((bar, barIndex) => (
                  <div
                    key={barIndex}
                    className={cn(
                      'absolute top-1.5 h-7 rounded shadow-sm transition-all hover:shadow-md',
                      bar.color,
                      'isCritical' in bar && bar.isCritical && 'ring-2 ring-red-400'
                    )}
                    style={{
                      left: `${(bar.start / 39) * 100}%`,
                      width: `${(bar.duration / 39) * 100}%`,
                    }}
                  >
                    {'isCritical' in bar && bar.isCritical && (
                      <AlertCircle className="absolute -right-1 -top-1 h-4 w-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>

              {/* Status indicator */}
              <div className="hidden sm:block w-16 flex-shrink-0 text-right">
                {area.status === 'ahead' && (
                  <span className="text-xs font-medium text-green-600">
                    Ahead
                  </span>
                )}
                {area.status === 'behind' && (
                  <span className="text-xs font-medium text-red-600">
                    Behind
                  </span>
                )}
                {area.status === 'on-schedule' && (
                  <span className="text-xs font-medium text-gray-600">
                    On Track
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-6 rounded-lg border bg-gray-50 p-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="font-semibold text-green-700">
                  On Schedule:
                </span>{' '}
                <span className="text-gray-700">3/5 areas</span>
              </div>
              <div>
                <span className="font-semibold text-red-700">Behind:</span>{' '}
                <span className="text-gray-700">1 area</span>
              </div>
              <div>
                <span className="font-semibold text-blue-700">Ahead:</span>{' '}
                <span className="text-gray-700">1 area</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-red-700">
              <AlertCircle className="h-3.5 w-3.5" />
              <span className="font-semibold">Critical Path:</span>
              <span className="text-gray-700">GEB Foundation B2 → Slab A</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-green-500" />
            <span className="text-gray-600">Complete</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-blue-500" />
            <span className="text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-amber-500" />
            <span className="text-gray-600">Current Phase</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-gray-300" />
            <span className="text-gray-600">Scheduled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-3 bg-red-500" />
            <span className="text-gray-600">Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
