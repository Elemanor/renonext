import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/data/costs';

interface ServiceCostCardProps {
  slug: string;
  title: string;
  category: string;
  startingPrice: number;
  unit: string;
  timeline: string;
}

export function ServiceCostCard({
  slug,
  title,
  category,
  startingPrice,
  unit,
  timeline,
}: ServiceCostCardProps) {
  return (
    <Link
      href={`/costs/${slug}`}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-reno-green/30 hover:shadow-md"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
        {category}
      </p>
      <h3 className="mt-1.5 text-lg font-semibold text-gray-900 group-hover:text-reno-green">
        {title}
      </h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-bold tabular-nums text-reno-green">
          {formatPrice(startingPrice)}
        </span>
        <span className="text-xs text-gray-500">starting {unit}</span>
      </div>
      <p className="mt-2 text-xs text-gray-500">{timeline}</p>
      <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-reno-green">
        See full breakdown
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
