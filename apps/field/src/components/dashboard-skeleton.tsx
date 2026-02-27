export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      {/* Header skeleton */}
      <div>
        <div className="h-7 w-56 rounded bg-slate-200" />
        <div className="mt-2 h-4 w-40 rounded bg-slate-100" />
        <div className="mt-2 h-5 w-48 rounded bg-slate-100" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-white p-3">
            <div className="h-8 w-8 rounded-lg bg-slate-100" />
            <div className="mt-3 h-6 w-16 rounded bg-slate-200" />
            <div className="mt-1 h-3 w-24 rounded bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div>
        <div className="mb-2 h-4 w-32 rounded bg-slate-200" />
        <div className="h-[180px] rounded-lg bg-slate-100" />
      </div>

      {/* Schedule skeleton */}
      <div>
        <div className="mb-2 h-4 w-28 rounded bg-slate-200" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-white p-3">
              <div className="h-4 w-48 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-36 rounded bg-slate-100" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions skeleton */}
      <div>
        <div className="mb-2 h-4 w-24 rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-xl border bg-white p-4">
              <div className="h-10 w-10 rounded-lg bg-slate-100" />
              <div className="h-3 w-16 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
