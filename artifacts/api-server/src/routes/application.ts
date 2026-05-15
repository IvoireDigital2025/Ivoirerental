import { Router } from "express";
import { Pool } from "pg";

const router = Router();

function getPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL });
}

router.post("/application", async (req, res) => {
  const {
    name, email, phone, address, startDate, duration,
    hasLicense, licenseNumber, platforms, notes,
  } = req.body as Record<string, string>;

  if (!name || !email || !phone || !address || !startDate || !duration || !hasLicense) {
    res.status(400).json({ error: "Missing required fields." }); return;
  }

  const pool = getPool();
  try {
    await pool.query(
      `INSERT INTO applications
        (name, email, phone, address, start_date, duration, has_license, license_number, platforms, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [name, email, phone, address, startDate, duration, hasLicense, licenseNumber || null, platforms || null, notes || null]
    );
    req.log.info({ name, email }, "Application saved to DB");
  } catch (err: any) {
    req.log.error({ err }, "Failed to save application to DB");
    res.status(500).json({ error: "Failed to save application. Please try again." }); return;
  } finally {
    await pool.end();
  }

  res.json({ ok: true });
});

export default router;
