"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/data/site-data";
import { Badge } from "@/components/ui/badge";
import { BrandLogo } from "@/components/shared/brand-logo";
import { hasBrandLogo } from "@/lib/brand-icons";

type Category = "automation" | "call-center";

const tabs: { id: Category; label: string; description: string }[] = [
  {
    id: "automation",
    label: "Automation Projects",
    description: "AI workflows, CRM automation, API integrations, and business process automation.",
  },
  {
    id: "call-center",
    label: "Call Center Projects",
    description: "3CX, VICIdial, PBX, VoIP, IVR, and enterprise telephony deployments.",
  },
];

export function PortfolioGrid() {
  const [category, setCategory] = useState<Category>("automation");
  const filtered = portfolio.filter((p) => p.category === category);
  const activeTab = tabs.find((t) => t.id === category)!;

  return (
    <>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCategory(tab.id)}
            className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-all sm:px-5 ${
              category === tab.id
                ? "bg-secondary text-white shadow-md"
                : "bg-background-alt text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.p
        key={category}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-10 text-center text-muted"
      >
        {activeTab.description}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid gap-8 md:grid-cols-2"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <motion.article
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card card-shadow transition-shadow hover:card-shadow-hover"
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
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant={category === "automation" ? "secondary" : "accent"}>
                      {category === "automation" ? "Automation" : "Call Center"}
                    </Badge>
                    <Badge variant="outline">{project.industry}</Badge>
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{project.title}</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-secondary">Client challenge: </span>
                      <span className="text-muted">{project.problem}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary">Solution delivered: </span>
                      <span className="text-muted">{project.solution}</span>
                    </div>
                    <div>
                      <p className="mb-1.5 font-semibold text-secondary">Technologies used</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background-alt px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-secondary/30 hover:text-foreground"
                          >
                            {hasBrandLogo(t) ? (
                              <BrandLogo name={t} size={14} className="rounded-sm" />
                            ) : null}
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1.5 font-semibold text-secondary">Business outcome</p>
                      <ul className="space-y-1">
                        {project.results.map((r) => (
                          <li key={r} className="text-success">
                            âœ“ {r}
                          </li>
                        ))}
                      </ul>
                      <p className="pt-2 text-base font-bold text-success">{project.roi}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
