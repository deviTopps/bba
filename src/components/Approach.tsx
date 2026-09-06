"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/anime";
import { siteData } from "@/data/site";

export default function Approach() {
  const { approachSection } = siteData;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion()) return;

    const steps = root.querySelectorAll<HTMLElement>(".approach-phase");
    if (!steps.length) return;

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      animate(steps, {
        opacity: [0, 1],
        y: [40, 0],
        duration: 900,
        delay: stagger(160, { start: 80 }),
        ease: "outCubic",
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          play();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="approach-section" id="approach">
      <div className="approach-inner">
        <div className="approach-head">
          <div className="approach-head-left">
            <h2 className="approach-heading font-display">
              {approachSection.heading}
            </h2>
          </div>
          <p className="approach-lead">{approachSection.lead}</p>
        </div>

        <ol className="approach-phases list-unstyled">
          {approachSection.stages.map((item) => (
            <li key={item.stage} className="approach-phase">
              <div className="approach-phase-title-row">
                <h3 className="approach-phase-name">{item.name}</h3>
                <span className="approach-phase-badge">
                  {item.stage.padStart(2, "0")}
                </span>
              </div>
              <p className="approach-phase-meaning">{item.meaning}</p>
            </li>
          ))}
        </ol>

        <div className="approach-track" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
