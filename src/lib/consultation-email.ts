import nodemailer from "nodemailer";
import { SITE } from "@/lib/constants";
import type { ConsultationFormData } from "@/lib/consultation-schema";

const EMAIL_TO = "contact@rolanautomation.com";
const INTERNAL_SUBJECT = "≡ƒÜÇ New Consultation Request - ROLAN AUTOMATION";
const CONFIRMATION_SUBJECT = "We received your consultation request — ROLAN AUTOMATION";

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
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }) + " UTC";
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
                ${escapeHtml(SITE.tagline)} ┬╖
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

function consultationFields(data: ConsultationFormData, meta: ConsultationEmailMeta, includeMeta: boolean) {
  const rows = [
    { label: "Full Name", value: data.name.trim() },
    { label: "Email Address", value: data.email.trim() },
    { label: "Phone Number", value: data.phone?.trim() || "Not provided" },
    { label: "Company Name", value: data.company?.trim() || "Not provided" },
    { label: "Requested Service", value: data.service },
    { label: "Project Details", value: data.message.trim(), multiline: true },
  ];

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
  meta: ConsultationEmailMeta
): string {
  const bodyHtml = `
    <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.6;">
      A new consultation request was submitted on the website. Review the details below and follow up promptly.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
      ${detailRows(consultationFields(data, meta, true))}
    </table>
    ${ctaButton(`mailto:${encodeURIComponent(data.email.trim())}?subject=${encodeURIComponent(`Re: Your consultation request — ${SITE.name}`)}`, "Reply to Client")}
    <p style="margin:20px 0 0;text-align:center;">
      <a href="${escapeHtml(siteUrl("/book-consultation"))}" style="color:${BRAND.blue};font-size:13px;text-decoration:none;font-weight:600;">View booking page</a>
    </p>
  `;

  return emailShell({
    preheader: `New consultation from ${data.name.trim()} — ${data.service}`,
    title: "New Consultation Request",
    eyebrow: SITE.name,
    bodyHtml,
    footerNote: "Internal notification from the ROLAN AUTOMATION consultation form.",
  });
}

export function buildConfirmationEmailHtml(data: ConsultationFormData): string {
  const firstName = data.name.trim().split(/\s+/)[0] || "there";
  const bodyHtml = `
    <p style="margin:0 0 16px;color:${BRAND.navy};font-size:16px;line-height:1.6;">
      Hi ${escapeHtml(firstName)},
    </p>
    <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.65;">
      Thank you for booking a consultation with <strong style="color:${BRAND.navy};">${escapeHtml(SITE.name)}</strong>.
      We have received your request and will review it shortly. You can expect a response within 48 hours.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 12px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:12px;">
      <tr>
        <td style="padding:18px 20px;">
          <p style="margin:0 0 6px;color:${BRAND.cyan};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Your request summary</p>
          <p style="margin:0;color:${BRAND.navy};font-size:15px;font-weight:700;">${escapeHtml(data.service)}</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
      ${detailRows(consultationFields(data, { submittedAt: "", visitorIp: null }, false))}
    </table>
    ${ctaButton(siteUrl("/services"), "Explore Our Services")}
    <p style="margin:24px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.65;text-align:center;">
      Questions? Email
      <a href="mailto:contact@rolanautomation.com" style="color:${BRAND.blue};text-decoration:none;font-weight:600;">contact@rolanautomation.com</a>
    </p>
  `;

  return emailShell({
    preheader: "We received your consultation request and will respond within 48 hours.",
    title: "Consultation Request Received",
    eyebrow: "Thank you",
    bodyHtml,
    footerNote: "You received this email because you submitted the consultation form on our website.",
  });
}

export function buildInternalEmailText(
  data: ConsultationFormData,
  meta: ConsultationEmailMeta
): string {
  return [
    `${SITE.name} — New Consultation Request`,
    "",
    `Full Name: ${data.name.trim()}`,
    `Email Address: ${data.email.trim()}`,
    `Phone Number: ${data.phone?.trim() || "Not provided"}`,
    `Company Name: ${data.company?.trim() || "Not provided"}`,
    `Requested Service: ${data.service}`,
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

export function buildConfirmationEmailText(data: ConsultationFormData): string {
  const firstName = data.name.trim().split(/\s+/)[0] || "there";
  return [
    `Hi ${firstName},`,
    "",
    `Thank you for booking a consultation with ${SITE.name}.`,
    "We have received your request and will review it shortly. You can expect a response within 48 hours.",
    "",
    "Your request summary",
    `Service: ${data.service}`,
    `Full Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone?.trim() || "Not provided"}`,
    `Company: ${data.company?.trim() || "Not provided"}`,
    "",
    "Project Details:",
    data.message.trim(),
    "",
    `Explore services: ${siteUrl("/services")}`,
    "Email: contact@rolanautomation.com",
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
      errno?: number | string;
      syscall?: string;
      address?: string;
      port?: number;
    };
    const parts = [`message=${withCode.message}`];
    if (withCode.name) parts.push(`name=${withCode.name}`);
    if (withCode.code) parts.push(`code=${withCode.code}`);
    if (withCode.command) parts.push(`command=${withCode.command}`);
    if (withCode.responseCode != null) parts.push(`responseCode=${withCode.responseCode}`);
    if (withCode.response) parts.push(`response=${withCode.response}`);
    if (withCode.errno != null) parts.push(`errno=${withCode.errno}`);
    if (withCode.syscall) parts.push(`syscall=${withCode.syscall}`);
    if (withCode.address) parts.push(`address=${withCode.address}`);
    if (withCode.port != null) parts.push(`port=${withCode.port}`);
    if (withCode.stack) parts.push(`stack=${withCode.stack}`);
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

function resolveBusinessInbox(): { email: string; source: string } {
  if (envTrim("CONTACT_EMAIL")) {
    return { email: envTrim("CONTACT_EMAIL"), source: "CONTACT_EMAIL" };
  }
  if (envTrim("CONSULTATION_EMAIL_TO")) {
    return { email: envTrim("CONSULTATION_EMAIL_TO"), source: "CONSULTATION_EMAIL_TO" };
  }
  if (envTrim("SMTP_FROM")) {
    return { email: envTrim("SMTP_FROM"), source: "SMTP_FROM" };
  }
  if (envTrim("SMTP_USER")) {
    return { email: envTrim("SMTP_USER"), source: "SMTP_USER" };
  }
  return { email: EMAIL_TO, source: "hardcoded-default" };
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

export async function sendConsultationEmail(
  data: ConsultationFormData,
  meta: ConsultationEmailMeta
): Promise<ConsultationEmailResult> {
  console.log("[consultation] Email request: resolving SMTP config");
  console.log({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    from: process.env.SMTP_FROM,
    passwordLength: process.env.SMTP_PASS?.length,
  });
  console.log("[consultation] SMTP env present?", {
    SMTP_HOST: Boolean(envTrim("SMTP_HOST")),
    SMTP_PORT: Boolean(envTrim("SMTP_PORT")),
    SMTP_USER: Boolean(envTrim("SMTP_USER")),
    SMTP_PASS: Boolean(envTrim("SMTP_PASS")),
    CONTACT_EMAIL: Boolean(envTrim("CONTACT_EMAIL")),
    SMTP_FROM: Boolean(envTrim("SMTP_FROM")),
  });

  const config = getSmtpConfig();
  if ("error" in config) {
    console.error("[consultation] SMTP connection status: SKIPPED (config missing)");
    console.error("[consultation] SMTP authentication result: SKIPPED (config missing)");
    console.error("[consultation] SMTP error (exact):", config.error);
    return {
      ok: false,
      internal: false,
      confirmation: false,
      error: config.error,
    };
  }

  const inbox = resolveBusinessInbox();
  if (!envTrim("CONTACT_EMAIL")) {
    console.warn(
      `[consultation] CONTACT_EMAIL is not set — sending business mail via ${inbox.source}=${inbox.email}`
    );
  }

  try {
    console.log("[consultation] Nodemailer transporter config:", {
      host: config.host,
      port: config.port,
      secure: true,
      user: config.user,
      from: config.from,
      toBusiness: inbox.email,
      toBusinessSource: inbox.source,
    });

    // Exact shape requested: process.env.SMTP_* with secure: true
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
      console.log("[consultation] SMTP verify(): starting connection + auth checkΓÇª");
      await transporter.verify();
      console.log("[consultation] SMTP connection status: CONNECTED");
      console.log("[consultation] SMTP authentication result: SUCCESS");
    } catch (verifyError) {
      const detail = interpretSmtpFailure(formatSmtpError(verifyError));
      console.error("[consultation] SMTP connection status: FAILED");
      console.error("[consultation] SMTP authentication result: FAILED");
      console.error("[consultation] SMTP error (exact Nodemailer):", detail);
      return {
        ok: false,
        internal: false,
        confirmation: false,
        error: detail,
      };
    }

    const fromHeader = `"${SITE.name}" <${config.from}>`;
    const businessPayload = {
      from: fromHeader,
      to: inbox.email, // CONTACT_EMAIL preferred
      replyTo: data.email.trim(),
      subject: INTERNAL_SUBJECT,
      html: buildInternalEmailHtml(data, meta),
      text: buildInternalEmailText(data, meta),
    };
    const confirmationPayload = {
      from: fromHeader,
      to: data.email.trim(),
      replyTo: inbox.email,
      subject: CONFIRMATION_SUBJECT,
      html: buildConfirmationEmailHtml(data),
      text: buildConfirmationEmailText(data),
    };

    console.log("[consultation] sendMail() BEFORE business email ΓåÆ", {
      to: businessPayload.to,
      from: businessPayload.from,
      subject: businessPayload.subject,
      contactEmailEnv: envTrim("CONTACT_EMAIL") || "(unset)",
    });
    console.log("[consultation] sendMail() BEFORE visitor confirmation ΓåÆ", {
      to: confirmationPayload.to,
      from: confirmationPayload.from,
      subject: confirmationPayload.subject,
    });

    const [internalResult, confirmationResult] = await Promise.allSettled([
      transporter.sendMail(businessPayload),
      transporter.sendMail(confirmationPayload),
    ]);

    console.log("[consultation] sendMail() AFTER business email:", {
      status: internalResult.status,
      ...(internalResult.status === "fulfilled"
        ? {
            messageId: internalResult.value.messageId,
            accepted: internalResult.value.accepted,
            rejected: internalResult.value.rejected,
            response: internalResult.value.response,
          }
        : { error: formatSmtpError(internalResult.reason) }),
    });
    console.log("[consultation] sendMail() AFTER visitor confirmation:", {
      status: confirmationResult.status,
      ...(confirmationResult.status === "fulfilled"
        ? {
            messageId: confirmationResult.value.messageId,
            accepted: confirmationResult.value.accepted,
            rejected: confirmationResult.value.rejected,
            response: confirmationResult.value.response,
          }
        : { error: formatSmtpError(confirmationResult.reason) }),
    });

    const internal = internalResult.status === "fulfilled";
    const confirmation = confirmationResult.status === "fulfilled";
    let error: string | undefined;

    if (internalResult.status === "rejected") {
      const detail = interpretSmtpFailure(formatSmtpError(internalResult.reason));
      console.error(
        "[consultation] SMTP error (exact Nodemailer, business ΓåÆ CONTACT_EMAIL):",
        detail
      );
      error = detail;
    }

    if (confirmationResult.status === "rejected") {
      const detail = interpretSmtpFailure(formatSmtpError(confirmationResult.reason));
      console.error(
        "[consultation] SMTP error (exact Nodemailer, visitor confirmation):",
        detail
      );
      error = error
        ? `${error}; Confirmation: ${detail}`
        : `Confirmation email failed: ${detail}`;
    }

    const ok = internal || confirmation;
    if (!ok && !error) {
      error = "Failed to send consultation emails";
      console.error("[consultation] SMTP error (exact):", error);
    }

    if (!ok) {
      console.error("[consultation] SMTP final result: BOTH SENDS FAILED —", error);
    } else if (error) {
      console.warn("[consultation] SMTP final result: PARTIAL SUCCESS —", error);
    } else {
      console.log("[consultation] SMTP final result: ALL SENDS SUCCEEDED");
    }

    return {
      ok,
      internal,
      confirmation,
      ...(error ? { error } : {}),
    };
  } catch (error) {
    const detail = interpretSmtpFailure(formatSmtpError(error));
    console.error("[consultation] SMTP connection status: FAILED (exception)");
    console.error("[consultation] SMTP authentication result: UNKNOWN / FAILED");
    console.error("[consultation] SMTP error (exact Nodemailer):", detail);
    return {
      ok: false,
      internal: false,
      confirmation: false,
      error: detail,
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
