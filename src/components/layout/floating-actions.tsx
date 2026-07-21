"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone, MessageCircle, X } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/brand-logo";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fabClass =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-110 active:scale-95 sm:h-12 sm:w-12";

  return (
    <>
      <div
        className="fixed bottom-[calc(7.5rem+env(safe-area-inset-bottom,0px))] right-3 z-40 flex flex-col items-end gap-2.5 sm:bottom-24 sm:right-6 sm:gap-3"
      >
        {/* Expanded contacts — mobile toggle; always visible from sm */}
        <div
          className={cn(
            "flex flex-col gap-2.5 transition-all duration-200 sm:flex sm:opacity-100 sm:translate-y-0",
            open
              ? "flex translate-y-0 opacity-100"
              : "pointer-events-none absolute opacity-0 translate-y-2 sm:pointer-events-auto sm:relative sm:opacity-100 sm:translate-y-0"
          )}
        >
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={fabClass}
            aria-label="WhatsApp"
          >
            <BrandLogo name="WhatsApp" size={24} />
          </a>
          <a
            href={SITE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={fabClass}
            aria-label="Telegram"
          >
            <BrandLogo name="Telegram" size={24} />
          </a>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
            aria-label="Call us"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>

        {/* Mobile contact launcher */}
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:hidden"
          aria-label={open ? "Close contact options" : "Contact options"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </button>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] left-3 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted shadow-lg transition-all hover:text-secondary sm:bottom-6 sm:left-6",
          showTop ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
