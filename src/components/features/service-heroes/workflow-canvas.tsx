"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/shared/brand-logo";
import { cn } from "@/lib/utils";
import type { ServiceWorkflowDef } from "./types";

const LOGO_SRC = "/images/rolan-logo.png";
const W = 560;
const H = 400;
const CX = W / 2;
const CY = H / 2 - 6;

type Pt = { x: number; y: number };

function orbitPoints(count: number, mobile: boolean): Pt[] {
  const r = mobile ? 108 : 138;
  return Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
    return {
      x: CX + Math.cos(angle) * r,
      y: CY + Math.sin(angle) * r * (mobile ? 0.92 : 0.88),
    };
  });
}

function quad(a: Pt, b: Pt) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // Pull control point toward center for hub spokes
  const cx = mx * 0.35 + CX * 0.65;
  const cy = my * 0.35 + CY * 0.65;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return mobile;
}

function AmbientParticles({ reduce }: { reduce: boolean | null }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: 8 + ((i * 37) % 84),
        y: 10 + ((i * 53) % 80),
        d: 4 + (i % 5),
        delay: (i % 7) * 0.35,
      })),
    []
  );
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute h-1 w-1 rounded-full bg-secondary/40"
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.15, 0.55, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: d.d, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  );
}

function RolanHub({ reduce, pulse }: { reduce: boolean | null; pulse: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ perspective: 900 }}
      animate={
        reduce
          ? undefined
          : {
              y: [0, -8, 0],
              rotateY: [-8, 8, -8],
              rotateX: [4, -4, 4],
            }
      }
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full sm:h-[104px] sm:w-[104px]"
        animate={
          reduce
            ? undefined
            : {
                boxShadow: pulse
                  ? [
                      "0 0 0 0 rgba(37,99,235,0.0)",
                      "0 0 40px 8px rgba(37,99,235,0.35)",
                      "0 0 0 0 rgba(37,99,235,0.0)",
                    ]
                  : [
                      "0 12px 40px rgba(37,99,235,0.25)",
                      "0 16px 48px rgba(6,182,212,0.28)",
                      "0 12px 40px rgba(37,99,235,0.25)",
                    ],
              }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/30 via-accent/20 to-secondary/10 blur-md" />
        <div className="absolute -inset-3 rounded-full border border-secondary/20" />
        <motion.div
          className="absolute -inset-5 rounded-full border border-dashed border-accent/25"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border border-white/70 bg-white/90 shadow-[0_8px_32px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:h-[84px] sm:w-[84px] dark:border-white/10 dark:bg-slate-900/80">
          <Image
            src={LOGO_SRC}
            alt="Rolan Automation"
            fill
            sizes="84px"
            className="object-cover"
            priority={false}
          />
        </div>
      </motion.div>
      <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
        Rolan
      </p>
    </motion.div>
  );
}

export function WorkflowHeroCanvas({ workflow }: { workflow: ServiceWorkflowDef }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const gid = useId().replace(/:/g, "");

  const nodes = useMemo(() => {
    const max = mobile ? Math.min(5, workflow.nodes.length) : Math.min(8, workflow.nodes.length);
    return workflow.nodes.slice(0, max);
  }, [workflow.nodes, mobile]);

  const points = useMemo(() => orbitPoints(nodes.length, mobile), [nodes.length, mobile]);

  const [pathIdx, setPathIdx] = useState(0);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [activityIdx, setActivityIdx] = useState(0);

  const activePath = useMemo(() => {
    if (hoverId) {
      // Prefer a path that includes hovered node; else synthesize hub path
      const match = workflow.paths.find((p) => p.includes(hoverId));
      return match ?? [hoverId];
    }
    return workflow.paths[pathIdx % workflow.paths.length] ?? [];
  }, [hoverId, pathIdx, workflow.paths]);

  const activeSet = useMemo(() => new Set(activePath), [activePath]);

  useEffect(() => {
    if (reduce || hoverId) return;
    const t = setInterval(() => {
      setPathIdx((i) => (i + 1) % Math.max(workflow.paths.length, 1));
    }, 3200);
    return () => clearInterval(t);
  }, [workflow.paths.length, reduce, hoverId]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setActivityIdx((i) => (i + 1) % Math.max(workflow.activities.length, 1));
    }, 2600);
    return () => clearInterval(t);
  }, [workflow.activities.length, reduce]);

  const hub: Pt = { x: CX, y: CY };
  const idToIndex = useMemo(() => {
    const m = new Map<string, number>();
    nodes.forEach((n, i) => m.set(n.id, i));
    return m;
  }, [nodes]);

  const spokes = nodes.map((n, i) => ({
    id: n.id,
    d: quad(points[i], hub),
    active: activeSet.has(n.id),
  }));

  // Sequential edges along active path (node → next node via hub visually as packets)
  const pathEdges = useMemo(() => {
    const edges: { key: string; d: string }[] = [];
    for (let i = 0; i < activePath.length - 1; i++) {
      const a = idToIndex.get(activePath[i]);
      const b = idToIndex.get(activePath[i + 1]);
      if (a == null || b == null) continue;
      edges.push({ key: `${activePath[i]}-${activePath[i + 1]}`, d: quad(points[a], points[b]) });
    }
    return edges;
  }, [activePath, idToIndex, points]);

  const hovered = nodes.find((n) => n.id === hoverId);
  const storyNode =
    hovered ?? nodes.find((n) => n.id === activePath[activePath.length - 1]) ?? nodes[0];
  const activity = workflow.activities[activityIdx] ?? workflow.activities[0];

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <motion.div
        className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full bg-secondary/20 blur-3xl"
        animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
        animate={reduce ? undefined : { opacity: [0.3, 0.6, 0.3], scale: [1.1, 0.95, 1.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-white/70",
          "bg-white/60 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl",
          "dark:border-white/10 dark:bg-slate-950/55"
        )}
      >
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.12) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden
        />
        <AmbientParticles reduce={reduce} />

        <div className="relative z-10 flex items-start justify-between gap-3 border-b border-border/50 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
              Powered by Rolan
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-foreground">{workflow.caption}</p>
          </div>
          {workflow.metric && (
            <div className="shrink-0 rounded-2xl border border-secondary/20 bg-secondary/10 px-3 py-1.5 text-right backdrop-blur-md">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted">
                {workflow.metric.label}
              </p>
              <p className="text-base font-bold tabular-nums text-secondary">{workflow.metric.value}</p>
              {workflow.metric.delta && (
                <p className="text-[10px] font-medium text-muted">{workflow.metric.delta}</p>
              )}
            </div>
          )}
        </div>

        <div className="relative aspect-[560/400] w-full">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id={`spoke-${gid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.15" />
              </linearGradient>
              <filter id={`glow-${gid}`}>
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Soft orbit ring */}
            <ellipse
              cx={CX}
              cy={CY}
              rx={mobile ? 108 : 138}
              ry={mobile ? 100 : 122}
              fill="none"
              stroke="rgba(37,99,235,0.12)"
              strokeDasharray="4 6"
            />

            {spokes.map((s) => (
              <motion.path
                key={s.id}
                d={s.d}
                fill="none"
                stroke={`url(#spoke-${gid})`}
                strokeWidth={s.active ? 2.25 : 1.25}
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: s.active ? 0.95 : 0.28 }}
                transition={{ duration: 0.45 }}
              />
            ))}

            {pathEdges.map((e, i) => (
              <g key={e.key}>
                <path
                  d={e.d}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  strokeOpacity="0.35"
                  strokeLinecap="round"
                />
                {!reduce && (
                  <circle r="3.5" fill="#2563eb" filter={`url(#glow-${gid})`}>
                    <animateMotion
                      dur={`${1.6 + i * 0.25}s`}
                      repeatCount="indefinite"
                      path={e.d}
                    />
                  </circle>
                )}
              </g>
            ))}

            {/* Packets on hub spokes for active nodes */}
            {!reduce &&
              spokes
                .filter((s) => s.active)
                .map((s, i) => (
                  <circle key={`pkt-${s.id}`} r="3" fill="#06b6d4" filter={`url(#glow-${gid})`}>
                    <animateMotion dur={`${2 + (i % 3) * 0.35}s`} repeatCount="indefinite" path={s.d} />
                  </circle>
                ))}
          </svg>

          <RolanHub reduce={reduce} pulse={!!hoverId || activePath.length > 0} />

          {nodes.map((node, i) => {
            const pt = points[i];
            const active = activeSet.has(node.id);
            const isHover = hoverId === node.id;
            return (
              <motion.button
                key={node.id}
                type="button"
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={{ left: `${(pt.x / W) * 100}%`, top: `${(pt.y / H) * 100}%` }}
                onMouseEnter={() => setHoverId(node.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(node.id)}
                onBlur={() => setHoverId(null)}
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [0, active || isHover ? -7 : -3, 0],
                        scale: isHover ? 1.08 : active ? 1.04 : 1,
                      }
                }
                transition={{
                  duration: isHover ? 1.8 : 3.6 + (i % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.12,
                }}
                aria-label={node.label}
              >
                <div
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl border px-2 py-2 backdrop-blur-xl transition-shadow",
                    "bg-white/80 shadow-[0_8px_28px_rgba(15,23,42,0.08)] dark:bg-slate-900/75",
                    active || isHover ? "border-secondary/50" : "border-white/70 dark:border-white/10"
                  )}
                  style={{
                    boxShadow:
                      active || isHover
                        ? "0 12px 36px rgba(37,99,235,0.22), 0 0 0 1px rgba(37,99,235,0.2)"
                        : undefined,
                  }}
                >
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-background-alt/80">
                    {node.brand ? (
                      <BrandLogo name={node.brand} size={22} />
                    ) : (
                      <span className="text-[10px] font-bold text-secondary">{node.label.slice(0, 2)}</span>
                    )}
                    {(active || isHover) && (
                      <motion.span
                        className="absolute inset-0 rounded-xl ring-2 ring-secondary/40"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    )}
                  </span>
                  <span className="max-w-[64px] truncate text-[9px] font-semibold text-foreground sm:text-[10px]">
                    {node.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="relative z-10 grid gap-2 border-t border-border/50 p-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-white/65 p-3 backdrop-blur-md dark:bg-slate-900/55">
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-muted">
              Live path
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={storyNode?.id + (hoverId ?? pathIdx)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28 }}
              >
                <p className="text-sm font-semibold text-foreground">{storyNode?.label}</p>
                <p className="mt-0.5 text-xs text-muted">{storyNode?.story}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="rounded-2xl border border-border/60 bg-white/65 p-3 backdrop-blur-md dark:bg-slate-900/55">
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-muted">
              Activity
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activityIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28 }}
                className="flex items-start gap-2"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{activity?.title}</p>
                  <p className="text-xs text-muted">{activity?.meta}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
