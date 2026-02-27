import { BarChart3 } from 'lucide-react';

interface ChartEmptyStateProps {
  message?: string;
  height?: number;
}

export function ChartEmptyState({
  message = 'No data available',
  height = 200,
}: ChartEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 text-slate-400"
      style={{ minHeight: height }}
    >
      <BarChart3 className="mb-2 h-8 w-8" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
