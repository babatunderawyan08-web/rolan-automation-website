"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { z } from "zod";
import {
  CONSULTATION_SERVICES,
  consultationSchema,
} from "@/lib/consultation-schema";
import { cn } from "@/lib/utils";

const schema = consultationSchema;

type FormData = z.input<typeof consultationSchema>;

type SubmitStatus =
  | { type: "idle" }
  | { type: "success" }
  | { type: "error"; message: string };

const SUCCESS_MESSAGE =
  "✅ Your consultation request has been sent successfully. Our team will contact you soon.";

const DEFAULT_VALUES: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

export function ConsultationForm() {
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const busy = isSubmitting || submitting;

  const onSubmit = async (data: FormData) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setStatus({ type: "idle" });

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        telegram?: boolean;
        email?: boolean;
      } | null;

      if (response.ok && result?.ok) {
        reset(DEFAULT_VALUES);
        setStatus({ type: "success" });
        return;
      }

      setStatus({
        type: "error",
        message:
          result?.error ||
          "We couldn’t send your request. Please try again in a moment.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      className="space-y-5"
      noValidate
    >
      {status.type === "success" && (
        <div
          role="status"
          className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm leading-relaxed text-foreground"
        >
          {SUCCESS_MESSAGE}
        </div>
      )}

      {status.type === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-foreground"
        >
          {status.message}
        </div>
      )}

      <fieldset disabled={busy} className="space-y-5 border-0 p-0 m-0 min-w-0">
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
            className="mt-1.5 flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:opacity-60"
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

        <Button
          type="submit"
          variant="accent"
          className={cn("w-full", busy && "opacity-80")}
          disabled={busy}
        >
          {busy ? "Sending..." : "Book Consultation"}
        </Button>
      </fieldset>

      <p className="text-center text-xs text-muted">
        Your request is sent securely to our team — we’ll follow up within 48 hours.
      </p>
    </form>
  );
}
