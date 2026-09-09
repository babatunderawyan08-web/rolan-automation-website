"use client";

import { useMemo, useState } from "react";
import { Bell, CalendarDays, Stethoscope, Users, ClipboardList } from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const DAYS = ["Mon 17", "Tue 18", "Wed 19", "Thu 20", "Fri 21"];
const HOURS = ["09:00", "10:00", "11:00", "13:00", "14:00"];

const STAFF = [
  { name: "Dr. Maya Chen", role: "General practice", load: "6 visits" },
  { name: "Dr. Kenji Mori", role: "Follow-up clinic", load: "4 visits" },
  { name: "Jordan Hale", role: "Front desk", load: "On shift" },
];

const HISTORY = [
  { when: "12 Aug", title: "Routine check-in", with: "Dr. Maya Chen" },
  { when: "03 Jul", title: "Follow-up visit", with: "Dr. Kenji Mori" },
];

export function ClinicDemo({ product }: { product: Product }) {
  const [view, setView] = useState("book");
  const [appointments, setAppointments] = useState([
    { id: "1", day: "Wed 19", time: "11:00", name: "Amelia Cho", with: "Dr. Maya Chen" },
    { id: "2", day: "Thu 20", time: "10:00", name: "Chris Adeyemi", with: "Dr. Kenji Mori" },
  ]);
  const [selected, setSelected] = useState<{ day: string; time: string } | null>(null);
  const [notes, setNotes] = useState(["Reminder queued for Amelia Cho", "AI receptionist offered Thu 10:00"]);

  const booked = useMemo(() => new Set(appointments.map((row) => `${row.day}-${row.time}`)), [appointments]);

  const confirm = () => {
    if (!selected || booked.has(`${selected.day}-${selected.time}`)) return;
    setAppointments((rows) => [
      ...rows,
      { id: `${rows.length + 1}`, day: selected.day, time: selected.time, name: "You", with: "Dr. Maya Chen" },
    ]);
    setNotes((rows) => [`Appointment booked · ${selected.day} ${selected.time} · reminder scheduled`, ...rows]);
    setSelected(null);
    setView("reminders");
  };

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "book", label: "Book", icon: CalendarDays },
        { id: "patients", label: "Patients", icon: ClipboardList },
        { id: "staff", label: "Staff", icon: Stethoscope },
        { id: "schedule", label: "Schedule", icon: Users },
        { id: "reminders", label: "Reminders", icon: Bell },
      ]}
    >
      <p className="mb-4 rounded-xl border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-xs text-teal-100">
        Fictional clinic demo. Sample names only. Not a medical service and not real patient data.
      </p>

      {view === "book" && (
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
            <h3 className="font-heading text-lg font-semibold">AI receptionist</h3>
            <p className="mt-2 text-sm text-slate-400">
              {selected ? `Available slot found: ${selected.day} · ${selected.time}. Confirm to book and queue reminders.` : "Select an open time. The AI receptionist will hold it, then send reminders."}
            </p>
            <Button className="mt-5 w-full" disabled={!selected} onClick={confirm}>
              Confirm appointment
            </Button>
          </div>
        </div>
      )}

      {view === "patients" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">Patient dashboard</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold">Amelia Cho</h2>
            <p className="mt-2 text-sm text-slate-400">Next visit · Wed 19 · 11:00 · Dr. Maya Chen</p>
          </div>
          <div className="space-y-3">
            {HISTORY.map((row) => (
              <div key={row.when} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <p className="font-medium">{row.title}</p>
                <p className="mt-1 text-sm text-slate-400">{row.when} · {row.with}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "staff" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {STAFF.map((person) => (
            <div key={person.name} className="rounded-2xl border border-white/8 bg-white/4 p-5">
              <p className="font-heading text-lg font-semibold">{person.name}</p>
              <p className="mt-2 text-sm text-slate-400">{person.role}</p>
              <p className="mt-3 text-sm" style={{ color: product.accent }}>{person.load}</p>
            </div>
          ))}
        </div>
      )}

      {view === "schedule" && (
        <div className="space-y-3">
          {appointments.map((row) => (
            <div key={row.id} className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-sm text-slate-400">{row.with}</p>
              </div>
              <p className="text-sm text-slate-400">{row.day} · {row.time}</p>
            </div>
          ))}
        </div>
      )}

      {view === "reminders" && (
        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold">Reminders</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <DemoStat label="Today" value={`${appointments.length}`} accent={product.accent} />
            <DemoStat label="Open slots" value="18" accent={product.accent} />
            <DemoStat label="Reminders" value={`${notes.length}`} accent={product.accent} />
          </div>
          {notes.map((note) => (
            <div key={note} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm">
              {note}
            </div>
          ))}
        </div>
      )}
    </DemoShell>
  );
}
