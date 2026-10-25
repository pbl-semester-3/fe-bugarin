# Riwayat — Design Spec

> Menu ini punya **2 tab** (Daftar Personal Trainer/PT dan Audit Admin) dan **1 modal** (Detail Feedback). Halaman bersifat **read-only** (log/riwayat), tidak ada aksi tambah, ubah, atau hapus.
> Dokumen ini fokus pada tampilan konten. Sidebar dan jenis font (font family) ada di md terpisah. Topbar sama dengan `dashboard-admin.md`.
> Tanda `(estimasi)` = nilai diperkirakan dari tampilan visual, bukan dari panel Figma.
> Bagian **"Catatan Inkonsistensi Desain"** di akhir wajib dibaca sebelum implementasi.

---

## 1. Overview

| Item | Nilai |
|---|---|
| Nama menu | Riwayat |
| Pengguna | Admin |
| Tujuan | Memantau feedback/evaluasi yang diberikan PT ke klien, dan mencatat jejak audit (CRUD) yang dilakukan admin |
| Frame desktop | 1728 × 1117 px |
| Sifat halaman | Read-only, data berupa log kronologis |

### 1.1 Daftar layar

| # | Layar | Route (asumsi) | Sumber Figma |
|---|---|---|---|
| 1 | Tab "Daftar Personal Trainer (PT)" (default) | `/riwayat` atau `/riwayat?tab=pt` | "Riwayat- PT" |
| 2 | Tab "Audit Admin" | `/riwayat?tab=audit` | Frame Audit Admin |
| 3 | Modal Detail Feedback | (overlay, dibuka dari tombol `Detail` di tab PT) | Modal 460 px |

### 1.2 Keputusan produk

| Hal | Status | Instruksi implementasi |
|---|---|---|
| Kolom rating bintang ("Sentimen") | **Final: tidak ada** | Jangan dibuat. Tabel PT hanya punya 6 kolom (lihat 4.2) |
| Filter/search di tab Audit Admin | **Ditunda, dipertimbangkan nanti** | **Jangan dibuat sekarang.** Tab Audit tetap tanpa filter/search. Struktur tabel dibuat agar filter mudah ditambah kemudian (lihat 5.6) |
| Daftar kategori feedback | **Diperluas (variasi)** | Pakai daftar kategori di 4.3. Hanya `Evaluasi Sesi Mingguan` yang berasal dari desain, sisanya variasi tambahan |
| Background halaman | **Sama dengan halaman lain** | `#F8F9FF` |

---

## 2. Layout (shared)

- Frame root: auto layout vertikal, padding kiri `256px` (ruang sidebar), background `#F8F9FF` (sama dengan Dashboard dan Kelola Pengguna; frame Figma Riwayat memakai `#EFF4FF`, abaikan dan pakai `#F8F9FF`).
- Area konten: lebar `1408px` (Fill), padding horizontal `32px`, tinggi ±933px (Hug), mulai tepat di bawah topbar (offset Y = 64px).
- Urutan section:

```
┌─────────────────────────────────────────────────────────┐
│ Topbar                                                   │
├─────────────────────────────────────────────────────────┤
│ 1. Banner hijau "Audit Trail & Log Operasional"          │
│ 2. Tab Switcher  [Daftar PT (86 Aktif)] [Audit Admin]    │
│ 3. Filter + info jumlah entri   (hanya tab PT)           │
│ 4. Tabel log                                             │
│ 5. Footer pagination ("Baris per halaman" + halaman)     │
└─────────────────────────────────────────────────────────┘
```

- Tab PT: item 2–5 berada dalam **satu card putih** (radius bawah ±12px).
- Tab Audit Admin: tab bar putih penuh, lalu teks info jumlah entri berada di atas background halaman (`#F8F9FF`), diikuti tabel dan pagination putih (struktur beda dengan tab PT, lihat catatan inkonsistensi nomor 2).

---

## 3. Komponen Shared

### 3.1 Banner

- Lebar penuh (1408px), tinggi ±90px (estimasi), background `#7DC04E`, radius ±12px, padding ±16–24px.
- Judul: `Audit Trail & Log Operasional` — putih, bold, ±24px.
- Deskripsi: `Monitoring kepatuhan pelatihan personal trainer dan pencatatan forensik CRUD Super Admin` — putih, ±12px, 1 baris.
- Tidak ada gradasi di sisi kanan pada halaman ini (berbeda dengan banner di Kelola Pengguna). Banner sama di kedua tab.

### 3.2 Tab Switcher

| Tab | Label | Badge |
|---|---|---|
| 1 | `Daftar Personal Trainer (PT)` | `86 Aktif` |
| 2 | `Audit Admin` | tidak ada |

- Container: tinggi ±35px (Hug), gap antar tab `4px`, padding `4px`, background putih, radius `12px`.
- **Tab aktif**: pill `#F69665`, teks putih (±12px, medium), radius `12px`. Badge (jika ada) putih dengan teks gelap `#0B1C30`, bold ±10px, pill.
- **Tab tidak aktif**: tanpa background, teks `#5A5E69` / `#0B1C30` ±12px. Badge tidak aktif: background `#EFF4FF`/lavender, teks gelap.
- Posisi tab di tab Audit Admin: tab bar putih lebar penuh, padding horizontal `24px`, padding atas `5px`, tinggi total ±67px.
- Default saat halaman dibuka: tab **PT**.

### 3.3 Pagination footer

- Bar putih lebar penuh, tinggi `56px`, padding horizontal `16px`, `justify-content: space-between`, item vertikal tengah.
- **Kiri**: `Baris per halaman: 10` (tab PT) atau `Baris per halaman: 5` (tab Audit). Angka bold `#0B1C30`, label `#5A5E69`, ±11px. Di desain berupa teks statis.
- **Kanan**: `<` · `1` · `2` · `…` · `4` · `>`
  - Halaman aktif: kotak ±22px, background `#7DC04E`, teks putih, bold, radius ±4px.
  - Halaman lain: teks `#0B1C30` ±11px, tanpa background.
  - Panah `<` `>`: ikon chevron tanpa background; `<` abu muda (disabled) di halaman 1.
  - **Tidak ada** tombol halaman pertama/terakhir (`|<`, `>|`). Berbeda dengan pagination di Kelola Pengguna.

### 3.4 Teks info jumlah entri

- Format: `Menampilkan 10 dari 45 entri` (tab PT) dan `Menampilkan 5 dari 45 entri` (tab Audit). ±11px `#5A5E69`.
- Di desain hanya sebagian angka yang tampak lebih gelap. Rekomendasi: angka dibuat **bold `#0B1C30`** konsisten seperti `Menampilkan **10** dari **45** entri`.

---

## 4. Tab "Daftar Personal Trainer (PT)" — Log Feedback

### 4.1 Filter

- Satu baris horizontal, gap `4px`, tinggi ±29px, di bawah tab switcher dengan garis pemisah tipis di atasnya.
- **Search**: lebar ±250px, background `#EFF4FF`, radius ±8px, icon funnel di kiri, placeholder `Cari PT, atau Keyword...` (`#727A68` / `#5A5E69`).
- **Dropdown kategori**: teks `Semua Kategori`, background `#EFF4FF`, radius ±8px, ±12px `#0B1C30` (chevron tidak terlihat di desain, tambahkan chevron-down). Opsi: `Semua Kategori` + 6 kategori di 4.3.
- Di bawahnya teks `Menampilkan 10 dari 45 entri`.

### 4.2 Kolom tabel

Header: uppercase, bold, ±10px, letter-spacing lebar, `#5A5E69`, rata tengah, tanpa background (putih). Header `CATATAN EVALUASI` membungkus 2 baris.

| # | Header | Isi sel |
|---|---|---|
| 1 | `WAKTU & ID` | Waktu `14:42:08 WIB` (bold ±12px, `#0B1C30`, **gaya monospace**) dan ID `#FBK-88219` di bawahnya (±10px, `#5A5E69`, monospace) |
| 2 | `PERSONAL TRAINER` | Avatar bulat ±28px + nama (semi-bold ±12px, `#0B1C30`) + sub `PT Senior • Elite Level` (±10px, `#5A5E69`) |
| 3 | `KLIEN PENERIMA` | Avatar bulat ±28px + nama (semi-bold ±12px) + nama cohort berwarna (±10px) |
| 4 | `KATEGORI FEEDBACK` | Pill kategori dengan icon kalender |
| 5 | `CATATAN EVALUASI` | Cuplikan catatan dalam tanda kutip, maksimal 2 baris, terpotong dengan ellipsis |
| 6 | `TINDAKAN` | Tombol `Detail >` |

- Proporsi lebar kolom (estimasi): Waktu 1.2fr, PT 1.6fr, Klien 1.6fr, Kategori 1.5fr, Catatan 1.2fr, Tindakan 0.8fr. Desain menyisakan ruang kosong di sisi kanan tabel; gunakan `fr` agar kolom memenuhi lebar card.
- Tinggi baris ±59px, background putih, garis pemisah tipis (`#EFF4FF`) antar baris.
- Hover baris (rekomendasi): background `#F8F9FF`.

### 4.3 Detail sel

**Warna nama cohort klien** (mengikuti jenis program):
| Cohort | Warna teks |
|---|---|
| Cohort Hypertrophy | `#326B00` (hijau tua) |
| Cohort Marathon Prep | `#326B00` (hijau tua) |
| Cohort Fat Loss | `#95491F` (cokelat-oranye) |

> Aturan pewarnaan cohort belum dijelaskan di desain. Asumsi: hijau untuk program naik/performa, cokelat-oranye untuk program turun berat badan (konsisten dengan warna "Naik BB"/"Turun BB" di Kelola Pengguna).

**Pill kategori**: bold ±10px, radius penuh, padding ±4×10px, icon kecil (±12px, warna sama dengan teks) di kiri. Bentuk mengikuti desain; warna dan icon divariasikan per kategori.

| Kategori | Icon (lucide) | Background | Teks & icon | Sumber |
|---|---|---|---|---|
| `Evaluasi Sesi Mingguan` | `calendar` | `#7DC04E` @ 20% | `#214C00` | **Desain** |
| `Evaluasi Bulanan` | `calendar-range` | `#DCE9FF` | `#213145` | Variasi |
| `Koreksi Teknik` | `dumbbell` | `#FFF3AD` | `#773308` | Variasi |
| `Progress Nutrisi` | `utensils` | `#F69665` @ 30% | `#95491F` | Variasi |
| `Motivasi & Kepatuhan` | `heart` | `#82F9BE` @ 40% | `#006C47` | Variasi |
| `Pemulihan & Cedera` | `activity` | `#FFDAD6` | `#93000A` | Variasi |

- Warna kategori bersifat pembeda visual, bukan penanda baik/buruk. Beberapa warna memang sama dengan badge aksi di tab Audit (UPDATE, DELETE), tetapi berada di tab dan konteks berbeda.
- Kategori disimpan sebagai enum/ID di data, bukan teks bebas, agar warna dan icon bisa dipetakan. Kategori tak dikenal jatuh ke gaya default (`#EFF4FF`, teks `#0B1C30`).

**Catatan evaluasi**: ±11px `#0B1C30`, lebar kolom ±100–120px, `line-clamp: 2`, diawali tanda kutip ganda, contoh `"Pencapaian mileage...` dan `"Defisit kalori 300.`.

**Tombol Detail**: background `#EFF4FF`, teks `#0B1C30` ±11px medium, icon chevron-right di kanan, radius ±6px, padding ±6×10px. Klik → buka Modal Detail Feedback (bagian 6).

### 4.4 Data dummy

| Waktu | ID | PT | Level PT | Klien | Cohort | Kategori | Catatan |
|---|---|---|---|---|---|---|---|
| 14:42:08 WIB | #FBK-88219 | Bima Santoso | PT Senior • Elite Level | Sarah Jenkins | Cohort Hypertrophy | Evaluasi Sesi Mingguan | "Pencapaian mileage... |
| 14:42:08 WIB | #FBK-88218 | David Prasetyo | PT Pro • Strength | Michael Chen | Cohort Fat Loss | Progress Nutrisi | "Defisit kalori 300. |
| 09:41:30 WIB | #FBK-88198 | Rio Fernando | Head Coach | Dimas Arya | Cohort Marathon Prep | Evaluasi Bulanan | "Pencapaian mileage... |
| 09:15:02 WIB | #FBK-88190 | Bima Santoso | PT Senior • Elite Level | Sarah Jenkins | Cohort Hypertrophy | Koreksi Teknik | "Barbell Deadlift set ke-3... |
| 08:50:41 WIB | #FBK-88181 | Nadia Safitri | PT Pro • Nutrition | Linda Kusuma | Cohort Hypertrophy | Motivasi & Kepatuhan | "Konsistensi hadir 4 dari 5... |
| 08:20:10 WIB | #FBK-88170 | David Prasetyo | PT Pro • Strength | Michael Chen | Cohort Fat Loss | Pemulihan & Cedera | "Nyeri ringan lutut kanan... |

Baris pertama sampai ketiga berasal dari desain (kategori baris 2 dan 3 diganti variasi). Baris 4–6 adalah data contoh tambahan agar semua gaya kategori terlihat. Desain aslinya hanya mengulang baris pertama (placeholder) dan menampilkan 9 baris padahal pengaturan 10 baris per halaman.

### 4.5 Pagination tab PT

- 10 baris per halaman, total 45 entri → 5 halaman. Desain menampilkan `1 2 … 4` (dummy). Hitung halaman terakhir secara dinamis.

---

## 5. Tab "Audit Admin" — Jejak Audit

### 5.1 Struktur

- Tab bar putih (lihat 3.2), lalu teks `Menampilkan 5 dari 45 entri` di atas background halaman (padding kiri ±24px).
- **Tidak ada filter/search** di tab ini (keputusan: ditunda, jangan dibuat sekarang).
- Tabel lebar penuh, lalu pagination bar putih (56px).

### 5.2 Kolom tabel

Header: background `#EFF4FF` (opacity ±70%), tinggi ±44px, uppercase, bold, ±10px, letter-spacing lebar, `#0B1C30`/`#5A5E69`. `WAKTU & TIMESTAMP ID` membungkus 2 baris.

| # | Header | Isi sel |
|---|---|---|
| 1 | `WAKTU & TIMESTAMP ID` | Waktu `14:48:12 WIB` (semi-bold ±12px, `#0B1C30`) + tanggal `Hari ini, 24 Okt 2024` (±11px, `#5A5E69`) |
| 2 | `AKTOR SUPER ADMIN` | Avatar bulat ±36px + nama (semi-bold ±12px) |
| 3 | `KATEGORI & TIPE AKSI` | Badge tipe aksi |
| 4 | `TARGET OBJEK & MODUL` | Nama target (semi-bold ±12px, `#0B1C30`) + nama modul uppercase (±10px, letter-spacing, `#41493A`) |
| 5 | `STATUS` | Badge status |

- Tinggi baris ±64px. **Zebra striping**: baris genap background `#EFF4FF` opacity ±20%, baris ganjil putih.
- Tidak ada kolom tindakan (tidak ada tombol di baris).
- Gunakan `fr` agar kolom memenuhi lebar (desain menyisakan ruang kosong di kanan).

### 5.3 Badge (uppercase, bold, ±10px, radius penuh, padding ±4×10px)

**Tipe aksi**
| Nilai | Background | Teks |
|---|---|---|
| `CREATE` | `#7DC04E` opacity 20% | `#214C00` |
| `UPDATE` | `#FFF3AD` | `#773308` |
| `DELETE` | `#FFDAD6` | `#93000A` |

**Status**
| Nilai | Background | Teks |
|---|---|---|
| `BERHASIL` | `#7DC04E` opacity 20% | `#214C00` |
| `GAGAL` | `#FF9E6C` opacity 20% | `#773308` (estimasi) |

### 5.4 Data dummy (5 baris)

| Waktu | Tanggal | Aktor | Aksi | Target | Modul | Status |
|---|---|---|---|---|---|---|
| 14:48:12 WIB | Hari ini, 24 Okt 2024 | Arya Pratama | UPDATE | Bambang Wicaksono | MODUL KELOLA PELATIH | BERHASIL |
| 13:15:40 WIB | Hari ini, 24 Okt 2024 | Alexandra Daniswara | CREATE | Farhan Pratama | MODUL REGISTRASI PELATIH | BERHASIL |
| 11:02:18 WIB | Hari ini, 24 Okt 2024 | Arya Pratama | UPDATE | Reza Gunawan | MODUL KEAMANAN AKSES | GAGAL |
| 09:42:01 WIB | Hari ini, 24 Okt 2024 | Alexandra Daniswara | CREATE | Sugi Darmono | MODUL REGISTRASI PELATIH | BERHASIL |
| 08:19:55 WIB | Hari ini, 24 Okt 2024 | Arya Pratama | DELETE | Bambang Wicaksono | MODUL KREDENSIAL PENGGUNA | BERHASIL |

- Urutan: terbaru di atas.
- "Hari ini" adalah label relatif. Untuk tanggal lebih lama tampilkan tanggal penuh (rekomendasi: `Kemarin, 23 Okt 2024`, lalu `22 Okt 2024`, dst).

### 5.5 Pagination tab Audit

- 5 baris per halaman, total 45 entri → 9 halaman. Desain menampilkan `1 2 … 4` (dummy). Hitung dinamis.

### 5.6 Catatan: filter/search audit (ditunda)

Belum diputuskan. Untuk bahan pertimbangan nanti, log audit biasanya makin panjang, sehingga filter yang paling berguna adalah: **rentang tanggal**, **aktor**, **tipe aksi** (CREATE/UPDATE/DELETE), dan **status** (BERHASIL/GAGAL); search teks untuk nama target. Jika nanti ditambahkan, letakkan bar filter di atas teks `Menampilkan ... entri` dengan gaya yang sama seperti filter di tab PT (4.1). **Jangan implementasi sebelum ada instruksi.**

---

## 6. Modal — Detail Feedback

Dibuka dari tombol `Detail >` di tab PT.

- Lebar `460px`, tinggi ±442px (body) + footer ±70px. Sudut tampak **tanpa radius** pada desain (berbeda dengan modal di Kelola Pengguna; konfirmasi ke desainer, atau samakan radius 16px).
- Overlay: gelap semi-transparan + blur ringan pada halaman di belakang.

**Header**
- Background navy `#213145`, padding ±24px 32px.
- Judul `Detail Feedback` (putih, semi-bold ±20px), tombol tutup `X` putih di kanan.

**Body** (background putih, padding ±28px)
1. Dua info card sejajar (grid 2 kolom, gap ±12px), tiap card putih, radius ±8px, shadow halus, padding ±12–16px:
   - `COACH / PERSONAL TRAINER` (label uppercase ±11px `#5A5E69`) + nama `Bima Santoso` (semi-bold ±15px, `#0B1C30`)
   - `KLIEN` + nama `Sarah Jenkins`
2. Label section `ISI PESAN EVALUASI LENGKAP` (uppercase, bold, ±12px, letter-spacing, `#5A5E69`).
3. Kotak pesan: background `#EFF4FF`, radius ±12px, padding ±20px, teks ±16px, line-height ±1.6, `#0B1C30`, diawali dan diakhiri tanda kutip. Teks contoh:
   > "Barbell Deadlift set ke-3 lumbar agak melengkung saat eksentrik. Fokus kunci core intra-abdominal pressure sebelum pull. Kurangi beban 5kg untuk perbaikan tempo 3-1-1. Rest interval antar set pastikan 120 detik penuh agar fosfagen recovery tercapai."
   - Pesan panjang: kotak tumbuh sesuai teks, body scroll jika melebihi tinggi viewport.

**Footer**
- Background `#EAF1FF`, padding ±16px 28px, tombol rata kanan.
- Tombol `Tutup Panel`: background putih, teks `#0B1C30` medium ±14px, radius ±8px, padding ±12×24px, shadow halus.

**Perilaku**: `X`, `Tutup Panel`, klik overlay, dan tombol `Esc` menutup modal. Fokus dikunci di dalam modal selama terbuka.

---

## 7. Style (khusus menu ini)

### 7.1 Color tokens (dari panel Selection colors Figma)

| Token (usulan) | Hex | Dipakai untuk |
|---|---|---|
| `bg-page` | `#F8F9FF` | Background halaman (sama dengan halaman lain) |
| `surface` | `#FFFFFF` | Card, tab bar, tabel, pagination |
| `surface-low` | `#EFF4FF` (100% / 70% / 20%) | Input, tombol Detail, header tabel Audit, zebra row |
| `surface-alt` | `#F1F3FF` | Warna tambahan di tab Audit (tint ringan) |
| `modal-footer` | `#EAF1FF` | Footer modal Detail |
| `primary` | `#7DC04E` | Banner, halaman aktif pagination |
| `primary-tint` | `#7DC04E` @ 20% | Pill kategori, badge CREATE, badge BERHASIL |
| `primary-dark` | `#214C00` | Teks pill hijau |
| `primary-text` | `#326B00` | Teks cohort (hijau) |
| `accent-orange` | `#F69665` | Tab aktif |
| `accent-peach` | `#FF9E6C` @ 20% | Background badge GAGAL |
| `accent-brown` | `#95491F` | Teks cohort Fat Loss |
| `warning-bg` | `#FFF3AD` | Background badge UPDATE |
| `warning-text` | `#773308` | Teks badge UPDATE, GAGAL |
| `danger-bg` | `#FFDAD6` | Background badge DELETE |
| `danger-text` | `#93000A` | Teks badge DELETE |
| `navy` | `#213145` | Header modal Detail |
| `text-primary` | `#0B1C30` | Teks utama |
| `text-secondary` | `#5A5E69` | Teks sekunder, header kolom |
| `text-module` | `#41493A` | Teks nama modul (uppercase) |
| `placeholder` | `#727A68` | Placeholder search |

### 7.2 Spacing, radius, shadow

- Radius: card/banner `12px`, tab container dan pill tab `12px`, input `8px`, tombol kecil `6px`, badge/pill penuh.
- Padding tab bar Audit: kiri/kanan `24px`, atas `5px`.
- Gap antar tab `4px`.
- Pagination bar: tinggi `56px`, padding horizontal `16px`.
- Shadow: halus pada kartu info modal; tidak ada shadow berat pada kartu halaman.

---

## 8. State & interaksi

> Rekomendasi standar kecuali ditandai **(desain)**.

| Elemen | State | Perilaku |
|---|---|---|
| Tab switcher | click | Ganti tab, perbarui query `?tab=`, reset halaman ke 1, ganti isi tabel dan filter (tab Audit tanpa filter untuk saat ini) |
| Search (tab PT) | input | Debounce ±300ms, cari berdasarkan nama PT, nama klien, ID feedback, atau isi catatan; reset ke halaman 1 |
| Dropdown kategori | change | Filter kategori feedback, reset ke halaman 1 |
| Tombol `Detail` | click | Buka Modal Detail Feedback dengan data baris terkait |
| Modal Detail | close | `X`, `Tutup Panel`, `Esc`, klik overlay |
| Pagination | click | Ganti halaman; `<` disabled di halaman 1, `>` disabled di halaman terakhir |
| "Baris per halaman" | (desain: teks statis) | Rekomendasi: jadikan dropdown (5, 10, 20, 50) |
| Baris tabel | hover | Background `#F8F9FF` (tab PT) |
| Tabel | loading | Skeleton baris (avatar bulat + 2 garis teks) |
| Tabel | empty | Teks `Belum ada riwayat` atau `Tidak ada data yang cocok` + tombol reset filter |
| Tabel | error | Pesan error + tombol `Coba lagi` |

---

## 9. Data

```json
{
  "tabs": { "activeTrainers": 86 },
  "pagination": {
    "pt":    { "perPage": 10, "total": 45, "totalPages": 5 },
    "audit": { "perPage": 5,  "total": 45, "totalPages": 9 }
  },
  "feedbackLogs": [
    {
      "id": "FBK-88219",
      "time": "14:42:08 WIB",
      "trainer": { "name": "Bima Santoso", "title": "PT Senior", "level": "Elite Level" },
      "client": { "name": "Sarah Jenkins", "cohort": "Cohort Hypertrophy" },
      "category": "EVALUASI_MINGGUAN",
      "note": "Barbell Deadlift set ke-3 lumbar agak melengkung saat eksentrik. Fokus kunci core intra-abdominal pressure sebelum pull. Kurangi beban 5kg untuk perbaikan tempo 3-1-1. Rest interval antar set pastikan 120 detik penuh agar fosfagen recovery tercapai."
    }
  ],
  "auditLogs": [
    {
      "time": "14:48:12 WIB",
      "date": "2024-10-24",
      "actor": "Arya Pratama",
      "action": "UPDATE",
      "target": "Bambang Wicaksono",
      "module": "MODUL KELOLA PELATIH",
      "status": "BERHASIL"
    }
  ]
}
```

- `action`: `CREATE` | `UPDATE` | `DELETE`. `status`: `BERHASIL` | `GAGAL`.
- `category` (enum): `EVALUASI_MINGGUAN` | `EVALUASI_BULANAN` | `KOREKSI_TEKNIK` | `PROGRESS_NUTRISI` | `MOTIVASI_KEPATUHAN` | `PEMULIHAN_CEDERA`. Label tampilan ada di 4.3.
- Daftar `module` yang mungkin muncul: Kelola Pelatih, Registrasi Pelatih, Keamanan Akses, Kredensial Pengguna (dari data dummy).
- Waktu ditampilkan dalam zona WIB.

---

## 10. Responsive

Desain hanya tersedia untuk desktop (1728px).

| Breakpoint | Perilaku |
|---|---|
| ≥ 1280px | Sesuai desain |
| 768–1279px | Tabel scroll horizontal di dalam container. Filter membungkus ke 2 baris. Modal tetap 460px, tengah layar |
| < 768px | Tab switcher scroll horizontal. Tabel berubah menjadi tampilan kartu per entri. Pagination menyusut (hanya `<`, halaman aktif, `>`). Modal hampir full-screen |

---

## 11. Catatan implementasi

1. **Komponen reusable**: `PageBanner`, `TabSwitcher` (dengan badge), `LogTable` (wrapper tabel + header + body + zebra opsional), `AvatarWithText`, `Badge` (varian: kategori, aksi, status), `Pagination`, `Modal` (header navy).
2. Tabel PT dan tabel Audit memakai pola yang sama, hanya beda kolom dan data. Pakai CSS Grid dengan `grid-template-columns` yang sama untuk header dan baris supaya sejajar. Desain Figma punya sedikit pergeseran antar-baris, jangan ditiru.
3. `Badge` sebaiknya satu komponen dengan props `variant` agar warna Aktif/Berhasil/Create konsisten dengan halaman Kelola Pengguna (`AKTIF`) dan halaman lain.
4. Pagination: sebaiknya satu komponen dengan opsi `showFirstLast`. Halaman ini tanpa first/last dan chevron tanpa background, Kelola Pengguna dengan first/last dan chevron berbackground.
5. Aksesibilitas: tombol icon-only (`X`, chevron pagination) butuh `aria-label`; modal pakai `role="dialog"` dan focus trap; badge jangan hanya mengandalkan warna (teks sudah ada); data log dalam tabel semantik (`<table>`).
6. Halaman ini tidak punya aksi tulis. Pastikan endpoint hanya `GET`.
7. Waktu dan ID: pakai gaya monospace untuk kolom `WAKTU & ID` di tab PT (jenis font mengikuti md font).
8. Jangan membuat kolom rating/sentimen dan jangan menambah filter/search di tab Audit tanpa instruksi lanjutan.

---

## 12. Catatan Inkonsistensi Desain (konfirmasi sebelum implementasi)

1. **Tab Audit Admin tanpa filter/search**, sedangkan tab PT punya. Keputusan: ditunda (lihat 1.2 dan 5.6).
2. **Struktur card berbeda antar tab**: tab PT membungkus tab + filter + tabel + pagination dalam satu card putih, tab Audit memisahkan tab bar putih, info entri di atas background halaman, dan tabel zebra. Rekomendasi: satukan strukturnya.
3. **Pagination**: `1 2 … 4` tidak cocok dengan total (45 entri / 10 = 5 halaman; 45 / 5 = 9 halaman). Tampilkan halaman terakhir dinamis.
4. **Jumlah baris**: tab PT menampilkan 9 baris padahal "Baris per halaman: 10" dan "Menampilkan 10 dari 45 entri".
5. **Waktu**: tab PT memakai gaya monospace, tab Audit memakai gaya biasa. Samakan atau pertahankan sesuai desain (log forensik cenderung cocok dengan monospace).
6. **Radius modal Detail Feedback** tampak 0 (sudut tajam), sedangkan modal di Kelola Pengguna memakai radius 16–20px. Rekomendasi: samakan `16px`.
7. **Dropdown "Semua Kategori"** tidak punya indikator chevron di desain. Rekomendasi: tambahkan chevron-down.
8. **Data placeholder**: baris identik berulang di tab PT, tanggal tetap `24 Okt 2024` dengan label "Hari ini". Cuplikan catatan di tabel (`"Pencapaian mileage...`) juga tidak sama dengan isi pesan di modal (`"Barbell Deadlift set ke-3...`) untuk baris yang sama. Pastikan cuplikan di tabel adalah potongan dari isi lengkap di modal.
9. **Sidebar**: label di bawah logo **final `ADMIN`** (tanpa kata "Super"; frame yang menulis `SUPER ADMIN` diabaikan). Nama menu `Profil` vs `Profil Admin` berbeda antar frame. Rujuk md sidebar.
10. **Teks "Super Admin" di halaman ini**: deskripsi banner (`...pencatatan forensik CRUD Super Admin`) dan header kolom tab Audit (`AKTOR SUPER ADMIN`) masih memuat kata "Super". Sementara ikuti teks Figma, menunggu konfirmasi apakah ikut diganti menjadi "Admin" (`...CRUD Admin`, `AKTOR ADMIN`).
