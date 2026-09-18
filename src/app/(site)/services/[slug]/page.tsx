import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSpecContent from "@/components/ServiceSpecContent";
import ServiceLanding from "@/components/ServiceLanding";
import { getServicePage, servicePages } from "@/data/services-catalog";
import { getSubserviceArea } from "@/data/subservices";
import "../../../service.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  const area = getSubserviceArea(slug);
  if (!service) {
    return { title: "Services | Bernard Bempong & Associates" };
  }
  return {
    title: `${area?.title ?? service.title} in Ghana | BBA`,
    description: area?.summary.split(/(?<=\.)\s/)[0] ?? service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  return (
    <main id="main-content">
      {service.spec ? (
        <ServiceSpecContent service={service} />
      ) : (
        <ServiceLanding service={service} />
      )}
    </main>
  );
}
