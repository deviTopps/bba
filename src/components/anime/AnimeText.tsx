"use client";

import { useEffect, useRef, type ElementType } from "react";
import { animate, utils } from "animejs";
import {
  animeDuration,
  animeEase,
  prefersReducedMotion,
  whenVisible,
} from "@/lib/anime";

type AnimeTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  by?: "words" | "chars";
  immediate?: boolean;
  stagger?: number;
  delay?: number;
};

export default function AnimeText({
  text,
  as: Tag = "span",
  className,
  immediate = false,
}: AnimeTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || immediate) return;

    let animation: { revert: () => void } | undefined;

    const play = () => {
      utils.set(node, { opacity: 0, y: 18 });
      animation = animate(node, {
        opacity: 1,
        y: 0,
        duration: animeDuration,
        ease: animeEase,
      });
    };

    const stop = whenVisible(node, play);

    return () => {
      stop();
      animation?.revert();
    };
  }, [immediate, text]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
