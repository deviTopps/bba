import { useEffect } from "react";

export const animeEase = "outCubic";
export const animeDuration = 650;
export const animeStagger = 70;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 40;
}

/** Run once when `el` enters the viewport. If it is already on screen, skip. */
export function whenVisible(el: Element, onEnter: () => void) {
  if (isInViewport(el)) return () => undefined;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      onEnter();
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  observer.observe(el);
  return () => observer.disconnect();
}

export const useIsomorphicLayoutEffect = useEffect;
