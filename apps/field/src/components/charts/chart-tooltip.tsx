import { TOOLTIP_STYLE, CHART_FONT } from '@renonext/shared/utils/chart-theme';

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  formatter?: (value: number, name: string) => string;
}

export function ChartTooltip({ active, payload, label, formatter }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        ...TOOLTIP_STYLE,
        fontFamily: CHART_FONT.family,
      }}
    >
      {label && (
        <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      )}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-slate-600">{p.name}:</span>
          <span className="font-semibold text-slate-900">
            {formatter ? formatter(p.value, p.name) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}
