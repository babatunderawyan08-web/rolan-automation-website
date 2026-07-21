import { Calendar, CheckCircle2, Video, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ConsultationForm } from "@/components/features/consultation-form";
import { FadeIn } from "@/components/shared/animations";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Book Consultation",
  description:
    "Book a video or audio automation consultation with ROLAN AUTOMATION. Choose your date, time, and duration — confirmed instantly on Google Calendar.",
  path: "/book-consultation",
});

const benefits = [
  "Video (Google Meet) or audio consultation",
  "30 or 60 minute sessions",
  "Instant calendar confirmation",
  "Custom automation roadmap",
  "No obligation, no pressure",
];

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Book Online"
        title="Schedule your automation strategy session"
        subtitle="Pick a date and time that works for you. We’ll confirm instantly, send a calendar invite, and meet by video or audio."
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="font-heading text-2xl font-bold">What you&apos;ll get</h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-4 rounded-2xl border border-border bg-background-alt p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <p className="font-semibold">How booking works</p>
                </div>
                <ol className="space-y-3 text-sm text-muted">
                  <li className="flex gap-3">
                    <span className="font-semibold text-foreground">1.</span>
                    Choose video or audio, then pick a date, time zone, and duration.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-foreground">2.</span>
                    We check Google Calendar so only open slots appear — no double bookings.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-foreground">3.</span>
                    Confirm and receive an email with meeting details and a calendar invite.
                  </li>
                </ol>
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                    <Video className="h-4 w-4 text-secondary shrink-0" />
                    Google Meet for video
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                    <Phone className="h-4 w-4 text-secondary shrink-0" />
                    Phone / audio option
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border bg-card p-5 card-shadow sm:p-6 md:p-8">
                <h2 className="font-heading text-xl font-semibold mb-2">Book your consultation</h2>
                <p className="text-sm text-muted mb-6">
                  Select your preferred slot. Confirmation is instant when the time is available.
                </p>
                <ConsultationForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
