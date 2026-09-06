"use client";

import Image from "next/image";
import Link from "next/link";
import AnimeReveal from "@/components/anime/AnimeReveal";
import type { ServicePage } from "@/data/services-catalog";

export default function ServiceLanding({ service }: { service: ServicePage }) {
  const detail = service.detail;

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
          <p className="svc-lead">{service.lead}</p>
          <Link href="/contact" className="btn-pill btn-pill-gold">
            Request a Consultation
          </Link>
        </AnimeReveal>
      </section>

      {detail ? (
        <>
          <section className="svc-issues" aria-labelledby="svc-issues-title">
            <div className="container-advisory">
              <h2 id="svc-issues-title" className="svc-issues-heading font-display">
                {detail.need.heading}
              </h2>
              <AnimeReveal className="svc-issues-grid" y={16} selector=".svc-issue-card">
                {detail.need.items.map((item) => (
                  <article key={item.label} className="svc-issue-card">
                    <span className="svc-issue-icon" aria-hidden="true">
                      <i className={`bi ${item.icon}`} />
                    </span>
                    <p className="svc-issue-text">{item.label}</p>
                  </article>
                ))}
              </AnimeReveal>
            </div>
          </section>

          <section className="svc-caps" aria-labelledby="svc-caps-title">
            <div className="container-advisory">
              <h2 id="svc-caps-title" className="svc-caps-heading font-display">
                {detail.capabilities.heading}
              </h2>
              <AnimeReveal className="svc-caps-grid" y={18} selector=".svc-cap-card">
                {detail.capabilities.items.map((item) => (
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

          <section className="svc-split" aria-labelledby="svc-philosophy-title">
            <div className="svc-split-media" aria-hidden="true">
              <Image
                src={detail.philosophy.image}
                alt=""
                fill
                className="svc-split-img"
                sizes="100vw"
                quality={75}
              />
              <span className="svc-split-scrim" />
            </div>
            <div className="svc-split-copy">
              <h2 id="svc-philosophy-title" className="svc-split-title font-display">
                {detail.philosophy.heading}
              </h2>
              <p className="svc-split-text">{detail.philosophy.body}</p>
              <Link href="/contact" className="svc-split-link">
                Request a Consultation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          <section className="svc-copy svc-copy-related">
            <div className="container-advisory svc-copy-inner">
              <AnimeReveal y={16} selector=".svc-related">
                <div className="svc-copy-block svc-related">
                  <p className="svc-related-row">
                    <span className="svc-related-label">Related services</span>
                    <span className="svc-related-values">
                      {detail.related.services.map((item, index) => (
                        <span key={item.href}>
                          {index > 0 ? " | " : null}
                          <Link href={item.href}>{item.label}</Link>
                        </span>
                      ))}
                    </span>
                  </p>
                  <p className="svc-related-row">
                    <span className="svc-related-label">Related industries</span>
                    <span className="svc-related-values">
                      {detail.related.industries.join(" | ")}
                    </span>
                  </p>
                  <p className="svc-related-row">
                    <span className="svc-related-label">Related professionals</span>
                    <span className="svc-related-values">
                      {detail.related.professionals.join(" | ")}
                    </span>
                  </p>
                </div>
              </AnimeReveal>
            </div>
          </section>

          <section className="svc-banner" aria-label={detail.actions.heading}>
            <div className="svc-banner-media" aria-hidden="true">
              <Image
                src={detail.actions.image}
                alt=""
                fill
                className="svc-banner-img"
                sizes="100vw"
                quality={75}
              />
              <span className="svc-banner-scrim" />
            </div>
            <div className="container-advisory svc-banner-inner">
              <h2 className="svc-banner-title font-display">
                {detail.actions.heading}
              </h2>
              <p className="svc-banner-text">{detail.actions.body}</p>
              <div className="svc-banner-actions">
                {detail.actions.items.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`btn-pill ${index === 0 ? "btn-pill-gold" : "btn-pill-white"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
