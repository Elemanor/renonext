import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: { icon?: string; text: string };
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

const headingClasses = {
  h1: 'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-reno-dark',
  h2: 'text-3xl md:text-4xl font-bold tracking-tight text-reno-dark',
  h3: 'text-xl md:text-2xl font-bold text-reno-dark',
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  as = 'h2',
  className,
}: SectionHeaderProps) {
  const Tag = as;
  const centered = align === 'center';

  return (
    <div
      className={cn(
        centered && 'text-center max-w-3xl mx-auto',
        className,
      )}
    >
      {badge && (
        <div
          className={cn(
            'mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold bg-primary/10 text-primary',
            centered && 'mx-auto',
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
      <Tag className={headingClasses[as]}>{title}</Tag>
      {subtitle && (
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
