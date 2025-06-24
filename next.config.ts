import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: isProd ? "/website" : "",
  assetPrefix: isProd ? "/website/" : "",
};

export default nextConfig;
