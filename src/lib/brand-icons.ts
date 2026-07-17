/**
 * Official brand logo registry.
 * - Simple Icons (CC0) when the brand exists in the package
 * - /public/logos/*.svg for vendor assets or placeholders
 */
import type { SimpleIcon } from "simple-icons";
import {
  siN8n,
  siMake,
  siZapier,
  siAnthropic,
  siClaude,
  siGooglegemini,
  siHubspot,
  siZoho,
  siAirtable,
  siNotion,
  siClickup,
  siGoogle,
  siDocker,
  siPostgresql,
  siMongodb,
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siPython,
  siLangchain,
  siSupabase,
  siFirebase,
  siWhatsapp,
  siTelegram,
  siDiscord,
  siGmail,
  siStripe,
  siFastapi,
  siAsterisk,
  siGooglesheets,
  siGoogledocs,
  siGoogledrive,
  siZendesk,
  siShopify,
  siCalendly,
} from "simple-icons";

export type BrandMark = {
  title: string;
  hex: string;
  path: string;
};

/** File-based logos under /public/logos (official SI archive or placeholder). */
export type BrandFile = {
  title: string;
  src: string;
};

function fromSI(icon: SimpleIcon): BrandMark {
  return { title: icon.title, hex: `#${icon.hex}`, path: icon.path };
}

/**
 * Official SVG files in /public/logos.
 * Replace placeholder files with vendor assets when available.
 */
export const BRAND_FILES: Record<string, BrandFile> = {
  openai: { title: "OpenAI", src: "/logos/openai.svg" },
  salesforce: { title: "Salesforce", src: "/logos/salesforce.svg" },
  twilio: { title: "Twilio", src: "/logos/twilio.svg" },
  "twilio sip": { title: "Twilio", src: "/logos/twilio.svg" },
  microsoft: { title: "Microsoft", src: "/logos/microsoft.svg" },
  "microsoft 365": { title: "Microsoft 365", src: "/logos/microsoft-365.svg" },
  "3cx": { title: "3CX", src: "/logos/3cx.png" },
  "3cx recording": { title: "3CX", src: "/logos/3cx.png" },
  vicidial: { title: "VICIdial", src: "/logos/vicidial.png" },
  freepbx: { title: "FreePBX", src: "/logos/freepbx.svg" },
};

/** Remaining custom marks used elsewhere (not Technology section fakes). */
const CUSTOM: Record<string, BrandMark> = {
  linkedin: {
    title: "LinkedIn",
    hex: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  slack: {
    title: "Slack",
    hex: "#4A154B",
    path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.522-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.521 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zM15.165 17.688a2.527 2.527 0 0 1-2.521-2.522 2.527 2.527 0 0 1 2.521-2.521h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.313z",
  },
  pinecone: {
    title: "Pinecone",
    hex: "#000000",
    path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c1.8 0 3.6.9 4.8 2.4.9 1.2 1.2 2.7.9 4.2-.3 1.8-1.5 3.3-3.3 3.9-.6.3-1.2.3-1.8.15V18c0 .6-.45 1.05-1.05 1.05h-.9c-.6 0-1.05-.45-1.05-1.05v-3.75c-.6.15-1.2.15-1.8-.15-1.8-.6-3-2.1-3.3-3.9-.3-1.5 0-3 .9-4.2C8.4 4.5 10.2 3.6 12 3.6zm0 2.7c-.9 0-1.8.45-2.4 1.2-.45.6-.6 1.35-.45 2.1.15.9.75 1.65 1.65 1.95.6.15 1.2 0 1.65-.3.6-.45.9-1.2.75-1.95-.15-.9-.75-1.65-1.65-1.95-.15 0-.3-.05-.45-.05h.9c.9 0 1.65.6 1.95 1.35.3.75.15 1.65-.45 2.25-.45.45-1.05.6-1.65.45-.9-.3-1.5-1.05-1.65-1.95-.15-.75 0-1.5.45-2.1C10.2 6.75 11.1 6.3 12 6.3z",
  },
  gohighlevel: {
    title: "GoHighLevel",
    hex: "#FF6B00",
    path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.25 16.8H6.75V14.4h10.5v2.4zm0-4.8H6.75V9.6h10.5v2.4zm0-4.8H6.75V4.8h10.5V7.2z",
  },
};

const SI_MAP: Record<string, BrandMark> = {
  n8n: fromSI(siN8n),
  make: fromSI(siMake),
  "make.com": fromSI(siMake),
  zapier: fromSI(siZapier),
  anthropic: fromSI(siAnthropic),
  claude: fromSI(siClaude),
  "claude ai": fromSI(siClaude),
  gemini: fromSI(siGooglegemini),
  "google gemini": fromSI(siGooglegemini),
  hubspot: fromSI(siHubspot),
  zoho: fromSI(siZoho),
  airtable: fromSI(siAirtable),
  notion: fromSI(siNotion),
  clickup: fromSI(siClickup),
  google: fromSI(siGoogle),
  "google workspace": fromSI(siGoogle),
  "google sheets": fromSI(siGooglesheets),
  "google docs": fromSI(siGoogledocs),
  "google drive": fromSI(siGoogledrive),
  "google forms": fromSI(siGoogle),
  docker: fromSI(siDocker),
  postgresql: fromSI(siPostgresql),
  mongodb: fromSI(siMongodb),
  react: fromSI(siReact),
  "next.js": fromSI(siNextdotjs),
  nextjs: fromSI(siNextdotjs),
  typescript: fromSI(siTypescript),
  "tailwind css": fromSI(siTailwindcss),
  tailwind: fromSI(siTailwindcss),
  "node.js": fromSI(siNodedotjs),
  nodejs: fromSI(siNodedotjs),
  python: fromSI(siPython),
  langchain: fromSI(siLangchain),
  supabase: fromSI(siSupabase),
  firebase: fromSI(siFirebase),
  whatsapp: fromSI(siWhatsapp),
  "whatsapp api": fromSI(siWhatsapp),
  telegram: fromSI(siTelegram),
  discord: fromSI(siDiscord),
  gmail: fromSI(siGmail),
  email: fromSI(siGmail),
  stripe: fromSI(siStripe),
  fastapi: fromSI(siFastapi),
  asterisk: fromSI(siAsterisk),
  zendesk: fromSI(siZendesk),
  shopify: fromSI(siShopify),
  calendly: fromSI(siCalendly),
};

const ALL: Record<string, BrandMark> = {
  ...SI_MAP,
  ...CUSTOM,
};

function normalizeKey(name: string): string {
  return name.trim().toLowerCase();
}

export function getBrandFile(name: string): BrandFile | null {
  const key = normalizeKey(name);
  if (BRAND_FILES[key]) return BRAND_FILES[key];
  const base = key.replace(/\s+(api|sip|recording|voice|agi)$/i, "").trim();
  return BRAND_FILES[base] ?? null;
}

export function getBrandMark(name: string): BrandMark | null {
  const key = normalizeKey(name);
  if (ALL[key]) return ALL[key];
  const base = key.replace(/\s+(api|sip|recording|voice|agi)$/i, "").trim();
  if (ALL[base]) return ALL[base];
  return null;
}

/** True when we can render an official logo (file asset or Simple Icons path). */
export function hasBrandLogo(name: string): boolean {
  return !!(getBrandFile(name) || getBrandMark(name));
}

export function normalizeBrandKey(name: string): string {
  return normalizeKey(name);
}

/** Featured logos for the Technology marquee (Automation + Call Center). */
export const TECH_SHOWCASE_LOGOS = [
  "Workflow Automation",
  "OpenAI",
  "Zapier",
  "Make.com",
  "n8n",
  "HubSpot",
  "Salesforce",
  "Zoho",
  "Google Workspace",
  "Microsoft 365",
  "3CX",
  "VICIdial",
  "FreePBX",
  "Asterisk",
  "Twilio",
] as const;
