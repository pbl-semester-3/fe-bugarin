# Figma Plugin — Bugarin Web App Replica

Plugin Figma untuk **membuat ulang tampilan web app Bugarin** ke Figma, mencakup:

- **App PT + Login**
- **Landing page**
- **Halaman Admin**
- **Dialog penting**
- Varian **Light** dan **Dark** untuk PT & Admin

Plugin bersifat **replika statis** (bukan sinkron live). Desain ditulis di source plugin, lalu di-bundle ke `code.js`.

> Figma REST API bersifat read-only, jadi desain dibuat lewat plugin ini (dijalankan di Figma Desktop), bukan lewat API.

---

## Cara menjalankan

1. Buka file Figma Anda di **Figma Desktop**.
2. Menu **Plugins → Development → Import plugin from manifest…**
3. Pilih file `design/figma-plugin/manifest.json`.
4. Jalankan **Plugins → Development → Bugarin Web App Replica**.
5. Plugin menghapus frame lama miliknya (berdasarkan nama) lalu membuat ulang semua frame di halaman **`UI Website PT`** (fallback ke halaman aktif).
6. Viewport otomatis zoom ke frame hasil generate.

> Setiap kali dijalankan ulang, posisi hasil rapikan manual akan ter-reset karena frame dibangun ulang. Jalankan sekali setelah desain final.

---

## Struktur file

| File | Peran |
|---|---|
| `plugin.source.js` | Token warna, helper, Login, halaman PT, `main()` |
| `screens.landing.js` | Landing page (satu frame tinggi) |
| `screens.admin.js` | Shell + halaman Admin + dialog |
| `bundle.mjs` | Menggabungkan ikon + aset + modul → `code.js` |
| `build-icons.mjs` | Generate `icons.generated.js` dari `lucide-react`, lalu bundle |
| `build-assets.mjs` | Konversi gambar (WebP→JPEG/PNG) + base64 → `assets.generated.js`, lalu bundle |
| `icons.generated.js` | Hasil generate ikon (jangan diedit manual) |
| `assets.generated.js` | Hasil generate gambar base64 (jangan diedit manual) |
| `code.js` | **Hasil bundle** yang dijalankan Figma (jangan diedit manual) |
| `manifest.json` | Entry point `code.js`, `networkAccess: ["none"]` |

---

## Build

```bash
# Regenerate ikon (lalu bundle otomatis)
node design/figma-plugin/build-icons.mjs

# Regenerate gambar (lalu bundle otomatis)
node design/figma-plugin/build-assets.mjs

# Hanya bundle ulang setelah mengubah plugin.source.js / modul layar
node design/figma-plugin/bundle.mjs
```

`manifest.json` menunjuk ke `code.js`, jadi setelah build cukup jalankan plugin lagi di Figma (re-import manifest bila Figma masih memakai cache lama).

---

## Daftar frame (43)

**PT (light + dark)**
`Dashboard`, `Verifikasi`, `Klien`, `Riwayat`, `Feedback`, `Feedback - Kosong`, `Profil`, `Detail Klien` — masing-masing `(Light)` dan `(Dark)`.

**Login**
`Login (Light)`.

**Landing**
`Landing Page (Light)` — satu frame halaman penuh (hero, about, cara kerja, masalah-solusi, app preview, FAQ, footer).

**Admin (light + dark)**
`Admin Dashboard`, `Admin Kelola Pengguna - Klien`, `Admin Kelola Pengguna - PT`, `Admin Riwayat - PT`, `Admin Riwayat - Audit`, `Admin Riwayat - Request Log`, `Admin Profil - Info`, `Admin Profil - Keamanan`, `Admin Edit PT`.

**Dialog (light)**
`Dialog - Tolak Verifikasi`, `Dialog - Override Plan`, `Dialog - Daftar PT`, `Dialog - Detail Klien`, `Dialog - Hapus Akun`, `Dialog - Detail Feedback`, `Dialog - Ganti Password`.

---

## Gambar & aset

- Semua gambar landing di-embed sebagai base64 di `code.js` (tidak ada `fetch`).
- `build-assets.mjs` memakai `sharp` untuk resize + kompres:
  - WebP → JPEG (kualitas 66–74), logo PNG transparan.
  - Lebar target: hero 1728, about/problem/solution 760, faq 560, mobile 320, login 900, logo 256.
- `figma.createImage` hanya mendukung PNG/JPEG/GIF dan maksimal 4096px, karena itu konversi dilakukan saat build.

## Font

Plugin memakai **Plus Jakarta Sans** (sesuai web app). Bila belum terpasang di Figma, plugin fallback ke **Inter** dan memberi tahu lewat pesan setelah selesai (`Font: Inter (fallback)...`).

## Batasan

- Ini manual mapping: perubahan UI web berikutnya harus diperbarui di source plugin lalu di-build ulang.
- Data dinamis (nama, jumlah, foto) memakai placeholder statis; avatar memakai inisial.
- Dark mode berbasis pemetaan token (pendekatan), tidak pixel-perfect.
