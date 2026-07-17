"use client";

import { BrandLogo } from "@/components/shared/brand-logo";
import { TECH_SHOWCASE_LOGOS } from "@/lib/brand-icons";

export function TechMarquee() {
  const logos = [...TECH_SHOWCASE_LOGOS];
  const loop = [...logos, ...logos];

  return (
    <section className="border-y border-border bg-background-alt/50 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <p className="mb-8 text-center text-sm font-medium text-muted">
          Powered by the tools industry leaders trust
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background-alt to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background-alt to-transparent md:w-24" />
        <div className="flex w-max animate-marquee items-center gap-10 px-6 md:gap-14">
          {loop.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="flex h-12 shrink-0 items-center gap-3 opacity-70 transition-opacity hover:opacity-100"
              title={tech}
            >
              <BrandLogo name={tech} size={36} />
              <span className="whitespace-nowrap text-sm font-medium text-muted">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
