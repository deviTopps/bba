"use client";

import { useState, type FormEvent } from "react";
import { assessment } from "@/data/assessment";
import { contactPage } from "@/data/contact";
import EnquiryNotice from "@/components/EnquiryNotice";

export default function AssessmentForm({ speak, initialMatter = "" }: { speak: boolean; initialMatter?: string }) {
  const [status, setStatus] = useState("idle");
  const [fallback, setFallback] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const matter = String(data.get("matter") ?? "").trim();
    const service = speak ? "Tax and Risk Assessment — Speak With a BBA Professional" : "Tax and Risk Assessment — Initial Assessment";
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || message.length < 8) { setStatus("invalid"); return; }
    const text = `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation}\nRequest: ${service}\nService: ${matter}\n\n${message}`;
    setFallback(`mailto:${contactPage.email}?subject=${encodeURIComponent(service)}&body=${encodeURIComponent(text)}`);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organisation, service, subservices: [matter], message, company_website: data.get("company_website") }),
      });
      const result = await response.json();
      if (response.ok && result.ok) { setStatus("sent"); form.reset(); }
      else { setStatus(result.error === "invalid" ? "invalid" : "error"); }
    } catch { setStatus("error"); }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <h2>{speak ? "Speak With a BBA Professional" : "Arrange an Initial Assessment"}</h2>
      <label className="contact-honeypot" aria-hidden="true">Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      <label className="contact-field">Full name<input name="name" autoComplete="name" minLength={2} required /></label>
      <label className="contact-field">Email<input name="email" type="email" autoComplete="email" required /></label>
      <label className="contact-field">Organisation<input name="organisation" autoComplete="organization" /></label>
      <label className="contact-field">Service required
        <select name="matter" defaultValue={initialMatter} required>
          <option value="" disabled>Select a tax or risk matter</option>
          {assessment.options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="contact-field">Tell us about the matter and any deadlines<textarea name="message" minLength={8} rows={5} required /></label>
      <p className="assessment-note">{assessment.note}</p>
      <EnquiryNotice />
      <button className="contact-submit" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending…" : "Submit Assessment Request"}</button>
      {status === "sent" && <p role="status">Thank you. BBA has received your request and will contact you about the next steps.</p>}
      {status === "invalid" && <p role="alert">Please enter your name, a valid email and at least eight characters describing the matter.</p>}
      {status === "error" && <p role="alert">Your request has not been sent. Please try again or <a href={fallback}>send your request by email</a>.</p>}
    </form>
  );
}
