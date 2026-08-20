"use client";

import { motion } from "framer-motion";

export function HeroStage() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] [perspective:1400px]">
      <div className="absolute -inset-8 rounded-[2.5rem] bg-secondary/20 blur-3xl animate-pulse-glow" />
      <motion.div
        initial={{ opacity: 0, rotateX: 18, rotateY: -16, y: 28 }}
        animate={{ opacity: 1, rotateX: 10, rotateY: -12, y: 0 }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_40px_80px_rgba(0,0,0,0.45)] [transform-style:preserve-3d]"
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
            <div className="mt-4 flex h-16 items-end gap-1.5">
              {[38, 52, 44, 68, 60, 82, 74, 96, 84, 110, 98, 124].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 8 }}
                  animate={{ height: h * 0.45 }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                  className="flex-1 rounded-sm bg-gradient-to-t from-blue-600 to-sky-400"
                />
              ))}
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
        initial={{ opacity: 0, y: 24, x: -12 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="absolute -left-2 top-[58%] w-[46%] max-w-[220px] animate-float rounded-2xl border border-white/10 bg-[#0b1220]/90 p-3 shadow-2xl backdrop-blur-md sm:-left-8 sm:w-52"
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
            initial={{ width: "18%" }}
            animate={{ width: ["18%", "86%", "42%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, x: 16 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="absolute -right-1 top-10 w-[44%] max-w-[200px] rounded-2xl border border-white/10 bg-[#0b1220]/90 p-3 shadow-2xl backdrop-blur-md sm:-right-6 sm:top-16 sm:w-48"
        style={{ animation: "float 7s ease-in-out infinite", animationDelay: "1s" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-300">Listing live</p>
        <p className="mt-2 text-sm font-medium text-white">Harbor Lofts 4B</p>
        <p className="text-[11px] text-white/55">$1.24M · 3 new leads</p>
      </motion.div>
    </div>
  );
}
