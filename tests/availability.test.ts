import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { computeAvailability, type StaffCapability } from "../lib/availability";
import { jerusalemLocalToUtc } from "../lib/time";

const staff: StaffCapability[] = [
  { id: "s1", sortOrder: 0, serviceIds: ["haircut", "beard"] },
  { id: "s2", sortOrder: 1, serviceIds: ["haircut"] },
];

const thursdayHours = {
  weekday: 4,
  isClosed: false,
  opensAt: "09:00",
  closesAt: "12:00",
};

const saturdayClosed = {
  weekday: 6,
  isClosed: true,
  opensAt: "",
  closesAt: "",
};

const now = jerusalemLocalToUtc("2026-08-20", "07:00");

describe("availability engine", () => {
  it("returns no slots on a closed day", () => {
    const result = computeAvailability(
      {
        serviceIds: ["haircut"],
        date: "2026-08-22",
        now,
        durationsMin: { haircut: 40 },
      },
      saturdayClosed,
      staff,
      [],
    );
    assert.equal(result.slots.length, 0);
  });

  it("rejects a slot that would end after closing time", () => {
    const result = computeAvailability(
      {
        serviceIds: ["haircut"],
        date: "2026-08-20",
        now,
        durationsMin: { haircut: 40 },
      },
      thursdayHours,
      staff,
      [],
    );
    const last = result.slots.at(-1);
    assert.ok(last);
    assert.ok(last.localTime <= "11:15");
    assert.ok(!result.slots.some((slot) => slot.localTime === "11:30"));
  });

  it("uses combined duration for multiple services", () => {
    const result = computeAvailability(
      {
        serviceIds: ["haircut", "beard"],
        date: "2026-08-20",
        now,
        durationsMin: { haircut: 40, beard: 25 },
      },
      thursdayHours,
      staff,
      [],
    );
    const last = result.slots.at(-1);
    assert.ok(last);
    assert.ok(last.localTime <= "10:45");
  });

  it("blocks a confirmed appointment", () => {
    const start = jerusalemLocalToUtc("2026-08-20", "10:00");
    const result = computeAvailability(
      {
        serviceIds: ["haircut"],
        staffId: "s1",
        date: "2026-08-20",
        now,
        durationsMin: { haircut: 40 },
      },
      thursdayHours,
      staff,
      [{ staffId: "s1", startsAt: start, endsAt: new Date(start.getTime() + 40 * 60_000) }],
    );
    assert.ok(!result.slots.some((slot) => slot.localTime === "10:00"));
  });

  it("blocks an active hold", () => {
    const start = jerusalemLocalToUtc("2026-08-20", "09:30");
    const result = computeAvailability(
      {
        serviceIds: ["haircut"],
        staffId: "s1",
        date: "2026-08-20",
        now,
        durationsMin: { haircut: 40 },
      },
      thursdayHours,
      staff,
      [{ staffId: "s1", startsAt: start, endsAt: new Date(start.getTime() + 40 * 60_000) }],
    );
    assert.ok(!result.slots.some((slot) => slot.localTime === "09:30"));
  });

  it("does not block cancelled or expired appointments when they are omitted from busy intervals", () => {
    const result = computeAvailability(
      {
        serviceIds: ["haircut"],
        staffId: "s1",
        date: "2026-08-20",
        now,
        durationsMin: { haircut: 40 },
      },
      thursdayHours,
      staff,
      [],
    );
    assert.ok(result.slots.some((slot) => slot.localTime === "09:00"));
  });

  it("blocks staff time off", () => {
    const start = jerusalemLocalToUtc("2026-08-20", "09:00");
    const result = computeAvailability(
      {
        serviceIds: ["haircut"],
        staffId: "s1",
        date: "2026-08-20",
        now,
        durationsMin: { haircut: 40 },
      },
      thursdayHours,
      staff,
      [{ staffId: "s1", startsAt: start, endsAt: jerusalemLocalToUtc("2026-08-20", "12:00") }],
    );
    assert.equal(result.slots.length, 0);
  });

  it("excludes staff who cannot perform every selected service", () => {
    const result = computeAvailability(
      {
        serviceIds: ["haircut", "beard"],
        staffId: "s2",
        date: "2026-08-20",
        now,
        durationsMin: { haircut: 40, beard: 25 },
      },
      thursdayHours,
      staff,
      [],
    );
    assert.equal(result.slots.length, 0);
  });

  it("resolves no-preference to a capable staff member", () => {
    const result = computeAvailability(
      {
        serviceIds: ["beard"],
        date: "2026-08-20",
        now,
        durationsMin: { beard: 25 },
      },
      thursdayHours,
      staff,
      [],
    );
    assert.ok(result.slots.length > 0);
    assert.ok(result.slots.every((slot) => slot.staffId === "s1"));
  });

  it("returns no slots when everyone is busy", () => {
    const start = jerusalemLocalToUtc("2026-08-20", "09:00");
    const end = jerusalemLocalToUtc("2026-08-20", "12:00");
    const result = computeAvailability(
      {
        serviceIds: ["haircut"],
        date: "2026-08-20",
        now,
        durationsMin: { haircut: 40 },
      },
      thursdayHours,
      staff,
      [
        { staffId: "s1", startsAt: start, endsAt: end },
        { staffId: "s2", startsAt: start, endsAt: end },
      ],
    );
    assert.equal(result.slots.length, 0);
  });
});
