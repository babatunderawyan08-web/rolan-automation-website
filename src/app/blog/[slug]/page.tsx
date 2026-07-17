import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/site-data";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/seo";
import { CTABanner } from "@/components/shared/cta-banner";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return createMetadata({ title: post.title, description: post.excerpt, path: `/blog/${slug}`, type: "article" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <article className="pt-32 pb-16">
        <div className="container mx-auto max-w-3xl px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-secondary mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="font-heading text-[1.75rem] font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-muted">{post.date} · {post.readTime} read</p>
          <div className="mt-8 aspect-video rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/5" />
          <div className="prose prose-lg mt-10 max-w-none text-muted leading-relaxed">
            <p>{post.excerpt}</p>
            <p className="mt-4">
              At ROLAN AUTOMATION, we help businesses leverage cutting-edge automation to achieve measurable results.
              This article explores key strategies and best practices in {post.category.toLowerCase()} that can transform
              how your organization operates.
            </p>
            <h2 className="font-heading text-foreground text-2xl font-bold mt-8">Key Takeaways</h2>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>Automation is no longer optional — it&apos;s a competitive necessity</li>
              <li>Start with high-impact, low-complexity workflows for quick wins</li>
              <li>Measure ROI from day one with clear KPIs and dashboards</li>
              <li>Choose platforms that scale with your business growth</li>
            </ul>
            <p className="mt-6">
              Ready to implement these strategies? Book a free consultation with our team and get a custom automation
              roadmap tailored to your business.
            </p>
          </div>
        </div>
      </article>
      <CTABanner />
    </>
  );
}
