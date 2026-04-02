import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-reno-dark mb-3">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </>
  );

  const cardClasses = cn(
    'group rounded-2xl border border-primary/5 bg-white p-6 shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-300',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}
