"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLiveTourLabel, getLiveTourSlides, type LiveTourSlide } from "@/data/live-tour-slides";

type ServiceLiveTourProps = {
  serviceId: string;
  className?: string;
  intervalMs?: number;
  /** Optional override slides (defaults from service map). */
  slides?: LiveTourSlide[];
};

export function ServiceLiveTour({
  serviceId,
  className,
  intervalMs = 4000,
  slides: slidesProp,
}: ServiceLiveTourProps) {
  const slides = slidesProp ?? getLiveTourSlides(serviceId);
  const label = getLiveTourLabel(serviceId);
  const total = slides.length;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

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
    if (paused || total <= 1) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, paused, total]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement) && document.activeElement !== el) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    setPaused(false);
    if (start == null) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const delta = end - start;
    if (Math.abs(delta) < 40) return;
    // Swipe left → next (slides move right-to-left)
    if (delta < 0) next();
    else prev();
  };

  const slide = slides[index];
  if (!slide) return null;

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn(
        "relative mx-auto w-full max-w-[560px] outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2",
        className
      )}
      onMouseEnter={() => {
        setPaused(true);
        rootRef.current?.focus({ preventScroll: true });
      }}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={() => rootRef.current?.focus({ preventScroll: true })}
    >
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary sm:mb-3 sm:text-left">
        {label}
      </p>

      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden rounded-[20px] sm:rounded-[24px]",
          "border border-white/60 bg-slate-100",
          "shadow-[0_8px_40px_rgba(15,23,42,0.10),0_2px_8px_rgba(15,23,42,0.04)]",
          "ring-1 ring-black/[0.04]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[24px] ring-1 ring-inset ring-white/70" />

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={slide.src + index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute inset-0 flex h-full w-full items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local tour screenshots */}
            <img
              src={slide.src}
              alt={slide.title}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-contain object-center"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
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
          className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/85 text-slate-700 shadow-md backdrop-blur-md transition hover:bg-white sm:left-3"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          onClick={next}
          className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/85 text-slate-700 shadow-md backdrop-blur-md transition hover:bg-white sm:right-3"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-30 flex max-w-[90%] -translate-x-1/2 gap-0.5 overflow-x-auto rounded-full bg-black/30 px-1.5 py-1 backdrop-blur-sm sm:bottom-4 sm:gap-1 sm:px-2.5 sm:py-1.5">
          {slides.map((s, i) => (
            <button
              key={`${s.src}-${i}`}
              type="button"
              aria-label={`Go to ${s.title}`}
              aria-current={i === index}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className="flex h-9 min-w-9 shrink-0 items-center justify-center sm:h-8 sm:min-w-8"
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

/** Back-compat alias for the original 3CX Live Tour. */
export function ThreeCXCarousel(props: Omit<ServiceLiveTourProps, "serviceId">) {
  return <ServiceLiveTour serviceId="3cx" {...props} />;
}
