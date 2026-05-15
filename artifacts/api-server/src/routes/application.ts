import { Router } from "express";
import { Pool } from "pg";
import nodemailer from "nodemailer";

const router = Router();

function getPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL });
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendNotificationEmail(data: {
  name: string; email: string; phone: string; address: string;
  startDate: string; duration: string; hasLicense: string;
  licenseNumber: string; platforms: string; notes: string;
}) {
  const to = process.env.SMTP_USER;
  if (!to) return;

  const transporter = getTransporter();
  const platformList = data.platforms
    ? data.platforms.split(",").map(p => `• ${p.trim()}`).join("\n")
    : "—";

  await transporter.sendMail({
    from: `"Ivoire Rental" <${to}>`,
    to,
    subject: `New Driver Application — ${data.name}`,
    text: `
A new driver application has been submitted on Ivoire Rental.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:     ${data.name}
Email:    ${data.email}
Phone:    ${data.phone}
Address:  ${data.address}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RENTAL DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start Date: ${data.startDate}
Duration:   ${data.duration}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DRIVER'S LICENSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Valid License:  ${data.hasLicense}
License Number: ${data.licenseNumber || "—"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLATFORMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${platformList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.notes || "None"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
View all applications in your admin panel at /admin
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#080810;padding:28px 32px;text-align:center;">
      <h1 style="margin:0;color:#D4A843;font-size:22px;letter-spacing:1px;">IVOIRE RENTAL</h1>
      <p style="margin:6px 0 0;color:#888;font-size:13px;">New Driver Application Received</p>
    </div>
    <div style="padding:32px;">
      <h2 style="margin:0 0 4px;color:#111;font-size:20px;">${data.name}</h2>
      <p style="margin:0 0 24px;color:#666;font-size:14px;">${data.email} &nbsp;·&nbsp; ${data.phone}</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td colspan="2" style="padding:10px 0 6px;font-weight:bold;color:#D4A843;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #eee;">Personal Information</td></tr>
        <tr><td style="padding:8px 0;color:#888;width:140px;">Address</td><td style="padding:8px 0;color:#333;">${data.address || "—"}</td></tr>

        <tr><td colspan="2" style="padding:16px 0 6px;font-weight:bold;color:#D4A843;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #eee;">Rental Details</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Start Date</td><td style="padding:8px 0;color:#333;">${data.startDate}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Duration</td><td style="padding:8px 0;color:#333;">${data.duration}</td></tr>

        <tr><td colspan="2" style="padding:16px 0 6px;font-weight:bold;color:#D4A843;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #eee;">Driver's License</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Valid License</td><td style="padding:8px 0;color:${data.hasLicense === "Yes" ? "#22c55e" : "#ef4444"};font-weight:bold;">${data.hasLicense === "Yes" ? "✓ Yes" : "✗ No"}</td></tr>
        ${data.licenseNumber ? `<tr><td style="padding:8px 0;color:#888;">License #</td><td style="padding:8px 0;color:#333;">${data.licenseNumber}</td></tr>` : ""}

        <tr><td colspan="2" style="padding:16px 0 6px;font-weight:bold;color:#D4A843;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #eee;">Platforms</td></tr>
        <tr><td colspan="2" style="padding:8px 0;color:#333;">${data.platforms || "—"}</td></tr>

        ${data.notes ? `
        <tr><td colspan="2" style="padding:16px 0 6px;font-weight:bold;color:#D4A843;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #eee;">Notes</td></tr>
        <tr><td colspan="2" style="padding:8px 0;color:#333;">${data.notes}</td></tr>
        ` : ""}
      </table>

      <div style="margin-top:28px;padding:16px;background:#f9f9f9;border-radius:8px;text-align:center;">
        <p style="margin:0;font-size:13px;color:#666;">View and manage all applications in your <strong>admin panel</strong></p>
      </div>
    </div>
    <div style="background:#080810;padding:16px 32px;text-align:center;">
      <p style="margin:0;color:#555;font-size:12px;">Ivoire Rental · Dallas–Fort Worth</p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  });
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

  sendNotificationEmail({ name, email, phone, address, startDate, duration, hasLicense, licenseNumber: licenseNumber || "", platforms: platforms || "", notes: notes || "" })
    .then(() => req.log.info({ name }, "Notification email sent"))
    .catch(err => req.log.warn({ err }, "Failed to send notification email"));

  res.json({ ok: true });
});

export default router;
