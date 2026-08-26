"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type LiveBarsProps = {
  values: number[];
  className?: string;
  tone?: "blue" | "rose" | "emerald";
};

const TONES = {
  blue: {
    background:
      "linear-gradient(180deg, #dbeafe 0%, #7dd3fc 18%, #38bdf8 42%, #2563eb 78%, #1d4ed8 100%)",
    shadow:
      "0 8px 18px -8px rgba(37, 99, 235, 0.55), inset 0 1px 0 rgba(255,255,255,0.55), inset -3px 0 6px rgba(15, 23, 42, 0.22)",
  },
  rose: {
    background:
      "linear-gradient(180deg, #fecdd3 0%, #fb7185 40%, #e11d48 100%)",
    shadow:
      "0 8px 18px -8px rgba(244, 63, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset -3px 0 6px rgba(15, 23, 42, 0.2)",
  },
  emerald: {
    background:
      "linear-gradient(180deg, #d1fae5 0%, #6ee7b7 28%, #34d399 58%, #059669 100%)",
    shadow:
      "0 8px 18px -8px rgba(5, 150, 105, 0.45), inset 0 1px 0 rgba(255,255,255,0.45), inset -3px 0 6px rgba(15, 23, 42, 0.2)",
  },
};

export function LiveBars({ values, className, tone = "blue" }: LiveBarsProps) {
  const reduce = useReducedMotion();
  const max = Math.max(...values, 1);
  const palette = TONES[tone];

  return (
    <div
      className={cn(
        "flex h-full items-end gap-1.5 [transform-style:preserve-3d] [perspective:420px]",
        className
      )}
      aria-hidden
    >
      {values.map((value, index) => {
        const base = Math.max(0.18, value / max);
        const lift = 0.045 + (index % 5) * 0.012;
        const duration = 3.8 + (index % 6) * 0.45;
        const delay = 0.28 + index * 0.055;

        return (
          <div key={index} className="relative h-full min-w-0 flex-1">
            <motion.div
              className="absolute inset-x-0 bottom-0 origin-bottom rounded-[3px]"
              style={{
                height: "100%",
                background: palette.background,
                boxShadow: palette.shadow,
                transformOrigin: "bottom center",
              }}
              initial={{ scaleY: reduce ? base : 0.08 }}
              animate={
                reduce
                  ? { scaleY: base }
                  : {
                      scaleY: [base, base + lift, base - lift * 0.55, base + lift * 0.35, base],
                    }
              }
              transition={
                reduce
                  ? { duration: 0.5, delay: Math.min(delay, 0.4) }
                  : {
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <span
                className="pointer-events-none absolute inset-y-0 left-0 w-[38%] rounded-l-[3px] bg-gradient-to-r from-white/35 to-transparent"
                aria-hidden
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export function useLiveSeries<T extends { value: number }>(base: T[], amplitude = 0.035) {
  const reduce = useReducedMotion();
  const [data, setData] = useState(base);

  useEffect(() => {
    setData(base);
    if (reduce) return;

    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      setData(
        base.map((row, index) => ({
          ...row,
          value: Math.round(row.value * (1 + Math.sin(frame / 3.4 + index * 0.65) * amplitude)),
        }))
      );
    }, 1700);

    return () => window.clearInterval(id);
  }, [amplitude, base, reduce]);

  return data;
}
