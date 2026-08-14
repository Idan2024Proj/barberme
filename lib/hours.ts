import { t } from "@/lib/content";

export const DISPLAY_TIME_ZONE = "Asia/Jerusalem";

type HourRow = (typeof t.shop.hours)[number];

const WEEKDAY_TO_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function jerusalemParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: DISPLAY_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return {
    dayIndex: WEEKDAY_TO_INDEX[weekday] ?? 0,
    minutes: hour * 60 + minute,
  };
}

function parseHm(value: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }
  return Number(match[1]) * 60 + Number(match[2]);
}

export function getShopHoursState(hours: HourRow[], now = new Date()) {
  const { dayIndex, minutes } = jerusalemParts(now);
  const today = hours[dayIndex];
  const isClosedDay = !today || today.closed;
  const openMinutes = today ? parseHm(today.open) : null;
  const closeMinutes = today ? parseHm(today.close) : null;
  const isOpen =
    !isClosedDay &&
    openMinutes !== null &&
    closeMinutes !== null &&
    minutes >= openMinutes &&
    minutes < closeMinutes;

  return {
    dayIndex,
    isOpen,
    isClosedDay,
  };
}
