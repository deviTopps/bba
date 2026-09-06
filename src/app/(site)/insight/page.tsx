import type { Metadata } from "next";
import { Suspense } from "react";
import InsightContent from "@/components/InsightContent";
import { loadInsightPosts } from "@/sanity/lib/loadInsights";
import "../../insight.css";

export const metadata: Metadata = {
  title: "Insight | Bernard Bempong & Associates",
  description:
    "Audit, tax, public financial management, ERP and ESG writing from Bernard Bempong & Associates.",
};

export const revalidate = 60;

function InsightFallback() {
  return (
    <div className="insight-page" aria-busy="true">
      <div className="container-advisory">
        <div className="route-skeleton route-skeleton-title" />
        <div className="route-skeleton route-skeleton-grid" />
      </div>
    </div>
  );
}

export default async function InsightPage() {
  const posts = await loadInsightPosts();

  return (
    <main id="main-content">
      <Suspense fallback={<InsightFallback />}>
        <InsightContent posts={posts} />
      </Suspense>
    </main>
  );
}
