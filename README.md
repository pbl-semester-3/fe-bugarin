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

**Web Admin**
- **Dashboard** — statistik global platform.
- **CRUD User** — kelola Klien & PT (PT dibuat Admin, tanpa registrasi mandiri).
- **Riwayat** — log feedback PT→Klien dan log aktivitas CRUD Admin (audit).
- **Profil** — data diri, ganti password, tema.

> Mobile App (Klien) dan backend Express berada di repo terpisah. Detail scope & business rules: [`docs/Bugarin_PRD.md`](docs/Bugarin_PRD.md).

---

## Desain (Figma)

Desain UI/UX ada di file Figma **"UI/UX PBL KEL 7"**:

- **Link:** https://www.figma.com/design/CRn1rzbufrR139Sb9GqoF1/UI-UX-PBL-KEL-7
- **Halaman:** `UI Website PT`, `UI Website Admin`, `UI Mobile`.

Spesifikasi desain per halaman (angka dari panel Inspect Figma) disimpan di folder [`design/`](design/):

- [`design/DESIGN_PT.md`](design/DESIGN_PT.md) — token warna, tipografi, komponen global.
- [`design/DASHBOARD.md`](design/DASHBOARD.md), [`design/VERIFIKASI.md`](design/VERIFIKASI.md), [`design/KLIEN.md`](design/KLIEN.md), [`design/RIWAYAT.md`](design/RIWAYAT.md), [`design/FEEDBACK.md`](design/FEEDBACK.md), [`design/PROFIL.md`](design/PROFIL.md), [`design/LOGIN.md`](design/LOGIN.md).

Selain itu, [`design/figma-plugin/`](design/figma-plugin/) berisi **plugin Figma** untuk membuat ulang tampilan web app ini ke Figma (lihat README-nya).

---

## Setup Cepat

```bash
nvm use
npm install
cp .env.example .env.local   # isi NEXT_PUBLIC_API_URL (backend lokal atau Render)

npm run dev    # http://localhost:3000
```

**Menjalankan mode slicing (data dummy, tanpa backend):**
1. `npm run dev`
2. Buka `http://localhost:3000/dev-login`
3. Klik **"Masuk sebagai PT (dev)"** → cookie `token=dev` di-set → diarahkan ke `/pt/dashboard`.

> Halaman `/pt/*` dan `/admin/*` dijaga `proxy.ts` (cek keberadaan cookie `token`). Lihat [`docs/CATATAN.md`](docs/CATATAN.md) untuk daftar data dummy & cara pembersihannya.

**Sebelum mulai:** baca [`docs/Bugarin_PRD_Frontend.md`](docs/Bugarin_PRD_Frontend.md) dan skill di folder [`skills/`](skills/) (`nextjs-app-router-patterns`, `shadcn-ui-patterns`, `tanstack-query-patterns`, `form-validation-patterns`, `frontend-taste-bugarin`).

---

## Struktur

```
app/
 ├─ (auth)/login/       # split-screen login
 ├─ pt/                 # Web PT: dashboard, verifikasi, klien, klien/[id], riwayat, feedback, profil
 ├─ admin/              # Web Admin: dashboard (+ CRUD user menyusul)
 └─ dev-login/          # helper slicing (dev only, 404 di production)
components/
 ├─ shell/              # pt-shell.tsx (sidebar + header)
 ├─ pt/                 # komponen halaman PT (termasuk dashboard/, riwayat/, feedback/, profil/)
 └─ ui/                 # komponen shadcn
hooks/                  # hook TanStack Query
lib/                    # api.ts (Axios), query-keys.ts, mock/, schemas/
providers/              # QueryProvider
design/                 # spec desain per halaman + figma-plugin/
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
