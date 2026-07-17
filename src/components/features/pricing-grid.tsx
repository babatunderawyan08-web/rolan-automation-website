"use client";

import Link from "next/link";
import { useState } from "react";
import { pricingTiers } from "@/data/site-data";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";
import { cn } from "@/lib/utils";

export function PricingGrid() {
  const [billing, setBilling] = useState<"project" | "monthly">("project");

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setBilling("project")}
          className={cn(
            "min-h-11 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
            billing === "project" ? "bg-secondary text-white" : "text-muted hover:bg-background-alt"
          )}
        >
          Per Project
        </button>
        <button
          type="button"
          onClick={() => setBilling("monthly")}
          className={cn(
            "min-h-11 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
            billing === "monthly" ? "bg-secondary text-white" : "text-muted hover:bg-background-alt"
          )}
        >
          Monthly Retainer
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {pricingTiers.map((tier, i) => (
          <FadeIn key={tier.id} delay={i * 0.1}>
            <div
              className={cn(
                "flex h-full flex-col rounded-2xl border p-5 sm:p-6 lg:p-8",
                tier.highlighted
                  ? "border-secondary bg-secondary/5 card-shadow-hover lg:scale-105"
                  : "border-border bg-card card-shadow"
              )}
            >
              {tier.highlighted && <span className="mb-4 inline-block self-start rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">Most Popular</span>}
              <h3 className="font-heading text-xl font-bold">{tier.name}</h3>
              <p className="mt-2 text-3xl font-bold">
                {billing === "monthly" && tier.id !== "enterprise"
                  ? tier.price.replace("2,500", "800").replace("7,500", "2,500")
                  : tier.price}
                <span className="text-sm font-normal text-muted">/{billing === "monthly" ? "mo" : tier.period}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-success mt-0.5" />{f}</li>
                ))}
              </ul>
              <Button variant={tier.highlighted ? "accent" : "outline"} className="mt-8 w-full" asChild>
                <Link href="/book-consultation">{tier.cta}</Link>
              </Button>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
