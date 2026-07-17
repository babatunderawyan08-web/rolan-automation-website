import { services, callCenterServices } from "@/data/site-data";
import type { Service } from "@/types";

export function getAllServices(): Service[] {
  return [...services, ...callCenterServices];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getAllServices().find((s) => s.id === slug);
}

export function getServiceHref(service: Service): string {
  return `/services/${service.id}`;
}
