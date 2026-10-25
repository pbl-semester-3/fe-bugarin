# Bugarin Frontend

Web Dashboard **PT & Admin** untuk platform kebugaran **Bugarin** — Next.js 16 (App Router) + TypeScript + Tailwind v4 + TanStack Query.

---

## Tentang Bugarin

Bugarin adalah sistem monitoring kebugaran yang menghubungkan dua peran yang saling bergantung: **Klien** dan **Personal Trainer (PT)**. PT memantau progres klien — berat badan serta aktivitas harian/mingguan/bulanan — sementara Klien menerima dua sumber feedback: masukan langsung dari PT dan rekomendasi berbasis AI dari data historis progres mereka.

Selain modul Klien dan PT, tersedia **Dashboard Web Admin** untuk mengelola seluruh pengguna platform. Implementasi AI (Google Gemini, dijalankan di backend) berfokus pada: (1) menghasilkan **Weekly Plan** (jadwal latihan + menu makan) secara generatif dari profil klien, dan (2) memberi **feedback tekstual** berdasarkan data historis progres klien.

> Ringkasan lengkap ada di [`docs/Bugarin_PRD.md`](docs/Bugarin_PRD.md).

### Peran pengguna

| Role | Cara akun dibuat | Akses utama |
|---|---|---|
| Klien | Registrasi mandiri via Mobile App | Mobile App |
| Personal Trainer (PT) | Dibuat langsung oleh Admin | **Web Dashboard PT** (repo ini) |
| Admin | Dibuat manual saat inisialisasi (seed) | **Web Dashboard Admin** (repo ini) |

### Fitur Web di repo ini

**Web PT**
- **Dashboard** — jumlah klien aktif + jadwal latihan mingguan hasil AI (semua klien).
- **Verifikasi** — terima/tolak request klien baru (tolak wajib isi alasan).
- **Klien** — detail klien, grafik BB historis, review Weekly Plan AI (Setuju / Override).
- **Riwayat** — daftar ringkas seluruh klien (nama, usia, gender, BB awal–sekarang).
- **Feedback** — pilih klien → tulis masukan → notifikasi ke klien.
- **Profil** — data diri, spesialisasi, **tempat gym** (dipakai AI menyusun jadwal), ganti password, tema.

**Web Admin** (UI selesai; data masih dummy)
- **Dashboard** — ringkasan klien/PT aktif, tren aktivitas sesi & registrasi, komposisi spesialisasi PT.
- **Kelola Pengguna** — 2 tab: daftar Klien dan daftar PT. Filter/search, pagination, daftarkan PT baru, hapus Klien/PT, dan halaman Edit PT (identitas, paksa reset password, suspend).
- **Riwayat** — 2 tab read-only: log feedback PT→Klien dan jejak audit CRUD Admin.
- **Profil** — data diri, ganti password, dan mode tampilan Terang/Gelap.

> Edit Klien dan Tambah Klien belum diimplementasikan (belum ada desain/keputusan produk). Detail status & daftar dummy: [`docs/CATATAN.md`](docs/CATATAN.md).

> Mobile App (Klien) dan backend Express berada di repo terpisah. Detail scope & business rules: [`docs/Bugarin_PRD.md`](docs/Bugarin_PRD.md).

---

## Desain (Figma)

Desain UI/UX ada di file Figma **"UI/UX PBL KEL 7"**:

- **Link:** https://www.figma.com/design/CRn1rzbufrR139Sb9GqoF1/UI-UX-PBL-KEL-7
- **Halaman:** `UI Website PT`, `UI Website Admin`, `UI Mobile`.

Spesifikasi desain per halaman (angka dari panel Inspect Figma) disimpan di folder [`design/`](design/):

- [`design/DESIGN_PT.md`](design/DESIGN_PT.md) — token warna, tipografi, komponen global PT.
- **PT:** [`design/DASHBOARD.md`](design/DASHBOARD.md), [`design/VERIFIKASI.md`](design/VERIFIKASI.md), [`design/KLIEN.md`](design/KLIEN.md), [`design/RIWAYAT.md`](design/RIWAYAT.md), [`design/FEEDBACK.md`](design/FEEDBACK.md), [`design/PROFIL.md`](design/PROFIL.md), [`design/LOGIN.md`](design/LOGIN.md).
- **Admin:** [`design/admin/dashboard-admin.md`](design/admin/dashboard-admin.md), [`design/admin/kelola-pengguna.md`](design/admin/kelola-pengguna.md), [`design/admin/riwayat.md`](design/admin/riwayat.md), [`design/admin/profil.md`](design/admin/profil.md), [`design/admin/dark-mode.md`](design/admin/dark-mode.md).

Selain itu, [`design/figma-plugin/`](design/figma-plugin/) berisi **plugin Figma** untuk membuat ulang tampilan web app ini ke Figma (lihat README-nya).

---

## Setup Cepat

```bash
nvm use
npm install
cp .env.example .env.local   # isi NEXT_PUBLIC_API_URL (backend lokal atau Render)

npm run dev    # http://localhost:3000
```

**Melihat UI Admin (data dummy, sebelum auth/integrasi Admin siap):**
1. `npm run dev`
2. Buka `http://localhost:3000`, lalu di DevTools Console set cookie lokal:
   ```js
   document.cookie = "token=dev; path=/";
   ```
3. Buka `http://localhost:3000/admin/dashboard`.

> Halaman `/pt/*` dan `/admin/*` dijaga `proxy.ts` (baru cek keberadaan cookie `token`; role guard nyata belum aktif). Login Admin belum di-wire. Detail status, risiko, dan daftar dummy: [`docs/CATATAN.md`](docs/CATATAN.md).

**Sebelum mulai:** baca [`docs/Bugarin_PRD_Frontend.md`](docs/Bugarin_PRD_Frontend.md) dan skill di folder [`skills/`](skills/) (`nextjs-app-router-patterns`, `shadcn-ui-patterns`, `tanstack-query-patterns`, `form-validation-patterns`, `frontend-taste-bugarin`).

---

## Struktur

```
app/
 ├─ (auth)/login/       # split-screen login
 ├─ pt/                 # Web PT: dashboard, verifikasi, klien, klien/[id], riwayat, feedback, profil
 └─ admin/              # Web Admin: dashboard, users (+ users/pt/[id]/edit), riwayat, profil
components/
 ├─ shell/              # pt-shell.tsx, admin-shell.tsx (sidebar + header)
 ├─ pt/                 # komponen halaman PT (termasuk dashboard/, riwayat/, feedback/, profil/)
 ├─ admin/              # komponen halaman Admin + komponen shared admin
 └─ ui/                 # komponen shadcn
hooks/                  # hook TanStack Query (termasuk useAdmin*.ts)
lib/                    # api.ts (Axios), query-keys.ts, mock/admin.ts, types/, schemas/
providers/              # QueryProvider
design/                 # spec desain PT, admin/, figma-plugin/
docs/                   # PRD, workflow, catatan
proxy.ts                # BUKAN middleware.ts — lihat skill nextjs-app-router-patterns
```

---

## Testing Lokal (wajib sebelum push)

```bash
npm run lint         # 0 error
npm run typecheck    # 0 error
npm run build        # sukses (build produksi penuh)
```

Alur kerja & aturan commit: [`docs/WORKFLOW.md`](docs/WORKFLOW.md).

---

## Referensi

- [`docs/Bugarin_PRD.md`](docs/Bugarin_PRD.md) — PRD induk (overview, scope, user flow, ERD, keamanan).
- [`docs/Bugarin_PRD_Frontend.md`](docs/Bugarin_PRD_Frontend.md) — PRD turunan frontend.
- [`docs/bugarin_tech_stack.md`](docs/bugarin_tech_stack.md) — rincian tech stack.
- [`docs/CATATAN.md`](docs/CATATAN.md) — mode data dummy untuk slicing UI.
- [`docs/WORKFLOW.md`](docs/WORKFLOW.md) — alur kerja & commit.
- [`docs/SETUP.md`](docs/SETUP.md) — setup.
