import { defineField, defineType } from "sanity";
import { insightTopicSlugs } from "@/sanity/env";

const topicLabels: Record<(typeof insightTopicSlugs)[number], string> = {
  audit: "Audit",
  tax: "Tax",
  advisory: "Advisory",
  "public-sector": "Public sector",
  technology: "Technology",
  data: "Data",
  sustainability: "Sustainability",
};

export const insightPost = defineType({
  name: "insightPost",
  title: "Insight",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: {
        list: insightTopicSlugs.map((slug) => ({
          title: topicLabels[slug],
          value: slug,
        })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      topic: "topic",
      media: "image",
    },
    prepare({ title, topic, media }) {
      return {
        title,
        subtitle: topic ? topicLabels[topic as keyof typeof topicLabels] : "",
        media,
      };
    },
  },
});
