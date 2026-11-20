# Bugarin Web Dashboard

Frontend web untuk **Personal Trainer (PT)** dan **Admin** pada platform kebugaran **Bugarin**. Dibangun dengan Next.js 16 App Router, TypeScript, Tailwind CSS v4, dan TanStack Query.

- Production: [https://bugarin.my.id](https://bugarin.my.id)
- API: [https://api.bugarin.my.id](https://api.bugarin.my.id)
- Repository: [pbl-semester-3/fe-bugarin](https://github.com/pbl-semester-3/fe-bugarin)

---

## Daftar Isi

- [Ringkasan Proyek](#ringkasan-proyek)
- [Peran dan Akses](#peran-dan-akses)
- [Fitur Utama](#fitur-utama)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Alur Sistem](#alur-sistem)
- [Alur Penggunaan PT](#alur-penggunaan-pt)
- [Alur Penggunaan Admin](#alur-penggunaan-admin)
- [Teknologi](#teknologi)
- [Struktur Repository](#struktur-repository)
- [Menjalankan di Lokal](#menjalankan-di-lokal)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Keamanan dan Observability](#keamanan-dan-observability)
- [Batasan yang Diketahui](#batasan-yang-diketahui)
- [Troubleshooting](#troubleshooting)
- [Workflow Kontribusi](#workflow-kontribusi)
- [Dokumentasi](#dokumentasi)

---

## Ringkasan Proyek

Bugarin menghubungkan **Klien** dengan **Personal Trainer** untuk memantau progres latihan, berat badan, nutrisi, dan feedback. Repository ini menyediakan dua antarmuka web:

- **Web PT** untuk mengelola klien, memverifikasi pengajuan, meninjau Weekly Plan hasil AI, memberi feedback, dan memantau jadwal.
- **Web Admin** untuk mengelola pengguna, memantau statistik platform, dan meninjau audit trail serta request log.

Aplikasi Klien tersedia sebagai aplikasi mobile terpisah. Backend Express, database MySQL, dan integrasi Gemini juga berada di repository backend.

### Kemampuan utama

- Autentikasi berbasis cookie `httpOnly`.
- Proteksi role di server untuk PT dan Admin.
- URL bersih tanpa prefix role: `/dashboard`, `/users`, `/klien`, `/verifikasi`, `/feedback`, `/riwayat`, `/profil`.
- Weekly Plan AI dengan review PT: setujui atau override.
- Deteksi bentrok jadwal antar-klien dan dalam satu plan.
- Notifikasi pengajuan klien untuk PT dan notifikasi operasional untuk Admin.
- Audit trail Admin dan request log untuk penelusuran error.
- Dark mode untuk PT dan Admin.
- Landing page publik dan halaman login responsif.

---

## Peran dan Akses

| Peran | Pembuatan Akun | Antarmuka | Akses |
|---|---|---|---|
| Klien | Registrasi mandiri melalui mobile app | Mobile app | Fitur klien, pairing dengan PT |
| PT | Dibuat oleh Admin | Web PT | `/dashboard`, `/verifikasi`, `/klien`, `/riwayat`, `/feedback`, `/profil` |
| Admin | Seed/inisialisasi backend | Web Admin | `/dashboard`, `/users`, `/riwayat`, `/profil` |

Halaman shared yang menampilkan data berbeda berdasarkan role:

- `/dashboard`
- `/riwayat`
- `/profil`

Halaman khusus role:

- Admin: `/users`, `/users/pt/[id]/edit`
- PT: `/verifikasi`, `/klien`, `/klien/[id]`, `/feedback`

---

## Fitur Utama

### Web PT

- **Dashboard**: jumlah klien aktif, jumlah pengajuan menunggu verifikasi, dan jadwal latihan minggu berjalan.
- **Verifikasi**: menerima atau menolak pengajuan klien baru. Penolakan wajib menyertakan alasan.
- **Klien**: daftar klien aktif, detail profil, grafik berat badan, dan review Weekly Plan.
- **Weekly Plan**: melihat rencana latihan dan menu, mendeteksi bentrok jadwal, menyetujui, atau melakukan override.
- **Riwayat**: ringkasan progres seluruh klien.
- **Feedback**: mengirim arahan kepada klien.
- **Profil**: data diri, spesialisasi, tempat gym, foto profil, password, dan tema.
- **Notifikasi**: pengajuan klien yang menunggu verifikasi.

### Web Admin

- **Dashboard**: statistik klien dan PT aktif, tren registrasi, serta komposisi spesialisasi PT.
- **Kelola Pengguna**: daftar klien dan PT, pencarian, filter, pagination, pembuatan akun PT, penghapusan akun, dan edit PT.
- **Edit PT**: perubahan identitas, reset password, dan suspend/aktifkan akun.
- **Riwayat**:
  - Log feedback PT ke klien.
  - Audit trail aktivitas Admin.
  - Request log untuk error API.
- **Profil**: data diri, password, dan tema.
- **Notifikasi**: pengajuan pairing dan klien onboarding.

### Publik

- Landing page dengan hero, penjelasan produk, cara kerja, FAQ, dan preview aplikasi.
- Login PT/Admin dengan branding yang dapat diklik menuju landing page.

---

## Arsitektur Sistem

```txt
Browser
  |
  | HTTPS
  v
Next.js di Vercel
  |-- App Router (Server + Client Components)
  |-- proxy.ts (cek cookie pada route terlindungi)
  |-- app/(app)/layout.tsx (validasi role via GET /auth/me)
  |-- /api/* rewrite
  v
Backend Express di Vercel
  |
  v
MySQL (Aiven) + Cloudinary + Gemini
```

### Prinsip utama

- **Server-side role guard** tidak hanya mengandalkan penyembunyian menu.
- **Same-origin API proxy**: browser memanggil `/api/*`, lalu Next.js me-rewrite ke backend. Cookie auth tetap berada di domain frontend.
- **Service layer**: komponen tidak memanggil Axios langsung. Pemanggilan API berada di `services/`, sedangkan hooks menangani React Query.
- **Colocation**: komponen spesifik halaman berada di dalam folder route masing-masing.
- **Global components**: hanya shell, navigasi, dan UI primitive yang berada di `components/`.

---

## Alur Sistem

### 1. Login dan sesi

```txt
Form login
  -> POST /api/auth/login
  -> Next.js rewrite ke backend /auth/login
  -> backend mengirim Set-Cookie token (httpOnly)
  -> frontend redirect ke /dashboard
  -> proxy.ts mengecek cookie
  -> app/(app)/layout.tsx memanggil GET /auth/me
  -> layout memilih AdminShell atau PtShell
```

Validasi role tetap dilakukan ulang di backend. Frontend guard berfungsi untuk UX dan pencegahan akses halaman, bukan satu-satunya lapisan keamanan.

### 2. Pengambilan data

```txt
Client Component
  -> TanStack Query hook
  -> services/{domain}
  -> Axios /api/*
  -> Next.js rewrite
  -> Backend Express
  -> MySQL
```

### 3. Weekly Plan

```txt
Cron mingguan
  -> POST /internal/jobs/generate-weekly-plan
  -> backend menyusun plan dengan Gemini atau fallback deterministik
  -> plan disimpan ke weekly_plans (status: pending_review)
  -> PT membuka detail klien
  -> PT menyetujui atau melakukan override
  -> plan final tampil di dashboard PT
```

Catatan:

- Dashboard PT hanya menampilkan plan berstatus `disetujui` atau `override`.
- Plan `pending_review` tetap terlihat di detail klien.
- Jadwal yang bentrok ditolak saat approve/override.
- Slot jadwal dihitung agar tidak bertabrakan dengan klien lain pada PT yang sama.

### 4. Request ID dan audit error

```txt
Request gagal
  -> backend memberi x-request-id
  -> backend menyimpan ringkasan error ke request_logs
  -> Admin membuka /riwayat?tab=request
  -> Admin dapat mencari berdasarkan endpoint, status, role, atau request ID
```

Request ID tidak ditampilkan ke klien. Informasi ini digunakan untuk kebutuhan operasional dan investigasi.

---

## Alur Penggunaan PT

1. **Login** di `/login` menggunakan akun PT.
2. Sistem mengarahkan ke `/dashboard`.
3. **Verifikasi pengajuan klien** di `/verifikasi`.
   - Terima pengajuan untuk menghubungkan klien.
   - Tolak dengan alasan bila pengajuan tidak sesuai.
4. Buka **Dashboard** untuk melihat klien aktif dan jadwal minggu berjalan.
5. Buka **Klien** untuk melihat daftar klien.
6. Pilih klien untuk membuka:
   - profil dan grafik berat badan;
   - Weekly Plan;
   - status bentrok jadwal.
7. Tinjau Weekly Plan:
   - **Setujui** jika jadwal sudah sesuai.
   - **Override** untuk mengubah jadwal/menu terlebih dahulu.
8. Setelah plan final, jadwal muncul di dashboard.
9. Kirim **Feedback** kepada klien melalui halaman Feedback.
10. Pantau progres klien di **Riwayat**.
11. Perbarui data diri, tempat gym, foto, password, dan tema di **Profil**.

---

## Alur Penggunaan Admin

1. **Login** di `/login` menggunakan akun Admin.
2. Sistem mengarahkan ke `/dashboard`.
3. Lihat ringkasan statistik platform di dashboard.
4. Buka **Kelola Pengguna** di `/users`.
   - Tab **Klien** untuk melihat data klien dan detailnya.
   - Tab **PT** untuk melihat, mencari, dan mengelola akun PT.
5. Buat akun PT baru melalui dialog **Daftarkan PT Baru**.
6. Buka halaman edit PT untuk:
   - memperbarui identitas;
   - mengirim kode reset password;
   - suspend atau mengaktifkan akun.
7. Buka **Riwayat** untuk:
   - melihat feedback PT ke klien;
   - melihat audit aktivitas Admin;
   - melihat request log error API.
8. Gunakan filter role/status atau pencarian request ID pada tab **Request Log**.
9. Perbarui profil, password, dan tema di **Profil**.

---

## Teknologi

| Kategori | Teknologi |
|---|---|
| Framework | Next.js 16 App Router |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui, Radix UI, Lucide React |
| Data fetching | TanStack Query, Axios |
| Form | React Hook Form, Zod |
| Grafik | Recharts |
| Deployment | Vercel |
| Backend | Express + Drizzle ORM + MySQL |
| Media | Cloudinary |
| AI | Google Gemini melalui backend |

---

## Struktur Repository

```txt
app/
  (public)/                  # landing page + komponen landing
  (auth)/login/              # halaman login + komponen form
  (app)/
    layout.tsx               # guard login/role + pemilihan shell
    dashboard/               # /dashboard, shared Admin/PT
    users/                   # /users, khusus Admin
    riwayat/                 # /riwayat, shared Admin/PT
    profil/                  # /profil, shared Admin/PT
    verifikasi/              # /verifikasi, khusus PT
    klien/                   # /klien dan /klien/[id], khusus PT
    feedback/                # /feedback, khusus PT
components/
  shell/                     # shell, sidebar, notifikasi
  ui/                        # komponen UI global dan avatar
hooks/                       # hook TanStack Query
services/
  admin/                     # service domain Admin
  pt/                        # service domain PT
  api.ts                     # Axios instance dan error helper
  auth.server.ts             # getMe server-only + cache
  auth.service.ts            # login/logout
types/                       # tipe domain Admin, PT, auth
lib/                         # query keys, schema, utility
providers/                   # QueryProvider
design/                      # spesifikasi desain
docs/                        # PRD, workflow, setup, catatan
public/fonts/                # font self-hosted
proxy.ts                     # pengecekan cookie route terlindungi
```

---

## Menjalankan di Lokal

### Prasyarat

- Node.js minimal **20.9**
- npm
- Backend Bugarin berjalan di lokal atau dapat diakses melalui URL production

### Langkah

```bash
git clone https://github.com/pbl-semester-3/fe-bugarin.git
cd fe-bugarin

npm install
cp .env.example .env.local
```

Isi `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Gunakan URL backend production jika tidak ingin menjalankan backend lokal:

```env
NEXT_PUBLIC_API_URL=https://api.bugarin.my.id
```

Jalankan aplikasi:

```bash
npm run dev
```

Buka:

```txt
http://localhost:3000
```

Login melalui:

```txt
http://localhost:3000/login
```

---

## Environment Variables

Frontend hanya membutuhkan satu environment variable wajib.

| Variabel | Wajib | Contoh | Keterangan |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Ya | `https://api.bugarin.my.id` | Target rewrite `/api/*` dan fetch server-side `GET /auth/me` |

Catatan:

- Jangan menambahkan trailing slash.
- Variabel ini dibaca saat build oleh `next.config.ts`. Setelah mengubahnya di Vercel, redeploy.
- Secret backend seperti `JWT_SECRET`, `DATABASE_URL`, `GEMINI_API_KEY`, dan `CRON_SECRET` tidak boleh berada di repository frontend.

---

## Scripts

| Script | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server di port 3000 |
| `npm run build` | Membuat production build |
| `npm run start` | Menjalankan production server lokal |
| `npm run typecheck` | Pemeriksaan TypeScript tanpa emit |
| `npm run lint` | Pemeriksaan ESLint |
| `npm run schema:check` | Memeriksa keselarasan schema frontend dengan kontrak backend |

`schema:check` membutuhkan file kontrak backend. Jika backend tidak berada di `./be`, set:

```bash
CONTRACT_PATH=../bugarin-backend/contract/schema-contract.json npm run schema:check
```

---

## Deployment

### Frontend di Vercel

1. Import repository `fe-bugarin` ke Vercel.
2. Gunakan framework preset **Next.js**.
3. Root directory: root repository.
4. Build command: `npm run build`.
5. Install command: `npm install`.
6. Production branch: `main`.
7. Tambahkan environment variable:
   ```env
   NEXT_PUBLIC_API_URL=https://api.bugarin.my.id
   ```
8. Deploy.
9. Tambahkan domain `bugarin.my.id`.
10. Atur DNS sesuai instruksi Vercel. Jika DNS dikelola Cloudflare, gunakan mode **DNS only**.

### Checklist sebelum deploy

- [ ] `dev` sudah dimerge ke `main`.
- [ ] `npm run typecheck` lolos.
- [ ] `npm run lint` lolos.
- [ ] `npm run build` lolos.
- [ ] `NEXT_PUBLIC_API_URL` menunjuk backend yang benar.
- [ ] Origin frontend terdaftar di `WEB_ORIGIN` backend.
- [ ] Domain dan SSL aktif.
- [ ] Login PT/Admin berhasil.
- [ ] Request ke `/api/health` berhasil.
- [ ] Halaman dashboard, klien, dan riwayat dapat dibuka.

### Catatan domain

- Frontend: `https://bugarin.my.id`
- Backend: `https://api.bugarin.my.id`
- Cookie auth menggunakan `SameSite=Lax` karena frontend dan backend berada dalam satu registrable domain.
- Jika frontend dan backend memakai domain yang berbeda site, konfigurasi cookie harus disesuaikan di backend.

---

## Keamanan dan Observability

- **Cookie auth** menggunakan `httpOnly`; token tidak disimpan di localStorage.
- **Role guard** diperiksa di server layout dan divalidasi ulang oleh backend.
- **`proxy.ts`** hanya mengecek keberadaan cookie, bukan pengganti otorisasi.
- **Request ID** dikirim backend melalui header `x-request-id` dan dicatat pada request log.
- **Request log** menyimpan ringkasan error tanpa body sensitif dan dapat dilihat Admin pada tab Request Log.
- **CORS** backend hanya mengizinkan origin frontend yang terdaftar.
- **Foto profil** disimpan di Cloudinary; URL gambar diproses melalui helper avatar.

---

## Batasan yang Diketahui

- Web ini hanya untuk role **PT** dan **Admin**; Klien menggunakan mobile app.
- Edit Klien dan Tambah Klien belum diimplementasikan.
- Admin belum memiliki fitur upload foto profil; avatar Admin menggunakan inisial.
- Request ID tidak ditampilkan ke pengguna; hanya tersedia untuk kebutuhan operasional Admin/developer.
- Weekly Plan bergantung pada cron backend. Jika cron tidak berjalan, dashboard dan detail klien akan kosong untuk minggu berjalan.
- Plan baru berstatus `pending_review`; jadwal belum tampil di dashboard sampai PT menyetujui atau melakukan override.

---

## Troubleshooting

### API gagal / data tidak muncul

1. Pastikan backend aktif:
   ```bash
   curl https://api.bugarin.my.id/health
   ```
2. Pastikan `NEXT_PUBLIC_API_URL` benar.
3. Cek tab Network browser untuk melihat status `/api/*`.
4. Cek Console browser untuk error CORS.
5. Pastikan origin frontend terdaftar di `WEB_ORIGIN` backend.

### Login berhasil tetapi kembali ke halaman login

- Periksa apakah cookie `token` tersimpan pada domain frontend.
- Periksa konfigurasi `COOKIE_SAMESITE` dan domain backend.
- Pastikan `GET /auth/me` mengembalikan data role yang benar.

### Weekly Plan tidak muncul

- Pastikan sudah berada di minggu berjalan.
- Cek tabel `weekly_plans` untuk `minggu_mulai` minggu ini.
- Pastikan cron generate plan berjalan.
- Buka detail klien terlebih dahulu; plan baru mungkin masih `pending_review`.
- Setujui atau override plan agar muncul di dashboard.

### Request Log kosong

- Request log hanya menyimpan request yang gagal, bukan semua request.
- Pastikan migration tabel `request_logs` sudah diterapkan.
- Coba filter berdasarkan role, status, atau request ID.

### Gambar profil tidak tampil

- Pastikan `CLOUDINARY_URL` backend valid.
- Pastikan `res.cloudinary.com` diizinkan oleh konfigurasi `next/image`.
- Cek URL foto pada response API.

---

## Workflow Kontribusi

Alur branch:

```txt
feature/fix/docs branch
        |
        v
       dev
        |
        v
       main
        |
        v
   Vercel production
```

Aturan:

- Jangan commit langsung ke `main` atau `dev`.
- Gunakan prefix branch: `feat/`, `fix/`, `docs/`, `chore/`, atau `refactor/`.
- Buat PR ke `dev`.
- Setelah stabil dan siap deploy, merge `dev` ke `main` melalui PR.
- Jalankan `typecheck`, `lint`, dan `build` sebelum push.
- Satu commit mewakili satu perubahan logis.

Detail workflow: [`docs/WORKFLOW.md`](docs/WORKFLOW.md).

---

## Dokumentasi

- [`docs/Bugarin_PRD.md`](docs/Bugarin_PRD.md) — PRD induk dan business rules.
- [`docs/Bugarin_PRD_Frontend.md`](docs/Bugarin_PRD_Frontend.md) — PRD frontend.
- [`docs/SETUP.md`](docs/SETUP.md) — setup lokal dan deployment.
- [`docs/WORKFLOW.md`](docs/WORKFLOW.md) — branch, commit, dan review.
- [`docs/CATATAN.md`](docs/CATATAN.md) — catatan integrasi dan status fitur.
- [`docs/bugarin_tech_stack.md`](docs/bugarin_tech_stack.md) — detail teknologi.
- [`design/`](design/) — spesifikasi desain PT, Admin, dan plugin Figma.
- [`skills/`](skills/) — panduan teknis internal untuk pengembangan frontend.
