import Image from "@/components/SiteImage";
import Link from "next/link";
import { contactPage } from "@/data/contact";
import { siteData } from "@/data/site";

const footerNav = [
  { label: "Our services", href: "/services" },
  { label: "Privacy & Cookies", href: "/privacy" },
  { label: "About Us", href: "/about" },
  { label: "News", href: "/insight" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/#faq" },
] as const;

export default function Footer() {
  const { footer, brand } = siteData;
  const email = contactPage.email;

  return (
    <footer className="site-footer" id="site-footer">
      <div className="container-advisory footer-inner">
        <div className="footer-top">
          <div className="footer-left">
            <Link href="/" className="footer-logo-link" aria-label={brand.name}>
              <Image
                src="/brand/BBA.svg"
                alt={brand.name}
                width={240}
                height={72}
                className="brand-logo brand-logo-footer"
              />
            </Link>
            <p className="footer-tagline">{footer.tagline}</p>
            <div className="footer-contact">
              <a className="footer-email" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>

          <div className="footer-right">
            <nav className="footer-nav" aria-label="Footer">
              {footerNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="footer-nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p className="footer-legal">{footer.legal}</p>
        <section className="footer-disclaimer" aria-labelledby="footer-disclaimer-title">
          <h2 id="footer-disclaimer-title">General Website Disclaimer</h2>
          <p>
            The information on this website is provided for general guidance and
            does not constitute audit, tax, legal, investment or other professional
            advice. The appropriate scope and advice depend on the client’s facts,
            applicable laws and engagement terms. Please contact Bernard Bempong &
            Associates before acting on any matter described on the website.
          </p>
        </section>
      </div>
    </footer>
  );
}
