import { randomUUID } from "node:crypto";
import type { PoolClient } from "pg";
import { bookingConfig } from "@/lib/booking-config";
import { addMinutes } from "@/lib/time";

export async function expireStaleHolds(
  client: PoolClient,
  staffId: string,
  startsAt: Date,
  now = new Date(),
): Promise<void> {
  await client.query(
    `
    UPDATE appointments
    SET status = 'expired'
    WHERE staff_id = $1
      AND starts_at = $2
      AND status = 'hold'
      AND hold_expires_at <= $3
    `,
    [staffId, startsAt, now],
  );
}

export async function insertHold(
  client: PoolClient,
  input: {
    staffId: string;
    startsAt: Date;
    endsAt: Date;
    serviceIds: string[];
    totalPrice: number;
    now?: Date;
  },
) {
  const now = input.now ?? new Date();
  await expireStaleHolds(client, input.staffId, input.startsAt, now);
  const result = await client.query(
    `
    INSERT INTO appointments (
      staff_id, starts_at, ends_at, service_ids, total_price,
      status, hold_expires_at, manage_token, source
    )
    VALUES ($1, $2, $3, $4, $5, 'hold', $6, $7, 'test')
    RETURNING id
    `,
    [
      input.staffId,
      input.startsAt,
      input.endsAt,
      input.serviceIds,
      input.totalPrice,
      addMinutes(now, bookingConfig.holdDurationMinutes),
      randomUUID(),
    ],
  );
  return result.rows[0] as { id: string };
}
