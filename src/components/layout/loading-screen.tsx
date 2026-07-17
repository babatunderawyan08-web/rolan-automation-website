"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLogoIcon } from "@/components/shared/animated-logo";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500">
      <div className="flex flex-col items-center gap-5">
        <AnimatedLogoIcon size={72} />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="font-heading text-lg font-bold tracking-tight">ROLAN</p>
          <p className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Automation</p>
        </motion.div>
        <div className="h-1 w-36 overflow-hidden rounded-full bg-background-alt">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
