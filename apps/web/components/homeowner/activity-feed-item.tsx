import {
  FileText,
  MessageCircle,
  Flag,
  Package,
  ClipboardCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ActivityFeedItem as ActivityFeedItemType } from '@/lib/mock-data/homeowner-dashboard';

interface ActivityFeedItemProps {
  item: ActivityFeedItemType;
}

const typeConfig = {
  daily_report: { icon: FileText, color: 'bg-blue-100 text-blue-600' },
  decision_needed: { icon: MessageCircle, color: 'bg-amber-100 text-amber-600' },
  milestone: { icon: Flag, color: 'bg-emerald-100 text-emerald-600' },
  delivery: { icon: Package, color: 'bg-purple-100 text-purple-600' },
  inspection: { icon: ClipboardCheck, color: 'bg-indigo-100 text-indigo-600' },
};

export function ActivityFeedItem({ item }: ActivityFeedItemProps) {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  const formatRelativeDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const dateOnly = date.toDateString();
      const todayOnly = today.toDateString();
      const yesterdayOnly = yesterday.toDateString();

      if (dateOnly === todayOnly) return 'Today';
      if (dateOnly === yesterdayOnly) return 'Yesterday';

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex gap-4">
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', config.color)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              {item.actionRequired && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Action needed
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            {item.actionRequired && item.actionHref && (
              <a
                href={item.actionHref}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
              >
                {item.actionLabel || 'View details →'}
              </a>
            )}
          </div>

          {/* Photo thumbnail */}
          {item.photoUrl && (
            <div className="flex-shrink-0">
              <img
                src={item.photoUrl}
                alt="Activity"
                className="h-10 w-10 rounded object-cover"
              />
            </div>
          )}
        </div>

        {/* Date */}
        <p className="text-xs text-gray-400 mt-1">{formatRelativeDate(item.date)}</p>
      </div>
    </div>
  );
}
