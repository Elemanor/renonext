'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Layers,
  Users,
  Shield,
  AlertTriangle,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { mockLibrarySequences, TRADE_TYPES, type TradeType } from '@/lib/mock-data/blueprints';
import { computeScopeConfidence } from '@/lib/utils/scope-confidence';
import { SOFT_SURFACE } from '@/lib/ui/tokens';

export default function BlueprintDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const seq = mockLibrarySequences.find((s) => s.id === id);

  if (!seq) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-lg font-bold text-gray-900">Blueprint not found</h2>
        <Link href="/pro-network/blueprints" className="mt-2 text-sm text-violet-600 hover:text-violet-700">
          ← Back to Library
        </Link>
      </div>
    );
  }

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

  const tierColor = sci.tier === 'HIGH'
    ? 'bg-emerald-50 text-emerald-700'
    : sci.tier === 'MEDIUM'
      ? 'bg-amber-50 text-amber-700'
      : 'bg-red-50 text-red-700';

  const sourceLabel = seq.source === 'platform_template'
    ? 'Platform'
    : seq.source === 'contractor_template'
      ? 'My Template'
      : 'Custom';

  const sourceBadge = seq.source === 'platform_template'
    ? 'bg-blue-50 text-blue-700'
    : seq.source === 'contractor_template'
      ? 'bg-violet-50 text-violet-700'
      : 'bg-gray-100 text-gray-600';

  const isPlatform = seq.source === 'platform_template';

  return (
    <div>
      {/* Back link */}
      <Link
        href="/pro-network/blueprints"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Library
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              {trade && (
                <Badge className={`rounded-full border-transparent px-2 py-0.5 text-[10px] font-semibold ${trade.badge}`}>
                  {trade.label}
                </Badge>
              )}
              <Badge className={`rounded-full border-transparent px-2 py-0.5 text-[10px] font-semibold ${sourceBadge}`}>
                {sourceLabel}
              </Badge>
              {seq.is_verified && (
                <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                  Verified
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{seq.name}</h1>
          </div>

          {/* SCI card */}
          <Card className="shrink-0 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">SCI Score</p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums text-gray-900">
                {Math.round(sci.score * 100)}%
              </p>
              <Badge className={`mt-1 rounded-full border-transparent px-2.5 py-0.5 text-[10px] font-bold ${tierColor}`}>
                {sci.tier}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Stats row */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            {steps.length} steps
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            ~{totalDays} days
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            {inspections} inspections
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {seq.times_used}× used
          </span>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <Link href={`/pro-network/proposals/new?blueprintId=${seq.id}`}>
            <Button className="h-auto rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md">
              Create Proposal from This Blueprint
            </Button>
          </Link>
        </div>
      </div>

      {/* Description card */}
      <Card className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {seq.description && (
            <p className="text-sm leading-6 text-gray-600">{seq.description}</p>
          )}
          {seq.plain_language_summary && (
            <div className={`rounded-xl ${SOFT_SURFACE} p-3`}>
              <p className="text-xs font-medium text-gray-500">In plain language</p>
              <p className="mt-1 text-sm text-gray-700">{seq.plain_language_summary}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step accordion */}
      <Card className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Steps ({steps.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {steps.map((step) => (
              <AccordionItem key={step.id} value={step.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-1 items-center gap-3 text-left">
                    {/* Step number circle */}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {step.step_number}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900">
                      {step.title}
                    </span>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {step.expected_duration_days && (
                        <Badge className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-600">
                          {step.expected_duration_days}d
                        </Badge>
                      )}
                      {step.requires_inspection && (
                        <Badge className="rounded-full border-transparent bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                          Inspection
                        </Badge>
                      )}
                      {step.is_milestone && (
                        <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          Milestone
                        </Badge>
                      )}
                      {step.is_critical_path && (
                        <Badge className="rounded-full border-transparent bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          Critical
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-10">
                    {/* Summary */}
                    {step.plain_language_summary && (
                      <p className="text-sm text-gray-600">{step.plain_language_summary}</p>
                    )}

                    {/* What to expect */}
                    {step.what_to_expect && (
                      <div className={`rounded-xl ${SOFT_SURFACE} p-3`}>
                        <p className="text-xs font-medium text-gray-500">What to expect</p>
                        <p className="mt-1 text-sm text-gray-700">{step.what_to_expect}</p>
                      </div>
                    )}

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {step.expected_duration_days && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Duration</p>
                          <p className="text-sm font-semibold text-gray-900">{step.expected_duration_days} days</p>
                        </div>
                      )}
                      {step.min_crew_size && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Crew</p>
                          <p className="text-sm font-semibold text-gray-900">{step.min_crew_size}+ workers</p>
                        </div>
                      )}
                      {step.depends_on_steps.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Depends on</p>
                          <p className="text-sm font-semibold text-gray-900">Step {step.depends_on_steps.join(', ')}</p>
                        </div>
                      )}
                      {step.typical_cost_percent !== null && step.typical_cost_percent > 0 && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cost weight</p>
                          <p className="text-sm font-semibold text-gray-900">{step.typical_cost_percent}%</p>
                        </div>
                      )}
                    </div>

                    {/* Gates / requirements badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {step.requires_permit && (
                        <Badge className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium text-gray-600">
                          <Shield className="mr-0.5 h-2.5 w-2.5" />
                          Permit Required
                        </Badge>
                      )}
                      {step.requires_jsa && (
                        <Badge className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium text-gray-600">
                          JSA Required
                        </Badge>
                      )}
                      {step.requires_submittal && (
                        <Badge className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium text-gray-600">
                          Submittal Required
                        </Badge>
                      )}
                      {step.requires_client_approval && (
                        <Badge className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium text-gray-600">
                          Client Approval
                        </Badge>
                      )}
                    </div>

                    {/* Code reference */}
                    {step.code_reference && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Shield className="h-3.5 w-3.5" />
                        <span>{step.code_reference}</span>
                        {step.authority_body && (
                          <span className="text-gray-400">— {step.authority_body}</span>
                        )}
                      </div>
                    )}

                    {/* Safety notes */}
                    {step.safety_notes && (
                      <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <div>
                          <p className="text-xs font-medium text-amber-800">Safety</p>
                          <p className="mt-0.5 text-sm text-amber-700">{step.safety_notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Quality criteria */}
                    {step.quality_criteria && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quality criteria</p>
                        <p className="mt-1 text-sm text-gray-600">{step.quality_criteria}</p>
                      </div>
                    )}

                    {/* Skip risk */}
                    {step.skip_risk_description && (
                      <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <div>
                          <p className="text-xs font-medium text-amber-800">Risk if skipped</p>
                          <p className="mt-0.5 text-sm text-amber-700">{step.skip_risk_description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Compliance card */}
      {seq.ruleset && (
        <Card className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900">Compliance Ruleset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">{seq.ruleset.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Region</p>
                <p className="text-sm font-semibold text-gray-900">{seq.ruleset.region}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Version</p>
                <p className="text-sm font-semibold text-gray-900">v{seq.ruleset.version}</p>
              </div>
            </div>
            {seq.ruleset.notes && (
              <p className="text-sm text-gray-500">{seq.ruleset.notes}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit controls */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          disabled={isPlatform}
          className="h-auto rounded-xl border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 disabled:opacity-50"
        >
          Edit Blueprint
        </Button>
        <Button
          variant="outline"
          className="h-auto rounded-xl border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700"
          onClick={() => window.alert('Duplicate as Custom — coming soon')}
        >
          <Copy className="mr-1.5 h-4 w-4" />
          Duplicate as Custom
        </Button>
      </div>
    </div>
  );
}
