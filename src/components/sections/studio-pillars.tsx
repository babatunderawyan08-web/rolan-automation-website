"use client";

import { FadeIn } from "@/components/shared/animations";
import { SectionHeader } from "@/components/shared/section-header";
import { LayoutDashboard, Sparkles, PanelsTopLeft, LineChart } from "lucide-react";

const pillars = [
  {
    icon: PanelsTopLeft,
    title: "Product interfaces",
    description: "Application UIs with real navigation, states, and workflows — designed to be used, not just presented.",
  },
  {
    icon: LayoutDashboard,
    title: "Operational systems",
    description: "Inventory, bookings, property, and support tools with the structure of production software.",
  },
  {
    icon: Sparkles,
    title: "Applied intelligence",
    description: "AI where it belongs: voice agents, support drafts, and decision support inside the product.",
  },
  {
    icon: LineChart,
    title: "Live data experiences",
    description: "Dashboards, analytics, and animated operational views that make a product feel alive.",
  },
];

export function StudioPillars() {
  return (
    <section className="home-section bg-background-alt">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="The studio"
          title="A product house, not a service catalog"
          subtitle="ROLAN builds complete web applications — with craft, motion, and operational depth."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-0.5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
