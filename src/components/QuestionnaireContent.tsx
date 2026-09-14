"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  serviceQuestionnaireTags,
  serviceQuestions,
  statutoryAuditQuestions,
  universalQuestions,
  type QuestionnaireQuestion,
} from "@/data/questionnaire";

type Intake = {
  name: string;
  email: string;
  organisation: string;
  service: string;
  subservices: string[];
  message: string;
  company_website: string;
};

type FormStatus = "idle" | "sending" | "sent" | "fallback" | "invalid";

function readIntake(): Intake | null {
  try {
    const raw = sessionStorage.getItem("bba-questionnaire-intake");
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<Intake>;
    if (typeof value.name !== "string" || typeof value.email !== "string" || typeof value.service !== "string") {
      return null;
    }
    return {
      name: value.name,
      email: value.email,
      organisation: typeof value.organisation === "string" ? value.organisation : "",
      service: value.service,
      subservices: Array.isArray(value.subservices)
        ? value.subservices.filter((item): item is string => typeof item === "string")
        : [],
      message: typeof value.message === "string" ? value.message : "",
      company_website: typeof value.company_website === "string" ? value.company_website : "",
    };
  } catch {
    return null;
  }
}

function renderQuestion(question: QuestionnaireQuestion) {
  if (question.type === "declaration") {
    return (
      <label className="questionnaire-declaration">
        <input type="checkbox" name={question.id} value="Confirmed" required />
        <span>{question.question}</span>
      </label>
    );
  }

  if (question.type === "yesno") {
    return (
      <select name={question.id} defaultValue="" required>
        <option value="" disabled>
          Select an answer
        </option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    );
  }

  return <textarea name={question.id} rows={4} required />;
}

export default function QuestionnaireContent() {
  const router = useRouter();
  const [intake, setIntake] = useState<Intake | null | undefined>(undefined);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const value = readIntake();
    if (!value) {
      router.replace("/contact");
      return;
    }
    setIntake(value);
  }, [router]);

  const conditionalQuestions = useMemo(() => {
    if (!intake) return [];
    const tag = serviceQuestionnaireTags[intake.service];
    const questions = tag ? [...(serviceQuestions[tag] ?? [])] : [];
    if (intake.subservices.includes("External Audit (IFRS & IPSAS)")) {
      questions.push(...statutoryAuditQuestions);
    }
    return questions;
  }, [intake]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!intake) return;
    const data = new FormData(event.currentTarget);
    const questions = [...universalQuestions, ...conditionalQuestions];
    const questionnaire = questions.map((question) => ({
      id: question.id,
      question: question.question,
      answer: String(data.get(question.id) ?? "").trim(),
    }));

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...intake, questionnaire }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (result.ok) {
        sessionStorage.removeItem("bba-questionnaire-intake");
        setStatus("sent");
        return;
      }
      setStatus(result.error === "invalid" ? "invalid" : "fallback");
    } catch {
      setStatus("fallback");
    }
  };

  if (!intake) return null;

  return (
    <main id="main-content" className="questionnaire-page">
      <header className="questionnaire-header">
        <div className="container-advisory questionnaire-header-inner">
          <Link href="/contact" className="questionnaire-header-back" aria-label="Back to contact form">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m14.5 5-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </Link>
          <Image
            src="/brand/BBA.svg"
            alt="Bernard Bempong & Associates"
            width={190}
            height={57}
            className="questionnaire-header-logo"
            priority
          />
        </div>
      </header>
      <section className="questionnaire-panel">
        <div className="container-advisory questionnaire-layout">
          <aside className="questionnaire-summary">
            <p className="questionnaire-summary-label">Selected service</p>
            <p className="questionnaire-summary-service">{intake.service}</p>
            {intake.subservices.length ? (
              <ul>
                {intake.subservices.map((subservice) => (
                  <li key={subservice}>{subservice}</li>
                ))}
              </ul>
            ) : null}
            <Link href="/contact" className="questionnaire-back">
              Change selection
            </Link>
          </aside>

          <form className="questionnaire-form" onSubmit={onSubmit}>
            <section aria-labelledby="questionnaire-all-title">
              <p className="questionnaire-section-label">Part A</p>
              <h2 id="questionnaire-all-title">Information for every prospective client</h2>
              <div className="questionnaire-fields">
                {universalQuestions.map((question) => (
                  <div className="questionnaire-field" key={question.id}>
                    {question.type !== "declaration" ? (
                      <label htmlFor={question.id}>
                        <span>{question.id}</span> {question.question}
                      </label>
                    ) : null}
                    {question.type === "text" ? (
                      <textarea id={question.id} name={question.id} rows={4} required />
                    ) : question.type === "yesno" ? (
                      <select id={question.id} name={question.id} defaultValue="" required>
                        <option value="" disabled>Select an answer</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    ) : (
                      renderQuestion(question)
                    )}
                  </div>
                ))}
              </div>
            </section>

            {conditionalQuestions.length ? (
              <section className="questionnaire-conditional" aria-labelledby="questionnaire-service-title">
                <p className="questionnaire-section-label">Part B</p>
                <h2 id="questionnaire-service-title">Questions for {intake.service}</h2>
                <div className="questionnaire-fields">
                  {conditionalQuestions.map((question) => (
                    <div className="questionnaire-field" key={question.id}>
                      <label htmlFor={question.id}>
                        <span>{question.id}</span> {question.question}
                      </label>
                      {question.type === "yesno" ? (
                        <select id={question.id} name={question.id} defaultValue="" required>
                          <option value="" disabled>Select an answer</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        <textarea id={question.id} name={question.id} rows={4} required />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <button type="submit" className="contact-submit" disabled={status === "sending"}>
              {status === "sending" ? "Submitting…" : "Submit questionnaire"}
            </button>
            {status === "sent" ? <p className="questionnaire-status" role="status">Thank you. Your questionnaire has been submitted.</p> : null}
            {status === "fallback" ? <p className="questionnaire-status" role="alert">We could not submit your questionnaire. Please try again or contact us by email.</p> : null}
            {status === "invalid" ? <p className="questionnaire-status" role="alert">Please complete all required answers before submitting.</p> : null}
          </form>
        </div>
      </section>
    </main>
  );
}
