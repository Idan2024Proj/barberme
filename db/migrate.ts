import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { getPool } from "../lib/db";

async function migrate() {
  const dir = path.join(process.cwd(), "db", "migrations");
  const files = (await readdir(dir)).filter((file) => file.endsWith(".sql")).sort();
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  for (const file of files) {
    const applied = await pool.query("SELECT 1 FROM schema_migrations WHERE id = $1", [file]);
    if (applied.rowCount) {
      continue;
    }
    const sql = await readFile(path.join(dir, file), "utf8");
    await pool.query("BEGIN");
    try {
      await pool.query(sql);
      await pool.query("INSERT INTO schema_migrations (id) VALUES ($1)", [file]);
      await pool.query("COMMIT");
      process.stdout.write(`applied ${file}\n`);
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }

  await pool.end();
}

migrate().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
