import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroCta {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

interface HeroStat {
  value: string;
  label: string;
}

interface PageHeroProps {
  badge?: { icon?: string; text: string };
  title: React.ReactNode;
  subtitle: string;
  ctas?: HeroCta[];
  background?: 'light' | 'dark';
  children?: React.ReactNode;
  stats?: HeroStat[];
  className?: string;
}

const ctaClasses = {
  primary:
    'bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-float hover:shadow-float-hover hover:-translate-y-0.5 transition-all',
  secondary:
    'bg-white border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg text-reno-dark hover:bg-slate-50 transition-colors',
  ghost:
    'bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors',
};

export function PageHero({
  badge,
  title,
  subtitle,
  ctas,
  background = 'light',
  children,
  stats,
  className,
}: PageHeroProps) {
  const isDark = background === 'dark';
  const hasRight = !!children;

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        isDark ? 'bg-reno-dark' : 'bg-[#f6f8f8]',
        className,
      )}
    >
      {/* Decorative gradient blobs */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          isDark
            ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(15,186,189,0.12),transparent_60%)]'
            : 'bg-[radial-gradient(circle_at_70%_30%,rgba(15,186,189,0.06),transparent_60%)]',
        )}
      />

      <div
        className={cn(
          'relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28',
          hasRight
            ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
            : '',
        )}
      >
        {/* Left — Copy */}
        <div className={cn(!hasRight && 'max-w-3xl mx-auto text-center')}>
          {badge && (
            <div
              className={cn(
                'mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold',
                isDark
                  ? 'bg-white/10 text-primary'
                  : 'bg-primary/10 text-primary',
                !hasRight && 'mx-auto',
              )}
            >
              {badge.icon && (
                <span className="material-symbols-outlined text-base">
                  {badge.icon}
                </span>
              )}
              {badge.text}
            </div>
          )}

          <h1
            className={cn(
              'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight',
              isDark ? 'text-white' : 'text-reno-dark',
            )}
          >
            {title}
          </h1>

          <p
            className={cn(
              'mt-6 text-lg leading-relaxed',
              isDark ? 'text-slate-400' : 'text-slate-600',
              !hasRight && 'max-w-2xl mx-auto',
            )}
          >
            {subtitle}
          </p>

          {ctas && ctas.length > 0 && (
            <div
              className={cn(
                'mt-10 flex flex-col sm:flex-row gap-4',
                !hasRight && 'justify-center',
              )}
            >
              {ctas.map((cta) => (
                <Link
                  key={cta.href + cta.label}
                  href={cta.href}
                  className={cn(
                    'inline-flex items-center justify-center',
                    ctaClasses[cta.variant ?? (isDark ? 'ghost' : 'primary')],
                  )}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div
              className={cn(
                'mt-12 grid gap-8',
                stats.length <= 3
                  ? `grid-cols-${stats.length}`
                  : 'grid-cols-2 sm:grid-cols-4',
                !hasRight && 'max-w-lg mx-auto',
              )}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className={cn(
                      'text-3xl font-extrabold',
                      isDark ? 'text-primary' : 'text-primary',
                    )}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={cn(
                      'text-sm mt-1',
                      isDark ? 'text-slate-500' : 'text-slate-500',
                    )}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Slot */}
        {children && <div className="relative">{children}</div>}
      </div>
    </section>
  );
}
