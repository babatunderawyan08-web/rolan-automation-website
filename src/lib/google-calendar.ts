import { google } from "googleapis";

/**
 * Google Calendar via service account JWT.
 * Production setup: docs/google-calendar-setup.md
 */

function env(name: string): string {
  const raw = process.env[name];
  if (raw == null) return "";
  return raw.trim().replace(/^['"]|['"]$/g, "");
}

function getPrivateKey(): string {
  const key = env("GOOGLE_PRIVATE_KEY");
  return key.replace(/\\n/g, "\n");
}

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(
    env("GOOGLE_CLIENT_EMAIL") &&
      env("GOOGLE_PRIVATE_KEY") &&
      env("GOOGLE_CALENDAR_ID")
  );
}

export function getCalendarId(): string {
  return env("GOOGLE_CALENDAR_ID") || "primary";
}

export async function getCalendarClient() {
  if (!isGoogleCalendarConfigured()) {
    throw new Error(
      "Missing Google Calendar credentials (GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID)"
    );
  }

  const auth = new google.auth.JWT({
    email: env("GOOGLE_CLIENT_EMAIL"),
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

export type BusyInterval = { start: Date; end: Date };

export async function getBusyIntervals(
  timeMinIso: string,
  timeMaxIso: string
): Promise<BusyInterval[]> {
  const calendar = await getCalendarClient();
  const calendarId = getCalendarId();

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMinIso,
      timeMax: timeMaxIso,
      items: [{ id: calendarId }],
    },
  });

  const busy = response.data.calendars?.[calendarId]?.busy || [];
  return busy
    .filter((b) => b.start && b.end)
    .map((b) => ({
      start: new Date(b.start as string),
      end: new Date(b.end as string),
    }));
}

export function isSlotFree(
  start: Date,
  end: Date,
  busy: BusyInterval[]
): boolean {
  return !busy.some((b) => start < b.end && end > b.start);
}

export type CreateCalendarEventInput = {
  summary: string;
  description: string;
  startIso: string;
  endIso: string;
  timeZone: string;
  attendeeEmail: string;
  attendeeName: string;
  createMeet: boolean;
};

export type CreateCalendarEventResult = {
  eventId: string;
  htmlLink: string | null;
  meetLink: string | null;
};

export async function createCalendarEvent(
  input: CreateCalendarEventInput
): Promise<CreateCalendarEventResult> {
  const calendar = await getCalendarClient();
  const calendarId = getCalendarId();
  const requestId = `rolan-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const response = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: input.createMeet ? 1 : 0,
    sendUpdates: "none",
    requestBody: {
      summary: input.summary,
      description: input.description,
      start: {
        dateTime: input.startIso,
        timeZone: input.timeZone,
      },
      end: {
        dateTime: input.endIso,
        timeZone: input.timeZone,
      },
      attendees: [
        {
          email: input.attendeeEmail,
          displayName: input.attendeeName,
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 15 },
        ],
      },
      ...(input.createMeet
        ? {
            conferenceData: {
              createRequest: {
                requestId,
                conferenceSolutionKey: { type: "hangoutsMeet" },
              },
            },
          }
        : {}),
    },
  });

  const event = response.data;
  const meetLink =
    event.hangoutLink ||
    event.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")
      ?.uri ||
    null;

  return {
    eventId: event.id || "",
    htmlLink: event.htmlLink || null,
    meetLink,
  };
}
