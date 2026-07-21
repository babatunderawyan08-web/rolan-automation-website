"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { portfolio } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/animations";
import { BrandLogo } from "@/components/shared/brand-logo";
import { hasBrandLogo } from "@/lib/brand-icons";

const featured = [
  ...portfolio.filter((p) => p.category === "automation").slice(0, 2),
  ...portfolio.filter((p) => p.category === "call-center").slice(0, 2),
];

export function PortfolioPreview() {
  return (
    <section className="home-section">
      <motion.div
        className="container mx-auto max-w-7xl px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader
          eyebrow="Featured work"
          title="Results that speak for themselves"
          subtitle="Four highlights from our automation and call center portfolio."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {featured.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card card-shadow transition-shadow hover:card-shadow-hover"
              >
                <div className="relative aspect-video overflow-hidden bg-background-alt">
                  <img
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant={project.category === "automation" ? "secondary" : "accent"}>
                      {project.category === "automation" ? "Automation" : "Call Center"}
                    </Badge>
                    <Badge variant="outline">{project.industry}</Badge>
                  </div>
                  <h3 className="font-heading text-base font-semibold leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    <span className="font-medium text-foreground">Challenge: </span>
                    {project.problem}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    <span className="font-medium text-foreground">Solution: </span>
                    {project.solution}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted"
                      >
                        {hasBrandLogo(t) ? (
                          <BrandLogo name={t} size={11} className="rounded-sm" />
                        ) : null}
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-auto pt-4 text-sm font-semibold text-success">{project.roi}</p>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button variant="outline" asChild>
            <Link href="/portfolio">
              View full portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
