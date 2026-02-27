'use client';

import type { HomeownerDashboardData } from '@/lib/mock-data/homeowner-dashboard';
import { SiteStatusHeader } from '@/components/homeowner/site-status-header';
import { TodayAtSite } from '@/components/homeowner/today-at-site';
import { WeekAhead } from '@/components/homeowner/week-ahead';
import { UpcomingInspections } from '@/components/homeowner/upcoming-inspections';
import { ProjectMilestones } from '@/components/homeowner/project-milestones';
import { ActivityFeed } from '@/components/homeowner/activity-feed';
import { QuickStatsRow } from '@/components/homeowner/quick-stats-row';
import { NotificationsPanel } from '@/components/homeowner/notifications-panel';

interface MyProjectContentProps {
  data: HomeownerDashboardData;
}

export function MyProjectContent({ data }: MyProjectContentProps) {
  const { project, schedule, notifications, stages, extras } = data;

  return (
    <div className="space-y-6">
      {/* Site Status Header — full width */}
      <SiteStatusHeader
        project={project}
        weather={extras.currentWeather}
        crewCount={extras.todayCrew.filter((c) => c.status === 'on_site').length}
      />

      {/* Two-column layout on desktop */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main column */}
        <div className="min-w-0 flex-1 space-y-6">
          <TodayAtSite
            crew={extras.todayCrew}
            schedule={schedule}
            workHours={project.work_hours as { start: string; end: string; restrictions: string; saturday: boolean; sunday: boolean } | null}
          />

          <WeekAhead schedule={schedule} />

          <UpcomingInspections inspections={extras.inspections} />

          <ProjectMilestones
            stages={stages}
            plannedEnd={project.planned_end}
          />

          <ActivityFeed items={extras.activityFeed} />
        </div>

        {/* Sidebar column — stacks below on mobile */}
        <div className="w-full space-y-6 lg:w-80 lg:shrink-0">
          <QuickStatsRow
            daysSinceIncident={extras.daysSinceIncident}
            hoursThisWeek={extras.totalHoursThisWeek}
            pendingQuestions={extras.pendingQuestions}
            spentToDate={project.spent_to_date ?? 0}
            contractValue={project.contract_value ?? 0}
          />

          <NotificationsPanel notifications={notifications} />
        </div>
      </div>
    </div>
  );
}
