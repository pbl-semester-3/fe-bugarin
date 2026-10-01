# VERIFIKASI.md — Bugarin PT Platform

Spesifikasi layout halaman **Verifikasi**, state kosong (belum ada pengajuan). Token warna, font, dan komponen global mengacu ke `DESIGN.md`.

> Lebar area konten: **1439 px** Fill (sedikit beda dari Dashboard 1424 — kemungkinan karena halaman ini tidak punya scrollbar aktif saat kosong, bukan perbedaan sengaja; cek lagi kalau isi sudah ada datanya).

---

## 1. Struktur halaman

```
[Judul + subtitle]
[Toolbar: search bar + chip "All Pending (0)"]
[Empty state, di tengah area konten]
```

---

## 2. Judul & subtitle

- **Judul** "Pending Intake & Onboarding Queue": `Resizing` Hug × Hug, font **Plus Jakarta Sans ExtraBold 40px**, `line height` 36, `letter spacing` **-0.7px**, `fill` `#181B25` (`--ink`).
- **Subtitle** "Tinjau penilaian awal calon klien serta tujuan atletik yang menunggu persetujuan atau penolakan sebelum penyusunan jadwal periodisasi.": `Resizing` Fill lebar (≈1271) × Hug, font **Plus Jakarta Sans Regular 20px**, `line height` 20, `letter spacing` 0, `fill` `#464555` (`--ink-soft`).

> ⚠️ **Perlu dicek:** angka ukuran ini (judul 40/ExtraBold, subtitle 20/Regular) lebih besar dari asumsi tabel tipografi di `DESIGN.md` §3 ("Page title" ≈30px, "Caption" ≈12px). Kemungkinan pola sebenarnya: **semua judul halaman pakai 40/ExtraBold** seperti Login, dan subtitle deskripsi pakai 20/Regular — bukan skala terpisah untuk "page title" vs "display". Aku belum update `DESIGN.md` karena belum ada data Inspect untuk judul halaman lain (Klien, Riwayat, dst). Kabari kalau pola ini juga berlaku di halaman lain supaya aku revisi tabel tipografinya sekalian.

---

## 3. Toolbar (search bar + chip)

- Container: auto layout **horizontal**, `Resizing` W **Fill 1439** × H **Hug** (≈84).
- `Padding`: 0 / 8 (dua sisi terbaca dari panel — kemungkinan atas-bawah 0, kiri-kanan 8, atau sebaliknya; perlu dicek langsung di Figma karena ikon padding individual tidak sepenuhnya terbaca di screenshot).
- `Gap`: tercatat 0 di panel, tapi secara visual ada jarak antara search bar dan chip — kemungkinan gap diatur lewat elemen lain (bukan gap container ini) atau terpotong saat screenshot. **Perlu verifikasi langsung.**
- `Corner radius`: 0, tanpa `fill` (transparan — search bar dan chip yang masing-masing punya background sendiri).
- Isi:
  - **Search bar**: pill, `fill` `surface-tint`/`FEFAFF`, ikon kaca pembesar kiri, ikon filter kanan, placeholder kosong di state ini.
  - **Chip "All Pending (0)"**: pill, `fill` `secondary` (`#F69665`), teks putih — mengikuti pola chip aktif di DESIGN.md §6.

---

## 4. Empty state

Belum ada data Inspect persis untuk bagian ini (ikon dan teks tidak di-select di screenshot), jadi mengikuti deskripsi visual seperti di `DESIGN.md` §7.3:

- Posisi: di tengah (horizontal & vertikal) sisa area konten di bawah toolbar.
- **Ikon**: hourglass + centang, hitam, ukuran besar (≈48–56px).
- **Judul**: "Semua pengajuan sudah diproses" — lebih tebal/besar dari deskripsi di bawahnya (perkiraan 16–18px/600).
- **Deskripsi** (2 baris, rata tengah): "Belum ada pendaftar baru saat ini. Notifikasi otomatis akan muncul di sini begitu ada calon klien mendaftar." — `--ink-soft` atau `--muted`.
- Jarak ikon ke judul dan judul ke deskripsi: spasi vertikal konsisten (≈16–20px), belum ada angka pasti.

> Kalau kamu select ikon dan teks empty state-nya langsung di Figma lalu kirim screenshot Inspect-nya, aku bisa isi angka pastinya di sini.

---

## 5. Hal yang perlu dikonfirmasi

1. Lebar konten **1439** di halaman ini vs **1424** di Dashboard — perlu dipastikan apakah memang beda atau cuma selisih pembulatan saat ukur.
2. Skala tipografi judul/subtitle (lihat kotak peringatan §2) — mohon konfirmasi supaya `DESIGN.md` bisa diperbarui sekali jalan untuk semua halaman.
3. Padding dan gap toolbar (§3) — perlu angka pasti dari Inspect langsung di elemen search bar dan chip-nya (bukan cuma container-nya).

Kirim halaman berikutnya kapan saja.
