import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components = {
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children: React.ReactNode;
    }) => (
      <a href={value?.href} rel="noreferrer">
        {children}
      </a>
    ),
  },
};

export default function InsightBody({
  paragraphs,
  body,
}: {
  paragraphs: string[];
  body?: PortableTextBlock[];
}) {
  if (body?.length) {
    return <PortableText value={body} components={components} />;
  }

  return paragraphs.map((paragraph) => (
    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
  ));
}
