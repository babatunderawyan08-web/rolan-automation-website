"use client";

import { Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBrandFile, getBrandMark } from "@/lib/brand-icons";

type BrandLogoProps = {
  name: string;
  className?: string;
  /** Icon size in px (square). Default 24 */
  size?: number;
  title?: string;
};

/**
 * Renders an official brand SVG logo in its original brand color.
 * Prefer /public/logos file assets, then Simple Icons paths.
 * "Workflow Automation" uses the Workflow icon (not a brand mark).
 */
export function BrandLogo({ name, className, size = 24, title }: BrandLogoProps) {
  const label = title || name;

  // Non-brand: Workflow Automation → Lucide Workflow
  if (name.trim().toLowerCase() === "workflow automation") {
    return (
      <Workflow
        className={cn("shrink-0 text-secondary", className)}
        style={{ width: size, height: size }}
        aria-label={label}
      />
    );
  }

  const file = getBrandFile(name);
  if (file) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- SVG/PNG brand assets from /public/logos
      <img
        src={file.src}
        alt={file.title}
        width={size}
        height={size}
        className={cn("shrink-0 object-contain rounded-sm", className)}
      />
    );
  }

  const mark = getBrandMark(name);

  if (!mark) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-md bg-background-alt text-[10px] font-bold uppercase tracking-wide text-muted",
          className
        )}
        style={{ width: size, height: size }}
        title={name}
        aria-label={name}
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-label={title || mark.title}
    >
      <title>{title || mark.title}</title>
      <path d={mark.path} fill={mark.hex} />
    </svg>
  );
}

type BrandChipProps = {
  name: string;
  className?: string;
};

/** Equal-height tech chip with official logo + label */
export function BrandChip({ name, className }: BrandChipProps) {
  return (
    <span
      className={cn(
        "group inline-flex h-11 items-center gap-2.5 rounded-xl border border-border bg-card px-4 text-sm font-medium text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:text-foreground hover:shadow-md",
        className
      )}
    >
      <BrandLogo name={name} size={20} className="transition-transform duration-300 group-hover:scale-110" />
      <span>{name}</span>
    </span>
  );
}
