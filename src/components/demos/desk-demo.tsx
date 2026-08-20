"use client";

import { useState } from "react";
import { BarChart3, Inbox, Sparkles, Users } from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const TICKETS = [
  { id: "4821", subject: "Billing dispute on March invoice", customer: "Lina Ortiz", priority: "High", status: "Open", preview: "I was charged twice for the same seat." },
  { id: "4818", subject: "Login loop after SSO update", customer: "Kenji Mori", priority: "Urgent", status: "Open", preview: "Redirects back to the identity provider." },
  { id: "4812", subject: "API timeout on /orders", customer: "Harbor Labs", priority: "Medium", status: "Pending", preview: "Intermittent 504s from EU region." },
  { id: "4804", subject: "Export missing last 7 days", customer: "Sofia Lane", priority: "Low", status: "Resolved", preview: "CSV stops at last Tuesday." },
];

const CUSTOMERS = [
  { name: "Lina Ortiz", plan: "Growth", tickets: 6, csat: "4.7" },
  { name: "Kenji Mori", plan: "Enterprise", tickets: 2, csat: "4.9" },
  { name: "Harbor Labs", plan: "Enterprise", tickets: 11, csat: "4.4" },
];

const DRAFTS: Record<string, string> = {
  "4821": "I've reviewed invoice INV-2044 and confirmed a duplicate seat charge. I'll reverse $49 today and email the credit note within the hour.",
  "4818": "This looks like a stale session cookie after the SSO cutover. I'm resetting the identity mapping and sending a one-time recovery link.",
  "4812": "We're seeing EU gateway saturation around 16:00 UTC. I've opened an incident and will fail over read replicas while we patch the timeout.",
};

export function DeskDemo({ product }: { product: Product }) {
  const [view, setView] = useState("tickets");
  const [selected, setSelected] = useState(TICKETS[0]);
  const [draft, setDraft] = useState(DRAFTS[TICKETS[0].id]);
  const [sent, setSent] = useState(false);

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "tickets", label: "Tickets", icon: Inbox },
        { id: "ai", label: "AI draft", icon: Sparkles },
        { id: "customers", label: "Customers", icon: Users },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
      ]}
    >
      {view === "tickets" && (
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-2">
            {TICKETS.map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                onClick={() => {
                  setSelected(ticket);
                  setDraft(DRAFTS[ticket.id] ?? "");
                  setSent(false);
                }}
                className="w-full rounded-2xl border border-white/8 bg-white/4 p-4 text-left"
                style={selected.id === ticket.id ? { borderColor: product.accent } : undefined}
              >
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span>#{ticket.id}</span>
                  <span>{ticket.priority}</span>
                </div>
                <p className="mt-2 font-medium">{ticket.subject}</p>
                <p className="mt-1 truncate text-sm text-slate-400">{ticket.customer}</p>
              </button>
            ))}
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">#{selected.id} · {selected.status}</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold">{selected.subject}</h2>
            <p className="mt-3 text-sm text-slate-400">{selected.preview}</p>
            <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm">
              <p className="text-xs uppercase tracking-widest text-slate-500">Customer</p>
              <p className="mt-1">{selected.customer} · assigned to Jordan</p>
            </div>
          </div>
        </div>
      )}

      {view === "ai" && (
        <div className="rounded-3xl border border-white/8 bg-white/4 p-5 sm:p-6">
          <h2 className="font-heading text-2xl font-semibold">AI response for #{selected.id}</h2>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-[#070b14] p-4 text-sm outline-none"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => setSent(true)}>Approve & send</Button>
            <Button variant="outline" onClick={() => setDraft(DRAFTS[selected.id] ?? "")}>Regenerate</Button>
          </div>
          {sent && <p className="mt-4 text-sm text-emerald-400">Reply sent. Ticket stays open until the customer confirms.</p>}
        </div>
      )}

      {view === "customers" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {CUSTOMERS.map((customer) => (
            <div key={customer.name} className="rounded-2xl border border-white/8 bg-white/4 p-5">
              <p className="font-heading text-lg font-semibold">{customer.name}</p>
              <p className="mt-1 text-sm text-slate-400">{customer.plan}</p>
              <p className="mt-4 text-sm">{customer.tickets} tickets · CSAT {customer.csat}</p>
            </div>
          ))}
        </div>
      )}

      {view === "analytics" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DemoStat label="Open tickets" value="12" accent={product.accent} />
          <DemoStat label="First reply" value="6m" hint="AI + human" accent={product.accent} />
          <DemoStat label="AI resolved" value="41%" accent={product.accent} />
          <DemoStat label="CSAT" value="4.8" accent={product.accent} />
        </div>
      )}
    </DemoShell>
  );
}
