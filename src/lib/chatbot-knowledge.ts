export const CHAT_WELCOME =
  "👋 Hi! Welcome to ROLAN AUTOMATION. How can I help you today?";

export const CHAT_FALLBACK =
  "I'd be happy to connect you with our team. Would you like to book a consultation or chat with us on WhatsApp?";

export type KnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
};

/** Curated answers aligned with ROLAN AUTOMATION website services. */
export const CHAT_KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "workflow",
    title: "Workflow Automation",
    keywords: [
      "workflow",
      "automation",
      "automate",
      "process",
      "business process",
      "operations",
      "hand off",
      "handoff",
    ],
    answer:
      "We design end-to-end workflow automation that removes manual handoffs and speeds up operations. Typical builds connect forms, CRMs, chat tools, and internal systems so leads, tickets, and tasks move automatically. Most projects launch in 2–4 weeks with clear ROI tracking.",
  },
  {
    id: "zapier",
    title: "Zapier",
    keywords: ["zapier", "zap", "zaps", "multi-step"],
    answer:
      "We're Zapier specialists — multi-step Zaps, filters, paths, formatters, and error handling. We help teams ship reliable automations quickly without rebuilding their entire stack. If you outgrow Zapier, we can also migrate critical flows to Make or n8n.",
  },
  {
    id: "make",
    title: "Make.com",
    keywords: ["make.com", "make com", "integromat", "make scenario", "scenarios"],
    answer:
      "On Make.com we build visual, powerful scenarios for complex branching, iterators, and high-volume workflows. It's ideal when you need more control than basic Zaps. We handle scenario design, testing, documentation, and training for your team.",
  },
  {
    id: "n8n",
    title: "n8n",
    keywords: ["n8n", "self-hosted", "self hosted", "custom node"],
    answer:
      "We implement enterprise-grade n8n workflows — including self-hosted setups, custom nodes, and advanced logic. n8n is a strong fit when you need data ownership, cost control at scale, or deeper API customization.",
  },
  {
    id: "sheets",
    title: "Google Sheets Automation",
    keywords: [
      "google sheets",
      "sheets",
      "spreadsheet",
      "spreadsheets",
      "gsheet",
      "gsheets",
    ],
    answer:
      "We automate Google Sheets for reporting, lead pipelines, inventory sync, and approvals — often connecting Sheets to CRMs, WhatsApp, email, and dashboards. You get live, reliable data without copy-paste work.",
  },
  {
    id: "apps-script",
    title: "Apps Script",
    keywords: [
      "apps script",
      "appsscript",
      "google apps script",
      "gas script",
      "custom script",
    ],
    answer:
      "We write Google Apps Script for custom Sheets/Docs/Drive automation — scheduled jobs, custom menus, API calls, and internal tools. It's perfect when off-the-shelf connectors aren't enough.",
  },
  {
    id: "crm",
    title: "CRM Automation",
    keywords: [
      "crm",
      "hubspot",
      "salesforce",
      "gohighlevel",
      "go high level",
      "zoho",
      "pipedrive",
      "lead routing",
      "pipeline",
    ],
    answer:
      "We automate CRM pipelines: lead capture, enrichment, scoring, routing, follow-ups, and deal updates across HubSpot, Salesforce, GoHighLevel, Zoho, and more. Clients typically see faster response times and fewer lost leads.",
  },
  {
    id: "3cx",
    title: "3CX Setup",
    keywords: ["3cx", "three cx", "pbx", "softphone", "extension"],
    answer:
      "We deliver full 3CX PBX setup — licensing, trunks, extensions, IVR, queues, recording, and CRM screen-pop. Whether cloud or on-premise, we configure 3CX for reliable call quality and scalable teams.",
  },
  {
    id: "call-center",
    title: "Call Center Setup",
    keywords: [
      "call center",
      "callcentre",
      "call centre",
      "vicidial",
      "freepbx",
      "asterisk",
      "ivr",
      "dialer",
      "predictive",
      "inbound",
      "outbound",
      "voip",
      "sip",
    ],
    answer:
      "We build complete call center systems: 3CX, VICIdial, FreePBX, Asterisk, IVR, queues, predictive/progressive dialers, recording, analytics, and CRM integration. From small teams to high-volume contact centers, we handle design, install, and training.",
  },
  {
    id: "consultation",
    title: "Consultation Booking",
    keywords: [
      "consultation",
      "book",
      "booking",
      "schedule",
      "meeting",
      "free consult",
      "talk to",
      "contact sales",
      "get started",
      "quote",
      "pricing",
    ],
    answer:
      "You can book a free consultation on our site — we'll discuss your goals and share a custom automation roadmap within 48 hours. Use the Book Consultation button below, or ask me anything else about our services first.",
  },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s.+#]/g, " ").replace(/\s+/g, " ").trim();
}

export function matchKnowledge(question: string): KnowledgeEntry | null {
  const q = normalize(question);
  if (!q) return null;

  let best: { entry: KnowledgeEntry; score: number } | null = null;

  for (const entry of CHAT_KNOWLEDGE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const k = normalize(keyword);
      if (!k) continue;
      if (q === k) score += 12;
      else if (q.includes(k)) score += 6 + Math.min(k.length, 8) * 0.15;
      else {
        const parts = k.split(" ").filter((p) => p.length > 2);
        const hits = parts.filter((p) => q.includes(p)).length;
        if (parts.length && hits === parts.length) score += 4;
        else if (hits > 0) score += hits;
      }
    }
    if (normalize(entry.title).split(" ").some((w) => w.length > 3 && q.includes(w))) {
      score += 2;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  // Require a meaningful match; otherwise fall back
  if (!best || best.score < 3) return null;
  return best.entry;
}

export function buildSystemPrompt(): string {
  const topics = CHAT_KNOWLEDGE.map((e) => `- ${e.title}: ${e.answer}`).join("\n");
  return `You are the ROLAN AUTOMATION website assistant — a premium AI automation and call center agency.

Tone: professional, clear, concise, helpful. Keep answers under 120 words unless the user asks for detail.

You help with: Workflow Automation, Zapier, Make.com, n8n, Google Sheets Automation, Apps Script, CRM Automation, 3CX Setup, Call Center Setup, and Consultation Booking.

Knowledge:
${topics}

Company facts:
- Free consultation with custom roadmap within 48 hours
- Typical delivery 2–4 weeks
- Contact: book consultation on /book-consultation or WhatsApp

If you cannot answer from this knowledge, or the question is unrelated, reply EXACTLY with:
${CHAT_FALLBACK}`;
}
