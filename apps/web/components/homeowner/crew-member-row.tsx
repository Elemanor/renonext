"use client";

import { Badge } from "@/components/ui/badge";
import type { CrewMemberStatus } from "@/lib/mock-data/homeowner-dashboard";

interface CrewMemberRowProps {
  member: CrewMemberStatus;
}

const statusConfig = {
  on_site: { label: "On Site", color: "bg-emerald-100 text-emerald-800" },
  break: { label: "Break", color: "bg-amber-100 text-amber-800" },
  completed: { label: "Done", color: "bg-gray-100 text-gray-800" },
  expected: { label: "Expected", color: "bg-blue-100 text-blue-800" },
};

export function CrewMemberRow({ member }: CrewMemberRowProps) {
  const statusInfo = statusConfig[member.status as keyof typeof statusConfig] || statusConfig.expected;

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="font-medium">{member.name}</span>
        <span className="text-sm text-gray-500">{member.trade}</span>
      </div>

      <div className="flex items-center gap-4">
        {member.checkInTime && (
          <span className="text-sm text-gray-600">{member.checkInTime}</span>
        )}
        <Badge className={statusInfo.color} variant="secondary">
          {statusInfo.label}
        </Badge>
      </div>
    </div>
  );
}
