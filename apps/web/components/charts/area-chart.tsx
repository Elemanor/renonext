'use client';

import { useMemo } from 'react';
import {
  AreaChart,
  Area,
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartTooltip } from './chart-tooltip';

interface WebAreaChartProps {
  title?: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  height?: number;
  colors?: string[];
  gradient?: boolean;
  formatter?: (value: number, name: string) => string;
  ariaLabel?: string;
}

export function WebAreaChart({
  title,
  data,
  xKey,
  yKeys,
  height = 200,
  colors,
  gradient = true,
  formatter,
  ariaLabel = 'Area chart',
}: WebAreaChartProps) {
  const resolvedColors = useMemo(
    () => colors ?? yKeys.map((_, i) => CHART_COLORS.cat[i % CHART_COLORS.cat.length]),
    [colors, yKeys]
  );

  const chart = (
    <div style={{ minHeight: height }} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid
            stroke={CHART_GRID.stroke}
            strokeDasharray={CHART_GRID.strokeDasharray}
            vertical={false}
          />
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
          <Tooltip content={<ChartTooltip formatter={formatter} />} />
          <defs>
            {gradient &&
              resolvedColors.map((color, i) => (
                <linearGradient
                  key={i}
                  id={`webAreaGrad-${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              ))}
          </defs>
          {yKeys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={resolvedColors[i]}
              strokeWidth={2}
              fill={gradient ? `url(#webAreaGrad-${i})` : resolvedColors[i]}
              fillOpacity={gradient ? 1 : 0.1}
              animationDuration={CHART_ANIMATION.duration}
              animationEasing={CHART_ANIMATION.easing}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  if (!title) return chart;

  return (
    <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>{chart}</CardContent>
    </Card>
  );
}
