"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "@/components/SiteImage";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { siteData } from "@/data/site";
import { easeOut, heroStagger } from "@/lib/motion";

const SLIDE_MS = 5000;

export default function Hero() {
  const { hero } = siteData;
  const slides = hero.slides;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || !inView || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [inView, paused, reduceMotion, slides.length]);

  const slide = slides[index];

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: easeOut }}>
      <header
        ref={headerRef}
        className="hero hero-akor"
        id="top"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hero-slider" aria-hidden="true">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={slide.image}
              className="hero-media"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: easeOut }}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                className="hero-media-img"
                sizes="100vw"
                quality={75}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-veil" aria-hidden="true" />

        <div className="container-advisory hero-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${index}`}
              className="hero-copy"
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              variants={heroStagger}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <h1 className="hero-title">
                <span className="hero-title-line">{slide.headlineLine1}</span>
                <span className="hero-title-line hero-title-accent">
                  {slide.headlineLine2}
                </span>
              </h1>
              <p className="hero-desc">{slide.description}</p>
              <div className="hero-actions">
                <Link href={hero.ctaHref} className="hero-cta-green">
                  {hero.cta}
                </Link>
                <Link href={hero.secondaryHref} className="hero-link-learn">
                  {hero.secondaryCta}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-controls" aria-label="Hero slides">
          <button
            type="button"
            className="hero-nav-btn"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
          >
            <ChevronLeft />
          </button>
          <div className="hero-dots">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                className={`hero-dot${i === index ? " is-active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="hero-nav-btn"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
          >
            <ChevronRight />
          </button>
        </div>

        <div className="hero-progress" aria-hidden="true">
          <span
            key={`${index}-${paused}`}
            className={`hero-progress-bar${paused || reduceMotion || !inView ? " is-paused" : ""}`}
          />
        </div>
      </header>
    </MotionConfig>
  );
}
