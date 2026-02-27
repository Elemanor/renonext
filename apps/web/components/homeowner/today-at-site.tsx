"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import type { CrewMemberStatus } from "@/lib/mock-data/homeowner-dashboard";
import type { ScheduledWorkDay } from "@renonext/shared/types";
import { CrewMemberRow } from "./crew-member-row";

interface TodayAtSiteProps {
  crew: CrewMemberStatus[];
  schedule: ScheduledWorkDay[];
  workHours: {
    start: string;
    end: string;
    restrictions: string;
    saturday: boolean;
    sunday: boolean;
  } | null;
}

export function TodayAtSite({ crew, schedule, workHours }: TodayAtSiteProps) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Check if work is allowed on weekends
  const isWorkingToday = isWeekend
    ? (dayOfWeek === 0 && workHours?.sunday) || (dayOfWeek === 6 && workHours?.saturday)
    : true;

  // Find today's scheduled work
  const todaySchedule = schedule.find((day) => {
    const scheduleDate = new Date(day.date);
    return (
      scheduleDate.getDate() === today.getDate() &&
      scheduleDate.getMonth() === today.getMonth() &&
      scheduleDate.getFullYear() === today.getFullYear()
    );
  }) || schedule[0];

  return (
    <Card>
      <CardContent className="p-5">
        {/* Section header */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-gray-700" />
          <h2 className="text-lg font-semibold">Today at Your Site</h2>
        </div>

        {/* No work message for non-working days */}
        {!isWorkingToday && crew.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No work scheduled today. Enjoy your weekend!</p>
          </div>
        )}

        {/* Work hours and schedule */}
        {isWorkingToday && (
          <>
            {/* Work hours */}
            {workHours && (
              <div className="mb-4 text-sm text-gray-600">
                <span className="font-medium">Work Hours: </span>
                <span>{workHours.start} — {workHours.end}</span>
              </div>
            )}

            {/* Today's planned work */}
            {todaySchedule && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-700 mb-1">Planned Work</p>
                <p className="text-sm text-gray-600">{todaySchedule.work_planned}</p>
              </div>
            )}

            {/* Crew list */}
            {crew.length > 0 ? (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Crew Members</p>
                <div>
                  {crew.map((member, index) => (
                    <CrewMemberRow key={index} member={member} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">No crew members on site yet</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
