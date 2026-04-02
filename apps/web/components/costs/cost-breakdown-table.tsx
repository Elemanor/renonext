import type { NumericPriceRange } from '@/lib/data/costs';
import { formatPrice } from '@/lib/data/costs';

interface CostBreakdownTableProps {
  ranges: NumericPriceRange[];
  cityName?: string;
}

export function CostBreakdownTable({ ranges, cityName }: CostBreakdownTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80">
            <th className="px-4 py-3 text-left font-semibold text-slate-900">
              Scope {cityName && <span className="text-xs font-normal text-slate-500">({cityName})</span>}
            </th>
            <th className="px-4 py-3 text-right font-semibold text-slate-900">Low</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-900">High</th>
            <th className="hidden px-4 py-3 text-right font-semibold text-slate-900 sm:table-cell">Unit</th>
            <th className="hidden px-4 py-3 text-right font-semibold text-slate-900 md:table-cell">Labour</th>
            <th className="hidden px-4 py-3 text-right font-semibold text-slate-900 md:table-cell">Material</th>
          </tr>
        </thead>
        <tbody>
          {ranges.map((r, i) => (
            <tr key={r.scope} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
              <td className="px-4 py-3 font-medium text-slate-800">{r.scope}</td>
              <td className="px-4 py-3 text-right tabular-nums text-slate-700">{formatPrice(r.minCAD)}</td>
              <td className="px-4 py-3 text-right tabular-nums text-slate-700">{formatPrice(r.maxCAD)}</td>
              <td className="hidden px-4 py-3 text-right text-slate-500 sm:table-cell">{r.unit}</td>
              <td className="hidden px-4 py-3 text-right text-slate-500 md:table-cell">{r.labourPct}%</td>
              <td className="hidden px-4 py-3 text-right text-slate-500 md:table-cell">{r.materialPct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
