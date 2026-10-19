"use client";

import { useEffect, useRef } from "react";
import Image from "@/components/SiteImage";
import Link from "next/link";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/anime";
import { siteData } from "@/data/site";

export default function Positioning() {
  const { positioningSection } = siteData;
  const marketRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const setups: Array<() => void> = [];

    const watch = (root: HTMLElement | null, selector: string) => {
      if (!root) return;
      const items = root.querySelectorAll<HTMLElement>(selector);
      if (!items.length) return;

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        animate(items, {
          opacity: [0, 1],
          y: [36, 0],
          duration: 900,
          delay: stagger(140, { start: 80 }),
          ease: "outCubic",
        });
      };

      const rect = root.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 80) {
        play();
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            play();
          }
        },
        { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
      );

      observer.observe(root);
      setups.push(() => observer.disconnect());
    };

    watch(marketRef.current, ".positioning-hero-copy > *");

    return () => setups.forEach((stop) => stop());
  }, []);

  return (
    <div className="positioning-flow">
      <section
        ref={marketRef}
        className="positioning-hero"
        id="what-sets-us-apart"
      >
        <div className="positioning-hero-media" aria-hidden="true">
          <Image
            src="/stock/about-purpose.jpg"
            alt=""
            fill
            className="positioning-hero-img"
            sizes="100vw"
            quality={75}
          />
          <span className="positioning-hero-scrim" />
        </div>

        <div className="positioning-hero-inner">
          <div className="positioning-hero-copy">
            <p className="positioning-hero-label">{positioningSection.heading}</p>
            <h2
              id="market-positioning"
              className="positioning-hero-title font-display"
            >
              {positioningSection.marketLabel}
            </h2>
            <p className="positioning-hero-body">{positioningSection.marketBody}</p>
            <div>
              <Link href="/about" className="positioning-hero-link">
                Learn more about us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
