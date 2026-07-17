"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone, MessageSquare } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/brand-logo";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fabClass =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-110 sm:h-12 sm:w-12";

  return (
    <>
      <div className="fixed bottom-24 right-3 z-40 flex flex-col gap-2.5 sm:bottom-6 sm:right-6 sm:gap-3">
        <a
          href="https://wa.me/2347034821995"
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
          href={`tel:${SITE.phone}`}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white shadow-lg transition-transform hover:scale-110 sm:h-12 sm:w-12"
          aria-label="Call us"
        >
          <Phone className="h-5 w-5" />
        </a>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110 sm:h-12 sm:w-12"
          aria-label="Live chat"
          onClick={() => alert("Live chat integration placeholder — connect Intercom, Crisp, or Tawk.to")}
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-24 left-3 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted shadow-lg transition-all hover:text-secondary sm:bottom-6 sm:left-6",
          showTop ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
