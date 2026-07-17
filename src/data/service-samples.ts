export type ServiceSample = {
  serviceId: string;
  overview: string;
  deliverables: string[];
  sampleProject: {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    technologies: string[];
    results: string[];
    timeline: string;
  };
};

const sample = (
  serviceId: string,
  overview: string,
  deliverables: string[],
  project: ServiceSample["sampleProject"]
): ServiceSample => ({ serviceId, overview, deliverables, sampleProject: project });

export const serviceSamples: Record<string, ServiceSample> = {
  workflow: sample(
    "workflow",
    "We design multi-step workflows that connect your apps, remove manual handoffs, and run reliably 24/7.",
    ["Process audit & mapping", "Workflow architecture", "Trigger & error handling", "Monitoring dashboard", "Team training"],
    {
      client: "RetailPulse",
      industry: "Retail",
      challenge: "Order fulfillment required 6 manual steps across Shopify, inventory, and shipping tools.",
      solution: "Built an event-driven workflow that syncs orders, updates stock, generates labels, and notifies customers automatically.",
      technologies: ["n8n", "Shopify API", "ShipStation", "Slack", "Google Sheets"],
      results: ["3 hours saved daily", "99.8% order accuracy", "Zero missed shipments in 90 days"],
      timeline: "3 weeks",
    }
  ),
  "ai-automation": sample(
    "ai-automation",
    "AI agents that classify, summarize, route, and execute tasks so your team focuses on high-value work.",
    ["AI use-case design", "Prompt & agent tuning", "Human-in-the-loop flows", "Quality monitoring", "Cost optimization"],
    {
      client: "LegalEdge",
      industry: "Legal",
      challenge: "Paralegals spent 20+ hours weekly sorting and summarizing incoming case documents.",
      solution: "Deployed Claude-powered document classification with auto-summaries routed to the correct case folder and attorney.",
      technologies: ["Claude AI", "Make.com", "Google Drive", "Notion", "Webhooks"],
      results: ["85% faster document triage", "12 hrs/week saved per paralegal", "98% classification accuracy"],
      timeline: "4 weeks",
    }
  ),
  business: sample(
    "business",
    "Cross-department automation for operations, finance, HR, and admin — built to scale with your business.",
    ["Department workflow audit", "SOP automation", "Approval chains", "Reporting automation", "Documentation"],
    {
      client: "GrowthStack",
      industry: "SaaS",
      challenge: "Finance and ops teams duplicated data entry across 4 systems every month-end.",
      solution: "Unified month-end close automation syncing billing, accounting, CRM, and executive dashboards.",
      technologies: ["Zapier", "QuickBooks", "HubSpot", "Airtable", "Looker Studio"],
      results: ["Close cycle cut from 8 days to 2", "100% data consistency", "$48K annual labor savings"],
      timeline: "5 weeks",
    }
  ),
  crm: sample(
    "crm",
    "CRM automations for lead routing, follow-ups, pipeline updates, and lifecycle triggers that never slip.",
    ["CRM audit", "Lead scoring rules", "Auto follow-up sequences", "Pipeline stage triggers", "CRM + telephony sync"],
    {
      client: "PrimeRealty",
      industry: "Real Estate",
      challenge: "Hot leads waited hours for agent follow-up; 40% went cold within 24 hours.",
      solution: "Instant lead capture, AI scoring, round-robin routing, and WhatsApp + email nurture for warm leads.",
      technologies: ["GoHighLevel", "Make.com", "WhatsApp API", "Claude", "Zapier"],
      results: ["67% faster response time", "4.2x qualified leads", "$2.1M added revenue"],
      timeline: "3 weeks",
    }
  ),
  api: sample(
    "api",
    "Secure API integrations that sync data in real time between platforms you already use.",
    ["API discovery", "Auth & security setup", "Bidirectional sync", "Error recovery", "API documentation"],
    {
      client: "MediCore",
      industry: "Healthcare",
      challenge: "Patient data lived in 3 siloed systems with no real-time sync.",
      solution: "Custom REST middleware syncing EHR, scheduling, and billing with HIPAA-aligned logging.",
      technologies: ["Node.js", "FastAPI", "PostgreSQL", "REST APIs", "Docker"],
      results: ["Real-time sync across 3 systems", "Zero duplicate records", "60% admin time reduced"],
      timeline: "6 weeks",
    }
  ),
  zapier: sample(
    "zapier",
    "Expert Zapier builds with filters, paths, error handling, and multi-step Zaps that scale.",
    ["Zap architecture", "Multi-step Zaps", "Filter & formatter logic", "Error alerts", "Zap maintenance guide"],
    {
      client: "EduFlow Academy",
      industry: "Education",
      challenge: "Enrollment confirmations and payment receipts were sent manually after each signup.",
      solution: "Automated enrollment pipeline from form → payment → welcome email → CRM → parent portal access.",
      technologies: ["Zapier", "Stripe", "Google Forms", "Mailchimp", "Supabase"],
      results: ["Enrollment time: 3 weeks → 3 days", "89% parent satisfaction", "60% staff time saved"],
      timeline: "2 weeks",
    }
  ),
  make: sample(
    "make",
    "Visual, powerful Make.com scenarios for complex logic, branching, and enterprise orchestration.",
    ["Scenario design", "Router & filter modules", "Webhook triggers", "Error handlers", "Scenario documentation"],
    {
      client: "NovaHealth",
      industry: "Healthcare",
      challenge: "Appointment reminders and intake forms required staff to chase patients manually.",
      solution: "Make.com scenario chain for intake → verification → reminders → EHR update → no-show recovery.",
      technologies: ["Make.com", "OpenAI", "Twilio", "HubSpot", "Calendly"],
      results: ["52% fewer no-shows", "78% faster intake", "340% ROI in 8 months"],
      timeline: "3 weeks",
    }
  ),
  n8n: sample(
    "n8n",
    "Self-hosted n8n workflows with custom nodes, advanced logic, and full data ownership.",
    ["Self-hosted setup", "Custom workflow logic", "Credential management", "Queue & retry logic", "Runbooks"],
    {
      client: "SwiftLogix",
      industry: "Logistics",
      challenge: "Dispatch coordination required 6 hours of daily manual calls and spreadsheet updates.",
      solution: "n8n orchestration connecting GPS, driver app, customer notifications, and dispatch dashboard.",
      technologies: ["n8n", "PostgreSQL", "Twilio", "Node.js", "Custom API"],
      results: ["85% less dispatch time", "22% fuel savings", "99.2% on-time delivery"],
      timeline: "4 weeks",
    }
  ),
  "3cx": sample(
    "3cx",
    "Full 3CX PBX deployment — licensing, extensions, queues, IVR, and CRM integration.",
    ["3CX licensing & install", "24-60 simultaneous calls", "IVR & queue setup", "CRM click-to-dial", "Go-live support"],
    {
      client: "CloudServe",
      industry: "Customer Support",
      challenge: "Legacy phone system couldn't handle 2,000+ daily calls; hold times averaged 45 minutes.",
      solution: "3CX cloud PBX with AI tier-1 agents, skill-based routing, and HubSpot screen-pop.",
      technologies: ["3CX", "OpenAI Voice", "HubSpot", "SIP Trunks", "Windows Server"],
      results: ["Hold time: 45 min → 2 min", "73% AI-resolved calls", "92% CSAT"],
      timeline: "5 weeks",
    }
  ),
  vicidial: sample(
    "vicidial",
    "Enterprise VICIdial predictive dialer campaigns with compliance, reporting, and agent tools.",
    ["Server deployment", "Campaign configuration", "DNC compliance", "Agent scripts", "Real-time reporting"],
    {
      client: "ApexFinance",
      industry: "Finance",
      challenge: "Outbound loan follow-up team had low contact rates and manual dialing inefficiency.",
      solution: "VICIdial predictive campaigns with CRM integration, disposition tracking, and compliance filters.",
      technologies: ["VICIdial", "Asterisk", "Salesforce", "MySQL", "SIP Trunks"],
      results: ["3.1x contact rate", "41% more conversations/day", "100% DNC compliance"],
      timeline: "6 weeks",
    }
  ),
  freepbx: sample(
    "freepbx",
    "Open-source FreePBX with custom modules, trunks, and extensions tailored to your call flow.",
    ["FreePBX installation", "Trunk configuration", "Extension setup", "IVR builder", "Backup & failover"],
    {
      client: "Local Insurance Co.",
      industry: "Insurance",
      challenge: "Needed affordable PBX for 40 agents without enterprise licensing costs.",
      solution: "FreePBX on cloud VM with redundant SIP trunks, call recording, and after-hours IVR.",
      technologies: ["FreePBX", "Asterisk", "Twilio SIP", "Grandstream phones", "AWS"],
      results: ["70% telecom cost reduction", "99.9% uptime", "Full call recording compliance"],
      timeline: "3 weeks",
    }
  ),
  asterisk: sample(
    "asterisk",
    "Custom Asterisk telephony with advanced call routing, AGI scripts, and integrations.",
    ["Asterisk architecture", "Custom dialplan", "AGI/AMI integrations", "High availability", "Performance tuning"],
    {
      client: "Global BPO Ltd.",
      industry: "BPO",
      challenge: "Required custom call routing logic not supported by off-the-shelf PBX products.",
      solution: "Asterisk-based platform with custom AGI routing, multi-tenant support, and API-driven campaigns.",
      technologies: ["Asterisk", "Python AGI", "Redis", "PostgreSQL", "Docker"],
      results: ["Custom routing for 12 campaigns", "50ms faster call setup", "Handles 500 concurrent calls"],
      timeline: "8 weeks",
    }
  ),
  pbx: sample(
    "pbx",
    "On-premise or cloud PBX architecture designed for reliability, scale, and future growth.",
    ["Needs assessment", "PBX architecture", "Hardware/cloud spec", "Migration plan", "Cutover support"],
    {
      client: "Hospitality Group",
      industry: "Hospitality",
      challenge: "12 hotel locations on different phone systems with no central management.",
      solution: "Unified cloud PBX with location-based routing, shared queues, and central admin portal.",
      technologies: ["3CX", "SIP Trunks", "Yealink phones", "VPN", "Active Directory"],
      results: ["12 sites on one system", "Unified reporting", "35% cost savings"],
      timeline: "7 weeks",
    }
  ),
  voip: sample(
    "voip",
    "End-to-end VoIP infrastructure with QoS, failover, and carrier-grade reliability.",
    ["Network assessment", "QoS configuration", "SIP trunk setup", "Failover design", "Monitoring"],
    {
      client: "Remote Sales Team",
      industry: "Technology",
      challenge: "Remote agents had poor call quality and frequent dropped calls on consumer VoIP.",
      solution: "Business-grade VoIP with dedicated bandwidth, SD-WAN QoS, and redundant SIP carriers.",
      technologies: ["3CX", "Dual SIP Trunks", "SD-WAN", "Softphones", "Wireshark monitoring"],
      results: ["MOS score improved to 4.3", "99.99% call completion", "Zero downtime in 6 months"],
      timeline: "4 weeks",
    }
  ),
  recording: sample(
    "recording",
    "Compliant call recording with secure storage, search, and retrieval for QA and legal needs.",
    ["Recording policy design", "On-demand & always-on", "Encrypted storage", "Search & playback portal", "Retention rules"],
    {
      client: "Finance Call Center",
      industry: "Finance",
      challenge: "Regulators required searchable call records; legacy system had no indexing.",
      solution: "Integrated call recording with auto-tagging, CRM linkage, and role-based playback access.",
      technologies: ["3CX Recording", "S3 Storage", "Elasticsearch", "Salesforce", "AES encryption"],
      results: ["100% calls recorded", "Search time: hours → seconds", "Passed compliance audit"],
      timeline: "3 weeks",
    }
  ),
  routing: sample(
    "routing",
    "Skills-based, geographic, and time-based routing to connect callers to the right agent fast.",
    ["Routing strategy design", "Skills matrix setup", "Overflow rules", "SLA monitoring", "Real-time adjustments"],
    {
      client: "MediCore Support",
      industry: "Healthcare",
      challenge: "Patients reached wrong departments 30% of the time, causing transfers and frustration.",
      solution: "IVR language detection + skills routing to billing, clinical, and scheduling teams with SLA alerts.",
      technologies: ["3CX", "Custom IVR", "HubSpot", "Skills queues", "Slack alerts"],
      results: ["30% fewer transfers", "ASA under 30 seconds", "18% CSAT improvement"],
      timeline: "2 weeks",
    }
  ),
};

export function getServiceSample(serviceId: string, fallbackTitle: string): ServiceSample {
  if (serviceSamples[serviceId]) return serviceSamples[serviceId];

  return sample(
    serviceId,
    `Professional ${fallbackTitle} implementation tailored to your business goals, tech stack, and team workflow.`,
    ["Discovery workshop", "Solution design", "Build & test", "Launch & training", "30-day support"],
    {
      client: "Sample Client",
      industry: "Business Services",
      challenge: `Manual processes were slowing operations and creating errors in ${fallbackTitle.toLowerCase()} workflows.`,
      solution: `We delivered a custom ${fallbackTitle.toLowerCase()} solution with automation, monitoring, and clear documentation.`,
      technologies: ["n8n", "API Integrations", "Slack", "CRM", "Dashboards"],
      results: ["50%+ time saved", "Fewer manual errors", "Measurable ROI within 90 days"],
      timeline: "3–4 weeks",
    }
  );
}
