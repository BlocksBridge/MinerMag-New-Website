import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { serverComponentsHmrCache: false },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "backend.theminermag.com" },
      { protocol: "https", hostname: "theminermag.com" },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/emails/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
