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

function env(name: string): string {
  const raw = process.env[name];
  if (raw == null) return "";
  return raw.trim().replace(/^['"]|['"]$/g, "");
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
): Promise<{ ok: boolean; error?: string }> {
  const token = env("TELEGRAM_BOT_TOKEN");
  const chatIdRaw = env("TELEGRAM_CHAT_ID");

  if (!token || !chatIdRaw) {
    const missing = [
      !token ? "TELEGRAM_BOT_TOKEN" : null,
      !chatIdRaw ? "TELEGRAM_CHAT_ID" : null,
    ]
      .filter(Boolean)
      .join(", ");
    return { ok: false, error: `Missing environment variable: ${missing}` };
  }

  const chatId = /^-?\d+$/.test(chatIdRaw) ? Number(chatIdRaw) : chatIdRaw;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    const detail = await response.text();

    let payload: { ok?: boolean; description?: string } | null = null;
    try {
      payload = JSON.parse(detail) as { ok?: boolean; description?: string };
    } catch {
      payload = null;
    }

    if (!response.ok || payload?.ok === false) {
      const raw = payload?.description || detail;
      return { ok: false, error: interpretTelegramError(raw, response.status) };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: `Network error contacting Telegram: ${formatError(error)}` };
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const text = buildConsultationMessage(parsed.data);
  const emailMeta = {
    submittedAt: new Date().toISOString(),
    visitorIp: getVisitorIp(request),
  };

  let telegramResult: { ok: boolean; error?: string } = {
    ok: false,
    error: "Telegram not attempted",
  };
  let emailResult: Awaited<ReturnType<typeof sendConsultationEmail>> = {
    ok: false,
    internal: false,
    confirmation: false,
    error: "Email not attempted",
  };

  try {
    telegramResult = await sendTelegram(text);
  } catch (error) {
    telegramResult = { ok: false, error: `Telegram unexpected error: ${formatError(error)}` };
  }

  try {
    emailResult = await sendConsultationEmail(parsed.data, emailMeta);
  } catch (error) {
    emailResult = {
      ok: false,
      internal: false,
      confirmation: false,
      error: `Email unexpected error: ${formatError(error)}`,
    };
  }

  const telegramOk = telegramResult.ok;
  const emailOk = emailResult.ok;

  if (telegramOk || emailOk) {
    return NextResponse.json({
      ok: true,
      telegram: telegramOk,
      email: emailOk,
      emailInternal: emailResult.internal,
      emailConfirmation: emailResult.confirmation,
      ...(emailResult.error ? { emailError: emailResult.error } : {}),
      ...(telegramResult.error ? { telegramError: telegramResult.error } : {}),
    });
  }

  const parts = [
    telegramResult.error ? `Telegram: ${telegramResult.error}` : null,
    emailResult.error ? `Email: ${emailResult.error}` : null,
  ].filter(Boolean);

  return NextResponse.json(
    {
      ok: false,
      telegram: false,
      email: false,
      error:
        parts.length > 0
          ? parts.join(" | ")
          : "Unable to deliver your request. Please try again shortly.",
      telegramError: telegramResult.error,
      emailError: emailResult.error,
    },
    { status: 502 }
  );
}
