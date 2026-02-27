// ── Design Tokens ──
// Centralized spacing, typography, surface, and layout constants.
// All proposal components import from here — no inline invention.

// Spacing
export const SECTION_GAP = 'space-y-8';
export const CARD_PAD = 'p-4 sm:p-6';
export const CARD_PAD_TIGHT = 'p-3 sm:p-4';

// Typography — no hardcoded colors, component adds text-foreground or text-white as needed
export const NUM_DISPLAY = 'tabular-nums tracking-tight font-extrabold';
export const NUM_STAT = 'tabular-nums font-bold';
export const BODY = 'text-sm leading-6 text-muted-foreground';
export const LABEL = 'text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70';
export const SECTION_TITLE = 'text-lg font-semibold';

// Surfaces — semantic tokens, no hardcoded bg-gray-50
export const SOFT_SURFACE = 'bg-muted/40';
export const SUBTLE_RING = 'ring-1 ring-border/60';
export const DARK_SURFACE = 'bg-gradient-to-br from-gray-900 to-slate-900'; // TrustGuarantees only

// Layout
export const CONTENT_MAX = 'max-w-5xl';
export const SIDEBAR_WIDTH = '340px';
export const SIDEBAR_TOP = 'top-24';
export const SCROLL_OFFSET = 'scroll-mt-24';

// Focus + interaction
export const FOCUS_RING = 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
export const ROW_HOVER = 'hover:bg-muted/40';

// Mobile sticky bar
export const MOBILE_CTA_MAX_H = 'max-h-[120px]'; // thumb zone constraint

// ── Behavioral Rules (enforced by convention, not code) ──
//
// COLLAPSE POLICY:
//   All collapsible sections closed by default on all breakpoints.
//   No auto-expansion based on proposal state.
//   No remembering open state across visits.
//   No scroll-jumping on expand/collapse.
//   Radix Accordion: type="single" collapsible, no defaultValue.
//   CompareTable mobile: <details> without open attribute.
//
// VISUAL SILENCE:
//   No horizontal dividers (<Separator />, h-px, border-b) outside of tables.
//   Spacing alone creates section rhythm. If you need separation, increase space-y.
//   Tables use their own internal borders (shadcn Table handles this).
//
// MOBILE STICKY BAR:
//   Accept button only. No Decline button in thumb zone.
//   Decline lives inline on desktop sidebar only.
//   Max height 120px. Contents: price line, Accept button, holdback text, cancel text.
