import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sengaja tidak mengaktifkan "use cache"/Cache Components untuk data personal
  // (dashboard PT, detail klien) — lihat skill nextjs-app-router-patterns.
  images: {
    // next/image menerima URL foto profil dari Cloudinary.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
