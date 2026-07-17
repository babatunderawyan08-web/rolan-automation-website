import { PageHero } from "@/components/shared/page-hero";
import { PortfolioGrid } from "@/components/features/portfolio-grid";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Portfolio",
  description: "Explore ROLAN AUTOMATION portfolio — real automation and call center projects with measurable ROI.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects that deliver measurable ROI"
        subtitle="Explore our portfolio of automation and call center projects across industries."
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <PortfolioGrid />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
