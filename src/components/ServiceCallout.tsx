import Link from "next/link";
import { serviceCallsToAction } from "@/data/editorial";

export default function ServiceCallout({ slug }: { slug: string }) {
  const copy = serviceCallsToAction.find((item) => item.slug === slug);
  if (!copy) return null;
  const secondaryHref = slug === "tax" ? "/tax-risk-assessment?matter=Annual%20Tax%20Health%20Check" : slug === "audit" ? "/tax-risk-assessment" : `/contact?enquiry=${encodeURIComponent(copy.secondary)}`;
  return (
    <section className="assessment-callout" aria-labelledby={`service-cta-${slug}`}>
      <div className="container-advisory">
        <p className="subservice-kicker">{copy.label}</p>
        <h2 id={`service-cta-${slug}`}>{copy.headline}</h2>
        <p>{copy.description}</p>
        <div className="assessment-actions">
          <Link href={`/contact?enquiry=${encodeURIComponent(copy.primary)}`} className="btn-pill btn-pill-gold">{copy.primary}</Link>
          <Link href={secondaryHref} className="assessment-secondary">{copy.secondary}</Link>
        </div>
      </div>
    </section>
  );
}
