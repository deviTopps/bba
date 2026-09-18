import type { Metadata } from "next";
import AssessmentForm from "@/components/AssessmentForm";
import { assessment } from "@/data/assessment";
import "../../contact.css";
import "../../service.css";

export const metadata: Metadata = {
  title: "Tax and Risk Assessment | Bernard Bempong & Associates",
  description: assessment.description,
};

export default async function AssessmentPage({ searchParams }: { searchParams: Promise<{ intent?: string; matter?: string }> }) {
  const { intent, matter } = await searchParams;
  const initialMatter = matter && assessment.options.includes(matter) ? matter : "";
  return (
    <main id="main-content" className="assessment-page">
      <div className="container-advisory">
        <h1>Tax and Risk Assessment</h1>
        <p className="assessment-intro">{assessment.description}</p>
        <AssessmentForm key={`${intent}-${initialMatter}`} speak={intent === "speak"} initialMatter={initialMatter} />
      </div>
    </main>
  );
}
