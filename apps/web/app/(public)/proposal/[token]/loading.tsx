export default function ProposalLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-[1fr_340px]">
        {/* Main column */}
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200" />
            <div className="h-10 w-4/5 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-5 w-3/5 animate-pulse rounded bg-gray-200" />
            <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
            <div className="h-32 animate-pulse rounded-xl bg-blue-50" />
          </div>
          {/* SCI skeleton */}
          <div className="h-52 animate-pulse rounded-2xl bg-emerald-50" />
          {/* Comparison skeleton */}
          <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
          {/* Steps skeleton */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />
            ))}
          </div>
          {/* Viewer skeleton */}
          <div className="aspect-video animate-pulse rounded-2xl bg-gray-800/10" />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="h-80 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-56 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
