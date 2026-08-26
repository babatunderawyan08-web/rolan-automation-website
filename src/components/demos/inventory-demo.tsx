"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, BarChart3, Boxes, ClipboardList } from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";

const INITIAL = [
  { sku: "NX-1042", name: "Carbon filter pack", stock: 18, reorder: 24, location: "A1" },
  { sku: "NX-2088", name: "Steel brackets", stock: 240, reorder: 80, location: "B4" },
  { sku: "NX-3310", name: "Sensor kit", stock: 9, reorder: 20, location: "C2" },
  { sku: "NX-4412", name: "Power module", stock: 64, reorder: 30, location: "A3" },
  { sku: "NX-5501", name: "Gasket set", stock: 4, reorder: 16, location: "D1" },
];

const ORDERS = [
  { id: "SO-8841", customer: "Harbor Labs", items: 12, total: "$4,280", status: "Packed" },
  { id: "SO-8836", customer: "Northline", items: 3, total: "$890", status: "Picking" },
  { id: "PO-2201", customer: "Apex Supply", items: 80, total: "$6,400", status: "Inbound" },
  { id: "SO-8820", customer: "Field & Co", items: 7, total: "$1,150", status: "Shipped" },
];

export function InventoryDemo({ product }: { product: Product }) {
  const [view, setView] = useState("products");
  const [products, setProducts] = useState(INITIAL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => products.filter((row) => `${row.name} ${row.sku}`.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );
  const alerts = products.filter((row) => row.stock <= row.reorder);

  const receive = (sku: string) => {
    setProducts((rows) => rows.map((row) => (row.sku === sku ? { ...row, stock: row.stock + 12 } : row)));
  };

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "products", label: "Products", icon: Boxes },
        { id: "orders", label: "Orders", icon: ClipboardList },
        { id: "alerts", label: "Alerts", icon: AlertTriangle },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
      ]}
    >
      {view === "products" && (
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-2xl font-semibold">Catalog</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search SKU or product"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-slate-500 focus:border-[var(--demo-accent)] sm:max-w-xs"
            />
          </div>
          <div className="overflow-x-auto rounded-3xl border border-white/8">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead className="bg-white/4 text-[11px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">SKU</th>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">On hand</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const low = row.stock <= row.reorder;
                  return (
                    <tr key={row.sku} className="border-t border-white/5">
                      <td className="px-4 py-3 text-slate-400">{row.sku}</td>
                      <td className="px-4 py-3">{row.name}</td>
                      <td className="px-4 py-3">{row.stock}</td>
                      <td className="px-4 py-3">
                        <span className={low ? "text-amber-300" : "text-emerald-400"}>{low ? "Low stock" : "Healthy"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => receive(row.sku)}
                          className="rounded-lg px-3 py-1.5 text-xs"
                          style={{ background: product.accentSoft, color: product.accent }}
                        >
                          Receive +12
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "orders" && (
        <div className="grid gap-3">
          {ORDERS.map((order) => (
            <div key={order.id} className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{order.id} · {order.customer}</p>
                <p className="text-sm text-slate-400">{order.items} lines</p>
              </div>
              <div className="flex items-center gap-4">
                <span>{order.total}</span>
                <span className="text-sm" style={{ color: product.accent }}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "alerts" && (
        <div className="space-y-3">
          {alerts.map((row) => (
            <div key={row.sku} className="flex items-center justify-between rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-sm text-slate-400">{row.stock} on hand · reorder at {row.reorder}</p>
              </div>
              <button
                type="button"
                onClick={() => receive(row.sku)}
                className="rounded-lg px-3 py-2 text-sm"
                style={{ background: product.accentSoft, color: product.accent }}
              >
                Create PO
              </button>
            </div>
          ))}
        </div>
      )}

      {view === "analytics" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DemoStat label="SKUs" value={`${products.length}`} accent={product.accent} />
          <DemoStat label="Low stock" value={`${alerts.length}`} hint="Needs reorder" accent={product.accent} />
          <DemoStat label="Open orders" value="4" hint="$12.7k pipeline" accent={product.accent} />
          <DemoStat label="Fill rate" value="97%" hint="Last 30 days" accent={product.accent} />
        </div>
      )}
    </DemoShell>
  );
}
