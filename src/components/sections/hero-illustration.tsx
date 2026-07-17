"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Phone,
  Server,
  GitBranch,
  Users,
  BarChart3,
  MessageSquare,
  Plug,
  Cloud,
  Headphones,
  Bot,
  Activity,
} from "lucide-react";

const float = (delay = 0, y = 12) => ({
  y: [0, -y, 0],
  transition: { duration: 4 + delay * 0.3, repeat: Infinity, ease: "easeInOut" as const, delay },
});

function Node({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      animate={float(delay)}
      className={`absolute flex items-center justify-center rounded-xl border border-border bg-card/95 shadow-lg backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ConnectionLine({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#heroLineGrad)"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0.3 }}
      animate={{ pathLength: 1, opacity: [0.25, 0.7, 0.25] }}
      transition={{
        pathLength: { duration: 2, delay },
        opacity: { duration: 3, repeat: Infinity, delay },
      }}
    />
  );
}

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-x-clip px-1 sm:px-0 lg:max-w-none">
      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute right-0 top-8 h-48 w-48 rounded-full bg-secondary/15 blur-3xl sm:-right-8 sm:h-64 sm:w-64"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-4 left-0 h-40 w-40 rounded-full bg-accent/15 blur-3xl sm:-bottom-8 sm:h-56 sm:w-56"
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      {/* Rotating ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-secondary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      <motion.div
        className="relative aspect-[4/3.5] min-h-[340px] w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary/[0.06] via-card to-accent/[0.08] card-shadow-hover md:min-h-[420px] lg:min-h-[480px]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />

        {/* Connection lines SVG */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <linearGradient id="heroLineGrad" x1="0" y1="0" x2="600" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="1" stopColor="#2563EB" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <ConnectionLine d="M120 180 L240 140 L360 200 L480 160" delay={0} />
          <ConnectionLine d="M160 280 L280 240 L400 300 L520 260" delay={0.5} />
          <ConnectionLine d="M240 140 L280 240" delay={0.8} />
          <ConnectionLine d="M360 200 L400 300" delay={1} />
          {/* Animated pulse dots on lines */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r="4"
              fill="#06B6D4"
              animate={{
                cx: [120, 240, 360, 480],
                cy: [180, 140, 200, 160],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* Central dashboard hub */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 w-[58%] max-w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-md"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Live Dashboard</p>
            <span className="flex items-center gap-1 text-[10px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Active
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Workflows", val: "847" },
              { label: "AI Agents", val: "12" },
              { label: "Calls", val: "2.4k" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-background-alt p-2 text-center">
                <p className="text-sm font-bold text-secondary">{item.val}</p>
                <p className="text-[9px] text-muted">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-12 items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-secondary to-accent"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating nodes */}
        <Node className="left-[6%] top-[14%] h-11 w-11 text-secondary" delay={0}>
          <Brain className="h-5 w-5" />
        </Node>
        <Node className="right-[8%] top-[10%] h-10 w-10 text-accent" delay={0.4}>
          <Plug className="h-4 w-4" />
        </Node>
        <Node className="left-[4%] top-[48%] h-10 w-10 text-secondary" delay={0.8}>
          <GitBranch className="h-4 w-4" />
        </Node>
        <Node className="right-[5%] top-[42%] h-11 w-11 text-accent" delay={0.2}>
          <Phone className="h-5 w-5" />
        </Node>
        <Node className="left-[10%] bottom-[12%] h-10 w-10 text-secondary" delay={1}>
          <Users className="h-4 w-4" />
        </Node>
        <Node className="right-[10%] bottom-[14%] h-10 w-10 text-accent" delay={0.6}>
          <Server className="h-4 w-4" />
        </Node>
        <Node className="left-[22%] bottom-[8%] h-9 w-9 text-muted" delay={1.2}>
          <Cloud className="h-4 w-4" />
        </Node>
        <Node className="right-[22%] bottom-[6%] h-9 w-9 text-muted" delay={0.3}>
          <Headphones className="h-4 w-4" />
        </Node>

        {/* CRM card */}
        <motion.div
          animate={float(0.5, 8)}
          className="absolute left-[8%] top-[32%] z-10 rounded-xl border border-border bg-card/90 px-3 py-2 shadow-md backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-secondary" />
            <div>
              <p className="text-[10px] font-semibold">CRM Sync</p>
              <p className="text-[9px] text-success">+128 leads</p>
            </div>
          </div>
        </motion.div>

        {/* Chatbot bubble */}
        <motion.div
          animate={float(0.7, 10)}
          className="absolute right-[6%] top-[28%] z-10 max-w-[120px] rounded-xl rounded-tr-sm border border-border bg-card/90 px-3 py-2 shadow-md backdrop-blur-sm"
        >
          <div className="flex items-start gap-1.5">
            <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            <p className="text-[9px] leading-snug text-muted">AI agent resolved ticket #4821</p>
          </div>
        </motion.div>

        {/* 3CX / PBX badge */}
        <motion.div
          animate={float(0.9, 6)}
          className="absolute bottom-[22%] left-[38%] z-10 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[10px] font-semibold text-secondary"
        >
          3CX · VICIdial · PBX
        </motion.div>

        {/* Analytics mini card */}
        <motion.div
          animate={float(1.1, 7)}
          className="absolute right-[18%] top-[18%] z-10 flex items-center gap-1.5 rounded-lg border border-border bg-card/90 px-2 py-1.5 shadow-md"
        >
          <BarChart3 className="h-3.5 w-3.5 text-secondary" />
          <Activity className="h-3 w-3 text-success" />
          <span className="text-[9px] font-medium text-muted">99.9% uptime</span>
        </motion.div>

        {/* Pipeline label */}
        <motion.div
          className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-[10px] font-medium text-muted backdrop-blur-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <MessageSquare className="h-3 w-3 text-accent" />
          Automation + Call Center Pipeline
        </motion.div>
      </motion.div>

      {/* Floating stat badges */}
      <motion.div
        className="absolute bottom-2 left-2 rounded-2xl border border-border bg-card p-3 card-shadow-hover sm:bottom-0 sm:left-0 sm:p-4 md:-left-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xl font-bold text-success sm:text-2xl">+340%</p>
        <p className="text-[11px] text-muted sm:text-xs">Average client ROI</p>
      </motion.div>
      <motion.div
        className="absolute right-2 top-2 rounded-2xl border border-border bg-card p-3 card-shadow-hover sm:right-0 sm:top-0 sm:p-4 md:-right-2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <p className="text-xl font-bold text-secondary sm:text-2xl">24/7</p>
        <p className="text-[11px] text-muted sm:text-xs">Automated operations</p>
      </motion.div>
    </div>
  );
}
