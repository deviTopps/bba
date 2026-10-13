import { insightsPage, insightTopics, getRelatedInsights, type InsightPost } from "./insights";

export async function loadInsightPosts(): Promise<InsightPost[]> {
  const service = process.env.ADMIN_SERVICE_URL;
  if (!service) return insightsPage.posts;
  const response = await fetch(`${service}/api/public/posts`, { cache: "no-store", signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error("Unable to load blog posts");
  const posts = await response.json() as (Omit<InsightPost, "topic"> & { topic: string })[];
  return posts.map(post => ({ ...post, topic: insightTopics.find(topic => topic.slug === post.topic) || insightTopics[0] }));
}
export async function loadInsightPost(slug: string): Promise<InsightPost | null> { return (await loadInsightPosts()).find(post => post.slug === slug) ?? null; }
export async function loadRelatedInsights(slug: string, limit = 3) { return getRelatedInsights(await loadInsightPosts(), slug, limit); }
