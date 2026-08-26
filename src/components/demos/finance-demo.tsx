"use client";

import { useMemo, useState } from "react";
import { BarChart3, Gauge, Sparkles, Wallet, ArrowLeftRight } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import { useLiveSeries } from "@/components/shared/live-bars";
import type { Product } from "@/data/products";

const CASH = [
  { name: "Mar", value: 41 },
  { name: "Apr", value: 44 },
  { name: "May", value: 43 },
  { name: "Jun", value: 46 },
  { name: "Jul", value: 47 },
  { name: "Aug", value: 48 },
];

const TX = [
  { id: "tx-1", name: "Northline invoice", cat: "Income", amount: "+$8,400", date: "18 Aug" },
  { id: "tx-2", name: "Cloud infrastructure", cat: "Ops", amount: "−$1,280", date: "17 Aug" },
  { id: "tx-3", name: "Studio tools", cat: "Software", amount: "−$240", date: "16 Aug" },
  { id: "tx-4", name: "Harbor Labs retainers", cat: "Income", amount: "+$6,200", date: "12 Aug" },
  { id: "tx-5", name: "Travel", cat: "Ops", amount: "−$610", date: "09 Aug" },
];

const BUDGETS = [
  { name: "Software", used: 72, cap: "$2,000" },
  { name: "Ops", used: 88, cap: "$4,500" },
  { name: "Marketing", used: 41, cap: "$3,000" },
];

const INSIGHTS = [
  "Spending increased compared with last month.",
  "Your current trend may exceed the monthly budget.",
  "Income is concentrated in two clients this period.",
];

export function FinanceDemo({ product }: { product: Product }) {
  const [view, setView] = useState("overview");
  const [filter, setFilter] = useState("All");
  const series = useLiveSeries(CASH);

  const rows = useMemo(
    () => (filter === "All" ? TX : TX.filter((row) => row.cat === filter)),
    [filter]
  );

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "overview", label: "Overview", icon: Gauge },
        { id: "transactions", label: "Activity", icon: ArrowLeftRight },
        { id: "budgets", label: "Budgets", icon: Wallet },
        { id: "reports", label: "Reports", icon: BarChart3 },
        { id: "insights", label: "Insights", icon: Sparkles },
      ]}
    >
      {view === "overview" && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DemoStat label="Cash" value="$48.2k" hint="+2.1%" accent={product.accent} />
            <DemoStat label="Income" value="$14.6k" hint="This month" accent={product.accent} />
            <DemoStat label="Spend" value="$12.4k" hint="This month" accent={product.accent} />
            <DemoStat label="Runway" value="11.4 mo" accent={product.accent} />
          </div>
          <div className="h-64 rounded-3xl border border-white/8 bg-white/4 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="ledger" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={product.accent} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={product.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.08)" }} />
                <Area type="monotone" dataKey="value" stroke={product.accent} fill="url(#ledger)" isAnimationActive animationDuration={900} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl border border-amber-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            Budget alert · Smart alerts · Spending increased compared with last month.
          </div>
        </div>
      )}

      {view === "transactions" && (
        <div>
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {["All", "Income", "Ops", "Software"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className="min-h-10 shrink-0 rounded-xl px-3 text-sm"
                style={filter === option ? { background: product.accentSoft, color: product.accent } : { background: "rgba(255,255,255,0.05)" }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto rounded-3xl border border-white/8">
            <table className="min-w-[560px] w-full text-left text-sm">
              <thead className="bg-white/4 text-[11px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-slate-400">{row.date}</td>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3 text-slate-400">{row.cat}</td>
                    <td className="px-4 py-3" style={{ color: row.amount.startsWith("+") ? product.accent : "#fda4af" }}>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "budgets" && (
        <div className="space-y-4">
          {BUDGETS.map((budget) => (
            <div key={budget.name} className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="flex items-center justify-between text-sm">
                <span>{budget.name}</span>
                <span className="text-slate-400">{budget.used}% of {budget.cap}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${budget.used}%`, background: budget.used > 80 ? "#fbbf24" : product.accent }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "reports" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["P&L snapshot", "Income $14.6k · spend $12.4k"],
            ["Cash movement", "Net +$2.2k this month"],
            ["Vendor concentration", "Top 3 vendors = 54% of spend"],
            ["Budget variance", "Ops is 12% above plan"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/8 bg-white/4 p-5">
              <p className="font-medium">{title}</p>
              <p className="mt-2 text-sm text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      )}

      {view === "insights" && (
        <div className="space-y-3">
          {INSIGHTS.map((insight) => (
            <div key={insight} className="rounded-2xl border border-amber-300/15 bg-white/4 p-4">
              <p className="text-xs uppercase tracking-widest text-amber-200/80">AI financial insights</p>
              <p className="mt-2 text-sm">{insight}</p>
            </div>
          ))}
        </div>
      )}
    </DemoShell>
  );
}
