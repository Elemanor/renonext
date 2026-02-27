import type { GateStatus } from '@renonext/shared/types';
import { CheckCircle, Clock, AlertTriangle, ShieldOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const gateConfig: Record<GateStatus, { Icon: typeof CheckCircle; color: string; label: string }> = {
  satisfied: { Icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', label: 'Satisfied' },
  pending: { Icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200', label: 'Pending' },
  waived: { Icon: AlertTriangle, color: 'text-gray-500 bg-gray-50 border-gray-200', label: 'Waived' },
  bypassed: { Icon: ShieldOff, color: 'text-red-600 bg-red-50 border-red-200', label: 'Bypassed' },
};

interface TaskGateBadgeProps {
  status: GateStatus;
  title: string;
  className?: string;
}

export function TaskGateBadge({ status, title, className }: TaskGateBadgeProps) {
  const { Icon, color, label } = gateConfig[status];
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm',
        color,
        className
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 truncate">{title}</span>
      <span className="shrink-0 text-xs font-medium">{label}</span>
    </div>
  );
}
