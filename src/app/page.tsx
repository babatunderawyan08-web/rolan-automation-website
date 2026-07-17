import { HeroSection } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { CoreServices } from "@/components/sections/core-services";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CTABanner } from "@/components/shared/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <CoreServices />
      <PortfolioPreview />
      <WhyChooseUs />
      <CTABanner />
    </>
  );
}
