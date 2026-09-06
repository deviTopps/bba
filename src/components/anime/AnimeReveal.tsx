"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, stagger, utils } from "animejs";
import {
  animeDuration,
  animeEase,
  animeStagger,
  prefersReducedMotion,
  whenVisible,
} from "@/lib/anime";

type AnimeRevealProps = {
  children: ReactNode;
  as?: "div" | "ul" | "ol" | "section" | "footer" | "header";
  className?: string;
  id?: string;
  selector?: string;
  stagger?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  immediate?: boolean;
  ariaLabel?: string;
};

export default function AnimeReveal({
  children,
  as = "div",
  className,
  id,
  selector = ":scope > *",
  stagger: staggerMs = animeStagger,
  y = 24,
  x = 0,
  scale,
  duration = animeDuration,
  immediate = false,
  ariaLabel,
}: AnimeRevealProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;

    if (immediate) return;

    let animation: { revert: () => void } | undefined;

    const play = () => {
      utils.set(targets, {
        opacity: 0,
        y,
        ...(x ? { x } : {}),
        ...(scale === undefined ? {} : { scale }),
      });

      animation = animate(targets, {
        opacity: 1,
        y: 0,
        ...(x ? { x: 0 } : {}),
        ...(scale === undefined ? {} : { scale: 1 }),
        duration,
        delay: stagger(staggerMs),
        ease: animeEase,
      });
    };

    const stop = whenVisible(root, play);

    return () => {
      stop();
      animation?.revert();
    };
  }, [duration, immediate, scale, selector, staggerMs, x, y]);

  const Tag = as;

  return (
    <Tag
      ref={rootRef as React.Ref<never>}
      className={className}
      id={id}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
