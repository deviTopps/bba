export type InsightTopic = {
  slug: string;
  label: string;
};



export type InsightPost = {
  author?: { name: string; title?: string };
  imageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  topic: InsightTopic;
  publishedAt: string;
  paragraphs: string[];
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
    title: "BBA Advisors",
    initials: "BB",
  },
  posts: [
    {
      slug: "beyond-professional-certification",
      title:
        "Beyond Professional Certification: Ethical Leadership, Sustainability and the Future of Business Excellence in Ghana",
      seoTitle:
        "Beyond Professional Certification: ESG, Ethical Leadership and Ghana's Business Future",
      seoDescription:
        "Bernard Bempong reflects on his ESG Reporting certification at the GAFM October 2026 graduation and the role of ethical leadership in sustainable business.",
      excerpt:
        "Reflections from the GAFM October 2026 graduation on ESG reporting, ethical leadership and turning professional knowledge into lasting value for Ghanaian organisations.",
      image: "/stock/gafm-esg-graduation.png",
      imageAlt:
        "Bernard Bempong and fellow graduates at the GAFM October 2026 graduation ceremony",
      topic: topic("sustainability"),
      publishedAt: "2026-10-30T08:30:00+00:00",
      author: {
        name: "Bernard Bempong, CA",
        title: "Managing Partner, BBA Advisors",
      },
      paragraphs: [
        "On 30 October 2026, I joined fellow graduates of the Global Academy of Finance and Management (GAFM), Class of October 2026, to celebrate an important milestone in our professional development. For me, the occasion marked the completion of my professional certification in Environmental, Social and Governance (ESG) Reporting and an opportunity to reflect on the broader purpose of professional education.",
        "A central message from the graduation ceremony was that certification should represent more than personal achievement. It should strengthen our capacity to solve problems, improve institutions, uphold ethical standards and contribute meaningfully to society. As a Chartered Accountant and business advisor, I consider this especially relevant to Ghanaian organisations seeking to connect financial performance with sound governance and long-term sustainability.",
        "The ultimate measure of professional certification is not the qualification itself, but the value created through the knowledge acquired.",
        "1. Professional Certification Must Translate into Practical Business Value",
        "Professional qualifications build technical competence, credibility and confidence. Yet qualifications alone do not guarantee organisational effectiveness. The challenge is to translate knowledge into measurable improvements in business performance.",
        "For accountants, auditors and advisors, this means moving beyond financial statement preparation and statutory compliance to helping organisations strengthen controls, improve resource utilisation, manage risks and make informed decisions. An accountant who prepares accurate reports but cannot help management understand cash flow, accountability or operational inefficiencies may not be realising the full value of that expertise.",
        "Professional development should therefore be judged not only by what we learn but also by the improvements we help organisations achieve.",
        "2. ESG Reporting: Expanding the Professional Mandate",
        "My certification in ESG Reporting has reinforced the importance of sustainability considerations in financial management, governance and strategy. Revenue, profitability, liquidity and return on investment remain vital indicators, but they do not always capture an organisation's longer-term risks and resilience.",
        "Environmental considerations include energy efficiency, waste management, resource use and climate-related exposure. Social considerations include employee welfare, health and safety, labour practices and community relationships. Governance considerations include board effectiveness, ethical conduct, internal controls, transparency and risk management. These issues may influence costs, financing, continuity and stakeholder confidence.",
        "For accountants and advisors, ESG reporting calls for competence in sustainability information, data controls, reporting processes and assurance readiness. IFRS S1 and IFRS S2, issued by the International Sustainability Standards Board, provide a framework for disclosing sustainability-related financial information useful to investors and other providers of capital. Their application must be assessed against applicable jurisdictional requirements and each organisation's circumstances.",
        "For Ghanaian businesses, especially SMEs, the priority should be practical, proportionate sustainability practices that improve decisions—not simply the production of another report.",
        "3. Ethical Leadership Is the Foundation of Sustainable Business",
        "The graduation message on professional integrity deserves particular attention. Sustainable success depends on trust, accountability and responsible leadership. Strong short-term earnings cannot compensate indefinitely for weak governance or ineffective controls.",
        "Accountants and advisors influence decisions made by management, boards, investors and regulators. Their responsibilities therefore extend beyond technical accuracy to integrity, objectivity, professional competence, confidentiality and appropriate professional behaviour. Ethical leadership requires us to question doubtful practices, communicate risks clearly and exercise independent judgment.",
        "Sustainability cannot be achieved through reporting alone. It must be supported by ethical leadership, effective governance and responsible decisions.",
        "4. Ghana Needs Professionals Who Strengthen Institutions",
        "Ghana faces continuing challenges in productivity, institutional efficiency, resource management and accountability. Meeting them requires more than impressive credentials; it requires professionals willing to improve systems and implement practical solutions.",
        "In business, that may mean better financial management, operational efficiency, appropriate technology and resilient business models. In public institutions, it may mean stronger internal controls, improved resource utilisation and better service delivery. Assurance, risk management, digital transformation and sustainability reporting all have roles to play.",
        "After professional training, something should improve in our workplaces. Colleagues should see better work, clients should receive stronger advice, organisations should become more accountable, and society should benefit from our contribution.",
        "5. Integrating ESG into Business Advisory: The BBA Advisors Perspective",
        "At BBA Advisors, our work is directed towards stronger governance, improved financial performance, effective risk management and sustainable growth. My ESG Reporting certification adds another dimension to that commitment.",
        "We aim to support clients in integrating material ESG matters into governance and strategy; improving sustainability data and internal controls; assessing environmental, social and governance risks alongside financial risks; developing suitable reporting processes; and preparing for appropriate review or independent assurance.",
        "We also seek to connect sustainability initiatives to operational and financial outcomes. Depending on the business, improved energy efficiency, resource management, workforce practices and governance can contribute to cost discipline, resilience and long-term value. Our approach must remain proportionate to each client's size, sector, risks and resources.",
        "6. Lifelong Learning Is a Professional Responsibility",
        "Graduation is a milestone, not the end of learning. Technology, regulation, sustainability expectations and stakeholder demands continue to evolve. Financial reporting, taxation and auditing remain foundational, but professionals increasingly need to understand sustainability, analytics, artificial intelligence, cybersecurity, enterprise risk and digital transformation.",
        "These disciplines overlap. Credible ESG reporting, for example, may require financial materiality assessment, data governance, internal controls, information systems and assurance methodologies. Lifelong learning is essential to remaining relevant and providing integrated solutions.",
        "7. From Individual Achievement to Collective Progress",
        "The value of certification should extend beyond individual careers. It should be reflected in stronger institutions, better-managed businesses, responsible leadership and improved economic outcomes.",
        "We should ask not only how a qualification advances our careers, but how it helps us solve problems and create opportunities. Rather than counting credentials alone, we should consider the changes our knowledge makes possible. Ghana's development depends in part on professionals turning expertise into productive action.",
        "Conclusion: Let Our Knowledge Make a Difference",
        "My participation in the October 2026 graduation ceremony and completion of the ESG Reporting certification mark another meaningful stage in my professional journey. I am grateful to the leadership, faculty and programme coordinators of GAFM and the International Certification Center, and I congratulate my fellow graduates.",
        "Our collective responsibility is to uphold integrity, keep learning, strengthen the organisations we serve and contribute to national development. Through BBA Advisors, I look forward to applying ESG knowledge alongside accounting, assurance, risk management and business advisory experience to support better governance, accountability and sustainable value.",
        "Professional certification may strengthen our credentials, but the application of knowledge strengthens businesses, transforms institutions and advances society.",
        "Congratulations to the GAFM Class of October 2026. God bless our professional institutions, and God bless our homeland Ghana.",
      ],
    },
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
