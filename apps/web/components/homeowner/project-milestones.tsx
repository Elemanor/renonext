import { Flag, Check } from 'lucide-react';
import type { ProjectStage } from '@renonext/shared/types';
import { cn } from '@/lib/utils';

interface ProjectMilestonesProps {
  stages: ProjectStage[];
  plannedEnd: string | null;
}

export function ProjectMilestones({ stages, plannedEnd }: ProjectMilestonesProps) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'TBD';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const sortedStages = [...stages].sort((a, b) => a.stage_number - b.stage_number);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Flag className="h-5 w-5 text-gray-700" />
        <h2 className="text-lg font-semibold">Project Milestones</h2>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-0 min-w-max">
          {sortedStages.map((stage, index) => {
            const isCompleted = stage.status === 'completed';
            const isActive = stage.status === 'active';
            const isNotStarted = stage.status === 'not_started' || (!isCompleted && !isActive);
            const isLast = index === sortedStages.length - 1;

            return (
              <div key={stage.id} className="flex items-start">
                <div className="flex flex-col items-center">
                  {/* Node */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className={cn(
                        'h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all',
                        isCompleted && 'bg-emerald-500 border-emerald-500',
                        isActive && 'bg-blue-500 border-blue-500 animate-pulse',
                        isNotStarted && 'bg-white border-gray-300'
                      )}
                    >
                      {isCompleted && <Check className="h-6 w-6 text-white" />}
                      {isActive && (
                        <span className="text-xs font-semibold text-white">
                          {stage.percent_complete}%
                        </span>
                      )}
                      {isNotStarted && (
                        <span className="text-xs font-medium text-gray-400">
                          {stage.stage_number}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Label and dates */}
                  <div className="mt-3 text-center px-2" style={{ maxWidth: '140px' }}>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {stage.title}
                    </p>
                    <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                      <div>
                        Planned: {formatDate(stage.planned_start)} - {formatDate(stage.planned_end)}
                      </div>
                      {stage.actual_start && (
                        <div>
                          Actual: {formatDate(stage.actual_start)}
                          {stage.actual_end && ` - ${formatDate(stage.actual_end)}`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div className="flex items-center" style={{ marginTop: '23px' }}>
                    <div
                      className={cn(
                        'h-0.5 w-16 transition-colors',
                        isCompleted ? 'bg-emerald-500' : 'bg-gray-300'
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Estimated completion */}
          {plannedEnd && (
            <div className="flex items-start ml-4">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                  <Flag className="h-5 w-5 text-gray-500" />
                </div>
                <div className="mt-3 text-center px-2" style={{ maxWidth: '140px' }}>
                  <p className="text-sm font-medium text-gray-900">Completion</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Est: {formatDate(plannedEnd)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
