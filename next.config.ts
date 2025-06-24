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
};

export default nextConfig;
