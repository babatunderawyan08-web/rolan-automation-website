import { NextResponse } from "next/server";
import { z } from "zod";
import {
  addMinutes,
  generateDaySlots,
  zonedDateTimeToUtc,
} from "@/lib/booking";
import {
  getBusyIntervals,
  isGoogleCalendarConfigured,
  isSlotFree,
} from "@/lib/google-calendar";
import { CONSULTATION_DURATIONS } from "@/lib/consultation-schema";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeZone: z.string().min(1),
  duration: z.coerce
    .number()
    .refine((value): value is (typeof CONSULTATION_DURATIONS)[number] =>
      (CONSULTATION_DURATIONS as readonly number[]).includes(value)
    ),
});

export async function GET(request: Request) {
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Booking calendar is not configured yet.",
        slots: [] as string[],
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    date: searchParams.get("date"),
    timeZone: searchParams.get("timeZone"),
    duration: searchParams.get("duration"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid availability query", slots: [] as string[] },
      { status: 400 }
    );
  }

  const { date, timeZone, duration } = parsed.data;
  const candidateSlots = generateDaySlots(date, timeZone, duration);

  if (candidateSlots.length === 0) {
    return NextResponse.json({ ok: true, slots: [] as string[] });
  }

  try {
    const dayStart = zonedDateTimeToUtc(date, "00:00", timeZone);
    const dayEnd = addMinutes(zonedDateTimeToUtc(date, "23:59", timeZone), 1);
    const busy = await getBusyIntervals(
      dayStart.toISOString(),
      dayEnd.toISOString()
    );

    const slots = candidateSlots.filter((time) => {
      const start = zonedDateTimeToUtc(date, time, timeZone);
      const end = addMinutes(start, duration);
      return isSlotFree(start, end, busy);
    });

    return NextResponse.json({ ok: true, slots });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to check availability";
    return NextResponse.json(
      { ok: false, error: message, slots: [] as string[] },
      { status: 502 }
    );
  }
}
