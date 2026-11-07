import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { getDatabaseUrl, getPool, withTransaction } from "../lib/db";
import { insertHold } from "../lib/holds";
import { jerusalemLocalToUtc } from "../lib/time";

const hasDb = Boolean(getDatabaseUrl());

describe("appointment uniqueness (requires DATABASE_URL)", { skip: !hasDb }, () => {
  after(async () => {
    if (!getDatabaseUrl()) {
      return;
    }
    const pool = getPool();
    await pool.query("DELETE FROM appointments WHERE source = 'test'");
    await pool.end();
  });

  it("rejects a duplicate confirmed slot", async () => {
    const pool = getPool();
    const startsAt = jerusalemLocalToUtc("2026-08-20", "13:00");
    const endsAt = new Date(startsAt.getTime() + 40 * 60_000);

    await pool.query("DELETE FROM appointments WHERE staff_id = 's1' AND starts_at = $1", [startsAt]);

    await withTransaction(async (client) => {
      await client.query(
        `
        INSERT INTO appointments (staff_id, starts_at, ends_at, service_ids, total_price, status, manage_token, source)
        VALUES ('s1', $1, $2, ARRAY['haircut'], 90, 'confirmed', gen_random_uuid()::text, 'test')
        `,
        [startsAt, endsAt],
      );
    });

    await assert.rejects(
      () =>
        withTransaction(async (client) => {
          await client.query(
            `
            INSERT INTO appointments (staff_id, starts_at, ends_at, service_ids, total_price, status, manage_token, source)
            VALUES ('s1', $1, $2, ARRAY['haircut'], 90, 'confirmed', gen_random_uuid()::text, 'test')
            `,
            [startsAt, endsAt],
          );
        }),
      /duplicate key|unique/i,
    );
  });

  it("rejects a confirmed appointment that collides with an active hold", async () => {
    const pool = getPool();
    const startsAt = jerusalemLocalToUtc("2026-08-20", "13:15");
    const endsAt = new Date(startsAt.getTime() + 40 * 60_000);
    await pool.query("DELETE FROM appointments WHERE staff_id = 's1' AND starts_at = $1", [startsAt]);

    await withTransaction(async (client) => {
      await insertHold(client, {
        staffId: "s1",
        startsAt,
        endsAt,
        serviceIds: ["haircut"],
        totalPrice: 90,
      });
    });

    await assert.rejects(
      () =>
        withTransaction(async (client) => {
          await client.query(
            `
            INSERT INTO appointments (staff_id, starts_at, ends_at, service_ids, total_price, status, manage_token, source)
            VALUES ('s1', $1, $2, ARRAY['haircut'], 90, 'confirmed', gen_random_uuid()::text, 'test')
            `,
            [startsAt, endsAt],
          );
        }),
      /duplicate key|unique/i,
    );
  });

  it("allows replacing an expired hold after transactional cleanup", async () => {
    const pool = getPool();
    const startsAt = jerusalemLocalToUtc("2026-08-20", "13:30");
    const endsAt = new Date(startsAt.getTime() + 40 * 60_000);
    await pool.query("DELETE FROM appointments WHERE staff_id = 's1' AND starts_at = $1", [startsAt]);

    await withTransaction(async (client) => {
      await client.query(
        `
        INSERT INTO appointments (
          staff_id, starts_at, ends_at, service_ids, total_price,
          status, hold_expires_at, manage_token, source
        )
        VALUES ('s1', $1, $2, ARRAY['haircut'], 90, 'hold', $3, gen_random_uuid()::text, 'test')
        `,
        [startsAt, endsAt, new Date("2020-01-01T00:00:00.000Z")],
      );
    });

    const inserted = await withTransaction(async (client) =>
      insertHold(client, {
        staffId: "s1",
        startsAt,
        endsAt,
        serviceIds: ["haircut"],
        totalPrice: 90,
      }),
    );
    assert.ok(inserted.id);

    const statuses = await pool.query<{ status: string }>(
      "SELECT status FROM appointments WHERE staff_id = 's1' AND starts_at = $1 ORDER BY created_at",
      [startsAt],
    );
    assert.ok(statuses.rows.some((row) => row.status === "expired"));
    assert.ok(statuses.rows.some((row) => row.status === "hold"));
  });

  it("does not let cancelled appointments block a new hold", async () => {
    const pool = getPool();
    const startsAt = jerusalemLocalToUtc("2026-08-20", "13:45");
    const endsAt = new Date(startsAt.getTime() + 40 * 60_000);
    await pool.query("DELETE FROM appointments WHERE staff_id = 's1' AND starts_at = $1", [startsAt]);

    await pool.query(
      `
      INSERT INTO appointments (staff_id, starts_at, ends_at, service_ids, total_price, status, manage_token, source)
      VALUES ('s1', $1, $2, ARRAY['haircut'], 90, 'cancelled', gen_random_uuid()::text, 'test')
      `,
      [startsAt, endsAt],
    );

    const inserted = await withTransaction(async (client) =>
      insertHold(client, {
        staffId: "s1",
        startsAt,
        endsAt,
        serviceIds: ["haircut"],
        totalPrice: 90,
      }),
    );
    assert.ok(inserted.id);
  });
});
