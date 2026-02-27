'use client';

import { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { CHART_COLORS, CHART_ANIMATION } from '@renonext/shared/utils/chart-theme';

interface MiniSparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function MiniSparkline({
  data,
  color = CHART_COLORS.primary,
  width = 60,
  height = 24,
}: MiniSparklineProps) {
  const chartData = useMemo(
    () => data.map((value, i) => ({ i, value })),
    [data]
  );

  if (!data.length) return null;

  return (
    <div style={{ width, height }} aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            animationDuration={CHART_ANIMATION.duration}
            animationEasing={CHART_ANIMATION.easing}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
