import { NextResponse } from "next/server";
import { z } from "zod";
import {
  addMinutes,
  generateAvailableDates,
  generateDaySlots,
  zonedDateTimeToUtc,
} from "@/lib/booking";
import { APPOINTMENT_DURATIONS } from "@/lib/appointment-schema";
import {
  getBusyIntervals,
  isGoogleCalendarConfigured,
  isSlotFree,
  type BusyInterval,
} from "@/lib/google-calendar";

const querySchema = z.object({
  timeZone: z.string().min(1),
  duration: z.coerce
    .number()
    .refine((value): value is (typeof APPOINTMENT_DURATIONS)[number] =>
      (APPOINTMENT_DURATIONS as readonly number[]).includes(value)
    ),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

function freeSlotsForDate(
  date: string,
  timeZone: string,
  duration: number,
  busy: BusyInterval[]
): string[] {
  return generateDaySlots(date, timeZone, duration).filter((time) => {
    const start = zonedDateTimeToUtc(date, time, timeZone);
    const end = addMinutes(start, duration);
    return isSlotFree(start, end, busy);
  });
}

export async function GET(request: Request) {
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Appointment calendar is not configured yet.",
        dates: [] as string[],
        slots: [] as string[],
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    timeZone: searchParams.get("timeZone"),
    duration: searchParams.get("duration"),
    date: searchParams.get("date") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid availability query",
        dates: [] as string[],
        slots: [] as string[],
      },
      { status: 400 }
    );
  }

  const { timeZone, duration, date } = parsed.data;

  try {
    if (!date) {
      const candidateDates = generateAvailableDates(timeZone, duration, 60);
      if (candidateDates.length === 0) {
        return NextResponse.json({
          ok: true,
          dates: [] as string[],
          slots: [] as string[],
        });
      }

      const rangeStart = zonedDateTimeToUtc(candidateDates[0], "00:00", timeZone);
      const rangeEnd = addMinutes(
        zonedDateTimeToUtc(
          candidateDates[candidateDates.length - 1],
          "23:59",
          timeZone
        ),
        1
      );
      const busy = await getBusyIntervals(
        rangeStart.toISOString(),
        rangeEnd.toISOString()
      );

      const freeDates = candidateDates.filter(
        (candidate) => freeSlotsForDate(candidate, timeZone, duration, busy).length > 0
      );

      return NextResponse.json({
        ok: true,
        dates: freeDates,
        slots: [] as string[],
      });
    }

    const dayStart = zonedDateTimeToUtc(date, "00:00", timeZone);
    const dayEnd = addMinutes(zonedDateTimeToUtc(date, "23:59", timeZone), 1);
    const busy = await getBusyIntervals(
      dayStart.toISOString(),
      dayEnd.toISOString()
    );
    const slots = freeSlotsForDate(date, timeZone, duration, busy);

    return NextResponse.json({ ok: true, dates: [] as string[], slots });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to check availability";
    return NextResponse.json(
      {
        ok: false,
        error: message,
        dates: [] as string[],
        slots: [] as string[],
      },
      { status: 502 }
    );
  }
}
