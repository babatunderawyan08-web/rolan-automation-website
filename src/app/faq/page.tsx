import { PageHero } from "@/components/shared/page-hero";
import { faqs } from "@/data/site-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/shared/animations";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata, faqSchema } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Frequently asked questions about ROLAN AUTOMATION services, pricing, process, and support.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Can't find your answer? Contact us and we'll respond within 24 hours."
        cta={{ label: "Contact Us", href: "/contact" }}
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl px-4">
          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
