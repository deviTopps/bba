import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: unknown) {
  if (!builder || !source || typeof source !== "object") return "";
  return builder.image(source).width(1600).quality(75).auto("format").url();
}
