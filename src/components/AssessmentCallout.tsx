import Link from "next/link";
import { assessment } from "@/data/assessment";

export default function AssessmentCallout() {
  return (
    <section className="assessment-callout" aria-labelledby="assessment-title">
      <div className="container-advisory">
        <h2 id="assessment-title">{assessment.headline}</h2>
        <p>{assessment.description}</p>
        <div className="assessment-actions">
          <Link className="btn-pill btn-pill-gold" href="/tax-risk-assessment">Arrange an Initial Assessment</Link>
          <Link className="assessment-secondary" href="/tax-risk-assessment?intent=speak">Speak With a BBA Professional</Link>
        </div>
        <p className="assessment-note">{assessment.note}</p>
      </div>
    </section>
  );
}
