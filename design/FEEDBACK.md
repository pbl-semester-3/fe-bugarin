# FEEDBACK.md — Bugarin PT Platform

Spesifikasi layout halaman **Feedback** (Feedback Center). Token warna, font, dan komponen global mengacu ke `DESIGN_PT.md`. Angka diambil dari panel Inspect Figma (frame **1728 × 1117**, node `162:1071`).

> Lebar area konten: **1424 px**. `Main` padding `top 64, left/right 24`.

---

## 1. Struktur halaman

```
[Top banner: "Feedback Center" + subtitle]
[Master-Detail Grid (12 kolom)]
  ├─ LEFT (4 kolom):  Roster feed — daftar kartu percakapan klien
  └─ RIGHT (8 kolom): Detail view
        ├─ Kartu profil atlet + telemetry
        └─ Rich Feedback Composer (editor + tombol aksi)
```

Grid `Master-Detail Grid Canvas` berukuran **1367 × 939**, `gap` antar panel **24**.

---

## 2. Top banner

- Container `Top Telemetry & Control Banner`: W 1009 × H 52, auto layout horizontal `SPACE_BETWEEN`, align CENTER.
- **Judul** "Feedback Center": Plus Jakarta Sans **ExtraBold 40px**, `line height` 36, `letter spacing` **-0.70px**, `fill` `#181B25`.
- **Status Badges & Action Toolbar**: tinggi 16, berisi satu tombol ikon putih **16×16** `radius 12` (placeholder — isi/ikon belum jelas).
- **Subtitle**: "Real-time biometrics evaluation, video analysis reviews, and coaching dispatch." — **20px / 400**, `#464555`, `line height` 18, lebar ≈ 1009.

> Perhatikan: judul di halaman ini ls **-0.70**, sedangkan Klien/Riwayat **-0.56** — minor, tapi bisa diseragamkan.

---

## 3. LEFT PANEL — Master Client Queue (4 kolom)

- Container: W **442** × H **452**, auto layout vertikal, `gap` **4**.

### 3.1 Kartu percakapan (item)

- Kartu dasar: W 442, `radius` **12**, `fill` putih, `padding` **16**.
- **Terpilih (aktif):** tinggi 96, ditambah **strip hijau** `fill` `#7DC04E`, ukuran **4×72**, radius kiri penuh (0/9999), di sisi kiri + shadow tipis.
- **Header item** (`gap` 8):
  - **Avatar** bulat **48×48**. Foto untuk klien berfoto; fallback inisial: `fill` `#E5E8F5`, teks `#464555` **18px / 600** (mis. "DK", "CB").
  - Blok teks (vertikal, `gap` 2): **nama 18px / 600** `#181B25`, `line height` 24; **waktu 10px / 700** `#777587`, ls 0.4 (rata kanan, mis. "14m ago").
  - **Preview pesan**: **12px / 400** `#464555`, `line height` 18, maksimum 2 baris (mis. `"Completed Wednesday intervals, RPE 9 on deadlifts..."`).

### 3.2 Data contoh (5 item)

| Nama | Waktu | Preview |
|---|---|---|
| Sarah Jenkins **(terpilih)** | 14m ago | "Completed Wednesday intervals, RPE 9 on deadlifts, hunger spiked slightly..." |
| Marcus Sterling | 1h ago | "Incline bench numbers hit progressive." |
| Elena Rostova | 2h ago | "Noticed catch phase feels slightly." |
| David Kim | 4h ago | "Knee soreness down to 2/10 after dry." |
| Chloe Bennett | Yesterday | "Re-tested passive thoracic rotation: +8." |

---

## 4. RIGHT PANEL — Detail View & Composer (8 kolom)

- Container: W **905** × H **609**, auto layout vertikal, `gap` **24**.

### 4.1 Kartu profil atlet

- W 905 × H 120, `radius` **16**, `fill` putih, `padding` **24**, `gap` 16.
- Kiri (`gap` 16): **avatar kotak 64×64** `radius 16` + blok teks:
  - Nama "Sarah Jenkins": **22px / 700** `#181B25`, `line height` 30, ls -0.33.
  - Sub "Week 8/12 • Macro Target: Hyper-Deficit": **12px / 500** `#777587`, `line height` 18.

### 4.2 Rich Feedback Composer

- W 905 × H 441, `radius` **16**, `fill` putih, `padding` **24**, `gap` 16.
- **Header** (`SPACE_BETWEEN`):
  - Kiri: judul "Coaching Protocol Dispatch" **18px / 600** `#181B25`, `line height` 24; subtitle "Formulate directive, technical cueing, and nutritional modifications." **10px / 700** `#777587`, ls 0.4.
- **Overline** "DISPATCH TAXONOMY TAGS": **10px / 700** `#777587`, ls 0.5.
- **Composer Container**: W 857 × H 249, `radius` **12**, `fill` **`#F1F3FF`** (`--surface-tint`), `padding` **6**, `gap` 4.
  - **Formatting Toolbar**: W 845 × H 35, `radius` **8**, `fill` putih, `padding` 4/8, `gap` 4.
    - 6 tombol ikon (`radius` 4, ikon 7–13 px `#464555`): bold, italic, bullet list, numbered list, (divider `#C7C4D8` @50%, 1×16), code, emoji.
  - **Textarea**: W 845 × H 191, `radius` **8**, `fill` putih, `padding` atas ≈15.4 / kiri 16.
    - Teks isi: **14px / 400** `#181B25`, `line height` **22.75**, maksimum ~7 baris sebelum scroll internal.
- **Bottom Controls** (`gap` 8, align kanan):
  - **Save Draft**: 113×40, `radius` **10**, `fill` `#EBEDFB` (`--surface-2`), teks **14px / 700** `#181B25`, `padding` 10/20.
  - **Send Feedback**: 149×40, `radius` **10**, `fill` `#F69665` (`--secondary`), teks **14px / 700** putih, `padding` 10/20.

> ⚠️ **Update dari `DESIGN_PT.md` §7.6:** composer punya container ber-`fill` `#F1F3FF` (bukan border `surface-5`), dan tombol punya `radius` **10** (bukan 8). Perlu disinkronkan.

---

## 5. Header & Sidebar (global)

- **Header** dan **Aside** identik dengan `KLIEN.md` §6–§7. Item menu **aktif = Feedback** (`fill` `#7DC04E`, teks putih).

---

## 6. Hal yang perlu dikonfirmasi

1. **Tombol 16×16** di banner (`Status Badges & Action Toolbar`) belum jelas fungsinya — ikon apa?
2. **Toolbar "Quick Taxonomy Badges (Interactive Tag Toggles)"** hanya berisi overline; chip-nya belum digambar/di-toggle di frame ini. Loaded state-nya belum ada desain.
3. Apakah **strip hijau** `#7DC04E` (4×72) hanya untuk item terpilih, dan apakah kelima item bisa punya state masing-masing?
4. **Data klien di kiri berbeda dari data di Riwayat** (David Kim vs David Chen, dll.) — placeholder, tapi perlu konsisten saat implementasi.
5. **Empty state** (belum pilih klien) dan **state mengirim** belum ada desain.
6. Tombol **Save Draft / Send Feedback** — perilaku disabled/reply state belum dispesifikasi.
