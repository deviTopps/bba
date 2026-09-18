export type ServiceSpecRow = {
  label: string;
  body?: string;
  items?: { label: string; icon: string }[];
};

export type ServicePage = {
  slug: string;
  title: string;
  titlePrefix?: string;
  lead: string;
  image: string;
  description: string;
  name?: string;
  spec?: ServiceSpecRow[];
  detail?: {
    need: { heading: string; items: { label: string; icon: string }[] };
    capabilities: { heading: string; items: { label: string; icon: string }[] };
    philosophy: { heading: string; body: string; image: string };
    actions: {
      heading: string;
      body: string;
      image: string;
      items: { label: string; href: string }[];
    };
    related: {
      services: { label: string; href: string }[];
      industries: string[];
      professionals: string[];
    };
  };
};

export const servicePages: ServicePage[] = [
  {
    slug: "audit",
    title: "Audit, Assurance & Risk Management",
    titlePrefix: "Audit, Assurance &",
    description:
      "To provide independent assurance that enhances confidence in financial information, supports the assessment of internal controls, and helps organisations identify and manage risk.",
    lead: "To provide independent assurance that enhances confidence in financial information, supports the assessment of internal controls, and helps organisations identify and manage risk.",
    image: "/stock/about-intro.jpg",
    spec: [
      {
        label: "Purpose",
        body: "To provide independent assurance that enhances confidence in financial information, supports the assessment of internal controls, and helps organisations identify and manage risk.",
      },
      {
        label: "Core Services",
        items: [
          { label: "External Audit (IFRS & IPSAS)", icon: "bi-file-earmark-check" },
          { label: "Internal Audit", icon: "bi-shield-check" },
          { label: "Public Sector Audit", icon: "bi-building" },
          { label: "IT Audit", icon: "bi-laptop" },
          { label: "Forensic Audit", icon: "bi-search" },
          { label: "Compliance Audit", icon: "bi-clipboard-check" },
          { label: "Performance Audit", icon: "bi-graph-up" },
          { label: "Value for Money Audit", icon: "bi-cash-stack" },
          { label: "Special Purpose Audit", icon: "bi-bullseye" },
          { label: "Risk Assessment & Management", icon: "bi-exclamation-triangle" },
          { label: "Internal Control Design & Review", icon: "bi-sliders" },
          { label: "Regulatory Compliance", icon: "bi-bank" },
          { label: "Anti Money Laundering (AML) & Financial Crime Advisory", icon: "bi-shield-lock" },
          { label: "Governance Review", icon: "bi-diagram-3" },
        ],
      },
      {
        label: "Competitive Advantage",
        body: "We bring together external audit, IFRS and IPSAS expertise, IT audit and forensic investigation capabilities through a coordinated, multidisciplinary team.",
      },
    ],
  },
  {
    slug: "tax",
    title: "Tax & Revenue Advisory",
    titlePrefix: "Tax &",
    description:
      "To optimise client tax positions, ensure compliance, design revenue mobilisation strategies and support governments in maximising domestic resource mobilisation.",
    lead: "To optimise client tax positions, ensure compliance, design revenue mobilisation strategies and support governments in maximising domestic resource mobilisation.",
    image: "/stock/strategy-fiscal.jpg",
    spec: [
      {
        label: "Purpose",
        body: "To optimise client tax positions, ensure compliance, design revenue mobilisation strategies and support governments in maximising domestic resource mobilisation.",
      },
      {
        label: "Core Services",
        items: [
          { label: "Corporate Tax Planning & Compliance", icon: "bi-building" },
          { label: "Tax Forecasting & Planning", icon: "bi-graph-up-arrow" },
          { label: "Personal Income Tax", icon: "bi-person" },
          { label: "Value Added Tax (VAT)", icon: "bi-receipt" },
          { label: "Transfer Pricing Advisory & Documentation", icon: "bi-arrow-left-right" },
          { label: "International Tax", icon: "bi-globe" },
          { label: "Tax Dispute Resolution", icon: "bi-hammer" },
          { label: "Tax Due Diligence", icon: "bi-search" },
          { label: "Revenue Assurance", icon: "bi-cash-stack" },
          { label: "Domestic Revenue Mobilisation", icon: "bi-bar-chart-line" },
          { label: "Property Mobilisation", icon: "bi-house" },
          { label: "Customs & Trade Advisory", icon: "bi-truck" },
          { label: "Tax Policy Design", icon: "bi-journal-text" },
          { label: "Tax System Reform", icon: "bi-gear" },
        ],
      },
      {
        label: "Competitive Advantage",
        body: "Unique combination of private sector tax optimisation and government revenue mobilisation expertise. We serve both sides of the tax relationship with equal depth.",
      },
    ],
  },
  {
    slug: "advisory",
    title: "Financial Advisory & Transaction Services",
    titlePrefix: "Financial Advisory &",
    description:
      "To advise clients on complex financial transactions, capital decisions, business valuation, restructuring and investment strategy.",
    lead: "To advise clients on complex financial transactions, capital decisions, business valuation, restructuring and investment strategy.",
    image: "/stock/strategy-advisory.jpg",
    spec: [
      {
        label: "Purpose",
        body: "To advise clients on complex financial transactions, capital decisions, business valuation, restructuring and investment strategy.",
      },
      {
        label: "Core Services",
        items: [
          { label: "Transaction Advisory (M&A)", icon: "bi-arrow-left-right" },
          { label: "Business Valuation", icon: "bi-graph-up" },
          { label: "Financial Due Diligence", icon: "bi-search" },
          { label: "Corporate Finance", icon: "bi-building" },
          { label: "Debt Advisory & Restructuring", icon: "bi-bank" },
          { label: "Public Private Partnership (PPP) Advisory", icon: "bi-people" },
          { label: "Privatisation & Divestiture Advisory", icon: "bi-briefcase" },
          { label: "Investment Structuring", icon: "bi-diagram-3" },
          { label: "Project Finance", icon: "bi-kanban" },
          { label: "Financial Modelling", icon: "bi-calculator" },
          { label: "Capital Markets Advisory", icon: "bi-bar-chart-line" },
          { label: "Insolvency & Business Recovery", icon: "bi-arrow-repeat" },
        ],
      },
      {
        label: "Competitive Advantage",
        body: "Deep African transaction experience combined with international deal making standards. The right partner for cross border African transactions and public sector deal structuring.",
      },
    ],
  },
  {
    slug: "erp",
    title: "Technology & Digital Transformation",
    titlePrefix: "Technology &",
    description:
      "To lead the digital transformation of African institutions through strategic technology advisory, ERP implementation, cybersecurity and digital platform development.",
    lead: "To lead the digital transformation of African institutions through strategic technology advisory, ERP implementation, cybersecurity and digital platform development.",
    image: "/stock/strategy-digital.jpg",
    spec: [
      {
        label: "Purpose",
        body: "To lead the digital transformation of African institutions through strategic technology advisory, ERP implementation, cybersecurity and digital platform development.",
      },
      {
        label: "Core Services",
        items: [
          { label: "Digital Transformation Strategy", icon: "bi-compass" },
          { label: "ERP Implementation & Optimisation (SAP, Oracle, Microsoft Dynamics)", icon: "bi-hdd-network" },
          { label: "Government Technology (GovTech)", icon: "bi-building" },
          { label: "E Government Solutions", icon: "bi-window" },
          { label: "Cybersecurity Strategy & Implementation", icon: "bi-shield-lock" },
          { label: "Cloud Migration Advisory", icon: "bi-cloud" },
          { label: "IT Governance (COBIT)", icon: "bi-sliders" },
          { label: "ICT4D (Technology for Development)", icon: "bi-globe" },
          { label: "Digital Identity & eKYC Systems", icon: "bi-fingerprint" },
          { label: "Integrated Financial Management Information Systems (IFMIS)", icon: "bi-cash-stack" },
          { label: "IT Project Management", icon: "bi-kanban" },
          { label: "Technology Procurement Advisory", icon: "bi-cart-check" },
          { label: "Digital Infrastructure Assessment", icon: "bi-diagram-3" },
        ],
      },
      {
        label: "Competitive Advantage",
        body: "Unlike pure technology firms, we bring financial governance depth and regulatory expertise to every digital transformation engagement, ensuring that technology investments are both technically sound and financially accountable.",
      },
    ],
  },
  {
    slug: "data-analytics",
    title: "Artificial Intelligence & Data Analytics",
    titlePrefix: "Artificial Intelligence &",
    description:
      "To harness the power of artificial intelligence and data analytics to transform decision making, improve governance, and create competitive advantage for African institutions.",
    lead: "To harness the power of artificial intelligence and data analytics to transform decision making, improve governance, and create competitive advantage for African institutions.",
    image: "/stock/strategy-ai.jpg",
    spec: [
      {
        label: "Purpose",
        body: "To harness the power of artificial intelligence and data analytics to transform decision making, improve governance, and create competitive advantage for African institutions.",
      },
      {
        label: "Core Services",
        items: [
          { label: "AI Strategy & Governance", icon: "bi-cpu" },
          { label: "Machine Learning Model Development", icon: "bi-robot" },
          { label: "Predictive Analytics", icon: "bi-graph-up-arrow" },
          { label: "Revenue Intelligence & Fraud Detection", icon: "bi-shield-exclamation" },
          { label: "Financial Data Analytics", icon: "bi-bar-chart-line" },
          { label: "Data Architecture & Governance", icon: "bi-database" },
          { label: "Business Intelligence (BI) Implementation", icon: "bi-pie-chart" },
          { label: "Natural Language Processing (NLP)", icon: "bi-chat-dots" },
          { label: "Ethics & Responsible AI Advisory", icon: "bi-heart" },
          { label: "Data Privacy & Compliance (GDPR, NDPA)", icon: "bi-lock" },
          { label: "AI Audit & Assurance", icon: "bi-clipboard-check" },
          { label: "Decision Intelligence", icon: "bi-lightbulb" },
          { label: "Performance Analytics Dashboards", icon: "bi-speedometer2" },
        ],
      },
      {
        label: "Competitive Advantage",
        body: "Africa's first professional services firm with a dedicated AI & Data Analytics practice, integrating AI innovation with financial governance rigour and compliance expertise.",
      },
    ],
  },
  {
    slug: "public-sector",
    title: "Management Consulting & Institutional Reform",
    titlePrefix: "Management Consulting &",
    description:
      "To help organisations navigate change by designing and implementing effective strategies, operating models, governance improvements and institutional reforms.",
    lead: "To help organisations navigate change by designing and implementing effective strategies, operating models, governance improvements and institutional reforms.",
    image: "/stock/about-hero.jpg",
    spec: [
      {
        label: "Purpose",
        body: "To help organisations navigate change by designing and implementing effective strategies, operating models, governance improvements and institutional reforms.",
      },
      {
        label: "Core Services",
        items: [
          { label: "Strategic Planning", icon: "bi-signpost-split" },
          { label: "Organisational Design & Restructuring", icon: "bi-diagram-3" },
          { label: "Change Management", icon: "bi-arrow-repeat" },
          { label: "Business Process Optimisation", icon: "bi-gear" },
          { label: "Human Capital Advisory", icon: "bi-person-vcard" },
          { label: "Performance Management Systems", icon: "bi-speedometer2" },
          { label: "Institutional Capacity Building", icon: "bi-people" },
          { label: "Public Financial Management (PFM) Reform", icon: "bi-bank" },
          { label: "Procurement Reform", icon: "bi-cart-check" },
          { label: "Regulatory Reform", icon: "bi-journal-check" },
          { label: "Public Sector Modernisation", icon: "bi-building" },
          { label: "Civil Service Reform", icon: "bi-person-workspace" },
          { label: "Policy Development & Analysis", icon: "bi-file-earmark-text" },
        ],
      },
      {
        label: "Competitive Advantage",
        body: "We combine transformation expertise with practical institutional insight to help leadership teams translate strategy into operational improvements and strengthen internal capabilities.",
      },
    ],
  },
  {
    slug: "sustainability",
    title: "Sustainability, ESG & Development Finance",
    titlePrefix: "Sustainability, ESG &",
    description:
      "To support clients in designing and implementing sustainability strategies, accessing green and blended finance, and meeting growing ESG reporting requirements.",
    lead: "To support clients in designing and implementing sustainability strategies, accessing green and blended finance, and meeting growing ESG reporting requirements.",
    image: "/stock/about-purpose.jpg",
    spec: [
      {
        label: "Purpose",
        body: "To support clients in designing and implementing sustainability strategies, accessing green and blended finance, and meeting growing ESG reporting requirements.",
      },
      {
        label: "Core Services",
        items: [
          { label: "ESG Strategy & Framework Design", icon: "bi-diagram-3" },
          { label: "Sustainability Reporting (GRI, SASB, TCFD, IFRS S1/S2)", icon: "bi-file-earmark-bar-graph" },
          { label: "Green Finance Advisory", icon: "bi-leaf" },
          { label: "Climate Risk Assessment", icon: "bi-cloud-sun" },
          { label: "Social Impact Measurement", icon: "bi-people" },
          { label: "SDG Alignment", icon: "bi-globe" },
          { label: "Development Finance Access", icon: "bi-bank" },
          { label: "Carbon Accounting", icon: "bi-calculator" },
          { label: "Responsible Investment Advisory", icon: "bi-graph-up" },
          { label: "Stakeholder Engagement", icon: "bi-chat-dots" },
          { label: "ESG Due Diligence", icon: "bi-search" },
          { label: "Impact Investment Readiness", icon: "bi-clipboard-check" },
        ],
      },
      {
        label: "Competitive Advantage",
        body: "We combine credible professional services rigour with deep knowledge of Africa's sustainability landscape and development finance architecture, giving clients advice both globally benchmarked and locally actionable.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((item) => item.slug === slug);
}
