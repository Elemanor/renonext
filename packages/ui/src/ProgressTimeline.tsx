import React from 'react';
import { View, Text } from 'react-native';
import type { ProgressUpdateType } from '@renonext/shared';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  type: ProgressUpdateType;
  photos?: string[];
}

export interface ProgressTimelineProps {
  items: TimelineItem[];
  currentIndex: number;
  className?: string;
}

const typeIcons: Record<ProgressUpdateType, string> = {
  started: '\u25B6',       // play
  photo_update: '\uD83D\uDCF7', // camera (we use a simple char for RN text)
  milestone: '\u2605',     // star
  material_used: '\uD83D\uDCE6', // package
  issue_reported: '\u26A0', // warning
  completed: '\u2713',     // checkmark
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function ProgressTimeline({
  items,
  currentIndex,
  className = '',
}: ProgressTimelineProps): React.JSX.Element {
  return (
    <View className={`pl-4 ${className}`.trim()}>
      {items.map((item, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === items.length - 1;

        const dotColor = isCompleted ? 'bg-blue-600' : 'bg-gray-300';
        const dotBorder = isCurrent ? 'border-2 border-blue-300' : '';
        const lineColor = isCompleted && !isLast ? 'bg-blue-600' : 'bg-gray-200';
        const titleColor = isCompleted ? 'text-gray-900' : 'text-gray-400';
        const descColor = isCompleted ? 'text-gray-600' : 'text-gray-300';
        const timeColor = isCompleted ? 'text-gray-500' : 'text-gray-300';

        return (
          <View key={item.id} className="flex-row">
            {/* Dot and Line Column */}
            <View className="items-center mr-3" style={{ width: 24 }}>
              {/* Dot */}
              <View
                className={`w-6 h-6 rounded-full items-center justify-center ${dotColor} ${dotBorder}`.trim()}
              >
                <Text className="text-white text-xs">
                  {isCompleted ? typeIcons[item.type] : ''}
                </Text>
              </View>

              {/* Vertical line */}
              {!isLast ? (
                <View
                  className={`w-0.5 flex-1 min-h-[24px] ${lineColor}`}
                />
              ) : null}
            </View>

            {/* Content Column */}
            <View className={`flex-1 pb-6 ${isLast ? 'pb-0' : ''}`.trim()}>
              <Text className={`font-semibold text-base ${titleColor}`.trim()}>
                {item.title}
              </Text>

              <Text className={`text-xs mt-0.5 ${timeColor}`.trim()}>
                {formatTimestamp(item.timestamp)}
              </Text>

              {item.description ? (
                <Text className={`text-sm mt-1 ${descColor}`.trim()}>
                  {item.description}
                </Text>
              ) : null}

              {item.photos && item.photos.length > 0 ? (
                <View className="flex-row mt-2 gap-1">
                  {item.photos.slice(0, 3).map((photo, photoIndex) => (
                    <View
                      key={`${item.id}-photo-${photoIndex}`}
                      className="w-16 h-16 rounded-md overflow-hidden bg-gray-100"
                    >
                      <View className="w-full h-full bg-gray-200 items-center justify-center">
                        <Text className="text-gray-400 text-xs">
                          {photoIndex + 1}
                        </Text>
                      </View>
                    </View>
                  ))}
                  {item.photos.length > 3 ? (
                    <View className="w-16 h-16 rounded-md bg-gray-100 items-center justify-center">
                      <Text className="text-gray-500 text-sm font-medium">
                        +{item.photos.length - 3}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
