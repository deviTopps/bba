"use client";

import Preloader from "@/components/Preloader";
import { usePathname } from "next/navigation";

/** First-paint splash only on the home route — keeps soft navigations snappy. */
export default function HomePreloader() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <Preloader />;
}
