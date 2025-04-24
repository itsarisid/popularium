import type { NextConfig } from "next";

const nextConfig = {
  env: {
    BASE_URL: "https://localhost:9999/api/",
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
