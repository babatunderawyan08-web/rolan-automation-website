"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LiveBars } from "@/components/shared/live-bars";

const PULSE_BARS = [38, 52, 44, 68, 60, 82, 74, 96, 84, 110, 98, 124];

export function HeroStage() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[640px] pb-12 pt-8 sm:pb-10 sm:pt-9 [perspective:1400px]">
      <div className="absolute -inset-8 rounded-[2.5rem] bg-secondary/20 blur-3xl animate-pulse-glow" />
      <motion.div
        initial={{ opacity: 0, rotateX: 18, rotateY: -16, y: 28 }}
        animate={{ opacity: 1, rotateX: 10, rotateY: -12, y: 0 }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_40px_80px_rgba(0,0,0,0.45)] [transform-style:preserve-3d]"
      >
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/4 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 text-[11px] font-medium tracking-wide text-white/50">ROLAN Pulse · Live operations</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-[1.1fr_0.9fr] sm:p-5">
          <div className="rounded-xl border border-white/8 bg-white/4 p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">Revenue</p>
            <p className="mt-2 font-heading text-3xl font-bold text-white">$284,610</p>
            <p className="mt-1 text-xs text-emerald-400">+18.4% this month</p>
            <div className="mt-4 h-16 [transform:rotateX(14deg)] [transform-style:preserve-3d]">
              <LiveBars values={PULSE_BARS} />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Active products", value: "6" },
              { label: "Open tickets", value: "12" },
              { label: "Bookings today", value: "28" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-4 py-3">
                <span className="text-xs text-white/55">{item.label}</span>
                <span className="font-heading text-lg font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, x: -10 }}
        animate={reduce ? undefined : { opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 0.4, duration: 0.55 },
          x: { delay: 0.4, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
          y: { delay: 1.1, duration: 6.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute bottom-1 left-0 z-20 w-[44%] max-w-[188px] rounded-2xl border border-white/10 bg-[#0b1220]/92 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:bottom-0 sm:-left-7 sm:w-48"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-300">Incoming</span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        </div>
        <p className="text-sm font-medium text-white">Northshore Clinic</p>
        <p className="mt-1 text-[11px] text-white/55">Ava is booking a cleaning for Thursday 10:30</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-sky-400"
            initial={reduce ? { width: "62%" } : { width: "18%" }}
            animate={reduce ? { width: "62%" } : { width: ["18%", "86%", "42%"] }}
            transition={reduce ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: 28, y: -8 }}
        animate={reduce ? undefined : { opacity: [0, 1, 1], x: 0, y: [0, -4, 0] }}
        transition={{
          opacity: { delay: 1.05, duration: 0.55, times: [0, 0.2, 1] },
          x: { delay: 1.05, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
          y: { delay: 1.8, duration: 7.4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute right-0 top-1 z-20 w-[32%] max-w-[128px] rounded-xl border border-white/10 bg-[#0b1220]/92 p-2 shadow-[0_14px_32px_rgba(0,0,0,0.4)] backdrop-blur-md sm:right-0 sm:top-2 sm:max-w-[138px] sm:p-2.5"
      >
        <p className="text-[9px] font-semibold uppercase tracking-widest text-amber-300">Listing live</p>
        <p className="mt-1.5 text-xs font-medium leading-snug text-white">Harbor Lofts 4B</p>
        <p className="mt-0.5 text-[10px] text-white/55">$1.24M · 3 new leads</p>
      </motion.div>
    </div>
  );
}
