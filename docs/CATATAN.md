# CATATAN — Mode Dummy Frontend (PT) untuk Slicing UI

Dokumen ini mencatat proses pemakaian **data dummy** di sisi frontend, khususnya
saat menyiapkan halaman role **PT** untuk kebutuhan slicing dari Figma sebelum
autentikasi dan integrasi backend siap. Dokumen ini menjadi bukti/rujukan agar
pembersihan nanti tidak terlewat.

---

## 1. Konteks & Tujuan

- Fondasi frontend (Next.js 16 App Router, tema shadcn, TanStack Query, guard)
  sudah selesai.
- Backend **belum** menyediakan sebagian besar endpoint PT (lihat bagian 6), dan
  **belum ada akun PT/Admin** (registrasi backend hanya untuk klien; seed hanya
  mengisi master data).
- Karena itu halaman PT dibangun lebih dulu dengan **data dummy** + shell/nav
  agar rekan slicing bisa mulai bekerja tanpa menunggu auth maupun backend.

## 2. Branch Kerja

- `feat/fondasi-ui-pt-slicing` (dari `dev`).

## 3. Keputusan Arsitektur

1. **Opsi B — dev auth helper, guard produksi tidak disentuh.** Akses halaman
   `/pt/*` saat slicing dilakukan dengan cookie `token=dev` yang di-set dari
   halaman `/dev-login`. File `proxy.ts` dan logika `getRole()`/redirect di
   `app/pt/layout.tsx` **tidak diubah**.
2. **Login = UI dulu.** Form login mengikuti kontrak backend
   (`{ emailOrUsername, password }`), tetapi submit belum di-wire
   (`TODO` integrasi).
3. **Data dummy diisolasi** di `lib/mock/` dan hanya diakses lewat hook adaptor.
4. **PT lebih dulu**, Admin menyusul.
5. **Halaman contoh penuh:** `/pt/verifikasi` sebagai blueprint pola
   (Table + Dialog + mutation + status badge).

## 4. Cara Menjalankan Mode Slicing

1. Jalankan `npm run dev`.
2. Buka `http://localhost:3000/dev-login`.
3. Klik **"Masuk sebagai PT (dev)"** → cookie `token=dev` di-set (berlaku 7 hari,
   lokal saja) → diarahkan ke `/pt/dashboard`.
4. Navigasi antar halaman PT lewat sidebar atau ketik URL langsung.

> Catatan: guard yang ada hanya mengecek **keberadaan** cookie `token` (role
> masih hardcode per grup), sehingga `token=dev` cukup untuk membuka `/pt/*`.
> Cookie ini juga akan membuka `/admin/*` (lihat risiko di bagian 5).

## 5. Risiko / Hal yang Perlu Diperhatikan

- **`/dev-login` harus dihapus** saat auth asli sudah terpasang. File ini
  ter-commit, jadi akan tercatat di riwayat git walau nanti dihapus.
- **`getRole()` masih hardcode.** `app/pt/layout.tsx` dan `app/admin/layout.tsx`
  mengembalikan role tetap selama cookie `token` ada, sehingga `token=dev` bisa
  menembus `/admin` juga. Ini **belum** diubah pada sesi ini dan wajib
  diperbaiki bersamaan dengan auth nyata (butuh endpoint `GET /auth/me` atau
  profile PT/Admin dari backend).
- **Dummy harus dibersihkan** (bagian 6) dan **jangan** dipakai di production.
- Cookie dev **tidak** httpOnly (di-set lewat JS); hanya untuk lokal.

## 6. Daftar Dummy & Cara Pembersihan

Dummy: `lib/mock/pt.ts` (`mockPairingRequests`, `mockDashboardSummary`,
`tujuanLabel`).

Untuk kembali ke data asli:
1. Ganti `queryFn`/`mutationFn` di hook ke panggilan `api` (sudah ditandai
   `TODO` di tiap hook):
   - `hooks/usePtDashboard.ts` → `GET /pt/dashboard-summary`
   - `hooks/usePairingRequests.ts` → `GET /pt/pairing-requests`,
     `PUT /pt/pairing-requests/:id`
2. Pastikan tidak ada komponen yang mengimpor `lib/mock/` langsung.
3. Hapus folder `lib/mock/`.
4. Hapus halaman `app/dev-login/` (setelah auth asli siap).

## 7. Out of Scope (Sesi Ini)

- Shell & halaman Admin.
- Auth nyata (submit login, logout, sesi).
- Integrasi backend.
- Grafik BB (Recharts) di detail klien.
- Perbaikan pemisahan role PT vs Admin.
- ThemeProvider (toggle tema dari data profil).

## 8. Testing

### 8.1 Otomatis + runtime (agent) — 2026-10-01
- [x] `npm run lint` → 0 error
- [x] `npm run typecheck` → 0 error
- [x] `npm run build` → sukses (12 route ter-generate, termasuk seluruh `/pt/*`)
- [x] Runtime (dev server + curl):
  - `GET /dev-login` → **200** (di luar matcher `proxy.ts`)
  - `GET /pt/dashboard` **tanpa cookie** → **307** `location: /login`
  - `GET /pt/dashboard` dengan `--cookie token=dev` → **200**
  - `GET /pt/verifikasi` dengan `token=dev` → **200**
  - `GET /pt/klien/5` dengan `token=dev` → **200**
  - `dev.log` bersih; `proxy.ts` ikut dieksekusi pada route `/pt/*`

### 8.2 Manual (pemilik repo) — 2026-10-01 — **HASIL: LOLOS SEMUA**
Langkah yang dijalankan dan hasilnya:
1. **Guard tanpa login** — `/pt/dashboard` di Incognito → redirect `/login`; `/login` tampil 200 tanpa redirect loop. ✅
2. **Dev helper** — `/dev-login` → klik "Masuk sebagai PT (dev)" → masuk `/pt/dashboard`; cookie `token=dev` terlihat di DevTools; setelah cookie dihapus → kembali redirect ke `/login`. ✅
3. **Shell & navigasi** — sidebar (Dashboard, Verifikasi, Klien, Riwayat, Feedback, Profil) tampil; active state berpindah sesuai halaman; Console browser bersih (tanpa `No QueryClient set`). ✅
4. **Dashboard dummy** — card "Klien Aktif" = 8; tabel "Jadwal Latihan Minggu Ini" terisi 3 baris. ✅
5. **Verifikasi** — tabel 3 request dummy; aksi Terima tanpa error; dialog Tolak disabled saat alasan kosong, aktif setelah diisi; animasi buka/tutup dialog jalan. ✅
6. **Placeholder** — `/pt/klien`, `/pt/riwayat`, `/pt/feedback`, `/pt/profil`, `/pt/klien/5` semua 200. ✅
7. **Login UI** — validasi Zod muncul saat field kosong; submit menampilkan pesan TODO (expected, belum wiring backend). ✅
8. **Dark mode** — toggle class `.dark` mengganti warna background/teks; ring fokus input tampil di mode terang & gelap. ✅

Catatan pemilik repo: seluruh pengujian manual berjalan sesuai harapan.

