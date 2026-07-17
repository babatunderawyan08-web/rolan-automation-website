"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AgentRole = "calling" | "receiving" | "idle";

type Agent = {
  id: number;
  role: AgentRole;
  delay: number;
  x: string;
  y: string;
  scale: number;
  tint: string;
};

/** Faceless multi-agent floor — positions are % of the stage */
const AGENTS: Agent[] = [
  { id: 1, role: "calling", delay: 0, x: "8%", y: "18%", scale: 1, tint: "#2563EB" },
  { id: 2, role: "receiving", delay: 0.4, x: "28%", y: "12%", scale: 0.95, tint: "#06B6D4" },
  { id: 3, role: "idle", delay: 0.2, x: "48%", y: "20%", scale: 1.05, tint: "#2563EB" },
  { id: 4, role: "calling", delay: 0.8, x: "68%", y: "10%", scale: 0.9, tint: "#06B6D4" },
  { id: 5, role: "receiving", delay: 0.15, x: "88%", y: "16%", scale: 1, tint: "#2563EB" },
  { id: 6, role: "receiving", delay: 0.6, x: "16%", y: "52%", scale: 1.1, tint: "#06B6D4" },
  { id: 7, role: "calling", delay: 1.1, x: "38%", y: "48%", scale: 1, tint: "#2563EB" },
  { id: 8, role: "idle", delay: 0.35, x: "58%", y: "55%", scale: 0.95, tint: "#06B6D4" },
  { id: 9, role: "calling", delay: 0.9, x: "78%", y: "46%", scale: 1.05, tint: "#2563EB" },
  { id: 10, role: "receiving", delay: 0.5, x: "94%", y: "58%", scale: 0.85, tint: "#06B6D4" },
];

function SoundWaves({ active, color }: { active: boolean; color: string }) {
  if (!active) return null;
  return (
    <div className="absolute -right-3 top-2 flex flex-col gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-0.5 rounded-full"
          style={{ backgroundColor: color, width: 6 + i * 4 }}
          animate={{ opacity: [0.25, 1, 0.25], scaleX: [0.7, 1.15, 0.7] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function IncomingRing({ active, color }: { active: boolean; color: string }) {
  if (!active) return null;
  return (
    <motion.span
      className="absolute -left-1 -top-1 h-3 w-3 rounded-full border-2"
      style={{ borderColor: color }}
      animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

function FacelessAgent({ agent }: { agent: Agent }) {
  const isCalling = agent.role === "calling";
  const isReceiving = agent.role === "receiving";

  return (
    <motion.div
      className="absolute"
      style={{ left: agent.x, top: agent.y, scale: agent.scale }}
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3.8 + agent.delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay: agent.delay,
      }}
    >
      <div className="relative w-[72px]">
        {/* Desk */}
        <div className="absolute bottom-0 left-1/2 h-2 w-16 -translate-x-1/2 rounded-sm bg-slate-300/50 dark:bg-slate-600/40" />
        {/* Monitor */}
        <motion.div
          className="absolute bottom-2 left-1/2 h-7 w-10 -translate-x-1/2 rounded-sm border border-slate-300/60 bg-slate-200/70 dark:border-slate-500/50 dark:bg-slate-700/50"
          animate={{ opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: agent.delay }}
        >
          <div
            className="absolute inset-x-1 top-1 h-1 rounded-full opacity-70"
            style={{ backgroundColor: agent.tint }}
          />
          <div className="absolute inset-x-1 top-3 h-0.5 rounded-full bg-slate-400/40" />
          <div className="absolute inset-x-1 top-[18px] h-0.5 w-1/2 rounded-full bg-slate-400/30" />
        </motion.div>

        {/* Body / shoulders — faceless */}
        <div className="relative mx-auto mb-8 flex w-11 flex-col items-center">
          {/* Headset band */}
          <div
            className="absolute top-1 h-5 w-9 rounded-t-full border-2 border-b-0"
            style={{ borderColor: agent.tint }}
          />
          {/* Head — no face */}
          <motion.div
            className="relative z-10 mt-2 h-7 w-7 rounded-full"
            style={{ backgroundColor: `${agent.tint}33` }}
            animate={
              isCalling
                ? { rotate: [-2, 2, -2] }
                : isReceiving
                  ? { scale: [1, 1.04, 1] }
                  : { y: [0, -1, 0] }
            }
            transition={{ duration: isCalling ? 1.6 : 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Mic boom */}
            <span
              className="absolute -right-1 bottom-0 h-2.5 w-2.5 rounded-full border-2 bg-transparent"
              style={{ borderColor: agent.tint }}
            />
            <IncomingRing active={isReceiving} color={agent.tint} />
            <SoundWaves active={isCalling} color={agent.tint} />
          </motion.div>

          {/* Shoulders */}
          <div
            className="mt-0.5 h-5 w-10 rounded-t-2xl"
            style={{ backgroundColor: `${agent.tint}28` }}
          />
        </div>

        {/* Role chip */}
        <motion.p
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-wider"
          style={{ color: agent.tint }}
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: agent.delay }}
        >
          {isCalling ? "Calling" : isReceiving ? "Receiving" : "Ready"}
        </motion.p>
      </div>
    </motion.div>
  );
}

type CallCenterBackgroundProps = {
  className?: string;
};

/**
 * Animated faceless call-center floor for hero backgrounds.
 * Agents call / receive with subtle motion — no faces, no photos.
 */
export function CallCenterBackground({ className }: CallCenterBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      {/* Soft stage wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 via-transparent to-accent/10" />
      <div className="absolute inset-y-0 right-0 w-[70%] bg-gradient-to-l from-secondary/[0.06] to-transparent" />

      {/* Connection lines between agents */}
      <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
        <motion.path
          d="M120 140 C 280 80, 420 200, 560 120"
          fill="none"
          stroke="#2563EB"
          strokeWidth="1"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M200 320 C 360 260, 520 360, 700 280"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, 28] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Agent floor */}
      <div className="absolute inset-0 origin-center scale-[0.85] sm:scale-95 md:scale-100 lg:translate-x-[8%]">
        {AGENTS.map((agent) => (
          <FacelessAgent key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Readability veil over animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/35 md:via-background/70 md:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/80 to-transparent" />
    </div>
  );
}

/** @deprecated Prefer CallCenterBackground — kept for import compatibility */
export const CallCenterSlideshow = CallCenterBackground;
