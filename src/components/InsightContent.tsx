"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AnimeReveal from "@/components/anime/AnimeReveal";
import InsightAuthor from "@/components/InsightAuthor";
import type { InsightPost } from "@/data/insights";
import {
  filterInsights,
  formatInsightDateShort,
  insightTopics,
  insightsPage,
  paginateInsights,
} from "@/data/insights";

function PostCard({ post }: { post: InsightPost }) {
  return (
    <Link href={`/insight/${post.slug}`} className="insight-card">
      <div className="insight-card-media">
        <Image
          src={post.image}
          alt=""
          fill
          className="insight-card-img"
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          quality={70}
        />
      </div>
      <div className="insight-card-meta">
        <span className="insight-tag">{post.topic.label}</span>
        <time dateTime={post.publishedAt}>
          {formatInsightDateShort(post.publishedAt)}
        </time>
      </div>
      <h3 className="insight-card-title font-display">{post.title}</h3>
      <p className="insight-card-excerpt">{post.excerpt}</p>
      <InsightAuthor />
    </Link>
  );
}

export default function InsightContent({ posts }: { posts: InsightPost[] }) {
  const { topicsHeading, hero } = insightsPage;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") ?? "all";
  const pageParam = Number(searchParams.get("page") ?? "1");

  const filtered = useMemo(() => filterInsights(posts, topic), [posts, topic]);
  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);
  const { items, page, totalPages } = paginateInsights(rest, pageParam);

  const setQuery = (nextTopic: string, nextPage: number) => {
    const params = new URLSearchParams();
    if (nextTopic !== "all") params.set("topic", nextTopic);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="insight-page">
      <section className="insight-hero">
        <div className="insight-hero-media">
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            className="insight-hero-img"
            sizes="100vw"
            quality={75}
          />
        </div>
        <div className="insight-hero-veil" aria-hidden="true" />
        <AnimeReveal
          className="container-advisory insight-hero-inner"
          immediate
          y={24}
        >
          <h1 className="insight-hero-title font-display">{hero.title}</h1>
          <p className="insight-hero-intro">{hero.intro}</p>
        </AnimeReveal>
      </section>

      <section className="insight-masthead" id="featured">
        <div className="container-advisory">
          <p className="insight-kicker">{insightsPage.heading}</p>
          <div
            className="insight-topic-list"
            aria-label="Filter insights by topic"
          >
            <span className="visually-hidden">{topicsHeading}</span>
            <button
              type="button"
              aria-pressed={topic === "all"}
              className={`insight-topic${topic === "all" ? " is-active" : ""}`}
              onClick={() => setQuery("all", 1)}
            >
              All
            </button>
            {insightTopics.map((item) => (
              <button
                key={item.slug}
                type="button"
                aria-pressed={topic === item.slug}
                className={`insight-topic${topic === item.slug ? " is-active" : ""}`}
                onClick={() => setQuery(item.slug, 1)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {featured && page === 1 ? (
            <Link href={`/insight/${featured.slug}`} className="insight-lead">
              <div className="insight-lead-media">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  className="insight-lead-img"
                  sizes="(max-width: 991px) 100vw, 55vw"
                  quality={75}
                />
              </div>
              <div className="insight-lead-copy">
                <div className="insight-card-meta">
                  <time dateTime={featured.publishedAt}>
                    {formatInsightDateShort(featured.publishedAt)}
                  </time>
                  <span className="insight-tag">{featured.topic.label}</span>
                </div>
                <h2 className="insight-lead-title font-display">{featured.title}</h2>
                <p className="insight-lead-excerpt">{featured.excerpt}</p>
                <InsightAuthor />
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="insight-feed">
        <div className="container-advisory">
          {items.length ? (
            <div className="insight-grid">
              {items.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : !featured ? (
            <p className="insight-empty">No articles in this topic.</p>
          ) : null}

          {totalPages > 1 ? (
            <nav className="insight-pagination" aria-label="Insight pages">
              <button
                type="button"
                className="insight-page-btn"
                disabled={page <= 1}
                onClick={() => setQuery(topic, page - 1)}
              >
                Previous
              </button>
              <ol className="insight-page-list">
                {Array.from({ length: totalPages }, (_, index) => {
                  const number = index + 1;
                  return (
                    <li key={number}>
                      <button
                        type="button"
                        className={`insight-page-num${number === page ? " is-active" : ""}`}
                        aria-current={number === page ? "page" : undefined}
                        onClick={() => setQuery(topic, number)}
                      >
                        {number}
                      </button>
                    </li>
                  );
                })}
              </ol>
              <button
                type="button"
                className="insight-page-btn"
                disabled={page >= totalPages}
                onClick={() => setQuery(topic, page + 1)}
              >
                Next
              </button>
            </nav>
          ) : null}
        </div>
      </section>
    </div>
  );
}
