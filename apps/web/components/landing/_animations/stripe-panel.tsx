import { cn } from '@/lib/utils';

interface StripePanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

export function StripePanel({ children, className, variant = 'light' }: StripePanelProps) {
  const isLight = variant === 'light';

  return (
    <div
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl shadow-2xl backdrop-blur transition-all duration-200',
        'hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] motion-reduce:hover:translate-y-0',
        isLight ? 'border border-gray-200/60 bg-white/70' : 'border border-white/10 bg-white/5',
        className
      )}
    >
      {/* Inner ring — blooms on hover */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl ring-1 transition duration-300',
          isLight
            ? 'ring-white/50 group-hover:ring-white/70'
            : 'ring-white/10 group-hover:ring-white/15'
        )}
      />

      {/* Top gradient hairline */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px',
          isLight
            ? 'bg-gradient-to-r from-transparent via-gray-200/80 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
        )}
      />

      {/* Sheen (Stripe-style depth) */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100',
          isLight
            ? 'bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(99,102,241,0.10),transparent_35%)]'
            : 'bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(99,102,241,0.06),transparent_35%)]'
        )}
      />

      {/* Glow orb — drifts on hover */}
      <div
        className={cn(
          'pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl transition duration-300',
          'opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1',
          isLight ? 'bg-violet-400/10' : 'bg-violet-400/5'
        )}
      />

      {/* Children on safe z so overlays never cover interactive content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
