"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const THREE_CX_SLIDES = [
  { src: "/images/3cx/dashboard.svg", title: "3CX Dashboard" },
  { src: "/images/3cx/web-client.svg", title: "3CX Web Client" },
  { src: "/images/3cx/extensions.svg", title: "Extension Management" },
  { src: "/images/3cx/sip-trunks.svg", title: "SIP Trunks" },
  { src: "/images/3cx/ivr.svg", title: "IVR Configuration" },
  { src: "/images/3cx/call-queue.svg", title: "Call Queue" },
  { src: "/images/3cx/reports.svg", title: "Reports" },
  { src: "/images/3cx/analytics.svg", title: "Call Analytics" },
  { src: "/images/3cx/crm.svg", title: "CRM Integration" },
  { src: "/images/3cx/mobile-app.svg", title: "Mobile App" },
  { src: "/images/3cx/live-monitoring.svg", title: "Live Call Monitoring" },
  { src: "/images/3cx/call-flow.svg", title: "Call Flow Designer" },
] as const;

type ThreeCXCarouselProps = {
  className?: string;
  intervalMs?: number;
};

export function ThreeCXCarousel({ className, intervalMs = 4000 }: ThreeCXCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = THREE_CX_SLIDES.length;

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, paused, total]);

  const slide = THREE_CX_SLIDES[index];

  return (
    <div
      className={cn("relative mx-auto w-full max-w-[520px]", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:aspect-square sm:rounded-[24px]",
          "border border-white/60 bg-white",
          "shadow-[0_8px_40px_rgba(15,23,42,0.10),0_2px_8px_rgba(15,23,42,0.04)]",
          "ring-1 ring-black/[0.04] backdrop-blur-xl"
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[24px] ring-1 ring-inset ring-white/70" />

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={slide.src}
            custom={direction}
            initial={{ opacity: 0, x: direction * 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -28 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG/PNG placeholders from /public/images/3cx */}
            <img
              src={slide.src}
              alt={slide.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <p className="text-sm font-semibold tracking-wide text-white drop-shadow-sm md:text-base">
                {slide.title}
              </p>
              <p className="mt-1 text-xs text-white/70">
                {index + 1} / {total}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous screenshot"
          onClick={prev}
          className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/80 text-slate-700 shadow-md backdrop-blur-md transition hover:bg-white sm:left-3"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          onClick={next}
          className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/80 text-slate-700 shadow-md backdrop-blur-md transition hover:bg-white sm:right-3"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-0.5 rounded-full bg-black/25 px-1.5 py-1 backdrop-blur-sm sm:bottom-4 sm:gap-1 sm:px-2.5 sm:py-1.5">
          {THREE_CX_SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to ${s.title}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className="flex h-9 w-9 items-center justify-center sm:h-8 sm:w-8"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
