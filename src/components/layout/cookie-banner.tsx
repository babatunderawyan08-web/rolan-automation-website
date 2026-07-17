"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CONSENT_KEY = "cookie-consent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getConsentSnapshot() {
  return localStorage.getItem(CONSENT_KEY);
}

function getServerConsentSnapshot() {
  return "server";
}

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerConsentSnapshot
  );

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new StorageEvent("storage", { key: CONSENT_KEY }));
  }, []);

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-2xl sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border">
      <div className="flex items-start gap-3 pr-1 sm:pr-0">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">We value your privacy</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            We use cookies to improve your experience and analyze site traffic.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" className="min-h-11 px-5" onClick={accept}>
              Accept
            </Button>
            <Button size="sm" variant="outline" className="min-h-11 px-5" onClick={accept}>
              Decline
            </Button>
          </div>
        </div>
        <button
          type="button"
          onClick={accept}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-background-alt hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
