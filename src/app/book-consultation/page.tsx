import { Calendar, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ConsultationForm } from "@/components/features/consultation-form";
import { FadeIn } from "@/components/shared/animations";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Book Consultation",
  description: "Book a free automation consultation with ROLAN AUTOMATION. Get a custom roadmap within 48 hours.",
  path: "/book-consultation",
});

const benefits = [
  "Free 30-minute strategy session",
  "Custom automation roadmap",
  "ROI estimate for your business",
  "No obligation, no pressure",
  "Response within 48 hours",
];

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Consultation"
        title="Book your free automation strategy session"
        subtitle="Discover exactly how automation can transform your business — with a custom roadmap delivered within 48 hours."
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
              <div className="mt-8 rounded-2xl border border-border bg-background-alt p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <p className="font-semibold">Prefer to schedule directly?</p>
                </div>
                <div className="h-64 rounded-xl bg-card border border-dashed border-border flex items-center justify-center text-sm text-muted">
                  Calendly Scheduling Widget Placeholder
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border bg-card p-5 card-shadow sm:p-6 md:p-8">
                <h2 className="font-heading text-xl font-semibold mb-2">Request your consultation</h2>
                <p className="text-sm text-muted mb-6">
                  Fill out the form and we&apos;ll receive your request instantly. Our team will contact you soon.
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
