"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, X } from "lucide-react";
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

const DEFAULT_VALUES: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

function ConsultationSuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
        aria-label="Close success dialog"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-success-title"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-background-alt hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success ring-8 ring-success/10"
          aria-hidden
        >
          <Check className="h-8 w-8 stroke-[2.5]" />
        </motion.div>

        <h3
          id="consultation-success-title"
          className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          Inquiry Sent
        </h3>
        <p className="mt-2 text-base font-medium text-foreground">Thank you for reaching out!</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          We&apos;ve received your consultation request successfully.
        </p>

        <ul className="mt-6 space-y-2.5 text-left">
          <li className="flex items-center gap-2.5 rounded-xl border border-border bg-background-alt/80 px-3.5 py-2.5 text-sm text-foreground">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
            <span>Confirmation email sent</span>
          </li>
          <li className="flex items-center gap-2.5 rounded-xl border border-border bg-background-alt/80 px-3.5 py-2.5 text-sm text-foreground">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
            <span>Our team has been notified</span>
          </li>
        </ul>

        <p className="mt-6 text-sm text-muted">We&apos;ll contact you within 48 hours.</p>

        <Button type="button" variant="accent" className="mt-6 min-w-[140px]" onClick={onClose}>
          Done
        </Button>
      </motion.div>
    </motion.div>
  );
}

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
    <>
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        className="space-y-5"
        noValidate
      >
        {status.type === "error" && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-foreground"
          >
            {status.message}
          </div>
        )}

        <fieldset disabled={busy} className="m-0 min-w-0 space-y-5 border-0 p-0">
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
            {errors.service && (
              <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="consult-message">Project Details</Label>
            <Textarea
              id="consult-message"
              placeholder="Describe your automation or call center needs..."
              className="mt-1.5"
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="accent"
            className={cn("w-full", busy && "opacity-80")}
            disabled={busy}
          >
            {busy ? "Sending..." : "Send Inquiry"}
          </Button>
        </fieldset>

        <p className="text-center text-xs text-muted">
          Your request is sent securely to our team — we&apos;ll follow up within 48 hours.
        </p>
      </form>

      <AnimatePresence>
        {status.type === "success" && (
          <ConsultationSuccessModal onClose={() => setStatus({ type: "idle" })} />
        )}
      </AnimatePresence>
    </>
  );
}
