"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Video,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { z } from "zod";
import {
  BOOKING_TIMEZONES,
} from "@/lib/booking";
import {
  CONSULTATION_DURATIONS,
  CONSULTATION_SERVICES,
  CONSULTATION_TYPES,
  consultationSchema,
  type BookingDetails,
} from "@/lib/consultation-schema";
import { cn } from "@/lib/utils";

const schema = consultationSchema;

type FormData = z.input<typeof consultationSchema>;

type SubmitStatus =
  | { type: "idle" }
  | { type: "success"; booking: BookingDetails }
  | { type: "error"; message: string };

const fieldClass =
  "mt-1.5 flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:opacity-60";

function detectTimeZone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && (BOOKING_TIMEZONES as readonly string[]).includes(tz)) return tz;
    if (tz) return tz;
  } catch {
    /* ignore */
  }
  return "Africa/Lagos";
}

function minSelectableDate(): string {
  const d = new Date();
  d.setDate(d.getDate());
  return d.toISOString().slice(0, 10);
}

function googleCalendarUrl(booking: BookingDetails, title: string): string {
  const start = booking.startIso.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const end = booking.endIso.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details:
      booking.consultationType === "video" && booking.meetLink
        ? `Join Google Meet: ${booking.meetLink}`
        : "Audio consultation with ROLAN AUTOMATION",
    ...(booking.meetLink ? { location: booking.meetLink } : {}),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcs(booking: BookingDetails) {
  const stamp = booking.startIso
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  const endStamp = booking.endIso
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  const title =
    booking.consultationType === "video"
      ? "Video Consultation — ROLAN AUTOMATION"
      : "Audio Consultation — ROLAN AUTOMATION";
  const description =
    booking.meetLink != null
      ? `Meet link: ${booking.meetLink}`
      : "Audio consultation";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ROLAN AUTOMATION//Consultation//EN",
    "BEGIN:VEVENT",
    `UID:rolan-${stamp}@rolanautomation.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${stamp}`,
    `DTEND:${endStamp}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    booking.meetLink ? `LOCATION:${booking.meetLink}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rolan-consultation.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function ConsultationSuccess({
  booking,
  onDone,
}: {
  booking: BookingDetails;
  onDone: () => void;
}) {
  const typeLabel =
    booking.consultationType === "video"
      ? "Video Consultation (Google Meet)"
      : "Audio Consultation";
  const calendarTitle =
    booking.consultationType === "video"
      ? "Video Consultation — ROLAN AUTOMATION"
      : "Audio Consultation — ROLAN AUTOMATION";

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col items-center text-center px-2 py-4 sm:py-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08, duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success ring-8 ring-success/10"
        aria-hidden
      >
        <Check className="h-8 w-8 stroke-[2.5]" />
      </motion.div>

      <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        Booking Confirmed
      </h3>
      <p className="mt-2 text-base font-medium text-foreground">
        Your consultation is scheduled.
      </p>

      <dl className="mt-6 w-full max-w-sm space-y-2.5 text-left">
        <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background-alt/80 px-3.5 py-2.5 text-sm">
          <dt className="text-muted">Date</dt>
          <dd className="font-medium text-foreground text-right">{booking.formattedDate}</dd>
        </div>
        <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background-alt/80 px-3.5 py-2.5 text-sm">
          <dt className="text-muted">Time</dt>
          <dd className="font-medium text-foreground text-right">
            {booking.formattedTime} ({booking.timeZone})
          </dd>
        </div>
        <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background-alt/80 px-3.5 py-2.5 text-sm">
          <dt className="text-muted">Type</dt>
          <dd className="font-medium text-foreground text-right">{typeLabel}</dd>
        </div>
        <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background-alt/80 px-3.5 py-2.5 text-sm">
          <dt className="text-muted">Duration</dt>
          <dd className="font-medium text-foreground text-right">{booking.duration} minutes</dd>
        </div>
      </dl>

      {booking.consultationType === "video" && booking.meetLink && (
        <a
          href={booking.meetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
        >
          <Video className="h-4 w-4" aria-hidden />
          Open Google Meet
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      )}

      <div className="mt-6 flex w-full max-w-sm flex-col gap-2.5 sm:flex-row">
        <Button
          type="button"
          variant="accent"
          className="flex-1 gap-2"
          onClick={() => {
            if (booking.htmlLink) {
              window.open(booking.htmlLink, "_blank", "noopener,noreferrer");
              return;
            }
            window.open(
              googleCalendarUrl(booking, calendarTitle),
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          <CalendarPlus className="h-4 w-4" aria-hidden />
          Add to Calendar
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => downloadIcs(booking)}
        >
          Download .ics
        </Button>
      </div>

      <ul className="mt-6 w-full max-w-sm space-y-2.5 text-left">
        <li className="flex items-center gap-2.5 text-sm text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
          <span>Confirmation email sent with calendar invite</span>
        </li>
        <li className="flex items-center gap-2.5 text-sm text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
          <span>Our team has been notified</span>
        </li>
      </ul>

      <Button type="button" variant="ghost" className="mt-6 min-w-[140px]" onClick={onDone}>
        Book another
      </Button>
    </motion.div>
  );
}

export function ConsultationForm() {
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const defaultValues = useMemo<FormData>(
    () => ({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
      consultationType: "video",
      date: minSelectableDate(),
      time: "",
      timeZone: detectTimeZone(),
      duration: 30,
    }),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const date = watch("date");
  const timeZone = watch("timeZone");
  const duration = watch("duration");
  const consultationType = watch("consultationType");
  const selectedTime = watch("time");

  const loadSlots = useCallback(async () => {
    if (!date || !timeZone || !duration) {
      setSlots([]);
      return;
    }

    setSlotsLoading(true);
    setSlotsError(null);

    try {
      const params = new URLSearchParams({
        date: String(date),
        timeZone: String(timeZone),
        duration: String(duration),
      });
      const response = await fetch(`/api/booking/availability?${params}`);
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        slots?: string[];
        error?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        setSlots([]);
        setSlotsError(result?.error || "Unable to load available times.");
        return;
      }

      const nextSlots = result.slots || [];
      setSlots(nextSlots);
      const currentTime = getValues("time");
      if (currentTime && !nextSlots.includes(String(currentTime))) {
        setValue("time", "");
      }
    } catch {
      setSlots([]);
      setSlotsError("Network error while loading times.");
    } finally {
      setSlotsLoading(false);
    }
  }, [date, timeZone, duration, setValue, getValues]);

  useEffect(() => {
    void loadSlots();
  }, [loadSlots]);

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
        booking?: BookingDetails;
        code?: string;
      } | null;

      if (response.ok && result?.ok && result.booking) {
        reset(defaultValues);
        setStatus({ type: "success", booking: result.booking });
        return;
      }

      if (result?.code === "SLOT_UNAVAILABLE") {
        void loadSlots();
      }

      setStatus({
        type: "error",
        message:
          result?.error ||
          "We couldn’t complete your booking. Please try another time.",
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

  if (status.type === "success") {
    return (
      <ConsultationSuccess
        booking={status.booking}
        onDone={() => {
          setStatus({ type: "idle" });
          void loadSlots();
        }}
      />
    );
  }

  return (
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
          <Label>Consultation type</Label>
          <Controller
            name="consultationType"
            control={control}
            render={({ field }) => (
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {CONSULTATION_TYPES.map((type) => {
                  const selected = field.value === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => field.onChange(type)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors",
                        selected
                          ? "border-secondary bg-secondary/10 text-foreground ring-2 ring-secondary/20"
                          : "border-border bg-background text-muted hover:border-secondary/40"
                      )}
                    >
                      {type === "video" ? (
                        <Video className="h-4 w-4 text-secondary" aria-hidden />
                      ) : (
                        <Phone className="h-4 w-4 text-secondary" aria-hidden />
                      )}
                      {type === "video" ? "Video (Meet)" : "Audio"}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.consultationType && (
            <p className="mt-1 text-xs text-red-500">{errors.consultationType.message}</p>
          )}
          {consultationType === "video" && (
            <p className="mt-1.5 text-xs text-muted">
              A Google Meet link will be created automatically.
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="consult-date">Date</Label>
            <Input
              id="consult-date"
              type="date"
              min={minSelectableDate()}
              className="mt-1.5"
              {...register("date")}
            />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
          </div>

          <div>
            <Label htmlFor="consult-duration">Duration</Label>
            <select id="consult-duration" className={fieldClass} {...register("duration")}>
              {CONSULTATION_DURATIONS.map((mins) => (
                <option key={mins} value={mins}>
                  {mins} minutes
                </option>
              ))}
            </select>
            {errors.duration && (
              <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="consult-timezone">Time zone</Label>
          <select id="consult-timezone" className={fieldClass} {...register("timeZone")}>
            {!(BOOKING_TIMEZONES as readonly string[]).includes(String(defaultValues.timeZone)) &&
              defaultValues.timeZone && (
                <option value={defaultValues.timeZone}>{defaultValues.timeZone}</option>
              )}
            {BOOKING_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          {errors.timeZone && (
            <p className="mt-1 text-xs text-red-500">{errors.timeZone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="consult-time">Available times</Label>
          {slotsLoading ? (
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <Clock className="h-4 w-4 animate-pulse" aria-hidden />
              Checking calendar…
            </p>
          ) : slotsError ? (
            <p className="mt-2 text-sm text-red-500">{slotsError}</p>
          ) : slots.length === 0 ? (
            <p className="mt-2 text-sm text-muted">
              No open slots for this date. Try another day or duration.
            </p>
          ) : (
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((slot) => {
                    const selected = field.value === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => field.onChange(slot)}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-sm font-medium tabular-nums transition-colors",
                          selected
                            ? "border-secondary bg-secondary/10 text-foreground ring-2 ring-secondary/20"
                            : "border-border bg-background text-foreground hover:border-secondary/40"
                        )}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          )}
          {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>}
        </div>

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
            className={fieldClass}
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
          disabled={busy || slotsLoading || !selectedTime}
        >
          {busy ? "Confirming booking…" : "Confirm Booking"}
        </Button>
      </fieldset>

      <p className="text-center text-xs text-muted">
        Your slot is checked against our calendar before confirmation. You&apos;ll receive an email
        with meeting details and a calendar invite.
      </p>
    </form>
  );
}
