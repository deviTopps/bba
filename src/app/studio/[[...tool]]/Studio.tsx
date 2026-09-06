"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function Studio() {
  if (!isSanityConfigured) {
    return (
      <div className="container-advisory" style={{ padding: "6rem 1.5rem" }}>
        <h1 className="font-display">Sanity is not connected</h1>
        <p>
          Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to
          .env.local, then restart the app. Open /studio again to write Insight
          posts.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
