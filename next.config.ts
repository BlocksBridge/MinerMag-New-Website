import type { NextConfig } from "next";

const nextConfig: NextConfig = {output: 'standalone',
  experimental: { serverComponentsHmrCache: false },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "backend.theminermag.com" },
      { protocol: "https", hostname: "theminermag.com" },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  /* config options here */
};

export default nextConfig;
