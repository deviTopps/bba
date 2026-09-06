"use client";

import AnimeReveal from "@/components/anime/AnimeReveal";
import AnimeText from "@/components/anime/AnimeText";
import { siteData } from "@/data/site";

export default function Audience() {
  const { audienceSection } = siteData;

  return (
    <>
      <section className="audience-section section" id="who-we-serve">
        <div className="container-advisory">
          <AnimeText
            as="h2"
            className="audience-heading font-display"
            text={audienceSection.badge}
          />

          <AnimeReveal y={20} stagger={0}>
            <p className="audience-intro">{audienceSection.closing}</p>
          </AnimeReveal>

          <AnimeReveal className="audience-grid" selector=".audience-card">
            {audienceSection.items.map((item) => (
              <article key={item.title} className="audience-card">
                <span
                  className="audience-card-icon"
                  style={{ ["--icon" as string]: `url(${item.icon})` }}
                  aria-hidden="true"
                />
                <h3 className="audience-card-title">{item.title}</h3>
                <p className="audience-card-desc">{item.description}</p>
              </article>
            ))}
          </AnimeReveal>
        </div>
      </section>

      <section
        className="audience-access-panel"
        id="capability"
        aria-label="Integrated capability"
      >
        <div className="audience-access-inner">
          <AnimeReveal y={20} stagger={0}>
            <p className="audience-access-lead">{audienceSection.accessLead}</p>
          </AnimeReveal>

          <AnimeReveal
            as="ul"
            className="audience-access list-unstyled"
            selector=".audience-access-item"
            stagger={70}
            y={18}
            scale={0.9}
          >
            {audienceSection.access.map((item) => (
              <li key={item.label} className="audience-access-item">
                <span
                  className="audience-access-icon"
                  style={{ ["--icon" as string]: `url(${item.icon})` }}
                  aria-hidden="true"
                />
                <span className="audience-access-label">{item.label}</span>
              </li>
            ))}
          </AnimeReveal>
        </div>
      </section>
    </>
  );
}
