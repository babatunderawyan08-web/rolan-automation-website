"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PRODUCTS, type Product } from "@/data/products";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { ProductPreview } from "@/components/products/product-preview";
import { StudioActivity } from "@/components/sections/studio-activity";
import { cn } from "@/lib/utils";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function ProductShowcase() {
  const reduce = useReducedMotion();

  return (
    <section id="selected-work" className="home-section scroll-mt-24">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-6 max-w-3xl text-center sm:mb-8"
        >
          <p className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
            Six products. Six industries. Built to feel real.
          </p>
        </motion.div>
        <SectionHeader
          eyebrow="Selected work"
          title="A trailer for six working applications."
          subtitle="Each scene is a preview. The product page is the case study. The live demo is the product."
        />
        <StudioActivity />

        <div className="space-y-4 sm:space-y-6">
          {PRODUCTS.map((product, index) => {
            const next = PRODUCTS[index + 1];
            return (
              <div key={product.slug}>
                <ProductScene product={product} index={index} reduce={!!reduce} />
                {next && <SceneBridge next={next} reduce={!!reduce} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SceneBridge({ next, reduce }: { next: Product; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      className="flex items-center gap-4 py-5 sm:py-7"
    >
      <span className="h-px flex-1 bg-border" />
      <p className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted">
        Next · {next.productLine}
      </p>
      <span className="h-px flex-1 bg-border" style={{ background: next.accentSoft }} />
    </motion.div>
  );
}

function ProductScene({ product, index, reduce }: { product: Product; index: number; reduce: boolean }) {
  const layout = product.slug;
  const reversed = layout === "logistics" || layout === "clinic" || layout === "finance";
  const stacked = layout === "food" || layout === "learning";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.75, ease }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-card/90 p-4 sm:p-6 lg:p-8",
        stacked ? "grid gap-6" : "grid min-w-0 items-center gap-6 sm:gap-8 lg:grid-cols-2",
        layout === "learning" && "lg:grid-cols-1 lg:text-center",
        index === 0 && "shadow-[0_24px_80px_rgba(129,140,248,0.08)]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 80% at ${reversed ? "88%" : "12%"} 18%, ${product.accentSoft}, transparent 70%)`,
        }}
        aria-hidden
      />

      <div
        className={cn(
          "relative [perspective:1200px]",
          reversed && "lg:order-2",
          layout === "learning" && "mx-auto w-full max-w-xl"
        )}
      >
        <motion.div
          initial={reduce ? false : { rotateY: reversed ? 8 : -8, rotateX: 10, y: 18 }}
          whileInView={{ rotateY: reversed ? -4 : 4, rotateX: 6, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="relative [transform-style:preserve-3d]"
        >
          <ProductPreview slug={product.slug} />
        </motion.div>
      </div>

      <div className={cn("relative", reversed && "lg:order-1", layout === "learning" && "mx-auto max-w-xl")}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: product.accent }}>
          {product.industry}
        </p>
        <h3 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">{product.name}</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Demonstrates {product.demonstrates}.
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          {product.automation}
        </p>
        <div className={cn("mt-6 flex flex-wrap gap-3", layout === "learning" && "justify-center")}>
          <Button asChild>
            <Link href={`/portfolio/${product.slug}`}>Explore product</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/demo/${product.slug}`}>
              Live demo <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
