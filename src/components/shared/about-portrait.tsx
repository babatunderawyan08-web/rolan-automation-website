"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type AboutPortraitProps = {
  className?: string;
  badge?: string;
};

export function AboutPortrait({ className, badge = "Rolan · Founder" }: AboutPortraitProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[320px] w-full overflow-hidden sm:min-h-[400px] lg:min-h-[480px]",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-secondary/30 to-accent/20 blur-2xl sm:-inset-4"
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-secondary/40 to-accent/30 opacity-80 sm:-inset-1"
      />
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-white/80 bg-primary shadow-[0_24px_64px_rgba(37,99,235,0.18)] dark:border-white/10">
        <div className="relative min-h-0 flex-1">
          <Image
            src="/images/rolan-portrait.jpg"
            alt="Rolan — AI Automation & Call Center Specialist"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover object-[center_20%]"
          />
        </div>
        {badge ? (
          <div className="absolute bottom-4 left-1/2 z-10 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur-sm sm:bottom-5 sm:px-4 sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-success animate-pulse" />
            <span className="truncate">{badge}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
