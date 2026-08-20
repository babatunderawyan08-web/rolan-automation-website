"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { AnimatedLogo } from "@/components/shared/animated-logo";
import { SiteSearch } from "@/components/layout/site-search";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 16);
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
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 md:h-20">
        <AnimatedLogo size="sm" className="min-w-0 sm:hidden" />
        <AnimatedLogo size="md" className="hidden sm:flex" />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-secondary",
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-secondary"
                    : "text-muted"
                )}
              >
                {link.label}
              </Link>
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
          <Button variant="outline" size="sm" className="hidden min-h-11 md:inline-flex" asChild>
            <Link href="/portfolio">Explore work</Link>
          </Button>
          <Button variant="accent" size="sm" className="hidden min-h-11 md:inline-flex" asChild>
            <Link href="/contact">Start a project</Link>
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
          <SiteSearch onNavigate={() => setSearchOpen(false)} />
        </div>
      )}

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-border bg-card px-4 py-4 lg:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-lg px-3 py-3.5 text-sm font-medium transition-colors hover:bg-background-alt",
                    pathname === link.href && "bg-background-alt text-secondary"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="space-y-2 pt-3">
              <Button variant="accent" className="w-full min-h-12" asChild>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Start a project
                </Link>
              </Button>
              <Button variant="outline" className="w-full min-h-12" asChild>
                <Link href="/book-appointment" onClick={() => setOpen(false)}>
                  Book a call
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
