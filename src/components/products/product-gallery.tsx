import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductPreview } from "@/components/products/product-preview";
import { Button } from "@/components/ui/button";

export function ProductGallery() {
  return (
    <div className="grid gap-8">
      {PRODUCTS.map((product, index) => (
        <article
          key={product.slug}
          className={`overflow-hidden rounded-3xl border border-border bg-card lg:grid lg:grid-cols-2 ${
            index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div
            className="relative min-h-[240px] p-5 sm:p-8"
            style={{ background: `linear-gradient(160deg, ${product.accentSoft}, transparent 70%)` }}
          >
            <div
              className="absolute -left-8 top-8 h-36 w-36 rounded-full blur-3xl"
              style={{ background: product.glow }}
            />
            <ProductPreview slug={product.slug} />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: product.accent }}>
              {product.industry} · {product.productLine}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold">{product.name}</h2>
            <p className="mt-3 text-muted">{product.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              <span className="font-medium text-foreground">Problem. </span>
              {product.problem}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              <span className="font-medium text-foreground">Solution. </span>
              {product.solution}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/demo/${product.slug}`}>
                  Explore live demo <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/portfolio/${product.slug}`}>Product details</Link>
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
