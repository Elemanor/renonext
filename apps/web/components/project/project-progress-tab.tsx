'use client';

import type { ProjectStage, ProjectTask, TaskGate } from '@renonext/shared/types';
import { Layers } from 'lucide-react';
import { MilestoneStrip } from './milestone-strip';
import { StageProgressCard } from './stage-progress-card';
import { WebBarChart } from '@/components/charts/bar-chart';
import { WebLineChart } from '@/components/charts/line-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { stageTimeline, costSCurve } from '@/lib/mock-data/project-charts';

interface ProjectProgressTabProps {
  stages: ProjectStage[];
  tasks: ProjectTask[];
  gates: TaskGate[];
}

export function ProjectProgressTab({ stages, tasks, gates }: ProjectProgressTabProps) {
  if (stages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Layers className="mb-3 h-10 w-10 text-gray-300" />
        <p className="text-sm font-medium text-gray-500">
          Project stages will appear once work begins.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <MilestoneStrip stages={stages} />

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <WebBarChart
          title="Stage Duration — Planned vs Actual (days)"
          data={stageTimeline}
          xKey="stage"
          yKeys={['planned', 'actual']}
          height={200}
          layout="horizontal"
          colors={[CHART_COLORS.primary, CHART_COLORS.success]}
          formatter={(v, name) => `${v} days (${name})`}
          ariaLabel="Planned vs actual stage duration"
        />
        <WebLineChart
          title="Cost S-Curve — Planned vs Actual"
          data={costSCurve}
          xKey="week"
          yKeys={['planned', 'actual']}
          height={200}
          colors={[CHART_COLORS.slate, CHART_COLORS.primary]}
          formatter={(v) => `$${Number(v).toLocaleString()}`}
          ariaLabel="Cumulative cost planned vs actual"
        />
      </div>

      {stages.map((stage) => (
        <StageProgressCard
          key={stage.id}
          stage={stage}
          tasks={tasks}
          gates={gates}
        />
      ))}
    </div>
  );
}
