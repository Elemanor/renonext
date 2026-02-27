interface ChartSkeletonProps {
  height?: number;
}

export function ChartSkeleton({ height = 200 }: ChartSkeletonProps) {
  return (
    <div
      className="animate-pulse rounded-lg bg-slate-100"
      style={{ minHeight: height }}
      role="status"
      aria-label="Loading chart"
    >
      <span className="sr-only">Loading chart...</span>
    </div>
  );
}
