import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BCINBadgeProps {
  bcin: string;
  verified: boolean;
  compact?: boolean;
}

export function BCINBadge({ bcin, verified, compact = false }: BCINBadgeProps) {
  if (!verified) return null;

  if (compact) {
    return (
      <Badge className="gap-1 border-reno-green-200 bg-reno-green-50 text-reno-green-700 hover:bg-reno-green-50">
        <ShieldCheck className="h-3 w-3" />
        BCIN Verified
      </Badge>
    );
  }

  return (
    <div className="rounded-lg border border-reno-green-200 bg-reno-green-50 p-3">
      <div className="flex items-start gap-2.5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-reno-green-600" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-reno-green-700">Licensed Designer</p>
          <p className="text-xs text-reno-green-600">BCIN #{bcin}</p>
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-reno-green-500">
            <ExternalLink className="h-2.5 w-2.5" />
            Verified against Ontario QuARTS registry
          </p>
        </div>
      </div>
    </div>
  );
}
