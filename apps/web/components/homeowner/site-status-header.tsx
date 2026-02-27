"use client";

import type { Project } from "@renonext/shared/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Cloud, Sun, CloudRain } from "lucide-react";
import { CircularProgress } from "./circular-progress";

interface SiteStatusHeaderProps {
  project: Project;
  weather: { temp: number; condition: string; icon: string };
  crewCount: number;
}

const healthConfig = {
  on_track: { label: "On Track", color: "bg-emerald-100 text-emerald-800" },
  at_risk: { label: "Needs Attention", color: "bg-amber-100 text-amber-800" },
  behind: { label: "Running Behind", color: "bg-orange-100 text-orange-800" },
  critical: { label: "Delayed", color: "bg-red-100 text-red-800" },
};

const weatherIcons = {
  cloud: Cloud,
  sun: Sun,
  rain: CloudRain,
};

export function SiteStatusHeader({ project, weather, crewCount }: SiteStatusHeaderProps) {
  const health = project.health || "on_track";
  const healthInfo = healthConfig[health as keyof typeof healthConfig] || healthConfig.on_track;
  const WeatherIcon = weatherIcons[weather.icon as keyof typeof weatherIcons] || Cloud;

  return (
    <Card className="p-5">
      {/* Project title and address */}
      <div className="mb-4">
        <h1 className="text-xl font-bold">{project.title}</h1>
        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <MapPin className="h-4 w-4" />
          <span>{project.address}</span>
        </div>
      </div>

      {/* Progress, health, and weather */}
      <div className="flex items-center gap-6 mb-4">
        {/* Circular progress */}
        <CircularProgress percent={project.percent_complete || 0} />

        {/* Health badge */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Project Health</span>
          <Badge className={healthInfo.color} variant="secondary">
            {healthInfo.label}
          </Badge>
        </div>

        {/* Weather */}
        <div className="flex items-center gap-2">
          <WeatherIcon className="h-8 w-8 text-gray-600" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{weather.temp}°C</span>
            <span className="text-sm text-gray-600">{weather.condition}</span>
          </div>
        </div>
      </div>

      {/* Crew count */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{crewCount} crew at your home</span>
      </div>
    </Card>
  );
}
