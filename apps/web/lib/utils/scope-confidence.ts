import type { SequenceStep } from '@renonext/shared/types';

export type SCITier = 'HIGH' | 'MEDIUM' | 'LOW';

export interface SCIBreakdown {
  stepCoverage: number;
  inspectionCoverage: number;
  gateCoverage: number;
  codeReferences: number;
  paymentStructure: number;
  warrantyTerms: number;
  bcinBonus: number;
}

export interface SCIResult {
  score: number;
  tier: SCITier;
  breakdown: SCIBreakdown;
}

export interface SCIInput {
  steps: SequenceStep[];
  templateStepCount: number;
  totalInspections: number;
  totalGates: number;
  hasCodeReferences: boolean;
  hasHoldback: boolean;
  hasMilestones: boolean;
  hasWarrantyTerms: boolean;
  hasBcin: boolean;
}

export function computeScopeConfidence(input: SCIInput): SCIResult {
  const {
    steps,
    templateStepCount,
    totalInspections,
    totalGates,
    hasCodeReferences,
    hasHoldback,
    hasMilestones,
    hasWarrantyTerms,
    hasBcin,
  } = input;

  // 40% — step coverage (actual steps / template steps)
  const stepCoverage = templateStepCount > 0
    ? Math.min(steps.length / templateStepCount, 1) * 0.40
    : 0;

  // 20% — inspection coverage (steps requiring inspection / total steps)
  const stepsWithInspection = steps.filter((s) => s.requires_inspection).length;
  const inspectionCoverage = totalInspections > 0
    ? Math.min(stepsWithInspection / totalInspections, 1) * 0.20
    : 0.20; // full marks if no inspections expected

  // 15% — gate coverage
  const gateCoverage = totalGates > 0
    ? Math.min(totalGates / Math.max(steps.length, 1), 1) * 0.15
    : 0;

  // 10% — code references (boolean)
  const codeReferences = hasCodeReferences ? 0.10 : 0;

  // 10% — payment structure (holdback + milestones)
  const paymentStructure =
    (hasHoldback ? 0.05 : 0) + (hasMilestones ? 0.05 : 0);

  // 5% — warranty terms (boolean)
  const warrantyTerms = hasWarrantyTerms ? 0.05 : 0;

  // +5% BCIN bonus (additive, can push above 1.0 but we clamp)
  const bcinBonus = hasBcin ? 0.05 : 0;

  const rawScore =
    stepCoverage +
    inspectionCoverage +
    gateCoverage +
    codeReferences +
    paymentStructure +
    warrantyTerms +
    bcinBonus;

  const score = Math.min(rawScore, 1.0);

  let tier: SCITier;
  if (score >= 0.80) {
    tier = 'HIGH';
  } else if (score >= 0.50) {
    tier = 'MEDIUM';
  } else {
    tier = 'LOW';
  }

  return {
    score,
    tier,
    breakdown: {
      stepCoverage,
      inspectionCoverage,
      gateCoverage,
      codeReferences,
      paymentStructure,
      warrantyTerms,
      bcinBonus,
    },
  };
}
