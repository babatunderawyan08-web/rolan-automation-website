import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/shared/animations";
import { LayoutDashboard, PanelsTopLeft, Sparkles, Smartphone } from "lucide-react";

export const metadata = createMetadata({
  title: "Capabilities",
  description: "ROLAN designs and builds premium web applications — product interfaces, operational systems, and applied intelligence.",
  path: "/services",
});

const capabilities = [
  {
    icon: PanelsTopLeft,
    title: "Product design & UI",
    description: "Application interfaces with navigation, empty states, and motion that belong in a real product.",
  },
  {
    icon: LayoutDashboard,
    title: "Operational platforms",
    description: "Inventory, bookings, property, and support systems with realistic data models and workflows.",
  },
  {
    icon: Sparkles,
    title: "Applied AI",
    description: "Voice agents, support drafts, and decision support placed inside the product — not as a gimmick.",
  },
  {
    icon: Smartphone,
    title: "Responsive delivery",
    description: "Every product is built mobile-first so dashboards and demos remain usable on a phone.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="What the studio actually builds"
        subtitle="Complete web applications — not service menus. Explore the live products to see the work."
        cta={{ label: "See the work", href: "/portfolio" }}
      />
      <section className="section-padding pt-0">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-heading text-xl font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-muted">
            Looking for a specific product?{" "}
            <Link href="/portfolio" className="text-secondary hover:underline">
              Open the portfolio
            </Link>
            .
          </p>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
