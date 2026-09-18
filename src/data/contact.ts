export const contactPage = {
  hero: {
    image: "/stock/about-hero.jpg",
  },
  intro:
    "Please provide the information below to help us prepare for the discussion. Submitting this form does not create a professional engagement. Any engagement will be subject to BBA’s client-acceptance procedures and an agreed engagement letter.",
  email: "info@bernardbempong.com",
  website: {
    label: "www.bba.com.gh",
    href: "https://www.bba.com.gh",
  },
  phones: [
    { label: "+233 209 983 833", href: "tel:+233209983833" },
    { label: "+233 597 182 639", href: "tel:+233597182639" },
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
