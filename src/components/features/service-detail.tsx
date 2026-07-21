import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Layers } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";
import { FadeIn } from "@/components/shared/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ServiceHeroMedia } from "@/components/features/service-heroes";
import { ThreeCXCarousel } from "@/components/features/threecx-carousel";
import { hasBrandLogo } from "@/lib/brand-icons";
import { getServiceSample } from "@/data/service-samples";
import { getRelatedServices } from "@/lib/services";
import type { Service } from "@/types";

type ServiceDetailProps = {
  service: Service;
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  const sample = getServiceSample(service.id, service.title);
  const related = getRelatedServices(service);
  const is3CX = service.id === "3cx";

  return (
    <>
      <PageHero
        eyebrow={service.category === "call-center" ? "Call Center Service" : "Automation Service"}
        title={service.title}
        subtitle={service.description}
        cta={{ label: "Book Free Consultation", href: "/book-consultation" }}
        secondaryCta={{ label: "View Full Portfolio", href: "/portfolio" }}
        media={is3CX ? <ThreeCXCarousel /> : <ServiceHeroMedia serviceId={service.id} />}
      />

      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <h2 className="font-heading text-3xl font-bold">What we deliver</h2>
              <p className="mt-4 text-muted leading-relaxed">{sample.overview}</p>
              <ul className="mt-8 space-y-3">
                {sample.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                <Badge variant="secondary" className="mb-4">Sample Project</Badge>
                <h3 className="font-heading text-xl font-bold">{sample.sampleProject.client}</h3>
                <p className="mt-1 text-sm text-secondary">{sample.sampleProject.industry}</p>
                <div className="mt-6 space-y-4 text-sm text-muted">
                  <div>
                    <p className="font-semibold text-foreground">Challenge</p>
                    <p className="mt-1">{sample.sampleProject.challenge}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Solution</p>
                    <p className="mt-1">{sample.sampleProject.solution}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {sample.sampleProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full bg-background-alt px-3 py-1 text-xs font-medium"
                      >
                        {hasBrandLogo(tech) ? <BrandLogo name={tech} size={14} className="rounded-sm" /> : null}
                        {tech}
                      </span>
                    ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted">
                  <Clock className="h-4 w-4 text-secondary" />
                  Delivered in {sample.sampleProject.timeline}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-alt">
        <div className="container mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">Results</p>
              <h2 className="font-heading text-3xl font-bold">Sample outcomes from this service</h2>
            </div>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {sample.sampleProject.results.map((result, i) => (
              <FadeIn key={result} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-card p-6 text-center card-shadow">
                  <p className="text-lg font-semibold text-secondary">{result}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-center gap-2">
              <Layers className="h-5 w-5 text-secondary" />
              <h2 className="font-heading text-2xl font-bold">Related services</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:card-shadow-hover"
                >
                  <p className="font-semibold group-hover:text-secondary">{item.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-secondary">
                    View sample work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <Button variant="accent" size="lg" asChild>
            <Link href="/book-consultation">
              Start your {service.title} project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
