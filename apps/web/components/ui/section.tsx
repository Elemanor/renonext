import { cn } from '@/lib/utils';

type SectionSpacing = 'standard' | 'compact' | 'hero';
type SectionContainer = 'full' | 'narrow';
type SectionBackground = 'white' | 'cream' | 'dark';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  container?: SectionContainer;
  background?: SectionBackground;
}

const spacingClasses: Record<SectionSpacing, string> = {
  standard: 'py-20 md:py-28',
  compact: 'py-12 md:py-16',
  hero: 'pt-24 pb-20 md:pt-32 md:pb-28',
};

const containerClasses: Record<SectionContainer, string> = {
  full: 'max-w-7xl mx-auto px-6 lg:px-8',
  narrow: 'max-w-4xl mx-auto px-6 lg:px-8',
};

const bgClasses: Record<SectionBackground, string> = {
  white: 'bg-white',
  cream: 'bg-[#f6f8f8]',
  dark: 'bg-reno-dark',
};

export function Section({
  spacing = 'standard',
  container = 'full',
  background = 'white',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacingClasses[spacing], bgClasses[background], className)}
      {...props}
    >
      <div className={containerClasses[container]}>{children}</div>
    </section>
  );
}
