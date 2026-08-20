"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { ProductPreview } from "@/components/products/product-preview";

export function ProductShowcase() {
  return (
    <section className="home-section">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Selected work"
          title="Six products. Six working applications."
          subtitle="Each one is a realistic web app — not a static case study. Open a demo and use it."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((product, index) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div
                className="relative min-h-[220px] overflow-hidden p-4 sm:min-h-[250px] sm:p-5"
                style={{ background: `linear-gradient(180deg, ${product.accentSoft}, transparent)` }}
              >
                <div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: product.glow }}
                  aria-hidden
                />
                <ProductPreview slug={product.slug} />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: product.accent }}>
                  {product.productLine}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{product.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={`/demo/${product.slug}`}>
                      Explore live demo <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href={`/portfolio/${product.slug}`}>View product</Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
