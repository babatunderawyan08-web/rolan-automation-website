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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card card-shadow transition-shadow hover:card-shadow-hover"
                >
                  <motion.div
                    className="relative aspect-video overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <motion.div
                    className="p-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <motion.div className="mb-3 flex flex-wrap gap-2">
                      <Badge variant={project.category === "automation" ? "secondary" : "accent"}>
                        {project.category === "automation" ? "Automation" : "Call Center"}
                      </Badge>
                      <Badge variant="outline">{project.industry}</Badge>
                    </motion.div>
                    <h3 className="font-heading text-base font-semibold leading-snug">{project.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{project.problem}</p>
                    <motion.div
                      className="mt-4 flex flex-wrap gap-1.5"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                    >
                      {project.technologies.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted"
                        >
                          {hasBrandLogo(t) ? <BrandLogo name={t} size={11} className="rounded-sm" /> : null}
                          {t}
                        </span>
                      ))}
                    </motion.div>
                    <motion.p
                      className="mt-4 text-sm font-semibold text-success"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      {project.roi}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
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
