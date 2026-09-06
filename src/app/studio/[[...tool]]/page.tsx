import { metadata as studioMetadata, viewport } from "next-sanity/studio";
import type { Metadata } from "next";
import Studio from "./Studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Insight Studio | Bernard Bempong & Associates",
};

export { viewport };

export default function StudioPage() {
  return <Studio />;
}
