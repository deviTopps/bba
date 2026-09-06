export const aboutPage = {
  hero: {
    title: "About Us",
    cta: "Request a Consultation",
    ctaHref: "/contact",
    image: "/stock/about-hero.jpg",
  },
  intro: {
    image: "/stock/about-intro.jpg",
    heading: "What We Do",
    paragraphs: [
      "Bernard Bempong & Associates is a Ghana based professional services firm. Clients have one point of contact for audit readiness, statutory reporting, VAT and tax, working capital, internal controls and ERP, joined to strategy. That combination remains uncommon at our scale in Ghana.",
      "We work with government agencies on public financial management, with companies on inventory, revenue assurance and GRA compliance, and with development sector organisations that need evidence and practical capability. That record is extending across Africa as delivery capacity grows.",
    ],
    cta: "Request a Consultation",
    ctaHref: "/contact",
  },
  philosophy: {
    title: "Corporate Philosophy",
    heading: "Professional excellence and African transformation are the same assignment.",
    image: "/stock/about-philosophy.jpg",
    paragraphs: [
      "Transforming Africa. Redefining Excellence. The work that proves it is audit, VAT, internal controls, ERP and public financial management, implemented to a standard boards and ministries can inspect.",
      "Every government, organisation and enterprise we serve can raise the quality of statutory reporting, revenue assurance and practical governance. We unlock that performance through disciplined analysis, clear strategy and systems that go live.",
    ],
  },
  missionVision: {
    title: "Corporate Mission & Vision",
    cards: [
      {
        title: "Mission",
        body: "Improve African governance, financial systems and institutions by integrating professional excellence with technological innovation, and putting it to work.",
        icon: "bi-flag",
      },
      {
        title: "Vision",
        body: "Transforming Africa. Redefining Excellence. To be the professional services firm African boards and ministries inspect, trust and call when the work must go live.",
        icon: "bi-eye",
      },
    ],
  },
  coreValues: {
    title: "Core Values",
    items: [
      {
        title: "Integrity",
        body: "We give independent, honest professional opinions and hold client work to the highest ethical standard, regardless of pressure.",
        icon: "bi-star",
      },
      {
        title: "Impact",
        body: "We aim to leave every client stronger than we found them, not just compliant.",
        icon: "bi-hand-thumbs-up",
      },
      {
        title: "Intelligence",
        body: "We apply careful analysis and use technology and data to sharpen our advice.",
        icon: "bi-bar-chart-line",
      },
      {
        title: "African Excellence",
        body: "We are proud of our African roots and hold ourselves to global professional standards.",
        icon: "bi-award",
      },
      {
        title: "Courage",
        body: "We give clients direct, evidence based advice, even when it is not the easy answer.",
        icon: "bi-shield",
      },
      {
        title: "Long Term Thinking",
        body: "We build long term relationships and invest in work that is built to last, not just this quarter's deliverable.",
        icon: "bi-graph-up-arrow",
      },
    ],
  },
  purpose: {
    title: "Our Purpose",
    image: "/stock/about-purpose.jpg",
    text: "Improve African governance, financial systems and institutions by integrating professional excellence with technological innovation, and putting it to work.",
    cta: "Request a Consultation",
    ctaHref: "/contact",
  },
  strategic: {
    title: "Strategic Identity",
    heading: "Four forces reshaping Africa's professional services landscape",
    intro:
      "Bernard Bempong & Associates works at the intersection of four forces now reshaping professional services in Ghana and across Africa.",
    pillars: [
      {
        title: "Digital Governance",
        description:
          "African states are moving public financial management onto data driven systems. We design the controls and implement the shift.",
        image: "/stock/strategy-digital.jpg",
        icon: "bi-hdd-network",
      },
      {
        title: "Integrated Advisory",
        description:
          "Boards require audit, tax, ERP and strategy in one engagement. We deliver that combination with evidence.",
        image: "/stock/strategy-advisory.jpg",
        icon: "bi-layers",
      },
      {
        title: "AI Reform",
        description:
          "Advanced analytics and AI are automating public sector and enterprise systems. We put them into production with control.",
        image: "/stock/strategy-ai.jpg",
        icon: "bi-cpu",
      },
      {
        title: "Fiscal Accountability",
        description:
          "Revenue assurance and compliance rise when infrastructure, internal controls and reporting are built to be inspected. We build those systems.",
        image: "/stock/strategy-fiscal.jpg",
        icon: "bi-bank",
      },
    ],
  },
} as const;
