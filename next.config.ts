import type { NextConfig } from "next";

const nextConfig: NextConfig = {  experimental: {
  serverComponentsHmrCache: false, // defaults to true
}, images: {remotePatterns: [{protocol: "https", hostname: "theminermag.com"}],
}
  /* config options here */
};

export default nextConfig;
