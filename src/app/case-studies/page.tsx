import { PageHero } from "@/components/shared/page-hero";
import { caseStudies } from "@/data/site-data";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/shared/animations";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Case Studies",
  description: "Detailed case studies showing how ROLAN AUTOMATION delivers measurable ROI through automation and call center solutions.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Real challenges. Real solutions. Real results."
        subtitle="In-depth looks at how we've transformed businesses with automation."
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl px-4 space-y-12">
          {caseStudies.map((study, i) => (
            <FadeIn key={study.id} delay={i * 0.1}>
              <article className="rounded-2xl border border-border bg-card p-5 card-shadow sm:p-6 md:p-8">
                <Badge variant="secondary" className="mb-4">{study.industry}</Badge>
                <h2 className="font-heading text-2xl font-bold">{study.title}</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-secondary">Challenge</h3>
                    <p className="mt-2 text-sm text-muted">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">Approach</h3>
                    <p className="mt-2 text-sm text-muted">{study.approach}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold text-secondary">Results</h3>
                  <ul className="mt-2 space-y-1">
                    {study.metrics.map((m) => <li key={m} className="text-sm text-success">✓ {m}</li>)}
                  </ul>
                </div>
                <p className="mt-4 text-lg font-bold text-success">{study.roi}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
