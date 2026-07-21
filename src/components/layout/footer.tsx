import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { AnimatedLogo } from "@/components/shared/animated-logo";
import { SITE } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  services: [
    { label: "Workflow Automation", href: "/services" },
    { label: "AI Automation", href: "/services" },
    { label: "Call Center Solutions", href: "/services#call-center" },
    { label: "CRM Integration", href: "/services" },
    { label: "Automation Consulting", href: "/services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Book Appointment", href: "/book-appointment" },
    { label: "Book Consultation", href: "/book-consultation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <AnimatedLogo size="md" />
            <p className="mt-4 max-w-sm text-sm text-muted leading-relaxed">{SITE.description}</p>
            <div className="mt-6 flex gap-2">
              <a href={SITE.social.linkedin} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-secondary" aria-label="LinkedIn"><BrandLogo name="LinkedIn" size={20} /></a>
              <a href={SITE.social.twitter} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-secondary" aria-label="Twitter"><BrandLogo name="Twitter" size={20} /></a>
              <a href={SITE.social.youtube} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-secondary" aria-label="YouTube"><BrandLogo name="YouTube" size={20} /></a>
              <a href={SITE.social.instagram} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-secondary" aria-label="Instagram"><BrandLogo name="Instagram" size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-muted hover:text-secondary">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-muted hover:text-secondary">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Newsletter</h4>
            <p className="mb-3 text-sm text-muted">Automation insights delivered weekly.</p>
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="you@company.com" className="min-w-0 flex-1" />
              <Button type="submit" size="sm" className="min-h-11 shrink-0">
                Join
              </Button>
            </form>
            <ul className="mt-6 space-y-2">
              {footerLinks.legal.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-sm text-muted hover:text-secondary">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center text-sm text-muted md:flex-row md:text-left">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="break-all md:break-normal">{SITE.email} · {SITE.phone}</p>
        </div>
      </div>
    </footer>
  );
}
