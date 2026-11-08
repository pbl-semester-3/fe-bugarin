# LOGIN.md — Bugarin PT Platform

Spesifikasi layout halaman **Login**. Token warna, font, dan komponen global mengacu ke `DESIGN.md`.

> Frame: **1728 × 1117**. Halaman ini tidak pakai app shell (sidebar/header) — murni split-screen.

---

## 1. Struktur halaman

```
┌──────────────────┬──────────────────────┐
│                   │                      │
│   Foto (full      │   Form (center,      │
│   bleed, 831px)   │   897px, bg tint)    │
│                   │                      │
└──────────────────┴──────────────────────┘
```

- **Panel kiri (foto):** lebar **831 px** (= 1728 − 897), tinggi penuh 1117 px, `object-fit: cover`, tanpa padding.
- **Panel kanan (form):** `X` mulai di **831**, lebar **897 px**, tinggi penuh 1117 px. `Corner radius`: Mixed (kemungkinan hanya sudut tertentu dibulatkan, misal kiri-atas/kiri-bawah — cek langsung di Figma kalau perlu presisi). `Fill`: `#F1F3FF` (`--surface-tint`).

---

## 2. Form (dalam panel kanan)

Form **tidak full-width** terhadap panel kanan — lebar elemen form tetap **482 px**, diposisikan di tengah secara horizontal dan vertikal.

- Lebar panel kanan 897, lebar form 482 → padding kiri-kanan ≈ **208 px** masing-masing sisi (form dipusatkan).

### Urutan & jarak vertikal (dari posisi X/Y tiap elemen)

| Elemen | Posisi Y | Tinggi | Jarak dari elemen sebelumnya |
|---|---|---|---|
| Judul "Welcome Back, Coach" | 344 | 34 | — |
| Label "Email Address" | 423 | 19 | **45 px** dari bawah judul |
| Input Email | 454 | 45 | **12 px** dari bawah label |
| Label "Password" | ≈523* | 19 | **≈24 px** dari bawah input Email (pola antar-section) |
| Input Password | ≈554* | 45 | **12 px** dari bawah label (pola sama dengan Email) |
| Tombol Sign In | 612 | 40 | **≈13 px** dari bawah input Password |

\* Posisi Password tidak ter-capture langsung di Inspect (belum di-select saat screenshot), dihitung dari pola spacing Email + jarak ke tombol Sign In yang memang pas (612 − 599 ≈ 13). Kalau mau angka pasti, select label & input Password di Figma lalu kirim Inspect-nya.

### Detail tiap elemen

**Judul "Welcome Back, Coach"**
- `Resizing`: fixed, **W 473 × H 34**.
- Font: Plus Jakarta Sans **ExtraBold 40px**, `line height` 18 (⚠️ ganjil — lebih kecil dari font-size 40, kemungkinan salah baca di Inspect atau memang auto/compressed; cek langsung di Figma), `letter spacing` 0px.
- `Fill`: `#000000` (bukan `--ink` `#181B25` seperti di halaman lain — pakai hitam murni di sini).

**Label "Email Address"**
- `Resizing`: Hug, **W 139 × H 19**.
- Font: Plus Jakarta Sans **Regular 20px**, `line height` 20, `letter spacing` 0px, `fill` `#000000`.

**Input Email**
- Auto layout horizontal, `Dimensions` **W 482 × H 45**, `Clip content` ✓.
- `Corner radius`: **10** (bukan 8 seperti token default `--radius-control` di DESIGN.md — di Login lebih besar).
- `Fill`: putih `#FFFFFF`.

**Input Password** — struktur sama dengan Input Email (W482 × H45, radius 10, fill putih), ditambah ikon mata di kanan.

**Link "Forgot Password?"** — sejajar vertikal dengan label "Password", rata kanan terhadap lebar form (482px). Belum ada data ukuran font pasti.

**Tombol Sign In**
- Auto layout horizontal, `Dimensions` **W 482 × H 40**, `Clip content` ✓.
- `Corner radius`: **10**.
- `Fill`: `#7DC04E` (`--primary`).
- Teks "Sign In" putih, center.

---

## 3. Hal yang perlu dikonfirmasi

1. **Line height judul** terbaca 18 di panel Typography — ganjil untuk font 40px. Tolong cek langsung di Figma, kemungkinan nilai sebenarnya beda (misal 48 atau "Auto").
2. **Posisi label & input Password** memakai estimasi dari pola, bukan data Inspect langsung — kirim screenshot Inspect-nya kalau butuh angka pasti.
3. **Warna teks judul & label** di halaman ini `#000000` (hitam murni), beda dari `--ink` (`#181B25`) yang dipakai di halaman lain. Perlu dipastikan apakah ini sengaja beda khusus untuk Login, atau sebaiknya disamakan ke `--ink` supaya konsisten satu sistem warna.
4. **Corner radius 10** pada input & tombol Login beda dari token global `--radius-control: 8px` di DESIGN.md. Perlu diputuskan: Login memang pakai radius lebih besar (10), atau token globalnya yang perlu diubah ke 10 supaya konsisten di semua halaman.

Kirim halaman berikutnya kapan saja.
