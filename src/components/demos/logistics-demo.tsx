"use client";

import { useState } from "react";
import { BarChart3, MapPinned, Package, Radio, Truck } from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const TIMELINE = ["Created", "Driver assigned", "Picked up", "Out for delivery", "Delivered"];

const INITIAL = [
  { id: "RF-2044", dest: "Harbor Labs", city: "Austin", driver: "Maya Chen", status: 2 },
  { id: "RF-2041", dest: "Northline", city: "Dallas", driver: "Unassigned", status: 0 },
  { id: "RF-2038", dest: "Field & Co", city: "Houston", driver: "Kenji Mori", status: 4 },
];

const DRIVERS = [
  { name: "Maya Chen", load: "1 active", zone: "Central" },
  { name: "Kenji Mori", load: "Idle", zone: "South" },
  { name: "Sofia Lane", load: "Idle", zone: "North" },
];

export function LogisticsDemo({ product }: { product: Product }) {
  const [view, setView] = useState("shipments");
  const [shipments, setShipments] = useState(INITIAL);
  const [selected, setSelected] = useState(INITIAL[0]);
  const [dest, setDest] = useState("");
  const [notifications, setNotifications] = useState(["RF-2044 · Picked up · automated delivery notification sent"]);
  const [support, setSupport] = useState("Ask AI support where this shipment is.");

  const createShipment = () => {
    if (!dest.trim()) return;
    const next = { id: `RF-20${50 + shipments.length}`, dest, city: "Austin", driver: "Unassigned", status: 0 };
    setShipments((rows) => [next, ...rows]);
    setSelected(next);
    setDest("");
    setNotifications((rows) => [`${next.id} created · automated delivery notification sent`, ...rows]);
    setView("tracking");
  };

  const assignDriver = (id: string) => {
    setShipments((rows) => rows.map((row) => (row.id === id ? { ...row, driver: "Sofia Lane", status: Math.max(row.status, 1) } : row)));
    setSelected((row) => (row.id === id ? { ...row, driver: "Sofia Lane", status: Math.max(row.status, 1) } : row));
    setNotifications((rows) => [`${id} · Driver assigned · automated delivery notification sent`, ...rows]);
  };

  const advance = (id: string) => {
    const current = shipments.find((row) => row.id === id) ?? selected;
    const nextStatus = Math.min(current.status + 1, TIMELINE.length - 1);
    setShipments((rows) => rows.map((row) => (row.id === id ? { ...row, status: nextStatus } : row)));
    setSelected((row) => (row.id === id ? { ...row, status: nextStatus } : row));
    setNotifications((rows) => [`${id} · ${TIMELINE[nextStatus]} · automated delivery notification sent`, ...rows]);
  };

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "shipments", label: "Shipments", icon: Package },
        { id: "tracking", label: "Tracking", icon: MapPinned },
        { id: "drivers", label: "Drivers", icon: Truck },
        { id: "dispatch", label: "Dispatch", icon: Radio },
        { id: "ops", label: "Ops", icon: BarChart3 },
      ]}
    >
      {view === "shipments" && (
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <h2 className="font-heading text-xl font-semibold">Create shipment</h2>
            <input
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              placeholder="Destination name"
              className="mt-4 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-slate-500"
            />
            <Button className="mt-4 w-full" onClick={createShipment}>Create job</Button>
          </div>
          <div className="space-y-3">
            {shipments.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={() => {
                  setSelected(row);
                  setView("tracking");
                }}
                className="flex w-full flex-col gap-1 rounded-2xl border border-white/8 bg-white/4 p-4 text-left sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium">{row.id} · {row.dest}</span>
                <span className="text-sm" style={{ color: product.accent }}>{TIMELINE[row.status]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "tracking" && (
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">{selected.id} · real-time status</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold">{selected.dest}</h2>
            <p className="mt-1 text-sm text-slate-400">{selected.city} · {selected.driver}</p>
            <ol className="mt-6 space-y-3">
              {TIMELINE.map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: i <= selected.status ? product.accent : "rgba(255,255,255,0.15)" }} />
                  <span className={i <= selected.status ? "text-white" : "text-slate-500"}>{step}</span>
                </li>
              ))}
            </ol>
            <Button className="mt-6" onClick={() => advance(selected.id)}>Update status</Button>
          </div>
          <div className="space-y-3">
            <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">AI support</p>
              <p className="mt-3 text-sm text-slate-300">{support}</p>
              <Button
                className="mt-4"
                size="sm"
                variant="outline"
                onClick={() => setSupport(`AI support: ${selected.id} is currently ${TIMELINE[selected.status]}. An automated delivery notification was sent to the customer.`)}
              >
                Ask AI support
              </Button>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">Automated delivery notifications</p>
              <div className="mt-3 space-y-2">
                {notifications.map((item) => (
                  <p key={item} className="rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-300">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "drivers" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {DRIVERS.map((driver) => (
            <div key={driver.name} className="rounded-2xl border border-white/8 bg-white/4 p-5">
              <p className="font-heading text-lg font-semibold">{driver.name}</p>
              <p className="mt-2 text-sm text-slate-400">{driver.zone}</p>
              <p className="mt-3 text-sm" style={{ color: product.accent }}>{driver.load}</p>
            </div>
          ))}
        </div>
      )}

      {view === "dispatch" && (
        <div className="space-y-3">
          {shipments.map((row) => (
            <div key={row.id} className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{row.id} · {row.dest}</p>
                <p className="text-sm text-slate-400">{row.driver}</p>
              </div>
              {row.driver === "Unassigned" ? (
                <Button size="sm" onClick={() => assignDriver(row.id)}>Assign driver</Button>
              ) : (
                <span className="text-sm" style={{ color: product.accent }}>{TIMELINE[row.status]}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {view === "ops" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DemoStat label="Active jobs" value={`${shipments.filter((row) => row.status < 4).length}`} accent={product.accent} />
          <DemoStat label="On time" value="94%" accent={product.accent} />
          <DemoStat label="Drivers" value="3" accent={product.accent} />
          <DemoStat label="Avg transit" value="6.4h" accent={product.accent} />
        </div>
      )}
    </DemoShell>
  );
}
