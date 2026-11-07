import { bookingConfig } from "@/lib/booking-config";

export const DISPLAY_TIME_ZONE = bookingConfig.timeZone;

type ZoneParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: string;
};

function zoneParts(date: Date, timeZone: string): ZoneParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const map = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
    weekday: map.weekday ?? "Sun",
  };
}

const WEEKDAY_TO_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function jerusalemWeekday(date: Date): number {
  return WEEKDAY_TO_INDEX[zoneParts(date, DISPLAY_TIME_ZONE).weekday] ?? 0;
}

export function jerusalemDateKey(date: Date): string {
  const parts = zoneParts(date, DISPLAY_TIME_ZONE);
  return `${String(parts.year).padStart(4, "0")}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function formatJerusalemHm(date: Date): string {
  const parts = zoneParts(date, DISPLAY_TIME_ZONE);
  return `${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}`;
}

export function isValidIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

/**
 * Interpret a civil clock time in Asia/Jerusalem as an absolute UTC instant.
 * Does not use the host machine timezone.
 */
export function jerusalemLocalToUtc(isoDate: string, hm: string): Date {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(hm);
  if (!dateMatch || !timeMatch) {
    throw new Error("Invalid Jerusalem local datetime");
  }

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);

  let utcMs = targetAsUtc;
  for (let i = 0; i < 4; i += 1) {
    const parts = zoneParts(new Date(utcMs), DISPLAY_TIME_ZONE);
    const shownAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    const diff = shownAsUtc - targetAsUtc;
    if (diff === 0) {
      break;
    }
    utcMs -= diff;
  }

  return new Date(utcMs);
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

export function intervalsOverlap(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date,
): boolean {
  return startA < endB && endA > startB;
}
