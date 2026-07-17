"use client";

/** Anonymized 3CX screenshots — private data removed */
const SLIDES = [
  { src: "/images/3cx/dashboard.png", label: "Dashboard" },
  { src: "/images/3cx/voice-chat.png", label: "Voice & Chat" },
  { src: "/images/3cx/call-handling.png", label: "Call Handling" },
  { src: "/images/3cx/panel.png", label: "Live Panel" },
  { src: "/images/3cx/call-forwarding.png", label: "Call Forwarding" },
  { src: "/images/3cx/users.png", label: "Users" },
  { src: "/images/3cx/mobile-app.png", label: "Mobile App" },
] as const;

/**
 * Continuous slow left-scrolling marquee of the 7 3CX screenshots.
 * Same motion style as the home tech strip.
 */
export function ThreeCXShowcaseMarquee() {
  const loop = [...SLIDES, ...SLIDES];

  return (
    <section className="border-y border-border bg-background-alt/50 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-secondary">
          Live product tour
        </p>
        <p className="mb-8 text-center text-sm text-muted">
          Real 3CX deployment screens — dashboards, trunks, queues, users, and more
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background-alt to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background-alt to-transparent md:w-28" />

        <div className="animate-marquee-slow flex w-max items-center gap-6 px-6 hover:[animation-play-state:paused]">
          {loop.map((slide, i) => (
            <figure
              key={`${slide.src}-${i}`}
              className="group relative w-[min(82vw,520px)] shrink-0 overflow-hidden rounded-2xl border border-border bg-white shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.label}
                className="aspect-[16/7.5] h-auto w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02]"
                draggable={false}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/65 to-transparent px-4 pb-3 pt-8 text-sm font-medium text-white">
                {slide.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
