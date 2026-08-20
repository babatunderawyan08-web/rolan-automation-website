import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { PRODUCTS } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/animations";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "Case Studies",
  description: "How ROLAN product applications solve operational problems across industries.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Problems, products, and working software"
        subtitle="Each study maps to a live application in the ROLAN portfolio."
      />
      <section className="section-padding pt-0">
        <div className="container mx-auto max-w-4xl space-y-10 px-4">
          {PRODUCTS.map((product, index) => (
            <FadeIn key={product.slug} delay={index * 0.05}>
              <article className="rounded-2xl border border-border bg-card p-5 card-shadow sm:p-8">
                <Badge variant="secondary" className="mb-4">{product.industry}</Badge>
                <h2 className="font-heading text-2xl font-bold">{product.name}</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-secondary">Challenge</h3>
                    <p className="mt-2 text-sm text-muted">{product.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">Approach</h3>
                    <p className="mt-2 text-sm text-muted">{product.solution}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-1">
                  {product.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="text-sm text-muted">• {feature}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <Link href={`/demo/${product.slug}`}>Open live demo</Link>
                  </Button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
