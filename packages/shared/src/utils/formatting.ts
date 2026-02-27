import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

/**
 * Format a number as Canadian currency.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a distance in kilometers to a human-readable string.
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return `${meters} m`;
  }
  if (km < 10) {
    return `${km.toFixed(1)} km`;
  }
  return `${Math.round(km)} km`;
}

/**
 * Format a date string or Date object to a readable format.
 */
export function formatDate(
  date: string | Date,
  formatStr: string = 'MMM d, yyyy'
): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return 'Invalid date';
  return format(parsed, formatStr);
}

/**
 * Format a date as relative time (e.g., "2 hours ago").
 */
export function formatRelativeTime(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return 'Invalid date';
  return formatDistanceToNow(parsed, { addSuffix: true });
}

/**
 * Format a phone number to a standard North American format.
 * Input: any string of digits, possibly with +1 prefix.
 * Output: (416) 301-2344 style or returns original if not parseable.
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  // Handle 11-digit with leading 1 (country code)
  const normalized = digits.length === 11 && digits.startsWith('1')
    ? digits.slice(1)
    : digits;

  if (normalized.length !== 10) return phone;

  const area = normalized.slice(0, 3);
  const prefix = normalized.slice(3, 6);
  const line = normalized.slice(6, 10);
  return `(${area}) ${prefix}-${line}`;
}

/**
 * Format a numeric rating to a display string with one decimal.
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Truncate text to a maximum length, appending an ellipsis if truncated.
 */
export function truncateText(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen - 3).trimEnd();
  return `${truncated}...`;
}

/**
 * Format a duration in minutes to a human-readable string.
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours}h`;
  return `${hours}h ${remaining}m`;
}

/**
 * Format hours estimate for display (e.g., 1.5 -> "1.5 hrs", 1 -> "1 hr").
 */
export function formatHours(hours: number): string {
  if (hours === 1) return '1 hr';
  return `${hours} hrs`;
}
