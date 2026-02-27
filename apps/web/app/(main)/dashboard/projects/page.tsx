'use client';

import Link from 'next/link';
import { HardHat, MapPin, ChevronRight, TrendingUp, CheckCircle2, DollarSign, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WebPieChart } from '@/components/charts/pie-chart';
import { formatCurrency } from '@/lib/utils/format';
import { mockProjects, portfolioHealth } from '@/lib/mock-data/project-charts';

const healthColors: Record<string, string> = {
  on_track: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  at_risk: 'bg-amber-100 text-amber-700 border-amber-200',
  behind: 'bg-red-100 text-red-700 border-red-200',
  critical: 'bg-red-200 text-red-800 border-red-300',
};

const healthLabels: Record<string, string> = {
  on_track: 'On Track',
  at_risk: 'At Risk',
  behind: 'Behind',
  critical: 'Critical',
};

const tierFromPercent = (pct: number) => {
  if (pct >= 80) return 'high' as const;
  if (pct >= 40) return 'medium' as const;
  return 'low' as const;
};

const projects = mockProjects;

export default function ProjectsListPage() {
  const activeCount = projects.filter((p) => p.status === 'active').length;
  const onTrackCount = projects.filter((p) => p.health === 'on_track').length;
  const totalValue = projects.reduce((s, p) => s + p.contract_value, 0);
  const avgCompletion = Math.round(projects.reduce((s, p) => s + p.percent_complete, 0) / projects.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
          <HardHat className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Projects</h1>
          <p className="text-sm text-gray-500">{projects.length} active project{projects.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Portfolio KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <PortfolioKpi icon={HardHat} label="Active" value={String(activeCount)} color="text-blue-600 bg-blue-50" />
        <PortfolioKpi icon={CheckCircle2} label="On Track" value={String(onTrackCount)} color="text-emerald-600 bg-emerald-50" />
        <PortfolioKpi icon={DollarSign} label="Total Value" value={formatCurrency(totalValue)} color="text-amber-600 bg-amber-50" />
        <PortfolioKpi icon={Target} label="Avg Completion" value={`${avgCompletion}%`} color="text-violet-600 bg-violet-50" />
      </div>

      {/* Health Distribution */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h2 className="mb-2 text-sm font-semibold text-gray-900">Project Health</h2>
            <WebPieChart data={portfolioHealth} height={160} ariaLabel="Project health distribution" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-center p-5">
            <div className="text-center">
              <p className="text-4xl font-bold tabular-nums text-gray-900">{avgCompletion}%</p>
              <p className="mt-1 text-xs text-gray-500">Average Completion</p>
              <div className="mx-auto mt-3 w-40">
                <Progress value={avgCompletion} tier={tierFromPercent(avgCompletion)} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
            <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-gray-900">{project.title}</h2>
                      <Badge
                        className={`shrink-0 rounded-full border text-[10px] font-bold ${healthColors[project.health]}`}
                      >
                        {healthLabels[project.health]}
                      </Badge>
                    </div>

                    {project.address && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {project.address}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span className="font-semibold tabular-nums text-gray-700">{project.percent_complete}%</span>
                        </div>
                        <Progress value={project.percent_complete} tier={tierFromPercent(project.percent_complete)} className="h-1.5" />
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-xs text-gray-500">Contract</p>
                        <p className="text-sm font-semibold tabular-nums text-gray-900">{formatCurrency(project.contract_value)}</p>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="mt-2 h-5 w-5 shrink-0 text-gray-300" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PortfolioKpi({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-xl font-bold tabular-nums text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}
