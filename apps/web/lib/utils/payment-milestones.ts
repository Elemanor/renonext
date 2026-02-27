import type { SequenceStep } from '@renonext/shared/types';

export interface PaymentMilestone {
  label: string;
  amount: number;
  percent: number;
  dueAt: string;
}

const DEPOSIT_PERCENT = 10;

export function derivePaymentMilestones(
  steps: SequenceStep[],
  estimatedCost: number
): PaymentMilestone[] {
  const milestones: PaymentMilestone[] = [];

  // Always start with deposit
  milestones.push({
    label: 'Deposit',
    amount: Math.round((estimatedCost * DEPOSIT_PERCENT) / 100),
    percent: DEPOSIT_PERCENT,
    dueAt: 'On signing',
  });

  // Each step that triggers a payment becomes a milestone
  let usedPercent = DEPOSIT_PERCENT;
  for (const step of steps) {
    if (step.triggers_payment && step.typical_cost_percent) {
      milestones.push({
        label: step.title,
        amount: Math.round((estimatedCost * step.typical_cost_percent) / 100),
        percent: step.typical_cost_percent,
        dueAt: `Step ${step.step_number} complete`,
      });
      usedPercent += step.typical_cost_percent;
    }
  }

  // If percentages don't reach 100%, add final payment
  if (usedPercent < 100) {
    const remaining = 100 - usedPercent;
    milestones.push({
      label: 'Final Payment',
      amount: Math.round((estimatedCost * remaining) / 100),
      percent: remaining,
      dueAt: 'Project complete',
    });
  }

  return milestones;
}
