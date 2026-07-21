import nodemailer from "nodemailer";
import { SITE } from "@/lib/constants";
import type { BookingDetails, ConsultationFormData } from "@/lib/consultation-schema";

const EMAIL_TO = "contact@rolanautomation.com";
const INTERNAL_SUBJECT = "📅 New Consultation Booking - ROLAN AUTOMATION";
const CONFIRMATION_SUBJECT = "Your consultation is confirmed — ROLAN AUTOMATION";

/** Brand tokens aligned with globals.css */
const BRAND = {
  navy: "#0f172a",
  blue: "#2563eb",
  cyan: "#06b6d4",
  muted: "#64748b",
  border: "#e2e8f0",
  bg: "#f8fafc",
  white: "#ffffff",
  success: "#10b981",
} as const;

export type ConsultationEmailMeta = {
  submittedAt: string;
  visitorIp: string | null;
};

export type ConsultationEmailResult = {
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

function formatSubmittedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return (
    date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }) + " UTC"
  );
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
        <td class="label" style="padding:14px 0;border-bottom:1px solid ${BRAND.border};width:38%;vertical-align:top;color:${BRAND.muted};font-size:13px;font-weight:600;letter-spacing:0.02em;">
          ${escapeHtml(label)}
        </td>
        <td class="value" style="padding:14px 0 14px 12px;border-bottom:1px solid ${BRAND.border};vertical-align:top;color:${BRAND.navy};font-size:15px;line-height:1.55;">
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
          <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 28px;color:${BRAND.white};font-size:15px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.01em;">
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
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(options.title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .email-pad { padding-left: 20px !important; padding-right: 20px !important; }
      .hero-pad { padding: 28px 20px !important; }
      .label, .value { display: block !important; width: 100% !important; padding-left: 0 !important; }
      .value { padding-top: 4px !important; padding-bottom: 14px !important; }
      .stack { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.navy};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(options.preheader)}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND.bg};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="email-container" width="600" cellspacing="0" cellpadding="0" style="width:600px;max-width:600px;background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td class="hero-pad" style="background:${BRAND.navy};padding:32px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img src="${escapeHtml(logo)}" width="48" height="48" alt="${escapeHtml(SITE.name)}" style="display:block;border:0;border-radius:12px;width:48px;height:48px;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;">
                    <p style="margin:0;color:${BRAND.cyan};font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
                      ${escapeHtml(options.eyebrow)}
                    </p>
                    <h1 style="margin:10px 0 0;color:${BRAND.white};font-size:24px;line-height:1.3;font-weight:700;">
                      ${escapeHtml(options.title)}
                    </h1>
                    <div style="margin-top:16px;height:3px;width:72px;border-radius:999px;background:linear-gradient(90deg, ${BRAND.blue}, ${BRAND.cyan});"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:32px 36px;">
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:linear-gradient(90deg, ${BRAND.blue}, ${BRAND.cyan});font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:24px 36px 28px;background:${BRAND.bg};">
              <p style="margin:0 0 8px;color:${BRAND.navy};font-size:13px;font-weight:700;">
                ${escapeHtml(SITE.name)}
              </p>
              <p style="margin:0 0 12px;color:${BRAND.muted};font-size:12px;line-height:1.6;">
                ${escapeHtml(SITE.tagline)} ·
                <a href="${escapeHtml(siteUrl())}" style="color:${BRAND.blue};text-decoration:none;">${escapeHtml(SITE.url.replace(/^https?:\/\//, ""))}</a>
              </p>
              <p style="margin:0;color:${BRAND.muted};font-size:11px;line-height:1.6;">
                ${escapeHtml(options.footerNote)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function consultationFields(
  data: ConsultationFormData,
  meta: ConsultationEmailMeta,
  includeMeta: boolean,
  booking?: BookingDetails
): { label: string; value: string; multiline?: boolean }[] {
  const typeLabel =
    data.consultationType === "video" ? "Video Consultation (Google Meet)" : "Audio Consultation";

  const rows: { label: string; value: string; multiline?: boolean }[] = [
    { label: "Full Name", value: data.name.trim() },
    { label: "Email Address", value: data.email.trim() },
    { label: "Phone Number", value: data.phone?.trim() || "Not provided" },
    { label: "Company Name", value: data.company?.trim() || "Not provided" },
    { label: "Requested Service", value: data.service },
    { label: "Consultation Type", value: typeLabel },
    { label: "Duration", value: `${data.duration} minutes` },
  ];

  if (booking) {
    rows.push(
      { label: "Meeting Date", value: booking.formattedDate },
      { label: "Meeting Time", value: `${booking.formattedTime} (${booking.timeZone})` }
    );
    if (booking.meetLink) {
      rows.push({ label: "Meeting Link", value: booking.meetLink });
    }
  } else {
    rows.push(
      { label: "Requested Date", value: data.date },
      { label: "Requested Time", value: `${data.time} (${data.timeZone})` }
    );
  }

  rows.push({ label: "Project Details", value: data.message.trim(), multiline: true });

  if (includeMeta) {
    rows.push(
      { label: "Submission Date & Time", value: formatSubmittedAt(meta.submittedAt) },
      { label: "Visitor IP", value: meta.visitorIp || "Not available" }
    );
  }

  return rows;
}

export function buildInternalEmailHtml(
  data: ConsultationFormData,
  meta: ConsultationEmailMeta,
  booking?: BookingDetails
): string {
  const meetCta =
    booking?.meetLink
      ? ctaButton(booking.meetLink, "Join Google Meet")
      : ctaButton(
          `mailto:${encodeURIComponent(data.email.trim())}?subject=${encodeURIComponent(`Re: Your consultation — ${SITE.name}`)}`,
          "Reply to Client"
        );

  const bodyHtml = `
    <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.6;">
      A new consultation booking was submitted on the website. Review the details below and join on time.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
      ${detailRows(consultationFields(data, meta, true, booking))}
    </table>
    ${meetCta}
    <p style="margin:20px 0 0;text-align:center;">
      <a href="${escapeHtml(siteUrl("/book-consultation"))}" style="color:${BRAND.blue};font-size:13px;text-decoration:none;font-weight:600;">View booking page</a>
    </p>
  `;

  return emailShell({
    preheader: `New booking from ${data.name.trim()} — ${booking?.formattedDate || data.date}`,
    title: "New Consultation Booking",
    eyebrow: SITE.name,
    bodyHtml,
    footerNote: "Internal notification from the ROLAN AUTOMATION booking form.",
  });
}

export function buildConfirmationEmailHtml(
  data: ConsultationFormData,
  booking?: BookingDetails
): string {
  const firstName = data.name.trim().split(/\s+/)[0] || "there";
  const meetBlock = booking?.meetLink
    ? `
    <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.65;">
      Join your video consultation using the Google Meet link below. A calendar invite (.ics) is also attached.
    </p>
    ${ctaButton(booking.meetLink, "Join Google Meet")}
    `
    : `
    <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.65;">
      This is an audio consultation. Our team will contact you at the scheduled time. A calendar invite (.ics) is attached.
    </p>
    `;

  const bodyHtml = `
    <p style="margin:0 0 16px;color:${BRAND.navy};font-size:16px;line-height:1.6;">
      Hi ${escapeHtml(firstName)},
    </p>
    <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.65;">
      Your consultation with <strong style="color:${BRAND.navy};">${escapeHtml(SITE.name)}</strong> is confirmed.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 12px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:12px;">
      <tr>
        <td style="padding:18px 20px;">
          <p style="margin:0 0 6px;color:${BRAND.cyan};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Confirmed appointment</p>
          <p style="margin:0;color:${BRAND.navy};font-size:15px;font-weight:700;">${escapeHtml(booking?.formattedDate || data.date)}</p>
          <p style="margin:6px 0 0;color:${BRAND.muted};font-size:14px;">${escapeHtml(booking ? `${booking.formattedTime} (${booking.timeZone})` : `${data.time} (${data.timeZone})`)} · ${data.duration} min</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
      ${detailRows(consultationFields(data, { submittedAt: "", visitorIp: null }, false, booking))}
    </table>
    ${meetBlock}
    <p style="margin:24px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.65;text-align:center;">
      Questions? Email
      <a href="mailto:contact@rolanautomation.com" style="color:${BRAND.blue};text-decoration:none;font-weight:600;">contact@rolanautomation.com</a>
    </p>
  `;

  return emailShell({
    preheader: `Your consultation is confirmed for ${booking?.formattedDate || data.date}`,
    title: "Consultation Confirmed",
    eyebrow: "You're booked",
    bodyHtml,
    footerNote: "You received this email because you booked a consultation on our website.",
  });
}

export function buildInternalEmailText(
  data: ConsultationFormData,
  meta: ConsultationEmailMeta,
  booking?: BookingDetails
): string {
  return [
    `${SITE.name} — New Consultation Booking`,
    "",
    `Full Name: ${data.name.trim()}`,
    `Email Address: ${data.email.trim()}`,
    `Phone Number: ${data.phone?.trim() || "Not provided"}`,
    `Company Name: ${data.company?.trim() || "Not provided"}`,
    `Requested Service: ${data.service}`,
    `Consultation Type: ${data.consultationType}`,
    `Duration: ${data.duration} minutes`,
    `Date: ${booking?.formattedDate || data.date}`,
    `Time: ${booking ? `${booking.formattedTime} (${booking.timeZone})` : `${data.time} (${data.timeZone})`}`,
    `Meet Link: ${booking?.meetLink || "N/A"}`,
    "",
    "Project Details:",
    data.message.trim(),
    "",
    `Submission Date & Time: ${formatSubmittedAt(meta.submittedAt)}`,
    `Visitor IP: ${meta.visitorIp || "Not available"}`,
    "",
    `Reply to client: ${data.email.trim()}`,
    `Website: ${SITE.url}`,
  ].join("\n");
}

export function buildConfirmationEmailText(
  data: ConsultationFormData,
  booking?: BookingDetails
): string {
  const firstName = data.name.trim().split(/\s+/)[0] || "there";
  return [
    `Hi ${firstName},`,
    "",
    `Your consultation with ${SITE.name} is confirmed.`,
    "",
    `Date: ${booking?.formattedDate || data.date}`,
    `Time: ${booking ? `${booking.formattedTime} (${booking.timeZone})` : `${data.time} (${data.timeZone})`}`,
    `Type: ${data.consultationType === "video" ? "Video (Google Meet)" : "Audio"}`,
    `Duration: ${data.duration} minutes`,
    `Service: ${data.service}`,
    booking?.meetLink ? `Meet link: ${booking.meetLink}` : "Audio consultation — we will contact you.",
    "",
    "A calendar invite (.ics) is attached to this email.",
    "",
    SITE.name,
    SITE.url,
  ].join("\n");
}

function formatSmtpError(error: unknown): string {
  if (error instanceof Error) {
    const withCode = error as Error & {
      code?: string;
      command?: string;
      response?: string;
      responseCode?: number;
    };
    const parts = [withCode.message];
    if (withCode.code) parts.push(`code=${withCode.code}`);
    if (withCode.command) parts.push(`command=${withCode.command}`);
    if (withCode.responseCode != null) parts.push(`responseCode=${withCode.responseCode}`);
    if (withCode.response) parts.push(`response=${withCode.response}`);
    return parts.join(" | ");
  }
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
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
  const secure = true;

  const missing = [
    !host ? "SMTP_HOST" : null,
    !user ? "SMTP_USER" : null,
    !pass ? "SMTP_PASS" : null,
    !from ? "SMTP_FROM" : null,
  ].filter(Boolean);

  if (missing.length > 0) {
    return {
      error: `Missing environment variable: ${missing.join(", ")}`,
    } as const;
  }

  if (!Number.isFinite(port) || port <= 0) {
    return { error: `Invalid SMTP_PORT: ${portRaw}` } as const;
  }

  return { host, port, user, pass, from, secure } as const;
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

function interpretSmtpFailure(detail: string): string {
  const lower = detail.toLowerCase();
  if (
    lower.includes("invalid login") ||
    lower.includes("authentication failed") ||
    lower.includes("535") ||
    lower.includes("eauth")
  ) {
    return `SMTP authentication failed: ${detail}`;
  }
  if (lower.includes("etimedout") || lower.includes("timeout") || lower.includes("timed out")) {
    return `SMTP connection timeout: ${detail}`;
  }
  if (lower.includes("econnrefused") || lower.includes("enotfound")) {
    return `SMTP connection failed: ${detail}`;
  }
  if (lower.includes("recipient") || lower.includes("550") || lower.includes("rejected")) {
    return `Email rejected: ${detail}`;
  }
  return detail;
}

export type SendConsultationEmailOptions = {
  booking?: BookingDetails;
  icsContent?: string;
};

export async function sendConsultationEmail(
  data: ConsultationFormData,
  meta: ConsultationEmailMeta,
  options: SendConsultationEmailOptions = {}
): Promise<ConsultationEmailResult> {
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
  const { booking, icsContent } = options;
  const icsAttachment = icsContent
    ? [
        {
          filename: "consultation.ics",
          content: icsContent,
          contentType: "text/calendar; charset=utf-8; method=REQUEST",
        },
      ]
    : undefined;

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

    try {
      await transporter.verify();
    } catch (verifyError) {
      return {
        ok: false,
        internal: false,
        confirmation: false,
        error: interpretSmtpFailure(formatSmtpError(verifyError)),
      };
    }

    const fromHeader = `"${SITE.name}" <${config.from}>`;
    const dateLabel = booking?.formattedDate || data.date;

    const [internalResult, confirmationResult] = await Promise.allSettled([
      transporter.sendMail({
        from: fromHeader,
        to: toInternal,
        replyTo: data.email.trim(),
        subject: `${INTERNAL_SUBJECT} — ${dateLabel}`,
        html: buildInternalEmailHtml(data, meta, booking),
        text: buildInternalEmailText(data, meta, booking),
        attachments: icsAttachment,
      }),
      transporter.sendMail({
        from: fromHeader,
        to: data.email.trim(),
        replyTo: toInternal,
        subject: `${CONFIRMATION_SUBJECT} — ${dateLabel}`,
        html: buildConfirmationEmailHtml(data, booking),
        text: buildConfirmationEmailText(data, booking),
        attachments: icsAttachment,
      }),
    ]);

    const internal = internalResult.status === "fulfilled";
    const confirmation = confirmationResult.status === "fulfilled";
    let error: string | undefined;

    if (internalResult.status === "rejected") {
      error = interpretSmtpFailure(formatSmtpError(internalResult.reason));
    }

    if (confirmationResult.status === "rejected") {
      const detail = interpretSmtpFailure(formatSmtpError(confirmationResult.reason));
      error = error
        ? `${error}; Confirmation: ${detail}`
        : `Confirmation email failed: ${detail}`;
    }

    const ok = internal || confirmation;
    if (!ok && !error) {
      error = "Failed to send consultation emails";
    }

    return {
      ok,
      internal,
      confirmation,
      ...(error ? { error } : {}),
    };
  } catch (error) {
    return {
      ok: false,
      internal: false,
      confirmation: false,
      error: interpretSmtpFailure(formatSmtpError(error)),
    };
  }
}

export function getVisitorIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || null;
}
