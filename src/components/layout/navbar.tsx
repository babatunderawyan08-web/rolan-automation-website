"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { AnimatedLogo } from "@/components/shared/animated-logo";
import { SiteSearch } from "@/components/layout/site-search";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const navFocusRing =
  "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function isNavActive(pathname: string, href: string) {
  if (pathname === href) return true;
  if (href === "/") return false;
  return pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const isLargeScreen = useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(min-width: 1024px)");
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false
  );
  const [navPath, setNavPath] = useState(pathname);

  if (pathname !== navPath) {
    setNavPath(pathname);
    setOpen(false);
    setSearchOpen(false);
  }

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    requestAnimationFrame(() => searchButtonRef.current?.focus());
  }, []);

  const openSearch = useCallback(() => {
    setOpen(false);
    setSearchOpen(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [searchOpen, isLargeScreen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, closeSearch]);

  const searchPanelId = "site-header-search";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
      >
        Skip to main content
      </a>

      <nav
        className="container mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 md:h-20 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-6"
        aria-label="Main"
      >
        <div className="flex min-w-0 items-center lg:justify-self-start">
          <AnimatedLogo size="sm" className="sm:hidden" href="/" ariaLabel="ROLAN Studio home" />
          <AnimatedLogo size="md" className="hidden sm:flex" href="/" ariaLabel="ROLAN Studio home" />
        </div>

        <div className="hidden min-w-0 items-center justify-center lg:flex">
          {searchOpen && isLargeScreen ? (
            <div className="flex w-full max-w-lg items-start gap-2">
              <SiteSearch
                className="min-w-0 flex-1"
                inputRef={searchInputRef}
                onNavigate={closeSearch}
                onClose={closeSearch}
              />
              <button
                type="button"
                onClick={closeSearch}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-1.5 px-3 text-sm font-medium text-muted transition-colors hover:text-foreground",
                  navFocusRing
                )}
                aria-label="Close search"
              >
                <span aria-hidden className="text-base leading-none">
                  ×
                </span>
                Close
              </button>
            </div>
          ) : !searchOpen ? (
            <ul className="flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = isNavActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-secondary",
                        navFocusRing,
                        active ? "text-secondary" : "text-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-1.5 sm:gap-2 lg:justify-self-end">
          <button
            ref={searchButtonRef}
            type="button"
            onClick={() => (searchOpen ? closeSearch() : openSearch())}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:bg-background-alt hover:text-foreground",
              navFocusRing,
              searchOpen && "sr-only"
            )}
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls={searchOpen ? searchPanelId : undefined}
          >
            <Search className="h-5 w-5" />
          </button>

          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:bg-background-alt hover:text-foreground",
                navFocusRing
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}

          {!searchOpen && (
            <>
              <Button variant="outline" size="sm" className="hidden min-h-11 md:inline-flex" asChild>
                <Link href="/portfolio">Explore work</Link>
              </Button>
              <Button variant="accent" size="sm" className="hidden min-h-11 md:inline-flex" asChild>
                <Link href="/contact">Start a project</Link>
              </Button>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className={cn("inline-flex h-11 w-11 items-center justify-center lg:hidden", navFocusRing)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          )}
        </div>
      </nav>

      {searchOpen && !isLargeScreen && (
        <div
          id={searchPanelId}
          className="border-t border-border bg-card px-4 py-3 lg:hidden"
          role="search"
          aria-label="Site search"
        >
          <div className="mx-auto flex max-w-xl items-start gap-2">
            <SiteSearch
              className="min-w-0 flex-1"
              inputRef={searchInputRef}
              onNavigate={closeSearch}
              onClose={closeSearch}
            />
            <button
              type="button"
              onClick={closeSearch}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-1.5 px-3 text-sm font-medium text-muted transition-colors hover:text-foreground",
                navFocusRing
              )}
              aria-label="Close search"
            >
              <span aria-hidden className="text-base leading-none">
                ×
              </span>
              Close
            </button>
          </div>
        </div>
      )}

      {open && !searchOpen && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-border bg-card px-4 py-4 lg:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const active = isNavActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-3.5 text-sm font-medium transition-colors hover:bg-background-alt focus-visible:bg-background-alt",
                      navFocusRing,
                      active && "bg-background-alt text-secondary"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
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
