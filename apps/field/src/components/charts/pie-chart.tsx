import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS, CHART_ANIMATION } from '@renonext/shared/utils/chart-theme';
import { ChartTooltip } from './chart-tooltip';
import type { PieSlice } from '@renonext/shared/components/charts/chart-types';

interface FieldPieChartProps {
  data: PieSlice[];
  height?: number;
  donut?: boolean;
  innerLabel?: string;
  formatter?: (value: number, name: string) => string;
  ariaLabel?: string;
}

export function FieldPieChart({
  data,
  height = 200,
  donut = false,
  innerLabel,
  formatter,
  ariaLabel = 'Pie chart',
}: FieldPieChartProps) {
  const coloredData = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        color: d.color || CHART_COLORS.cat[i % CHART_COLORS.cat.length],
      })),
    [data]
  );

  return (
    <div
      className="relative min-h-[160px] rounded-lg border bg-white p-3"
      style={{ minHeight: height }}
      role="img"
      aria-label={ariaLabel}
    >
      {donut && innerLabel && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-slate-900">{innerLabel}</span>
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={coloredData}
            cx="50%"
            cy="50%"
            innerRadius={donut ? '55%' : 0}
            outerRadius="80%"
            dataKey="value"
            nameKey="name"
            strokeWidth={2}
            stroke="#fff"
            animationDuration={CHART_ANIMATION.duration}
            animationEasing={CHART_ANIMATION.easing}
          >
            {coloredData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip formatter={formatter} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
