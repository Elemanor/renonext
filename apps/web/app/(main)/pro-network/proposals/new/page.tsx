'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Layers, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockLibrarySequences, TRADE_TYPES, type TradeType } from '@/lib/mock-data/blueprints';
import { computeScopeConfidence } from '@/lib/utils/scope-confidence';
import { formatCurrency } from '@/lib/utils/format';
import { derivePaymentMilestones } from '@/lib/utils/payment-milestones';
import type { SequenceStep } from '@renonext/shared/types';

export default function ProposalCreatorPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-gray-400">Loading...</div>}>
      <ProposalCreatorContent />
    </Suspense>
  );
}

function ProposalCreatorContent() {
  const searchParams = useSearchParams();
  const blueprintId = searchParams.get('blueprintId');

  const selectedBlueprint = blueprintId
    ? mockLibrarySequences.find((s) => s.id === blueprintId)
    : null;

  const [title, setTitle] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [warrantyTerms, setWarrantyTerms] = useState('');

  const steps = (selectedBlueprint?.steps ?? []) as SequenceStep[];
  const costNum = parseFloat(estimatedCost) || 0;

  const sci = useMemo(() => {
    if (steps.length === 0) return null;
    const inspections = steps.filter((s) => s.requires_inspection).length;
    return computeScopeConfidence({
      steps,
      templateStepCount: steps.length,
      totalInspections: inspections,
      totalGates: steps.filter((s) => s.requires_permit || s.requires_inspection).length,
      hasCodeReferences: steps.some((s) => s.code_reference),
      hasHoldback: true,
      hasMilestones: steps.some((s) => s.triggers_payment),
      hasWarrantyTerms: warrantyTerms.trim().length > 0,
      hasBcin: false,
    });
  }, [steps, warrantyTerms]);

  const milestones = useMemo(() => {
    if (steps.length === 0 || costNum === 0) return [];
    return derivePaymentMilestones(steps, costNum);
  }, [steps, costNum]);

  const inspections = steps.filter((s) => s.requires_inspection).length;
  const totalDays = steps.reduce((sum, s) => sum + (s.expected_duration_days ?? 0), 0);

  const tierColor = sci
    ? sci.tier === 'HIGH'
      ? 'bg-emerald-50 text-emerald-700'
      : sci.tier === 'MEDIUM'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-red-50 text-red-700'
    : 'bg-gray-100 text-gray-600';

  const trade = selectedBlueprint
    ? TRADE_TYPES[selectedBlueprint.trade_type as TradeType]
    : null;

  return (
    <div>
      {/* Back link */}
      <Link
        href="/pro-network/proposals"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Proposals
      </Link>

      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
        Create Proposal
      </h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left — Form */}
        <div className="min-w-0 flex-1 space-y-6">
          {/* Proposal Details */}
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Proposal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="mb-1 block text-xs font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                  placeholder="e.g. Basement Waterproofing — 123 Maple Ave"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="coverLetter" className="mb-1 block text-xs font-medium text-gray-700">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                  placeholder="Introduce yourself and your approach..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cost" className="mb-1 block text-xs font-medium text-gray-700">
                    Estimated Cost ($)
                  </label>
                  <input
                    id="cost"
                    type="number"
                    min="0"
                    step="100"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    placeholder="18500"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="mb-1 block text-xs font-medium text-gray-700">
                    Duration (days)
                  </label>
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    placeholder="18"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="startDate" className="mb-1 block text-xs font-medium text-gray-700">
                  Estimated Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="warranty" className="mb-1 block text-xs font-medium text-gray-700">
                  Warranty Terms
                </label>
                <textarea
                  id="warranty"
                  rows={2}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                  placeholder="e.g. 25-year transferable warranty on membrane..."
                  value={warrantyTerms}
                  onChange={(e) => setWarrantyTerms(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Selected Blueprint */}
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Selected Blueprint</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedBlueprint ? (
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {trade && (
                      <Badge className={`rounded-full border-transparent px-2 py-0.5 text-[10px] font-semibold ${trade.badge}`}>
                        {trade.label}
                      </Badge>
                    )}
                    {selectedBlueprint.is_verified && (
                      <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{selectedBlueprint.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{selectedBlueprint.plain_language_summary}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      {steps.length} steps
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {inspections} inspections
                    </span>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 py-8 text-center">
                  <p className="text-sm text-gray-500">No blueprint selected</p>
                  <Link
                    href="/pro-network/blueprints"
                    className="mt-2 inline-block text-xs font-semibold text-violet-600 hover:text-violet-700"
                  >
                    Choose from Library →
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-auto rounded-xl border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700"
              onClick={() => window.alert('Draft saved (mock). Real save coming in Phase 4.')}
            >
              Save as Draft
            </Button>
            <Button
              className="h-auto rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md"
              onClick={() => window.alert('Proposal sent (mock). Real send coming in Phase 4.')}
            >
              Send Proposal
            </Button>
          </div>
        </div>

        {/* Right — Preview sidebar */}
        <div className="w-full space-y-4 lg:sticky lg:top-24 lg:w-[340px] lg:self-start">
          {/* SCI Score Preview */}
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-900">SCI Score Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {sci ? (
                <div className="text-center">
                  <p className="text-4xl font-extrabold tabular-nums text-gray-900">
                    {Math.round(sci.score * 100)}%
                  </p>
                  <Badge className={`mt-1 rounded-full border-transparent px-2.5 py-0.5 text-[10px] font-bold ${tierColor}`}>
                    {sci.tier}
                  </Badge>
                  <div className="mt-3 space-y-1 text-left">
                    {Object.entries(sci.breakdown).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="capitalize text-gray-500">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-semibold text-gray-700">
                          {Math.round((val as number) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-xs text-gray-400">
                  Select a blueprint to see SCI preview
                </p>
              )}
            </CardContent>
          </Card>

          {/* Cost Summary */}
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-900">Cost Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {costNum > 0 ? (
                <div>
                  <p className="text-2xl font-extrabold tabular-nums text-gray-900">
                    {formatCurrency(costNum)}
                  </p>
                  {milestones.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Payment milestones
                      </p>
                      {milestones.map((m, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{m.label}</span>
                          <div className="text-right">
                            <span className="font-semibold text-gray-900">{formatCurrency(m.amount)}</span>
                            <span className="ml-1 text-gray-400">({m.percent}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-xs text-gray-400">
                  Enter a cost to see milestone preview
                </p>
              )}
            </CardContent>
          </Card>

          {/* Blueprint Summary */}
          {selectedBlueprint && (
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">Blueprint Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{steps.length}</p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">Steps</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{inspections}</p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">Inspections</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">~{totalDays}d</p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">Duration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
