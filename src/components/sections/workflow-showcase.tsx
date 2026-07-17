"use client";

import { workflows } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/animations";
import { ArrowDown } from "lucide-react";

const featured = workflows.filter((w) => w.id === "lead-to-deal" || w.id === "call-center");

export function WorkflowShowcase() {
  return (
    <section className="home-section bg-background-alt">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Workflow Showcase"
          title="Automation & call center in motion"
          subtitle="Two signature pipelines that show how we connect systems, people, and customers."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {featured.map((workflow, i) => (
            <FadeIn key={workflow.id} delay={i * 0.12}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 md:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                  {workflow.id === "call-center" ? "Call Center" : "Automation"}
                </p>
                <h3 className="font-heading text-lg font-semibold">{workflow.title}</h3>
                <p className="mt-2 text-sm text-muted">{workflow.description}</p>
                <div className="mt-6 flex flex-col items-center gap-1">
                  {workflow.steps.map((step, idx) => (
                    <div key={step} className="flex w-full flex-col items-center">
                      <div className="w-full rounded-xl border border-border bg-gradient-to-r from-secondary/10 to-accent/10 px-4 py-2.5 text-center text-sm font-medium">
                        {step}
                      </div>
                      {idx < workflow.steps.length - 1 && (
                        <ArrowDown className="my-1 h-4 w-4 text-muted" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
