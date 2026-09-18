import Link from "next/link";

const copy = {
  "general": {
    "headline": "Let Us Discuss Your Business Requirements",
    "description": "Every organisation has different priorities, risks and operating circumstances. Speak with BBA about the matter you need to address, the outcome you expect and the support required. We will review your initial information and recommend an appropriate next step.",
    "primary": "Discuss Your Requirements",
    "secondary": "Explore Our Services"
  },
  "home": {
    "headline": "How Can BBA Support Your Organisation?",
    "description": "Tell us about the financial, operational, regulatory, technology or institutional matter you need to address. We will review your enquiry and connect you with the appropriate BBA service team.",
    "primary": "Contact BBA",
    "secondary": "Request a Proposal"
  }
};

export default function GeneralCallout({ homepage = false }: { homepage?: boolean }) {
  const item = homepage ? copy.home : copy.general;
  return (
    <section className="editorial-callout">
      <div className="container-advisory">
        <h2>{item.headline}</h2>
        <p>{item.description}</p>
        <div className="editorial-actions">
          <Link className="btn-pill btn-pill-gold" href="/contact">{item.primary}</Link>
          <Link className="editorial-secondary" href={homepage ? "/contact?enquiry=Request%20a%20Proposal" : "/services"}>{item.secondary}</Link>
        </div>
      </div>
    </section>
  );
}
