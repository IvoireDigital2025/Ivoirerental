import { Router } from "express";
import { Pool } from "pg";

const router = Router();

function getPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL });
}

function buildMessage(d: Record<string, string>) {
  return [
    `Full Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Address: ${d.address}`,
    `Start Date: ${d.startDate}`,
    `Duration: ${d.duration}`,
    `Valid Driver's License: ${d.hasLicense}`,
    d.licenseNumber ? `License Number: ${d.licenseNumber}` : "",
    `Platforms: ${d.platforms}`,
    d.notes ? `Notes: ${d.notes}` : "",
  ].filter(Boolean).join("\n");
}

async function sendViaWeb3Forms(d: Record<string, string>, log: any) {
  const key = process.env["WEB3FORMS_KEY"];
  if (!key) { log.warn("WEB3FORMS_KEY not set — skipping email"); return; }

  const payload = {
    access_key: key,
    subject: `New Driver Application — ${d.name}`,
    from_name: "Ivoire Rental Website",
    message: buildMessage(d),
    email: d.email,
    replyto: d.email,
  };

  const resp = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });

  const text = await resp.text();
  let result: { success: boolean; message?: string };
  try {
    result = JSON.parse(text) as { success: boolean; message?: string };
  } catch {
    throw new Error(`Web3Forms returned non-JSON (status ${resp.status}): ${text.slice(0, 200)}`);
  }
  if (!result.success) throw new Error(result.message ?? "Web3Forms error");
  log.info({ name: d.name }, "Application email sent via Web3Forms");
}

router.post("/application", async (req, res) => {
  const {
    name, email, phone, address, startDate, duration,
    hasLicense, licenseNumber, platforms, notes,
  } = req.body as Record<string, string>;

  if (!name || !email || !phone || !address || !startDate || !duration || !hasLicense) {
    res.status(400).json({ error: "Missing required fields." }); return;
  }

  // 1. Save to database
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

  // 2. Send email via Web3Forms (best-effort)
  try {
    await sendViaWeb3Forms(
      { name, email, phone, address, startDate, duration, hasLicense, licenseNumber: licenseNumber || "", platforms: platforms || "", notes: notes || "" },
      req.log
    );
  } catch (err: any) {
    req.log.warn({ err }, "Web3Forms email failed (application still saved)");
  }

  res.json({ ok: true });
});

export default router;
