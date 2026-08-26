"use client";

import type { Product } from "@/data/products";
import { PropertyDemo } from "@/components/demos/property-demo";
import { FoodDemo } from "@/components/demos/food-demo";
import { LogisticsDemo } from "@/components/demos/logistics-demo";
import { LearningDemo } from "@/components/demos/learning-demo";
import { ClinicDemo } from "@/components/demos/clinic-demo";
import { FinanceDemo } from "@/components/demos/finance-demo";

export function ProductDemo({ product }: { product: Product }) {
  if (product.slug === "property") return <PropertyDemo product={product} />;
  if (product.slug === "food") return <FoodDemo product={product} />;
  if (product.slug === "logistics") return <LogisticsDemo product={product} />;
  if (product.slug === "learning") return <LearningDemo product={product} />;
  if (product.slug === "clinic") return <ClinicDemo product={product} />;
  return <FinanceDemo product={product} />;
}
