import { callCenterServices, services } from "@/data/site-data";
import type { Service } from "@/types";

export const allServices: Service[] = [...services, ...callCenterServices];

export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.id === slug);
}

export function getAllServiceSlugs(): string[] {
  return allServices.map((s) => s.id);
}

export function getRelatedServices(service: Service, limit = 3): Service[] {
  const pool = service.category === "call-center" ? callCenterServices : services;
  return pool.filter((s) => s.id !== service.id).slice(0, limit);
}
