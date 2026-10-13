import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InsightAuthor from "@/components/InsightAuthor";
import InsightBody from "@/components/InsightBody";
import {
  formatInsightDateShort,
  formatInsightPublished,
} from "@/data/insights";
import {
  loadInsightPost,
  loadInsightPosts,
  loadRelatedInsights,
} from "@/data/loadInsights";
import "../../../insight.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await loadInsightPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadInsightPost(slug);
  if (!post) {
    return { title: "Insight | Bernard Bempong & Associates" };
  }
  return {
    title: `${post.seoTitle || post.title} | Bernard Bempong & Associates`,
    description: post.seoDescription || post.excerpt,
    openGraph: { title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, type: "article", images: [post.image] },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await loadInsightPost(slug);
  if (!post) notFound();
  const related = await loadRelatedInsights(slug);

  return (
    <main id="main-content">
      <article className="insight-article">
        <header className="insight-article-hero">
          <div className="container-advisory">
            <div className="insight-card-meta insight-article-meta">
              <span className="insight-tag">{post.topic.label}</span>
              <time dateTime={post.publishedAt}>
                {formatInsightPublished(post.publishedAt)}
              </time>
            </div>
            <h1 className="insight-article-title font-display">{post.title}</h1>
            <p className="insight-article-dek">{post.excerpt}</p>
            <InsightAuthor author={post.author} />
          </div>
        </header>
        <div className="insight-article-media-wrap">
          <div className="container-advisory">
            <div className="insight-article-media">
              <Image
                src={post.image}
                alt={post.imageAlt || ""}
                fill
                className="insight-article-img"
                sizes="(max-width: 991px) 100vw, 1280px"
                quality={75}
                priority
              />
            </div>
          </div>
        </div>
        <div className="insight-article-body">
          <div className="container-advisory insight-article-copy">
            <InsightBody paragraphs={post.paragraphs} />
            <Link href="/contact" className="insight-article-cta">
              Request a Consultation
            </Link>
          </div>
        </div>
        {related.length ? (
          <section className="insight-related" aria-labelledby="related-title">
            <div className="container-advisory">
              <h2 id="related-title" className="insight-related-heading font-display">
                More insights
              </h2>
              <div className="insight-grid">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/insight/${item.slug}`}
                    className="insight-card"
                  >
                    <div className="insight-card-media">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="insight-card-img"
                        sizes="(max-width: 767px) 100vw, 33vw"
                        quality={70}
                      />
                    </div>
                    <div className="insight-card-meta">
                      <span className="insight-tag">{item.topic.label}</span>
                      <time dateTime={item.publishedAt}>
                        {formatInsightDateShort(item.publishedAt)}
                      </time>
                    </div>
                    <h3 className="insight-card-title font-display">{item.title}</h3>
                    <p className="insight-card-excerpt">{item.excerpt}</p>
                    <InsightAuthor author={item.author} />
                  </Link>
                ))}
              </div>
              <Link href="/insight" className="insight-article-back">
                All insights
              </Link>
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
