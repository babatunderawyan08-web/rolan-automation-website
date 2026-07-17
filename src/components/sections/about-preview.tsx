"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { AboutPortrait } from "@/components/shared/about-portrait";
import { FadeIn } from "@/components/shared/animations";
import { Button } from "@/components/ui/button";

const highlights = [
  "340+ automation projects delivered",
  "Certified across 10+ platforms",
  "24 countries served",
  "98% client satisfaction rate",
];

const pillars = [
  { label: "Mission", text: "Eliminate manual work so businesses can focus on growth." },
  { label: "Vision", text: "A world where every business runs on intelligent automation." },
  { label: "Values", text: "Excellence, transparency, security, and measurable results." },
  { label: "Approach", text: "Discover, design, build, launch — with you at every step." },
];

export function AboutPreview() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(280px,46%)_1fr] lg:gap-14">
          {/* Left: Portrait */}
          <FadeIn direction="left" className="h-full">
            <AboutPortrait className="mx-auto max-w-md lg:max-w-none lg:min-h-full" />
          </FadeIn>

          {/* Right: Content — same height as photo */}
          <FadeIn delay={0.15} direction="right" className="flex h-full flex-col justify-center">
            <SectionHeader
              eyebrow="About Me"
              title="We engineer automation that transforms businesses"
              subtitle="ROLAN AUTOMATION is a premium agency specializing in AI automation, workflow engineering, and enterprise call center solutions."
              align="left"
              className="mb-0"
            />
            <p className="mt-6 text-muted leading-relaxed">
              Founded on the belief that every business deserves Fortune 500-grade automation,
              we combine deep technical expertise with a boutique, white-glove service model.
              From startups to enterprises, we deliver systems that work while you sleep.
            </p>
            <ul className="mt-6 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-card p-5 card-shadow transition-shadow hover:card-shadow-hover"
                >
                  <p className="text-sm font-semibold text-secondary">{item.label}</p>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-8 w-fit" asChild>
              <Link href="/about">
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
