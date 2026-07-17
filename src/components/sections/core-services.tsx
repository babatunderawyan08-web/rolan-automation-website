"use client";

import Link from "next/link";
import { ArrowRight, Workflow, PhoneCall, Plug } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";

const core = [
  {
    title: "AI & Workflow Automation",
    description: "Eliminate repetitive work with intelligent workflows, AI agents, and business process automation.",
    href: "/services",
    icon: Workflow,
    accent: "secondary",
  },
  {
    title: "Call Center Solutions",
    description: "Enterprise telephony with 3CX, VICIdial, FreePBX, IVR, queues, and CRM-integrated call flows.",
    href: "/services#call-center",
    icon: PhoneCall,
    accent: "accent",
  },
  {
    title: "CRM & API Integration",
    description: "Connect your tools so leads, tickets, and data sync automatically across every platform you use.",
    href: "/services/api",
    icon: Plug,
    accent: "secondary",
  },
] as const;

export function CoreServices() {
  return (
    <section className="home-section">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Services"
          title="Three ways we transform your operations"
          subtitle="Focused expertise — explore full capabilities on our services page."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {core.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-secondary/30 hover:shadow-lg sm:p-6 md:p-8"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                      item.accent === "accent"
                        ? "bg-accent/10 text-accent"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/services">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
