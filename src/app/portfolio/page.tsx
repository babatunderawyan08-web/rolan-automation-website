import { PageHero } from "@/components/shared/page-hero";
import { ProductGallery } from "@/components/products/product-gallery";
import { CTABanner } from "@/components/shared/cta-banner";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Work",
  description: "Explore ROLAN's product portfolio — six interactive web applications with live demos.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Applications you can open and use"
        subtitle="A gallery of realistic products across operations, customer experience, and analytics — each with a working live demo."
      />
      <section className="section-padding pt-0">
        <div className="container mx-auto max-w-7xl px-4">
          <ProductGallery />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
