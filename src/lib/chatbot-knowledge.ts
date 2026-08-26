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
      "ROLAN is a creative technology studio that designs and builds premium web applications. The public work is six industry platforms you can open and use — property, food ordering, logistics, learning, clinic, and finance.",
  },
  {
    id: "work",
    title: "Portfolio",
    keywords: ["portfolio", "work", "projects", "products", "demo", "demos"],
    answer:
      "The Work page showcases six applications. Each has a product page and an Explore live demo experience with realistic sample data. Start at /portfolio or jump into /demo/property.",
  },
  {
    id: "property",
    title: "Property Platform",
    keywords: ["property", "real estate", "listing", "listings", "estates", "viewing", "agent", "whatsapp"],
    answer:
      "Property Platform demonstrates marketplace + dashboards. Best automation / AI integration: AI property assistant + WhatsApp lead automation. Open /demo/property.",
  },
  {
    id: "food",
    title: "Food Ordering",
    keywords: ["food", "order", "restaurant", "menu", "cart", "kitchen", "inventory", "ecommerce"],
    answer:
      "Food Ordering demonstrates e-commerce + multi-role system. Best automation / AI integration: AI order assistant + automated notifications. Demo: /demo/food.",
  },
  {
    id: "logistics",
    title: "Logistics Platform",
    keywords: ["logistics", "shipment", "shipping", "delivery", "driver", "tracking", "freight", "support"],
    answer:
      "Logistics Platform demonstrates tracking + real-time status. Best automation / AI integration: automated delivery notifications + AI support. Demo: /demo/logistics.",
  },
  {
    id: "learning",
    title: "Learning Platform",
    keywords: ["learning", "course", "courses", "lesson", "tutor", "certificate", "education", "lms"],
    answer:
      "Learning Platform demonstrates LMS + user roles. Best automation / AI integration: AI tutor + automated certificates. Demo: /demo/learning.",
  },
  {
    id: "clinic",
    title: "Clinic Platform",
    keywords: ["clinic", "appointment", "booking", "calendar", "schedule", "doctor", "patient", "voice", "book", "receptionist"],
    answer:
      "Clinic Platform demonstrates booking + multi-user system. Best automation / AI integration: AI receptionist + reminders. It is a fictional demo, not a medical service. Demo: /demo/clinic.",
  },
  {
    id: "finance",
    title: "Finance App",
    keywords: ["finance", "ledger", "budget", "transactions", "analytics", "pulse", "reports", "cash", "insights"],
    answer:
      "Finance App demonstrates dashboard + data visualization. Best automation / AI integration: AI financial insights + smart alerts. Demo: /demo/finance.",
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

You help visitors explore live product demos and start a project. Do not present ROLAN as a 3CX or call-center installer. The clinic product is a fictional demo, not a medical service.

Knowledge:
${topics}

If you cannot answer from this knowledge, reply EXACTLY with:
${CHAT_FALLBACK}`;
}
