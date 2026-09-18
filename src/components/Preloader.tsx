"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MIN_VISIBLE_MS = 180;
const FADE_MS = 280;

/** One-shot home splash; never blocks client-side route changes. */
export default function Preloader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const started = Date.now();
    let hideTimer: number | undefined;
    let removeTimer: number | undefined;
    let readyTimer: number | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - started));
      hideTimer = window.setTimeout(() => {
        setHiding(true);
        removeTimer = window.setTimeout(() => setGone(true), FADE_MS);
      }, wait);
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      finish();
    } else {
      document.addEventListener("DOMContentLoaded", finish, { once: true });
      readyTimer = window.setTimeout(finish, 400);
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", finish);
      if (hideTimer) window.clearTimeout(hideTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
      if (readyTimer) window.clearTimeout(readyTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`page-preloader${hiding ? " is-hiding" : ""}`}
      aria-hidden={hiding}
      role="status"
      aria-label="Loading"
    >
      <div className="page-preloader-inner">
        <Image
          src="/brand/logo-light.png"
          alt="Bernard Bempong & Associates"
          width={220}
          height={64}
          className="brand-logo page-preloader-logo"
          priority
        />
        <p className="page-preloader-tagline">
          Chartered Accountants &amp; Management Consultant
        </p>
        <div className="page-preloader-spinner" aria-hidden="true" />
      </div>
    </div>
  );
}
