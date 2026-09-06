import type { PortableTextBlock } from "@portabletext/types";
import type { InsightPost } from "@/data/insights";
import { insightTopics, insightsPage } from "@/data/insights";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { insightPostBySlugQuery, insightPostsQuery } from "@/sanity/lib/queries";

type SanityInsight = {
  title: string;
  slug: string;
  excerpt: string;
  topic: string;
  publishedAt: string;
  image: unknown;
  body: PortableTextBlock[] | null;
};

const fetchOptions = { next: { revalidate: 60, tags: ["insights"] } };

function topicFromSlug(slug: string) {
  return (
    insightTopics.find((item) => item.slug === slug) ?? insightTopics[0]
  );
}

function bodyToParagraphs(body: PortableTextBlock[] | null | undefined) {
  if (!body?.length) return [];
  return body
    .filter((block) => block._type === "block")
    .map((block) =>
      Array.isArray(block.children)
        ? block.children
            .map((child) =>
              typeof child === "object" && child && "text" in child
                ? String(child.text ?? "")
                : ""
            )
            .join("")
        : ""
    )
    .filter(Boolean);
}

function mapSanityPost(doc: SanityInsight): InsightPost | null {
  if (!doc.slug || !doc.title) return null;
  const image = urlForImage(doc.image) || "/stock/about-hero.jpg";
  const paragraphs = bodyToParagraphs(doc.body);
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    image,
    topic: topicFromSlug(doc.topic),
    publishedAt: doc.publishedAt,
    paragraphs,
    body: doc.body ?? undefined,
  };
}

async function fetchSanityPosts() {
  if (!sanityClient) return [];
  const docs = await sanityClient.fetch<SanityInsight[]>(
    insightPostsQuery,
    {},
    fetchOptions
  );
  return (docs ?? [])
    .map(mapSanityPost)
    .filter((post): post is InsightPost => Boolean(post));
}

export async function loadInsightPosts(): Promise<InsightPost[]> {
  const local = insightsPage.posts;
  if (!isSanityConfigured) return local;
  try {
    const remote = await fetchSanityPosts();
    const bySlug = new Map(local.map((post) => [post.slug, post]));
    for (const post of remote) bySlug.set(post.slug, post);
    return [...bySlug.values()].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return local;
  }
}

export async function loadInsightPost(slug: string) {
  const posts = await loadInsightPosts();
  const localMatch = posts.find((post) => post.slug === slug);
  if (!isSanityConfigured || !sanityClient) return localMatch ?? null;
  try {
    const doc = await sanityClient.fetch<SanityInsight | null>(
      insightPostBySlugQuery,
      { slug },
      fetchOptions
    );
    return (doc && mapSanityPost(doc)) || localMatch || null;
  } catch {
    return localMatch ?? null;
  }
}

export async function loadRelatedInsights(slug: string, limit = 3) {
  const posts = await loadInsightPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];
  const sameTopic = posts.filter(
    (post) => post.slug !== slug && post.topic.slug === current.topic.slug
  );
  const others = posts.filter(
    (post) => post.slug !== slug && post.topic.slug !== current.topic.slug
  );
  return [...sameTopic, ...others].slice(0, limit);
}
