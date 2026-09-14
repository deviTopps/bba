import { NextResponse } from "next/server";
import { contactPage } from "@/data/contact";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  service?: unknown;
  subservices?: unknown;
  questionnaire?: unknown;
  message?: unknown;
  company_website?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asTextList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
}

type QuestionnaireAnswer = {
  id: string;
  question: string;
  answer: string;
};

function asQuestionnaire(value: unknown): QuestionnaireAnswer[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 40)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const id = asText(row.id).slice(0, 20);
      const question = asText(row.question).slice(0, 500);
      const answer = asText(row.answer).slice(0, 5000);
      return id && question && answer ? { id, question, answer } : null;
    })
    .filter((item): item is QuestionnaireAnswer => item !== null);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactBody | null;
  if (!body) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (asText(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name);
  const email = asText(body.email);
  const organisation = asText(body.organisation);
  const service = asText(body.service);
  const subservices = asTextList(body.subservices);
  const questionnaire = asQuestionnaire(body.questionnaire);
  const message = asText(body.message);

  if (name.length < 2 || !emailPattern.test(email) || message.length < 8) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    organisation ? `Organisation: ${organisation}` : "",
    service ? `Service: ${service}` : "",
    subservices.length ? `Sub-services: ${subservices.join(", ")}` : "",
    questionnaire.length ? "\nQuestionnaire responses:" : "",
    ...questionnaire.flatMap((item) => [
      `${item.id}: ${item.question}`,
      item.answer,
      "",
    ]),
    "",
    message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  try {
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organisation,
          service,
          subservices,
          questionnaire,
          message,
        }),
      });
      if (!response.ok) {
        return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    if (resendKey) {
      const from =
        process.env.CONTACT_FROM_EMAIL ??
        "Bernard Bempong & Associates <onboarding@resend.dev>";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [contactPage.email],
          reply_to: email,
          subject: `Consultation request from ${name}`,
          text,
        }),
      });
      if (!response.ok) {
        return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }
  } catch {
    return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
  }

  return NextResponse.json({ ok: false, fallback: true }, { status: 501 });
}
