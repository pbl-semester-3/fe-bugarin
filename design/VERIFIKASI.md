op# VERIFIKASI.md — Bugarin PT Platform

Spesifikasi layout halaman **Verifikasi**, mencakup dua state (**kosong** / **ada antrian**) dan modal **Decline Intake Request** yang muncul dari aksi Decline. Token warna, font, dan komponen global mengacu ke `DESIGN.md`.

> Lebar area konten: **1424 px** Fill (konsisten dengan Dashboard). Nilai 1439 px yang sempat tercatat di versi state kosong kemungkinan cuma selisih pembulatan saat ukur — dengan data queue card ini, 1424 yang dipakai sebagai acuan.

---

## 1. Struktur halaman

```
[Judul + subtitle]
[Toolbar: search bar + chip "All Pending (n)"]
[State kosong — ATAU — Daftar kartu pengajuan]
  └─ klik "Decline" → [Modal: Decline Intake Request] (§5)
```

- **Sidebar:** saat ada pengajuan pending, menu "Verifikasi" dapat **badge notifikasi merah** berisi angka (bulat, pojok kanan item menu) — jumlahnya sama dengan angka di chip "All Pending (n)".

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

## 4. Daftar kartu pengajuan (state ada antrian)

### 4.1 List wrapper

- Auto layout **vertikal**, `Resizing` W **Fill 1424** × H **Hug** (304 saat 1 kartu dengan header-label tambahan / 272 tanpa itu — lihat catatan di §4.2).
- `Padding`: horizontal **0**, vertikal **16** (atas-bawah 16, kiri-kanan 0).
- `Gap`: **0** antar kartu.
- `Corner radius`: 0, tanpa `fill` (wrapper transparan, tiap kartu punya background sendiri).

> ⚠️ Gap 0 antar kartu pengajuan terasa janggal kalau nanti ada 2+ pengajuan sekaligus (kartu akan nempel tanpa jarak). Perlu dicek ulang di Figma dengan kondisi 2+ kartu, atau pastikan tiap kartu pakai margin-bottom sendiri.

### 4.2 Kartu pengajuan

- Auto layout **vertikal**, `Resizing` W **Fill 1424** × H **Hug**.
- `Padding`: **24** semua sisi.
- `Gap`: **16** antar sub-blok (header, target box, tombol aksi).
- `Corner radius`: **16** (beda dari radius kartu lain di app yang biasanya 12 — khusus kartu pengajuan ini lebih besar).
- `Fill`: putih `#FFFFFF`.

> Dua versi tinggi tertangkap di screenshot: **H304** (ada teks tambahan di kanan-atas header: "Body Recomp & Hypertrophy") dan **H272** (tanpa teks itu, versi lebih baru/mayoritas screenshot). Dipakai **H272 tanpa teks kanan-atas** sebagai acuan utama di bawah ini — kabari kalau teks itu sebenarnya masih dipakai.

### 4.3 Header kartu (avatar + identitas)

- Auto layout **horizontal**, `Resizing` W **Fill 1376** (= 1424 − padding kartu 24×2) × H **Hug** (≈56).
- `Gap`: **Auto** (elemen didorong ke ujung kiri/kanan kalau ada konten tambahan di kanan).
- `Padding`: 0. Tanpa `fill`.
- Isi (kiri → kanan dalam 1 baris):
  - **Avatar** bulat (≈40–48px), badge titik hijau kecil di pojok kanan-bawah (status verified/online, sama seperti avatar di halaman Riwayat).
  - **Nama**: "Rachel Cooper" — font **Plus Jakarta Sans Bold 18px**, `line height` 24, `letter spacing` 0, `fill` `#181B25` (`--ink`).
  - **Badge usia/gender**: "Age 28 • Female" — pill kecil, `fill` `surface-3`, teks `--ink-soft`.
  - Baris kedua (di bawah nama, kiri): ikon email + "rachel.c@vertexpulse.io" · bullet · ikon jam + "Submitted: Today, 2h ago" — 12px `--muted`.

> ⚠️ **Update tipografi nama:** 18px/Bold beda dari tabel global DESIGN.md §3 ("Nama item (list/card): 16px/600"). Mirip pola di LOGIN.md/VERIFIKASI.md sebelumnya — sepertinya banyak ukuran di implementasi nyata lebih besar dari tabel awal. Disarankan setelah semua halaman terkumpul, revisi tabel tipografi `DESIGN.md` sekali jalan berdasarkan data Inspect yang sudah terkumpul, bukan ditambal satu-satu.

### 4.4 Kotak "Athletic Target"

- Auto layout, **Grid 4 × 1** (4 kolom, 1 baris), `Resizing` W **Fill 1376** × H **Hug** (≈96).
- `Gap`: horizontal **8**, vertikal **8**.
- `Padding`: **16** semua sisi.
- `Corner radius`: **12**. `Fill`: `#F1F3FF` (`--surface-tint`).
- **Hanya kolom pertama yang terisi** di contoh ini; 3 kolom lain kosong — kemungkinan reserved untuk metrik tambahan (misal berat badan saat ini, tanggal target, BMI) yang muncul kalau datanya tersedia. Isi kolom pertama (vertikal):
  - Overline "HYPERTROPHY" (uppercase, `--muted`).
  - Teks bold "-6kg Fat / +3kg Muscle" (`--ink`, ≈14–16px).
  - Caption "16-Week Periodization" (`--muted`, 12px).

> Label overline ("HYPERTROPHY") tampaknya mengikuti kategori target yang sama dengan badge "Hypertrophy"/"Weight Loss" di halaman Klien & Riwayat — tapi di sini ditulis polos tanpa warna badge. Perlu dikonfirmasi apakah sengaja beda gaya di Verifikasi, atau seharusnya tetap pakai badge warna seperti halaman lain (pertanyaan ini juga disebut di VERIFIKASI.md versi state kosong, §5 poin 2 lama — masih berlaku).

### 4.5 Tombol aksi

- Dua tombol pill sejajar horizontal, di bawah kotak target.
- **Decline**: `fill` merah muda terang (kemungkinan `--danger-container` / mirip), teks `#BA1A1A` (`--danger-strong`), ikon "×" di kiri teks.
- **Accept Trainee**: `fill` hijau tua `#006C47`, teks putih, ikon "✓" di kiri teks.
- Keduanya pill (`corner radius` full), ukuran compact (padding ≈10×16, belum ada angka pasti dari Inspect).

> `#006C47` sudah ada sebagai token `--success` di `DESIGN.md`. Teks tombol Decline sekarang dipakaikan `--danger-strong` (`#BA1A1A`) yang juga sudah ada di DESIGN.md, jadi tidak perlu token baru.

---

## 5. Modal: Decline Intake Request

Muncul saat tombol **Decline** di kartu pengajuan (§4.5) diklik. Menutupi seluruh layar termasuk sidebar.

### 5.1 Backdrop

- Frame penuh **1728 × 1120**, auto layout vertikal, `Alignment` atas-tengah.
- `Padding`: atas **256**, sisi lain 0 — ini yang mendorong modal turun dari atas, bukan di-center vertikal penuh.
- Halaman di belakangnya terlihat **redup/gelap** (overlay semi-transparan di atas konten Verifikasi).

### 5.2 Modal container

- `Resizing`: W **576 (max)**, H **Hug** (tinggi menyesuaikan isi — berkisar 458–470-an tergantung panjang teks).
- `Corner radius`: **16** (sama dengan radius kartu pengajuan di §4.2 — mengonfirmasi 16 memang dipakai untuk komponen "besar/penting" seperti modal & kartu utama, terpisah dari radius 12 kartu biasa).
- `Fill`: putih `#FFFFFF`. `Clip content`: ✓ (supaya header/footer yang tintnya beda tetap mengikuti radius container).

### 5.3 Header modal

- Auto layout horizontal, `Resizing` W **Fill 576** × H **Hug** (≈64).
- `Padding`: horizontal **24**, vertikal **16**.
- `Gap`: **Auto** (judul kiri, ikon close didorong ke kanan).
- `Fill`: **`#F1F3FF`** (`--surface-tint`) — beda dari body yang putih, dipakai untuk membedakan header secara visual.
- Isi: judul "Decline Intake Request — Rachel Cooper" (Bold, ≈18–20px, `--ink`) + ikon **×** (close) di kanan, `--muted`.

### 5.4 Body modal

- Auto layout vertikal, `Resizing` W **Fill 576** × H **Hug** (≈322 untuk konten lengkap).
- `Padding`: **24** semua sisi.
- `Gap`: **16** antar sub-blok.
- `Fill`: transparan (putih mengikuti container).

Isi, dari atas ke bawah:

1. **Kotak info "Selected Program"** — ikon (i) + "Selected Program: (Fat Loss & Hypertrophy)" di kiri, badge "STANDARD NOTICE" (uppercase kecil, `--muted`) di kanan. `Fill` `--surface-tint`, radius ≈8, padding ≈12–16.
2. **Rejection Classification** \* (label wajib, asterisk merah):
   - Auto layout dengan **wrap** (pil bisa pindah baris — 3 pil muat di baris pertama, 1 pil turun ke baris kedua), `Resizing` W **Fill 528** × H **Hug** (≈90), `Gap` **6**, `padding` 0.
   - Pil: "Roster At Capacity" (**aktif** — `fill` `#F69665`/`--secondary`, teks putih), "Schedule Conflict", "Out of Scope Goal", "Medical Clearance Needed" (**tidak aktif** — `fill` `#EBEDFB`/`--surface-2`, teks `#464555`/`--ink-soft`). Bentuk pill, radius full.
3. **Mandatory Feedback Message** \* (label wajib) + caption kanan "Will be emailed to client" (`--muted`, kecil):
   - Section `Resizing` W **Fill 528** × H **Hug** (≈118), `gap` **6**, `padding` 0.
   - **Textarea** di bawah label: `fill` `--surface-tint`, radius ≈8–10, padding ≈12–16, teks 14px `--ink`. Isi contoh: "Thank you for applying to CyberPulse. Alex Vance's roster is currently at full capacity for the upcoming training block. We'd love to revisit your intake in a future cycle."

> Perhatikan: teks contoh menyebut **"CyberPulse"**, bukan "Bugarin" — kemungkinan sisa nama proyek lama/placeholder yang belum diganti. Perlu dicek dan diganti ke nama produk final sebelum dipakai.

### 5.5 Footer modal

- Auto layout horizontal, `Resizing` W **Fill 576** × H **Hug** (≈72).
- `Padding`: horizontal **24**, vertikal **16**.
- `Gap`: **8**, `Alignment` rata **kanan**.
- `Fill`: **`#F1F3FF`** (`--surface-tint`) — sama seperti header, body yang putih "terselip" di antara header dan footer yang bertint.
- Isi: tombol **Cancel** (teks polos, tanpa background, `--ink`/`--ink-soft`) + tombol **Confirm Decline** (`fill` **`#BA1A1A`** / `--danger-strong`, teks putih, ikon "no entry" di kiri teks, pill radius full).

> Warna `--danger-strong` (`#BA1A1A`) sekarang jadi satu-satunya token "danger" yang dipakai untuk semua elemen destruktif: teks badge merah (Weight Loss, delta turun), teks tombol Decline (§4.5), dan background tombol Confirm Decline ini. `#A2361B` tidak lagi dipakai sebagai warna danger — tetap jadi `--secondary-deep` untuk aksen oranye tua di tempat lain.

---

## 6. Empty state

Belum ada data Inspect persis untuk bagian ini (ikon dan teks tidak di-select di screenshot), jadi mengikuti deskripsi visual seperti di `DESIGN.md` §7.3:

- Posisi: di tengah (horizontal & vertikal) sisa area konten di bawah toolbar.
- **Ikon**: hourglass + centang, hitam, ukuran besar (≈48–56px).
- **Judul**: "Semua pengajuan sudah diproses" — lebih tebal/besar dari deskripsi di bawahnya (perkiraan 16–18px/600).
- **Deskripsi** (2 baris, rata tengah): "Belum ada pendaftar baru saat ini. Notifikasi otomatis akan muncul di sini begitu ada calon klien mendaftar." — `--ink-soft` atau `--muted`.
- Jarak ikon ke judul dan judul ke deskripsi: spasi vertikal konsisten (≈16–20px), belum ada angka pasti.

> Kalau kamu select ikon dan teks empty state-nya langsung di Figma lalu kirim screenshot Inspect-nya, aku bisa isi angka pastinya di sini.

---

## 7. Hal yang perlu dikonfirmasi

1. Skala tipografi judul/subtitle/nama (lihat kotak peringatan §2 dan §4.3) — mohon konfirmasi supaya `DESIGN.md` bisa diperbarui sekali jalan untuk semua halaman, bukan ditambal satu-satu.
2. Padding dan gap toolbar (§3) — perlu angka pasti dari Inspect langsung di elemen search bar dan chip-nya (bukan cuma container-nya).
3. Gap 0 antar kartu pengajuan saat 2+ pengajuan (§4.1) — perlu dicek apakah ini bug desain atau memang disengaja.
4. Dua versi tinggi kartu pengajuan, H304 vs H272 (§4.2) — apakah teks "Body Recomp & Hypertrophy" di header masih dipakai atau sudah dihapus dari desain final.
5. Label kategori target "HYPERTROPHY" di kotak Athletic Target (§4.4) — polos tanpa badge warna, beda gaya dari badge "Hypertrophy"/"Weight Loss" di halaman Klien/Riwayat. Sengaja beda atau perlu disamakan?
6. 3 kolom kosong di grid "Athletic Target" (§4.4) — apakah memang reserved untuk metrik tambahan, atau cuma sisa grid yang belum dipakai dan sebaiknya grid-nya diganti jadi 1 kolom saja.
7. Teks contoh di Mandatory Feedback Message menyebut **"CyberPulse"** (§5.4) — perlu dipastikan ini placeholder lama yang harus diganti ke nama produk final.
8. Apakah modal **Confirm Decline** ini juga berlaku untuk alur lain yang mirip (misal ada modal "Accept Trainee" dengan pola serupa)? Kalau ada, kirim screenshot-nya supaya didokumentasikan sekalian.

Kirim halaman berikutnya kapan saja.
