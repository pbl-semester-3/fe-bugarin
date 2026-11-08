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
  // Proxy semua panggilan API lewat origin FE sendiri (same-origin).
  // Tujuan: cookie auth httpOnly diset pada host FE (localhost / bugarin.my.id),
  // sehingga guard server-side (proxy.ts, layout) bisa membacanya — dan bebas
  // masalah CORS/SameSite. Target diambil dari NEXT_PUBLIC_API_URL.
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    return [{ source: "/api/:path*", destination: `${target}/:path*` }];
  },
};

export default nextConfig;
