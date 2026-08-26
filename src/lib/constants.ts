export const SITE = {
  name: "ROLAN",
  legalName: "ROLAN Studio",
  tagline: "Creative Technology Studio",
  description:
    "ROLAN designs and builds premium web applications — industry platforms for property, food, logistics, learning, clinic, and finance.",
  url: "https://rolanautomation.com",
  email: "contact@rolanautomation.com",
  phone: "+1 825 859 4136",
  whatsapp: "18258594136",
  telegram: "https://t.me/chancenew",
  telegramHandle: "@chancenew",
  discord: "rolan.automation",
  discordUrl: "https://discord.com",
  address: "1200 Innovation Drive, Suite 400, Austin, TX 78701",
  social: {
    linkedin: "https://linkedin.com/company/rolan-automation",
    twitter: "https://twitter.com/rolanautomation",
    youtube: "https://youtube.com/@rolanautomation",
    instagram: "https://instagram.com/rolanautomation",
  },
} as const;

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Work", href: "/portfolio" },
  { label: "Studio", href: "/about" },
  { label: "Capabilities", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const STUDIO_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Supabase",
  "PostgreSQL",
  "OpenAI",
  "Twilio",
  "Stripe",
  "Node.js",
  "Recharts",
  "Vercel",
  "Figma",
] as const;
