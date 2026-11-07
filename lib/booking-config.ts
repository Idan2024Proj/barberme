/**
 * TEMPORARY DEVELOPMENT DEFAULTS — not final business rules.
 *
 * 15-minute slots, 60-minute notice, and 14-day horizon are placeholders
 * until the owner confirms production values.
 * bufferMinDefault is 0 because no real buffer was defined.
 */
export const bookingConfig = {
  timeZone: "Asia/Jerusalem",
  /** 0 = Sunday … 6 = Saturday (Israel). */
  weekStartsOn: 0 as const,
  bufferMinDefault: 0,
  slotStepMinutes: 15,
  minBookingNoticeMinutes: 60,
  maxHorizonDays: 14,
  holdDurationMinutes: 10,
} as const;

export type BookingConfig = typeof bookingConfig;
