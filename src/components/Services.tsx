"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimeReveal from "@/components/anime/AnimeReveal";
import AnimeText from "@/components/anime/AnimeText";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { siteData } from "@/data/site";

const SLIDE_MS = 5000;

function visibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.matchMedia("(max-width: 575.98px)").matches) return 1;
  if (window.matchMedia("(max-width: 991.98px)").matches) return 2;
  return 3;
}

export default function Services() {
  const { servicesSection } = siteData;
  const items = servicesSection.items;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(3);
  const [start, setStart] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const maxStart = Math.max(0, items.length - visible);

  const goTo = useCallback(
    (next: number) => {
      if (maxStart === 0) {
        setStart(0);
        return;
      }
      setStart(((next % (maxStart + 1)) + (maxStart + 1)) % (maxStart + 1));
    },
    [maxStart]
  );

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = viewport?.querySelector<HTMLElement>(".services-track");
    const card = viewport?.querySelector<HTMLElement>(".service-card");
    if (!viewport || !track || !card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    setStep(card.getBoundingClientRect().width + gap);
  }, []);

  useEffect(() => {
    const sync = () => setVisible(visibleCount());
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, visible, items.length]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    setStart((current) => Math.min(current, maxStart));
  }, [maxStart]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || !inView || maxStart === 0) return;
    const id = window.setInterval(() => {
      setStart((current) => (current >= maxStart ? 0 : current + 1));
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [inView, maxStart, paused, reduceMotion]);

  return (
    <section className="services-section section" id="services">
      <div className="container-advisory">
        <AnimeText
          as="h2"
          className="services-heading font-display"
          text={servicesSection.heading}
        />

        <div
          className="services-slider"
          style={{ "--services-visible": String(visible) } as CSSProperties}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="services-viewport" ref={viewportRef}>
            <div
              className="services-track"
              style={{
                transform: step ? `translateX(-${start * step}px)` : undefined,
              }}
            >
              {items.map((item) => (
                <Link
                  key={item.title}
                  id={item.id}
                  href={item.href}
                  className="service-card"
                >
                  <div className="service-card-media">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="service-card-img"
                      sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw"
                      quality={75}
                    />
                  </div>
                  <div className="service-card-body">
                    <h3 className="service-card-title">
                      <span className="service-card-bar" aria-hidden="true" />
                      {item.title}
                    </h3>
                    <p className="service-card-desc">{item.description}</p>
                    <span className="service-card-link">
                      Discover more <span aria-hidden="true">›</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="services-controls" aria-label="Service slides">
            <button
              type="button"
              className="services-nav-btn"
              aria-label="Previous services"
              onClick={() => goTo(start - 1)}
            >
              <ChevronLeft />
            </button>
            <div className="services-dots">
              {Array.from({ length: maxStart + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`services-dot${i === start ? " is-active" : ""}`}
                  aria-label={`Show services starting at ${i + 1}`}
                  aria-current={i === start}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="services-nav-btn"
              aria-label="Next services"
              onClick={() => goTo(start + 1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <AnimeReveal className="services-all-wrap" y={16} stagger={0}>
          <Link href="/services" className="services-all-btn">
            Explore All Services <span aria-hidden="true">›</span>
          </Link>
        </AnimeReveal>
      </div>
    </section>
  );
}
