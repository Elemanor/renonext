'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectKpiRow } from '@/components/project/project-kpi-row';
import { ProjectScheduleTab } from '@/components/project/project-schedule-tab';
import { ProjectReportsTab } from '@/components/project/project-reports-tab';
import { ProjectProgressTab } from '@/components/project/project-progress-tab';
import { ProjectAlertsTab } from '@/components/project/project-alerts-tab';
import type { ProjectCommandCenterData } from '@/lib/supabase/queries/project-command-center';

const healthColors = {
  on_track: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  at_risk: 'bg-amber-100 text-amber-700 border-amber-200',
  behind: 'bg-red-100 text-red-700 border-red-200',
  critical: 'bg-red-200 text-red-800 border-red-300',
};

const healthLabels = {
  on_track: 'On Track',
  at_risk: 'At Risk',
  behind: 'Behind',
  critical: 'Critical',
};

interface ProjectDetailContentProps {
  data: ProjectCommandCenterData;
}

export function ProjectDetailContent({ data }: ProjectDetailContentProps) {
  const { project, schedule, reports, notifications, stages, tasks, gates } = data;

  const unreadAlerts = notifications.filter((n) => !n.read).length;

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Back link + header */}
      <div>
        <Link
          href="/dashboard/projects"
          className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{project.title}</h1>
              <Badge
                className={`shrink-0 rounded-full border text-[10px] font-bold ${healthColors[project.health]}`}
              >
                {healthLabels[project.health]}
              </Badge>
            </div>
            {project.address && (
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {project.address}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* KPI row */}
      <ProjectKpiRow project={project} />

      {/* Tabs */}
      <Tabs defaultValue="schedule">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="alerts" className="relative">
            Alerts
            {unreadAlerts > 0 && (
              <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadAlerts}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <ProjectScheduleTab schedule={schedule} todayDate={todayDate} />
        </TabsContent>

        <TabsContent value="reports">
          <ProjectReportsTab reports={reports} />
        </TabsContent>

        <TabsContent value="progress">
          <ProjectProgressTab stages={stages} tasks={tasks} gates={gates} />
        </TabsContent>

        <TabsContent value="alerts">
          <ProjectAlertsTab notifications={notifications} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
