"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarCheck,
  PhoneCall,
  UserPlus,
} from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const SCRIPT = [
  { who: "ai", text: "Good afternoon, Northshore Clinic. This is Ava. How can I help today?" },
  { who: "caller", text: "Hi — I need to book a dental cleaning sometime next week." },
  { who: "ai", text: "I can help with that. Thursday at 10:30 or Friday at 2:00 are open. Which works better?" },
  { who: "caller", text: "Thursday 10:30 is perfect. My name is Maya Chen." },
  { who: "ai", text: "Booked. I've captured Maya Chen for Thursday 10:30 and sent a confirmation." },
];

const APPOINTMENTS = [
  { id: "A-204", name: "Maya Chen", when: "Thu 10:30", type: "Cleaning", status: "Confirmed" },
  { id: "A-201", name: "Luis Ortega", when: "Wed 14:00", type: "Consult", status: "Confirmed" },
  { id: "A-198", name: "Priya Shah", when: "Wed 09:15", type: "Follow-up", status: "Reminder sent" },
];

const LEADS = [
  { name: "Jonah Hale", source: "Missed call", intent: "New patient", score: 86 },
  { name: "Elena Ruiz", source: "After hours", intent: "Insurance question", score: 71 },
  { name: "Maya Chen", source: "Live call", intent: "Cleaning", score: 94 },
];

export function VoiceDemo({ product }: { product: Product }) {
  const [view, setView] = useState("call");
  const [phase, setPhase] = useState<"idle" | "ringing" | "live" | "done">("idle");
  const [line, setLine] = useState(0);
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [leads, setLeads] = useState(LEADS);

  const visible = useMemo(() => SCRIPT.slice(0, line), [line]);

  const startCall = () => {
    setPhase("ringing");
    setLine(0);
    window.setTimeout(() => {
      setPhase("live");
      let current = 0;
      const tick = window.setInterval(() => {
        current += 1;
        setLine(current);
        if (current >= SCRIPT.length) {
          window.clearInterval(tick);
          setPhase("done");
          setAppointments((rows) => {
            if (rows.some((row) => row.id === "A-204")) return rows;
            return [{ id: "A-204", name: "Maya Chen", when: "Thu 10:30", type: "Cleaning", status: "Confirmed" }, ...rows];
          });
          setLeads((rows) => {
            if (rows.some((row) => row.name === "Maya Chen")) return rows;
            return [{ name: "Maya Chen", source: "Live call", intent: "Cleaning", score: 94 }, ...rows];
          });
        }
      }, 1100);
    }, 1400);
  };

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "call", label: "Live call", icon: PhoneCall },
        { id: "appointments", label: "Appointments", icon: CalendarCheck },
        { id: "leads", label: "Leads", icon: UserPlus },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
      ]}
    >
      {view === "call" && (
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Receptionist</p>
                <h2 className="mt-1 font-heading text-2xl font-semibold">Ava · inbound line</h2>
              </div>
              <span className="rounded-full px-3 py-1 text-xs" style={{ background: product.accentSoft, color: product.accent }}>
                {phase === "idle" && "Idle"}
                {phase === "ringing" && "Ringing"}
                {phase === "live" && "On call"}
                {phase === "done" && "Completed"}
              </span>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <div
                className="flex h-28 w-28 items-center justify-center rounded-full"
                style={{ background: product.accentSoft, boxShadow: phase !== "idle" ? `0 0 40px ${product.glow}` : undefined }}
              >
                <PhoneCall className={phase === "ringing" ? "h-10 w-10 animate-pulse" : "h-10 w-10"} style={{ color: product.accent }} />
              </div>
              <p className="mt-4 text-sm text-slate-400">
                {phase === "idle" && "Ready to take the next inquiry"}
                {phase === "ringing" && "Incoming from +1 415 ••• 8821"}
                {phase === "live" && "Maya Chen · booking intent detected"}
                {phase === "done" && "Appointment captured and confirmation queued"}
              </p>
              <Button className="mt-6 min-h-12" onClick={startCall} disabled={phase === "ringing" || phase === "live"}>
                {phase === "idle" || phase === "done" ? "Simulate incoming call" : "Call in progress…"}
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <h3 className="font-heading text-lg font-semibold">Live transcript</h3>
            <div className="mt-4 space-y-3">
              {visible.length === 0 && <p className="text-sm text-slate-500">Start a call to watch Ava work.</p>}
              {visible.map((entry, index) => (
                <div
                  key={index}
                  className={`max-w-[92%] rounded-2xl px-3 py-2 text-sm ${
                    entry.who === "ai" ? "bg-sky-500/15 text-sky-50" : "ml-auto bg-white/8 text-slate-100"
                  }`}
                >
                  <p className="mb-1 text-[10px] uppercase tracking-widest text-slate-500">{entry.who === "ai" ? "Ava" : "Caller"}</p>
                  {entry.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "appointments" && (
        <div className="overflow-hidden rounded-3xl border border-white/8">
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 border-b border-white/8 bg-white/4 px-4 py-3 text-[11px] uppercase tracking-widest text-slate-500">
            <span>Patient</span>
            <span>When</span>
            <span>Type</span>
            <span>Status</span>
          </div>
          {appointments.map((row) => (
            <div key={row.id} className="grid grid-cols-1 gap-1 border-b border-white/5 px-4 py-3 text-sm sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center">
              <span className="font-medium">{row.name}</span>
              <span className="text-slate-400">{row.when}</span>
              <span className="text-slate-400">{row.type}</span>
              <span className="text-emerald-400">{row.status}</span>
            </div>
          ))}
        </div>
      )}

      {view === "leads" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <div key={lead.name} className="rounded-2xl border border-white/8 bg-white/4 p-5">
              <p className="font-heading text-lg font-semibold">{lead.name}</p>
              <p className="mt-1 text-sm text-slate-400">{lead.intent}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{lead.source}</span>
                <span style={{ color: product.accent }}>Score {lead.score}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "analytics" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DemoStat label="Calls today" value="47" hint="+9 vs yesterday" accent={product.accent} />
          <DemoStat label="Booked" value="18" hint="38% conversion" accent={product.accent} />
          <DemoStat label="After hours" value="11" hint="Never missed" accent={product.accent} />
          <DemoStat label="Avg handle" value="1:42" hint="Within SLA" accent={product.accent} />
        </div>
      )}
    </DemoShell>
  );
}
