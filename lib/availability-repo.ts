import { bookingConfig } from "@/lib/booking-config";
import { getPool } from "@/lib/db";
import {
  addMinutes,
  isValidIsoDate,
  jerusalemDateKey,
  jerusalemLocalToUtc,
  jerusalemWeekday,
} from "@/lib/time";
import {
  computeAvailability,
  type AvailabilityResult,
  type BusyInterval,
  type BusinessHours,
  type StaffCapability,
} from "@/lib/availability";

export type AvailabilityRequest = {
  serviceIds: string[];
  staffId?: string;
  date: string;
  now?: Date;
};

export type AvailabilityLoadError = {
  code:
    | "invalidDate"
    | "dateOutOfRange"
    | "missingServices"
    | "unknownService"
    | "inactiveService"
    | "unknownStaff"
    | "inactiveStaff"
    | "incompatibleStaff";
};

export async function loadAvailability(
  request: AvailabilityRequest,
): Promise<{ ok: true; data: AvailabilityResult } | { ok: false; error: AvailabilityLoadError }> {
  const now = request.now ?? new Date();
  if (!request.serviceIds.length) {
    return { ok: false, error: { code: "missingServices" } };
  }
  if (!isValidIsoDate(request.date)) {
    return { ok: false, error: { code: "invalidDate" } };
  }

  const todayKey = jerusalemDateKey(now);
  const horizonEnd = addMinutes(now, bookingConfig.maxHorizonDays * 24 * 60);
  const horizonKey = jerusalemDateKey(horizonEnd);
  if (request.date < todayKey || request.date > horizonKey) {
    return { ok: false, error: { code: "dateOutOfRange" } };
  }

  const pool = getPool();
  const serviceResult = await pool.query<{
    id: string;
    duration_min: number;
    is_active: boolean;
  }>(`SELECT id, duration_min, is_active FROM services WHERE id = ANY($1::text[])`, [
    request.serviceIds,
  ]);

  if (serviceResult.rowCount !== request.serviceIds.length) {
    return { ok: false, error: { code: "unknownService" } };
  }
  if (serviceResult.rows.some((row) => !row.is_active)) {
    return { ok: false, error: { code: "inactiveService" } };
  }

  const durationsMin = Object.fromEntries(
    serviceResult.rows.map((row) => [row.id, row.duration_min]),
  );

  const staffResult = await pool.query<{
    id: string;
    sort_order: number;
    is_active: boolean;
    service_ids: string[] | null;
  }>(
    `
    SELECT s.id, s.sort_order, s.is_active,
           COALESCE(array_agg(ss.service_id) FILTER (WHERE ss.service_id IS NOT NULL), '{}') AS service_ids
    FROM staff s
    LEFT JOIN staff_services ss ON ss.staff_id = s.id
    GROUP BY s.id
    `,
  );

  if (request.staffId) {
    const selected = staffResult.rows.find((row) => row.id === request.staffId);
    if (!selected) {
      return { ok: false, error: { code: "unknownStaff" } };
    }
    if (!selected.is_active) {
      return { ok: false, error: { code: "inactiveStaff" } };
    }
    const capable: StaffCapability = {
      id: selected.id,
      sortOrder: selected.sort_order,
      serviceIds: selected.service_ids ?? [],
    };
    if (!request.serviceIds.every((id) => capable.serviceIds.includes(id))) {
      return { ok: false, error: { code: "incompatibleStaff" } };
    }
  }

  const staff: StaffCapability[] = staffResult.rows
    .filter((row) => row.is_active)
    .map((row) => ({
      id: row.id,
      sortOrder: row.sort_order,
      serviceIds: row.service_ids ?? [],
    }));

  const noon = jerusalemLocalToUtc(request.date, "12:00");
  const weekday = jerusalemWeekday(noon);

  const hoursResult = await pool.query<{
    weekday: number;
    is_closed: boolean;
    opens_at: string | null;
    closes_at: string | null;
  }>(
    `
    SELECT weekday, is_closed, opens_at::text, closes_at::text
    FROM working_hours
    WHERE staff_id IS NULL AND weekday = $1
    `,
    [weekday],
  );

  const hoursRow = hoursResult.rows[0];
  const hours: BusinessHours | undefined = hoursRow
    ? {
        weekday: hoursRow.weekday,
        isClosed: hoursRow.is_closed,
        opensAt: hoursRow.opens_at ? hoursRow.opens_at.slice(0, 5) : null,
        closesAt: hoursRow.closes_at ? hoursRow.closes_at.slice(0, 5) : null,
      }
    : undefined;

  const dayStart = jerusalemLocalToUtc(request.date, "00:00");
  const dayEnd = addMinutes(dayStart, 24 * 60);
  const staffIds = request.staffId ? [request.staffId] : staff.map((member) => member.id);

  const busyAppointments = await pool.query<{
    staff_id: string;
    starts_at: Date;
    ends_at: Date;
  }>(
    `
    SELECT staff_id, starts_at, ends_at
    FROM appointments
    WHERE staff_id = ANY($1::text[])
      AND starts_at < $3
      AND ends_at > $2
      AND (
        status = 'confirmed'
        OR (status = 'hold' AND hold_expires_at > $4)
      )
    `,
    [staffIds, dayStart, dayEnd, now],
  );

  const busyOff = await pool.query<{
    staff_id: string;
    starts_at: Date;
    ends_at: Date;
  }>(
    `
    SELECT staff_id, starts_at, ends_at
    FROM time_off
    WHERE staff_id = ANY($1::text[])
      AND starts_at < $3
      AND ends_at > $2
    `,
    [staffIds, dayStart, dayEnd],
  );

  const busy: BusyInterval[] = [
    ...busyAppointments.rows.map((row) => ({
      staffId: row.staff_id,
      startsAt: row.starts_at,
      endsAt: row.ends_at,
    })),
    ...busyOff.rows.map((row) => ({
      staffId: row.staff_id,
      startsAt: row.starts_at,
      endsAt: row.ends_at,
    })),
  ];

  return {
    ok: true,
    data: computeAvailability(
      {
        serviceIds: request.serviceIds,
        staffId: request.staffId,
        date: request.date,
        now,
        durationsMin,
      },
      hours,
      staff,
      busy,
    ),
  };
}
