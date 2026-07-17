import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";
import { AboutPortrait } from "@/components/shared/about-portrait";
import { FadeIn } from "@/components/shared/animations";
import { createMetadata } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn about ROLAN AUTOMATION — our mission, vision, and why 180+ businesses trust us for AI automation and call center solutions.",
  path: "/about",
});

const values = [
  { title: "Excellence", desc: "We deliver Fortune 500-quality automation at every price point." },
  { title: "Transparency", desc: "Clear pricing, honest timelines, and open communication throughout." },
  { title: "Security", desc: "SOC 2 aligned practices protect your data at every layer." },
  { title: "Results", desc: "Every project is measured by ROI, not just deliverables." },
];

const timeline = [
  { year: "2020", event: "Founded with a mission to democratize enterprise automation" },
  { year: "2021", event: "Expanded into call center solutions with 3CX and VICIdial expertise" },
  { year: "2022", event: "Launched AI automation division with OpenAI and Claude integrations" },
  { year: "2023", event: "Reached 100+ clients across 15 countries" },
  { year: "2024", event: "Introduced AI voice agents and enterprise call center packages" },
  { year: "2025", event: "340+ projects delivered, 180+ active clients, 24 countries served" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Engineering the future of business automation"
        subtitle="ROLAN AUTOMATION is a premium agency that combines deep technical expertise with boutique, white-glove service."
        cta={{ label: "Work With Us", href: "/contact" }}
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(280px,46%)_1fr] lg:gap-14">
            <FadeIn direction="left" className="h-full">
              <AboutPortrait className="mx-auto max-w-md lg:max-w-none lg:min-h-full" />
            </FadeIn>
            <FadeIn delay={0.15} direction="right" className="flex flex-col justify-center">
              <h2 className="font-heading text-3xl font-bold">Our Story</h2>
              <p className="mt-4 text-muted leading-relaxed">
                ROLAN AUTOMATION was born from a simple frustration: too many businesses were drowning in manual work
                while automation agencies delivered cookie-cutter solutions that didn&apos;t fit. We set out to change that.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Today, we&apos;re a team of certified automation engineers, AI specialists, and call center architects
                who have delivered 340+ projects for clients ranging from startups to enterprises across 24 countries.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="rounded-2xl border border-border bg-card p-5 card-shadow">
                    <CheckCircle2 className="mb-2 h-5 w-5 text-success" />
                    <h3 className="font-semibold">{v.title}</h3>
                    <p className="mt-1 text-sm text-muted">{v.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <section className="section-padding bg-background-alt">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                      {item.year.slice(2)}
                    </div>
                    {i < timeline.length - 1 && <div className="mt-2 h-full w-px bg-border" />}
                  </div>
                  <div className="pb-8">
                    <p className="font-semibold text-secondary">{item.year}</p>
                    <p className="mt-1 text-muted">{item.event}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
