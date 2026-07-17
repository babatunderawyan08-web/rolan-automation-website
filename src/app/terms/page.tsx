import { PageHero } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "ROLAN AUTOMATION terms of service — the agreement governing use of our website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="Last updated: July 1, 2026" />
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl px-4 prose prose-lg text-muted">
          <h2 className="font-heading text-foreground text-xl font-bold">Agreement</h2>
          <p>By accessing {SITE.url}, you agree to these Terms of Service. If you disagree, please do not use our website or services.</p>
          <h2 className="font-heading text-foreground text-xl font-bold mt-8">Services</h2>
          <p>{SITE.name} provides automation consulting, development, and call center solutions. Specific terms for each engagement are outlined in individual project agreements.</p>
          <h2 className="font-heading text-foreground text-xl font-bold mt-8">Intellectual Property</h2>
          <p>All website content, branding, and proprietary methodologies remain the property of {SITE.name}. Client-specific deliverables are governed by project agreements.</p>
          <h2 className="font-heading text-foreground text-xl font-bold mt-8">Limitation of Liability</h2>
          <p>Our liability is limited to the amount paid for services in the preceding 12 months. We are not liable for indirect, incidental, or consequential damages.</p>
          <h2 className="font-heading text-foreground text-xl font-bold mt-8">Contact</h2>
          <p>Questions about these terms? Contact {SITE.email}.</p>
        </div>
      </section>
    </>
  );
}
