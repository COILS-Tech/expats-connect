import { format, formatDistanceToNow, isPast } from "date-fns";

export function formatEventDate(dateStr: string): string {
  return format(new Date(dateStr), "EEEE, d MMMM yyyy");
}

export function formatEventDateShort(dateStr: string): string {
  return format(new Date(dateStr), "d MMM yyyy");
}

export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return format(date, "h:mm a");
}

export function isEventPast(dateStr: string): boolean {
  return isPast(new Date(dateStr));
}

export function timeAgo(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}
