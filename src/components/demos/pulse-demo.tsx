"use client";

import { useMemo, useState } from "react";
import { BarChart3, FileText, Gauge, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";

const REVENUE = [
  { name: "Mar", value: 148 },
  { name: "Apr", value: 162 },
  { name: "May", value: 171 },
  { name: "Jun", value: 188 },
  { name: "Jul", value: 210 },
  { name: "Aug", value: 284 },
];

const CHANNELS = [
  { name: "Product", value: 92 },
  { name: "Outbound", value: 64 },
  { name: "Partners", value: 48 },
  { name: "Self-serve", value: 80 },
];

const TEAM = [
  { name: "Jordan", metric: "NPS", value: "72" },
  { name: "Amelia", metric: "Win rate", value: "41%" },
  { name: "Kenji", metric: "Uptime", value: "99.9%" },
];

const REPORTS = [
  { name: "Weekly operations", when: "Every Monday 08:00" },
  { name: "Revenue cohort", when: "Monthly" },
  { name: "Support quality", when: "Fridays" },
];

export function PulseDemo({ product }: { product: Product }) {
  const [view, setView] = useState("overview");
  const [range, setRange] = useState<"6m" | "30d">("6m");
  const data = useMemo(() => (range === "6m" ? REVENUE : REVENUE.slice(-3).map((row, i) => ({ ...row, value: row.value - 12 + i * 4 }))), [range]);

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "overview", label: "Overview", icon: Gauge },
        { id: "revenue", label: "Revenue", icon: BarChart3 },
        { id: "reports", label: "Reports", icon: FileText },
        { id: "team", label: "Team", icon: Users },
      ]}
    >
      {view === "overview" && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DemoStat label="Revenue" value="$284k" hint="+18.4%" accent={product.accent} />
            <DemoStat label="Active users" value="12.4k" hint="+6.1%" accent={product.accent} />
            <DemoStat label="Uptime" value="99.98%" accent={product.accent} />
            <DemoStat label="NPS" value="64" hint="Stable" accent={product.accent} />
          </div>
          <div className="h-64 rounded-3xl border border-white/8 bg-white/4 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE}>
                <defs>
                  <linearGradient id="pulse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={product.accent} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={product.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.08)" }} />
                <Area type="monotone" dataKey="value" stroke={product.accent} fill="url(#pulse)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {view === "revenue" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(["6m", "30d"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRange(option)}
                className="rounded-lg px-3 py-2 text-sm"
                style={range === option ? { background: product.accentSoft, color: product.accent } : { background: "rgba(255,255,255,0.05)" }}
              >
                {option === "6m" ? "6 months" : "Last 30 days"}
              </button>
            ))}
          </div>
          <div className="h-72 rounded-3xl border border-white/8 bg-white/4 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.08)" }} />
                <Bar dataKey="value" fill={product.accent} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {CHANNELS.map((channel) => (
              <div key={channel.name} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <p className="text-xs text-slate-500">{channel.name}</p>
                <p className="mt-2 font-heading text-xl">{channel.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "reports" && (
        <div className="space-y-3">
          {REPORTS.map((report) => (
            <div key={report.name} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 p-4">
              <div>
                <p className="font-medium">{report.name}</p>
                <p className="text-sm text-slate-400">{report.when}</p>
              </div>
              <span className="text-sm" style={{ color: product.accent }}>Ready</span>
            </div>
          ))}
        </div>
      )}

      {view === "team" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {TEAM.map((person) => (
            <div key={person.name} className="rounded-2xl border border-white/8 bg-white/4 p-5">
              <p className="font-heading text-lg font-semibold">{person.name}</p>
              <p className="mt-2 text-sm text-slate-400">{person.metric}</p>
              <p className="mt-3 text-2xl" style={{ color: product.accent }}>{person.value}</p>
            </div>
          ))}
        </div>
      )}
    </DemoShell>
  );
}
