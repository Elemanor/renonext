import { formatPrice } from '@/lib/data/costs';

interface PriceRangeBarProps {
  min: number;
  max: number;
  unit: string;
  globalMin?: number;
  globalMax?: number;
  label?: string;
}

export function PriceRangeBar({
  min,
  max,
  unit,
  globalMin,
  globalMax,
  label,
}: PriceRangeBarProps) {
  const gMin = globalMin ?? min * 0.7;
  const gMax = globalMax ?? max * 1.3;
  const range = gMax - gMin || 1;
  const leftPct = ((min - gMin) / range) * 100;
  const widthPct = ((max - min) / range) * 100;

  return (
    <div className="space-y-1.5">
      {label && (
        <p className="text-sm font-medium text-gray-700">{label}</p>
      )}
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-reno-teal to-reno-green"
          style={{
            left: `${Math.max(0, leftPct)}%`,
            width: `${Math.max(2, widthPct)}%`,
          }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{formatPrice(min)}</span>
        <span className="text-[10px] uppercase tracking-wider text-gray-400">
          {unit}
        </span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
}
