'use client';

import { useState } from 'react';
import { Activity } from 'lucide-react';
import type { ActivityFeedItem } from '@/lib/mock-data/homeowner-dashboard';
import { ActivityFeedItem as ActivityFeedItemComponent } from './activity-feed-item';

interface ActivityFeedProps {
  items: ActivityFeedItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const [showAll, setShowAll] = useState(false);

  // Sort by date descending
  const sortedItems = [...items].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayItems = showAll ? sortedItems : sortedItems.slice(0, 10);
  const hasMore = sortedItems.length > 10;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-slate-700" />
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {displayItems.map((item, index) => (
          <div key={item.id}>
            <ActivityFeedItemComponent item={item} />
            {index < displayItems.length - 1 && (
              <div className="border-t border-slate-200 mt-4" />
            )}
          </div>
        ))}
      </div>

      {hasMore && !showAll && (
        <div className="pt-2">
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
          >
            Show more
          </button>
        </div>
      )}

      {showAll && hasMore && (
        <div className="pt-2">
          <button
            onClick={() => setShowAll(false)}
            className="w-full py-2 text-sm font-medium text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Show less
          </button>
        </div>
      )}
    </div>
  );
}
