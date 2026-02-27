import { type LucideIcon } from 'lucide-react';

const sizeMap = {
  sm: { box: 'h-10 w-10', icon: 'h-5 w-5' },
  md: { box: 'h-14 w-14', icon: 'h-7 w-7' },
  lg: { box: 'h-20 w-20', icon: 'h-10 w-10' },
} as const;

interface GradientIconProps {
  icon: LucideIcon;
  /** Tailwind gradient classes, e.g. "from-emerald-400 to-emerald-600" */
  gradient: string;
  size?: 'sm' | 'md' | 'lg';
  /** Add a blurred glow shadow matching the gradient */
  glow?: boolean;
  className?: string;
}

export function GradientIcon({
  icon: Icon,
  gradient,
  size = 'md',
  glow = false,
  className = '',
}: GradientIconProps) {
  const s = sizeMap[size];

  return (
    <div className={`relative inline-flex ${className}`}>
      {glow && (
        <div
          aria-hidden
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-20 blur-xl`}
        />
      )}
      <div
        className={`relative flex ${s.box} items-center justify-center rounded-2xl bg-gradient-to-br ${gradient}`}
      >
        <Icon className={`${s.icon} text-white`} strokeWidth={1.8} />
      </div>
    </div>
  );
}
