import { cookies } from "next/headers";
import type { Me } from "@/lib/types/auth";

// Server-only: ambil identitas sesi dari backend memakai cookie httpOnly.
// Mengembalikan null bila belum login / token tidak valid / backend gagal.
export async function getMe(): Promise<Me | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return null;

  try {
    const res = await fetch(`${base}/auth/me`, {
      headers: { Cookie: `token=${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const body = (await res.json()) as { data: Me };
    return body.data;
  } catch {
    return null;
  }
}
