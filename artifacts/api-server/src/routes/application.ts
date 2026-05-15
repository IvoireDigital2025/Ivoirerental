import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

const RECIPIENTS = ["info@ivoirerental.com", "koneyassine49@gmail.com"];

function buildTransport() {
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS environment variables are required.");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function buildHtml(d: Record<string, string>) {
  const platforms = d.platforms || "None selected";
  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0d1a;color:#e5e5e5;border-radius:12px;overflow:hidden;">
  <div style="background:#D4A843;padding:20px 28px;">
    <h2 style="margin:0;color:#0d0d1a;font-size:22px;">New Driver Application — Ivoire Rental</h2>
  </div>
  <div style="padding:28px;">
    <table style="width:100%;border-collapse:collapse;">
      ${row("Full Name", d.name)}
      ${row("Email", d.email)}
      ${row("Phone", d.phone)}
      ${row("Address", d.address)}
      ${row("Vehicle Needed From", d.startDate)}
      ${row("Rental Duration", d.duration)}
      ${row("Valid Driver's License", d.hasLicense)}
      ${d.licenseNumber ? row("License Number", d.licenseNumber) : ""}
      ${row("Platform(s)", platforms)}
      ${d.notes ? row("Additional Notes", d.notes) : ""}
    </table>
  </div>
  <div style="padding:16px 28px;background:#1a1a2e;font-size:12px;color:#888;">
    Submitted via ivoirerental.com
  </div>
</div>`;
}

function row(label: string, value: string) {
  return `
  <tr>
    <td style="padding:10px 0;color:#D4A843;font-weight:bold;vertical-align:top;width:40%;border-bottom:1px solid #ffffff15;">${label}</td>
    <td style="padding:10px 0;color:#e5e5e5;vertical-align:top;border-bottom:1px solid #ffffff15;">${value || "—"}</td>
  </tr>`;
}

router.post("/application", async (req, res) => {
  const {
    name, email, phone, address, startDate, duration,
    hasLicense, licenseNumber, platforms, notes,
  } = req.body as Record<string, string>;

  if (!name || !email || !phone || !address || !startDate || !duration || !hasLicense) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const subject = `New Driver Application — ${name}`;
  const html = buildHtml({ name, email, phone, address, startDate, duration, hasLicense, licenseNumber, platforms, notes });

  const text = [
    `New Driver Application — Ivoire Rental`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    `Start Date: ${startDate}`,
    `Duration: ${duration}`,
    `Has License: ${hasLicense}`,
    licenseNumber ? `License Number: ${licenseNumber}` : "",
    `Platforms: ${platforms || "None"}`,
    notes ? `Notes: ${notes}` : "",
  ].filter(Boolean).join("\n");

  try {
    const transport = buildTransport();
    await transport.sendMail({
      from: `"Ivoire Rental" <${process.env["SMTP_USER"]}>`,
      to: RECIPIENTS.join(", "),
      subject,
      text,
      html,
    });
    req.log.info({ name, email }, "Application email sent");
    return res.json({ ok: true });
  } catch (err: any) {
    req.log.error({ err }, "Failed to send application email");
    return res.status(500).json({ error: "Failed to send application. Please try again." });
  }
});

export default router;
