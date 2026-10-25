# Dashboard Admin — Design Spec

> Dokumen ini fokus pada **tampilan konten halaman Dashboard**. Sidebar dan jenis font (font family) didefinisikan di file md terpisah dan tidak diulang di sini.
> Tanda `(estimasi)` = nilai diperkirakan dari tampilan visual, bukan dari panel Figma.

---

## 1. Overview

| Item | Nilai |
|---|---|
| Nama halaman | Dashboard (Admin) |
| Route | `/dashboard` (asumsi, sesuaikan dengan router proyek) |
| Pengguna | Admin |
| Tujuan | Ringkasan kondisi sistem, jumlah klien & personal trainer aktif, tren aktivitas, dan komposisi spesialisasi PT |
| Frame desktop | 1728 × 1117 px |

---

## 2. Layout

### 2.1 Struktur frame

- Frame root: **auto layout vertikal**, gap `0`, padding kiri `256px` (ruang untuk sidebar, lihat md sidebar), padding lain `0`.
- Background frame: `#F8F9FF`, topbar `#FFFFFF`.
- **Area konten** (kanan sidebar): lebar `1408px` (Fill) pada frame 1728. Ada padding horizontal `32px` di kiri dan kanan dari sisa `1472px`.
- Area konten: **auto layout vertikal**, gap antar section `20px`, padding `0`, tinggi Hug.

```
┌─────────┬─────────────────────────────────────────────────┐
│         │ Topbar (putih)           [moon] [bell•] [AV]    │
│ SIDEBAR ├─────────────────────────────────────────────────┤
│ (md     │ Welcome Banner (hijau, full width)              │
│ lain)   │ ┌───────────────┐ ┌───────────────┐             │
│         │ │ Stat Clients  │ │ Stat PT       │  grid 4×1   │
│         │ └───────────────┘ └───────────────┘             │
│         │ ┌─────────────────────┐ ┌─────────────┐         │
│         │ │ Chart Tren (7 col)  │ │ Donut (5col)│ grid 12 │
│         │ └─────────────────────┘ └─────────────┘         │
└─────────┴─────────────────────────────────────────────────┘
```

### 2.2 Urutan section (atas ke bawah)

1. Topbar
2. Welcome Banner
3. Stat Cards (grid 4 kolom)
4. Charts Row (grid 12 kolom)

### 2.3 Grid detail

**Stat Cards row**
- Grid **4 kolom × 1 baris**, gap `16px` (kolom dan baris), padding `0`, tinggi row `133px`.
- Card "Total Active Clients" mengisi kolom 1–2, card "Total Active Personal Trainer" mengisi kolom 3–4 (dua card sama lebar).
- Struktur harus mudah diubah menjadi 4 card (1 kolom per card) bila nanti ada metrik baru.

**Charts row**
- Grid **12 kolom × 1 baris**, gap `16px`, padding `0`.
- Lebar kolom pada 1408px: `(1408 − 11×16) / 12 ≈ 102.67px`.
- Card "Tren Aktivitas Sesi & Registrasi": **span 7 kolom** (≈ 814.67px).
- Card "Spesialisasi PT": **span 5 kolom** (577.33px, tinggi ≈ 447px).
- Container row bertinggi `682px` (Fill) dengan sisa ruang kosong di bawah card, jadi card **tidak** di-stretch. Gunakan `align-items: start`.

---

## 3. Komponen

### 3.1 Topbar

- Background `#FFFFFF`, tinggi ±64px, lebar penuh area konten sampai tepi kanan.
- Konten **rata kanan**, jarak antar elemen ±16px:
  1. **Toggle dark mode**: icon bulan (moon), ±16px, warna `#5A5E69`.
  2. **Notifikasi**: icon bell dengan **titik merah** kecil di pojok kanan atas (indikator belum dibaca).
  3. **Avatar**: lingkaran ±28px, background `#EFF4FF`, inisial `AV`, teks gelap, bold kecil.

### 3.2 Welcome Banner

- Lebar penuh area konten (1408px), background `#7DC04E`, radius ±12px, padding ±16–24px, tinggi ±140px (estimasi).
- **Judul**: `Selamat Datang di Command Center Bugarin` — putih, bold, ±28–32px.
- **Deskripsi**: `Semua microservices berjalan normal. Pantau akselerasi kebugaran atlet, sinkronisasi biomarker, dan kinerja 86 pelatih resmi secara presisi.`
  - Putih (opacity ±90%), ±14px, line-height ±1.4, `max-width` ±640px agar teks membungkus menjadi 2 baris.
- Angka `86` pada deskripsi dinamis (jumlah pelatih aktif, sama dengan angka di donut chart).
- Tidak ada tombol/CTA di banner.

### 3.3 Stat Card (dipakai 2×)

- Background `#FFFFFF`, radius `12px`, drop shadow halus, tinggi `133px`, padding ±16px.
- Layout vertikal (rata kiri):
  1. **Icon box**: persegi ±32px, radius ±8px, background oranye `#FF9E6C`, icon "people/group" putih di tengah.
  2. **Label**: uppercase, ±10–11px, warna `#464555`, letter-spacing sedikit lebar.
  3. **Nilai**: angka besar, bold, ±28–32px, warna `#0B1C30`.

| Card | Label | Nilai (dummy) |
|---|---|---|
| 1 | `TOTAL ACTIVE CLIENTS` | `4` |
| 2 | `TOTAL ACTIVE PERSONAL TRAINER` | `2` |

> Label card ke-2 punya dua spasi antara "ACTIVE" dan "PERSONAL" di desain. Cukup tulis satu spasi.

### 3.4 Chart Card — "Tren Aktivitas Sesi & Registrasi"

- Card: background `#FFFFFF`, radius `12px`, drop shadow, padding ±16px, span 7 kolom.
- **Header**
  - Kiri: judul `Tren Aktivitas Sesi & Registrasi` (±16px, semi-bold, `#0B1C30`) dan subjudul `Korelasi lonjakan latihan terpandu vs penambahan atlet 7 bulan ke belakang` (±10px, `#5A5E69`, 2 baris).
  - Kanan: **legend** horizontal.
    - Titik hijau `#7DC04E` + `Sesi Latihan`
    - Titik oranye `#FF9E6C` + `Klien Baru`
- **Jenis chart**: kombinasi **bar chart + line chart**, 7 kategori sumbu-X.
- **Sumbu X** (uppercase, ±9px, bold, `#0B1C30`): `JAN`, `FEB`, `MAR`, `APR`, `MEI`, `JUN`, `JUL (AKTIF)`.
  - `JUL (AKTIF)` ditandai: warna hijau tua `#326B00`, bold.
- **Sumbu Y**: tanpa label angka. Hanya gridline horizontal tipis (`#CBDBF5`, opacity 40–50%), ±4 garis.
- **Bar (Sesi Latihan)**
  - Lebar ±28px, sudut atas radius kecil (±4px).
  - Fill: gradien vertikal dari `#7DC04E` (atas) ke hijau sangat muda/transparan (bawah).
  - **Bar bulan aktif (JUL)**: fill solid `#7DC04E` (tanpa gradien pudar), plus titik marker gelap kecil di puncak bar.
- **Line (Klien Baru)**
  - Smooth curve (spline), tebal ±2px.
  - Stroke gradien dari `#FF9E6C` ke `#95491F` (kiri ke kanan).
  - Marker tiap titik: lingkaran ±6px, fill putih, border oranye.
  - Garis berhenti sekitar bulan Juni, tidak menyambung ke bar JUL.
- **Data dummy (estimasi relatif, skala 0–100)**

| Bulan | Sesi Latihan (bar) | Klien Baru (line) |
|---|---|---|
| JAN | 45 | 40 |
| FEB | 60 | 50 |
| MAR | 74 | 68 |
| APR | 66 | 60 |
| MEI | 86 | 80 |
| JUN | 92 | 90 |
| JUL (AKTIF) | 100 | — |

### 3.5 Chart Card — "Spesialisasi PT"

- Card: background `#FFFFFF`, radius `12px`, **drop shadow** (terkonfirmasi di Figma), padding ±16px, span 5 kolom.
- **Header**: judul `Spesialisasi PT` (±16px, semi-bold, `#0B1C30`), subjudul `Komposisi fokus keahlian 86 pelatih` (±10px, `#5A5E69`).
- **Donut chart** (di tengah card, diameter ±100–110px pada skala desain, ketebalan ring ±20% dari diameter)
  - Segmen 1: `#BA1A1A` (merah) — `Turun Berat Badan` — 48 PT (56%), mulai dari posisi jam 12 searah jarum jam.
  - Segmen 2: `#82F9BE` (mint) — `Naik Berat Badan` — 38 PT (44%).
  - Teks tengah: `86` (bold, ±24px, `#0B1C30`) dan `PELATIH AKTIF` (uppercase, ±7–8px, `#0B1C30`).
- **Legend** di bawah donut, lebar penuh card, dua baris:

| Dot | Label | Nilai (rata kanan, bold) |
|---|---|---|
| `#BA1A1A` | Turun Berat Badan | `48 PT (56%)` |
| `#82F9BE` | Naik Berat Badan | `38 PT (44%)` |

- Angka tengah (`86`) = total semua segmen (48 + 38). Hitung dinamis, jangan hardcode.

---

## 4. Style (khusus halaman ini)

### 4.1 Color tokens (dari panel Selection colors Figma)

| Token (usulan) | Hex | Dipakai untuk |
|---|---|---|
| `bg-page` | `#F8F9FF` | Background halaman |
| `surface` | `#FFFFFF` | Card, topbar |
| `primary` | `#7DC04E` | Banner, bar chart, legend "Sesi Latihan" |
| `primary-dark` | `#326B00` | Label bulan aktif (JUL) |
| `accent-orange` | `#FF9E6C` | Icon box stat, line chart, legend "Klien Baru" |
| `accent-orange-alt` | `#F69665` | Variasi oranye di sebagian screenshot (samakan ke satu token) |
| `accent-brown` | `#95491F` | Ujung gradien line chart |
| `danger` | `#BA1A1A` | Segmen donut "Turun Berat Badan", titik notifikasi |
| `mint` | `#82F9BE` | Segmen donut "Naik Berat Badan" |
| `text-primary` | `#0B1C30` | Judul, angka, label sumbu |
| `text-secondary` | `#464555` | Label stat card |
| `text-muted` | `#5A5E69` | Subjudul, icon topbar |
| `border-grid` | `#CBDBF5` | Gridline chart (opacity 40–50%) |
| `surface-tint` | `#EFF4FF` | Background avatar topbar |

### 4.2 Ukuran teks (estimasi; font family mengikuti md terpisah)

| Elemen | Ukuran | Weight |
|---|---|---|
| Judul banner | 28–32px | 700 |
| Deskripsi banner | 14px | 400 |
| Angka stat | 28–32px | 700 |
| Label stat | 10–11px | 500 |
| Judul card chart | 16px | 600 |
| Subjudul card | 10px | 400 |
| Label sumbu X / legend | 9–10px | 500–700 |
| Angka tengah donut | 24px | 700 |

### 4.3 Spacing, radius, shadow

- Gap antar section vertikal: `20px`
- Gap grid: `16px`
- Radius card dan banner: `12px`
- Radius icon box: ±8px
- Drop shadow card: lembut dan tipis, misal `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` (estimasi; Figma hanya menunjukkan "Drop shadow" tanpa nilai).
- Tidak ada stroke/border pada card.

---

## 5. State & interaksi

> Screenshot hanya memperlihatkan kondisi default. State di bawah adalah rekomendasi standar, bukan dari desain.

| Elemen | State | Perilaku |
|---|---|---|
| Toggle moon | click | Ganti tema light/dark. Satu state dengan pengaturan "Mode Tampilan Antarmuka" di halaman Profil (lihat `profil.md`). Palet mode gelap (usulan) ada di `dark-mode.md` |
| Bell | click | Buka dropdown/halaman notifikasi; titik merah hilang jika semua sudah dibaca |
| Avatar topbar | click | Buka menu akun (opsional) |
| Bar / titik line chart | hover | Tooltip berisi bulan, jumlah sesi, jumlah klien baru |
| Segmen donut | hover | Tooltip: nama spesialisasi, jumlah PT, persentase |
| Semua data card | loading | Skeleton dengan bentuk sama dengan konten |
| Chart | empty | Teks "Belum ada data" di tengah card |
| Chart / stat | error | Pesan error singkat dan tombol "Coba lagi" |

---

## 6. Data

```json
{
  "welcome": { "totalActiveTrainers": 86 },
  "stats": {
    "totalActiveClients": 4,
    "totalActivePersonalTrainers": 2
  },
  "activityTrend": [
    { "month": "JAN", "sessions": 45, "newClients": 40 },
    { "month": "FEB", "sessions": 60, "newClients": 50 },
    { "month": "MAR", "sessions": 74, "newClients": 68 },
    { "month": "APR", "sessions": 66, "newClients": 60 },
    { "month": "MEI", "sessions": 86, "newClients": 80 },
    { "month": "JUN", "sessions": 92, "newClients": 90 },
    { "month": "JUL", "sessions": 100, "newClients": null, "active": true }
  ],
  "specialization": [
    { "label": "Turun Berat Badan", "count": 48 },
    { "label": "Naik Berat Badan", "count": 38 }
  ]
}
```

- Persentase donut dihitung dari `count / total`, dibulatkan (48/86 = 56%, 38/86 = 44%).
- "4 klien aktif / 2 PT aktif" dan "86 pelatih aktif" tidak konsisten di desain. Itu dummy data, jangan dijadikan aturan validasi.
- Nilai chart di atas hanya estimasi untuk mock data. Gunakan data asli dari API.

---

## 7. Responsive

Desain Figma hanya tersedia untuk desktop (1728px). Rekomendasi bila diperlukan:

| Breakpoint | Perilaku |
|---|---|
| ≥ 1280px | Sesuai desain |
| 768–1279px | Stat cards tetap 2 kolom. Charts row menjadi 1 kolom bertumpuk (tren di atas, donut di bawah) |
| < 768px | Stat cards 1 kolom. Legend chart tren pindah ke bawah judul. Padding banner diperkecil |

(Perilaku sidebar saat responsive mengikuti md sidebar.)

---

## 8. Catatan implementasi

1. **Komponen reusable**: `StatCard` dan `ChartCard` (wrapper card + header + legend) kemungkinan dipakai di menu lain.
2. **Grid**: gunakan CSS Grid (`repeat(4, 1fr)` untuk stat dan `repeat(12, 1fr)` untuk charts) dengan `gap: 16px`. Pakai `col-span` 2/2 (stat) dan 7/5 (charts).
3. **Chart library**: tidak ditentukan. Syarat visual: combo bar + smooth line, gradien pada bar dan line, marker custom, donut dengan teks tengah.
4. **Banner dinamis**: angka pelatih di deskripsi banner diambil dari data, bukan teks statis.
5. **Aksesibilitas**: icon-only button (moon, bell) butuh `aria-label`; chart butuh alternatif teks (ringkasan atau tabel tersembunyi); pastikan kontras teks putih di atas `#7DC04E` memadai untuk teks kecil (pertimbangkan weight lebih tebal).
6. **Dark mode**: toggle ada di desain, tetapi desain dark mode belum ada. Gunakan color token sebagai CSS variables agar mudah ditambah nanti.
