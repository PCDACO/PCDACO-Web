import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["recharts", "react-smooth"],
  output: "standalone",
  productionBrowserSourceMaps: false, // Disable source maps in development
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};
export default nextConfig;
