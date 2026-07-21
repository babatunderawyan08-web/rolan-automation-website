import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ConsultationForm } from "@/components/features/consultation-form";
import { FadeIn } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Book Consultation",
  description:
    "Send an automation inquiry to ROLAN AUTOMATION. Get a custom roadmap within 48 hours.",
  path: "/book-consultation",
});

const benefits = [
  "Free strategy discussion",
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
        title="Tell us about your automation goals"
        subtitle="Share a few details about your project. Our team will review your inquiry and follow up within 48 hours."
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="font-heading text-2xl font-bold">What you&apos;ll get</h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-border bg-background-alt p-6">
                <div className="mb-3 flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                  <p className="font-semibold">Prefer to pick a time now?</p>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  For video or audio calls with instant calendar confirmation, use our appointment
                  booking page instead.
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/book-appointment">
                    Book Appointment <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border bg-card p-5 card-shadow sm:p-6 md:p-8">
                <h2 className="mb-2 font-heading text-xl font-semibold">Send your inquiry</h2>
                <p className="mb-6 text-sm text-muted">
                  Fill out the form and we&apos;ll receive your request instantly. Our team will
                  contact you soon.
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
