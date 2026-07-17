"use client";

import Link from "next/link";
import { ArrowRight, Play, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/animations";
import { HeroIllustration } from "@/components/sections/hero-illustration";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-mesh pt-24 md:pt-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse-glow" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 pb-16 pt-10 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-10 xl:gap-14">
          <FadeIn>
            <Badge variant="secondary" className="mb-6">Trusted by 180+ businesses worldwide</Badge>
            <h1 className="font-heading text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Enterprise automation that{" "}
              <span className="gradient-text">drives real ROI</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              AI automation, workflow engineering, and call center solutions —
              built for businesses that refuse to settle for ordinary.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <Button variant="accent" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/book-consultation">
                  Book Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/portfolio">
                  <Play className="h-4 w-4" /> View Portfolio
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-sm text-muted">4.9/5 from 120+ reviews</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Shield className="h-4 w-4 text-success" /> SOC 2 aligned practices
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="right" className="w-full">
            <HeroIllustration />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
