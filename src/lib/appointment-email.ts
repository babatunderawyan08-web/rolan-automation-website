import nodemailer from "nodemailer";
import { SITE } from "@/lib/constants";
import type {
  AppointmentDetails,
  AppointmentFormData,
} from "@/lib/appointment-schema";
import { getVisitorIp } from "@/lib/consultation-email";

export { getVisitorIp };

const EMAIL_TO = "contact@rolanautomation.com";
const INTERNAL_SUBJECT = "📅 New Appointment Booking - ROLAN AUTOMATION";
const CONFIRMATION_SUBJECT = "Your appointment is confirmed — ROLAN AUTOMATION";

const BRAND = {
  navy: "#0f172a",
  blue: "#2563eb",
  cyan: "#06b6d4",
  muted: "#64748b",
  border: "#e2e8f0",
  bg: "#f8fafc",
  white: "#ffffff",
} as const;

export type AppointmentEmailMeta = {
  submittedAt: string;
  visitorIp: string | null;
};

export type AppointmentEmailResult = {
  ok: boolean;
  internal: boolean;
  confirmation: boolean;
  error?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function logoUrl(): string {
  return process.env.EMAIL_LOGO_URL || `${SITE.url}/logo.svg`;
}

function siteUrl(path = "/"): string {
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function detailRows(
  rows: { label: string; value: string; multiline?: boolean }[]
): string {
  return rows
    .map(({ label, value, multiline }) => {
      const rendered = multiline
        ? escapeHtml(value).replaceAll("\n", "<br />")
        : escapeHtml(value);
      return `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid ${BRAND.border};width:38%;vertical-align:top;color:${BRAND.muted};font-size:13px;font-weight:600;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:14px 0 14px 12px;border-bottom:1px solid ${BRAND.border};vertical-align:top;color:${BRAND.navy};font-size:15px;line-height:1.55;">
          ${rendered}
        </td>
      </tr>`;
    })
    .join("");
}

function ctaButton(href: string, label: string): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
      <tr>
        <td align="center" style="border-radius:10px;background:linear-gradient(135deg, ${BRAND.blue} 0%, ${BRAND.cyan} 100%);">
          <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 28px;color:${BRAND.white};font-size:15px;font-weight:700;text-decoration:none;border-radius:10px;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

function emailShell(options: {
  preheader: string;
  title: string;
  eyebrow: string;
  bodyHtml: string;
  footerNote: string;
}): string {
  const logo = logoUrl();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(options.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.navy};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND.bg};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:600px;max-width:600px;background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${BRAND.navy};padding:32px 36px;">
              <img src="${escapeHtml(logo)}" width="48" height="48" alt="${escapeHtml(SITE.name)}" style="display:block;border:0;border-radius:12px;" />
              <p style="margin:18px 0 0;color:${BRAND.cyan};font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">${escapeHtml(options.eyebrow)}</p>
              <h1 style="margin:10px 0 0;color:${BRAND.white};font-size:24px;line-height:1.3;font-weight:700;">${escapeHtml(options.title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 36px;">${options.bodyHtml}</td>
          </tr>
          <tr>
            <td style="padding:24px 36px 28px;background:${BRAND.bg};">
              <p style="margin:0 0 8px;color:${BRAND.navy};font-size:13px;font-weight:700;">${escapeHtml(SITE.name)}</p>
              <p style="margin:0;color:${BRAND.muted};font-size:11px;line-height:1.6;">${escapeHtml(options.footerNote)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function appointmentFields(
  data: AppointmentFormData,
  appointment: AppointmentDetails
): { label: string; value: string; multiline?: boolean }[] {
  const typeLabel =
    data.consultationType === "video"
      ? "Video Call (Google Meet)"
      : "Audio Call";

  const rows: { label: string; value: string; multiline?: boolean }[] = [
    { label: "Full Name", value: data.name.trim() },
    { label: "Email", value: data.email.trim() },
    { label: "Phone", value: data.phone?.trim() || "Not provided" },
    { label: "Company", value: data.company?.trim() || "Not provided" },
    { label: "Type", value: typeLabel },
    { label: "Duration", value: `${data.duration} minutes` },
    { label: "Date", value: appointment.formattedDate },
    {
      label: "Time",
      value: `${appointment.formattedTime} (${appointment.timeZone})`,
    },
  ];

  if (appointment.meetLink) {
    rows.push({ label: "Meeting Link", value: appointment.meetLink });
  }

  if (data.notes?.trim()) {
    rows.push({ label: "Notes", value: data.notes.trim(), multiline: true });
  }

  return rows;
}

function buildInternalHtml(
  data: AppointmentFormData,
  appointment: AppointmentDetails
): string {
  const meetCta = appointment.meetLink
    ? ctaButton(appointment.meetLink, "Join Google Meet")
    : "";

  return emailShell({
    preheader: `New appointment — ${appointment.formattedDate}`,
    title: "New Appointment Booking",
    eyebrow: SITE.name,
    bodyHtml: `
      <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.6;">
        A new appointment was booked on the website.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
        ${detailRows(appointmentFields(data, appointment))}
      </table>
      ${meetCta}
      <p style="margin:20px 0 0;text-align:center;">
        <a href="${escapeHtml(siteUrl("/book-appointment"))}" style="color:${BRAND.blue};font-size:13px;text-decoration:none;font-weight:600;">View booking page</a>
      </p>
    `,
    footerNote: "Internal notification from the ROLAN AUTOMATION appointment form.",
  });
}

function buildConfirmationHtml(
  data: AppointmentFormData,
  appointment: AppointmentDetails
): string {
  const firstName = data.name.trim().split(/\s+/)[0] || "there";
  const meetBlock = appointment.meetLink
    ? `
      <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.65;">
        Join your video call with the Google Meet link below. A calendar invite (.ics) is attached.
      </p>
      ${ctaButton(appointment.meetLink, "Join Google Meet")}
    `
    : `
      <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.65;">
        This is an audio call. Our team will contact you at the scheduled time. A calendar invite (.ics) is attached.
      </p>
    `;

  return emailShell({
    preheader: `Confirmed for ${appointment.formattedDate}`,
    title: "Appointment Confirmed",
    eyebrow: "You're booked",
    bodyHtml: `
      <p style="margin:0 0 16px;color:${BRAND.navy};font-size:16px;">Hi ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.65;">
        Your appointment with <strong style="color:${BRAND.navy};">${escapeHtml(SITE.name)}</strong> is confirmed.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 12px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:12px;">
        <tr>
          <td style="padding:18px 20px;">
            <p style="margin:0 0 6px;color:${BRAND.cyan};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Confirmed appointment</p>
            <p style="margin:0;color:${BRAND.navy};font-size:15px;font-weight:700;">${escapeHtml(appointment.formattedDate)}</p>
            <p style="margin:6px 0 0;color:${BRAND.muted};font-size:14px;">${escapeHtml(`${appointment.formattedTime} (${appointment.timeZone})`)} · ${appointment.duration} min</p>
          </td>
        </tr>
      </table>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
        ${detailRows(appointmentFields(data, appointment))}
      </table>
      ${meetBlock}
    `,
    footerNote: "You received this email because you booked an appointment on our website.",
  });
}

function buildInternalText(
  data: AppointmentFormData,
  appointment: AppointmentDetails
): string {
  return [
    `${SITE.name} — New Appointment`,
    "",
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone?.trim() || "Not provided"}`,
    `Company: ${data.company?.trim() || "Not provided"}`,
    `Type: ${data.consultationType}`,
    `Duration: ${data.duration} minutes`,
    `Date: ${appointment.formattedDate}`,
    `Time: ${appointment.formattedTime} (${appointment.timeZone})`,
    `Meet: ${appointment.meetLink || "N/A"}`,
    `Notes: ${data.notes?.trim() || "None"}`,
  ].join("\n");
}

function buildConfirmationText(
  data: AppointmentFormData,
  appointment: AppointmentDetails
): string {
  const firstName = data.name.trim().split(/\s+/)[0] || "there";
  return [
    `Hi ${firstName},`,
    "",
    `Your appointment with ${SITE.name} is confirmed.`,
    "",
    `Date: ${appointment.formattedDate}`,
    `Time: ${appointment.formattedTime} (${appointment.timeZone})`,
    `Type: ${data.consultationType === "video" ? "Video (Google Meet)" : "Audio"}`,
    `Duration: ${data.duration} minutes`,
    appointment.meetLink
      ? `Meet link: ${appointment.meetLink}`
      : "Audio call — we will contact you.",
    "",
    "A calendar invite (.ics) is attached.",
    "",
    SITE.name,
  ].join("\n");
}

function envTrim(name: string): string {
  const raw = process.env[name];
  if (raw == null) return "";
  return raw.trim().replace(/^['"]|['"]$/g, "");
}

function getSmtpConfig() {
  const host = envTrim("SMTP_HOST");
  const portRaw = envTrim("SMTP_PORT");
  const user = envTrim("SMTP_USER");
  const pass = envTrim("SMTP_PASS");
  const from = envTrim("SMTP_FROM") || user;
  const port = Number(portRaw || "465");

  const missing = [
    !host ? "SMTP_HOST" : null,
    !user ? "SMTP_USER" : null,
    !pass ? "SMTP_PASS" : null,
    !from ? "SMTP_FROM" : null,
  ].filter(Boolean);

  if (missing.length > 0) {
    return { error: `Missing environment variable: ${missing.join(", ")}` } as const;
  }

  return { host, port, user, pass, from } as const;
}

function resolveBusinessInbox(): string {
  return (
    envTrim("CONTACT_EMAIL") ||
    envTrim("CONSULTATION_EMAIL_TO") ||
    envTrim("SMTP_FROM") ||
    envTrim("SMTP_USER") ||
    EMAIL_TO
  );
}

function formatSmtpError(error: unknown): string {
  if (error instanceof Error) return error.message || String(error);
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

export async function sendAppointmentEmail(
  data: AppointmentFormData,
  meta: AppointmentEmailMeta,
  appointment: AppointmentDetails,
  icsContent: string
): Promise<AppointmentEmailResult> {
  const config = getSmtpConfig();
  if ("error" in config) {
    return {
      ok: false,
      internal: false,
      confirmation: false,
      error: config.error,
    };
  }

  const toInternal = resolveBusinessInbox();
  const attachments = [
    {
      filename: "appointment.ics",
      content: icsContent,
      contentType: "text/calendar; charset=utf-8; method=REQUEST",
    },
  ];

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 30_000,
    });

    await transporter.verify();

    const fromHeader = `"${SITE.name}" <${config.from}>`;
    const dateLabel = appointment.formattedDate;

    const [internalResult, confirmationResult] = await Promise.allSettled([
      transporter.sendMail({
        from: fromHeader,
        to: toInternal,
        replyTo: data.email.trim(),
        subject: `${INTERNAL_SUBJECT} — ${dateLabel}`,
        html: buildInternalHtml(data, appointment),
        text: buildInternalText(data, appointment),
        attachments,
      }),
      transporter.sendMail({
        from: fromHeader,
        to: data.email.trim(),
        replyTo: toInternal,
        subject: `${CONFIRMATION_SUBJECT} — ${dateLabel}`,
        html: buildConfirmationHtml(data, appointment),
        text: buildConfirmationText(data, appointment),
        attachments,
      }),
    ]);

    const internal = internalResult.status === "fulfilled";
    const confirmation = confirmationResult.status === "fulfilled";
    let error: string | undefined;

    if (internalResult.status === "rejected") {
      error = formatSmtpError(internalResult.reason);
    }
    if (confirmationResult.status === "rejected") {
      const detail = formatSmtpError(confirmationResult.reason);
      error = error ? `${error}; Confirmation: ${detail}` : detail;
    }

    return {
      ok: internal || confirmation,
      internal,
      confirmation,
      ...(error ? { error } : {}),
    };
  } catch (error) {
    return {
      ok: false,
      internal: false,
      confirmation: false,
      error: formatSmtpError(error),
    };
  }
}
