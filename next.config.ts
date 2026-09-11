import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sengaja tidak mengaktifkan "use cache"/Cache Components untuk data personal
  // (dashboard PT, detail klien) — lihat skill nextjs-app-router-patterns.
};

export default nextConfig;
