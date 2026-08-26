import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";
import { AboutPortrait } from "@/components/shared/about-portrait";
import { FadeIn } from "@/components/shared/animations";
import { createMetadata } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";

export const metadata = createMetadata({
  title: "Studio",
  description: "ROLAN is a creative technology studio that designs and builds premium web applications and digital products.",
  path: "/about",
});

const values = [
  { title: "Product craft", desc: "Interfaces should feel finished — considered motion, clear hierarchy, and real workflows." },
  { title: "Usefulness", desc: "Every screen exists to do a job: book, track, reply, decide." },
  { title: "Clarity", desc: "No theatre. The work should explain itself when someone opens a demo." },
  { title: "Ownership", desc: "Applications are designed as products, not one-off marketing pages." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        title="A creative technology practice"
        subtitle="ROLAN builds web applications with the depth of internal tools and the finish of a flagship product."
        cta={{ label: "Start a project", href: "/contact" }}
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(280px,46%)_1fr] lg:gap-14">
            <FadeIn direction="left" className="h-full">
              <AboutPortrait className="mx-auto max-w-md lg:max-w-none lg:min-h-full" />
            </FadeIn>
            <FadeIn delay={0.15} direction="right" className="flex flex-col justify-center">
              <h2 className="font-heading text-3xl font-bold">The practice</h2>
              <p className="mt-4 leading-relaxed text-muted">
                ROLAN started as a place to make software that actually looks like software — not a brochure pretending to be a portfolio.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                The studio now ships complete product experiences: property, food ordering, logistics, learning, clinic, and finance platforms. AI is used where it improves the product, not as the whole story.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {values.map((value) => (
                  <div key={value.title} className="rounded-2xl border border-border bg-card p-5 card-shadow">
                    <CheckCircle2 className="mb-2 h-5 w-5 text-success" />
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="mt-1 text-sm text-muted">{value.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
