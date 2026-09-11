# Bugarin Frontend — Setup

## Prasyarat
- Node.js ≥ 20.9 (`nvm use`)
- Backend (`be-bugarin`) sudah jalan — lokal ATAU sudah di-deploy ke Render (lihat `SETUP.md` repo `be-bugarin` bab Deployment). Tanpa ini, UI jalan tapi semua API call gagal.

## Setup Lokal

```bash
git clone https://github.com/pbl-semester-3/fe-bugarin.git
cd fe-bugarin
nvm use
npm install

cp .env.example .env.local
```

**Isi `.env.local`:**
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```
Ganti ke URL Render (`https://bugarin-backend-xxxx.onrender.com`) kalau backend sudah di-deploy — ini yang bikin kamu **tidak perlu jalanin backend sendiri secara lokal** sama sekali.

```bash
npx shadcn@latest init
npx shadcn@latest add button table dialog alert-dialog form input select card badge textarea

npm run dev    # http://localhost:3000
```

## Deployment — Vercel (Free)

1. https://vercel.com → connect ke repo `fe-bugarin` di GitHub.
2. Import project → Vercel auto-detect Next.js, tidak perlu konfigurasi tambahan.
3. Set environment variable `NEXT_PUBLIC_API_URL` ke URL Render backend.
4. Deploy — dapat URL publik, tanpa cold start (beda karakteristik dari Render).

## Struktur Project

```
app/
 ├─ (auth)/login/
 ├─ pt/          layout.tsx (role guard) + dashboard/ (stub)
 └─ admin/       layout.tsx (role guard) + dashboard/ (stub)
proxy.ts         # BUKAN middleware.ts — lihat skills/nextjs-app-router-patterns
lib/api.ts       # Axios instance, withCredentials true
lib/query-keys.ts
providers/
```

**Penting**: `pt/` dan `admin/` folder biasa, **bukan** route group `(pt)`/`(admin)` — route group tidak menambah segmen URL, dua route group isi `dashboard/page.tsx` akan bentrok jadi 1 path saat build.

## Yang Perlu Dikerjakan Selanjutnya
- Role guard di `pt/layout.tsx` dan `admin/layout.tsx` masih placeholder — ganti dengan panggilan nyata ke `GET /pt/profile` / `GET /admin/profile`.
- Halaman lain sesuai `docs/Bugarin_PRD_Frontend.md` bab 4 & 5.
