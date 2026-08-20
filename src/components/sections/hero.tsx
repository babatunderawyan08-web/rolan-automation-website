"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/animations";
import { HeroStage } from "@/components/sections/hero-stage";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-mesh pt-20 sm:pt-24 md:pt-28">
      <div className="pointer-events-none absolute inset-0 grid-fade" aria-hidden />
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -right-40 h-72 w-72 rounded-full bg-secondary/15 blur-3xl animate-pulse-glow sm:h-96 sm:w-96" />
        <div className="absolute -bottom-40 -left-40 h-72 w-72 rounded-full bg-accent/12 blur-3xl animate-pulse-glow sm:h-96 sm:w-96" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:gap-12 xl:gap-16">
          <FadeIn>
            <Badge variant="secondary" className="mb-4 border border-secondary/20 bg-secondary/10 text-secondary sm:mb-6">
              Creative technology studio
            </Badge>
            <h1 className="font-heading text-[1.85rem] font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.35rem]">
              Web applications with the finish of a{" "}
              <span className="gradient-text">real product</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg md:text-xl">
              ROLAN designs and builds premium digital products — dashboards, operations systems, and AI-powered applications you can actually use.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <Button variant="accent" size="lg" className="w-full min-h-12 sm:w-auto" asChild>
                <Link href="/portfolio">
                  Explore live demos <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full min-h-12 sm:w-auto" asChild>
                <Link href="/demo/voice">
                  <Play className="h-4 w-4" /> Open a product
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 sm:mt-10">
              {[
                { value: "6", label: "Live products" },
                { value: "12+", label: "Interactive views" },
                { value: "100%", label: "Built in-house" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-xl font-bold sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="right" className="w-full">
            <HeroStage />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
