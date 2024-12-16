import type { NextConfig } from "next";

const nextConfig: NextConfig = {  experimental: {
  serverComponentsHmrCache: false, // defaults to true
}, images: {remotePatterns: [{protocol: "https", hostname: "theminermag.com"}],
}, typescript: {ignoreBuildErrors: true}, eslint: {ignoreDuringBuilds: true}
  /* config options here */
};

export default nextConfig;
