"use client";

import { useState } from "react";
import { BarChart3, Building2, Users, UserPlus } from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";

const LISTINGS = [
  { id: "4B", name: "Harbor Lofts 4B", price: "$1.24M", beds: 3, baths: 2, status: "Active", leads: 8 },
  { id: "12A", name: "Maple Court 12A", price: "$640k", beds: 2, baths: 1, status: "Pending", leads: 3 },
  { id: "VILLA", name: "Cedar Villa", price: "$2.10M", beds: 5, baths: 4, status: "Active", leads: 11 },
  { id: "STUDIO", name: "River Studio", price: "$415k", beds: 1, baths: 1, status: "Draft", leads: 1 },
];

const LEADS = [
  { name: "Amelia Cho", listing: "Harbor Lofts 4B", stage: "Viewing", agent: "Noah Blake" },
  { name: "Chris Adeyemi", listing: "Cedar Villa", stage: "Qualified", agent: "Sofia Lane" },
  { name: "Helen Park", listing: "Maple Court 12A", stage: "Offer", agent: "Noah Blake" },
];

const AGENTS = [
  { name: "Noah Blake", listings: 9, closeRate: "31%", pipeline: "$4.8M" },
  { name: "Sofia Lane", listings: 7, closeRate: "27%", pipeline: "$3.1M" },
  { name: "Marco Voss", listings: 5, closeRate: "22%", pipeline: "$2.4M" },
];

export function EstatesDemo({ product }: { product: Product }) {
  const [view, setView] = useState("listings");
  const [selected, setSelected] = useState(LISTINGS[0]);

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "listings", label: "Listings", icon: Building2 },
        { id: "leads", label: "Leads", icon: UserPlus },
        { id: "agents", label: "Agents", icon: Users },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
      ]}
    >
      {view === "listings" && (
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {LISTINGS.map((listing) => (
              <button
                key={listing.id}
                type="button"
                onClick={() => setSelected(listing)}
                className="rounded-2xl border border-white/8 bg-white/4 p-4 text-left transition-colors hover:border-white/20"
                style={selected.id === listing.id ? { borderColor: product.accent } : undefined}
              >
                <div className="mb-3 h-20 rounded-xl bg-gradient-to-br from-amber-400/30 to-orange-500/10" />
                <p className="font-medium">{listing.name}</p>
                <p className="mt-1 text-sm text-slate-400">{listing.beds} bed · {listing.baths} bath</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-heading" style={{ color: product.accent }}>{listing.price}</span>
                  <span className="text-xs text-slate-500">{listing.status}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">Selected listing</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold">{selected.name}</h2>
            <p className="mt-2 text-slate-400">{selected.price} · {selected.leads} active leads</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between rounded-xl bg-white/5 px-4 py-3"><span>Status</span><span>{selected.status}</span></div>
              <div className="flex justify-between rounded-xl bg-white/5 px-4 py-3"><span>Showings this week</span><span>4</span></div>
              <div className="flex justify-between rounded-xl bg-white/5 px-4 py-3"><span>Assigned agent</span><span>Noah Blake</span></div>
            </div>
          </div>
        </div>
      )}

      {view === "leads" && (
        <div className="space-y-3">
          {LEADS.map((lead) => (
            <div key={lead.name} className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-slate-400">{lead.listing}</p>
              </div>
              <div className="text-sm text-slate-400">{lead.agent}</div>
              <span className="text-sm" style={{ color: product.accent }}>{lead.stage}</span>
            </div>
          ))}
        </div>
      )}

      {view === "agents" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {AGENTS.map((agent) => (
            <div key={agent.name} className="rounded-2xl border border-white/8 bg-white/4 p-5">
              <div className="mb-4 h-12 w-12 rounded-full bg-amber-400/20" />
              <p className="font-heading text-lg font-semibold">{agent.name}</p>
              <p className="mt-3 text-sm text-slate-400">{agent.listings} listings</p>
              <p className="text-sm text-slate-400">Close rate {agent.closeRate}</p>
              <p className="mt-2 text-sm" style={{ color: product.accent }}>{agent.pipeline}</p>
            </div>
          ))}
        </div>
      )}

      {view === "analytics" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DemoStat label="Active listings" value="18" accent={product.accent} />
          <DemoStat label="Pipeline" value="$9.2M" accent={product.accent} />
          <DemoStat label="New leads" value="27" hint="This week" accent={product.accent} />
          <DemoStat label="Avg days" value="21" hint="On market" accent={product.accent} />
        </div>
      )}
    </DemoShell>
  );
}
