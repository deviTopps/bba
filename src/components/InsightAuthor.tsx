"use client";

import { insightsPage } from "@/data/insights";

export default function InsightAuthor({ author: supplied }: { author?: { name: string; title?: string } }) {
  const author = supplied ? { ...supplied, initials: supplied.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("") } : insightsPage.author;
  return (
    <div className="insight-author">
      <span className="insight-author-mark" aria-hidden="true">
        {author.initials}
      </span>
      <span className="insight-author-copy">
        <span className="insight-author-name">{author.name}</span>
        <span className="insight-author-title">{author.title}</span>
      </span>
    </div>
  );
}
