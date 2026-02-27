// ── Controlled Copy Constants ──
// All repeated or regulated copy lives here. Components import — never inline.
// One file update propagates everywhere.

// Regulated — legal must approve changes
export const PAYMENT_HOLD_COPY = 'Payments are released after your confirmation'; // TODO: Legal must confirm this matches actual payment flow
export const BCIN_VERIFIED_COPY = 'BCIN status available'; // TODO: Legal to confirm if "verified" claim is supportable
export const BCIN_VERIFICATION_DISCLAIMER = 'Verification status shown based on available records';
export const DISCLAIMER_COPY = 'RenoNext facilitates connections between homeowners and contractors. Terms apply.'; // TODO: Legal review before public launch

// Repeated microcopy — consistency across components
export const CANCEL_COPY = 'Cancel anytime before work starts';
export const MILESTONE_CAPTION = 'Payments are tied to milestones and require your confirmation';
export const COMPARE_CAPTION = 'Inspections and holdback add checkpoints before payments are released';
export const JOURNEY_CAPTION = 'Each step includes what to expect, who\'s on site, and what happens if something changes';
export const TRUST_TITLE = 'Protection and Support';
export const TRUST_SUBTITLE = 'Multiple layers of protection';

// Accept/Decline dialog copy
export const ACCEPT_DIALOG_TITLE = 'Confirm Deposit Payment';
export const ACCEPT_DIALOG_DESCRIPTION =
  "You'll be redirected to our secure payment partner to complete the deposit. This reserves your contractor and locks in pricing.";
export const DECLINE_DIALOG_TITLE = 'Decline Proposal';
export const DECLINE_DIALOG_DESCRIPTION =
  'This will notify the contractor that you have declined. You can always request a new proposal later.';

// Glossary definitions — used in tooltips and InlineTerms
export const GLOSSARY = {
  holdback: 'A percentage of payment held until you confirm final completion',
  bcin: 'Building Code Identification Number — licensed by Ontario\'s Ministry of Municipal Affairs',
  qualityCheckpoints: 'Go/no-go gates that must pass before the next phase begins',
  inspection: 'City-mandated verification by a building inspector',
  milestone: 'A stage of work that triggers a payment release upon your approval',
  paymentHold: 'Payments are released only after your confirmation',
} as const;
