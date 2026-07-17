import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rolanautomation.com",
      },
      {
        protocol: "https",
        hostname: "www.rolanautomation.com",
      },
    ],
  },
};

export default nextConfig;
