export type LiveTourSlide = {
  src: string;
  title: string;
};

/** Seven real-platform screenshots per tour family. */
export const LIVE_TOUR_SETS = {
  "3cx": [
    { src: "/images/3cx/dashboard.png", title: "3CX Dashboard" },
    { src: "/images/3cx/users.png", title: "Extensions" },
    { src: "/images/3cx/voice-chat.png", title: "SIP Trunks & Voice" },
    { src: "/images/3cx/call-handling.png", title: "IVR & Call Handling" },
    { src: "/images/3cx/call-forwarding.png", title: "Call Queues" },
    { src: "/images/3cx/panel.png", title: "Wallboard / Live Calls" },
    { src: "/images/3cx/mobile-app.png", title: "Mobile App" },
  ],
  vicidial: [
    { src: "/images/live-tour/vicidial/agent.png", title: "Agent Screen" },
    { src: "/images/live-tour/vicidial/summary.png", title: "Campaign Dashboard" },
    { src: "/images/live-tour/vicidial/realtime.png", title: "Predictive Dialer Live" },
    { src: "/images/live-tour/vicidial/reports.png", title: "Reports" },
    { src: "/images/live-tour/vicidial/campaigns.png", title: "Lead & Campaign Admin" },
    { src: "/images/live-tour/vicidial/forecasting.png", title: "Call Monitor / Forecast" },
    { src: "/images/live-tour/vicidial/admin.png", title: "Admin Panel" },
  ],
  crm: [
    { src: "/images/live-tour/hubspot/contacts.png", title: "Contacts" },
    { src: "/images/live-tour/hubspot/associations.png", title: "Pipeline Associations" },
    { src: "/images/live-tour/automation/real-estate.png", title: "Opportunities" },
    { src: "/images/live-tour/automation/lead-gen.png", title: "Lead Workflows" },
    { src: "/images/live-tour/automation/crm-pbx.png", title: "CRM Dashboard" },
    { src: "/images/live-tour/automation/email.png", title: "Tasks & Follow-ups" },
    { src: "/images/live-tour/automation/healthcare.png", title: "Reports & Scheduling" },
  ],
  "ai-support": [
    { src: "/images/live-tour/automation/chatgpt.png", title: "AI Chat" },
    { src: "/images/live-tour/automation/n8n.png", title: "Support Workflow" },
    { src: "/images/live-tour/automation/ai-support.png", title: "Knowledge Automation" },
    { src: "/images/live-tour/hubspot/contacts.png", title: "Ticket Queue" },
    { src: "/images/live-tour/automation/whatsapp.png", title: "Escalation Channel" },
    { src: "/images/live-tour/automation/email.png", title: "Analytics & Follow-up" },
    { src: "/images/live-tour/hubspot/associations.png", title: "Conversation History" },
  ],
  automation: [
    { src: "/images/live-tour/automation/n8n.png", title: "n8n Workflow" },
    { src: "/images/live-tour/automation/ai-support.png", title: "Make / Scenario Style" },
    { src: "/images/live-tour/automation/logistics.png", title: "Zapier-style Automation" },
    { src: "/images/live-tour/automation/lead-gen.png", title: "Google Sheets Integration" },
    { src: "/images/live-tour/automation/email.png", title: "Gmail Automation" },
    { src: "/images/live-tour/automation/calendly.png", title: "Calendar Automation" },
    { src: "/images/live-tour/automation/healthcare.png", title: "Ops Dashboard" },
  ],
  freepbx: [
    { src: "/images/live-tour/automation/freepbx.png", title: "FreePBX Dashboard" },
    { src: "/images/live-tour/automation/sip.png", title: "SIP Trunks" },
    { src: "/images/3cx/users.png", title: "Extensions" },
    { src: "/images/3cx/call-handling.png", title: "IVR Routes" },
    { src: "/images/3cx/call-forwarding.png", title: "Queues" },
    { src: "/images/live-tour/automation/recording.png", title: "Recordings & Reports" },
    { src: "/images/3cx/panel.png", title: "Live Monitoring" },
  ],
} as const satisfies Record<string, readonly LiveTourSlide[]>;

export type LiveTourSetId = keyof typeof LIVE_TOUR_SETS;

/** Map each service slug to a Live Tour screenshot set. */
const SERVICE_TO_TOUR: Record<string, LiveTourSetId> = {
  // Call center — 3CX family
  "3cx": "3cx",
  pbx: "3cx",
  voip: "3cx",
  "cloud-pbx": "3cx",
  recording: "3cx",
  routing: "3cx",
  ivr: "3cx",
  sip: "3cx",
  queue: "3cx",
  inbound: "3cx",
  analytics: "3cx",
  "crm-int": "3cx",
  "agent-dash": "3cx",
  remote: "3cx",

  // VICIdial / dialers
  vicidial: "vicidial",
  predictive: "vicidial",
  progressive: "vicidial",
  outbound: "vicidial",
  autodialer: "vicidial",

  // FreePBX / Asterisk
  freepbx: "freepbx",
  asterisk: "freepbx",

  // CRM
  crm: "crm",
  leads: "crm",
  business: "crm",

  // AI support
  support: "ai-support",
  chatbots: "ai-support",
  voice: "ai-support",
  openai: "ai-support",
  claude: "ai-support",
  gemini: "ai-support",
  "ai-automation": "ai-support",
  whatsapp: "ai-support",

  // Automation platforms
  workflow: "automation",
  zapier: "automation",
  make: "automation",
  n8n: "automation",
  api: "automation",
  email: "automation",
  appointments: "automation",
  internal: "automation",
  data: "automation",
  dashboards: "automation",
  web: "automation",
  consulting: "automation",
};

export function getLiveTourSlides(serviceId: string): LiveTourSlide[] {
  const setId = SERVICE_TO_TOUR[serviceId] ?? "automation";
  return [...LIVE_TOUR_SETS[setId]];
}

export function getLiveTourLabel(serviceId: string): string {
  const setId = SERVICE_TO_TOUR[serviceId] ?? "automation";
  const labels: Record<LiveTourSetId, string> = {
    "3cx": "3CX Live Tour",
    vicidial: "VICIdial Live Tour",
    crm: "CRM Live Tour",
    "ai-support": "AI Support Live Tour",
    automation: "Automation Live Tour",
    freepbx: "FreePBX Live Tour",
  };
  return labels[setId];
}
