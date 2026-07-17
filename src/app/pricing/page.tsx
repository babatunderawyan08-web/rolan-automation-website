import { PageHero } from "@/components/shared/page-hero";
import { PricingGrid } from "@/components/features/pricing-grid";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Transparent automation agency pricing — starter, professional, and enterprise packages from ROLAN AUTOMATION.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Transparent pricing, exceptional value"
        subtitle="Enterprise-quality automation at competitive rates. Every plan includes documentation and support."
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <PricingGrid />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
