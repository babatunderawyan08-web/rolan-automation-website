"use client";

import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  KeyRound,
  MapPin,
  Maximize2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { DemoShell } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";
import {
  PROPERTY_KINDS,
  PROPERTY_LISTINGS,
  PROPERTY_LOCATIONS,
  formatListingPrice,
  type ListingType,
  type PropertyKind,
  type PropertyListing,
} from "@/data/property-listings";
import { cn } from "@/lib/utils";

const SAVED_KEY = "rolan-demo-property-saved";

type NavId = "buy" | "rent" | "saved";
type PriceBand = "any" | "low" | "mid" | "high";
type ConfirmKind = "viewing" | "enquiry" | null;

const EMPTY_FILTERS = {
  query: "",
  location: "All",
  propertyType: "All" as "All" | PropertyKind,
  beds: "any",
  priceBand: "any" as PriceBand,
};

function loadSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function inPriceBand(listing: PropertyListing, band: PriceBand) {
  if (band === "any") return true;
  if (listing.listingType === "buy") {
    if (band === "low") return listing.price < 750_000;
    if (band === "mid") return listing.price >= 750_000 && listing.price <= 1_500_000;
    return listing.price > 1_500_000;
  }
  if (band === "low") return listing.price < 2500;
  if (band === "mid") return listing.price >= 2500 && listing.price <= 5000;
  return listing.price > 5000;
}

export function PropertyDemo({ product }: { product: Product }) {
  const [nav, setNav] = useState<NavId>("buy");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSaved(loadSaved());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [hydrated, saved]);

  const listingType: ListingType | "saved" = nav;
  const selected = selectedId ? PROPERTY_LISTINGS.find((row) => row.id === selectedId) : undefined;

  const results = useMemo(() => {
    const pool =
      nav === "saved"
        ? PROPERTY_LISTINGS.filter((row) => saved.includes(row.id))
        : PROPERTY_LISTINGS.filter((row) => row.listingType === nav);

    return pool.filter((row) => {
      const haystack = `${row.title} ${row.location} ${row.address} ${row.propertyType}`.toLowerCase();
      const queryOk = !filters.query.trim() || haystack.includes(filters.query.trim().toLowerCase());
      const locationOk = filters.location === "All" || row.location === filters.location;
      const typeOk = filters.propertyType === "All" || row.propertyType === filters.propertyType;
      const bedsOk = filters.beds === "any" || row.beds >= Number(filters.beds);
      const priceOk = inPriceBand(row, filters.priceBand);
      return queryOk && locationOk && typeOk && bedsOk && priceOk;
    });
  }, [filters, nav, saved]);

  const toggleSave = (id: string) => {
    setSaved((ids) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]));
  };

  const openListing = (id: string) => {
    setSelectedId(id);
    setFiltersOpen(false);
  };

  const handleNav = (id: string) => {
    const next = id as NavId;
    setNav(next);
    setSelectedId(null);
    if (next !== "saved") {
      setFilters((current) => ({ ...current, priceBand: "any" }));
    }
  };

  const filtersActive =
    filters.query !== "" ||
    filters.location !== "All" ||
    filters.propertyType !== "All" ||
    filters.beds !== "any" ||
    filters.priceBand !== "any";

  return (
    <DemoShell
      product={product}
      active={nav}
      onChange={handleNav}
      items={[
        { id: "buy", label: "Buy", icon: Home },
        { id: "rent", label: "Rent", icon: KeyRound },
        { id: "saved", label: "Saved", icon: Heart },
      ]}
    >
      {selected ? (
        <PropertyDetail
          listing={selected}
          product={product}
          saved={saved.includes(selected.id)}
          onBack={() => setSelectedId(null)}
          onToggleSave={() => toggleSave(selected.id)}
        />
      ) : (
        <BrowseView
          product={product}
          nav={nav}
          listingType={listingType}
          filters={filters}
          setFilters={setFilters}
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          filtersActive={filtersActive}
          results={results}
          saved={saved}
          onOpen={openListing}
          onToggleSave={toggleSave}
        />
      )}
    </DemoShell>
  );
}

function BrowseView({
  product,
  nav,
  listingType,
  filters,
  setFilters,
  filtersOpen,
  setFiltersOpen,
  filtersActive,
  results,
  saved,
  onOpen,
  onToggleSave,
}: {
  product: Product;
  nav: NavId;
  listingType: ListingType | "saved";
  filters: typeof EMPTY_FILTERS;
  setFilters: Dispatch<SetStateAction<typeof EMPTY_FILTERS>>;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  filtersActive: boolean;
  results: PropertyListing[];
  saved: string[];
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
}) {
  const heading = nav === "buy" ? "Homes for sale" : nav === "rent" ? "Homes to rent" : "Saved properties";
  const priceLabels: Array<[string, string]> =
    nav === "rent"
      ? [
          ["any", "Any rent"],
          ["low", "Under $2,500"],
          ["mid", "$2,500–$5,000"],
          ["high", "$5,000+"],
        ]
      : [
          ["any", "Any price"],
          ["low", "Under $750k"],
          ["mid", "$750k–$1.5M"],
          ["high", "$1.5M+"],
        ];

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {nav === "saved" ? "Favourites" : "Marketplace"}
          </p>
          <h2 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">{heading}</h2>
          <p className="mt-1 text-sm text-slate-400">
            {results.length} {results.length === 1 ? "home" : "homes"}
            {nav !== "saved" ? ` · ${nav === "buy" ? "for sale" : "to rent"}` : ""}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm lg:hidden"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {filtersActive && (
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: product.accent }} />
          )}
        </button>
      </div>

      <div className="mb-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={filters.query}
            onChange={(e) => setFilters((current) => ({ ...current, query: e.target.value }))}
            placeholder="Search by area, street, or listing name"
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm outline-none placeholder:text-slate-500 focus:border-[var(--demo-accent)]"
          />
        </label>
      </div>

      <div className={cn("mb-6", filtersOpen ? "block" : "hidden lg:block")}>
        <div className="grid gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect
            label="Location"
            value={filters.location}
            onChange={(value) => setFilters((current) => ({ ...current, location: value }))}
            options={[["All", "All locations"], ...PROPERTY_LOCATIONS.map((area) => [area, area] as [string, string])]}
          />
          <FilterSelect
            label="Type"
            value={filters.propertyType}
            onChange={(value) =>
              setFilters((current) => ({ ...current, propertyType: value as "All" | PropertyKind }))
            }
            options={[["All", "All types"], ...PROPERTY_KINDS.map((kind) => [kind, kind] as [string, string])]}
          />
          <FilterSelect
            label="Bedrooms"
            value={filters.beds}
            onChange={(value) => setFilters((current) => ({ ...current, beds: value }))}
            options={[
              ["any", "Any beds"],
              ["1", "1+"],
              ["2", "2+"],
              ["3", "3+"],
              ["4", "4+"],
            ]}
          />
          {nav !== "saved" && (
            <FilterSelect
              label={listingType === "rent" ? "Rent" : "Price"}
              value={filters.priceBand}
              onChange={(value) => setFilters((current) => ({ ...current, priceBand: value as PriceBand }))}
              options={priceLabels}
            />
          )}
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setFilters(EMPTY_FILTERS);
                setFiltersOpen(false);
              }}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 text-sm text-slate-300 hover:bg-white/5"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-white/8 bg-white/4 px-6 py-16 text-center">
          <Building2 className="mx-auto h-8 w-8 text-slate-500" />
          <p className="mt-3 font-medium">No homes match these filters</p>
          <p className="mt-1 text-sm text-slate-400">Try another area, or clear filters to see the full list.</p>
          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="mt-5 min-h-11 rounded-xl px-4 text-sm"
            style={{ background: product.accentSoft, color: product.accent }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((listing) => (
            <PropertyCard
              key={listing.id}
              listing={listing}
              accent={product.accent}
              saved={saved.includes(listing.id)}
              onOpen={() => onOpen(listing.id)}
              onToggleSave={() => onToggleSave(listing.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-[#0c1220] px-3 text-sm text-slate-100 outline-none focus:border-[var(--demo-accent)]"
      >
        {options.map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

function PropertyCard({
  listing,
  accent,
  saved,
  onOpen,
  onToggleSave,
}: {
  listing: PropertyListing;
  accent: string;
  saved: boolean;
  onOpen: () => void;
  onToggleSave: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] text-left transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.05]">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="relative h-48 overflow-hidden sm:h-52">
          <Image
            src={listing.images[0]}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] uppercase tracking-widest text-white backdrop-blur">
            {listing.listingType === "rent" ? "To rent" : "For sale"} · {listing.propertyType}
          </span>
        </div>
      </button>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <button type="button" onClick={onOpen} className="min-w-0 text-left">
            <p className="font-heading text-lg font-semibold" style={{ color: accent }}>
              {formatListingPrice(listing)}
            </p>
            <h3 className="mt-1 truncate font-medium">{listing.title}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {listing.location}
            </p>
          </button>
          <button
            type="button"
            onClick={onToggleSave}
            aria-label={saved ? "Remove from saved" : "Save property"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 hover:bg-white/5"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-current")} style={{ color: saved ? accent : undefined }} />
          </button>
        </div>
        <button type="button" onClick={onOpen} className="mt-4 flex w-full gap-4 text-left text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" /> {listing.beds} bed
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {listing.baths} bath
          </span>
          <span className="inline-flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5" /> {listing.area.toLocaleString()} sqft
          </span>
        </button>
      </div>
    </article>
  );
}

function PropertyDetail({
  listing,
  product,
  saved,
  onBack,
  onToggleSave,
}: {
  listing: PropertyListing;
  product: Product;
  saved: boolean;
  onBack: () => void;
  onToggleSave: () => void;
}) {
  const [photo, setPhoto] = useState(0);
  const [form, setForm] = useState<"none" | "viewing" | "enquiry">("none");
  const [confirm, setConfirm] = useState<ConfirmKind>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [when, setWhen] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPhoto(0);
    setForm("none");
    setConfirm(null);
    setName("");
    setEmail("");
    setWhen("");
    setMessage("");
  }, [listing.id]);

  const submit = (kind: ConfirmKind) => {
    if (!name.trim() || !email.trim()) return;
    setConfirm(kind);
    setForm("none");
  };

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-slate-300 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" /> Back to listings
      </button>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="relative h-56 overflow-hidden rounded-3xl border border-white/8 sm:h-80 lg:h-[420px]">
            <Image
              src={listing.images[photo]}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            {listing.images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => setPhoto((index) => (index - 1 + listing.images.length) % listing.images.length)}
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setPhoto((index) => (index + 1) % listing.images.length)}
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {listing.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setPhoto(index)}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border",
                  index === photo ? "border-white/60" : "border-white/10 opacity-70 hover:opacity-100"
                )}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="96px" />
              </button>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {listing.listingType === "rent" ? "To rent" : "For sale"} · {listing.propertyType}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">{listing.title}</h2>
            <p className="mt-2 flex items-center gap-1.5 text-slate-400">
              <MapPin className="h-4 w-4" /> {listing.address}
            </p>
            <p className="mt-4 font-heading text-3xl" style={{ color: product.accent }}>
              {formatListingPrice(listing)}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                [String(listing.beds), "Bedrooms"],
                [String(listing.baths), "Bathrooms"],
                [listing.area.toLocaleString(), "Sqft"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/4 px-3 py-4">
                  <p className="font-heading text-xl font-semibold">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-8 font-heading text-lg font-semibold">Overview</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{listing.description}</p>
            <h3 className="mt-8 font-heading text-lg font-semibold">Amenities</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {listing.amenities.map((item) => (
                <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-lg font-semibold">Location</h3>
            <p className="mt-2 text-sm text-slate-300">{listing.address}</p>
            <p className="mt-1 text-sm text-slate-500">{listing.location} neighbourhood · map pins are illustrative in this demo.</p>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Listed by</p>
            <p className="mt-2 font-medium">{listing.agent.name}</p>
            <p className="text-sm text-slate-400">{listing.agent.agency}</p>
            <p className="mt-3 text-sm text-slate-300">{listing.agent.phone}</p>
            <p className="text-sm text-slate-400">{listing.agent.email}</p>
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setConfirm(null);
                  setForm("viewing");
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-xl text-sm font-semibold text-[#070b14]"
                style={{ background: product.accent }}
              >
                Request a viewing
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirm(null);
                  setForm("enquiry");
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 text-sm font-semibold hover:bg-white/5"
              >
                Send enquiry
              </button>
              <button
                type="button"
                onClick={onToggleSave}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm hover:bg-white/5"
              >
                <Heart className={cn("h-4 w-4", saved && "fill-current")} style={{ color: saved ? product.accent : undefined }} />
                {saved ? "Saved" : "Save property"}
              </button>
            </div>
          </div>

          {confirm && (
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
              <div className="flex items-center gap-2 text-emerald-200">
                <Check className="h-4 w-4" />
                <p className="font-medium">
                  {confirm === "viewing" ? "Viewing request received" : "Your enquiry has been submitted"}
                </p>
              </div>
              <p className="mt-2 text-sm text-emerald-100/80">
                {listing.agent.name} at {listing.agent.agency} will follow up about {listing.title}.
              </p>
              <button type="button" onClick={() => setConfirm(null)} className="mt-4 text-sm text-emerald-100 underline">
                Dismiss
              </button>
            </div>
          )}

          {form !== "none" && (
            <form
              className="rounded-3xl border border-white/8 bg-white/4 p-5"
              onSubmit={(e) => {
                e.preventDefault();
                submit(form === "viewing" ? "viewing" : "enquiry");
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold">
                  {form === "viewing" ? "Request a viewing" : "Send an enquiry"}
                </h3>
                <button type="button" aria-label="Close form" onClick={() => setForm("none")} className="rounded-lg p-2 hover:bg-white/5">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 space-y-3">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-slate-500 focus:border-[var(--demo-accent)]"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-slate-500 focus:border-[var(--demo-accent)]"
                />
                {form === "viewing" && (
                  <input
                    type="datetime-local"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-[var(--demo-accent)]"
                  />
                )}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={form === "viewing" ? "Anything the agent should know" : "Your question about this home"}
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-[var(--demo-accent)]"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-[#070b14]"
                  style={{ background: product.accent }}
                >
                  {form === "viewing" ? "Submit viewing request" : "Submit enquiry"}
                </button>
              </div>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
