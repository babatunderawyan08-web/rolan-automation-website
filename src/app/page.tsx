import { HeroSection } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { StudioPillars } from "@/components/sections/studio-pillars";
import { CTABanner } from "@/components/shared/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <ProductShowcase />
      <StudioPillars />
      <CTABanner />
    </>
  );
}
