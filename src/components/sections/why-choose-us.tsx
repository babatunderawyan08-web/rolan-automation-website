"use client";

import { whyChooseUs } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { FadeIn } from "@/components/shared/animations";

/** Homepage-focused reasons — keeps the section within one viewport */
const homeReasons = whyChooseUs.slice(0, 6);

export function WhyChooseUs() {
  return (
    <section className="home-section bg-background-alt">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Why Rolan Automation"
          title="Built for trust, speed, and measurable ROI"
          subtitle="Enterprise delivery without enterprise friction."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeReasons.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <DynamicIcon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
