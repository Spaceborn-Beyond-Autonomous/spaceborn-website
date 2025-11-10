import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 👈 enables static export
  images: {
    unoptimized: true, // 👈 required for export mode
  }
};

export default nextConfig;
