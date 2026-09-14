import type { Metadata } from "next";
import QuestionnaireContent from "@/components/QuestionnaireContent";
import "../questionnaire.css";

export const metadata: Metadata = {
  title: "Client Questionnaire | Bernard Bempong & Associates",
  description: "Client acceptance and initial fee-scoping questionnaire.",
};

export default function QuestionnairePage() {
  return <QuestionnaireContent />;
}
