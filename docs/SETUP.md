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
  (public)/page.tsx       # landing
  (auth)/login/           # login
  (app)/                  # web PT + Admin, URL bersih
    dashboard/            # /dashboard (shared)
    users/                # /users (Admin)
    riwayat/              # /riwayat (shared)
    profil/               # /profil (shared)
    verifikasi/           # /verifikasi (PT)
    klien/                # /klien (PT)
    feedback/             # /feedback (PT)
components/shell/         # shell, sidebar, notifikasi
components/ui/            # komponen shadcn + avatar
services/                 # api.ts, auth, service admin/pt
types/                    # tipe domain
public/fonts/             # font self-hosted
proxy.ts                  # cek cookie route terlindungi
```

**Penting**: `app/(app)` adalah route group bersama untuk PT dan Admin. URL tetap bersih karena halaman shared (`dashboard`, `riwayat`, `profil`) memilih view berdasarkan role; halaman khusus (`/users`, `/klien`, `/verifikasi`, `/feedback`) dijaga layout server masing-masing.

## Yang Perlu Dikerjakan Selanjutnya
- **Kualitas**: tabel semantik/a11y, uji responsif, dan CI `lint + typecheck + build`.
- **Keputusan desain/produk** yang tertunda: Edit Klien, Tambah Klien, filter Audit, lupa kata sandi, review palet dark mode.
