"use client";

import { FadeIn } from "@/components/shared/animations";
import { SectionHeader } from "@/components/shared/section-header";
import { LayoutDashboard, Sparkles, PanelsTopLeft, LineChart } from "lucide-react";

const principles = [
  {
    icon: PanelsTopLeft,
    title: "Built to be used",
    description: "Real navigation, states, actions, and flows, not just screens designed to look good in a presentation.",
  },
  {
    icon: LayoutDashboard,
    title: "Designed around the workflow",
    description: "The product follows how people and businesses actually work instead of forcing everything into a generic template.",
  },
  {
    icon: Sparkles,
    title: "Intelligence where it helps",
    description: "AI, automation, and integrations are added when they remove a real step or make the experience more useful.",
  },
  {
    icon: LineChart,
    title: "Ready to grow",
    description: "Products are structured so new features, users, workflows, and integrations can be added as the idea develops.",
  },
];

export function StudioPillars() {
  return (
    <section className="home-section bg-background-alt">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="The approach"
          title="Built around how the product actually works."
          subtitle="A good product is more than a collection of screens. The interface, workflow, logic, and technology should work together around the people using it and the problem it is meant to solve."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <FadeIn key={principle.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-0.5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <principle.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{principle.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
