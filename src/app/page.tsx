import { HeroSection } from "@/components/sections/hero";
import { CapabilityIndex } from "@/components/sections/capability-index";
import { StudioPillars } from "@/components/sections/studio-pillars";
import { CTABanner } from "@/components/shared/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityIndex />
      <StudioPillars />
      <CTABanner />
    </>
  );
}
