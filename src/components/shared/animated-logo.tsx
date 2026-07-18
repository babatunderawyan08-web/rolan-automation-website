"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

/** Exact ROLAN mark — circular crop, no color overlays. */
const LOGO_SRC = "/images/rolan-logo.png";

type AnimatedLogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
};

const sizes = {
  sm: { icon: 40, gap: "gap-2.5", title: "text-[0.95rem]", sub: "text-[0.52rem]" },
  md: { icon: 46, gap: "gap-3", title: "text-lg", sub: "text-[0.58rem]" },
  lg: { icon: 64, gap: "gap-3.5", title: "text-2xl", sub: "text-[0.62rem]" },
};

function LogoMark({ size = 46 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ width: size, height: size, rotateX, rotateY, transformPerspective: 700 }}
      className="logo-mark relative shrink-0 [transform-style:preserve-3d]"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Soft glow behind exact circular mark */}
      <div
        className="absolute -inset-[12%] rounded-full bg-secondary/25 blur-lg"
        aria-hidden
      />

      {/* Exact logo clipped to circle */}
      <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_6px_24px_rgba(37,99,235,0.28)]">
        <Image
          src={LOGO_SRC}
          alt=""
          fill
          sizes={`${size}px`}
          className="object-cover object-center"
          priority
        />
      </div>
    </motion.div>
  );
}

const titleLetters = "ROLAN".split("");

function LogoWordmark({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex flex-col justify-center leading-none">
      <div className="flex overflow-hidden">
        {titleLetters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className={cn("logo-shimmer font-heading font-bold tracking-[-0.04em]", title)}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <span className={cn("mt-1 font-semibold uppercase tracking-[0.28em] text-accent", sub)}>
        Automation
      </span>
      <span
        className="mt-1.5 block h-px w-0 bg-gradient-to-r from-secondary via-accent to-transparent transition-all duration-500 group-hover:w-full"
        aria-hidden
      />
    </div>
  );
}

export function AnimatedLogo({
  className,
  showText = true,
  size = "md",
  href = "/",
}: AnimatedLogoProps) {
  const cfg = sizes[size];

  const content = (
    <motion.div
      className={cn("group flex items-center", cfg.gap, className)}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <LogoMark size={cfg.icon} />
      {showText && <LogoWordmark title={cfg.title} sub={cfg.sub} />}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={SITE.name} className="shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}

export function AnimatedLogoIcon({ size = 76 }: { size?: number }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <LogoMark size={size} />
    </motion.div>
  );
}
