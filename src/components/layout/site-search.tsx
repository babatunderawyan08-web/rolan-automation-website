"use client";

import Link from "next/link";
import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  startTransition,
} from "react";
import { highlightMatch, searchSite, type SearchResult } from "@/lib/site-search";
import { cn } from "@/lib/utils";

type SiteSearchProps = {
  className?: string;
  onNavigate?: () => void;
};

function HighlightedText({ text, query }: { text: string; query: string }) {
  const { parts } = highlightMatch(text, query);
  return (
    <>
      {parts.map((part, i) =>
        part.match ? (
          <mark
            key={`${part.text}-${i}`}
            className="rounded-sm bg-secondary/15 px-0.5 font-medium text-secondary"
          >
            {part.text}
          </mark>
        ) : (
          <span key={`${part.text}-${i}`}>{part.text}</span>
        )
      )}
    </>
  );
}

export function SiteSearch({ className, onNavigate }: SiteSearchProps) {
  const inputId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(
    () => searchSite(deferredQuery, 8),
    [deferredQuery]
  );

  const showDropdown = deferredQuery.trim().length > 0;
  const showNoResults = showDropdown && results.length === 0;

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        startTransition(() => setQuery(""));
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const handleSelect = () => {
    setQuery("");
    onNavigate?.();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || results.length === 0) {
      if (event.key === "Escape") setQuery("");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const item = results[activeIndex];
      if (item) {
        handleSelect();
        window.location.assign(item.href);
      }
    } else if (event.key === "Escape") {
      setQuery("");
    }
  };

  return (
    <div ref={rootRef} className={cn("relative mx-auto w-full max-w-xl", className)}>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); }}
        onKeyDown={onKeyDown}
        placeholder="Search blog, services..."
        className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        autoComplete="off"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={showDropdown ? listId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 && results[activeIndex]
            ? `${listId}-option-${activeIndex}`
            : undefined
        }
      />

      {showDropdown && (
        <div
          id={listId}
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-border bg-card py-2 card-shadow-hover"
        >
          {showNoResults ? (
            <p className="px-4 py-3 text-sm text-muted">No results found.</p>
          ) : (
            <ul>
              {results.map((item: SearchResult, index) => (
                <li key={item.id} role="option" aria-selected={index === activeIndex}>
                  <Link
                    id={`${listId}-option-${index}`}
                    href={item.href}
                    onClick={handleSelect}
                    className={cn(
                      "block px-4 py-2.5 transition-colors hover:bg-background-alt",
                      index === activeIndex && "bg-background-alt"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-foreground">
                        <HighlightedText text={item.title} query={deferredQuery.trim()} />
                      </p>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                      <HighlightedText text={item.description} query={deferredQuery.trim()} />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
