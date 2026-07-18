import { NextResponse } from "next/server";
import { getVisitorIp, sendConsultationEmail } from "@/lib/consultation-email";
import { buildConsultationMessage, consultationSchema } from "@/lib/consultation-schema";

async function sendTelegram(text: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram credentials are not configured");
    return { ok: false, error: "Telegram not configured" };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Telegram API error:", detail);
      return { ok: false, error: "Failed to send to Telegram" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Telegram request failed:", error);
    return { ok: false, error: "Failed to send to Telegram" };
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

  // Fire Telegram + email together so both always run
  const [telegramResult, emailResult] = await Promise.all([
    sendTelegram(text),
    sendConsultationEmail(parsed.data, emailMeta),
  ]);

  if (!telegramResult.ok) {
    console.error("Consultation Telegram failed:", telegramResult.error);
  }
  if (!emailResult.ok) {
    console.error("Consultation email skipped/failed:", emailResult.error);
  }

  // Success if at least one delivery channel received the lead
  if (!telegramResult.ok && !emailResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        telegram: false,
        email: false,
        error: "Unable to deliver your request. Please try again shortly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    telegram: telegramResult.ok,
    email: emailResult.ok,
    emailInternal: emailResult.internal,
    emailConfirmation: emailResult.confirmation,
    ...(emailResult.error ? { emailError: emailResult.error } : {}),
    ...(telegramResult.error ? { telegramError: telegramResult.error } : {}),
  });
}
