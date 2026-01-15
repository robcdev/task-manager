/**
 * Safely converts a Date object or date string to an ISO string format.
 * @param date - A Date object or date string
 * @returns ISO string representation of the date
 */
export function toISOString(date: Date | string): string {
  return date instanceof Date ? date.toISOString() : new Date(date).toISOString();
}
