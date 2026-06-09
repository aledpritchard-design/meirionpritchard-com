import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity's image CDN — the hover assets and case-study imagery.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      {
        // Staging (meirionpritchard.assoc.one) is noindexed pre-launch so it
        // never gets crawled or competes with the eventual meirionpritchard.com
        // (D023). At production cutover, make this host-conditional — noindex
        // only the staging subdomain — or drop it for the live domain.
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
