"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
  }, [emblaApi]);

  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Testimonials"
          title="What our clients say"
          subtitle="Don't take our word for it — hear from businesses we've transformed."
        />
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex md:-ml-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="min-w-0 flex-[0_0_100%] pl-4 md:flex-[0_0_50%] md:pl-6 lg:flex-[0_0_33.333%]"
                >
                  <div className="h-full rounded-2xl border border-border bg-card p-5 card-shadow sm:p-6">
                    <div className="mb-4 flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-sm font-bold text-white">
                        {t.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{t.name}</p>
                        <p className="truncate text-xs text-muted">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-background-alt disabled:opacity-30"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-background-alt disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
