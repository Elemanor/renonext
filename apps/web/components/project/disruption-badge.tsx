import type { DisruptionType } from '@renonext/shared/types';
import {
  Volume2,
  Activity,
  Car,
  Wind,
  Droplets,
  XCircle,
  Droplet,
  ZapOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const config: Record<DisruptionType, { Icon: typeof Volume2; color: string; label: string }> = {
  noise: { Icon: Volume2, color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Noise' },
  vibration: { Icon: Activity, color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Vibration' },
  parking: { Icon: Car, color: 'bg-primary-100 text-primary-700 border-primary-200', label: 'Parking' },
  dust: { Icon: Wind, color: 'bg-slate-100 text-slate-700 border-slate-200', label: 'Dust' },
  odor: { Icon: Droplets, color: 'bg-reno-purple-100 text-reno-purple-700 border-reno-purple-200', label: 'Odor' },
  access_blocked: { Icon: XCircle, color: 'bg-red-100 text-red-700 border-red-200', label: 'Access Blocked' },
  water_shutoff: { Icon: Droplet, color: 'bg-red-100 text-red-700 border-red-200', label: 'Water Off' },
  power_outage: { Icon: ZapOff, color: 'bg-red-100 text-red-700 border-red-200', label: 'Power Out' },
};

interface DisruptionBadgeProps {
  type: DisruptionType;
  className?: string;
  showLabel?: boolean;
}

export function DisruptionBadge({ type, className, showLabel = true }: DisruptionBadgeProps) {
  const { Icon, color, label } = config[type];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        color,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {showLabel && label}
    </span>
  );
}
