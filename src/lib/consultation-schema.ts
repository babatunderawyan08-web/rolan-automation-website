import { z } from "zod";

export const CONSULTATION_SERVICES = [
  "AI & Workflow Automation",
  "Call Center Solutions",
  "CRM & API Integration",
  "3CX Setup",
  "VICIdial Installation",
  "FreePBX / Asterisk",
  "Other / Not sure yet",
] as const;

export const CONSULTATION_TYPES = ["video", "audio"] as const;
export const CONSULTATION_DURATIONS = [30, 60] as const;

export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  service: z
    .string()
    .trim()
    .refine((value): value is (typeof CONSULTATION_SERVICES)[number] =>
      (CONSULTATION_SERVICES as readonly string[]).includes(value),
      { message: "Please select a service" }
    ),
  message: z.string().trim().min(10, "Please share a few project details"),
  consultationType: z
    .string()
    .trim()
    .refine((value): value is (typeof CONSULTATION_TYPES)[number] =>
      (CONSULTATION_TYPES as readonly string[]).includes(value),
      { message: "Select video or audio consultation" }
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
    .refine((value): value is (typeof CONSULTATION_DURATIONS)[number] =>
      (CONSULTATION_DURATIONS as readonly number[]).includes(value),
      { message: "Select 30 or 60 minutes" }
    ),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export type BookingDetails = {
  startIso: string;
  endIso: string;
  timeZone: string;
  consultationType: (typeof CONSULTATION_TYPES)[number];
  duration: number;
  meetLink?: string | null;
  htmlLink?: string | null;
  eventId?: string | null;
  formattedDate: string;
  formattedTime: string;
};

export function buildConsultationMessage(
  data: ConsultationFormData,
  booking?: BookingDetails
): string {
  const company = data.company?.trim() || "Not provided";
  const phone = data.phone?.trim() || "Not provided";
  const lines = [
    "📅 New Consultation Booking",
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
    "⚙️ Service:",
    data.service,
    "",
    "🎯 Consultation Type:",
    data.consultationType === "video" ? "Video (Google Meet)" : "Audio",
    "",
    "⏱ Duration:",
    `${data.duration} minutes`,
  ];

  if (booking) {
    lines.push(
      "",
      "🗓 Date:",
      booking.formattedDate,
      "",
      "🕒 Time:",
      `${booking.formattedTime} (${booking.timeZone})`,
      "",
      "🔗 Meeting Link:",
      booking.meetLink || (data.consultationType === "audio" ? "Audio call — we will dial/contact you" : "Calendar invite")
    );
    if (booking.htmlLink) {
      lines.push("", "📆 Calendar Event:", booking.htmlLink);
    }
  } else {
    lines.push(
      "",
      "🗓 Requested Slot:",
      `${data.date} ${data.time} (${data.timeZone})`
    );
  }

  lines.push("", "📝 Project Details:", data.message.trim());
  return lines.join("\n");
}
