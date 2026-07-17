import { PageHero } from "@/components/shared/page-hero";
import { ServicesSection } from "@/components/sections/services";
import { CallCenterSection } from "@/components/sections/call-center";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description: "Comprehensive automation services — workflow automation, AI agents, CRM integration, call center solutions, and more.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="End-to-end automation solutions"
        subtitle="From workflow automation to enterprise call center infrastructure — we build systems that transform how you operate."
        cta={{ label: "Book Consultation", href: "/book-consultation" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
      />
      <ServicesSection />
      <CallCenterSection />
      <CTABanner />
    </>
  );
}
