import type { Metadata } from "next";
import Link from "next/link";
import GeneralCallout from "@/components/GeneralCallout";
import { subserviceAreas } from "@/data/subservices";
import { bbaPositioning } from "@/data/positioning";
import "../../service.css";

export const metadata: Metadata = {
  title: "Audit, Tax and Management Consulting Services in Ghana | BBA",
  description: `${bbaPositioning.introduction} ${bbaPositioning.description}`,
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="svc-page">
      <header className="services-overview-hero">
        <div className="container-advisory">
          <h1>Audit, tax and consulting services in Ghana</h1>
          <p>{bbaPositioning.introduction}</p>
          <p>{bbaPositioning.description} {bbaPositioning.approach}</p>
          <Link href="/contact" className="btn-pill btn-pill-gold">Request a Consultation</Link>
        </div>
      </header>
      <section className="services-overview-body" aria-label="Our service areas">
        <div className="container-advisory services-overview-grid">
          {subserviceAreas.map((area) => (
            <article className="services-overview-card" key={area.slug}>
              <h2><Link href={`/services/${area.slug}`}>{area.title}</Link></h2>
              <p>{area.summary}</p>
              <Link href={`/services/${area.slug}`}>Explore services <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>
      <GeneralCallout />
    </main>
  );
}
