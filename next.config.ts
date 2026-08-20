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
  async redirects() {
    return [
      { source: "/services/3cx", destination: "/portfolio/voice", permanent: false },
      { source: "/services/vicidial", destination: "/portfolio", permanent: false },
      { source: "/services/freepbx", destination: "/portfolio", permanent: false },
      { source: "/services/asterisk", destination: "/portfolio", permanent: false },
      { source: "/services/pbx", destination: "/portfolio", permanent: false },
      { source: "/services/voip", destination: "/portfolio/voice", permanent: false },
      { source: "/services/predictive", destination: "/portfolio", permanent: false },
      { source: "/services/autodialer", destination: "/portfolio", permanent: false },
    ];
  },
};

export default nextConfig;
