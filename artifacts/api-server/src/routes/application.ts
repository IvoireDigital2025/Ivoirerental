import { Router } from "express";
import { Pool } from "pg";
import { Resend } from "resend";

const router = Router();

const RECIPIENTS = ["info@ivoirerental.com", "koneyassine49@gmail.com"];

function getPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL });
}

function getResend() {
  const key = process.env["RESEND_API_KEY"];
  if (!key) return null;
  return new Resend(key);
}

function buildHtml(d: Record<string, string>) {
  const row = (label: string, value: string) => value ? `
    <tr>
      <td style="padding:10px 0;color:#D4A843;font-weight:bold;vertical-align:top;width:38%;border-bottom:1px solid #ffffff15;">${label}</td>
      <td style="padding:10px 0;color:#e5e5e5;vertical-align:top;border-bottom:1px solid #ffffff15;">${value}</td>
    </tr>` : '';

  return `
<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;background:#0d0d1a;color:#e5e5e5;border-radius:12px;overflow:hidden;">
  <div style="background:#D4A843;padding:20px 28px;">
    <h2 style="margin:0;color:#0d0d1a;font-size:22px;">New Driver Application</h2>
    <p style="margin:4px 0 0;color:#0d0d1a;opacity:0.7;font-size:14px;">Ivoire Rental — Dallas Fort Worth</p>
  </div>
  <div style="padding:28px;">
    <table style="width:100%;border-collapse:collapse;">
      ${row("Full Name", d.name)}
      ${row("Email", d.email)}
      ${row("Phone", d.phone)}
      ${row("Address", d.address)}
      ${row("Start Date", d.startDate)}
      ${row("Duration", d.duration)}
      ${row("Valid License", d.hasLicense)}
      ${row("License Number", d.licenseNumber)}
      ${row("Platforms", d.platforms)}
      ${row("Notes", d.notes)}
    </table>
  </div>
  <div style="padding:16px 28px;background:#1a1a2e;font-size:12px;color:#888;">
    Submitted via ivoirerental.com · View all applications at /admin
  </div>
</div>`;
}

router.post("/application", async (req, res) => {
  const {
    name, email, phone, address, startDate, duration,
    hasLicense, licenseNumber, platforms, notes,
  } = req.body as Record<string, string>;

  if (!name || !email || !phone || !address || !startDate || !duration || !hasLicense) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // 1. Save to database (always)
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
    return res.status(500).json({ error: "Failed to save application. Please try again." });
  } finally {
    await pool.end();
  }

  // 2. Send email notification (best-effort — DB save already succeeded)
  const resend = getResend();
  if (resend) {
    try {
      await resend.emails.send({
        from: "Ivoire Rental <onboarding@resend.dev>",
        to: RECIPIENTS,
        subject: `New Driver Application — ${name}`,
        html: buildHtml({ name, email, phone, address, startDate, duration, hasLicense, licenseNumber: licenseNumber || "", platforms: platforms || "", notes: notes || "" }),
      });
      req.log.info({ name }, "Application email notification sent");
    } catch (err: any) {
      req.log.warn({ err }, "Email notification failed (application still saved)");
    }
  } else {
    req.log.warn("RESEND_API_KEY not set — skipping email notification");
  }

  return res.json({ ok: true });
});

export default router;
