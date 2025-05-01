import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: "https://localhost:7266/",
  },
  reactStrictMode: true,
};

export default nextConfig;
