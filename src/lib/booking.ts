import type { BookingDetails, ConsultationFormData } from "@/lib/consultation-schema";

/** Common IANA time zones for the booking selector */
export const BOOKING_TIMEZONES = [
  "Africa/Lagos",
  "Africa/Johannesburg",
  "Europe/London",
  "Europe/Paris",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Australia/Sydney",
  "UTC",
] as const;

export function getBusinessTimeZone(): string {
  return process.env.BOOKING_TIMEZONE?.trim() || "Africa/Lagos";
}

export function getBusinessHours(): { startHour: number; endHour: number } {
  const startHour = Number(process.env.BOOKING_START_HOUR || "9");
  const endHour = Number(process.env.BOOKING_END_HOUR || "17");
  return {
    startHour: Number.isFinite(startHour) ? startHour : 9,
    endHour: Number.isFinite(endHour) ? endHour : 17,
  };
}

/** Build a Date from YYYY-MM-DD + HH:mm interpreted in an IANA time zone. */
export function zonedDateTimeToUtc(
  date: string,
  time: string,
  timeZone: string
): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  // Iterate to resolve the correct UTC instant for the wall time in timeZone
  let guess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  for (let i = 0; i < 3; i++) {
    const parts = getTimeZoneParts(guess, timeZone);
    const asUtc = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second
    );
    const desired = Date.UTC(year, month - 1, day, hour, minute, 0);
    guess = new Date(guess.getTime() + (desired - asUtc));
  }
  return guess;
}

function getTimeZoneParts(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const bag: Record<string, string> = {};
  for (const part of fmt.formatToParts(date)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour: Number(bag.hour),
    minute: Number(bag.minute),
    second: Number(bag.second),
  };
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

export function formatInTimeZone(
  date: Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat("en-US", { timeZone, ...options }).format(date);
}

export function buildBookingDetails(
  data: Pick<ConsultationFormData, "date" | "time" | "timeZone" | "duration" | "consultationType">,
  extras?: {
    meetLink?: string | null;
    htmlLink?: string | null;
    eventId?: string | null;
  }
): BookingDetails {
  const start = zonedDateTimeToUtc(data.date, data.time, data.timeZone);
  const end = addMinutes(start, data.duration);

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
    timeZone: data.timeZone,
    consultationType: data.consultationType,
    duration: data.duration,
    meetLink: extras?.meetLink ?? null,
    htmlLink: extras?.htmlLink ?? null,
    eventId: extras?.eventId ?? null,
    formattedDate: formatInTimeZone(start, data.timeZone, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    formattedTime: formatInTimeZone(start, data.timeZone, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

export function generateDaySlots(
  date: string,
  timeZone: string,
  durationMinutes: number
): string[] {
  const { startHour, endHour } = getBusinessHours();
  const slots: string[] = [];
  const now = new Date();

  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      if (hour === endHour - 1 && minute === 30 && durationMinutes > 30) continue;
      const endMinuteTotal = hour * 60 + minute + durationMinutes;
      if (endMinuteTotal > endHour * 60) continue;

      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      const start = zonedDateTimeToUtc(date, time, timeZone);
      if (start.getTime() <= now.getTime() + 30 * 60_000) continue;
      slots.push(time);
    }
  }

  return slots;
}

export function buildIcs(options: {
  title: string;
  description: string;
  location?: string;
  start: Date;
  end: Date;
  organizerEmail: string;
  attendeeEmail: string;
  url?: string | null;
}): string {
  const stamp = formatIcsDate(new Date());
  const uid = `rolan-${stamp}-${Math.random().toString(36).slice(2, 10)}@rolanautomation.com`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ROLAN AUTOMATION//Consultation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatIcsDate(options.start)}`,
    `DTEND:${formatIcsDate(options.end)}`,
    `SUMMARY:${escapeIcs(options.title)}`,
    `DESCRIPTION:${escapeIcs(options.description)}`,
    `ORGANIZER;CN=ROLAN AUTOMATION:mailto:${options.organizerEmail}`,
    `ATTENDEE;CN=${escapeIcs(options.attendeeEmail)};RSVP=TRUE:mailto:${options.attendeeEmail}`,
  ];

  if (options.location) {
    lines.push(`LOCATION:${escapeIcs(options.location)}`);
  }
  if (options.url) {
    lines.push(`URL:${escapeIcs(options.url)}`);
  }

  lines.push("END:VEVENT", "END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

function formatIcsDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
