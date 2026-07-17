import { NextResponse } from "next/server";
import { getVisitorIp, sendConsultationEmail } from "@/lib/consultation-email";
import { buildConsultationMessage, consultationSchema } from "@/lib/consultation-schema";

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

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram credentials are not configured");
    return NextResponse.json(
      { ok: false, telegram: false, email: false, error: "Telegram not configured" },
      { status: 503 }
    );
  }

  const text = buildConsultationMessage(parsed.data);
  let telegramOk = false;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Telegram API error:", detail);
      return NextResponse.json(
        { ok: false, telegram: false, email: false, error: "Failed to send to Telegram" },
        { status: 502 }
      );
    }

    telegramOk = true;
  } catch (error) {
    console.error("Telegram request failed:", error);
    return NextResponse.json(
      { ok: false, telegram: false, email: false, error: "Failed to send to Telegram" },
      { status: 502 }
    );
  }

  const emailResult = await sendConsultationEmail(parsed.data, {
    submittedAt: new Date().toISOString(),
    visitorIp: getVisitorIp(request),
  });

  if (!emailResult.ok) {
    console.error("Consultation email skipped/failed:", emailResult.error);
  }

  return NextResponse.json({
    ok: true,
    telegram: telegramOk,
    email: emailResult.ok,
    emailInternal: emailResult.internal,
    emailConfirmation: emailResult.confirmation,
    ...(emailResult.error ? { emailError: emailResult.error } : {}),
  });
}
