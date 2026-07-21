import { NextResponse } from "next/server";
import { getVisitorIp, sendConsultationEmail } from "@/lib/consultation-email";
import { buildConsultationMessage, consultationSchema } from "@/lib/consultation-schema";

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message || String(error);
  }
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

/** Trim whitespace and optional surrounding quotes from env values. */
function env(name: string): string {
  const raw = process.env[name];
  if (raw == null) return "";
  return raw.trim().replace(/^['"]|['"]$/g, "");
}

function envPresent(name: string): boolean {
  return env(name).length > 0;
}

function logEnvStatus() {
  const required = [
    "TELEGRAM_BOT_TOKEN",
    "TELEGRAM_CHAT_ID",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "CONTACT_EMAIL",
    "CONSULTATION_EMAIL_TO",
    "SMTP_FROM",
  ] as const;

  const status = Object.fromEntries(
    required.map((key) => [key, envPresent(key) ? "SET" : "MISSING"])
  );

  console.log("[consultation] Environment variable status:", status);

  const missingCritical = [
    !envPresent("TELEGRAM_BOT_TOKEN") ? "TELEGRAM_BOT_TOKEN" : null,
    !envPresent("TELEGRAM_CHAT_ID") ? "TELEGRAM_CHAT_ID" : null,
    !envPresent("SMTP_HOST") ? "SMTP_HOST" : null,
    !envPresent("SMTP_USER") ? "SMTP_USER" : null,
    !envPresent("SMTP_PASS") ? "SMTP_PASS" : null,
  ].filter(Boolean);

  if (missingCritical.length > 0) {
    console.error(
      "[consultation] Missing environment variable(s):",
      missingCritical.join(", ")
    );
  }

  if (!envPresent("CONTACT_EMAIL") && !envPresent("CONSULTATION_EMAIL_TO") && !envPresent("SMTP_FROM")) {
    console.warn(
      "[consultation] No CONTACT_EMAIL / CONSULTATION_EMAIL_TO / SMTP_FROM — will fall back to SMTP_USER or default inbox"
    );
  }
}

function interpretTelegramError(detail: string, httpStatus: number): string {
  const lower = detail.toLowerCase();
  if (lower.includes("unauthorized") || httpStatus === 401) {
    return "Telegram Bot Token invalid";
  }
  if (lower.includes("chat not found") || lower.includes("chat_id is empty")) {
    return "Chat ID invalid";
  }
  if (lower.includes("bot was blocked") || lower.includes("forbidden")) {
    return "Telegram bot blocked or cannot message this chat";
  }
  if (lower.includes("bad request")) {
    return `Telegram bad request: ${detail}`;
  }
  return `Telegram API HTTP ${httpStatus}: ${detail}`;
}

async function sendTelegram(
  text: string
): Promise<{ ok: boolean; error?: string; response?: string }> {
  console.log("[consultation] Telegram request: starting");

  const token = env("TELEGRAM_BOT_TOKEN");
  const chatIdRaw = env("TELEGRAM_CHAT_ID");

  if (!token || !chatIdRaw) {
    const missing = [
      !token ? "TELEGRAM_BOT_TOKEN" : null,
      !chatIdRaw ? "TELEGRAM_CHAT_ID" : null,
    ]
      .filter(Boolean)
      .join(", ");
    const error = `Missing environment variable: ${missing}`;
    console.error("[consultation] Telegram error:", error);
    return { ok: false, error };
  }

  // Numeric chat IDs must be numbers for Telegram API reliability
  const chatId = /^-?\d+$/.test(chatIdRaw) ? Number(chatIdRaw) : chatIdRaw;

  try {
    console.log("[consultation] Telegram request: POST sendMessage", {
      chatIdType: typeof chatId,
      textLength: text.length,
      tokenLength: token.length,
    });

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    const detail = await response.text();
    console.log("[consultation] Telegram response:", {
      httpStatus: response.status,
      bodyPreview: detail.slice(0, 500),
    });

    let payload: { ok?: boolean; description?: string } | null = null;
    try {
      payload = JSON.parse(detail) as { ok?: boolean; description?: string };
    } catch {
      payload = null;
    }

    if (!response.ok || payload?.ok === false) {
      const raw = payload?.description || detail;
      const error = interpretTelegramError(raw, response.status);
      console.error("[consultation] Telegram error:", error);
      return { ok: false, error, response: detail };
    }

    console.log("[consultation] Telegram request: success");
    return { ok: true, response: detail };
  } catch (error) {
    const message = `Network error contacting Telegram: ${formatError(error)}`;
    console.error("[consultation] Telegram error:", message);
    return { ok: false, error: message };
  }
}

export async function POST(request: Request) {
  console.log("[consultation] ========== NEW SUBMISSION ==========");
  logEnvStatus();

  let body: unknown;
  try {
    body = await request.json();
    console.log("[consultation] Form received:", {
      name: typeof body === "object" && body && "name" in body ? String((body as { name?: string }).name)?.slice(0, 40) : undefined,
      email:
        typeof body === "object" && body && "email" in body
          ? String((body as { email?: string }).email)?.slice(0, 60)
          : undefined,
      service:
        typeof body === "object" && body && "service" in body
          ? String((body as { service?: string }).service)
          : undefined,
      hasPhone: typeof body === "object" && body && "phone" in body && Boolean((body as { phone?: string }).phone),
      hasCompany:
        typeof body === "object" && body && "company" in body && Boolean((body as { company?: string }).company),
      messageLength:
        typeof body === "object" && body && "message" in body
          ? String((body as { message?: string }).message || "").length
          : 0,
    });
  } catch (error) {
    console.error("[consultation] Invalid JSON body:", formatError(error));
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    console.error("[consultation] Invalid form data:", parsed.error.flatten());
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const text = buildConsultationMessage(parsed.data);
  const emailMeta = {
    submittedAt: new Date().toISOString(),
    visitorIp: getVisitorIp(request),
  };

  let telegramResult: { ok: boolean; error?: string; response?: string } = {
    ok: false,
    error: "Telegram not attempted",
  };
  let emailResult: Awaited<ReturnType<typeof sendConsultationEmail>> = {
    ok: false,
    internal: false,
    confirmation: false,
    error: "Email not attempted",
  };

  // Separate try/catch so one channel never blocks the other
  try {
    telegramResult = await sendTelegram(text);
  } catch (error) {
    const message = `Telegram unexpected error: ${formatError(error)}`;
    console.error("[consultation] Telegram error:", message);
    telegramResult = { ok: false, error: message };
  }

  try {
    console.log("[consultation] Email request: starting");
    emailResult = await sendConsultationEmail(parsed.data, emailMeta);
    console.log("[consultation] Email response:", {
      ok: emailResult.ok,
      internal: emailResult.internal,
      confirmation: emailResult.confirmation,
      error: emailResult.error || null,
    });
  } catch (error) {
    const message = `Email unexpected error: ${formatError(error)}`;
    console.error("[consultation] SMTP error:", message);
    emailResult = {
      ok: false,
      internal: false,
      confirmation: false,
      error: message,
    };
  }

  const telegramOk = telegramResult.ok;
  const emailOk = emailResult.ok;

  console.log("[consultation] Channel results:", {
    telegram: telegramOk,
    email: emailOk,
    telegramError: telegramResult.error || null,
    emailError: emailResult.error || null,
  });

  // Success if Telegram OR email succeeds
  if (telegramOk || emailOk) {
    const final = {
      ok: true as const,
      telegram: telegramOk,
      email: emailOk,
      emailInternal: emailResult.internal,
      emailConfirmation: emailResult.confirmation,
      ...(emailResult.error ? { emailError: emailResult.error } : {}),
      ...(telegramResult.error ? { telegramError: telegramResult.error } : {}),
    };
    console.log("[consultation] Final response: SUCCESS", final);
    return NextResponse.json(final);
  }

  // Both failed — return the real causes (no secrets)
  const parts = [
    telegramResult.error ? `Telegram: ${telegramResult.error}` : null,
    emailResult.error ? `Email: ${emailResult.error}` : null,
  ].filter(Boolean);

  const error =
    parts.length > 0
      ? parts.join(" | ")
      : "Unable to deliver your request. Please try again shortly.";

  const final = {
    ok: false as const,
    telegram: false,
    email: false,
    error,
    telegramError: telegramResult.error,
    emailError: emailResult.error,
  };

  console.error("[consultation] Final response: FAILURE", final);
  return NextResponse.json(final, { status: 502 });
}
