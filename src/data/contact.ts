export const contactPage = {
  hero: {
    image: "/stock/about-hero.jpg",
  },
  intro:
    "Reach the firm by email or telephone. We agree priorities and set the path from analysis to implementation.",
  email: "info@bernardbempong.com",
  website: {
    label: "www.bernardbempong.com",
    href: "https://www.bernardbempong.com",
  },
  phones: [
    { label: "+233 597 182 639", href: "tel:+233597182639" },
    { label: "+233 209 983 833", href: "tel:+233209983833" },
    { label: "+233 558 383 979", href: "tel:+233558383979" },
  ],
  form: {
    heading: "Message",
    nameLabel: "Full name",
    emailLabel: "Email",
    organisationLabel: "Organisation",
    messageLabel: "Message",
    serviceLabel: "Service",
    servicePlaceholder: "Select a service",
    submit: "Request a Consultation",
    sending: "Sending",
    sent: "We received your message.",
    fallback: "Send the message from your email client.",
    invalid: "Complete name, email and a message.",
  },
} as const;
