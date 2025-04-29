import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["recharts", "react-smooth"],
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    }
  },
  output: "standalone",
  productionBrowserSourceMaps: false, // Disable source maps in development
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "inkythuatso.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "img.vietqr.io",
      }
    ],
  },
};
export default nextConfig;
