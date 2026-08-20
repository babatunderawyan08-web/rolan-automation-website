export type ProductSlug =
  | "voice"
  | "inventory"
  | "estates"
  | "desk"
  | "book"
  | "pulse";

export type Product = {
  slug: ProductSlug;
  name: string;
  productLine: string;
  tagline: string;
  industry: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  accent: string;
  accentSoft: string;
  glow: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "voice",
    name: "ROLAN Voice",
    productLine: "AI Phone Agent",
    tagline: "An intelligent receptionist that answers, qualifies, and books — without missing a call.",
    industry: "Customer Experience",
    problem:
      "Front desks miss calls after hours, appointments slip, and every inquiry has to be typed into a CRM by hand.",
    solution:
      "A live AI phone agent that greets callers, captures intent, books appointments, and logs qualified leads into a real-time operations console.",
    features: [
      "Incoming call simulation with live transcripts",
      "Natural conversation with intent detection",
      "Appointment booking during the call",
      "Lead capture and CRM-style records",
      "Call volume and conversion analytics",
    ],
    technologies: ["Next.js", "Twilio", "OpenAI", "WebRTC", "Supabase"],
    accent: "#38BDF8",
    accentSoft: "rgba(56, 189, 248, 0.16)",
    glow: "rgba(56, 189, 248, 0.35)",
  },
  {
    slug: "inventory",
    name: "ROLAN Stock",
    productLine: "Inventory & Orders",
    tagline: "Stock, purchasing, and fulfillment in one operational system.",
    industry: "Operations",
    problem:
      "Teams track inventory in spreadsheets, so stockouts appear too late and order status lives in email threads.",
    solution:
      "A unified inventory and order platform with live stock levels, purchase alerts, fulfillment tracking, and sales analytics.",
    features: [
      "Product catalog with live stock levels",
      "Purchase orders and fulfillment states",
      "Low-stock alerts and reorder points",
      "Supplier and SKU management",
      "Sales and inventory analytics",
    ],
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Recharts", "Stripe"],
    accent: "#34D399",
    accentSoft: "rgba(52, 211, 153, 0.16)",
    glow: "rgba(52, 211, 153, 0.35)",
  },
  {
    slug: "estates",
    name: "ROLAN Estates",
    productLine: "Property Platform",
    tagline: "Listings, leads, and agents in a single real-estate command center.",
    industry: "Real Estate",
    problem:
      "Properties, buyer inquiries, and agent activity are scattered across listing sites, WhatsApp, and shared drives.",
    solution:
      "A property operations platform for listings, lead pipelines, agent performance, and portfolio analytics.",
    features: [
      "Interactive property listings",
      "Lead pipeline and inquiry routing",
      "Agent directory and assignment",
      "Listing status and viewing activity",
      "Portfolio and conversion analytics",
    ],
    technologies: ["Next.js", "Mapbox", "Supabase", "Cloudinary", "Resend"],
    accent: "#F59E0B",
    accentSoft: "rgba(245, 158, 11, 0.16)",
    glow: "rgba(245, 158, 11, 0.35)",
  },
  {
    slug: "desk",
    name: "ROLAN Desk",
    productLine: "AI Support Platform",
    tagline: "Tickets, AI drafts, and customer context in one support workspace.",
    industry: "Customer Support",
    problem:
      "Support teams lose time switching between inboxes, while customers wait on generic replies with no history attached.",
    solution:
      "A support console that unifies tickets, customer profiles, AI-assisted replies, assignment, and performance analytics.",
    features: [
      "Ticket inbox with priority routing",
      "AI response drafts with human approval",
      "Customer profiles and history",
      "Agent assignment and SLA tracking",
      "Resolution and CSAT analytics",
    ],
    technologies: ["Next.js", "OpenAI", "PostgreSQL", "Pusher", "Segment"],
    accent: "#A78BFA",
    accentSoft: "rgba(167, 139, 250, 0.16)",
    glow: "rgba(167, 139, 250, 0.35)",
  },
  {
    slug: "book",
    name: "ROLAN Book",
    productLine: "Appointments",
    tagline: "Calendar, availability, and meetings designed for service businesses.",
    industry: "Scheduling",
    problem:
      "Booking still happens over chat and phone, creating double-bookings, no-shows, and a calendar nobody trusts.",
    solution:
      "A scheduling system with live availability, appointment management, video or audio meetings, and reminder workflows.",
    features: [
      "Interactive weekly calendar",
      "Available time slots and buffers",
      "Appointment create, reschedule, cancel",
      "Video and audio meeting options",
      "Reminder and notification center",
    ],
    technologies: ["Next.js", "Google Calendar", "Daily", "Twilio SMS", "Resend"],
    accent: "#2DD4BF",
    accentSoft: "rgba(45, 212, 191, 0.16)",
    glow: "rgba(45, 212, 191, 0.35)",
  },
  {
    slug: "pulse",
    name: "ROLAN Pulse",
    productLine: "Operations Analytics",
    tagline: "A live operations dashboard for the metrics that actually move the business.",
    industry: "Analytics",
    problem:
      "Leadership waits on weekly spreadsheets, so decisions are made on stale numbers and disconnected reports.",
    solution:
      "An interactive analytics workspace with live KPIs, drill-down charts, saved reports, and team performance tracking.",
    features: [
      "Live KPI cards and trend lines",
      "Interactive revenue and operations charts",
      "Saved reports and date ranges",
      "Team and channel performance",
      "Export-ready operational summaries",
    ],
    technologies: ["Next.js", "Recharts", "ClickHouse", "dbt", "Metabase"],
    accent: "#FB7185",
    accentSoft: "rgba(251, 113, 133, 0.16)",
    glow: "rgba(251, 113, 133, 0.35)",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductSlugs(): ProductSlug[] {
  return PRODUCTS.map((product) => product.slug);
}
