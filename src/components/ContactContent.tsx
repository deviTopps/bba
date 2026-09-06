"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import AnimeReveal from "@/components/anime/AnimeReveal";
import { IconEnvelope, IconGlobe, IconPhone } from "@/components/icons";
import { contactPage } from "@/data/contact";
import { siteData } from "@/data/site";

const servicesNav = siteData.navigation.find(
  (item) => "megaLinks" in item && item.mega
);
const servicesMega = {
  megaLinks:
    servicesNav && "megaLinks" in servicesNav ? servicesNav.megaLinks : [],
};

type FormStatus = "idle" | "sending" | "sent" | "fallback" | "invalid";

function mailtoUrl(
  to: string,
  name: string,
  fromEmail: string,
  organisation: string,
  service: string,
  message: string
) {
  const lines = [
    `Name: ${name}`,
    `Email: ${fromEmail}`,
    organisation ? `Organisation: ${organisation}` : "",
    service ? `Service: ${service}` : "",
    "",
    message,
  ].filter((line) => line !== "");
  const subject = encodeURIComponent(`Consultation request from ${name}`);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

export default function ContactContent() {
  const { hero, intro, email, website, phones, form } = contactPage;
  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    const name = String(data.get("name") ?? "").trim();
    const fromEmail = String(data.get("email") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const companyWebsite = String(data.get("company_website") ?? "").trim();

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: fromEmail,
          organisation,
          service,
          message,
          company_website: companyWebsite,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        fallback?: boolean;
        error?: string;
      };

      if (result.ok) {
        setStatus("sent");
        formEl.reset();
        return;
      }

      if (result.error === "invalid") {
        setStatus("invalid");
        return;
      }

      setStatus("fallback");
      window.location.href = mailtoUrl(
        email,
        name,
        fromEmail,
        organisation,
        service,
        message
      );
    } catch {
      setStatus("fallback");
      window.location.href = mailtoUrl(
        email,
        name,
        fromEmail,
        organisation,
        service,
        message
      );
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-media">
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            className="contact-hero-img"
            sizes="100vw"
            quality={75}
          />
        </div>
        <div className="contact-hero-veil" aria-hidden="true" />
        <AnimeReveal
          className="container-advisory contact-hero-inner"
          immediate
          y={24}
          stagger={90}
        >
          <h1 className="contact-hero-title font-display">
            Contact <span className="contact-hero-title-gold">Us</span>
          </h1>
          <p className="contact-hero-intro">{intro}</p>
        </AnimeReveal>
      </section>

      <section className="contact-panel" id="details">
        <div className="container-advisory contact-panel-inner">
          <AnimeReveal className="contact-layout" y={28} stagger={80}>
            <div className="contact-list">
              <a className="contact-row" href={`mailto:${email}`}>
                <span className="contact-icon" aria-hidden="true">
                  <IconEnvelope />
                </span>
                <span className="contact-row-copy">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{email}</span>
                </span>
              </a>

              <a
                className="contact-row"
                href={website.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon" aria-hidden="true">
                  <IconGlobe />
                </span>
                <span className="contact-row-copy">
                  <span className="contact-label">Website</span>
                  <span className="contact-value">{website.label}</span>
                </span>
              </a>

              <div className="contact-row contact-row-phones">
                <span className="contact-icon" aria-hidden="true">
                  <IconPhone />
                </span>
                <div className="contact-row-copy">
                  <span className="contact-label">Telephone</span>
                  <ul className="contact-phones">
                    {phones.map((phone) => (
                      <li key={phone.href}>
                        <a href={phone.href}>{phone.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
              <h2 className="contact-form-heading">{form.heading}</h2>

              <label className="contact-honeypot" aria-hidden="true">
                Company website
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
              </label>

              <label className="contact-field">
                <span>{form.nameLabel}</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>

              <label className="contact-field">
                <span>{form.emailLabel}</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>

              <label className="contact-field">
                <span>{form.organisationLabel}</span>
                <input type="text" name="organisation" autoComplete="organization" />
              </label>

              <label className="contact-field">
                <span>{form.serviceLabel}</span>
                <select name="service" defaultValue="">
                  <option value="">{form.servicePlaceholder}</option>
                  {servicesMega.megaLinks.map((item) => (
                    <option key={item.href} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="contact-field">
                <span>{form.messageLabel}</span>
                <textarea name="message" rows={6} required />
              </label>

              <button type="submit" className="contact-submit" disabled={status === "sending"}>
                {status === "sending" ? form.sending : form.submit}
              </button>

              {status === "sent" ? (
                <p className="contact-form-status" role="status">
                  {form.sent}
                </p>
              ) : null}
              {status === "fallback" ? (
                <p className="contact-form-status" role="status">
                  {form.fallback}
                </p>
              ) : null}
              {status === "invalid" ? (
                <p className="contact-form-status" role="alert">
                  {form.invalid}
                </p>
              ) : null}
            </form>
          </AnimeReveal>
        </div>
      </section>
    </div>
  );
}
