import type { Metadata } from "next";
import Link from "next/link";
import { contactPage } from "@/data/contact";
import "../../insight.css";

export const metadata: Metadata = {
  title: "Privacy & Cookies | Bernard Bempong & Associates",
  description:
    "Questions about privacy and cookies at Bernard Bempong & Associates.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <article className="insight-article">
        <header className="insight-article-hero">
          <div className="container-advisory">
            <h1 className="insight-article-title font-display">Privacy & Cookies</h1>
            <p className="insight-article-dek">
              For questions about how this site handles personal information or
              cookies, write to us. We will respond with the facts of the
              request.
            </p>
          </div>
        </header>
        <div className="insight-article-body">
          <div className="container-advisory insight-article-copy">
            <p>
              Email{" "}
              <a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>.
            </p>
            <Link href="/contact" className="insight-article-cta">
              Request a Consultation
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
