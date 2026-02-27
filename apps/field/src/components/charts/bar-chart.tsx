import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  CHART_COLORS,
  CHART_FONT,
  CHART_GRID,
  CHART_ANIMATION,
} from '@renonext/shared/utils/chart-theme';
import { ChartTooltip } from './chart-tooltip';

interface FieldBarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  height?: number;
  colors?: string[];
  layout?: 'vertical' | 'horizontal';
  stacked?: boolean;
  formatter?: (value: number, name: string) => string;
  ariaLabel?: string;
  barRadius?: number;
}

export function FieldBarChart({
  data,
  xKey,
  yKeys,
  height = 200,
  colors,
  layout = 'vertical',
  stacked = false,
  formatter,
  ariaLabel = 'Bar chart',
  barRadius = 4,
}: FieldBarChartProps) {
  const resolvedColors = useMemo(
    () => colors ?? yKeys.map((_, i) => CHART_COLORS.cat[i % CHART_COLORS.cat.length]),
    [colors, yKeys]
  );

  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className="min-h-[180px] rounded-lg border bg-white p-3"
      style={{ minHeight: height }}
      role="img"
      aria-label={ariaLabel}
    >
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 4, right: 8, bottom: 0, left: isHorizontal ? 60 : -12 }}
        >
          <CartesianGrid
            stroke={CHART_GRID.stroke}
            strokeDasharray={CHART_GRID.strokeDasharray}
            horizontal={!isHorizontal}
            vertical={isHorizontal}
          />
          {isHorizontal ? (
            <>
              <YAxis
                type="category"
                dataKey={xKey}
                tick={{ fontSize: CHART_FONT.size, fill: CHART_FONT.color }}
                tickLine={false}
                axisLine={false}
                width={56}
              />
              <XAxis
                type="number"
                tick={{ fontSize: CHART_FONT.size, fill: CHART_FONT.color }}
                tickLine={false}
                axisLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: CHART_FONT.size, fill: CHART_FONT.color }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: CHART_FONT.size, fill: CHART_FONT.color }}
                tickLine={false}
                axisLine={false}
              />
            </>
          )}
          <Tooltip content={<ChartTooltip formatter={formatter} />} />
          {yKeys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              fill={resolvedColors[i]}
              stackId={stacked ? 'stack' : undefined}
              radius={[barRadius, barRadius, 0, 0]}
              animationDuration={CHART_ANIMATION.duration}
              animationEasing={CHART_ANIMATION.easing}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
