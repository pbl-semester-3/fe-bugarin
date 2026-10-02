# KLIEN.md — Bugarin PT Platform

Spesifikasi layout halaman **Klien** (`Client ` di Figma). Token warna, font, dan komponen global mengacu ke `DESIGN_PT.md`. Angka di bawah diambil dari panel Inspect Figma (frame **1728 × 1117**, node `162:681`).

> Lebar area konten (di luar sidebar): **1424 px**. Frame 1728 = sidebar **256** + border + padding konten **24** kiri/kanan.

---

## 1. Struktur halaman

```
[Header judul: "Active Client" + badge "24 Tracked"]
[Filter & Telemetry Bar: search + chip + segmented + dropdown status]
[Grid kartu klien — 3 kolom × 2 baris]
[Section Telemetry Footnote Stats (kosong)]
[Table Footer / Pagination Deck]
```

Urutan vertikal, lebar tiap blok **Fill 1424 px**. `Main` punya padding `top 64, left/right 24, bottom 166`.

---

## 2. Header judul

- `Header Action & Overview Bar` (auto layout horizontal, H Hug 36):
  - **Judul** "Active Client": Plus Jakarta Sans **ExtraBold 40px**, `line height` 36, `letter spacing` **-0.56px**, `fill` `#181B25` (`--ink`).
  - **Badge "24 Tracked"**: pill (`radius 9999`), `fill` `#E5E8F5` (`--surface-3`), `padding` 2/10, teks **10px / 700** `#464555` (`--ink-soft`), `letter spacing` 0.4.

> Ukuran judul 40/ExtraBold ini mengonfirmasi pola yang dicatat di `VERIFIKASI.md` §2 — semua judul halaman PT memakai skala ini, bukan "30/700" di tabel awal `DESIGN_PT.md` §3.

---

## 3. Filter & Telemetry Bar

- Container: auto layout horizontal, W **Fill 1424** × H **70**, `radius` **16**, `fill` putih, `padding` **16** semua sisi, `gap` **16**, `justify` **SPACE_BETWEEN**, `align` CENTER.

### 3.1 Search input

- `Input`: W **576** × H **38**, `radius` **9999** (pill), `fill` `#F1F3FF` (`--surface-tint`), `padding` atas 11 / kanan 96 / bawah 12 / kiri 44 (ruang ikon kiri).
- Ikon kaca pembesar **15×10** `#777587` di kiri (`x 2752`).
- Placeholder: "Search athlete by name, email, or protocol..." — **12px / 400**, `--muted`.

### 3.2 Filter Controls Chips

Auto layout horizontal, `gap` **4**, align CENTER.

| Elemen | Fill | Teks | Ukuran teks | Padding | Radius |
|---|---|---|---|---|---|
| "All (24)" **(aktif)** | `#F69665` (`--secondary`) | `#FFFFFF` | 12 / 700, ls 0.24 | 6/16 | 9999 |
| "Hypertrophy" | `#F1F3FF` | `#464555` | 12 / 500 | 6/16 | 9999 |
| "Weight Loss" | `#F1F3FF` | `#464555` | 12 / 500 | 6/16 | 9999 |
| Divider | `#E5E8F5` 1×24 | — | — | margin 0/4 | — |
| "Status: Active" ⌄ | `#F1F3FF` | `#464555` | 12 / 600 | 6/16, gap 4 | 9999 |

- Chip "Status: Active" punya ikon filter (12×12) di kiri dan chevron (8×5) di kanan, keduanya `#464555`.

---

## 4. Grid kartu klien

- Grid **3 kolom**, W **Fill 1424** × H **620**.
- Ukuran kartu: **459 × 288** (beberapa kartu 298 karena konten), `radius` **16**, `fill` putih, `padding` **24**.
- Gap: horizontal **24**; vertikal terlihat **≈ 32–34** (perlu dikonfirmasi, karena tinggi kartu bervariasi).

### 4.1 Isi kartu (atas → bawah)

1. **Card Top Bar** (W 411 × H 56, `gap` 16, SPACE_BETWEEN):
   - Kiri (`gap` 16, align CENTER): **avatar kotak 56×56** `radius 16` (foto) + blok teks:
     - Nama: **18px / 800**, `#181B25`, `line height` 24.
     - Email: **12px / 400**, `#777587`, `line height` 18.
   - Kanan (`gap` 4): dua tombol ikon pill — tombol chat **31×32** dan kebab **19×29**, ikon `#464555`.
2. **Protocol Badge Ribbon** (H 22): badge pill `#F1F3FF`, `padding` 4/10, `gap` 4, ikon `#464555` + teks tanggal **10px / 600** `#464555`, ls 0.4. Contoh: "Started Aug 12".
3. **Telemetry & Compliance Gauge Box** (W 411 × H 70, `radius` 12, `fill` `#F1F3FF` @70%, `padding` 16):
   - Overline "SESSION SLOT": **10px / 700**, `#777587`, ls 0.5.
   - Nilai: ikon jam **13×13** `#006C47` (`--success`) + teks **14px / 700** `#181B25`, ls 0.14. Contoh: "Today 9:30 AM". `gap` 4.
4. **Card Footer Action**:
   - `Link`: W 411 × H 40, `radius` **12**, `fill` `#E5E8F5` (`--surface-3`), `padding` 10/16, `gap` 4, align CENTER.
   - Teks "View Full Profile & Program": **14px / 700** `#181B25`, ls 0.14 + ikon panah **11×11** `#181B25`.

### 4.2 Data contoh (6 kartu)

| # | Nama | Email | Started | Session Slot |
|---|---|---|---|---|
| 1 | Marcus Sterling | marcus.s@lumina.io | Aug 12 | Today 9:30 AM |
| 2 | Sarah Jenkins | sarah.j@vertex.net | Sep 01 | Tomorrow 8:00 AM |
| 3 | Elena Rostova | elena.rostova@cyberpost.org | Jul 15 | Today 11:15 AM |
| 4 | Steve henderson * | steve.s@lumina.io | Aug 12 | Today 8:20 AM |
| 5 | Chloe Bennett | chloe.b@aurahealth.com | Jun 04 | Today 4:30 PM |
| 6 | Jordan Hayes | jordan.h@kinetic.run | Sep 18 | Friday 10:00 AM |

\* Kartu ke-4 diberi nama layer "Article - CLIENT 1: Marcus Sterling" tapi isinya **Steve henderson** — kemungkinan sisa copy-paste.

### 4.3 Empty state saat filter = 0 klien

Mengikuti persis pola **"0 pending"** di `VERIFIKASI.md` §6 (komponen `EmptyState`, ikon besar ≈48px, judul 20px/600, deskripsi `--ink-soft`, rata tengah di area konten di bawah toolbar).

- **Tidak ada klien sama sekali:**
  - Ikon: hourglass (sama seperti Verifikasi).
  - Judul: "Belum ada klien terdaftar".
  - Deskripsi: "Klien yang kamu tangani akan muncul di sini setelah mereka terhubung."
- **Ada klien tapi hasil filter/pencarian kosong:**
  - Ikon: hourglass.
  - Judul: "Tidak ada klien yang cocok".
  - Deskripsi: "Coba ubah kata kunci atau filter."

> Empty state menggantikan grid kartu (§4). Pagination deck (§5) ikut disembunyikan saat daftar kosong.

---

## 5. Table Footer / Pagination Deck

- Container: W Fill 1424 × H 76, `fill` `#F9F9FF` (`--surface-alt`), `padding` kanan 16 / bawah 16 / kiri 16, `justify` SPACE_BETWEEN, align CENTER.
- **Kiri:** teks "Menampilkan 1 - 6 dari 24 Klien terdaftar" — **12px / 400**, `fill` `#5A5E69`, font **Plus Jakarta Sans** (final; di Figma sempat salah terbaca **Inter**).
- **Kanan:** `Pagination Buttons` (`gap` 4):
  - Prev / Next: 25×25 & 22×25, `radius` 8, `fill` `#EFF4FF`, ikon `#727A68`.
  - Nomor halaman: "1" **(aktif)** 32×32 `radius` 8 `fill` `#7DC04E`, teks `#214C00` 12/700; "2", "4" 32×32 tanpa fill, teks `#0B1C30` 12/600; "…" ellipsis 21×3.

---

## 6. Header (global)

- W 1470 × H 64, `fill` `#FFFFFF` @80%, `padding` kanan 24.
- Grup kanan (W 81 × H 35, `gap` 16): tombol **bulan** 29×35 (pill), tombol **lonceng** dengan titik notifikasi **8×8** `#A2361B`, **avatar** 32×32 pill (foto).
- Catatan: tidak ada field pencarian/teks lain di header.

---

## 7. Sidebar (Aside)

- W **256**, H penuh, `fill` `#2C303A` (`--sidebar`), auto layout vertikal `SPACE_BETWEEN`.
- **Brand** (256×64, `padding` kanan 16): "Bugarin" **18px / 700** putih, ls -0.45; "PT PLATFORM" **10px / 600** `#82F9BE` (`--success-container`), ls 0.5.
- **Nav** (256×237, `padding` kanan/kiri 8, `gap` 4):
  - Item: 240×36, `radius` **12**, `padding` 8/16. Ikon 15–20 px + label **14px / 600**, ls 0.14.
  - Default: ikon/teks `#C7C4D8` (`--outline`).
  - **Aktif: `fill` `#7DC04E` (`--primary`), ikon & teks putih.** (Di halaman ini: **Klien**.)
  - Urutan: Dashboard · Verifikasi · Klien · Riwayat · Feedback · Profil.
- **User card** (256×130, `padding` 16, `gap` 8): kotak `fill` `#DFE2EF` @10%, `radius` 12, `padding` 16 → "Alex Vance" 14/700 putih + "Performance Coach" 12/400 `#C7C4D8`.
- **Exit**: ikon 12×12 + teks "Exit" **12px / 600** `#FF6C6C` (`--danger`), ls 0.24.

> Catatan: label menu final adalah **"Klien"** (bukan "Klient" yang tertulis di Figma). Implementasi `components/shell/pt-shell.tsx` sudah memakai "Klien".

---

## 8. Hal yang perlu dikonfirmasi

1. **Gap vertikal grid** kartu (terbaca ≈ 32–34, kartu lain 24) — pastikan angka grid final.
2. **Kartu "Article - CLIENT 1" ke-4** berisi "Steve henderson" — sisa copy-paste, perlu dirapikan.
3. **Tinggi kartu tidak konsisten** (288 vs 298) — apakah kartu harus sama tinggi (mis. `hug` seragam) atau memang mengikuti konten?
4. **`Section - Telemetry Footnote Stats`** (1424×24) kosong di Figma — apakah placeholder atau memang tidak dipakai?
5. **Loading state** belum ada desain.

### Sudah diputuskan

- ✅ **Label menu: "Klien"** (bukan "Klient"/"Clients").
- ✅ **Font footer pagination: Plus Jakarta Sans** (Figma sempat memakai Inter; dianggap lupa diganti).
- ✅ **Hasil filter (0 klien): empty state** mengikuti pola "0 pending" (§4.3, sama seperti `VERIFIKASI.md` §6).
