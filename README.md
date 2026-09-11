# Bugarin Frontend

Next.js 16 (App Router) + TypeScript + Tailwind v4 + TanStack Query — Web Dashboard PT & Admin.

**Sebelum mulai**: baca `Bugarin_PRD_Frontend.md` dan skill di folder `skill/` (`nextjs-app-router-patterns`, `shadcn-ui-patterns`, `tanstack-query-patterns`, `form-validation-patterns`, `frontend-taste-bugarin`).

## Setup Cepat

```bash
nvm use
npm install
cp .env.example .env.local   # isi NEXT_PUBLIC_API_URL (backend lokal atau Render)

npx shadcn@latest init
npx shadcn@latest add button table dialog alert-dialog form input select card badge textarea

npm run dev    # http://localhost:3000
```

## Struktur

```
app/
 ├─ (auth)/login/
 ├─ (pt)/          layout.tsx (role guard) + dashboard/ (stub)
 └─ (admin)/       layout.tsx (role guard) + dashboard/ (stub)
proxy.ts           # BUKAN middleware.ts — lihat skill nextjs-app-router-patterns
lib/api.ts         # Axios instance, withCredentials true
lib/query-keys.ts  # query key factory TanStack Query
providers/         # QueryProvider
```

## Yang Perlu Dikerjakan Selanjutnya
- Role guard di `(pt)/layout.tsx` dan `(admin)/layout.tsx` masih placeholder (`getRole()` selalu return role tetap) — ganti dengan panggilan nyata ke `GET /pt/profile` / `GET /admin/profile`.
- Halaman lain sesuai `Bugarin_PRD_Frontend.md` bab 4 & 5 (Verifikasi, Klien detail+grafik, Riwayat, Feedback, Profil, CRUD User).
- Jalankan `npx shadcn@latest init` dulu sebelum pakai komponen di `components/ui/` (belum di-generate di scaffold ini).
