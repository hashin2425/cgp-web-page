import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/cgp-web-page" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/cgp-web-page/" : "",
};

export default nextConfig;
