'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, CheckCircle, Layers, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockLibrarySequences, TRADE_TYPES, type TradeType } from '@/lib/mock-data/blueprints';
import { computeScopeConfidence } from '@/lib/utils/scope-confidence';

const tradeFilterOptions: Array<{ key: string; label: string }> = [
  { key: 'ALL', label: 'All' },
  ...Object.entries(TRADE_TYPES).map(([key, val]) => ({ key, label: val.label })),
];

export default function BlueprintsPage() {
  const [activeTrade, setActiveTrade] = useState('ALL');

  const filtered = activeTrade === 'ALL'
    ? mockLibrarySequences
    : mockLibrarySequences.filter((s) => s.trade_type === activeTrade);

  const platformCount = mockLibrarySequences.filter((s) => s.source === 'platform_template').length;
  const myCount = mockLibrarySequences.filter((s) => s.source !== 'platform_template').length;
  const totalUsed = mockLibrarySequences.reduce((sum, s) => sum + s.times_used, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Blueprint Library
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse verified execution sequences or create your own
          </p>
        </div>
        <Button className="h-auto rounded-xl bg-reno-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-reno-purple-700 hover:shadow-md">
          <Plus className="mr-1.5 h-4 w-4" />
          Create Custom Blueprint
        </Button>
      </div>

      {/* Trade filter pills */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {tradeFilterOptions.map((opt) => (
          <Badge
            key={opt.key}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all ${
              activeTrade === opt.key
                ? 'border-transparent bg-reno-purple-100 text-reno-purple-700'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTrade(opt.key)}
          >
            {opt.label}
          </Badge>
        ))}
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Platform Templates</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{platformCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">My Templates</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{myCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Used</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{totalUsed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Blueprint grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((seq) => {
          const trade = TRADE_TYPES[seq.trade_type as TradeType];
          const steps = seq.steps ?? [];
          const inspections = steps.filter((s) => s.requires_inspection).length;
          const totalDays = steps.reduce((sum, s) => sum + (s.expected_duration_days ?? 0), 0);

          const sci = computeScopeConfidence({
            steps,
            templateStepCount: steps.length,
            totalInspections: inspections,
            totalGates: steps.filter((s) => s.requires_permit || s.requires_inspection).length,
            hasCodeReferences: steps.some((s) => s.code_reference),
            hasHoldback: true,
            hasMilestones: steps.some((s) => s.triggers_payment),
            hasWarrantyTerms: false,
            hasBcin: false,
          });

          const sourceLabel = seq.source === 'platform_template'
            ? 'Platform'
            : seq.source === 'contractor_template'
              ? 'My Template'
              : 'Custom';

          const sourceBadge = seq.source === 'platform_template'
            ? 'bg-primary-50 text-primary-700'
            : seq.source === 'contractor_template'
              ? 'bg-reno-purple-50 text-reno-purple-700'
              : 'bg-slate-100 text-slate-600';

          const tierColor = sci.tier === 'HIGH'
            ? 'bg-reno-green-50 text-reno-green-700'
            : sci.tier === 'MEDIUM'
              ? 'bg-amber-50 text-amber-700'
              : 'bg-red-50 text-red-700';

          return (
            <Card
              key={seq.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="p-5">
                {/* Badges row */}
                <div className="mb-3 flex flex-wrap items-center gap-1.5">
                  {trade && (
                    <Badge className={`rounded-full border-transparent px-2 py-0.5 text-[10px] font-semibold ${trade.badge}`}>
                      {trade.label}
                    </Badge>
                  )}
                  <Badge className={`rounded-full border-transparent px-2 py-0.5 text-[10px] font-semibold ${sourceBadge}`}>
                    {sourceLabel}
                  </Badge>
                  {seq.is_verified && (
                    <Badge className="rounded-full border-transparent bg-reno-green-50 px-2 py-0.5 text-[10px] font-semibold text-reno-green-700">
                      <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Name + summary */}
                <h3 className="text-sm font-bold text-slate-900">{seq.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                  {seq.plain_language_summary}
                </p>

                {/* Stats row */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    {steps.length} steps
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {inspections} inspections
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {seq.times_used}× used
                  </span>
                  {seq.avg_rating && (
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {seq.avg_rating}
                    </span>
                  )}
                </div>

                {/* SCI + View Details */}
                <div className="mt-4 flex items-center justify-between">
                  <Badge className={`rounded-full border-transparent px-2.5 py-0.5 text-[10px] font-bold ${tierColor}`}>
                    SCI: {Math.round(sci.score * 100)}% — {sci.tier}
                  </Badge>
                  <Link
                    href={`/pro-network/blueprints/${seq.id}`}
                    className="text-xs font-semibold text-reno-purple-600 hover:text-reno-purple-700"
                  >
                    View Details →
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
