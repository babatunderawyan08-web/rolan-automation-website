import Link from "next/link";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { blogPosts } from "@/data/site-data";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/animations";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description: "Automation insights, AI trends, call center technology, and business process optimization from ROLAN AUTOMATION.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights & expertise"
        subtitle="Stay ahead with the latest in automation, AI, call center tech, and business optimization."
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group block rounded-2xl border border-border bg-card overflow-hidden card-shadow hover:card-shadow-hover transition-all hover:-translate-y-1">
                  <div className="aspect-[16/9] bg-gradient-to-br from-secondary/10 to-accent/5 flex items-center justify-center">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    </div>
                    <h2 className="mt-3 font-heading text-lg font-semibold group-hover:text-secondary transition-colors">{post.title}</h2>
                    <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
