"use client";

import Link from "next/link";
import { industries } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function IndustriesSection() {
  return (
    <section className="section-padding bg-background-alt">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Industries"
          title="Automation for every sector"
          subtitle="Deep domain expertise across 13+ industries with tailored solutions for your unique challenges."
        />
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {industries.map((industry) => (
            <StaggerItem key={industry.id}>
              <div className="group rounded-2xl border border-border bg-card p-6 card-shadow transition-all hover:card-shadow-hover hover:-translate-y-1 hover:border-secondary/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <DynamicIcon name={industry.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold">{industry.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{industry.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/industries">Explore all industries <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
