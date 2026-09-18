import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceCallout from "@/components/ServiceCallout";
import { getServicePage } from "@/data/services-catalog";
import { getSubserviceArea, subserviceAreas } from "@/data/subservices";
import "../../../../service.css";

type Props = { params: Promise<{ slug: string; subservice: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return subserviceAreas.flatMap((area) =>
    area.services.map((service) => ({ slug: area.slug, subservice: service.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subservice } = await params;
  const area = getSubserviceArea(slug);
  const service = area?.services.find((item) => item.slug === subservice);
  if (!service) return {};
  return {
    title: `${service.title} in Ghana | BBA`,
    description: service.description.split(/(?<=\.)\s/)[0],
    keywords: area?.keywords,
  };
}

export default async function SubservicePage({ params }: Props) {
  const { slug, subservice } = await params;
  const parent = getServicePage(slug);
  const area = getSubserviceArea(slug);
  const service = area?.services.find((item) => item.slug === subservice);
  if (!parent || !area || !service) notFound();

  return (
    <main id="main-content" className="svc-page">
      <section className="svc-hero subservice-hero">
        <div className="svc-hero-media" aria-hidden="true">
          <Image src={parent.image} alt="" fill priority sizes="100vw" className="svc-hero-img" />
          <span className="svc-hero-scrim" />
        </div>
        <div className="container-advisory svc-hero-inner">
          <nav className="subservice-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true"> / </span>
            <Link href={`/services/${slug}`}>{parent.title}</Link>
          </nav>
          <h1 className="svc-title font-display">{service.title}</h1>
          <p className="svc-lead">{area.tagline}</p>
          <Link href="/contact" className="btn-pill btn-pill-gold">Request a Consultation</Link>
        </div>
      </section>
      <section className="subservice-details">
        <div className="container-advisory subservice-layout">
          <article>
            <p className="subservice-kicker">How we help</p>
            <h2>{service.title}</h2>
            {service.description.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
          <aside className="subservice-industries" aria-labelledby="subservice-industries-title">
            <h2 id="subservice-industries-title">Who this service is for</h2>
            <p>{service.industries}</p>
            <p className="subservice-industry-note">These industry examples are illustrative. We also serve clients in other sectors, with scope tailored to their requirements.</p>
          </aside>
        </div>
      </section>
      <ServiceCallout slug={slug} />
      <section className="svc-caps" aria-labelledby="related-subservices-title">
        <div className="container-advisory">
          <h2 id="related-subservices-title" className="svc-caps-heading">More in {parent.title}</h2>
          <ul className="subservice-related">
            {area.services.filter((item) => item.slug !== subservice).map((item) => (
              <li key={item.slug}><Link href={`/services/${slug}/${item.slug}`}>{item.title}<span aria-hidden="true"> →</span></Link></li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
