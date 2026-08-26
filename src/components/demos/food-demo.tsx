"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BarChart3, ChefHat, ShoppingBag, Store, Truck } from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const RESTAURANTS = [
  { id: "nori", name: "Nori Kitchen", cuisine: "Japanese", eta: "28 min", rating: "4.8" },
  { id: "harbor", name: "Harbor Bao", cuisine: "Taiwanese", eta: "22 min", rating: "4.6" },
  { id: "grove", name: "Grove Greens", cuisine: "Salads", eta: "18 min", rating: "4.7" },
];

const MENUS: Record<string, { id: string; name: string; price: number; category: string }[]> = {
  nori: [
    { id: "salmon", name: "Citrus salmon bowl", price: 18, category: "Bowls" },
    { id: "miso", name: "Miso ramen", price: 16, category: "Noodles" },
    { id: "edamame", name: "Sesame edamame", price: 7, category: "Sides" },
  ],
  harbor: [
    { id: "pork", name: "Pork bao pair", price: 12, category: "Bao" },
    { id: "chili", name: "Chili cucumber", price: 6, category: "Sides" },
  ],
  grove: [
    { id: "kale", name: "Kale citrus salad", price: 14, category: "Salads" },
    { id: "soup", name: "Tomato basil soup", price: 9, category: "Soups" },
  ],
};

const STATUSES = ["Confirmed", "Kitchen", "Ready", "Out for delivery"];

export function FoodDemo({ product }: { product: Product }) {
  const [view, setView] = useState("discover");
  const [restaurant, setRestaurant] = useState(RESTAURANTS[0]);
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  const [orderStatus, setOrderStatus] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [tickets, setTickets] = useState([{ id: "T12", dish: "Citrus salmon bowl", status: "Kitchen" }]);
  const [assistant, setAssistant] = useState("AI order assistant can recommend a dish and add it to the cart.");
  const [notifications, setNotifications] = useState(["Order T12 · Kitchen · automated notification sent"]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const menu = MENUS[restaurant.id];

  const addItem = (item: { id: string; name: string; price: number }) => {
    setCart((rows) => {
      const existing = rows.find((row) => row.id === item.id);
      if (existing) return rows.map((row) => (row.id === item.id ? { ...row, qty: row.qty + 1 } : row));
      return [...rows, { ...item, qty: 1 }];
    });
  };

  const checkout = () => {
    if (!cart.length) return;
    setPlaced(true);
    setOrderStatus(0);
    setTickets((rows) => [{ id: "T18", dish: cart[0].name, status: "Confirmed" }, ...rows]);
    setNotifications((rows) => [`Order T18 confirmed · automated notification sent`, ...rows]);
    setView("tracking");
  };

  const advanceKitchen = (id: string) => {
    setTickets((rows) =>
      rows.map((row) => (row.id === id ? { ...row, status: row.status === "Confirmed" ? "Kitchen" : "Ready" } : row))
    );
    setOrderStatus((value) => Math.min(value + 1, STATUSES.length - 1));
    setNotifications((rows) => [`Order ${id} · ${STATUSES[Math.min(orderStatus + 1, STATUSES.length - 1)]} · automated notification sent`, ...rows]);
  };

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "discover", label: "Discover", icon: Store },
        { id: "menu", label: "Menu", icon: ShoppingBag },
        { id: "tracking", label: "Tracking", icon: Truck },
        { id: "kitchen", label: "Kitchen", icon: ChefHat },
        { id: "sales", label: "Sales", icon: BarChart3 },
      ]}
    >
      {view === "discover" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {RESTAURANTS.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => {
                setRestaurant(row);
                setView("menu");
              }}
              className="rounded-2xl border border-white/8 bg-white/4 p-4 text-left"
              style={restaurant.id === row.id ? { borderColor: product.accent } : undefined}
            >
              <div className="relative mb-3 h-24 overflow-hidden rounded-xl">
                <Image
                  src={row.id === "harbor" ? "/images/products/food-2.jpg" : product.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
              <p className="font-medium">{row.name}</p>
              <p className="mt-1 text-sm text-slate-400">{row.cuisine} · {row.eta} · {row.rating}</p>
            </button>
          ))}
        </div>
      )}

      {view === "menu" && (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-heading text-2xl font-semibold">{restaurant.name}</h2>
            <p className="mt-1 text-sm text-slate-400">Browse the menu, then checkout from the cart.</p>
            <div className="mt-5 space-y-3">
              {menu.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.category} · ${item.price}</p>
                  </div>
                  <Button size="sm" onClick={() => addItem(item)}>Add</Button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <h3 className="font-heading text-lg font-semibold">Cart</h3>
            <div className="mt-4 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.qty} × {item.name}</span>
                  <span>${item.price * item.qty}</span>
                </div>
              ))}
              {cart.length === 0 && <p className="text-sm text-slate-500">Cart is empty.</p>}
            </div>
            <p className="mt-4 font-heading text-xl" style={{ color: product.accent }}>${total}</p>
            <Button className="mt-4 w-full" disabled={!cart.length} onClick={checkout}>
              Checkout
            </Button>
            <div className="mt-5 rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">AI order assistant</p>
              <p className="mt-2 text-sm text-slate-300">{assistant}</p>
              <Button
                className="mt-4"
                size="sm"
                variant="outline"
                onClick={() => {
                  const item = menu[0];
                  addItem(item);
                  setAssistant(`AI order assistant: ${item.name} is the most ordered dish. Added to cart.`);
                }}
              >
                Recommend a dish
              </Button>
            </div>
          </div>
        </div>
      )}

      {view === "tracking" && (
        <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Order {placed ? "T18" : "T12"}</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">{STATUSES[orderStatus]}</h2>
          <div className="mt-6 grid grid-cols-4 gap-2 text-center text-xs">
            {STATUSES.map((status, i) => (
              <div key={status} className="rounded-xl px-2 py-3" style={{ background: i <= orderStatus ? product.accentSoft : "rgba(255,255,255,0.04)", color: i <= orderStatus ? product.accent : "#64748b" }}>
                {status}
              </div>
            ))}
          </div>
          <h3 className="mt-6 text-sm font-medium">Automated notifications</h3>
          <div className="mt-3 space-y-2">
            {notifications.map((item) => (
              <p key={item} className="rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-300">{item}</p>
            ))}
          </div>
        </div>
      )}

      {view === "kitchen" && (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{ticket.id} · {ticket.dish}</p>
                <p className="text-sm text-slate-400">{ticket.status}</p>
              </div>
              <Button size="sm" onClick={() => advanceKitchen(ticket.id)}>Advance status</Button>
            </div>
          ))}
        </div>
      )}

      {view === "sales" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DemoStat label="Today" value="$1,280" hint="64 orders" accent={product.accent} />
          <DemoStat label="Avg ticket" value="$20" accent={product.accent} />
          <DemoStat label="Kitchen time" value="11m" hint="Median" accent={product.accent} />
          <DemoStat label="Repeat" value="38%" accent={product.accent} />
        </div>
      )}
    </DemoShell>
  );
}
