"use client";

import { useMemo, useState } from "react";
import { Bell, CalendarDays, LayoutDashboard, Video } from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const DAYS = ["Mon 17", "Tue 18", "Wed 19", "Thu 20", "Fri 21"];
const HOURS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

const INITIAL = [
  { id: "1", day: "Wed 19", time: "11:00", name: "Studio review", mode: "Video", with: "Amelia Cho" },
  { id: "2", day: "Thu 20", time: "10:00", name: "Product walkthrough", mode: "Audio", with: "Kenji Mori" },
  { id: "3", day: "Fri 21", time: "14:00", name: "Kickoff", mode: "Video", with: "Harbor Labs" },
];

export function BookDemo({ product }: { product: Product }) {
  const [view, setView] = useState("calendar");
  const [appointments, setAppointments] = useState(INITIAL);
  const [selected, setSelected] = useState<{ day: string; time: string } | null>(null);
  const [mode, setMode] = useState("Video");
  const [notes, setNotes] = useState<string[]>(["Reminder sent to Amelia Cho", "Kenji Mori confirmed audio"]);

  const booked = useMemo(() => new Set(appointments.map((row) => `${row.day}-${row.time}`)), [appointments]);

  const bookSlot = () => {
    if (!selected || booked.has(`${selected.day}-${selected.time}`)) return;
    setAppointments((rows) => [
      ...rows,
      { id: `${rows.length + 1}`, day: selected.day, time: selected.time, name: "New discovery call", mode, with: "You" },
    ]);
    setNotes((rows) => [`Booked ${selected.day} ${selected.time} · ${mode}`, ...rows]);
    setSelected(null);
  };

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "calendar", label: "Calendar", icon: CalendarDays },
        { id: "appointments", label: "Meetings", icon: Video },
        { id: "notifications", label: "Alerts", icon: Bell },
        { id: "overview", label: "Overview", icon: LayoutDashboard },
      ]}
    >
      {view === "calendar" && (
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-x-auto rounded-3xl border border-white/8">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-6 border-b border-white/8 bg-white/4 text-center text-[11px] uppercase tracking-widest text-slate-500">
                <div className="px-2 py-3">Time</div>
                {DAYS.map((day) => (
                  <div key={day} className="px-2 py-3">{day}</div>
                ))}
              </div>
              {HOURS.map((hour) => (
                <div key={hour} className="grid grid-cols-6 border-b border-white/5">
                  <div className="px-2 py-3 text-xs text-slate-500">{hour}</div>
                  {DAYS.map((day) => {
                    const key = `${day}-${hour}`;
                    const taken = booked.has(key);
                    const active = selected?.day === day && selected?.time === hour;
                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={taken}
                        onClick={() => setSelected({ day, time: hour })}
                        className="m-1 min-h-12 rounded-lg text-xs"
                        style={{
                          background: taken ? product.accentSoft : active ? "rgba(255,255,255,0.1)" : "transparent",
                          color: taken ? product.accent : "#94a3b8",
                        }}
                      >
                        {taken ? "Booked" : "Open"}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <h3 className="font-heading text-lg font-semibold">Book a slot</h3>
            <p className="mt-2 text-sm text-slate-400">
              {selected ? `${selected.day} · ${selected.time}` : "Select an open time on the calendar."}
            </p>
            <div className="mt-4 flex gap-2">
              {["Video", "Audio"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  className="rounded-lg px-3 py-2 text-sm"
                  style={mode === option ? { background: product.accentSoft, color: product.accent } : { background: "rgba(255,255,255,0.05)" }}
                >
                  {option}
                </button>
              ))}
            </div>
            <Button className="mt-5 w-full" disabled={!selected} onClick={bookSlot}>
              Confirm appointment
            </Button>
          </div>
        </div>
      )}

      {view === "appointments" && (
        <div className="space-y-3">
          {appointments.map((row) => (
            <div key={row.id} className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-sm text-slate-400">{row.with}</p>
              </div>
              <p className="text-sm text-slate-400">{row.day} · {row.time}</p>
              <span style={{ color: product.accent }}>{row.mode}</span>
            </div>
          ))}
        </div>
      )}

      {view === "notifications" && (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm">
              {note}
            </div>
          ))}
        </div>
      )}

      {view === "overview" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DemoStat label="This week" value={`${appointments.length}`} accent={product.accent} />
          <DemoStat label="Open slots" value="22" accent={product.accent} />
          <DemoStat label="Video" value="2" accent={product.accent} />
          <DemoStat label="No-show risk" value="Low" accent={product.accent} />
        </div>
      )}
    </DemoShell>
  );
}
