"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

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
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

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
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Brand glow — site secondary + accent */}
      <motion.div
        className="absolute -inset-[18%] rounded-full bg-gradient-to-br from-secondary/50 via-accent/40 to-secondary/30 blur-xl"
        animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.94, 1.08, 0.94] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Rotating ring — brand colours */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute -inset-[8%] h-[116%] w-[116%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="logoRingGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="0.5" stopColor="#06B6D4" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="url(#logoRingGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="12 18"
          opacity="0.85"
        />
      </motion.svg>

      {/* Orbiting spark */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_#06b6d4]" />
      </motion.div>

      {/* Your R logo */}
      <div
        className="relative h-full w-full overflow-hidden rounded-full shadow-[0_8px_32px_rgba(37,99,235,0.35)] ring-2 ring-secondary/25 ring-offset-2 ring-offset-background"
      >
        <Image
          src={LOGO_SRC}
          alt=""
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority
        />

        {/* Subtle brand tint to harmonize with site palette */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-secondary/10 via-transparent to-accent/15 mix-blend-soft-light"
          aria-hidden
        />

        {/* Light sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent"
          animate={{ x: ["-130%", "130%"], opacity: [0, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          aria-hidden
        />

        {/* Ring pulse overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-accent/0"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(6,182,212,0)",
              "0 0 0 6px rgba(6,182,212,0.25)",
              "0 0 0 0 rgba(6,182,212,0)",
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          aria-hidden
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
      <motion.span
        className={cn("mt-1 font-semibold uppercase tracking-[0.28em] text-accent", sub)}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Automation
      </motion.span>
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
