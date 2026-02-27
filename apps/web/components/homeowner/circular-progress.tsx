"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  percent: number; // 0-100
  size?: number; // default 120
  strokeWidth?: number; // default 8
  className?: string;
}

export function CircularProgress({
  percent,
  size = 120,
  strokeWidth = 8,
  className,
}: CircularProgressProps) {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setDisplayPercent(percent);
    }, 50);
    return () => clearTimeout(timer);
  }, [percent]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayPercent / 100) * circumference;

  // Color based on percentage
  const getStrokeColor = (pct: number) => {
    if (pct < 60) return "rgb(16, 185, 129)"; // emerald-500
    if (pct <= 80) return "rgb(59, 130, 246)"; // blue-500
    return "rgb(16, 185, 129)"; // emerald-500
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(229, 231, 235)" // gray-200
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Foreground arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor(percent)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(percent)}</span>
        <span className="text-xs text-gray-500">%</span>
      </div>
    </div>
  );
}
