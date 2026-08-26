import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/animations";

export function CTABanner() {
  return (
    <section className="home-section">
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d4ed8] via-secondary to-accent p-6 text-center text-white sm:p-10 md:p-14">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <div className="relative">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
                Have a product in mind?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
                ROLAN builds web applications that feel finished: interactive, useful, and ready to show.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Button size="lg" className="w-full bg-white text-secondary hover:bg-white/90 sm:w-auto" asChild>
                  <Link href="/contact">Start a project</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto" asChild>
                  <Link href="/portfolio">Explore live demos</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto" asChild>
                  <Link href="/book-appointment">Book a call</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
