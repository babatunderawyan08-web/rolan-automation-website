import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/features/contact-form";
import { ContactMethods } from "@/components/features/contact-methods";
import { FadeIn } from "@/components/shared/animations";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with ROLAN AUTOMATION via WhatsApp, Telegram, Discord, or email. We respond within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something extraordinary"
        subtitle="Tell us about your project and we'll respond within 24 hours with next steps."
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-5 card-shadow sm:p-6 md:p-8">
              <h2 className="font-heading mb-6 text-xl font-semibold">Send us a message</h2>
              <ContactForm />
            </div>
          </FadeIn>

          <div className="mt-16">
            <FadeIn delay={0.15}>
              <div className="mb-8 text-center">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">Direct Contact</p>
                <h2 className="font-heading text-2xl font-bold">Reach us on your preferred channel</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <ContactMethods />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
