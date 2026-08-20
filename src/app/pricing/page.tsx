import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Engagements",
  description: "How ROLAN works with teams to design and build premium web applications.",
  path: "/pricing",
});

const tiers = [
  {
    name: "Product sprint",
    price: "Scoped",
    period: "2–4 weeks",
    description: "A focused build: one application surface with a working prototype.",
    features: ["Product definition", "Interactive UI", "One live demo flow", "Responsive delivery"],
  },
  {
    name: "Studio product",
    price: "Custom",
    period: "ongoing",
    description: "A complete web application with multiple views, data, and polish.",
    features: ["Full product UI", "Interactive states", "Analytics or operations views", "Handoff-ready craft"],
    highlighted: true,
  },
  {
    name: "Partnership",
    price: "Retainer",
    period: "monthly",
    description: "Continued design and development across a product line.",
    features: ["Priority access", "Iterative releases", "New product modules", "Direct studio collaboration"],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagements"
        title="Work with the studio"
        subtitle="Engagements are scoped around a product, not a menu of disconnected services."
      />
      <section className="section-padding pt-0">
        <div className="container mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl border p-6 ${tier.highlighted ? "border-secondary bg-card" : "border-border bg-card"}`}
            >
              <p className="text-sm text-muted">{tier.period}</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold">{tier.name}</h2>
              <p className="mt-3 font-heading text-3xl">{tier.price}</p>
              <p className="mt-3 text-sm text-muted">{tier.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Button className="mt-8 w-full" variant={tier.highlighted ? "accent" : "outline"} asChild>
                <Link href="/contact">Talk to ROLAN</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
