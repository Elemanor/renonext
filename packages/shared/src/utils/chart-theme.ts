/**
 * Shared chart theming constants for Recharts across web + field apps.
 */

export const CHART_COLORS = {
  primary: '#2563eb',   // blue-600
  secondary: '#8b5cf6', // violet-500
  accent: '#06b6d4',    // cyan-500
  danger: '#ef4444',    // red-500
  slate: '#64748b',     // slate-500

  // semantic
  info: '#3b82f6',      // blue-500
  warn: '#f59e0b',      // amber-500
  alert: '#ef4444',     // red-500
  success: '#10b981',   // emerald-500

  // categorical 8-color palette
  cat: [
    '#2563eb', // blue-600
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#8b5cf6', // violet-500
    '#ef4444', // red-500
    '#06b6d4', // cyan-500
    '#f97316', // orange-500
    '#64748b', // slate-500
  ] as const,
} as const;

export const CHART_FONT = {
  family: 'Inter, system-ui, -apple-system, sans-serif',
  size: 11,
  color: '#64748b', // slate-500
} as const;

export const CHART_GRID = {
  stroke: '#e2e8f0', // slate-200
  strokeDasharray: '3 3',
} as const;

export const TOOLTIP_STYLE = {
  backgroundColor: '#ffffff',
  borderColor: '#e2e8f0',
  borderRadius: 8,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  padding: '8px 12px',
  fontSize: 12,
  color: '#1e293b', // slate-800
} as const;

export const CHART_ANIMATION = {
  duration: 800,
  easing: 'ease-in-out' as const,
} as const;
