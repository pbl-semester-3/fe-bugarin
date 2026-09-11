---
name: nextjs-app-router-patterns
description: Konvensi Next.js 16 App Router untuk Web Dashboard PT & Admin Bugarin — proxy.ts (bukan middleware.ts), Server vs Client Component, dan strategi caching untuk data per-user. Gunakan saat menulis route, layout, atau proteksi rute baru.
metadata:
  origin: bugarin-project
  sources: "Next.js 16 official release notes & migration guide (dicek Sept 2026, verifikasi ulang via context7-docs-lookup sebelum implementasi)"
---

# Next.js App Router Patterns (Bugarin)

Web Dashboard PT & Admin pakai **Next.js 16**. Beberapa hal berubah signifikan dari Next.js 15 yang jadi asumsi awal `Bugarin_tech_stack.md` — skill ini sudah menyesuaikan.

## Activation

- Setup proyek Next.js baru atau upgrade dari versi lama.
- Menulis proteksi rute (`/pt/*`, `/admin/*`).
- Menentukan Server Component vs Client Component untuk halaman baru.
- Ada kebutuhan caching data di sisi server.

## ⚠️ `proxy.ts`, Bukan `middleware.ts`

Next.js 16 mengganti nama file `middleware.ts` → **`proxy.ts`**, dan nama fungsi export dari `middleware` → **`proxy`**. Ini **bukan** cuma rename kosmetik:

- File `middleware.ts` yang tertinggal **diabaikan saat build tanpa error/warning** — auth guard bisa berhenti jalan diam-diam dan route yang harusnya diproteksi jadi bisa diakses publik.
- Konsep di baliknya juga berubah: `proxy.ts` dimaksudkan murni untuk **routing/rewrite di network boundary**, bukan tempat menaruh logic otorisasi penuh. Next.js sendiri menekankan proxy bukan mekanisme keamanan utama.

```typescript
// proxy.ts (root project, BUKAN middleware.ts)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/pt/:path*", "/admin/:path*"],
};
```

**Karena proxy bukan security boundary penuh**: `proxy.ts` di atas cukup untuk UX (redirect ke `/login` kalau tidak ada cookie), tapi **validasi role & kepemilikan data tetap wajib dilakukan di backend Express** (lihat skill `jwt-auth-security`) pada setiap request API — jangan pernah berasumsi "sudah lolos proxy = sudah aman". Ini juga alasan kenapa desain kita sejak awal menaruh seluruh authorization logic di backend, bukan di Next.js — proxy cuma lapisan UX tambahan, bukan satu-satunya pertahanan.

## Konsistensi Versi Node.js Antar Tim

Next.js 16 butuh **Node.js minimal 20.9**. Ini di luar `package-lock.json` (yang cuma mengunci versi package, bukan runtime) — pastikan konsisten lewat:

```
# .nvmrc (root project)
20.9.0
```

```json
// package.json
"engines": { "node": ">=20.9.0" }
```

Anggota tim baru cukup `nvm use` (baca `.nvmrc` otomatis) sebelum `npm install`. Kalau seluruh tim sudah pakai Node versi di atas minimum (mis. Node 24), langkah `git clone && npm install && npm run dev` sudah cukup tanpa perlu `nvm use` — dua file ini murni jaring pengaman untuk anggota tim baru atau environment yang belum konsisten.

## Turbopack

Next.js 16 pakai Turbopack sebagai satu-satunya bundler default (`next dev`, `next build`) — tidak perlu konfigurasi tambahan untuk pakai ini. Kalau ada plugin/lib yang belum kompatibel Turbopack, itu kasus langka; cek dulu lewat `context7-docs-lookup` sebelum mundur ke workaround webpack.

## Server Component vs Client Component

Default-nya Server Component. Pakai `"use client"` **hanya** kalau butuh:
- State/hooks interaktif (`useState`, `useEffect`, form input, dialog/modal shadcn)
- Event handler browser (`onClick`, dsb)
- Library yang bergantung ke browser API (Recharts butuh `"use client"`)

Halaman dashboard Bugarin (Verifikasi, Klien detail, CRUD User) mayoritas **interaktif** (tabel dengan aksi, form, dialog) → sebagian besar akan jadi Client Component yang fetch data lewat TanStack Query (lihat skill `tanstack-query-patterns`), bukan lewat Server Component `fetch()` langsung. Ini pilihan sadar, bukan default — karena kita butuh mutation + optimistic UI + invalidation yang lebih natural ditangani TanStack Query di client.

Pola per halaman:
```tsx
// app/pt/verifikasi/page.tsx — Server Component tipis, cuma shell
export default function VerifikasiPage() {
  return <VerifikasiTable />; // komponen client yang fetch data
}
```
```tsx
// components/verifikasi-table.tsx
"use client";
import { usePairingRequests } from "@/hooks/usePairingRequests";

export function VerifikasiTable() {
  const { data, isLoading } = usePairingRequests();
  // ...
}
```

## Caching (Cache Components / `"use cache"`)

Next.js 16 mengubah default caching jadi **opt-in total**: tidak ada yang di-cache kecuali eksplisit ditandai `"use cache"`. Ini justru **menguntungkan Bugarin** karena hampir semua data kita bersifat per-user/per-role (dashboard PT, data klien tertentu) — data seperti ini **tidak boleh** ke-cache lintas request/user secara tidak sengaja.

**Aturan untuk Bugarin:**
- **Jangan** pakai `"use cache"` untuk data yang terikat ke user login (dashboard summary, detail klien, riwayat) — biarkan selalu dynamic, caching cukup ditangani TanStack Query di client (yang sudah tahu siapa user-nya).
- `"use cache"` **boleh** dipertimbangkan untuk data benar-benar statis/shared lintas semua user (mis. halaman landing publik kalau ada) — Bugarin saat ini tidak punya kebutuhan ini di scope PT/Admin.
- Kalau nanti butuh `"use cache"`, ingat: fungsi yang ditandai ini **tidak boleh** membaca `cookies()`/`headers()` di dalamnya (akan error) — pisahkan bagian yang butuh data request-scoped ke luar fungsi cached.

## Struktur Route Groups (proteksi role)

```
app/
 ├─ (auth)/login/page.tsx
 ├─ pt/
 │   ├─ layout.tsx     # cek role==='pt' dari data user (fetch profile), redirect kalau salah
 │   └─ .../page.tsx
 └─ admin/
     ├─ layout.tsx     # cek role==='admin'
     └─ .../page.tsx
```

**Penting**: `pt/` dan `admin/` harus folder biasa, **bukan** route group `(pt)`/`(admin)` — route group tidak menambah segmen ke URL, jadi dua route group berbeda yang isinya sama-sama `dashboard/page.tsx` akan resolve ke path identik (`/dashboard`) dan bikin build gagal ("two parallel pages resolve to the same path"). Route group cuma aman dipakai kalau path-nya memang tidak diperebutkan folder lain, seperti `(auth)/login` di atas.

`layout.tsx` per grup adalah lapisan kedua setelah `proxy.ts` — proxy cuma cek "ada token atau tidak", layout Server Component ini yang cek "role-nya benar untuk grup ini atau tidak" (fetch profile via cookie yang sama, redirect kalau role tidak cocok).

## Anti-Patterns

| Anti-Pattern | Risiko | Perbaikan |
|---|---|---|
| Masih pakai nama file `middleware.ts` di Next.js 16 | Diabaikan diam-diam saat build, auth guard tidak jalan tanpa error | Rename ke `proxy.ts`, fungsi export jadi `proxy` |
| Menaruh cek role/authorization penuh hanya di `proxy.ts` | Proxy bukan security boundary — bisa ada celah race/edge case routing | Validasi ulang di layout Server Component + wajib di backend Express |
| Fetch data personal (dashboard PT tertentu) dengan `"use cache"` | Data bisa ke-cache dan bocor/stale lintas user | Jangan cache data per-user; andalkan TanStack Query di client |
| Semua halaman dipaksa jadi Client Component | Kehilangan manfaat Server Component untuk data non-interaktif | Default Server Component, `"use client"` hanya saat memang perlu interaktivitas |

## Related

- Skill: `jwt-auth-security` (backend) — otorisasi sesungguhnya ada di sini, bukan di proxy.ts
- Skill: `tanstack-query-patterns` — pola fetch data personal di Client Component
- Skill: `context7-docs-lookup` — cek ulang detail API Next.js sebelum implementasi, karena rilis ini masih relatif baru dan detailnya bisa terus disempurnakan
