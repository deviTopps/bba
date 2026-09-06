import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import "../../about.css";

export const metadata: Metadata = {
  title: "About Us | Bernard Bempong & Associates",
  description:
    "A Ghana-based firm applying international audit, tax and advisory discipline to GRA compliance, public financial management, ERP and internal controls.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <AboutContent />
    </main>
  );
}
