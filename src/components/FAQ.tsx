"use client";

import { useState } from "react";
import AnimeReveal from "@/components/anime/AnimeReveal";
import AnimeText from "@/components/anime/AnimeText";
import { siteData } from "@/data/site";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq section" id="faq">
      <div className="container-advisory">
        <AnimeText
          as="h2"
          className="section-title font-display text-center mx-auto"
          text="Frequently asked questions"
        />

        <AnimeReveal
          className="accordion accordion-flush faq-accordion mt-5"
          id="faqAccordion"
          selector=".accordion-item"
          stagger={70}
          y={20}
        >
          {siteData.faqs.map((item, index) => {
            const collapseId = `faq-${index}`;
            const isOpen = openIndex === index;
            return (
              <div className="accordion-item" key={item.question}>
                <h3 className="accordion-header">
                  <button
                    className={`accordion-button${isOpen ? "" : " collapsed"}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={collapseId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {item.question}
                  </button>
                </h3>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse${isOpen ? " show" : ""}`}
                  role="region"
                  hidden={!isOpen}
                >
                  <div className="accordion-body">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </AnimeReveal>
      </div>
    </section>
  );
}
