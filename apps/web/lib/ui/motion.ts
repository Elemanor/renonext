// ── Motion Constants ──
// No indefinite animations. Only: on mount, on reveal, on hover/focus.
// Every component imports from here — no inline duration-300/500 invention.

export const TRANSITION = 'transition-all duration-200 ease-out';
export const HOVER_LIFT = 'hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200';
export const REVEAL_DURATION = 0.25; // seconds, for ScrollReveal
export const PROGRESS_DURATION = 'duration-700'; // CSS transition for Progress fill
