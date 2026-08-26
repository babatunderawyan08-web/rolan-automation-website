"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { HeroPortrait } from "@/components/sections/hero-portrait";
import { cn } from "@/lib/utils";

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "OpenAI",
  "n8n",
  "Make",
  "Zapier",
  "Vercel",
  "Figma",
  "GitHub",
  "Stripe",
  "Twilio",
] as const;

const INVERT_ON_DARK = new Set(["Next.js", "GitHub", "Vercel"]);

export function HeroSection() {
  const reduce = useReducedMotion();
  const ticker = [...STACK, ...STACK];

  return (
    <section className="relative overflow-x-clip pt-20 sm:pt-24 md:pt-28">
      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 py-8 sm:gap-12 sm:py-10 lg:grid-cols-12 lg:gap-6 lg:py-8">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
              Rolan · Digital product builder
            </p>
            <h1 className="mt-5 max-w-[14ch] font-heading text-[2.4rem] font-semibold leading-[0.96] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.65rem] xl:text-[4.15rem]">
              I take an idea and turn it into something you can use.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Ideas, business problems, and product concepts become working websites, web applications, and digital products. AI and automation can live inside that work when they help. They are not the identity of it.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="outline" size="lg" className="w-full min-h-12 sm:w-auto" asChild>
                <a href="#selected-work">View selected work</a>
              </Button>
              <Button variant="default" size="lg" className="w-full min-h-12 sm:w-auto" asChild>
                <Link href="/contact">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-7 lg:justify-end">
            <HeroPortrait />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        {reduce ? (
          <div className="container mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-5">
            {STACK.map((name) => (
              <MarqueeItem key={name} name={name} />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden py-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-20" />
            <div className="flex w-max animate-marquee-slow items-center">
              {ticker.map((name, index) => (
                <MarqueeItem key={`${name}-${index}`} name={name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function MarqueeItem({ name }: { name: string }) {
  return (
    <span className="mx-4 inline-flex shrink-0 items-center gap-2.5 sm:mx-6">
      <BrandLogo
        name={name}
        size={22}
        className={cn(INVERT_ON_DARK.has(name) && "dark:brightness-0 dark:invert")}
      />
      <span className="whitespace-nowrap text-sm font-medium text-muted">{name}</span>
    </span>
  );
}
