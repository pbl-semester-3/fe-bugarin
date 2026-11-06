# CATATAN — Mode Dummy Frontend untuk Slicing UI (PT & Admin)

Dokumen ini mencatat pemakaian **data dummy** di sisi frontend saat menyiapkan
halaman role **PT** dan **Admin** dari desain Figma. Dokumen ini menjadi
rujukan agar pembersihan dummy dan pekerjaan lanjutan tidak terlewat.

---

## 1. Konteks & Tujuan

- Fondasi frontend (Next.js 16 App Router, tema shadcn, TanStack Query, guard)
  sudah selesai.
- **Web PT** sudah diintegrasikan ke backend asli untuk sebagian besar halaman.
- **Web Admin** sudah terintegrasi dengan endpoint `/admin/*`; mock lama tidak
  lagi dipakai oleh komponen/hook aktif.
- Tujuannya: UI Admin bisa langsung dilihat/direview tanpa menunggu backend.

## 2. Branch Kerja

**PT (sudah merged):**
- `feat/fondasi-ui-pt-slicing`, `feat/pt-dashboard`, `feat/halaman-verifikasi-pt`,
  `feat/pt-klien`, `feat/pt-riwayat`, `feat/pt-feedback`, `feat/pt-profil`.

**Admin (sudah merged ke `dev` lewat PR #34–#39):**
- `feat/admin-foundation` — token, tipe, mock, hooks, shell, komponen shared.
- `feat/admin-dashboard`
- `feat/admin-kelola-pengguna`
- `feat/admin-riwayat`
- `feat/admin-profil`
- `feat/admin-dark-mode`

Branch sengaja **tidak dihapus** agar jejak per halaman tetap terlihat.

## 3. Keputusan Arsitektur

1. **Data dummy diisolasi** di `lib/mock/` dan hanya diakses lewat hook adaptor
   (`hooks/useAdmin*.ts`), bukan langsung dari komponen.
2. **Tipe domain** berada di `types/`; halaman Admin memakai kontrak API dari `services/admin/`.
3. **Tema Admin** disimpan di `localStorage` (`bugarin-admin-theme`) lewat `hooks/useAdminTheme.ts`; tema dipilih berdasarkan role dari `getMe()` di `app/(app)/layout.tsx`, bukan prefix URL.
4. **Auth/role guard** divalidasi di `app/(app)/layout.tsx` dan layout area. `proxy.ts` hanya mengecek keberadaan cookie; role sebenarnya dibaca dari `GET /auth/me` lewat `services/auth.server.ts`.
5. **`/dev-login` sudah dihapus** dari repo. Untuk melihat UI Admin sekarang,
   gunakan cookie lokal (bagian 4).

## 4. Cara Menjalankan Mode Slicing Admin

1. Jalankan `npm run dev`.
2. Login normal bisa untuk Admin dan PT; keduanya diarahkan ke `/dashboard`.
3. Buka DevTools → Console di `http://localhost:3000`, lalu set cookie lokal:

   ```js
   document.cookie = "token=dev; path=/";
   ```

4. Buka `http://localhost:3000/dashboard` (atau menu Admin lain).
5. Hapus cookie dengan `document.cookie = "token=; path=/; max-age=0"` untuk
   kembali ke kondisi belum login.

> Cookie ini hanya untuk lokal. Guard role tetap memanggil `GET /auth/me`; jangan dipakai di production.

## 5. Risiko / Hal yang Perlu Diperhatikan

- **Guard role** divalidasi di layout server `app/(app)` dan layout area (`users`, `klien`, `verifikasi`, `feedback`). Role salah diarahkan ke `/dashboard`.
- **proxy.ts** hanya memeriksa cookie pada route terlindungi; redirect role dilakukan server layout.
- **Dummy harus dibersihkan** (bagian 6) dan **jangan** dipakai di production.
- **Palet dark mode Admin masih usulan** (`design/admin/dark-mode.md`), belum
  ditinjau desainer.
- **Data statistik tab PT** di halaman Kelola Pengguna masih memakai angka klien
  (inkonsistensi desain, lihat `design/admin/kelola-pengguna.md`).

## 6. Daftar Dummy & Cara Pembersihan

Dummy yang tersisa: **`lib/mock/admin.ts`**.

| Hook | Fungsi | Endpoint pengganti (usulan) |
|---|---|---|
| `useAdminDashboard` | data dashboard | `GET /admin/dashboard-summary` |
| `useAdminUsers` | daftar klien + PT + statistik | `GET /admin/users?role=...&page=...` |
| `useCreateTrainer` | daftarkan PT | `POST /admin/users/pt` |
| `useDeleteUser` | hapus klien/PT | `DELETE /admin/users/:id` |
| `useAdminRiwayat` | log feedback + audit | `GET /admin/riwayat` |
| `useAdminProfile` | profil admin | `GET /admin/profile` |
| `useUpdateAdminProfile` | simpan data diri | `PUT /admin/profile` |
| `useUpdateAdminPassword` | ganti password | `PUT /admin/password` |

TODO integrasi tambahan yang belum punya hook:
- `app/(app)/layout.tsx` → validasi role via `GET /admin/profile` / `GET /auth/me`.
- `app/(app)/users/pt/[id]/edit/components/edit-trainer-form.tsx`:
  - `PUT /admin/users/:id`
  - `POST /admin/users/:id/force-reset-password`
  - `PUT /admin/users/:id/suspend`
- Preferensi tema Admin masih `localStorage`; endpoint `PUT /admin/theme`
  opsional bila ingin disimpan ke akun.

Langkah pembersihan:
1. Panggilan API sudah dipindah ke `services/`; hook hanya mengelola React Query.
2. Perluas `lib/query-keys.ts` agar menyimpan parameter filter/pagination.
3. Pastikan tidak ada komponen yang mengimpor `lib/mock/` langsung.
4. Hapus `lib/mock/admin.ts` (dan folder `lib/mock/` bila sudah kosong).
5. Hapus komentar TODO integrasi yang sudah selesai.
6. Dokumen struktur sudah diperbarui mengikuti refactor `app/(app)`, `types/`, dan `services/`.

## 7. Fitur yang Sengaja Belum Diimplementasikan

- **Edit Klien** — belum ada desain; tombol `Edit` di tabel klien masih
  placeholder tanpa aksi.
- **Tambah Klien** — open question produk; belum dibuat.
- **Filter/search tab Audit Admin** — ditunda sesuai keputusan desain.
- **Lupa kata sandi** — belum ada desain alur.
- **Notifikasi (bell)** — titik merah masih statis, belum ada dropdown/halaman.
- **Upload/ubah foto profil Admin** — tidak ada di desain.
- **Menu akun dari avatar topbar** — opsional, belum dibuat.

## 8. Testing

### 8.1 Baseline `dev` — 2026-10-25
- [x] `npm run lint` → 0 error
- [x] `npm run typecheck` → 0 error
- [x] `npm run build` → sukses (14 route bersih tanpa prefix `/pt` atau `/admin`)

### 8.2 Runtime Admin (dev server + curl) — 2026-10-25
- [x] `GET /dashboard` tanpa cookie → **307** `location: /login`
- [x] Dengan `cookie: token=dev`:
  - `/dashboard` → 200
  - `/users` dan `/users?tab=pt` → 200
  - `/riwayat` dan `/riwayat?tab=audit` → 200
  - `/profil` → 200
  - `/users/pt/1/edit` → 200
- [x] Log dev server bersih (tanpa error runtime)

### 8.3 Riwayat pengujian PT
Pengujian manual PT terdokumentasi di riwayat commit/PR sebelumnya. Setelah
integrasi backend PT, mode `dev-login` tidak dipakai lagi dan halamannya
menggunakan akun PT asli.
