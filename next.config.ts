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
      { source: "/services/3cx", destination: "/portfolio/clinic", permanent: false },
      { source: "/services/vicidial", destination: "/portfolio", permanent: false },
      { source: "/services/freepbx", destination: "/portfolio", permanent: false },
      { source: "/services/asterisk", destination: "/portfolio", permanent: false },
      { source: "/services/pbx", destination: "/portfolio", permanent: false },
      { source: "/services/voip", destination: "/portfolio/clinic", permanent: false },
      { source: "/services/predictive", destination: "/portfolio", permanent: false },
      { source: "/services/autodialer", destination: "/portfolio", permanent: false },
      { source: "/portfolio/voice", destination: "/portfolio/clinic", permanent: false },
      { source: "/portfolio/inventory", destination: "/portfolio/food", permanent: false },
      { source: "/portfolio/estates", destination: "/portfolio/property", permanent: false },
      { source: "/portfolio/desk", destination: "/portfolio/learning", permanent: false },
      { source: "/portfolio/book", destination: "/portfolio/clinic", permanent: false },
      { source: "/portfolio/pulse", destination: "/portfolio/finance", permanent: false },
      { source: "/demo/voice", destination: "/demo/clinic", permanent: false },
      { source: "/demo/inventory", destination: "/demo/food", permanent: false },
      { source: "/demo/estates", destination: "/demo/property", permanent: false },
      { source: "/demo/desk", destination: "/demo/learning", permanent: false },
      { source: "/demo/book", destination: "/demo/clinic", permanent: false },
      { source: "/demo/pulse", destination: "/demo/finance", permanent: false },
    ];
  },
};

export default nextConfig;
