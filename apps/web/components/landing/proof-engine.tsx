import { CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { proofColumns, proofStats } from './_data';

export function ProofEngine() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-gray-50 to-gray-50" />
        <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
            >
              <CheckCircle className="h-4 w-4" />
              How We Protect You
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              We Don&apos;t List Pros.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-violet-600 text-gradient">
                We Control Risk.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Other platforms list whoever signs up. We verify safety, lock funds in escrow,
              and validate quality before a single nail is driven.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-gray-500">
              A bank + safety regulator + project manager — all in one app.
            </p>
          </div>

          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
            The Proof Engine
          </p>

          {/* 3-Column Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {proofColumns.map((column) => (
              <Card
                key={column.title}
                className={[
                  'group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300',
                  'motion-safe:hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-gray-900/5',
                ].join(' ')}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/40" />
                <CardHeader className={`${column.headerBg} px-6 py-4`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{column.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{column.subtitle}</p>
                    </div>
                    {column.icon && (
                      <column.icon className="h-6 w-6 shrink-0 text-white/90" aria-hidden="true" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {column.items.map((item) => (
                      <div key={item.text} className="flex items-start gap-3">
                        <CheckCircle
                          className={`mt-0.5 h-4 w-4 shrink-0 ${column.iconColor} opacity-90`}
                        />
                        <span className="text-sm text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats placeholder — add real metrics when available */}
        </div>
      </div>
    </section>
  );
}
