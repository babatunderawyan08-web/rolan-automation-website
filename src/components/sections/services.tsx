"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { BrandLogo } from "@/components/shared/brand-logo";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";
import { hasBrandLogo, SERVICE_BRAND } from "@/lib/brand-icons";
import { SoftwareShowcase, type ShowcaseSlide } from "@/components/features/software-showcase";

const AUTOMATION_SLIDES: ShowcaseSlide[] = [
  { src: "/screenshots/automation/n8n-workflow.png", title: "n8n Workflow Builder" },
  { src: "/screenshots/automation/make-scenario.png", title: "Make Scenario Editor" },
  { src: "/screenshots/automation/zapier-canvas.png", title: "Zapier Canvas" },
  { src: "/screenshots/automation/hubspot-crm.png", title: "HubSpot CRM" },
  { src: "/screenshots/automation/salesforce-dashboard.png", title: "Salesforce Dashboard" },
  { src: "/screenshots/automation/zoho-crm.png", title: "Zoho CRM" },
  { src: "/screenshots/automation/openai-playground.png", title: "OpenAI Playground" },
  { src: "/screenshots/automation/ai-chatbot.png", title: "AI Chatbot Dashboard" },
  { src: "/screenshots/automation/api-docs.png", title: "API Documentation" },
  { src: "/screenshots/automation/workflow-analytics.png", title: "Workflow Analytics" },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-background-alt">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Automation"
          title="Comprehensive automation solutions"
          subtitle="From workflow automation to AI agents and CRM integrations — systems that remove manual work."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <FadeIn>
            <StaggerContainer className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {services.slice(0, 10).map((service) => {
                const brand = SERVICE_BRAND[service.id];
                const useBrand = !!(brand && hasBrandLogo(brand));
                return (
                  <StaggerItem key={service.id}>
                    <Link
                      href={`/services/${service.id}`}
                      className="group flex gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-md"
                    >
                      <div
                        className={
                          useBrand
                            ? "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-transparent p-0"
                            : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white"
                        }
                      >
                        {useBrand && brand ? (
                          <BrandLogo name={brand} size={40} className="rounded-xl" />
                        ) : (
                          <DynamicIcon name={service.icon} className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm font-semibold leading-snug">
                          {service.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                          {service.description}
                        </p>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/services">
                  View all automation services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} direction="right" className="lg:sticky lg:top-28">
            <SoftwareShowcase slides={AUTOMATION_SLIDES} accent="secondary" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
