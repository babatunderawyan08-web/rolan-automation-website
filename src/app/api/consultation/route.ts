import { NextResponse } from "next/server";
import { getVisitorIp, sendConsultationEmail } from "@/lib/consultation-email";
import { buildConsultationMessage, consultationSchema } from "@/lib/consultation-schema";

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.stack || error.message;
  }
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

async function sendTelegram(text: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    const missing = [
      !token ? "TELEGRAM_BOT_TOKEN" : null,
      !chatId ? "TELEGRAM_CHAT_ID" : null,
    ]
      .filter(Boolean)
      .join(", ");
    const error = `Telegram not configured — missing ${missing}`;
    console.error("[consultation] Telegram error:", error);
    return { ok: false, error };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const detail = await response.text();

    if (!response.ok) {
      const error = `Telegram API HTTP ${response.status}: ${detail}`;
      console.error("[consultation] Telegram error:", error);
      return { ok: false, error };
    }

    // Telegram returns JSON with ok:false even on HTTP 200 in some cases
    try {
      const payload = JSON.parse(detail) as { ok?: boolean; description?: string };
      if (payload.ok === false) {
        const error = `Telegram API rejected message: ${payload.description || detail}`;
        console.error("[consultation] Telegram error:", error);
        return { ok: false, error };
      }
    } catch {
      // Non-JSON success body is fine
    }

    return { ok: true };
  } catch (error) {
    const message = formatError(error);
    console.error("[consultation] Telegram error:", message);
    return { ok: false, error: message };
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
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

  const [telegramResult, emailResult] = await Promise.all([
    sendTelegram(text),
    sendConsultationEmail(parsed.data, emailMeta),
  ]);

  const telegramOk = telegramResult.ok;
  const emailOk = emailResult.ok;

  if (!telegramOk) {
    console.error("[consultation] Telegram delivery failed:", telegramResult.error);
  }
  if (!emailOk) {
    console.error("[consultation] SMTP delivery failed:", emailResult.error);
  }

  // Success if Telegram OR email succeeds; error only if both fail
  if (!telegramOk && !emailOk) {
    return NextResponse.json(
      {
        ok: false,
        telegram: false,
        email: false,
        error: "Unable to deliver your request. Please try again shortly.",
        telegramError: telegramResult.error,
        emailError: emailResult.error,
      },
      { status: 502 }
    );
  }

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
