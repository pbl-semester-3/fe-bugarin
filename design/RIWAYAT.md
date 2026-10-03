# RIWAYAT.md — Bugarin PT Platform

Spesifikasi layout halaman **Riwayat**. Token warna, font, dan komponen global mengacu ke `DESIGN_PT.md`. Angka diambil dari panel Inspect Figma (frame **1728 × 1117**, node `162:1680`).

> Lebar area konten: **1424 px**. `Main` padding `top 64, left/right 24, bottom 205`.

---

## 1. Struktur halaman

```
[Top Ambient Halo (dekorasi)]
[Header judul: "Client Progress & Biometrics" + badge "24 Tracked"]
[Filter & Command Toolbar: segmented goal + segmented gender]
[Kartu "Athletic Progress Matrix" — tabel 5 kolom, 6 baris]
```

---

## 2. Header judul

- **Judul** "Client Progress & Biometrics": Plus Jakarta Sans **ExtraBold 40px**, `line height` 36, `letter spacing` **-0.56px**, `fill` `#181B25`.
- **Badge "24 Tracked"**: pill `#E5E8F5`, `padding` 2/10, teks **10px / 700** `#464555`, ls 0.4.
- `Top Ambient Halo` (1424×0) — elemen dekoratif glow, praktis tidak terlihat.

---

## 3. Filter & Command Toolbar

- Container: W **Fill 1424** × H **68**, `radius` **12**, `fill` putih, `padding` **16**, `justify` SPACE_BETWEEN, align CENTER.

### 3.1 Segmented Filter Goal

- Wadah: pill 351×36, `radius` 9999, `fill` `#F1F3FF`, `padding` 4, `gap` 4.

| Elemen | Fill | Teks |
|---|---|---|
| "All Goals" **(aktif)** | `#F69665` | putih, 12 / 600, ls 0.24 |
| "Weight Loss" | transparan | `#464555`, 12 / 600 |
| "Hypertrophy / Bulk" | transparan | `#464555`, 12 / 600 |

### 3.2 Segmented Filter Gender

- Wadah: pill 175×36, `radius` 9999, `fill` `#F1F3FF`, `padding` 4, `gap` 4.

| Elemen | Fill | Teks |
|---|---|---|
| "All" **(aktif)** | `#FFFFFF` | `#181B25`, 12 / 600 |
| "Female" | transparan | `#464555`, 12 / 600 |
| "Male" | transparan | `#464555`, 12 / 600 |

> Pada segmented gender, item aktif berwarna **putih** (bukan oranye seperti filter goal) — mengikuti pola di `DESIGN_PT.md` §6.

---

## 4. Kartu "Athletic Progress Matrix"

- Container: W Fill 1424 × H 507, `radius` **12**, `fill` putih.
- **Card title**: "Athletic Progress Matrix" — **18px / 600** `#181B25`, `line height` 24, `padding` 16.

### 4.1 Header tabel

- Baris H **38**; tiap `Cell` `padding` 12/16; teks **overline 10px / 700** `#777587`, ls 0.5.

| Kolom | Lebar | Isi |
|---|---|---|
| CLIENT PROFILE | 268 | nama + sub-info |
| TARGET VECTOR | 171 | badge goal |
| BB AWAL | 159 | berat awal |
| BB SEKARANG | 214 | berat sekarang |
| NET DELTA | 164 | badge selisih |

### 4.2 Baris data

- Tinggi baris **68–70**, `padding` kiri 16.

**Client Profile** (gap 8, align CENTER):
- Avatar bulat **40×40** + titik status hijau **10×10** `#006C47` di pojok kanan-bawah.
- Nama: **14px / 700** `#181B25`, `line height` 20, ls 0.14.
- Sub: "Age 29 • Tier Elite" — **10px / 700** `#777587`, ls 0.4.

**Target Vector** — badge pill, `padding` 3/10:
- Weight Loss: `fill` `#FFDAD6` (`--danger-container`), teks `#BA1A1A` (`--danger-strong`), 10/700.
- Hypertrophy: `fill` `#82F9BE` @40% (`--success-container`), teks `#002113` (`--success-deep`), 10/700.

**BB Awal** — **12px / 600** `#181B25`. **BB Sekarang** — **12px / 700** `#181B25`.

**Net Delta** — badge pill dengan ikon panah, `padding` 4/10, `gap` 2:
- Turun: `fill` `#FFDAD6`, ikon + teks `#BA1A1A`, 12/700. (mis. "↓ -7.3 kg")
- Naik: `fill` `#006C47` @15%, ikon + teks `#006C47`, 12/700. (mis. "↑ +4.8 kg")

### 4.3 Data contoh (6 baris)

| Nama | Sub | Target | BB Awal | BB Sekarang | Delta |
|---|---|---|---|---|---|
| Sarah Jenkins | Age 29 • Tier Elite | Weight Loss | 78.5 kg | 71.2 kg | -7.3 kg |
| Marcus Sterling | Age 34 • Pro Bulk | Hypertrophy | 82.0 kg | 86.8 kg | +4.8 kg |
| Elena Rostova | Age 26 • Marathoner | Hypertrophy | 63.2 kg | 59.8 kg | +3.4 kg |
| David Kim | Age 31 • Strength | Weight Loss | 75.0 kg | 73.9 kg | -1.1 kg |
| Chloe Bennett | Age 27 • Fat Loss | Weight Loss | 69.0 kg | 63.1 kg | -5.9 kg |
| Jordan Hayes | Age 30 • Lean Mass | Hypertrophy | 77.4 kg | 80.2 kg | +2.8 kg |

> Baris 1 (Sarah Jenkins) diberi label layer **"(Selected)"**, tapi tidak ada perbedaan visual yang terbaca (fill tetap putih). Perlu dicek apakah ada state terpilih yang belum diimplementasikan.

---

## 5. Header & Sidebar (global)

- **Header** dan **Aside** identik dengan halaman lain (lihat `KLIEN.md` §6–§7). Yang membedakan hanya item menu **aktif = Riwayat** (`fill` `#7DC04E`, teks putih).

---

## 6. Hal yang perlu dikonfirmasi

1. **State "Selected"** pada baris tabel (§4.3) tidak terlihat — sengaja tanpa highlight, atau ada style yang belum diterapkan?
2. **Pagination** tidak ada di halaman ini walau data 6 dari 24 klien — apakah tabel memang tanpa pagination?
3. **Delta satuan** hanya kg; belum ada desain untuk metrik lain (mis. tinggi/BMI) bila nanti ditambah.
4. **Kolom "TARGET VECTOR"** memakai badge warna (merah/hijau), berbeda dari label polos "HYPERTROPHY" di kartu pengajuan `VERIFIKASI.md` §4.4 — perlu disepakati apakah sengaja beda per konteks.
5. Sorting / klik header kolom belum ada desain.
