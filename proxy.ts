import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: file ini WAJIB bernama proxy.ts (bukan middleware.ts) — lihat skill
// nextjs-app-router-patterns. Ini hanya UX layer (redirect kalau tidak ada cookie),
// BUKAN security boundary — validasi role & kepemilikan data tetap wajib di backend Express.
export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Sudah login tapi membuka /login -> kembali ke dashboard PT.
  // Catatan: hanya cek keberadaan cookie (belum role). Login Admin masih ditolak,
  // jadi sementara aman. Ganti saat Admin / GET /auth/me tersedia.
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/pt/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/pt/:path*", "/admin/:path*"],
};
