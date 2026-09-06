export type InsightTopic = {
  slug: string;
  label: string;
};

import type { PortableTextBlock } from "@portabletext/types";

export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  topic: InsightTopic;
  publishedAt: string;
  paragraphs: string[];
  body?: PortableTextBlock[];
};

export const insightTopics: InsightTopic[] = [
  { slug: "audit", label: "Audit" },
  { slug: "tax", label: "Tax" },
  { slug: "advisory", label: "Advisory" },
  { slug: "public-sector", label: "Public sector" },
  { slug: "technology", label: "Technology" },
  { slug: "data", label: "Data" },
  { slug: "sustainability", label: "Sustainability" },
];

const topic = (slug: InsightTopic["slug"]) =>
  insightTopics.find((item) => item.slug === slug) as InsightTopic;

export const insightsPage = {
  heading: "Latest insights",
  topicsHeading: "Topics",
  pageSize: 3,
  hero: {
    title: "Insight",
    intro:
      "Analysis from audit, tax, public financial management, ERP and ESG. Written so boards can decide and systems can go live.",
    image: "/stock/about-hero.jpg",
  },
  author: {
    name: "Bernard Bempong",
    title: "Bernard Bempong & Associates",
    initials: "BB",
  },
  posts: [
    {
      slug: "audit-readiness-boards-can-inspect",
      title: "Audit readiness that boards can inspect",
      excerpt:
        "Statutory reporting and internal controls written so investors, boards and regulators have a basis they can inspect, then act on.",
      image: "/stock/audit-readiness.jpg",
      topic: topic("audit"),
      publishedAt: "2026-08-18T08:30:00+00:00",
      paragraphs: [
        "Boards do not need another status report. They need evidence. Audit readiness is the work of making statutory reporting, reconciliations and internal controls inspectable before the auditor arrives.",
        "We apply risk based testing, process understanding and remediation follow up in one programme. Findings connect to owners, dates and the way the organisation actually works.",
        "Close quality, cut off, revenue recognition and inventory existence are not technical footnotes. They are the points where a board either has a basis for decision or it does not.",
        "Internal audit that repeats last year's checklist will miss the risk that moved. Planning follows the business. Testing follows the process. Reporting follows ownership.",
        "The outcome is a finance function that can close, explain and stand up to review. The report is not the end of the assignment.",
      ],
    },
    {
      slug: "gra-vat-positions-that-stand",
      title: "GRA VAT positions that stand up to review",
      excerpt:
        "VAT, corporate tax and GRA compliance designed, documented and implemented so positions survive inspection.",
      image: "/stock/strategy-fiscal.jpg",
      topic: topic("tax"),
      publishedAt: "2026-08-11T09:15:00+00:00",
      paragraphs: [
        "Tax is not a filing calendar. It is a set of positions that GRA, boards and counterparties will test. We design VAT and corporate tax work so the file, the return and the operating process say the same thing.",
        "Documentation, transfer pricing files and dispute readiness sit with day to day compliance. That combination is how Ghanaian enterprises avoid expensive corrections after the fact.",
        "A position that lives only in an advisor's head will fail the first information request. We write the logic, map it to invoices and ledgers, and leave a trail that can be produced.",
        "Revenue mobilisation work for government is the other side of the same discipline. We serve both the taxpayer and the collector with equal seriousness.",
        "We agree the position, implement the process and leave a trail ministries and boards can inspect.",
      ],
    },
    {
      slug: "working-capital-that-goes-live",
      title: "Working capital that goes live",
      excerpt:
        "Inventory, receivables and cash discipline joined to strategy, so growth is executed, not left in a presentation.",
      image: "/stock/strategy-advisory.jpg",
      topic: topic("advisory"),
      publishedAt: "2026-07-28T10:00:00+00:00",
      paragraphs: [
        "Working capital is where strategy either funds itself or stalls. We analyse inventory, receivables, payables and the controls around each, then implement the operating rhythm management will actually run.",
        "ERP and reporting only help when the numbers reconcile to cash. We join advisory to implementation so the model and the ledger agree.",
        "Transaction work, valuation and restructuring sit on the same evidence. If cash cannot be traced, the deal cannot be priced.",
        "Boards can then decide on growth with a documented cash position, not a hope.",
        "The assignment ends when the process is live, owned and inspectable. A slide is not a close.",
      ],
    },
    {
      slug: "public-financial-management-the-public-can-see",
      title: "Public financial management the public can see",
      excerpt:
        "Controls, reporting and practical governance so ministries and agencies become more accountable and deliver results.",
      image: "/stock/about-hero.jpg",
      topic: topic("public-sector"),
      publishedAt: "2026-07-14T08:45:00+00:00",
      paragraphs: [
        "Public financial management is judged by whether money can be traced and whether delivery can be inspected. We apply IPSAS, internal controls and programme oversight to the way Ghanaian institutions actually operate.",
        "Reform that stays in a workshop does not count. We design the control, the report and the operating model, then take the work live.",
        "Procurement, payroll, revenue and project accounting are where public trust is won or lost. We test the process, not the slogan.",
        "Development partners get evidence held to the same standard as any international mandate. Local operating knowledge is not a discount on that standard.",
        "Ministries can inspect. The public sees accountability.",
      ],
    },
    {
      slug: "erp-with-financial-governance",
      title: "ERP with financial governance in the same engagement",
      excerpt:
        "Technology advisory, ERP implementation and cybersecurity joined to the controls finance already owes the board.",
      image: "/stock/strategy-digital.jpg",
      topic: topic("technology"),
      publishedAt: "2026-06-30T11:20:00+00:00",
      paragraphs: [
        "ERP that ignores controls becomes a faster way to post the wrong number. We implement SAP, Oracle and Microsoft Dynamics with access, change and application controls inside the same engagement.",
        "Financial governance depth is the difference between a technology project and a finance function that can close and report.",
        "Access rights, change tickets and master data are board issues. They are not IT housekeeping.",
        "GovTech and IFMIS work follows the same rule. The platform is live when a ministry can inspect who posted, who approved and why the number moved.",
        "The system goes live. Control remains inspectable.",
      ],
    },
    {
      slug: "ai-that-strengthens-control",
      title: "AI that strengthens control",
      excerpt:
        "Data analytics and artificial intelligence applied to exceptions, revenue assurance and decisions boards can trust.",
      image: "/stock/strategy-ai.jpg",
      topic: topic("data"),
      publishedAt: "2026-06-16T09:00:00+00:00",
      paragraphs: [
        "AI is useful when it finds exceptions, not when it decorates a dashboard. We apply analytics to reconciliations, revenue leakage and process behaviour so management acts on a documented basis.",
        "Governance and compliance sit with the model. If the board cannot inspect the logic, it does not go live.",
        "High volume operations need continuous testing. Sampling last month's invoices will not catch the leak that opened this week.",
        "The outcome is faster detection and a finance function that still owns the number.",
        "We implement the analytic, the owner and the follow up. A chart without an owner is not control.",
      ],
    },
    {
      slug: "esg-reporting-boards-can-use",
      title: "ESG reporting boards can use",
      excerpt:
        "Sustainability strategy, green finance and ESG reporting written to a standard boards and funders can inspect.",
      image: "/stock/about-purpose.jpg",
      topic: topic("sustainability"),
      publishedAt: "2026-06-02T08:00:00+00:00",
      paragraphs: [
        "ESG work that cannot be traced is a brochure. We design sustainability strategy, climate risk and reporting so Ghanaian and African institutions can meet funder requirements and board scrutiny.",
        "Green and blended finance access follows evidence. We join professional services rigour to the local operating reality.",
        "Climate, social and governance metrics must reconcile to operations the same way revenue reconciles to cash. If they do not, they will not survive diligence.",
        "Boards get a report they can use. Funders get a file they can inspect.",
        "The work ends when the framework is live, the data has an owner and the next report can be produced without starting from zero.",
      ],
    },
  ] satisfies InsightPost[],
};

export function getInsightPost(posts: InsightPost[], slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedInsights(
  posts: InsightPost[],
  slug: string,
  limit = 3
) {
  const current = getInsightPost(posts, slug);
  if (!current) return [];
  const sameTopic = posts.filter(
    (post) => post.slug !== slug && post.topic.slug === current.topic.slug
  );
  const others = posts.filter(
    (post) => post.slug !== slug && post.topic.slug !== current.topic.slug
  );
  return [...sameTopic, ...others].slice(0, limit);
}

export function formatInsightDateShort(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Accra",
  }).format(new Date(iso));
}

export function formatInsightPublished(iso: string) {
  const date = new Date(iso);
  const day = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Accra",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Africa/Accra",
  }).format(date);
  return `${day}, ${time} GMT`;
}

export function filterInsights(posts: InsightPost[], topicSlug: string | null) {
  const filtered =
    !topicSlug || topicSlug === "all"
      ? posts
      : posts.filter((post) => post.topic.slug === topicSlug);
  return [...filtered].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function paginateInsights(posts: InsightPost[], page: number) {
  const size = insightsPage.pageSize;
  const totalPages = Math.max(1, Math.ceil(posts.length / size));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * size;
  return {
    items: posts.slice(start, start + size),
    page: safePage,
    totalPages,
    total: posts.length,
  };
}
