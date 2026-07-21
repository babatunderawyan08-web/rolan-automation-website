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
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export function buildConsultationMessage(data: ConsultationFormData): string {
  const company = data.company?.trim() || "Not provided";
  const phone = data.phone?.trim() || "Not provided";
  return [
    "📩 New Consultation Request",
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
    "📝 Project Details:",
    data.message.trim(),
  ].join("\n");
}
