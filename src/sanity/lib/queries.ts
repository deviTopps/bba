import { groq } from "next-sanity";

export const insightPostsQuery = groq`
  *[_type == "insightPost" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      topic,
      publishedAt,
      image,
      body
    }
`;

export const insightPostBySlugQuery = groq`
  *[_type == "insightPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    title,
    "slug": slug.current,
    excerpt,
    topic,
    publishedAt,
    image,
    body
  }
`;
