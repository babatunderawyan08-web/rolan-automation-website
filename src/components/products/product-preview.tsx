"use client";

import type { ReactNode } from "react";
import type { ProductSlug } from "@/data/products";

export function ProductPreview({ slug }: { slug: ProductSlug }) {
  if (slug === "voice") return <VoicePreview />;
  if (slug === "inventory") return <InventoryPreview />;
  if (slug === "estates") return <EstatesPreview />;
  if (slug === "desk") return <DeskPreview />;
  if (slug === "book") return <BookPreview />;
  return <PulsePreview />;
}

function Frame({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-xl border border-white/10 bg-[#0b1220] text-white shadow-xl sm:h-[210px]">
      <div className="flex items-center justify-between border-b border-white/8 px-3 py-2 text-[10px] uppercase tracking-widest text-white/45">
        <span>{title}</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function VoicePreview() {
  return (
    <Frame title="Voice console">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
          <span className="h-3 w-3 animate-pulse rounded-full bg-sky-400" />
        </div>
        <div>
          <p className="text-sm font-medium">Incoming · Maya Chen</p>
          <p className="text-[11px] text-white/50">Booking a cleaning · 00:42</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <div className="max-w-[85%] rounded-lg bg-white/8 px-2.5 py-1.5 text-[11px]">I can take Thursday at 10:30.</div>
        <div className="ml-auto max-w-[85%] rounded-lg bg-sky-500/20 px-2.5 py-1.5 text-[11px] text-sky-100">Booked. Confirmation sent.</div>
      </div>
    </Frame>
  );
}

function InventoryPreview() {
  const rows = [
    ["Carbon filters", "18", "Low"],
    ["Steel brackets", "240", "OK"],
    ["Sensor kits", "9", "Alert"],
  ];
  return (
    <Frame title="Stock board">
      <div className="space-y-2">
        {rows.map(([name, qty, status]) => (
          <div key={name} className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2 text-xs">
            <span>{name}</span>
            <span className={status === "OK" ? "text-emerald-400" : "text-amber-300"}>
              {qty} · {status}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function EstatesPreview() {
  return (
    <Frame title="Harbor Lofts">
      <div className="h-16 rounded-lg bg-gradient-to-r from-amber-500/30 to-orange-400/10" />
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium">Unit 4B · Waterfront</p>
          <p className="text-[11px] text-white/50">3 bed · 2 bath</p>
        </div>
        <p className="font-heading text-lg font-semibold text-amber-300">$1.24M</p>
      </div>
    </Frame>
  );
}

function DeskPreview() {
  return (
    <Frame title="Support inbox">
      {[
        ["#4821", "Billing dispute", "AI draft"],
        ["#4818", "Login loop", "Assigned"],
        ["#4812", "API timeout", "Urgent"],
      ].map(([id, title, state]) => (
        <div key={id} className="mb-2 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2 text-xs">
          <span className="truncate pr-2">{id} {title}</span>
          <span className="shrink-0 text-violet-300">{state}</span>
        </div>
      ))}
    </Frame>
  );
}

function BookPreview() {
  return (
    <Frame title="This week">
      <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] text-white/40">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
          <div key={d}>{d}</div>
        ))}
        {["9a", "—", "11a", "10a", "2p"].map((slot, i) => (
          <div
            key={i}
            className={`rounded-md py-3 ${slot === "—" ? "bg-white/5" : "bg-teal-400/20 text-teal-100"}`}
          >
            {slot}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function PulsePreview() {
  return (
    <Frame title="Operations">
      <div className="grid grid-cols-3 gap-2">
        {[
          ["$284k", "Revenue"],
          ["96%", "Uptime"],
          ["4.8", "CSAT"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-lg bg-white/5 p-2">
            <p className="font-heading text-sm font-semibold">{v}</p>
            <p className="text-[10px] text-white/45">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-12 items-end gap-1">
        {[20, 32, 28, 44, 38, 52, 48, 60].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-rose-400/70" style={{ height: h }} />
        ))}
      </div>
    </Frame>
  );
}
