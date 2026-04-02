'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { JobTask } from '@/lib/mock-data/jobs';

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-slate-100 text-slate-600',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-amber-50 text-amber-700',
  },
  completed: {
    label: 'Completed',
    className: 'bg-reno-green-50 text-reno-green-700',
  },
};

interface TaskPhotoCardProps {
  task: JobTask;
}

export function TaskPhotoCard({ task }: TaskPhotoCardProps) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[task.status];

  return (
    <div className="rounded-xl border border-slate-200 bg-white transition-all duration-200">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <Badge
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-transparent ${status.className}`}
          >
            {status.label}
          </Badge>
          <span className="font-medium text-slate-900">{task.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {task.photos.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Camera className="h-3 w-3" />
              {task.photos.length}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3">
          <div className="mb-2 flex items-center gap-4 text-xs text-slate-500">
            <span>
              Assigned:{' '}
              {new Date(task.assignedDate + 'T00:00:00').toLocaleDateString('en-CA', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
            {task.completedDate && (
              <span>
                Completed:{' '}
                {new Date(task.completedDate + 'T00:00:00').toLocaleDateString('en-CA', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>

          {/* Photo Grid */}
          {task.photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {task.photos.map((photo, i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-[10px] leading-tight text-white">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No photos uploaded yet</p>
          )}
        </div>
      )}
    </div>
  );
}
