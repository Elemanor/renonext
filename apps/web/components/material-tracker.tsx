'use client';

import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Material } from '@/lib/mock-data/jobs';

const statusConfig = {
  ordered: {
    label: 'Ordered',
    className: 'bg-primary-50 text-primary-700',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-amber-50 text-amber-700',
  },
  installed: {
    label: 'Installed',
    className: 'bg-reno-green-50 text-reno-green-700',
  },
};

interface MaterialTrackerProps {
  materials: Material[];
}

export function MaterialTracker({ materials }: MaterialTrackerProps) {
  const installed = materials.filter((m) => m.status === 'installed').length;
  const total = materials.length;
  const progress = total > 0 ? (installed / total) * 100 : 0;

  return (
    <div className="rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Materials
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-600">
          {installed}/{total} installed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pt-3 pb-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-reno-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Material List */}
      <div className="divide-y divide-slate-100 px-4">
        {materials.map((material) => {
          const status = statusConfig[material.status];
          return (
            <div
              key={material.id}
              className="flex items-center justify-between py-2.5"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {material.name}
                </p>
                <p className="text-xs text-slate-500">
                  Qty: {material.quantity}
                  {material.deliveryDate &&
                    ` · Delivery: ${new Date(material.deliveryDate + 'T00:00:00').toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}`}
                </p>
              </div>
              <Badge
                className={`rounded-full border-transparent px-2.5 py-0.5 text-xs font-medium ${status.className}`}
              >
                {status.label}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
