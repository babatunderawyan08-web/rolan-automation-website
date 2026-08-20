"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AnimatedLogo } from "@/components/shared/animated-logo";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export type DemoNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type DemoShellProps = {
  product: Product;
  items: DemoNavItem[];
  active: string;
  onChange: (id: string) => void;
  children: ReactNode;
};

export function DemoShell({ product, items, active, onChange, children }: DemoShellProps) {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div
      className="min-h-dvh bg-[#070b14] text-slate-100"
      style={{ ["--demo-accent" as string]: product.accent }}
    >
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-white/8 bg-[#070b14]/90 px-3 backdrop-blur-xl sm:h-16 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 md:hidden"
            onClick={() => setMobileNav((open) => !open)}
            aria-label="Open navigation"
          >
            {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <AnimatedLogo size="sm" href="/" showText={false} />
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold sm:text-base">{product.name}</p>
            <p className="hidden text-[11px] uppercase tracking-[0.16em] text-slate-500 sm:block">
              {product.productLine} · demo
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex"
            style={{ background: product.accentSoft, color: product.accent }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: product.accent }} />
            Live prototype
          </span>
          <Link
            href={`/portfolio/${product.slug}`}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-sm text-slate-300 hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to product</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      {mobileNav && (
        <div className="border-b border-white/8 bg-[#0c1220] px-3 py-2 md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onChange(item.id);
                  setMobileNav(false);
                }}
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm",
                  active === item.id ? "text-white" : "text-slate-400"
                )}
                style={active === item.id ? { background: product.accentSoft, color: product.accent } : undefined}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 border-r border-white/8 p-3 md:block">
          <nav className="space-y-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active === item.id ? "text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                )}
                style={active === item.id ? { background: product.accentSoft, color: product.accent } : undefined}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1 px-3 py-4 pb-24 sm:px-5 sm:py-6 md:pb-8">{children}</div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-[#070b14]/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="grid grid-cols-4 gap-1">
          {items.slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px]",
                active === item.id ? "text-white" : "text-slate-500"
              )}
              style={active === item.id ? { color: product.accent } : undefined}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function DemoStat({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 font-heading text-2xl font-semibold" style={{ color: accent }}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
