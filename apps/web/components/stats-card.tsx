import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBg?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  iconColor = 'text-reno-green-dark',
  iconBg = 'bg-reno-green-light',
}: StatsCardProps) {
  return (
    <Card className="rounded-2xl border border-gray-200 bg-white shadow-none transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`rounded-xl p-2.5 ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          {trend && (
            <Badge
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                trend.isPositive
                  ? 'bg-green-50 text-green-700 hover:bg-green-50'
                  : 'bg-red-50 text-red-700 hover:bg-red-50'
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(trend.value)}%
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
