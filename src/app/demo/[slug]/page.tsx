import { notFound } from "next/navigation";
import { getProduct, getProductSlugs } from "@/data/products";
import { createMetadata } from "@/lib/seo";
import { ProductDemo } from "@/components/demos/product-demo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return createMetadata({
    title: `${product.name} live demo`,
    description: product.tagline,
    path: `/demo/${product.slug}`,
  });
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDemo product={product} />;
}
