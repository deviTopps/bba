import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import "../../contact.css";

export const metadata: Metadata = {
  title: "Contact Us | BBA Advisors",
  description:
    "Email, call or visit BBA Advisors. info@bernardbempong.com",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <ContactContent />
    </main>
  );
}
