export const CHAT_WELCOME =
  "Hi — welcome to ROLAN. Ask about the products, live demos, or starting a project.";

export const CHAT_FALLBACK =
  "I can connect you with the studio. Would you like to start a project, open the portfolio, or book a call?";

export type KnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
};

export const CHAT_KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "studio",
    title: "ROLAN studio",
    keywords: ["rolan", "studio", "who", "about", "brand"],
    answer:
      "ROLAN is a creative technology studio that designs and builds premium web applications. The public work is six live products you can open and use — voice, inventory, real estate, support, booking, and analytics.",
  },
  {
    id: "work",
    title: "Portfolio",
    keywords: ["portfolio", "work", "projects", "products", "demo", "demos"],
    answer:
      "The Work page showcases six applications. Each has a product page and an Explore live demo experience with realistic sample data. Start at /portfolio or jump into /demo/voice.",
  },
  {
    id: "voice",
    title: "ROLAN Voice",
    keywords: ["voice", "phone", "receptionist", "call", "agent"],
    answer:
      "ROLAN Voice is an AI phone agent demo: incoming calls, live transcripts, appointment booking, lead capture, and analytics. Open /demo/voice to try it.",
  },
  {
    id: "inventory",
    title: "ROLAN Stock",
    keywords: ["inventory", "stock", "orders", "warehouse"],
    answer:
      "ROLAN Stock is an inventory and order system with products, stock levels, low-stock alerts, and sales analytics. Demo: /demo/inventory.",
  },
  {
    id: "estates",
    title: "ROLAN Estates",
    keywords: ["real estate", "property", "listings", "estates"],
    answer:
      "ROLAN Estates is a property platform for listings, leads, agents, and portfolio analytics. Demo: /demo/estates.",
  },
  {
    id: "desk",
    title: "ROLAN Desk",
    keywords: ["support", "tickets", "helpdesk", "desk"],
    answer:
      "ROLAN Desk is an AI support workspace: tickets, AI reply drafts, customer profiles, assignment, and CSAT analytics. Demo: /demo/desk.",
  },
  {
    id: "book",
    title: "ROLAN Book",
    keywords: ["booking", "appointment", "calendar", "schedule"],
    answer:
      "ROLAN Book is a scheduling product with a weekly calendar, open slots, video/audio meetings, and notifications. Demo: /demo/book. To book a real call with the studio, use /book-appointment.",
  },
  {
    id: "pulse",
    title: "ROLAN Pulse",
    keywords: ["analytics", "dashboard", "metrics", "pulse", "reports"],
    answer:
      "ROLAN Pulse is an operations analytics dashboard with live KPIs, charts, reports, and team performance. Demo: /demo/pulse.",
  },
  {
    id: "contact",
    title: "Contact",
    keywords: ["contact", "email", "whatsapp", "telegram", "hire", "project"],
    answer:
      "Start a project via /contact, or book a video/audio call at /book-appointment. Email: contact@rolanautomation.com.",
  },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function matchKnowledge(query: string): KnowledgeEntry | null {
  const q = normalize(query);
  if (!q) return null;

  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of CHAT_KNOWLEDGE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (q.includes(keyword)) score += keyword.length > 4 ? 4 : 3;
    }
    if (normalize(entry.title).split(" ").some((word) => word.length > 3 && q.includes(word))) {
      score += 2;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  if (!best || best.score < 3) return null;
  return best.entry;
}

export function buildSystemPrompt(): string {
  const topics = CHAT_KNOWLEDGE.map((entry) => `- ${entry.title}: ${entry.answer}`).join("\n");
  return `You are the ROLAN website assistant for a creative technology studio that builds premium web applications.

Tone: professional, clear, concise. Keep answers under 120 words unless asked for detail.

You help visitors explore live product demos and start a project. Do not present ROLAN as a 3CX or call-center installer.

Knowledge:
${topics}

If you cannot answer from this knowledge, reply EXACTLY with:
${CHAT_FALLBACK}`;
}
