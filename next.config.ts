import type { NextConfig } from "next";

//const isProd = process.env.NODE_ENV === "production";
const isProd = true;

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: isProd ? "" : "",
  assetPrefix: isProd ? "" : "",
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    return config;
  },
};

export default nextConfig;
