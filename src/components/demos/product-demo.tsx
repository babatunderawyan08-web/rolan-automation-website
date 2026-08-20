"use client";

import type { Product } from "@/data/products";
import { VoiceDemo } from "@/components/demos/voice-demo";
import { InventoryDemo } from "@/components/demos/inventory-demo";
import { EstatesDemo } from "@/components/demos/estates-demo";
import { DeskDemo } from "@/components/demos/desk-demo";
import { BookDemo } from "@/components/demos/book-demo";
import { PulseDemo } from "@/components/demos/pulse-demo";

export function ProductDemo({ product }: { product: Product }) {
  if (product.slug === "voice") return <VoiceDemo product={product} />;
  if (product.slug === "inventory") return <InventoryDemo product={product} />;
  if (product.slug === "estates") return <EstatesDemo product={product} />;
  if (product.slug === "desk") return <DeskDemo product={product} />;
  if (product.slug === "book") return <BookDemo product={product} />;
  return <PulseDemo product={product} />;
}
