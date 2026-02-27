'use client';

import { useState } from 'react';
import type { InspectionEntry } from '@/lib/mock-data/homeowner-dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ChevronDown, ChevronUp, Phone, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InspectionCardProps {
  inspection: InspectionEntry;
  isNext?: boolean;
}

export function InspectionCard({ inspection, isNext }: InspectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(isNext || false);

  const {
    type,
    date,
    status,
    prerequisites,
    inspectorName,
    inspectorPhone,
    requiresClientHome,
    notes,
  } = inspection;

  // Get status badge
  const getStatusBadge = () => {
    switch (status) {
      case 'upcoming':
        return (
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
            Upcoming
          </Badge>
        );
      case 'passed':
        return (
          <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">
            Passed
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            Failed
          </Badge>
        );
      case 'pending_schedule':
        return (
          <Badge variant="secondary">
            Scheduling
          </Badge>
        );
      default:
        return null;
    }
  };

  // Get border color
  const getBorderColor = () => {
    if (isNext) return 'border-l-blue-500';
    switch (status) {
      case 'passed':
        return 'border-l-emerald-500';
      case 'failed':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-300';
    }
  };

  // Format date nicely
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBD';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isPast = status === 'passed' || status === 'failed';
  const canExpand = isPast && notes;

  return (
    <Card className={cn('border-l-4', getBorderColor(), isNext && 'shadow-md')}>
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div
          className={cn(
            'flex items-start justify-between',
            canExpand && 'cursor-pointer'
          )}
          onClick={() => canExpand && setIsExpanded(!isExpanded)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-medium text-gray-900">{type}</h4>
              {getStatusBadge()}
            </div>
            <p className="text-sm text-gray-500 mt-1">{formatDate(date)}</p>
          </div>
          {canExpand && (
            <button className="text-gray-400 hover:text-gray-600">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {/* Upcoming inspection details (always shown for next) */}
        {status === 'upcoming' && isNext && (
          <div className="space-y-3 pt-2 border-t">
            {/* Prerequisites */}
            {prerequisites && prerequisites.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Prerequisites:
                </p>
                <div className="space-y-1">
                  {prerequisites.map((prereq, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                      <p className="text-sm">{prereq}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inspector info */}
            {inspectorName && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Inspector:
                </p>
                <p className="text-sm text-gray-900">{inspectorName}</p>
                {inspectorPhone && (
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Phone className="h-4 w-4" />
                    <a
                      href={`tel:${inspectorPhone}`}
                      className="text-sm hover:text-blue-600 hover:underline"
                    >
                      {inspectorPhone}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Client presence required */}
            {requiresClientHome && (
              <div className="flex items-center gap-2 text-blue-700 bg-blue-50 p-2 rounded">
                <Home className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">You may need to be home</p>
              </div>
            )}
          </div>
        )}

        {/* Past inspection notes (collapsed by default) */}
        {isPast && notes && isExpanded && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
            <p className="text-sm text-gray-600">{notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
