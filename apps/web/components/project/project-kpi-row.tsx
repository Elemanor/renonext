import type { Project } from '@renonext/shared/types';
import { TrendingUp, CalendarCheck, Users, DollarSign, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/format';
import { MiniSparkline } from '@/components/charts/mini-sparkline';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { kpiSparklines } from '@/lib/mock-data/project-charts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProjectKpiRowProps {
  project: Project;
}

export function ProjectKpiRow({ project }: ProjectKpiRowProps) {
  const kpis = [
    {
      label: 'Progress',
      value: `${project.percent_complete}%`,
      Icon: TrendingUp,
      color: 'text-primary-600 bg-primary-50',
      sparkline: kpiSparklines.progress,
      sparkColor: CHART_COLORS.primary,
    },
    {
      label: 'Schedule Confidence',
      value: project.schedule_confidence != null ? `${project.schedule_confidence}%` : '—',
      Icon: CalendarCheck,
      color: 'text-reno-green-600 bg-reno-green-50',
      tooltip: 'Based on permits, inspections, and material readiness',
      sparkline: kpiSparklines.scheduleConfidence,
      sparkColor: CHART_COLORS.success,
    },
    {
      label: 'Workers on Site',
      value: String(project.workers_on_site),
      Icon: Users,
      color: 'text-reno-purple-600 bg-reno-purple-50',
      sparkline: kpiSparklines.workers,
      sparkColor: '#8b5cf6',
    },
    {
      label: 'Spent to Date',
      value: formatCurrency(project.spent_to_date),
      Icon: DollarSign,
      color: 'text-amber-600 bg-amber-50',
      sparkline: kpiSparklines.spent,
      sparkColor: CHART_COLORS.warn,
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', kpi.color)}>
                <kpi.Icon className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5">
                {kpi.sparkline && (
                  <MiniSparkline data={kpi.sparkline} color={kpi.sparkColor} width={48} height={20} />
                )}
                {kpi.tooltip && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">{kpi.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            <p className="text-xl font-bold tabular-nums text-slate-900">{kpi.value}</p>
            <p className="text-xs text-slate-500">{kpi.label}</p>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
