"use client";

import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

// TEMPORARY: halaman bantu slicing UI tanpa auth (lihat docs/CATATAN.md).
// Hapus file ini saat auth asli sudah terpasang.
export default function DevLoginPage() {
  const router = useRouter();

  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  function masukSebagaiPt() {
    // Guard hanya mengecek keberadaan cookie `token` (lihat proxy.ts & app/pt/layout.tsx).
    document.cookie = "token=dev; path=/; max-age=604800";
    router.push("/pt/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Mode Slicing (Dev)</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Halaman sementara untuk membuka halaman /pt/* tanpa login. Cookie yang
        di-set hanya berlaku lokal dan tidak aktif di production.
      </p>
      <Button onClick={masukSebagaiPt}>Masuk sebagai PT (dev)</Button>
    </main>
  );
}
