import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/animations";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Full-bleed animated layer behind hero content */
  background?: ReactNode;
  /** Optional right-side media (two-column layout) */
  media?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  cta,
  secondaryCta,
  background,
  media,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden gradient-mesh pt-28 pb-14 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28">
      {background}

      <div
        className={cn(
          "container relative z-10 mx-auto px-4",
          media ? "max-w-7xl" : "max-w-6xl"
        )}
      >
        <div
          className={cn(
            media && "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16"
          )}
        >
          <FadeIn>
            {eyebrow && (
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "font-heading font-bold tracking-tight",
                media
                  ? "text-[1.875rem] leading-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]"
                  : "max-w-4xl text-[1.875rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "mt-4 text-base text-muted sm:mt-6 sm:text-lg md:text-xl",
                  media ? "max-w-xl" : "max-w-2xl"
                )}
              >
                {subtitle}
              </p>
            )}
            {(cta || secondaryCta) && (
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                {cta && (
                  <Button variant="accent" size="lg" className="w-full sm:w-auto" asChild>
                    <Link href={cta.href}>{cta.label}</Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </FadeIn>

          {media && (
            <FadeIn delay={0.15} direction="right" className="w-full lg:pl-2">
              {media}
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
