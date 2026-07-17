import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/features/service-detail";
import { createMetadata } from "@/lib/seo";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return createMetadata({
    title: service.title,
    description: `${service.description} See sample project results from ROLAN AUTOMATION.`,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
