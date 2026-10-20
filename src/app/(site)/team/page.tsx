import type { Metadata } from "next";
import Image from "@/components/SiteImage";
import GeneralCallout from "@/components/GeneralCallout";
import "../../about.css";

export const metadata: Metadata = {
  title: "Our Team | Bernard Bempong & Associates",
  description: "Meet the people behind Bernard Bempong & Associates, including our managing partner and administrative leadership.",
};

const team = [
  { name: "Bernard Bempong", image: "/team/bernard-bempong.jpeg", qualifications: "CA (Ghana), BSc, MBA Finance – In Progress", role: "Managing Partner" },
  { name: "Lois Bempong", image: "/team/lois-bempong.jpeg", qualifications: "BA, MBA, CHIRM-Level III", role: "Executive Director" },
  { name: "Francis Atteh", image: "/team/francis-atteh.jpeg", qualifications: "CA (Ghana), BSc-Accounting, CIA in Progress", role: "Partner" },
  { name: "Latifah Al-Razak", image: "/team/latifa-al-razak.jpeg", qualifications: "ATA/UFTAA Advanced", role: "Executive Assistant" },
];

export default function TeamPage() {
  return (
    <main id="main-content" className="about-page">
      <section className="about-hero">
        <div className="about-hero-media">
          <Image src="/stock/about-hero.jpg" alt="" fill priority className="about-hero-img" sizes="100vw" />
        </div>
        <div className="about-hero-veil" aria-hidden="true" />
        <div className="container-advisory about-hero-inner">
          <h1 className="about-hero-title font-display">Our <span className="about-hero-title-gold">Team</span></h1>
        </div>
      </section>
      <section className="about-team" id="our-team" aria-labelledby="about-team-heading">
        <div className="container-advisory">
          <p className="about-kicker">Our people</p>
          <h2 className="about-heading font-display" id="about-team-heading">Meet Our Team</h2>
          <div className="about-team-grid">
            {team.map((person) => (
              <article className="about-team-card" key={person.name}>
                <div className="about-team-portrait">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 767px) 100vw, 25vw"
                  />
                </div>
                <div className="about-team-details">
                  <h3>{person.name}</h3>
                  <p className="about-team-role">{person.role}</p>
                  {person.qualifications && <p className="about-team-qualifications">{person.qualifications}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GeneralCallout />
    </main>
  );
}
