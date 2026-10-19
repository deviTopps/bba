"use client";

import Image from "@/components/SiteImage";
import Link from "next/link";
import AnimeReveal from "@/components/anime/AnimeReveal";
import AssessmentCallout from "@/components/AssessmentCallout";
import ServiceCallout from "@/components/ServiceCallout";
import type { ServicePage } from "@/data/services-catalog";
import { getSubserviceArea } from "@/data/subservices";

export default function ServiceSpecContent({ service }: { service: ServicePage }) {
  const spec = service.spec ?? [];
  const area = getSubserviceArea(service.slug);
  const purpose = spec.find((row) => row.label === "Purpose");
  const core = spec.find((row) => row.label === "Core Services");
  const advantage = spec.find((row) => row.label === "Competitive Advantage");

  return (
    <div className="svc-page">
      <section className="svc-hero">
        <div className="svc-hero-media" aria-hidden="true">
          <Image
            src={service.image}
            alt=""
            fill
            priority
            className="svc-hero-img"
            sizes="100vw"
            quality={75}
          />
          <span className="svc-hero-scrim" />
        </div>
        <AnimeReveal className="container-advisory svc-hero-inner" immediate y={24}>
          <h1 className="svc-title font-display">
            {service.titlePrefix ? (
              <>
                <span className="svc-title-white">{service.titlePrefix}</span>
                <br />
                {service.title.slice(service.titlePrefix.length).trimStart()}
              </>
            ) : (
              service.title
            )}
          </h1>
          <p className="svc-lead">{service.slug === "audit" || service.slug === "public-sector" ? service.lead : area?.tagline ?? service.lead}</p>
          <Link href="/contact" className="btn-pill btn-pill-gold">
            Request a Consultation
          </Link>
        </AnimeReveal>
      </section>

      {area ? (
        <section className="subservice-details" aria-labelledby="service-overview-title">
          <div className="container-advisory service-area-overview">
            <h2 id="service-overview-title">{area.title}</h2>
            <p>{area.summary}</p>
            <h3>Who We Serve</h3>
            <p>{area.audience}</p>
            <p className="subservice-industry-note">The industry references are illustrative and do not limit BBA’s ability to serve clients in other sectors.</p>
            <ul className="subservice-related">
              {area.services.map((item) => (
                <li key={item.slug}><Link href={`/services/${service.slug}/${item.slug}`}>{item.title} <span aria-hidden="true">→</span></Link></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {purpose?.body ? (
        <section className="svc-purpose" aria-labelledby="svc-purpose-title">
          <div className="container-advisory">
            <p className="svc-purpose-kicker">{purpose.label}</p>
            <h2 id="svc-purpose-title" className="svc-purpose-text font-display">
              {purpose.body}
            </h2>
          </div>
        </section>
      ) : null}

      {core?.items?.length ? (
        <section className="svc-caps" aria-labelledby="svc-core-title">
          <div className="container-advisory">
            <h2 id="svc-core-title" className="svc-caps-heading font-display">
              {core.label}
            </h2>
            <AnimeReveal className="svc-caps-grid" y={18} selector=".svc-cap-card">
              {core.items.map((item) => (
                <article key={item.label} className="svc-cap-card">
                  <span className="svc-cap-icon" aria-hidden="true">
                    <i className={`bi ${item.icon}`} />
                  </span>
                  <h3 className="svc-cap-title">{item.label}</h3>
                </article>
              ))}
            </AnimeReveal>
          </div>
        </section>
      ) : null}

      {advantage?.body ? (
        <section className="svc-advantage" aria-labelledby="svc-advantage-title">
          <div className="container-advisory">
            <p className="svc-advantage-kicker">{advantage.label}</p>
            <h2 id="svc-advantage-title" className="svc-advantage-text font-display">
              {advantage.body}
            </h2>
          </div>
        </section>
      ) : null}
      {service.slug === "tax" || service.slug === "audit" ? <AssessmentCallout /> : null}
      <ServiceCallout slug={service.slug} />
    </div>
  );
}
