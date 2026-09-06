export const insightTopicSlugs = [
  "audit",
  "tax",
  "advisory",
  "public-sector",
  "technology",
  "data",
  "sustainability",
] as const;

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-25";

export const isSanityConfigured = Boolean(projectId);
