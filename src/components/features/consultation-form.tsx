"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { SITE } from "@/lib/constants";
import { z } from "zod";
import {
  CONSULTATION_SERVICES,
  consultationSchema,
} from "@/lib/consultation-schema";

const schema = consultationSchema;

type FormData = z.input<typeof consultationSchema>;

function buildWhatsAppMessage(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}): string {
  const company = data.company?.trim() || "Not provided";
  const phone = data.phone?.trim() || "Not provided";
  return [
    "Hello Rolan Automation,",
    "",
    "I would like to book a consultation.",
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
    "",
    "Please contact me at your earliest convenience.",
  ].join("\n");
}

export function ConsultationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Backend notification failed — still open WhatsApp
    }

    const text = buildWhatsAppMessage(data);
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="consult-name">Full Name</Label>
        <Input
          id="consult-name"
          placeholder="John Smith"
          className="mt-1.5"
          autoComplete="name"
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="consult-email">Email</Label>
        <Input
          id="consult-email"
          type="email"
          placeholder="john@company.com"
          className="mt-1.5"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="consult-phone">Phone Number</Label>
        <Input
          id="consult-phone"
          type="tel"
          placeholder="+1 555 000 0000"
          className="mt-1.5"
          autoComplete="tel"
          {...register("phone")}
        />
      </div>

      <div>
        <Label htmlFor="consult-company">Company</Label>
        <Input
          id="consult-company"
          placeholder="Your company"
          className="mt-1.5"
          autoComplete="organization"
          {...register("company")}
        />
      </div>

      <div>
        <Label htmlFor="consult-service">Service</Label>
        <select
          id="consult-service"
          className="mt-1.5 flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          defaultValue=""
          {...register("service")}
        >
          <option value="" disabled>
            Select a service
          </option>
          {CONSULTATION_SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
      </div>

      <div>
        <Label htmlFor="consult-message">Project Details</Label>
        <Textarea
          id="consult-message"
          placeholder="Describe your automation or call center needs..."
          className="mt-1.5"
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting}>
        Book Consultation
      </Button>
      <p className="text-center text-xs text-muted">
        Opens WhatsApp with your details — nothing is stored on this site.
      </p>
    </form>
  );
}
