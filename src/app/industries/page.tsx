import { PageHero } from "@/components/shared/page-hero";
import { IndustriesSection } from "@/components/sections/industries";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Industries",
  description: "Automation solutions tailored for healthcare, real estate, finance, ecommerce, education, logistics, and 7 more industries.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Automation expertise across every sector"
        subtitle="Deep domain knowledge means faster delivery and better results for your industry."
        cta={{ label: "Discuss Your Industry", href: "/contact" }}
      />
      <IndustriesSection />
      <CTABanner />
    </>
  );
}
