/**
 * TEMPORARY DEVELOPMENT SEED
 *
 * Current staff names, prices, schedules and other business values may still
 * be placeholder data — not verified production truth.
 *
 * staff_services: every active staff member can perform every *active* service.
 * Replace this mapping when real barber ↔ service capabilities are provided.
 * Do not change the availability engine when replacing this seed.
 */
import { t } from "../lib/content";
import { bookingConfig } from "../lib/booking-config";
import { getPool } from "../lib/db";

async function seed() {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const [index, item] of t.services.items.entries()) {
      await client.query(
        `
        INSERT INTO services (id, name_he, description_he, duration_min, buffer_min, price, sort_order, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          name_he = EXCLUDED.name_he,
          description_he = EXCLUDED.description_he,
          duration_min = EXCLUDED.duration_min,
          buffer_min = EXCLUDED.buffer_min,
          price = EXCLUDED.price,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active
        `,
        [
          item.id,
          item.name,
          item.description,
          item.duration,
          bookingConfig.bufferMinDefault,
          item.price,
          index,
          item.active,
        ],
      );
    }

    for (const [index, member] of t.team.members.entries()) {
      await client.query(
        `
        INSERT INTO staff (id, name_he, role_he, instagram, sort_order, is_active)
        VALUES ($1, $2, $3, $4, $5, true)
        ON CONFLICT (id) DO UPDATE SET
          name_he = EXCLUDED.name_he,
          role_he = EXCLUDED.role_he,
          instagram = EXCLUDED.instagram,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active
        `,
        [member.id, member.name, member.role, member.instagram || null, index],
      );
    }

    await client.query("DELETE FROM staff_services");
    await client.query(
      `
      INSERT INTO staff_services (staff_id, service_id)
      SELECT s.id, svc.id
      FROM staff s
      CROSS JOIN services svc
      WHERE s.is_active = true AND svc.is_active = true
      `,
    );

    await client.query("DELETE FROM working_hours WHERE staff_id IS NULL");
    for (const [weekday, row] of t.shop.hours.entries()) {
      await client.query(
        `
        INSERT INTO working_hours (staff_id, weekday, opens_at, closes_at, is_closed)
        VALUES (NULL, $1, $2, $3, $4)
        `,
        [
          weekday,
          row.closed || !row.open ? null : row.open,
          row.closed || !row.close ? null : row.close,
          row.closed,
        ],
      );
    }

    await client.query("COMMIT");
    process.stdout.write("TEMPORARY DEVELOPMENT SEED applied\n");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
