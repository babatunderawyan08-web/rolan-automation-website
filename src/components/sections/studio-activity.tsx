"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { useInViewCycle } from "@/components/shared/use-in-view-cycle";

const EVENTS = [
  { slug: "property", text: "New property enquiry" },
  { slug: "food", text: "Order confirmed" },
  { slug: "logistics", text: "Driver assigned" },
  { slug: "learning", text: "Course completed" },
  { slug: "clinic", text: "Appointment booked" },
  { slug: "finance", text: "Budget alert" },
] as const;

export function StudioActivity() {
  const { ref, index, reduce } = useInViewCycle(EVENTS.length, 4200);
  const event = EVENTS[index];
  const product = PRODUCTS.find((item) => item.slug === event.slug);

  return (
    <div ref={ref} className="mx-auto mb-10 flex min-h-12 max-w-xl items-center justify-center sm:mb-12">
      <AnimatePresence mode="wait">
        <motion.p
          key={event.text}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-3.5 py-2 text-xs text-muted shadow-sm backdrop-blur-md sm:text-sm"
        >
          <span
            className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full"
            style={{ background: product?.accent }}
          />
          <span>{event.text}</span>
          <span className="hidden font-medium sm:inline" style={{ color: product?.accent }}>
            {product?.name}
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
