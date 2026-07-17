"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, Search, ChevronDown, Bot, PhoneCall } from "lucide-react";
import { AnimatedLogo } from "@/components/shared/animated-logo";
import { BrandLogo } from "@/components/shared/brand-logo";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { services, callCenterServices } from "@/data/site-data";
import { hasBrandLogo } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import type { Service } from "@/types";

/** Prefer official brand marks when available; otherwise Lucide service icons. */
const SERVICE_BRAND: Record<string, string> = {
  zapier: "Zapier",
  make: "Make",
  n8n: "n8n",
  openai: "OpenAI",
  claude: "Claude",
  gemini: "Gemini",
  whatsapp: "WhatsApp",
  "3cx": "3CX",
  vicidial: "VICIdial",
  freepbx: "FreePBX",
  asterisk: "Asterisk",
};

function ServiceMenuIcon({ service }: { service: Service }) {
  const brand = SERVICE_BRAND[service.id];
  if (brand && hasBrandLogo(brand)) {
    return <BrandLogo name={brand} size={16} className="rounded-sm" />;
  }
  return <DynamicIcon name={service.icon} className="h-4 w-4 shrink-0" />;
}

function MegaHeading({
  label,
  variant,
}: {
  label: string;
  variant: "automation" | "call-center";
}) {
  const Icon = variant === "automation" ? Bot : PhoneCall;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="mb-4"
    >
      <div
        className={cn(
          "mb-2.5 h-px w-full",
          variant === "automation" ? "mega-rule-automation" : "mega-rule-callcenter"
        )}
      />
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-md",
            variant === "automation" ? "bg-secondary/10 text-secondary" : "bg-accent/10 text-accent"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.14em]",
            variant === "automation" ? "mega-heading-automation" : "mega-heading-callcenter"
          )}
        >
          {label}
        </p>
      </div>
      <div
        className={cn(
          "mt-2.5 h-px w-full",
          variant === "automation" ? "mega-rule-automation" : "mega-rule-callcenter"
        )}
      />
    </motion.div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [navPath, setNavPath] = useState(pathname);

  if (pathname !== navPath) {
    setNavPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20">
        <AnimatedLogo size="md" className="hidden sm:flex" />
        <AnimatedLogo size="sm" showText={false} className="sm:hidden" />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative" onMouseEnter={() => link.mega && setMegaOpen(true)} onMouseLeave={() => link.mega && setMegaOpen(false)}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-secondary",
                  pathname === link.href ? "text-secondary" : "text-muted"
                )}
              >
                {link.label}
                {link.mega && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {link.mega && megaOpen && (
                <div
                  className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-2"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <div className="rounded-2xl border border-border bg-card p-6 card-shadow-hover">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <MegaHeading label="Automation" variant="automation" />
                        <ul className="space-y-1">
                          {services.slice(0, 8).map((s, i) => (
                            <li key={s.id}>
                              <motion.div
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.04 * i, duration: 0.25 }}
                              >
                                <Link
                                  href={`/services/${s.id}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:bg-background-alt hover:text-foreground"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                                    <ServiceMenuIcon service={s} />
                                  </span>
                                  {s.title}
                                </Link>
                              </motion.div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <MegaHeading label="Call Center" variant="call-center" />
                        <ul className="space-y-1">
                          {callCenterServices.slice(0, 8).map((s, i) => (
                            <li key={s.id}>
                              <motion.div
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.04 * i, duration: 0.25 }}
                              >
                                <Link
                                  href={`/services/${s.id}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:bg-background-alt hover:text-foreground"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                    <ServiceMenuIcon service={s} />
                                  </span>
                                  {s.title}
                                </Link>
                              </motion.div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-border pt-4">
                      <Link href="/services" className="text-sm font-medium text-secondary hover:underline">View all services →</Link>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-background-alt md:inline-flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-background-alt"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <Button variant="accent" size="sm" className="hidden min-h-11 md:inline-flex" asChild>
            <Link href="/book-consultation">Book Consultation</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-border bg-card px-4 py-3">
          <input type="search" placeholder="Search blog, services..." className="w-full max-w-xl mx-auto block rounded-xl border border-border bg-background px-4 py-2 text-sm" />
        </div>
      )}

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-card px-4 py-4 lg:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-background-alt"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button variant="accent" className="w-full min-h-11" asChild>
                <Link href="/book-consultation" onClick={() => setOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
