import type { ProjectStage } from '@renonext/shared/types';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MilestoneStripProps {
  stages: ProjectStage[];
}

export function MilestoneStrip({ stages }: MilestoneStripProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-3">
      {stages.map((stage, i) => {
        const isComplete = stage.status === 'completed';
        const isActive = stage.status === 'active';
        return (
          <div key={stage.id} className="flex items-center gap-1">
            {i > 0 && (
              <div
                className={cn(
                  'h-0.5 w-6 shrink-0 sm:w-10',
                  isComplete ? 'bg-emerald-400' : 'bg-gray-200'
                )}
              />
            )}
            <div className="flex shrink-0 items-center gap-1.5">
              {isComplete ? (
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              ) : isActive ? (
                <Loader2 className="h-4 w-4 text-blue-600" />
              ) : (
                <Circle className="h-4 w-4 text-gray-300" />
              )}
              <span
                className={cn(
                  'whitespace-nowrap text-xs font-medium',
                  isComplete ? 'text-emerald-700' : isActive ? 'text-blue-700' : 'text-gray-400'
                )}
              >
                {stage.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
