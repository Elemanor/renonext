import type { ScheduledWorkDay } from '@renonext/shared/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Home, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeekDayCardProps {
  day: ScheduledWorkDay;
  isTomorrow?: boolean;
}

export function WeekDayCard({ day, isTomorrow }: WeekDayCardProps) {
  const {
    day_label,
    date,
    crew_size,
    work_planned,
    work_hours,
    disruption_notes,
    requires_client_home,
    is_inspection_day,
    inspection_type,
  } = day;

  // Determine border color based on day status
  const getBorderColor = () => {
    if (crew_size === 0) return 'border-l-gray-300';
    if (is_inspection_day) return 'border-l-red-500';
    if (disruption_notes && disruption_notes.length > 0) return 'border-l-amber-500';
    return 'border-l-emerald-500';
  };

  // Format date nicely (e.g., "Mar 12")
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // No work day (weekend/holiday)
  if (crew_size === 0) {
    return (
      <Card className={cn('border-l-4', getBorderColor())}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{day_label}</h4>
              <p className="text-sm text-gray-500">{formatDate(date)}</p>
            </div>
            <Badge variant="secondary" className="text-gray-600">
              No work
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('border-l-4', getBorderColor())}>
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-900">{day_label}</h4>
              {isTomorrow && (
                <Badge variant="default" className="text-xs">
                  Tomorrow
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">{formatDate(date)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{crew_size} crew</p>
            {work_hours && (
              <p className="text-xs text-gray-500">{work_hours.start} — {work_hours.end}</p>
            )}
          </div>
        </div>

        {/* Work planned */}
        <div>
          <p className="text-sm text-gray-700">{work_planned}</p>
        </div>

        {/* Disruption warnings */}
        {disruption_notes && (
          <div className="flex items-start gap-2 text-amber-700">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{disruption_notes}</p>
          </div>
        )}

        {/* Client presence required */}
        {requires_client_home && (
          <div className="flex items-center gap-2 text-blue-700">
            <Home className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm">You may need to be home</p>
          </div>
        )}

        {/* Inspection day */}
        {is_inspection_day && inspection_type && (
          <div className="flex items-center gap-2 text-red-700">
            <ClipboardCheck className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm font-medium">{inspection_type}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
