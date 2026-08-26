"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Swap this path to replace the hero portrait without redesigning the composition.
 * Prefer a cut-out PNG (transparent background).
 */
export const HERO_PORTRAIT_SRC = "/images/rolan-portrait.png";

const PHOTO = "object-cover object-[50%_12%]";
const LIFT = {
  transform: "scale(1.18) translateY(-9%)",
  transformOrigin: "top center",
} as const;

type HeroPortraitProps = {
  src?: string;
  alt?: string;
};

function Photo({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0" style={LIFT}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        aria-hidden={alt === "" ? true : undefined}
        sizes="(max-width: 1024px) 80vw, 400px"
        className={PHOTO}
      />
    </div>
  );
}

export function HeroPortrait({
  src = HERO_PORTRAIT_SRC,
  alt = "Rolan, digital product builder",
}: HeroPortraitProps) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:mr-0 lg:max-w-[25rem]">
      <div className="relative overflow-visible pt-[11%]">
        <div className="relative aspect-square w-full overflow-visible">
          <div className="absolute inset-0 z-0 rounded-full bg-[#e8eef7]" />

          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -inset-[7%] z-[1]",
              !reduce && "animate-orbit motion-reduce:animate-none",
            )}
            style={!reduce ? { animationDuration: "8s" } : undefined}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
              <defs>
                <linearGradient
                  id="rolan-orbit-fade"
                  gradientUnits="userSpaceOnUse"
                  x1="6"
                  y1="34"
                  x2="86"
                  y2="20"
                >
                  <stop offset="0" stopColor="#2563eb" stopOpacity="0" />
                  <stop offset="0.55" stopColor="#2563eb" stopOpacity="1" />
                  <stop offset="1" stopColor="#2563eb" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M 6 34 A 47.4 47.4 0 0 1 86 20"
                stroke="url(#rolan-orbit-fade)"
                strokeWidth="1.55"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="absolute inset-0 z-[2] overflow-hidden rounded-full">
            <Photo src={src} alt="" />
          </div>

          <div className="hero-portrait-head pointer-events-none absolute inset-x-0 -top-[11%] z-[3] h-[50%] overflow-visible">
            <div className="absolute inset-x-0 aspect-square w-full" style={{ top: "22%" }}>
              <Photo src={src} alt={alt} priority />
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-5 w-fit rounded-full border border-[#d5deea] bg-white px-5 py-2 text-center font-heading text-sm font-medium tracking-tight text-[#0b1220] shadow-sm sm:px-6 sm:py-2.5 sm:text-base">
        Hello, I&apos;m Rolan
      </p>
    </div>
  );
}
