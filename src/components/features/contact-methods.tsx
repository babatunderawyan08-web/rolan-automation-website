"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { BrandLogo } from "@/components/shared/brand-logo";
import { getBrandMark } from "@/lib/brand-icons";

const methods = [
  {
    title: "WhatsApp",
    brand: "WhatsApp",
    info: SITE.phone,
    description: "Chat with us directly for quick project inquiries and support.",
    href: `https://wa.me/${SITE.whatsapp}`,
    external: true,
  },
  {
    title: "Telegram",
    brand: "Telegram",
    info: SITE.telegramHandle,
    description: "Message us on Telegram for fast project discussions.",
    href: SITE.telegram,
    external: true,
  },
  {
    title: "Discord",
    brand: "Discord",
    info: SITE.discord,
    description: "Connect with us on Discord for collaboration and updates.",
    href: SITE.discordUrl,
    external: true,
  },
  {
    title: "Email",
    brand: "Gmail",
    info: SITE.email,
    description: "Send us a detailed project brief — we reply within 24 hours.",
    href: `mailto:${SITE.email}`,
    external: false,
  },
];

export function ContactMethods() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {methods.map((method) => {
        const mark = getBrandMark(method.brand);
        const tint = mark ? `${mark.hex}14` : undefined;

        const Card = (
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg sm:p-6"
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60"
              style={{ backgroundColor: tint }}
            >
              <BrandLogo name={method.brand} size={28} />
            </div>
            <h3 className="font-heading font-semibold group-hover:text-secondary">{method.title}</h3>
            <p className="mt-1 text-sm font-medium" style={{ color: mark?.hex }}>
              {method.info}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{method.description}</p>
            <p className="mt-4 text-sm font-medium text-secondary opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
              {method.external ? "Open →" : "Send email →"}
            </p>
          </motion.div>
        );

        return method.external ? (
          <a key={method.title} href={method.href} target="_blank" rel="noopener noreferrer">
            {Card}
          </a>
        ) : (
          <Link key={method.title} href={method.href}>
            {Card}
          </Link>
        );
      })}
    </div>
  );
}
