"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ShowcaseSlide = {
  src: string;
  title: string;
};

type SoftwareShowcaseProps = {
  slides: ShowcaseSlide[];
  accent?: "secondary" | "accent";
  intervalMs?: number;
  className?: string;
};

/**
 * Premium browser-mockup screenshot carousel (Stripe/Linear style).
 * Autoplay, pause on hover, swipe on touch, pagination dots.
 */
export function SoftwareShowcase({
  slides,
  accent = "secondary",
  intervalMs = 4000,
  className,
}: SoftwareShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = slides.length;
  const slide = slides[index];
  const ring = accent === "accent" ? "ring-accent/20" : "ring-secondary/20";

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setInterval(() => go(index + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [go, index, intervalMs, paused, total]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    go(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Browser / laptop chrome */}
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border bg-card",
          "shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-1",
          ring
        )}
      >
        <div className="flex items-center gap-2 border-b border-border bg-background-alt/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          <div className="ml-3 flex-1 truncate rounded-md bg-background px-3 py-1 text-center text-[11px] text-muted">
            {slide.title}
          </div>
        </div>

        <div className="relative aspect-[16/10] bg-background-alt">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.title}
                className="h-full w-full object-cover object-top"
                draggable={false}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="text-sm font-semibold text-white drop-shadow-sm md:text-base">
                  {slide.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-1">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show ${s.title}`}
            onClick={() => go(i)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? accent === "accent"
                    ? "w-6 bg-accent"
                    : "w-6 bg-secondary"
                  : "w-1.5 bg-border"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
