import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/shared/animations";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Industries",
  description: "ROLAN builds web applications for property, food, logistics, learning, clinic, and finance teams.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Products shaped by real operating environments"
        subtitle="Each application is built around a specific industry workflow, then demonstrated as software, not a pitch deck."
        cta={{ label: "See products", href: "/portfolio" }}
      />
      <section className="section-padding pt-0">
        <div className="container mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <FadeIn key={product.slug} delay={index * 0.05}>
              <Link href={`/portfolio/${product.slug}`} className="block h-full rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-0.5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: product.accent }}>
                  {product.industry}
                </p>
                <h2 className="mt-3 font-heading text-xl font-semibold">{product.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{product.tagline}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
