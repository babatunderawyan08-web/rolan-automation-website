import { z } from "zod";

export const APPOINTMENT_TYPES = ["video", "audio"] as const;
export const APPOINTMENT_DURATIONS = [30, 60] as const;

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  consultationType: z
    .string()
    .trim()
    .refine((value): value is (typeof APPOINTMENT_TYPES)[number] =>
      (APPOINTMENT_TYPES as readonly string[]).includes(value),
      { message: "Select video or audio call" }
    ),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Select a valid date"),
  time: z
    .string()
    .trim()
    .regex(/^\d{2}:\d{2}$/, "Select a valid time"),
  timeZone: z.string().trim().min(1, "Select a time zone"),
  duration: z.coerce
    .number()
    .refine((value): value is (typeof APPOINTMENT_DURATIONS)[number] =>
      (APPOINTMENT_DURATIONS as readonly number[]).includes(value),
      { message: "Select 30 or 60 minutes" }
    ),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export type AppointmentDetails = {
  startIso: string;
  endIso: string;
  timeZone: string;
  consultationType: (typeof APPOINTMENT_TYPES)[number];
  duration: number;
  meetLink?: string | null;
  htmlLink?: string | null;
  eventId?: string | null;
  formattedDate: string;
  formattedTime: string;
};

export function buildAppointmentTelegramMessage(
  data: AppointmentFormData,
  appointment: AppointmentDetails
): string {
  const company = data.company?.trim() || "Not provided";
  const phone = data.phone?.trim() || "Not provided";
  const notes = data.notes?.trim() || "None";
  return [
    "📅 New Appointment Booking",
    "",
    "👤 Full Name:",
    data.name.trim(),
    "",
    "📧 Email:",
    data.email.trim(),
    "",
    "📞 Phone:",
    phone,
    "",
    "🏢 Company:",
    company,
    "",
    "🎯 Type:",
    data.consultationType === "video" ? "Video Call (Google Meet)" : "Audio Call",
    "",
    "⏱ Duration:",
    `${data.duration} minutes`,
    "",
    "🗓 Date:",
    appointment.formattedDate,
    "",
    "🕒 Time:",
    `${appointment.formattedTime} (${appointment.timeZone})`,
    "",
    "🔗 Meeting Link:",
    appointment.meetLink ||
      (data.consultationType === "audio"
        ? "Audio call — we will contact you"
        : "Calendar invite"),
    ...(appointment.htmlLink
      ? ["", "📆 Calendar Event:", appointment.htmlLink]
      : []),
    "",
    "📝 Notes:",
    notes,
  ].join("\n");
}
