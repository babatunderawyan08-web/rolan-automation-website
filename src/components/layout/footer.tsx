import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { AnimatedLogo } from "@/components/shared/animated-logo";
import { SITE } from "@/lib/constants";
import { PRODUCTS } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  products: PRODUCTS.map((product) => ({
    label: product.name,
    href: `/portfolio/${product.slug}`,
  })),
  studio: [
    { label: "Studio", href: "/about" },
    { label: "Work", href: "/portfolio" },
    { label: "Capabilities", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Book a call", href: "/book-appointment" },
    { label: "FAQ", href: "/faq" },
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
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{SITE.description}</p>
            <div className="mt-6 flex gap-2">
              <a href={SITE.social.linkedin} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-secondary" aria-label="LinkedIn"><BrandLogo name="LinkedIn" size={20} /></a>
              <a href={SITE.social.twitter} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-secondary" aria-label="Twitter"><BrandLogo name="Twitter" size={20} /></a>
              <a href={SITE.social.youtube} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-secondary" aria-label="YouTube"><BrandLogo name="YouTube" size={20} /></a>
              <a href={SITE.social.instagram} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-secondary" aria-label="Instagram"><BrandLogo name="Instagram" size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Studio</h4>
            <ul className="space-y-2">
              {footerLinks.studio.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Notes</h4>
            <p className="mb-3 text-sm text-muted">Product updates and selected work, occasionally.</p>
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="you@studio.com" className="min-w-0 flex-1" />
              <Button type="submit" size="sm" className="min-h-11 shrink-0">
                Join
              </Button>
            </form>
            <ul className="mt-6 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
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
