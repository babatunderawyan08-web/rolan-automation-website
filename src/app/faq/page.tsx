import { PageHero } from "@/components/shared/page-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/shared/animations";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata, faqSchema } from "@/lib/seo";

const faqs = [
  { question: "What is ROLAN?", answer: "ROLAN is a creative technology studio that designs and builds premium web applications and digital products." },
  { question: "Are the portfolio projects real applications?", answer: "Yes. Each product in the gallery opens as an interactive live demo with realistic sample data and working UI states." },
  { question: "Do you only build AI products?", answer: "No. AI is used where it fits — assistants, tutors, and decision support inside the product. Most of the work is product design and application engineering." },
  { question: "Can these demos be turned into production software?", answer: "Yes. The demos are prototypes of product directions. Production builds add authentication, real data, and infrastructure." },
  { question: "How do engagements start?", answer: "Share the product you want to build via the contact form or book a call. Scoping usually starts with a working prototype." },
  { question: "Do you still take on integrations and custom systems?", answer: "Yes, when they live inside a product: calendars, messaging, payments, and operational data — not as a standalone call-center catalog." },
  { question: "Is the site mobile-ready?", answer: "Every marketing page and every live demo is built to work on phones, with stacked layouts and no horizontal overflow." },
  { question: "How do I try a product?", answer: "Open Work, choose a product, then Explore live demo. You can use the app chrome immediately — no account required." },
];

export const metadata = createMetadata({
  title: "FAQ",
  description: "Questions about the ROLAN studio, live product demos, and how engagements work.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PageHero
        eyebrow="FAQ"
        title="Questions"
        subtitle="If something isn’t covered here, send a note — replies usually land within a day."
        cta={{ label: "Contact", href: "/contact" }}
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl px-4">
          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
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
