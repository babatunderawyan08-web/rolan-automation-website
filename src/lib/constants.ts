export const SITE = {
  name: "ROLAN AUTOMATION",
  tagline: "AI Automation Agency",
  description:
    "Premium AI automation, workflow engineering, call center solutions, and CRM integrations for businesses that demand excellence.",
  url: "https://rolanautomation.com",
  email: "babatunderawyan08@gmail.com",
  phone: "+234 703 482 1995",
  whatsapp: "2347034821995",
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

export const NAV_LINKS: { label: string; href: string; mega?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
