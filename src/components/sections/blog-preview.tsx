"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";

export function BlogPreview() {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Blog"
          title="Automation insights & expertise"
          subtitle="Stay ahead with the latest in AI, automation, call center tech, and business process optimization."
        />
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block rounded-2xl border border-border bg-card overflow-hidden card-shadow hover:card-shadow-hover transition-all hover:-translate-y-1">
                <div className="aspect-[16/9] bg-gradient-to-br from-secondary/10 to-accent/5 flex items-center justify-center">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-heading font-semibold group-hover:text-secondary transition-colors">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-secondary">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
