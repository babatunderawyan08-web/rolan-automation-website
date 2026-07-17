"use client";

import { stats } from "@/data/site-data";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";

export function StatsSection() {
  return (
    <section className="border-y border-border bg-background-alt py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center last:col-span-2 last:justify-self-center sm:last:col-span-1 sm:last:justify-self-auto lg:last:col-span-1">
              <p className="font-heading text-2xl font-bold text-secondary sm:text-3xl md:text-4xl">
                {stat.value >= 1000 ? `${Math.round(stat.value / 1000)}K` : stat.value}{stat.suffix}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
