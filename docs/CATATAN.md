# CATATAN — Mode Dummy Frontend untuk Slicing UI (PT & Admin)

Dokumen ini mencatat pemakaian **data dummy** di sisi frontend saat menyiapkan
halaman role **PT** dan **Admin** dari desain Figma. Dokumen ini menjadi
rujukan agar pembersihan dummy dan pekerjaan lanjutan tidak terlewat.

---

## 1. Konteks & Tujuan

- Fondasi frontend (Next.js 16 App Router, tema shadcn, TanStack Query, guard)
  sudah selesai.
- **Web PT** sudah diintegrasikan ke backend asli untuk sebagian besar halaman.
- **Web Admin** sudah selesai di-slicing (UI) tetapi **seluruh datanya masih
  dummy**. Autentikasi admin dan integrasi endpoint `/admin/*` belum dikerjakan.
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
2. **Halaman Admin memakai dummy**; tipe data di `lib/types/admin.ts` dibuat
   mendekati kontrak API agar mudah diganti.
3. **Tema Admin** disimpan di `localStorage` (`bugarin-admin-theme`) lewat
   `hooks/useAdminTheme.ts`; atribut `data-theme` hanya diterapkan di rute
   `/admin` agar tidak memengaruhi halaman PT.
4. **Auth/role guard belum nyata.** `app/admin/layout.tsx` dan
   `app/pt/layout.tsx` masih mengembalikan role tetap selama cookie `token`
   ada. `proxy.ts` hanya mengecek keberadaan cookie.
5. **`/dev-login` sudah dihapus** dari repo. Untuk melihat UI Admin sekarang,
   gunakan cookie lokal (bagian 4).

## 4. Cara Menjalankan Mode Slicing Admin

1. Jalankan `npm run dev`.
2. Login normal belum bisa untuk Admin (form login masih menolak role selain
   `pt`).
3. Buka DevTools → Console di `http://localhost:3000`, lalu set cookie lokal:

   ```js
   document.cookie = "token=dev; path=/";
   ```

4. Buka `http://localhost:3000/admin/dashboard` (atau menu Admin lain).
5. Hapus cookie dengan `document.cookie = "token=; path=/; max-age=0"` untuk
   kembali ke kondisi belum login.

> Cookie ini **hanya untuk lokal**, tidak httpOnly, dan menembus `/pt/*` maupun
> `/admin/*` karena guard masih hardcode. Jangan dipakai di production.

## 5. Risiko / Hal yang Perlu Diperhatikan

- **`getRole()` masih hardcode.** Admin/PT bisa saling menembus halaman selama
  cookie `token` ada. Wajib diperbaiki bersama auth nyata (butuh `GET
  /auth/me` atau profile per role dari backend).
- **Login Admin belum di-wire.** `app/(auth)/login/page.tsx` baru mengarahkan
  role `pt`; role `admin` masih menampilkan pesan bahwa halaman untuk PT.
- **`proxy.ts`** mengarahkan semua user yang sudah login dan membuka `/login` ke
  `/pt/dashboard`, termasuk admin.
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
- `app/admin/layout.tsx` → validasi role via `GET /admin/profile` / `GET /auth/me`.
- `components/admin/users/edit-trainer-form.tsx`:
  - `PUT /admin/users/:id`
  - `POST /admin/users/:id/force-reset-password`
  - `PUT /admin/users/:id/suspend`
- Preferensi tema Admin masih `localStorage`; endpoint `PUT /admin/theme`
  opsional bila ingin disimpan ke akun.

Langkah pembersihan:
1. Ganti `queryFn`/`mutationFn` di tiap hook ke panggilan `api` (TODO sudah
   ditandai di masing-masing file).
2. Perluas `lib/query-keys.ts` agar menyimpan parameter filter/pagination.
3. Pastikan tidak ada komponen yang mengimpor `lib/mock/` langsung.
4. Hapus `lib/mock/admin.ts` (dan folder `lib/mock/` bila sudah kosong).
5. Hapus komentar TODO integrasi yang sudah selesai.
6. Update dokumen ini dan `docs/Bugarin_PRD_Frontend.md` setelah integrasi.

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
- [x] `npm run build` → sukses (14 route, termasuk seluruh `/admin/*`)

### 8.2 Runtime Admin (dev server + curl) — 2026-10-25
- [x] `GET /admin/dashboard` tanpa cookie → **307** `location: /login`
- [x] Dengan `cookie: token=dev`:
  - `/admin/dashboard` → 200
  - `/admin/users` dan `/admin/users?tab=pt` → 200
  - `/admin/riwayat` dan `/admin/riwayat?tab=audit` → 200
  - `/admin/profil` → 200
  - `/admin/users/pt/1/edit` → 200
- [x] Log dev server bersih (tanpa error runtime)

### 8.3 Riwayat pengujian PT
Pengujian manual PT terdokumentasi di riwayat commit/PR sebelumnya. Setelah
integrasi backend PT, mode `dev-login` tidak dipakai lagi dan halamannya
menggunakan akun PT asli.
