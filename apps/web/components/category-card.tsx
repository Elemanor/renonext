import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  proCount: number;
}

export function CategoryCard({
  name,
  slug,
  description,
  icon: Icon,
  proCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-reno-green-light hover:shadow-lg hover:shadow-reno-green-light/50"
    >
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 opacity-0 transition-all duration-200 group-hover:bg-reno-green-light group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4 text-reno-green-dark" />
      </div>
      <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-reno-green-light to-reno-green-light/50 p-3.5 transition-all duration-200 group-hover:from-reno-green-light group-hover:to-reno-green-light/50 group-hover:shadow-sm">
        <Icon className="h-7 w-7 text-reno-green-dark" />
      </div>
      <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-reno-green-dark">
        {name}
      </h3>
      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">{description}</p>
      <p className="text-sm font-semibold text-reno-green-dark">
        {proCount} pros available
      </p>
    </Link>
  );
}
