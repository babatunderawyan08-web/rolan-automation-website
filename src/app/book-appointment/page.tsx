import { Calendar, CheckCircle2, Phone, Video } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { AppointmentForm } from "@/components/features/appointment-form";
import { FadeIn } from "@/components/shared/animations";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Book Appointment",
  description:
    "Book a video or audio appointment with ROLAN AUTOMATION. Choose an available date and time — confirmed instantly on Google Calendar.",
  path: "/book-appointment",
});

const benefits = [
  "Video Call (Google Meet) or Audio Call",
  "30 or 60 minute sessions",
  "Only real open slots from our calendar",
  "Instant confirmation + calendar invite",
  "Book in your local time zone",
];

export default function BookAppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Book Appointment"
        title="Schedule a call that fits your calendar"
        subtitle="Pick video or audio, choose an open slot in your time zone, and get instant confirmation with a calendar invite."
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="font-heading text-2xl font-bold">Why book online</h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-4 rounded-2xl border border-border bg-background-alt p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <p className="font-semibold">How it works</p>
                </div>
                <ol className="space-y-3 text-sm text-muted">
                  <li className="flex gap-3">
                    <span className="font-semibold text-foreground">1.</span>
                    Choose video or audio, duration, and your time zone.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-foreground">2.</span>
                    Pick from dates and times that are free on our Google Calendar.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-foreground">3.</span>
                    Confirm — we create the event, email you details, and notify our team.
                  </li>
                </ol>
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                    <Video className="h-4 w-4 shrink-0 text-secondary" />
                    Google Meet for video
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                    <Phone className="h-4 w-4 shrink-0 text-secondary" />
                    Audio without Meet link
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border bg-card p-5 card-shadow sm:p-6 md:p-8">
                <h2 className="mb-2 font-heading text-xl font-semibold">Book your appointment</h2>
                <p className="mb-6 text-sm text-muted">
                  Confirmation is instant when the selected slot is still available.
                </p>
                <AppointmentForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
