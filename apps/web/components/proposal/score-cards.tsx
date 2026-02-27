'use client';

import type { SCITier, SCIBreakdown } from '@/lib/utils/scope-confidence';
import { CountUp } from '@/components/landing/_animations/count-up';
import { Progress } from '@/components/ui/progress';
import type { ProgressTier } from '@/components/ui/progress';
import { CARD_PAD, BODY } from '@/lib/ui/tokens';

interface ScoreCardsProps {
  score: number;
  tier: SCITier;
  breakdown: SCIBreakdown;
  inspectionCount: number;
  gateCount: number;
  holdbackPercent: number;
}

const tierConfig = {
  HIGH: {
    label: 'Well-Scoped',
    tagline: 'This proposal covers scope, inspections, and safeguards thoroughly.',
    trackStroke: '#d1fae5',
    arcStroke: '#10b981',
    progressTier: 'high' as ProgressTier,
    tierColor: 'text-emerald-600',
  },
  MEDIUM: {
    label: 'Partial Coverage',
    tagline: 'This proposal covers most key areas but could be more thorough.',
    trackStroke: '#fef3c7',
    arcStroke: '#f59e0b',
    progressTier: 'medium' as ProgressTier,
    tierColor: 'text-amber-600',
  },
  LOW: {
    label: 'Needs Review',
    tagline: 'This proposal may be missing important elements.',
    trackStroke: '#fee2e2',
    arcStroke: '#ef4444',
    progressTier: 'low' as ProgressTier,
    tierColor: 'text-red-600',
  },
};

const breakdownLabels: { key: keyof SCIBreakdown; label: string; maxWeight: number }[] = [
  { key: 'stepCoverage', label: 'Scope Detail', maxWeight: 0.40 },
  { key: 'inspectionCoverage', label: 'Inspections', maxWeight: 0.20 },
  { key: 'gateCoverage', label: 'Checkpoints', maxWeight: 0.15 },
  { key: 'codeReferences', label: 'Code Compliance', maxWeight: 0.10 },
  { key: 'paymentStructure', label: 'Payment Safety', maxWeight: 0.10 },
  { key: 'warrantyTerms', label: 'Warranty', maxWeight: 0.05 },
  { key: 'bcinBonus', label: 'Licensed Design', maxWeight: 0.05 },
];

export function ScoreCards({
  score,
  tier,
  breakdown,
  inspectionCount,
  gateCount,
  holdbackPercent,
}: ScoreCardsProps) {
  const config = tierConfig[tier];
  const pct = Math.round(score * 100);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score * circumference);

  // Confidence narrative
  const inspectionText = inspectionCount === 0
    ? 'no inspections'
    : `${inspectionCount} inspection${inspectionCount > 1 ? 's' : ''}`;
  const gateText = `${gateCount} checkpoint${gateCount !== 1 ? 's' : ''}`;
  const holdbackText = `${holdbackPercent}% holdback`;

  return (
    <div id="scope" className={CARD_PAD}>
      {/* Gauge + title */}
      <div className="flex items-center gap-5">
        {/* SVG circular gauge */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48" cy="48" r={radius}
              fill="none"
              stroke={config.trackStroke}
              strokeWidth="6"
            />
            <circle
              cx="48" cy="48" r={radius}
              fill="none"
              stroke={config.arcStroke}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <CountUp
              target={pct}
              suffix="%"
              duration={1200}
              className="text-xl font-extrabold tabular-nums text-foreground sm:text-2xl"
            />
          </div>
        </div>

        {/* Title + tier */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-foreground">Scope Confidence</h2>
          <p className={`mt-0.5 text-sm font-medium ${config.tierColor}`}>
            {config.label}
          </p>
          <p className={`mt-1 ${BODY}`}>{config.tagline}</p>
        </div>
      </div>

      {/* Breakdown grid */}
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
        {breakdownLabels.map(({ key, label, maxWeight }) => {
          const value = breakdown[key];
          const barPct = maxWeight > 0 ? Math.round((value / maxWeight) * 100) : 0;
          return (
            <div key={key}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
                <span className="text-[11px] font-semibold tabular-nums text-foreground">
                  {barPct}%
                </span>
              </div>
              <Progress
                value={Math.min(barPct, 100)}
                tier={config.progressTier}
                className="mt-1 h-1.5"
              />
            </div>
          );
        })}
      </div>

      {/* Confidence narrative */}
      <p className="mt-5 text-sm leading-6 text-muted-foreground">
        Includes {inspectionText}, {gateText}, and {holdbackText} — these are built into the project plan.
      </p>
    </div>
  );
}
