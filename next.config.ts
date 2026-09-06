import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 72, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/internal-audit",
        destination: "/services/audit",
        permanent: true,
      },
      {
        source: "/services/accounting",
        destination: "/services/advisory",
        permanent: true,
      },
      {
        source: "/services/forensic",
        destination: "/services/audit",
        permanent: true,
      },
      {
        source: "/services/grc",
        destination: "/services/audit",
        permanent: true,
      },
      {
        source: "/services/technology-risk",
        destination: "/services/erp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
