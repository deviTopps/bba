import localFont from "next/font/local";

/**
 * BBA brand type system from Brand Guideline 2026
 * Trimmed to weights used on the site to keep first-load light for Vercel.
 */

export const elvonGrotesk = localFont({
  src: [
    {
      path: "../BBA - Font/Elvon Grotesk/ElvonGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../BBA - Font/Elvon Grotesk/ElvonGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../BBA - Font/Elvon Grotesk/ElvonGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-elvon",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const aspiraWide = localFont({
  src: [
    {
      path: "../BBA - Font/Aspira Wide/AspiraWide-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../BBA - Font/Aspira Wide/AspiraWide-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-aspira",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const praktika = localFont({
  src: [
    {
      path: "../BBA - Font/Praktika/Fenotype - Praktika Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../BBA - Font/Praktika/Fenotype - Praktika Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../BBA - Font/Praktika/Fenotype - Praktika Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-praktika",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});
