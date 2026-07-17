import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "projects");
mkdirSync(outDir, { recursive: true });

const projects = [
  { file: "ai-support", title: "AI Customer Support", subtitle: "Ticket triage & auto-resolution", accent: "#6366F1", accent2: "#8B5CF6" },
  { file: "real-estate", title: "CRM Automation", subtitle: "Real estate lead pipeline", accent: "#0EA5E9", accent2: "#06B6D4" },
  { file: "lead-gen", title: "Lead Generation", subtitle: "Capture, enrich & score leads", accent: "#F59E0B", accent2: "#F97316" },
  { file: "healthcare", title: "Appointment Booking", subtitle: "Healthcare intake automation", accent: "#10B981", accent2: "#14B8A6" },
  { file: "whatsapp", title: "WhatsApp Automation", subtitle: "E-commerce chat commerce", accent: "#22C55E", accent2: "#16A34A" },
  { file: "email", title: "Email Automation", subtitle: "Triggered nurture sequences", accent: "#3B82F6", accent2: "#2563EB" },
  { file: "logistics", title: "API Integration", subtitle: "Real-time dispatch sync", accent: "#64748B", accent2: "#475569" },
  { file: "education", title: "Process Automation", subtitle: "Digital enrollment portal", accent: "#A855F7", accent2: "#9333EA" },
  { file: "ai-voice", title: "AI Voice Workflow", subtitle: "Intelligent voice agents", accent: "#EC4899", accent2: "#DB2777" },
  { file: "3cx", title: "3CX Installation", subtitle: "Enterprise cloud PBX", accent: "#2563EB", accent2: "#1D4ED8" },
  { file: "vicidial", title: "VICIdial Deployment", subtitle: "Predictive dialer campaigns", accent: "#1B4F72", accent2: "#154360" },
  { file: "freepbx", title: "FreePBX Configuration", subtitle: "Open-source telephony", accent: "#DC2626", accent2: "#B91C1C" },
  { file: "cloud-pbx", title: "Cloud PBX", subtitle: "Multi-site unified telephony", accent: "#0891B2", accent2: "#0E7490" },
  { file: "sip", title: "SIP Trunk Integration", subtitle: "Business-grade VoIP routing", accent: "#7C3AED", accent2: "#6D28D9" },
  { file: "ivr", title: "IVR Setup", subtitle: "Skills-based call routing", accent: "#059669", accent2: "#047857" },
  { file: "queue", title: "Queue Management", subtitle: "SLA monitoring & callbacks", accent: "#D97706", accent2: "#B45309" },
  { file: "recording", title: "Call Recording", subtitle: "Compliance & searchable archive", accent: "#4F46E5", accent2: "#4338CA" },
  { file: "crm-pbx", title: "CRM + PBX Integration", subtitle: "Screen-pop & click-to-dial", accent: "#E11D48", accent2: "#BE123C" },
  { file: "outbound", title: "Outbound Call Center", subtitle: "Progressive dialer operations", accent: "#0D9488", accent2: "#0F766E" },
];

function cover({ title, subtitle, accent, accent2 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F8FAFC"/>
      <stop offset="0.55" stop-color="#EEF2FF"/>
      <stop offset="1" stop-color="#F0FDFA"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="${accent}"/>
      <stop offset="1" stop-color="${accent2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="75%" cy="25%" r="45%">
      <stop stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#0F172A" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#glow)"/>
  <circle cx="1080" cy="120" r="180" fill="${accent}" opacity="0.08"/>
  <circle cx="180" cy="620" r="140" fill="${accent2}" opacity="0.07"/>
  <rect x="0" y="0" width="1280" height="44" fill="#0F172A"/>
  <circle cx="24" cy="22" r="5.5" fill="#EF4444"/>
  <circle cx="42" cy="22" r="5.5" fill="#F59E0B"/>
  <circle cx="60" cy="22" r="5.5" fill="#22C55E"/>
  <rect x="88" y="12" width="360" height="20" rx="10" fill="#1E293B"/>
  <text x="104" y="26" fill="#94A3B8" font-family="system-ui,sans-serif" font-size="11">${title}</text>
  <rect x="56" y="72" width="200" height="628" rx="14" fill="#FFFFFF" stroke="#E2E8F0" filter="url(#shadow)"/>
  <rect x="76" y="96" width="120" height="12" rx="6" fill="url(#accent)" opacity="0.9"/>
  <rect x="76" y="124" width="100" height="8" rx="4" fill="#E2E8F0"/>
  <rect x="76" y="144" width="130" height="8" rx="4" fill="#F1F5F9"/>
  <rect x="76" y="164" width="90" height="8" rx="4" fill="#F1F5F9"/>
  <rect x="76" y="184" width="110" height="8" rx="4" fill="#F1F5F9"/>
  <rect x="76" y="220" width="160" height="36" rx="10" fill="${accent}" opacity="0.12"/>
  <rect x="76" y="268" width="160" height="36" rx="10" fill="${accent}" opacity="0.08"/>
  <rect x="76" y="316" width="160" height="36" rx="10" fill="${accent}" opacity="0.14"/>
  <rect x="280" y="72" width="944" height="100" rx="14" fill="#FFFFFF" stroke="#E2E8F0" filter="url(#shadow)"/>
  <text x="308" y="118" fill="#0F172A" font-family="system-ui,sans-serif" font-size="30" font-weight="700">${title}</text>
  <text x="308" y="148" fill="#64748B" font-family="system-ui,sans-serif" font-size="15">${subtitle}</text>
  <rect x="308" y="160" width="132" height="32" rx="8" fill="url(#accent)"/>
  <rect x="280" y="192" width="620" height="508" rx="14" fill="#FFFFFF" stroke="#E2E8F0" filter="url(#shadow)"/>
  <rect x="308" y="224" width="160" height="88" rx="12" fill="${accent}" opacity="0.14"/>
  <rect x="488" y="224" width="160" height="88" rx="12" fill="${accent}" opacity="0.22"/>
  <rect x="668" y="224" width="160" height="88" rx="12" fill="${accent}" opacity="0.16"/>
  <rect x="848" y="224" width="32" height="88" rx="12" fill="${accent}" opacity="0.1"/>
  <rect x="308" y="336" width="564" height="12" rx="6" fill="#E2E8F0"/>
  <rect x="308" y="364" width="480" height="12" rx="6" fill="#F1F5F9"/>
  <rect x="308" y="392" width="520" height="12" rx="6" fill="#F1F5F9"/>
  <rect x="308" y="432" width="110" height="72" rx="10" fill="${accent}" opacity="0.28"/>
  <rect x="434" y="432" width="110" height="72" rx="10" fill="${accent}" opacity="0.38"/>
  <rect x="560" y="432" width="110" height="72" rx="10" fill="${accent}" opacity="0.22"/>
  <rect x="686" y="432" width="110" height="72" rx="10" fill="${accent}" opacity="0.32"/>
  <rect x="812" y="432" width="60" height="72" rx="10" fill="${accent}" opacity="0.18"/>
  <rect x="308" y="528" width="564" height="140" rx="12" fill="#F8FAFC" stroke="#E2E8F0"/>
  <path d="M328 620 L408 580 L488 598 L568 560 L648 585 L768 540 L848 570" stroke="${accent}" stroke-width="3.5" fill="none" opacity="0.75"/>
  <circle cx="328" cy="620" r="5" fill="${accent}"/>
  <circle cx="568" cy="560" r="5" fill="${accent2}"/>
  <circle cx="768" cy="540" r="5" fill="${accent}"/>
  <rect x="924" y="192" width="300" height="508" rx="14" fill="#FFFFFF" stroke="#E2E8F0" filter="url(#shadow)"/>
  <rect x="948" y="220" width="252" height="10" rx="5" fill="#CBD5E1"/>
  <rect x="948" y="244" width="200" height="10" rx="5" fill="#E2E8F0"/>
  <rect x="948" y="280" width="252" height="64" rx="10" fill="${accent}" opacity="0.12"/>
  <rect x="948" y="360" width="252" height="64" rx="10" fill="${accent}" opacity="0.18"/>
  <rect x="948" y="440" width="252" height="64" rx="10" fill="${accent}" opacity="0.1"/>
  <rect x="948" y="520" width="252" height="64" rx="10" fill="${accent}" opacity="0.15"/>
  <rect x="948" y="600" width="180" height="10" rx="5" fill="#E2E8F0"/>
  <rect x="948" y="624" width="120" height="10" rx="5" fill="#F1F5F9"/>
</svg>`;
}

for (const project of projects) {
  const svg = cover(project);
  writeFileSync(join(outDir, `${project.file}.svg`), svg, "utf8");
  console.log(`Wrote ${project.file}.svg`);
}

console.log(`Generated ${projects.length} portfolio covers in ${outDir}`);
