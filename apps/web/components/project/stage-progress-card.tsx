import type { ProjectStage, ProjectTask, TaskGate } from '@renonext/shared/types';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { TaskGateBadge } from './task-gate-badge';

const statusIcon = {
  completed: <CheckCircle className="h-4 w-4 text-emerald-600" />,
  active: <Loader2 className="h-4 w-4 text-blue-600" />,
  not_started: <Circle className="h-4 w-4 text-gray-300" />,
  ready: <Circle className="h-4 w-4 text-blue-300" />,
  blocked: <Circle className="h-4 w-4 text-red-400" />,
  skipped: <Circle className="h-4 w-4 text-gray-300 line-through" />,
};

const tierFromPercent = (pct: number) => {
  if (pct >= 80) return 'high' as const;
  if (pct >= 40) return 'medium' as const;
  return 'low' as const;
};

interface StageProgressCardProps {
  stage: ProjectStage;
  tasks?: ProjectTask[];
  gates?: TaskGate[];
  defaultExpanded?: boolean;
}

export function StageProgressCard({ stage, tasks = [], gates = [], defaultExpanded = false }: StageProgressCardProps) {
  const stageTasks = tasks.filter((t) => t.stage_id === stage.id);
  const stageGates = gates.filter((g) => stageTasks.some((t) => t.id === g.task_id));
  const isActive = stage.status === 'active';

  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-200',
        isActive ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white'
      )}
    >
      {/* Stage header */}
      <div className="flex items-center gap-3 p-4">
        {statusIcon[stage.status]}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">Stage {stage.stage_number}</span>
            {stage.status === 'completed' && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                Complete
              </span>
            )}
            {isActive && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                Active
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-gray-900">{stage.title}</p>
        </div>
        <span className="text-sm font-bold tabular-nums text-gray-700">{stage.percent_complete}%</span>
      </div>

      {/* Progress bar */}
      <div className="px-4 pb-2">
        <Progress value={stage.percent_complete} tier={tierFromPercent(stage.percent_complete)} className="h-1.5" />
      </div>

      {/* Tasks + gates (for active or expanded stage) */}
      {(isActive || defaultExpanded) && stageTasks.length > 0 && (
        <div className="border-t border-gray-100 p-4 pt-3">
          <p className="mb-2 text-xs font-semibold text-gray-500">Tasks</p>
          <div className="space-y-2">
            {stageTasks.map((task) => {
              const taskGates = stageGates.filter((g) => g.task_id === task.id);
              return (
                <div key={task.id}>
                  <div className="flex items-center gap-2">
                    {task.status === 'completed' ? (
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    ) : task.status === 'in_progress' ? (
                      <Loader2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'
                      )}
                    >
                      {task.title}
                    </span>
                    {task.percent_complete > 0 && task.status !== 'completed' && (
                      <span className="ml-auto text-xs tabular-nums text-gray-400">
                        {task.percent_complete}%
                      </span>
                    )}
                  </div>
                  {/* Task gates */}
                  {taskGates.length > 0 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {taskGates.map((gate) => (
                        <TaskGateBadge key={gate.id} status={gate.status} title={gate.title} className="text-xs" />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Payment info */}
      {stage.triggers_payment && stage.payment_amount && (
        <div className="border-t border-gray-100 px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Milestone Payment</span>
            <span className={cn('font-semibold', stage.payment_released ? 'text-emerald-600' : 'text-gray-700')}>
              ${stage.payment_amount.toLocaleString('en-CA')}
              {stage.payment_released && ' — Released'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
