import type { MetadataRoute } from "next";

// Staging (meirionpritchard.assoc.one) is fully disallowed pre-launch (D023),
// alongside the X-Robots-Tag: noindex header in next.config.ts. At the
// production cutover to meirionpritchard.com this becomes a normal allow rule.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
