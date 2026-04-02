import Link from 'next/link';
import {
  cityMultipliers,
  getCityAdjustedPrice,
  formatPrice,
  type NumericPriceRange,
} from '@/lib/data/costs';

interface CityComparisonTableProps {
  serviceSlug: string;
  serviceTitle: string;
  baseRange: NumericPriceRange;
}

export function CityComparisonTable({
  serviceSlug,
  serviceTitle,
  baseRange,
}: CityComparisonTableProps) {
  const rows = cityMultipliers.map((city) => {
    const { min, max } = getCityAdjustedPrice(
      baseRange.minCAD,
      baseRange.maxCAD,
      baseRange.labourPct,
      baseRange.materialPct,
      city,
    );
    return { city, min, max };
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80">
            <th className="px-4 py-3 text-left font-semibold text-slate-900">City</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-900">Low</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-900">High</th>
            <th className="hidden px-4 py-3 text-right font-semibold text-slate-900 sm:table-cell">vs Toronto</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-900">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ city, min, max }, i) => {
            const diff = Math.round((city.overall - 1) * 100);
            return (
              <tr key={city.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-800">{city.name}</div>
                  <div className="text-xs text-slate-400">{city.region}</div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-slate-700">{formatPrice(min)}</td>
                <td className="px-4 py-3 text-right tabular-nums text-slate-700">{formatPrice(max)}</td>
                <td className="hidden px-4 py-3 text-right sm:table-cell">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      diff > 0
                        ? 'bg-red-50 text-red-600'
                        : diff < 0
                        ? 'bg-reno-green-50 text-reno-green-600'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {diff > 0 ? '+' : ''}{diff}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/costs/${serviceSlug}/${city.slug}`}
                    className="text-xs font-medium text-reno-green hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
