"use client";

import Image from "next/image";
import AnimeReveal from "@/components/anime/AnimeReveal";
import TaglineBanner from "@/components/TaglineBanner";
import { aboutPage } from "@/data/about";

export default function AboutContent() {
  const { hero, intro, philosophy, missionVision, coreValues, purpose, strategic } = aboutPage;

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-media">
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            className="about-hero-img"
            sizes="100vw"
            quality={75}
          />
        </div>
        <div className="about-hero-veil" aria-hidden="true" />
        <AnimeReveal
          className="container-advisory about-hero-inner"
          immediate
          y={24}
          stagger={90}
        >
          <h1 className="about-hero-title font-display">
            About <span className="about-hero-title-gold">Us</span>
          </h1>
        </AnimeReveal>
      </section>

      <section className="about-intro" id="core-business">
        <div className="container-advisory about-intro-layout">
          <AnimeReveal className="about-intro-copy" y={28}>
            <h2 className="about-heading font-display">{intro.heading}</h2>
            {intro.paragraphs.map((text) => (
              <p className="about-body" key={text.slice(0, 48)}>
                {text}
              </p>
            ))}
          </AnimeReveal>
          <div className="about-intro-media">
            <Image
              src={intro.image}
              alt=""
              fill
              className="about-intro-img"
              sizes="(max-width: 991px) 100vw, 46vw"
              quality={72}
            />
          </div>
        </div>
      </section>

      <section className="about-philosophy" id="values">
        <div className="container-advisory about-philosophy-layout">
          <div className="about-philosophy-media">
            <Image
              src={philosophy.image}
              alt=""
              fill
              className="about-philosophy-img"
              sizes="(max-width: 991px) 100vw, 48vw"
              quality={72}
            />
          </div>
          <div className="about-philosophy-copy">
            <h2 className="about-heading about-philosophy-title font-display">
              {philosophy.title}
            </h2>
            <p className="about-philosophy-heading">{philosophy.heading}</p>
            {philosophy.paragraphs.map((text) => (
              <p className="about-philosophy-body" key={text.slice(0, 48)}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-mission" id="mission-vision">
        <div className="container-advisory">
          <h2 className="about-mission-title font-display">
            {missionVision.title}
          </h2>
          <AnimeReveal className="about-mission-grid" y={20} selector=".about-mission-card">
            {missionVision.cards.map((item) => (
              <article key={item.title} className="about-mission-card">
                <span className="about-mission-icon" aria-hidden="true">
                  <i className={`bi ${item.icon}`} />
                </span>
                <h3 className="about-mission-card-title">{item.title}</h3>
                <p className="about-mission-card-body">{item.body}</p>
              </article>
            ))}
          </AnimeReveal>
        </div>
      </section>

      <section className="about-values" id="core-values">
        <div className="container-advisory">
          <h2 className="about-values-title font-display">{coreValues.title}</h2>
          <AnimeReveal className="about-values-grid" y={18} selector=".about-value-card">
            {coreValues.items.map((item) => (
              <article key={item.title} className="about-value-card">
                <span className="about-value-icon" aria-hidden="true">
                  <i className={`bi ${item.icon}`} />
                </span>
                <h3 className="about-value-name">{item.title}</h3>
                <p className="about-value-body">{item.body}</p>
              </article>
            ))}
          </AnimeReveal>
        </div>
      </section>

      <section className="about-purpose" id="mission">
        <div className="about-purpose-media">
          <Image
            src={purpose.image}
            alt=""
            fill
            className="about-purpose-img"
            sizes="100vw"
            quality={72}
          />
        </div>
        <div className="about-purpose-veil" aria-hidden="true" />
        <div className="container-advisory about-purpose-inner">
          <h2 className="about-heading about-purpose-title font-display">
            {purpose.title}
          </h2>
          <span className="about-rule about-rule-on-dark" aria-hidden="true" />
          <p className="about-purpose-text">{purpose.text}</p>
        </div>
      </section>

      <section className="about-strategy" id="strategic-identity">
        <div className="container-advisory">
          <AnimeReveal className="about-strategy-header" y={20}>
            <h2 className="about-heading about-strategy-title font-display">
              {strategic.title}
            </h2>
            <span className="about-rule" aria-hidden="true" />
            <p className="about-strategy-heading">{strategic.heading}</p>
            <p className="about-strategy-intro">{strategic.intro}</p>
          </AnimeReveal>
          <AnimeReveal className="about-pillar-grid" y={22} selector=".about-pillar">
            {strategic.pillars.map((pillar, index) => (
              <article key={pillar.title} className="about-pillar">
                <div className="about-pillar-media">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    className="about-pillar-img"
                    sizes="(max-width: 767px) 100vw, 50vw"
                    quality={70}
                  />
                </div>
                <div className="about-pillar-body">
                  <span className="about-pillar-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="about-pillar-icon" aria-hidden="true">
                    <i className={`bi ${pillar.icon}`} />
                  </span>
                  <h3 className="about-pillar-title">{pillar.title}</h3>
                  <p className="about-pillar-desc">{pillar.description}</p>
                </div>
              </article>
            ))}
          </AnimeReveal>
        </div>
      </section>

      <TaglineBanner id="about-brand-voice" />
    </div>
  );
}
