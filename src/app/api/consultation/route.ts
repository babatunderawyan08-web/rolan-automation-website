import { NextResponse } from "next/server";
import {
  buildBookingDetails,
  buildIcs,
  zonedDateTimeToUtc,
  addMinutes,
} from "@/lib/booking";
import { SITE } from "@/lib/constants";
import { getVisitorIp, sendConsultationEmail } from "@/lib/consultation-email";
import {
  buildConsultationMessage,
  consultationSchema,
} from "@/lib/consultation-schema";
import {
  createCalendarEvent,
  getBusyIntervals,
  isGoogleCalendarConfigured,
  isSlotFree,
} from "@/lib/google-calendar";

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

  const data = parsed.data;

  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Online booking is temporarily unavailable. Please email contact@rolanautomation.com.",
      },
      { status: 503 }
    );
  }

  const start = zonedDateTimeToUtc(data.date, data.time, data.timeZone);
  const end = addMinutes(start, data.duration);
  const now = Date.now();

  if (start.getTime() <= now + 15 * 60_000) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please choose a time at least 15 minutes from now.",
        code: "SLOT_TOO_SOON",
      },
      { status: 400 }
    );
  }

  try {
    const busy = await getBusyIntervals(
      addMinutes(start, -1).toISOString(),
      addMinutes(end, 1).toISOString()
    );

    if (!isSlotFree(start, end, busy)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "That time slot was just booked. Please choose another available time.",
          code: "SLOT_UNAVAILABLE",
        },
        { status: 409 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: `Unable to verify availability: ${formatError(error)}`,
      },
      { status: 502 }
    );
  }

  const typeLabel =
    data.consultationType === "video"
      ? "Video Consultation (Google Meet)"
      : "Audio Consultation";

  const description = [
    `Consultation with ${data.name.trim()}`,
    `Type: ${typeLabel}`,
    `Service: ${data.service}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone?.trim() || "Not provided"}`,
    `Company: ${data.company?.trim() || "Not provided"}`,
    "",
    "Project details:",
    data.message.trim(),
  ].join("\n");

  let event: Awaited<ReturnType<typeof createCalendarEvent>>;
  try {
    event = await createCalendarEvent({
      summary: `${typeLabel} — ${data.name.trim()}`,
      description,
      startIso: start.toISOString(),
      endIso: end.toISOString(),
      timeZone: data.timeZone,
      attendeeEmail: data.email.trim(),
      attendeeName: data.name.trim(),
      createMeet: data.consultationType === "video",
    });
  } catch (error) {
    const detail = formatError(error);
    if (
      detail.toLowerCase().includes("conflict") ||
      detail.toLowerCase().includes("duplicate")
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "That time slot is no longer available. Please pick another.",
          code: "SLOT_UNAVAILABLE",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        ok: false,
        error: `Unable to create calendar event: ${detail}`,
      },
      { status: 502 }
    );
  }

  const booking = buildBookingDetails(data, {
    meetLink: event.meetLink,
    htmlLink: event.htmlLink,
    eventId: event.eventId,
  });

  const organizerEmail =
    env("CONTACT_EMAIL") ||
    env("CONSULTATION_EMAIL_TO") ||
    env("SMTP_FROM") ||
    env("SMTP_USER") ||
    "contact@rolanautomation.com";

  const icsContent = buildIcs({
    title: `${typeLabel} — ${SITE.name}`,
    description: [
      description,
      booking.meetLink ? `\nMeet link: ${booking.meetLink}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    location:
      booking.meetLink ||
      (data.consultationType === "audio" ? "Audio consultation" : undefined),
    start,
    end,
    organizerEmail,
    attendeeEmail: data.email.trim(),
    url: booking.meetLink || booking.htmlLink,
  });

  const text = buildConsultationMessage(data, booking);
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
    emailResult = await sendConsultationEmail(data, emailMeta, {
      booking,
      icsContent,
    });
  } catch (error) {
    emailResult = {
      ok: false,
      internal: false,
      confirmation: false,
      error: `Email unexpected error: ${formatError(error)}`,
    };
  }

  // Calendar event is the booking source of truth — treat as success even if notify fails
  return NextResponse.json({
    ok: true,
    booked: true,
    booking,
    telegram: telegramResult.ok,
    email: emailResult.ok,
    emailInternal: emailResult.internal,
    emailConfirmation: emailResult.confirmation,
    ...(emailResult.error ? { emailError: emailResult.error } : {}),
    ...(telegramResult.error ? { telegramError: telegramResult.error } : {}),
  });
}
