import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Audience from "@/components/Audience";
import Positioning from "@/components/Positioning";
import Approach from "@/components/Approach";
import TaglineBanner from "@/components/TaglineBanner";
import FAQ from "@/components/FAQ";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Audience />
      <Positioning />
      <Approach />
      <TaglineBanner />
      <FAQ />
    </main>
  );
}
