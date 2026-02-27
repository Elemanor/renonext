import { format, formatDistanceToNowStrict } from 'date-fns';

/** "8.5h" */
export function fmtHours(n: number): string {
  return `${Number(n.toFixed(1))}h`;
}

/** "$1,450" */
export function fmtCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

/** "94%" */
export function fmtPercent(n: number): string {
  return `${Math.round(n)}%`;
}

/** "Feb 13" */
export function fmtDate(d: string | Date): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return format(date, 'MMM d');
}

/** "2h ago" */
export function fmtRelativeTime(d: string | Date): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return formatDistanceToNowStrict(date, { addSuffix: true });
}
