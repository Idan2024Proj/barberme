import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatJerusalemHm, jerusalemLocalToUtc } from "../lib/time";

describe("jerusalem time conversion", () => {
  it("maps winter local time with UTC+2", () => {
    const utc = jerusalemLocalToUtc("2026-01-15", "10:00");
    assert.equal(utc.toISOString(), "2026-01-15T08:00:00.000Z");
    assert.equal(formatJerusalemHm(utc), "10:00");
  });

  it("maps summer local time with UTC+3 (DST)", () => {
    const utc = jerusalemLocalToUtc("2026-07-15", "10:00");
    assert.equal(utc.toISOString(), "2026-07-15T07:00:00.000Z");
    assert.equal(formatJerusalemHm(utc), "10:00");
  });

  it("keeps civil times around the spring DST transition", () => {
    const before = jerusalemLocalToUtc("2026-03-27", "01:30");
    const after = jerusalemLocalToUtc("2026-03-27", "03:30");
    assert.equal(formatJerusalemHm(before), "01:30");
    assert.equal(formatJerusalemHm(after), "03:30");
    assert.ok(after.getTime() > before.getTime());
  });
});
