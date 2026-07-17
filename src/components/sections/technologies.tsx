"use client";

import { technologies } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { BrandChip } from "@/components/shared/brand-logo";

export function TechnologiesSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Technologies"
          title="Built with industry-leading tools"
          subtitle="We master the platforms that power modern business automation."
        />
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <BrandChip key={tech} name={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
