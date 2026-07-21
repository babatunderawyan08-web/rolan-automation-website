"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Archive,
  AudioLines,
  Award,
  BarChart3,
  Bell,
  Blocks,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Building2,
  Calendar,
  CalendarCheck,
  Cable,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  Code2,
  Cog,
  Database,
  Disc,
  Download,
  Compass,
  Eye,
  FastForward,
  FileOutput,
  FilePlus,
  FileText,
  Filter,
  Gauge,
  Gem,
  GitBranch,
  Globe,
  HardDrive,
  Headphones,
  Home,
  Image,
  Inbox,
  Kanban,
  Keyboard,
  Landmark,
  Laptop,
  Layers,
  Lightbulb,
  LineChart,
  List,
  ListOrdered,
  ListTree,
  Lock,
  Mail,
  Map as MapIcon,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Mic,
  Monitor,
  MonitorSmartphone,
  MousePointerClick,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  Plug,
  Puzzle,
  Radar,
  Radio,
  RefreshCw,
  Repeat,
  Rocket,
  Route,
  ScanSearch,
  ScanText,
  ScrollText,
  Search,
  Send,
  Server,
  Settings,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Split,
  StepForward,
  Target,
  TrendingUp,
  Trophy,
  Upload,
  User,
  UserPlus,
  Users,
  Volume2,
  Wifi,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroAccent, ServiceWorkflowDef, WorkflowNodeDef } from "./types";

const ICONS: Record<string, LucideIcon> = {
  Activity,
  Archive,
  AudioLines,
  Award,
  BarChart3,
  Bell,
  Blocks,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Building2,
  Calendar,
  CalendarCheck,
  Cable,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  Code2,
  Cog,
  Database,
  Disc,
  Download,
  Compass,
  Eye,
  FastForward,
  FileOutput,
  FilePlus,
  FileText,
  Filter,
  Gauge,
  Gem,
  GitBranch,
  Globe,
  HardDrive,
  Headphones,
  Home,
  Image,
  Inbox,
  Kanban,
  Keyboard,
  Landmark,
  Laptop,
  Layers,
  Lightbulb,
  LineChart,
  List,
  ListOrdered,
  ListTree,
  Lock,
  Mail,
  Map: MapIcon,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Mic,
  Monitor,
  MonitorSmartphone,
  MousePointerClick,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  Plug,
  Puzzle,
  Radar,
  Radio,
  RefreshCw,
  Repeat,
  Rocket,
  Route,
  ScanSearch,
  ScanText,
  ScrollText,
  Search,
  Send,
  Server,
  Settings,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Split,
  StepForward,
  Target,
  TrendingUp,
  Trophy,
  Upload,
  User,
  UserPlus,
  Users,
  Volume2,
  Wifi,
  Wrench,
  Zap,
};

const ACCENT: Record<
  HeroAccent,
  { solid: string; soft: string; glow: string; line: string }
> = {
  blue: {
    solid: "#2563eb",
    soft: "rgba(37,99,235,0.12)",
    glow: "rgba(37,99,235,0.35)",
    line: "#60a5fa",
  },
  cyan: {
    solid: "#06b6d4",
    soft: "rgba(6,182,212,0.12)",
    glow: "rgba(6,182,212,0.35)",
    line: "#22d3ee",
  },
  emerald: {
    solid: "#10b981",
    soft: "rgba(16,185,129,0.12)",
    glow: "rgba(16,185,129,0.35)",
    line: "#34d399",
  },
  violet: {
    solid: "#7c3aed",
    soft: "rgba(124,58,237,0.12)",
    glow: "rgba(124,58,237,0.35)",
    line: "#a78bfa",
  },
  amber: {
    solid: "#d97706",
    soft: "rgba(217,119,6,0.12)",
    glow: "rgba(217,119,6,0.35)",
    line: "#fbbf24",
  },
  rose: {
    solid: "#e11d48",
    soft: "rgba(225,29,72,0.12)",
    glow: "rgba(225,29,72,0.35)",
    line: "#fb7185",
  },
  slate: {
    solid: "#475569",
    soft: "rgba(71,85,105,0.12)",
    glow: "rgba(71,85,105,0.3)",
    line: "#94a3b8",
  },
};

type Point = { x: number; y: number };

function layoutPositions(
  layout: ServiceWorkflowDef["layout"],
  count: number,
  w: number,
  h: number
): Point[] {
  const padX = 72;
  const padY = 70;
  const usableW = w - padX * 2;
  const usableH = h - padY * 2;

  if (layout === "hub" && count >= 3) {
    const cx = w / 2;
    const cy = h / 2 - 8;
    const r = Math.min(usableW, usableH) * 0.34;
    return Array.from({ length: count }, (_, i) => {
      if (i === 1) return { x: cx, y: cy };
      const idx = i === 0 ? 0 : i - 1;
      const n = count - 1;
      const angle = -Math.PI / 2 + (idx / n) * Math.PI * 2;
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.85 };
    });
  }

  if (layout === "funnel") {
    return Array.from({ length: count }, (_, i) => ({
      x: w / 2 + (i % 2 === 0 ? -28 : 28) * (i > 0 ? 1 : 0),
      y: padY + (usableH / Math.max(count - 1, 1)) * i,
    }));
  }

  if (layout === "pipeline") {
    return Array.from({ length: count }, (_, i) => ({
      x: padX + (usableW / Math.max(count - 1, 1)) * i,
      y: h * 0.42 + (i % 2 === 0 ? -18 : 22),
    }));
  }

  if (layout === "dial") {
    const cx = w * 0.42;
    const cy = h * 0.5;
    const r = Math.min(usableW, usableH) * 0.36;
    return Array.from({ length: count }, (_, i) => {
      const angle = -Math.PI * 0.85 + (i / Math.max(count - 1, 1)) * Math.PI * 1.3;
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.72 };
    });
  }

  if (layout === "mesh") {
    const cols = 2;
    return Array.from({ length: count }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const rows = Math.ceil(count / cols);
      return {
        x: padX + 40 + (usableW - 40) * (col / Math.max(cols - 1, 1)),
        y: padY + 20 + (usableH - 20) * (row / Math.max(rows - 1, 1)),
      };
    });
  }

  if (layout === "radar") {
    return Array.from({ length: count }, (_, i) => ({
      x: padX + (usableW / Math.max(count - 1, 1)) * i,
      y: h * 0.58 - Math.sin((i / Math.max(count - 1, 1)) * Math.PI) * 70,
    }));
  }

  // flow
  return Array.from({ length: count }, (_, i) => ({
    x: padX + (usableW / Math.max(count - 1, 1)) * i,
    y: h * 0.46 + Math.sin(i * 1.1) * 18,
  }));
}

function curvePath(a: Point, b: Point) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const nx = (-dy) * 0.12;
  const ny = dx * 0.08;
  return `M ${a.x} ${a.y} Q ${mx + nx} ${my + ny} ${b.x} ${b.y}`;
}

function NodeCard({
  node,
  point,
  accent,
  activeIndex,
  index,
  reduce,
}: {
  node: WorkflowNodeDef;
  point: Point;
  accent: HeroAccent;
  activeIndex: number;
  index: number;
  reduce: boolean | null;
}) {
  const Icon = ICONS[node.icon] ?? Zap;
  const pal = ACCENT[accent];
  const isActive = index === activeIndex;
  const isDone = index < activeIndex;

  return (
    <motion.div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: point.x, top: point.y }}
      animate={
        reduce
          ? undefined
          : {
              y: [0, isActive ? -6 : -3, 0],
              scale: isActive ? [1, 1.04, 1] : 1,
            }
      }
      transition={{
        duration: isActive ? 2.4 : 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.15,
      }}
    >
      <div
        className={cn(
          "relative flex min-w-[88px] max-w-[110px] flex-col items-center gap-1.5 rounded-2xl border px-2.5 py-2.5 backdrop-blur-xl transition-shadow",
          "bg-white/75 shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:bg-slate-900/70"
        )}
        style={{
          borderColor: isActive || isDone ? pal.solid : "rgba(226,232,240,0.9)",
          boxShadow: isActive
            ? `0 12px 40px ${pal.glow}, 0 0 0 1px ${pal.solid}33`
            : undefined,
        }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: pal.soft, color: pal.solid }}
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </div>
        <p className="text-center text-[11px] font-semibold leading-tight text-foreground">
          {node.label}
        </p>
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: isActive ? pal.solid : isDone ? "#10b981" : "#cbd5e1",
            boxShadow: isActive ? `0 0 10px ${pal.solid}` : undefined,
          }}
        />
      </div>
    </motion.div>
  );
}

function SparkBars({ color, reduce }: { color: string; reduce: boolean | null }) {
  const heights = [28, 44, 36, 58, 42, 64, 50, 70, 48, 62, 40, 55];
  return (
    <div className="flex h-16 items-end gap-1 px-1">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ background: color, opacity: 0.35 + (i % 5) * 0.1 }}
          animate={reduce ? { height: h } : { height: [h * 0.55, h, h * 0.7, h] }}
          transition={{ duration: 2.2 + (i % 4) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
        />
      ))}
    </div>
  );
}

export function WorkflowHeroCanvas({ workflow }: { workflow: ServiceWorkflowDef }) {
  const reduce = useReducedMotion();
  const gid = useId().replace(/:/g, "");
  const pal = ACCENT[workflow.accent];
  const W = 560;
  const H = 360;

  const positions = useMemo(
    () => layoutPositions(workflow.layout, workflow.nodes.length, W, H),
    [workflow.layout, workflow.nodes.length]
  );

  const idToIndex = useMemo(() => {
    const m = new Map<string, number>();
    workflow.nodes.forEach((n, i) => m.set(n.id, i));
    return m;
  }, [workflow.nodes]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activityIdx, setActivityIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % workflow.nodes.length);
    }, 1600);
    return () => clearInterval(t);
  }, [workflow.nodes.length, reduce]);

  useEffect(() => {
    if (reduce || workflow.activities.length === 0) return;
    const t = setInterval(() => {
      setActivityIdx((i) => (i + 1) % workflow.activities.length);
    }, 2400);
    return () => clearInterval(t);
  }, [workflow.activities.length, reduce]);

  const paths = workflow.edges
    .map((e) => {
      const fi = idToIndex.get(e.from);
      const ti = idToIndex.get(e.to);
      if (fi == null || ti == null) return null;
      return { key: `${e.from}-${e.to}`, d: curvePath(positions[fi], positions[ti]) };
    })
    .filter(Boolean) as { key: string; d: string }[];

  const activity = workflow.activities[activityIdx] ?? workflow.activities[0];

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <motion.div
        className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full blur-3xl"
        style={{ background: pal.glow }}
        animate={reduce ? undefined : { opacity: [0.35, 0.65, 0.35], scale: [1, 1.12, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -bottom-10 -left-8 h-36 w-36 rounded-full blur-3xl"
        style={{ background: "rgba(6,182,212,0.25)" }}
        animate={reduce ? undefined : { opacity: [0.3, 0.55, 0.3], scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/50">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.14) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />

        <div className="relative flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Live workflow
            </p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{workflow.caption}</p>
          </div>
          {workflow.metric && (
            <div
              className="rounded-2xl border px-3 py-2 text-right backdrop-blur-md"
              style={{ borderColor: `${pal.solid}33`, background: pal.soft }}
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                {workflow.metric.label}
              </p>
              <p className="text-lg font-bold tabular-nums" style={{ color: pal.solid }}>
                {workflow.metric.value}
              </p>
              {workflow.metric.delta && (
                <p className="text-[10px] font-medium text-muted">{workflow.metric.delta}</p>
              )}
            </div>
          )}
        </div>

        <div className="relative aspect-[560/360] w-full">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id={`line-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={pal.solid} stopOpacity="0.15" />
                <stop offset="50%" stopColor={pal.line} stopOpacity="0.9" />
                <stop offset="100%" stopColor={pal.solid} stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {workflow.layout === "radar" && (
              <g opacity="0.35">
                {[0.2, 0.4, 0.6, 0.8].map((s) => (
                  <ellipse
                    key={s}
                    cx={W / 2}
                    cy={H * 0.55}
                    rx={W * 0.38 * s}
                    ry={H * 0.28 * s}
                    fill="none"
                    stroke={pal.solid}
                    strokeWidth="1"
                  />
                ))}
              </g>
            )}

            {paths.map((p, i) => (
              <g key={p.key}>
                <motion.path
                  d={p.d}
                  fill="none"
                  stroke={`url(#line-${gid})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.35 }}
                  animate={{ pathLength: 1, opacity: [0.35, 0.85, 0.35] }}
                  transition={{
                    pathLength: { duration: 1.4, delay: i * 0.12 },
                    opacity: { duration: 3, repeat: Infinity, delay: i * 0.2 },
                  }}
                />
                {!reduce && (
                  <motion.circle
                    r="4"
                    fill={pal.solid}
                    filter={`drop-shadow(0 0 6px ${pal.glow})`}
                  >
                    <animateMotion
                      dur={`${2.4 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                      path={p.d}
                    />
                  </motion.circle>
                )}
              </g>
            ))}
          </svg>

          {workflow.nodes.map((node, i) => (
            <NodeCard
              key={node.id}
              node={node}
              point={positions[i]}
              accent={workflow.accent}
              activeIndex={activeIndex}
              index={i}
              reduce={reduce}
            />
          ))}
        </div>

        <div className="relative grid gap-3 border-t border-border/60 p-3 sm:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-white/60 p-3 backdrop-blur-md dark:bg-slate-900/50">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Activity
            </p>
            <motion.div
              key={activityIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-start gap-2.5"
            >
              <span
                className="mt-1 h-2 w-2 shrink-0 rounded-full"
                style={{
                  background:
                    activity?.tone === "warn"
                      ? "#f59e0b"
                      : activity?.tone === "ok"
                        ? "#10b981"
                        : pal.solid,
                }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{activity?.title}</p>
                <p className="text-xs text-muted">{activity?.meta}</p>
              </div>
            </motion.div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-white/60 p-3 backdrop-blur-md dark:bg-slate-900/50">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
              {workflow.layout === "radar" || workflow.layout === "dial"
                ? "Live signal"
                : "Throughput"}
            </p>
            <SparkBars color={pal.solid} reduce={reduce} />
          </div>
        </div>
      </div>
    </div>
  );
}
