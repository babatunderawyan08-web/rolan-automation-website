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
                    className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <div className="p-5 sm:p-6 md:p-8">
                  <motion.div
                    className="mb-3 flex flex-wrap gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Badge variant={category === "automation" ? "secondary" : "accent"}>
                      {category === "automation" ? "Automation" : "Call Center"}
                    </Badge>
                    <Badge variant="outline">{project.industry}</Badge>
                  </motion.div>
                  <h3 className="font-heading text-xl font-semibold">{project.title}</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-secondary">Problem: </span>
                      <span className="text-muted">{project.problem}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary">Solution: </span>
                      <span className="text-muted">{project.solution}</span>
                    </div>
                    <motion.div
                      className="flex flex-wrap gap-1.5 pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                    >
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background-alt px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-secondary/30 hover:text-foreground"
                        >
                          {hasBrandLogo(t) ? <BrandLogo name={t} size={14} className="rounded-sm" /> : null}
                          {t}
                        </span>
                      ))}
                    </motion.div>
                    <ul className="space-y-1 pt-2">
                      {project.results.map((r) => (
                        <li key={r} className="text-success">✓ {r}</li>
                      ))}
                    </ul>
                    <p className="pt-2 text-base font-bold text-success">{project.roi}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
