import Image from "@/components/SiteImage";
import { siteData } from "@/data/site";

type TaglineBannerProps = {
  id?: string;
};

export default function TaglineBanner({ id = "brand-voice" }: TaglineBannerProps) {
  const { tagline, taglineLockup } = siteData.brand;

  return (
    <section
      className="tagline-banner"
      id={id}
      aria-label={tagline}
    >
      <div className="tagline-banner-media" aria-hidden="true">
        <Image
          src={taglineLockup.image}
          alt=""
          fill
          className="tagline-banner-img"
          sizes="100vw"
          quality={75}
        />
        <span className="tagline-banner-overlay" />
      </div>

      <div className="tagline-banner-inner">
        <p className="tagline-banner-lockup font-display">
          <span className="tagline-navy">{taglineLockup.line1}</span>
          <span>
            <span className="tagline-navy">{taglineLockup.line2Navy}</span>
            {" "}
            <span className="tagline-gold">{taglineLockup.line2Gold}</span>
          </span>
          <span className="tagline-gold">{taglineLockup.line3}</span>
        </p>
      </div>
    </section>
  );
}
