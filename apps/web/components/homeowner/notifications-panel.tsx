'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import type { ClientNotification } from '@renonext/shared/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NotificationsPanelProps {
  notifications: ClientNotification[];
}

export function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  const [showAll, setShowAll] = useState(false);

  // Sort: action_required first, then by created_at descending
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.action_required && !b.action_required) return -1;
    if (!a.action_required && b.action_required) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Filter unread and limit display
  const unreadNotifications = sortedNotifications.filter((n) => !n.read);
  const displayedNotifications = showAll
    ? unreadNotifications
    : unreadNotifications.slice(0, 3);
  const hasMore = unreadNotifications.length > 3;

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'alert':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-gray-700" />
        <h2 className="text-lg font-semibold">Notifications</h2>
        {unreadNotifications.length > 0 && (
          <Badge variant="secondary" className="ml-auto">
            {unreadNotifications.length}
          </Badge>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {displayedNotifications.length === 0 ? (
          <p className="text-sm text-gray-500">No new notifications</p>
        ) : (
          displayedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                'flex gap-3 rounded-lg border p-3 transition-opacity',
                notification.read && 'opacity-60'
              )}
            >
              {/* Severity Dot */}
              <div className="pt-1">
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    getSeverityColor(notification.severity)
                  )}
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <div className="font-medium">{notification.title}</div>
                <p className="text-sm text-gray-500">
                  {notification.description}
                </p>

                {/* Action Button */}
                {notification.action_required &&
                  notification.action_label &&
                  notification.action_href && (
                    <a
                      href={notification.action_href}
                      className="inline-block text-sm font-medium text-blue-600 hover:underline"
                    >
                      {notification.action_label} →
                    </a>
                  )}

                {/* Time */}
                <div className="text-xs text-gray-400">
                  {getTimeAgo(notification.created_at)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All Button */}
      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all ({unreadNotifications.length})
        </button>
      )}
    </div>
  );
}
