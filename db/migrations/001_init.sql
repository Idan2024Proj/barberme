-- Barberme initial schema (Supabase PostgreSQL).
-- weekday: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday,
--          4 = Thursday, 5 = Friday, 6 = Saturday (Israel).
-- All timestamptz values are stored in UTC.

CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_e164 text NOT NULL UNIQUE,
  name text,
  marketing_consent boolean NOT NULL DEFAULT false,
  consent_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_visit_at timestamptz
);

CREATE TABLE services (
  id text PRIMARY KEY,
  name_he text NOT NULL,
  description_he text,
  duration_min integer NOT NULL CHECK (duration_min > 0),
  buffer_min integer NOT NULL DEFAULT 0 CHECK (buffer_min >= 0),
  price numeric NOT NULL CHECK (price >= 0),
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE staff (
  id text PRIMARY KEY,
  name_he text NOT NULL,
  role_he text,
  photo_url text,
  instagram text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE staff_services (
  staff_id text NOT NULL REFERENCES staff (id) ON DELETE CASCADE,
  service_id text NOT NULL REFERENCES services (id) ON DELETE CASCADE,
  PRIMARY KEY (staff_id, service_id)
);

CREATE TABLE working_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id text REFERENCES staff (id) ON DELETE CASCADE,
  weekday smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  opens_at time,
  closes_at time,
  is_closed boolean NOT NULL DEFAULT false
);

CREATE UNIQUE INDEX working_hours_business_weekday_uidx
  ON working_hours (weekday)
  WHERE staff_id IS NULL;

CREATE UNIQUE INDEX working_hours_staff_weekday_uidx
  ON working_hours (staff_id, weekday)
  WHERE staff_id IS NOT NULL;

CREATE TABLE time_off (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id text NOT NULL REFERENCES staff (id) ON DELETE CASCADE,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  reason text,
  CHECK (ends_at > starts_at)
);

CREATE INDEX time_off_staff_range_idx ON time_off (staff_id, starts_at, ends_at);

CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers (id),
  staff_id text NOT NULL REFERENCES staff (id),
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  service_ids text[] NOT NULL,
  total_price numeric NOT NULL CHECK (total_price >= 0),
  status text NOT NULL CHECK (
    status IN ('hold', 'confirmed', 'cancelled', 'completed', 'no_show', 'expired')
  ),
  hold_expires_at timestamptz,
  manage_token text NOT NULL UNIQUE,
  source text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at > starts_at),
  CHECK (
    (status = 'hold' AND hold_expires_at IS NOT NULL)
    OR (status <> 'hold')
  )
);

CREATE UNIQUE INDEX appointments_staff_starts_active_uidx
  ON appointments (staff_id, starts_at)
  WHERE status IN ('hold', 'confirmed');

CREATE INDEX appointments_staff_range_idx
  ON appointments (staff_id, starts_at, ends_at);

CREATE TABLE otp_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_e164 text NOT NULL,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  attempts integer NOT NULL DEFAULT 0,
  consumed_at timestamptz,
  ip text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX otp_requests_phone_created_idx
  ON otp_requests (phone_e164, created_at);

CREATE TABLE site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  json jsonb NOT NULL,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by text
);
