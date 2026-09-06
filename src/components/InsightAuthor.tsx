"use client";

import { insightsPage } from "@/data/insights";

export default function InsightAuthor() {
  const { author } = insightsPage;
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
