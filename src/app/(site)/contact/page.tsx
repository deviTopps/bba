import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import "../../contact.css";

export const metadata: Metadata = {
  title: "Contact Us | Bernard Bempong & Associates",
  description:
    "Email, call or visit Bernard Bempong & Associates. info@bernardbempong.com",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <ContactContent />
    </main>
  );
}
