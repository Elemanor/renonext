import Link from 'next/link';
import { MapPin } from 'lucide-react';
import {
  getNearbyCities,
  getCityAdjustedPrice,
  formatPriceRange,
  type ServiceCostData,
} from '@/lib/data/costs';

interface NearbyCityCardsProps {
  currentCitySlug: string;
  service: ServiceCostData;
}

export function NearbyCityCards({ currentCitySlug, service }: NearbyCityCardsProps) {
  const nearbyCities = getNearbyCities(currentCitySlug);
  const baseRange = service.priceRanges[0];
  if (!baseRange || nearbyCities.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {nearbyCities.map((city) => {
        const { min, max } = getCityAdjustedPrice(
          baseRange.minCAD,
          baseRange.maxCAD,
          baseRange.labourPct,
          baseRange.materialPct,
          city,
        );
        const diff = Math.round((city.overall - 1) * 100);

        return (
          <Link
            key={city.slug}
            href={`/costs/${service.slug}/${city.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-reno-green/30 hover:shadow-md"
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-900">{city.name}</span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-400">{city.region}</p>
            <p className="mt-2 text-sm font-bold tabular-nums text-slate-800">
              {formatPriceRange(min, max)}
            </p>
            <p className="text-[10px] text-slate-500">{baseRange.unit}</p>
            <span
              className={`mt-2 self-start rounded-full px-2 py-0.5 text-[10px] font-medium ${
                diff > 0
                  ? 'bg-red-50 text-red-600'
                  : diff < 0
                  ? 'bg-reno-green-50 text-reno-green-600'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {diff > 0 ? '+' : ''}{diff}% vs Toronto
            </span>
          </Link>
        );
      })}
    </div>
  );
}
