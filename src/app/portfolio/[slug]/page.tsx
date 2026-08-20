import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { getProduct, getProductSlugs, PRODUCTS } from "@/data/products";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ProductPreview } from "@/components/products/product-preview";
import { CTABanner } from "@/components/shared/cta-banner";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return createMetadata({
    title: product.name,
    description: product.tagline,
    path: `/portfolio/${product.slug}`,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = PRODUCTS.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div
          className="absolute inset-0 opacity-80"
          style={{ background: `radial-gradient(ellipse 70% 50% at 20% 0%, ${product.accentSoft}, transparent)` }}
        />
        <div className="container relative mx-auto max-w-7xl px-4 pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: product.accent }}>
            {product.productLine}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{product.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={`/demo/${product.slug}`}>
                Explore live demo <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Build something like this</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div
            className="rounded-3xl border border-border p-5 sm:p-8"
            style={{ background: `linear-gradient(180deg, ${product.accentSoft}, transparent)` }}
          >
            <ProductPreview slug={product.slug} />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-xl font-semibold">The problem</h2>
              <p className="mt-3 text-muted leading-relaxed">{product.problem}</p>
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold">The solution</h2>
              <p className="mt-3 text-muted leading-relaxed">{product.solution}</p>
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold">Key features</h2>
              <ul className="mt-3 space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: product.accent }} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold">Systems used</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-6 font-heading text-2xl font-semibold">More products</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className="rounded-2xl border border-border bg-card p-5 transition-transform hover:-translate-y-0.5"
              >
                <p className="text-xs uppercase tracking-widest" style={{ color: item.accent }}>
                  {item.productLine}
                </p>
                <p className="mt-2 font-heading text-lg font-semibold">{item.name}</p>
                <p className="mt-2 text-sm text-muted">{item.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
