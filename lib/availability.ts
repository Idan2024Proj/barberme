import { bookingConfig } from "@/lib/booking-config";
import {
  addMinutes,
  formatJerusalemHm,
  intervalsOverlap,
  jerusalemLocalToUtc,
} from "@/lib/time";

export type BusyInterval = {
  staffId: string;
  startsAt: Date;
  endsAt: Date;
};

export type StaffCapability = {
  id: string;
  sortOrder: number;
  serviceIds: string[];
};

export type BusinessHours = {
  weekday: number;
  isClosed: boolean;
  opensAt: string | null;
  closesAt: string | null;
};

export type AvailabilityQuery = {
  serviceIds: string[];
  staffId?: string | null;
  date: string;
  now?: Date;
  durationsMin: Record<string, number>;
};

export type AvailabilitySlot = {
  startsAt: string;
  localTime: string;
  staffId: string;
};

export type AvailabilityResult = {
  date: string;
  timezone: string;
  slots: AvailabilitySlot[];
};

export function combinedDurationMin(
  serviceIds: string[],
  durationsMin: Record<string, number>,
): number {
  return serviceIds.reduce((sum, id) => sum + (durationsMin[id] ?? 0), 0) + bookingConfig.bufferMinDefault;
}

export function staffCanPerform(staff: StaffCapability, serviceIds: string[]): boolean {
  return serviceIds.every((id) => staff.serviceIds.includes(id));
}

export function computeAvailability(
  query: AvailabilityQuery,
  hours: BusinessHours | undefined,
  staff: StaffCapability[],
  busy: BusyInterval[],
): AvailabilityResult {
  const now = query.now ?? new Date();
  const durationMin = combinedDurationMin(query.serviceIds, query.durationsMin);

  if (!hours || hours.isClosed || !hours.opensAt || !hours.closesAt || durationMin <= 0) {
    return emptyResult(query.date);
  }

  const dayStart = jerusalemLocalToUtc(query.date, hours.opensAt);
  const dayClose = jerusalemLocalToUtc(query.date, hours.closesAt);
  const earliest = addMinutes(now, bookingConfig.minBookingNoticeMinutes);

  const eligible = staff
    .filter((member) => staffCanPerform(member, query.serviceIds))
    .filter((member) => (query.staffId ? member.id === query.staffId : true))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));

  if (eligible.length === 0) {
    return emptyResult(query.date);
  }

  const slots: AvailabilitySlot[] = [];
  let cursor = dayStart;

  while (addMinutes(cursor, durationMin) <= dayClose) {
    const slotEnd = addMinutes(cursor, durationMin);
    if (cursor >= earliest) {
      const freeStaff = eligible.find(
        (member) =>
          !busy.some(
            (interval) =>
              interval.staffId === member.id &&
              intervalsOverlap(cursor, slotEnd, interval.startsAt, interval.endsAt),
          ),
      );
      if (freeStaff) {
        slots.push({
          startsAt: cursor.toISOString(),
          localTime: formatJerusalemHm(cursor),
          staffId: freeStaff.id,
        });
      }
    }
    cursor = addMinutes(cursor, bookingConfig.slotStepMinutes);
  }

  return {
    date: query.date,
    timezone: bookingConfig.timeZone,
    slots,
  };
}

function emptyResult(date: string): AvailabilityResult {
  return { date, timezone: bookingConfig.timeZone, slots: [] };
}
