'use client';

import type { ClientNotification } from '@renonext/shared/types';
import { Bell, BellOff, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DisruptionBadge } from './disruption-badge';

const severityStyles = {
  info: 'border-blue-200 bg-blue-50/50',
  warning: 'border-amber-200 bg-amber-50/50',
  alert: 'border-red-200 bg-red-50/50',
};

const severityAccent = {
  info: 'bg-blue-500',
  warning: 'bg-amber-500',
  alert: 'bg-red-500',
};

interface ProjectAlertsTabProps {
  notifications: ClientNotification[];
}

export function ProjectAlertsTab({ notifications }: ProjectAlertsTabProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BellOff className="mb-3 h-10 w-10 text-gray-300" />
        <p className="text-sm font-medium text-gray-500">No active alerts. Good news!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((n) => {
        const dateStr = new Date(n.created_at).toLocaleString('en-CA', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        });

        return (
          <div
            key={n.id}
            className={cn(
              'relative rounded-xl border p-4 transition-all duration-200',
              severityStyles[n.severity],
              !n.read && 'ring-1 ring-offset-0',
              !n.read && n.severity === 'info' && 'ring-blue-300',
              !n.read && n.severity === 'warning' && 'ring-amber-300',
              !n.read && n.severity === 'alert' && 'ring-red-300'
            )}
          >
            {/* Unread accent bar */}
            {!n.read && (
              <div className={cn('absolute left-0 top-3 bottom-3 w-1 rounded-r', severityAccent[n.severity])} />
            )}

            <div className="flex items-start gap-3">
              <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', severityAccent[n.severity])}>
                <Bell className="h-4 w-4 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                  {!n.read && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{dateStr}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-700">{n.description}</p>

                {n.disruption_types.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {n.disruption_types.map((d) => (
                      <DisruptionBadge key={d} type={d} />
                    ))}
                  </div>
                )}

                {n.action_required && n.action_label && (
                  <button className="mt-3 inline-flex items-center gap-1 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-gray-800">
                    {n.action_label}
                    <ChevronRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
