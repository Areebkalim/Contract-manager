import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Keeps the "Static Export" (Crucial for Netlify)
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;