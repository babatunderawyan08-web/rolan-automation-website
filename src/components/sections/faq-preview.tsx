"use client";

import Link from "next/link";
import { faqs } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";

export function FAQPreview() {
  return (
    <section className="section-padding bg-background-alt">
      <div className="container mx-auto max-w-3xl px-4">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about working with ROLAN AUTOMATION."
        />
        <FadeIn>
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(0, 6).map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/faq">View all FAQs <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
