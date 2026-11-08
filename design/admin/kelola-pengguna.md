# Kelola Pengguna — Design Spec

> Menu ini punya **2 tab** (Klien dan Personal Trainer/PT), **2 modal** (Daftarkan PT Baru, Konfirmasi Hapus PT), dan **1 halaman terpisah** (Edit PT).
> Dokumen ini fokus pada tampilan konten. Sidebar dan jenis font (font family) ada di md terpisah. Topbar sama dengan `dashboard-admin.md` kecuali disebut lain.
> Tanda `(estimasi)` = nilai diperkirakan dari tampilan visual, bukan dari panel Figma.
> Bagian **"Catatan Inkonsistensi Desain"** di akhir wajib dibaca sebelum implementasi.

---

## 1. Overview

| Item | Nilai |
|---|---|
| Nama menu | Kelola Pengguna |
| Pengguna | Admin |
| Tujuan | Mengelola akun Klien/Atlet dan Personal Trainer: melihat daftar, mencari/filter, mendaftarkan PT baru, mengedit, dan menghapus |
| Frame desktop | 1728 × 1117 px |

### 1.1 Daftar layar

| # | Layar | Route (asumsi) | Sumber Figma |
|---|---|---|---|
| 1 | Tab Klien (default) | `/kelola-pengguna` atau `/kelola-pengguna?tab=klien` | "Kelola pengguna- Klien" |
| 2 | Tab PT | `/kelola-pengguna?tab=pt` | "Kelola pengguna- PT" |
| 3 | Modal Daftarkan Akun PT Baru | (overlay, dibuka dari tab PT) | Modal 576 × 515 |
| 4 | Modal Konfirmasi Hapus PT | (overlay, dibuka dari tombol Hapus di tab PT) | "Pop up hapus" |
| 5 | Halaman Edit PT | `/kelola-pengguna/pt/:id/edit` | "Edit PT" |

### 1.2 Status fitur yang belum final

| Fitur | Status | Instruksi implementasi |
|---|---|---|
| Edit Klien | **Belum ada desain** | Tombol `Edit` di tabel klien tetap ditampilkan sesuai desain, tetapi **belum diimplementasi**: jangan buat halaman/modal edit klien. Pasang handler kosong (TODO) dan jangan navigasi ke mana pun |
| Hapus Klien | **Disepakati**: sama dengan Hapus PT | Pakai komponen modal konfirmasi yang sama dengan Hapus PT (bagian 7.1) |
| Tambah Klien (tombol di tab Klien) | **Belum jelas fitur ini ada atau tidak** (open question) | **Jangan dibuat.** Tab Klien tidak punya tombol tambah, slot kanan di row tab dibiarkan kosong. Siapkan slot agar mudah ditambah nanti |

Belum ada desain (jangan dikarang, pakai rekomendasi di bagian State & interaksi):
- Empty state, loading state, error state
- Dropdown filter dalam keadaan terbuka
- Pagination untuk tab PT

---

## 2. Layout (shared untuk Tab Klien dan Tab PT)

- Frame root: auto layout vertikal, padding kiri `256px` (ruang sidebar), background `#F8F9FF`.
- Area konten: lebar `1408px` (Fill), padding horizontal `32px`, auto layout vertikal, gap `0` (jarak antar section diatur lewat padding bawah tiap section).
- Tinggi area konten: Tab Klien `1007px`, Tab PT `953px` (mengikuti isi).

Urutan section (atas ke bawah), sama di kedua tab:

```
┌─────────────────────────────────────────────────────────────┐
│ Topbar                                                       │
├─────────────────────────────────────────────────────────────┤
│ 1. Banner hijau (judul + deskripsi)                          │
│ 2. Stat Cards (2 card sejajar)                  [pb 24px]    │
│ 3. Tab Switcher            [tombol "Daftarkan PT Baru" (PT)] │
│ 4. Table Card (putih)                                        │
│    ├─ Filter Bar (search + 3 dropdown)          [pb 16px]    │
│    ├─ Table Header (bg biru muda)                            │
│    ├─ Table Rows                                             │
│    └─ Pagination (hanya terlihat di tab Klien)               │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Komponen Shared

### 3.1 Banner

- Lebar penuh (1408px), tinggi ±100px (estimasi), radius ±12px, drop shadow halus, padding ±16–24px.
- Background: `#7DC04E` dengan **gradasi lebih terang di sisi kanan** (overlay `#AFF67C` opacity ±25%, mulai ±85% lebar sampai tepi kanan). Estimasi CSS: `linear-gradient(90deg, #7DC04E 0%, #7DC04E 85%, #8FD56A 100%)`.
- Judul: `Manajemen Terpusat Klien & Atlet Bugarin` — putih, bold, ±24px.
- Deskripsi: `Pantau 1,428 atlet aktif, alokasi Personal Trainer pendamping, program latihan aktif, serta kepatuhan biometrik atlet secara real-time.` — putih, ±13px, `max-width` ±640px (2 baris).
- Angka `1,428` dinamis (sama dengan stat "Total Klien Aktif").
- Banner sama di kedua tab (tidak berubah saat ganti tab).

### 3.2 Stat Cards

- 2 card sejajar, gap ±16px, masing-masing 50% lebar. Tinggi card ±116px (row 140px Hug dengan padding bawah 24px).
- Background `#FFFFFF`, radius ±12px, padding ±16px, **tanpa icon** (berbeda dengan stat card di Dashboard).
- Label: uppercase, bold, ±11px, letter-spacing lebar, `#5A5E69`.
- Nilai: bold, ±32px, `#0B1C30`, ditaruh di bawah label.

| Card | Label | Nilai (dummy) |
|---|---|---|
| 1 | `TOTAL KLIEN AKTIF` | `1,428` |
| 2 | `KLIEN TERHUBUNG PT` | `1,392` |

> Selisih 1,428 − 1,392 = 36 klien belum punya PT (sesuai badge "Tidak Ada PT" di tabel klien).
> Stat yang sama tampil di kedua tab pada desain (lihat catatan inkonsistensi).

### 3.3 Tab Switcher

- Row lebar penuh, `align-items: center`, `justify-content: space-between`.
- Kiri: 2 tab. Kanan: slot aksi. Tab PT: tombol "Daftarkan PT Baru". Tab Klien: **slot kosong** (belum ada keputusan fitur tambah klien, lihat 1.2).
- Tinggi: Tab Klien `56px Hug` (ada container putih rounded di belakang tab), Tab PT `44px Hug` (tanpa container putih). Seragamkan saat implementasi.

| Tab | Label | Badge (dummy) |
|---|---|---|
| 1 | `Daftar Personal Trainer (PT)` | `86 Aktif` |
| 2 | `Daftar Klien` | `1,428 Aktif` |

**State tab**
- **Aktif**: pill `#F69665`, teks putih (±12px, medium), badge putih dengan teks gelap `#0B1C30` (bold, ±10px, pill).
- **Tidak aktif**: tanpa background, teks `#0B1C30` / `#5A5E69`, badge background `#E5EEFF` (lavender muda), teks gelap.
- Urutan tab: PT di kiri, Klien di kanan. Tab default saat halaman dibuka adalah **Klien**.

**Tombol "Daftarkan PT Baru"** (hanya tab PT)
- Pojok kanan row, background `#F69665`, teks putih, ±12px medium, icon `user-plus` di kiri, radius ±8px, padding ±8×16px.
- Klik → buka Modal Daftarkan Akun PT Baru (bagian 6).

### 3.4 Table Card

- Container putih `#FFFFFF`, lebar penuh, drop shadow halus, `clip content` aktif, radius bawah ±12px.
- Isi berurutan: Filter Bar → Table Header → Rows → Pagination.

### 3.5 Filter Bar

- Lebar penuh, background `#FFFFFF`, tinggi total `64px` (konten ±48px + padding bawah 16px), item sejajar vertikal tengah, jarak antar item ±24px, padding kiri ±16px.
- **Search input**: lebar ±200px (estimasi), tinggi ±36px, background `#EFF4FF`, radius ±8px, icon `search` abu di kiri, placeholder `Cari nama klien, email, ID atlet, atau ...` (teks terpotong di desain; teks lengkap belum final), placeholder `#5A5E69`.
- **Dropdown (3 buah)**: background `#EFF4FF`, radius ±8px, tinggi ±36px, teks ±12px `#0B1C30`, chevron-down di kanan.

| Dropdown | Teks default (Tab Klien) |
|---|---|
| 1 | `Semua Status Klien` |
| 2 | `Semua Program & Cohort` |
| 3 | `Semua Personal Trainer Pendamping` |

> Di desain Tab PT, filter bar memakai teks **yang sama persis** dengan Tab Klien. Itu kemungkinan sisa copy-paste. Rekomendasi isi untuk Tab PT ada di bagian 5.2.

### 3.6 Table Header

- Background `#EFF4FF` (lavender sangat muda), tinggi ±56px, lebar penuh.
- Teks kolom: uppercase, bold, ±10px, letter-spacing lebar, warna `#0B1C30` / `#5A5E69`, **rata tengah** terhadap kolomnya.

### 3.7 Table Rows

- Tinggi tiap baris ±100px (4 baris = 400px), background putih, **tanpa garis pemisah** (pemisahan hanya lewat jarak/whitespace). Konten tiap sel vertikal tengah.
- Hover (rekomendasi): background `#F8F9FF`.

### 3.8 Pagination

- Bar lebar penuh, tinggi `66px`, background putih, padding horizontal `16px`, `justify-content: space-between`, item vertikal tengah.
- **Kiri**: `Menampilkan 1 - 5 dari 1,428 Klien terdaftar • Hal 1 dari 286` — ±11px. Angka (`1 - 5`, `1,428 Klien`, `1`, `286`) **bold** `#0B1C30`, sisanya reguler `#5A5E69`.
- **Kanan**: tombol-tombol kecil ±28px, radius ±6px, sejajar gap ±4–8px:
  - `|<` (halaman pertama), `<` (sebelumnya): ikon abu muda saat di halaman 1 (disabled)
  - Nomor halaman `1 2 3 … 8`
  - `>` (berikutnya), `>|` (halaman terakhir)
  - Halaman aktif: background `#7DC04E`, teks putih, bold. Halaman lain: teks `#0B1C30` tanpa background. Tombol ikon: background `#EFF4FF`.
- Perhitungan: 1,428 klien / 5 per halaman = 286 halaman.

---

## 4. Tab Klien

### 4.1 Kolom tabel

| # | Header | Isi sel |
|---|---|---|
| 1 | `PROFIL KLIEN` | Avatar bulat ±40px + nama (semi-bold ±14px, `#0B1C30`) + email di bawahnya (±11px, `#5A5E69`) |
| 2 | `PERSONAL TRAINER PENDAMPING` | Avatar bulat ±24px + nama PT (bold ±12px, bisa 2 baris) **atau** pill `Tidak Ada PT` |
| 3 | `PROGRAM & TARGET AKTIF` | Nama program (bold ±11px) kiri + persentase (bold ±11px) kanan, progress bar di bawahnya |
| 4 | `STATUS AKUN` | Badge status |
| 5 | `TINDAKAN` | Tombol `Edit` dan `Hapus` |

Proporsi lebar kolom (estimasi, dari posisi center tiap kolom): Profil ≈ 1.4fr, PT ≈ 1.3fr, Program ≈ 1.3fr, Status ≈ 1fr, Tindakan ≈ 1fr. Ratakan sel ke tengah kolomnya agar sejajar header.

### 4.2 Detail sel

**Avatar klien**: foto bulat. Klien tanpa PT (status Onboarding) memakai **ring/border oranye** `#F69665` ±2px. Klien lain ring abu tipis atau tanpa ring.

**Pill "Tidak Ada PT"**: background `#F69665`, teks putih, ±11px medium, radius ±6px, padding ±4×16px, rata tengah di kolom.

**Progress bar**
- Track: `#DCE9FF`, tinggi ±5px, radius penuh, lebar ±165px.
- Fill program **Naik Berat Badan**: `#7DC04E`; persentase teks hijau tua `#326B00`.
- Fill program **Turun Berat Badan**: `#F69665`; persentase teks cokelat-oranye `#95491F` (estimasi).
- Lebar fill = persentase. Pada 0% desain menampilkan fill kecil (±12%) sebagai penanda minimum; boleh diterapkan `min-width` kecil atau 0, pilih satu.

**Badge status** (uppercase, bold, ±10px, pill, dot bulat ±6px di kiri teks)
| Status | Background | Teks & dot |
|---|---|---|
| `AKTIF` | hijau muda (`#AFF67C` opacity ±40%) | `#214C00` / `#326B00` |
| `ONBOARDING` | oranye muda (`#F69665` opacity ±30%) | `#95491F` (cokelat-oranye) |

**Tombol Edit / Hapus**: kedua tombol **bergaya sama**, background `#E5EEFF` (atau `#DCE9FF`), teks `#0B1C30` ±11px medium, radius ±6px, padding ±6×12px, gap ±8px.
- `Hapus` (klien) → buka modal konfirmasi hapus klien (bagian 7.1).
- `Edit` (klien) → **belum diimplementasi** (belum ada desain Edit Klien). Tombol tampil, handler dikosongkan (TODO).

### 4.3 Data dummy (4 baris)

| Klien | Email | PT Pendamping | Program | % | Status |
|---|---|---|---|---|---|
| Sarah Jenkins | sarah.j@athlete.id | Bambang Wicaksono, CSCS | Naik Berat Badan | 67% | AKTIF |
| Dimas Arya | dimas.arya@corpora | *(tidak ada)* → `Tidak Ada PT` | Turun Berat Badan | 0% | ONBOARDING |
| Linda Kusuma | linda.kusuma@techapac.com | Nadia Safitri, M.Or | Naik Berat Badan | 85% | AKTIF |
| Michael Chen | mchen.arch@designstudio.id | Nadia Safitri, M.Or | Turun Berat Badan | 42% | AKTIF |

Pagination di tab ini terlihat penuh (1–5 dari 1,428 klien).

---

## 5. Tab PT

### 5.1 Kolom tabel

| # | Header | Isi sel |
|---|---|---|
| 1 | `PROFIL TRAINER` | Avatar bulat ±32px + nama (semi-bold ±13px, `#0B1C30`) + baris kedua `ID: PT-BGR-0881 • Senopati Hub` (±10px, `#5A5E69`) |
| 2 | `KEAHLIAN` | Pill keahlian, mis. `Naik BB` |
| 3 | `KREDENSIAL & AKSES` | Email (±11px, `#0B1C30`) + `Dibuat 14 Jan 2024` (±11px, `#5A5E69`) |
| 4 | `STATUS` | Badge `AKTIF` (gaya sama dengan tab Klien) |
| 5 | `CABANG GYM` | Teks cabang (±11px) |
| 6 | `TINDAKAN ADMIN` | Tombol `Edit` dan `Hapus` (gaya sama dengan tab Klien) |

- Tinggi baris ±96–100px, 5 baris per halaman. Tinggi container tabel ±561px.
- **Pill keahlian**: background `#82F9BE` opacity ±40%, teks `#006C47`, ±10px medium, radius penuh, padding ±4×10px. Untuk "Turun BB" gunakan pasangan warna oranye (`#F69665` 30% + teks `#95491F`) agar konsisten dengan progress bar program di tab Klien (rekomendasi, belum ada di desain).
- Badge `AKTIF` memakai warna sama dengan tab Klien. Status lain (mis. Suspend/Nonaktif) belum ada di desain.

### 5.2 Filter bar tab PT

Desain Figma: sama dengan tab Klien. **Rekomendasi** untuk tab PT:

| Elemen | Rekomendasi |
|---|---|
| Search | `Cari nama PT, email, atau ID trainer...` |
| Dropdown 1 | `Semua Status PT` |
| Dropdown 2 | `Semua Keahlian` |
| Dropdown 3 | `Semua Cabang Gym` |

Bila ingin persis desain, tetap pakai teks Figma. Konfirmasi ke desainer.

### 5.3 Data dummy

Desain menampilkan **5 baris identik** (placeholder). Gunakan data bervariasi saat mock:

```json
{
  "name": "Bambang Wicaksono, CSCS",
  "trainerId": "PT-BGR-0881",
  "hub": "Senopati Hub",
  "specialization": "Naik BB",
  "email": "bambang.w@bugarin.fit",
  "createdAt": "2024-01-14",
  "status": "AKTIF",
  "branch": "pusatgym"
}
```

> Nilai `branch: "pusatgym"` tampak seperti slug mentah. Tampilkan sebagai label cabang yang rapi bila data asli tersedia.

### 5.4 Pagination tab PT

Tidak ada di desain. Gunakan komponen yang sama dengan teks `Menampilkan 1 - 5 dari 86 PT terdaftar • Hal 1 dari 18`.

### 5.5 Aksi tombol

| Tombol | Aksi |
|---|---|
| `Edit` | Navigasi ke halaman Edit PT (bagian 8) |
| `Hapus` | Buka Modal Konfirmasi Hapus PT (bagian 7) |
| `Daftarkan PT Baru` | Buka Modal Daftarkan Akun PT Baru (bagian 6) |

---

## 6. Modal — Daftarkan Akun PT Baru

- Lebar `576px` (max), tinggi ±515px (Hug), radius `20px`, background `#FFFFFF`, drop shadow besar, `clip content`.
- Overlay di belakang: gelap semi-transparan (±rgba(11,28,48,0.4)), halaman di belakang tampak blur/redup.

**Header**
- Background navy gelap `#213145`, padding ±24px 32px.
- Judul `Daftarkan Akun PT Baru` — putih, semi-bold, ±22px.
- Subjudul `Penerbitan akun trainer resmi ekosistem Bugarin` — `#C3C6D3`, ±14px.
- Tombol tutup `X` putih di kanan atas.

**Body** (padding ±32px, background putih)
- Label section: `1. IDENTITAS PERSONAL TRAINER` — uppercase, bold, ±12px, letter-spacing lebar, `#5A5E69`.
- Field (label bold ±14px `#0B1C30`, diakhiri ` *`; input tinggi ±48px, background `#EFF4FF`, radius ±8px, teks ±15px, placeholder `#9CA3AF`):

| Baris | Field | Tipe | Placeholder / default |
|---|---|---|---|
| 1 | `Nama Lengkap & Gelar Resmi *` | text, lebar penuh | `Contoh: Farhan Pratama, S.Or, CSCS` |
| 2 kiri | `Alamat Email Resmi (@bugarin.fit) *` | email | `farhan.p@bugarin.fit` |
| 2 kanan | `Nomor WhatsApp Aktif *` | tel | `+62 812-xxxx-xxxx` |
| 3 kiri | `Cabang Penempatan Utama Gym *` | select | `Pilih Cabang Resmi...` |
| 3 kanan | `Jenis Kelamin *` | select | `Laki-laki` |
| 4 | `Spesialisasi Fokus Pembinaan *` | text (rekomendasi: select/multi-select) | `Contoh: Naik BB or Turun BB` |

- Baris 2 dan 3 memakai grid 2 kolom, gap ±16px. Jarak antar baris ±16–24px.
- Opsi Jenis Kelamin (asumsi): `Laki-laki`, `Perempuan`.

**Tombol submit**
- Lebar penuh, tinggi ±48px, background `#F69665`, teks `Konfirmasi Pembuatan` putih semi-bold ±16px, radius ±10px, shadow halus. Letakkan di bawah field dengan jarak ±32px.

---

## 7. Modal — Konfirmasi Hapus PT

- Lebar `576px` (max), tinggi ±200px (Hug), radius `16px`, `clip content`.
- **Header** (background `#F1F3FF`): judul `Konfirmasi Hapus PT` (semi-bold ±20px, `#181B25`), tombol tutup `X` di kanan (`#464555`).
- **Body** (background putih): teks `Yakin Menghapus Akun PT?` (semi-bold ±20px, `#181B25`) diikuti tanda `*` merah `#A2361B`.
- **Footer** (background putih, rata kanan, gap ±16px):
  - `Batal`: tombol teks tanpa background, `#464555`, semi-bold ±16px.
  - `Konfirmasi Hapus`: pill merah `#BA1A1A`, teks putih semi-bold ±16px, icon `ban` (lingkaran garis diagonal) putih di kiri, padding ±12×24px, radius penuh.
- Perilaku: `Batal`/`X`/klik overlay/tombol Esc menutup modal. `Konfirmasi Hapus` memanggil API hapus, menampilkan loading di tombol, lalu menutup modal dan merefresh tabel.
- Tanda `*` di pertanyaan kemungkinan sisa komponen label form (lihat catatan inkonsistensi).

### 7.1 Varian Hapus Klien (disepakati: ikut Hapus PT)

Komponen, ukuran, warna, dan perilaku **sama persis** dengan modal Hapus PT. Hanya teks yang berbeda:

| Elemen | Hapus PT | Hapus Klien |
|---|---|---|
| Judul header | `Konfirmasi Hapus PT` | `Konfirmasi Hapus Klien` |
| Pertanyaan | `Yakin Menghapus Akun PT?` | `Yakin Menghapus Akun Klien?` |
| `Batal` / `Konfirmasi Hapus` | sama | sama |

Buat satu komponen `ConfirmDeleteDialog` dengan props `title` dan `question`. Perlakuan tanda `*` merah di pertanyaan harus sama di kedua varian (ikuti keputusan untuk modal PT).

---

## 8. Halaman Edit PT

Halaman penuh terpisah (bukan modal), dibuka dari tombol `Edit` di tab PT.

### 8.1 Struktur

- Topbar sama dengan Dashboard. Perbedaan di frame ini: avatar topbar berupa **foto**, bukan inisial `AV`, dan bell **tanpa** titik merah. Anggap itu variasi state (ada foto profil, tidak ada notifikasi).
- Konten (lebar ±1402–1408px), urutan:
  1. Link kembali `← Batal & Kembali`
  2. Banner hijau
  3. Grid 2 kartu (12 kolom, tiap kartu span **6 kolom**, gap ±16px)

```
← Batal & Kembali
┌──────────────────────────────────────────────────┐
│ Banner: Edit Konfigurasi & Profil Personal Trainer│
└──────────────────────────────────────────────────┘
┌───────────────────────┐ ┌───────────────────────┐
│ Identitas & Biodata   │ │ Aksi Kredensial &     │
│ Operasional           │ │ Kontrol Keamanan      │
└───────────────────────┘ └───────────────────────┘
```

### 8.2 Link kembali

- `← Batal & Kembali`: icon `arrow-left` + teks, ±16px, medium, `#0B1C30`, rata kiri, jarak ±12px di bawah topbar. Klik → kembali ke tab PT (`/kelola-pengguna?tab=pt`), tanpa menyimpan.

### 8.3 Banner

- Gaya sama dengan banner di bagian 3.1 (hijau + gradasi kanan), tinggi lebih pendek ±64px.
- Judul: `Edit Konfigurasi & Profil Personal Trainer` (putih, bold ±22px).
- Deskripsi: `Perbarui profil kredensial, penyesuaian kuota klien, hak akses cabang, dan aksi keamanan akun pelatih.` (putih, ±12px, 1 baris).

### 8.4 Kartu kiri — "Identitas & Biodata Operasional"

- Card putih, radius ±12px, drop shadow, padding ±16px.
- Judul `Identitas & Biodata Operasional` (semi-bold ±16px, `#0B1C30`), subjudul `Informasi identitas resmi dan penetapan unit operasional pelatih` (±10px, `#777587`).
- Form grid 2 × 2, gap ±16px. Label uppercase, bold, ±9–10px, letter-spacing lebar, `#5A5E69`. Input background `#EFF4FF`, radius ±8px, tinggi ±36px, icon di kiri, teks ±12px `#0B1C30`.

| Posisi | Label | Icon | Nilai contoh |
|---|---|---|---|
| Kiri atas | `NAMA LENGKAP` | `user` | `Bambang Wicaksono, S.Or, CSCS` |
| Kanan atas | `NOMOR WHATSAPP OPERASIONAL` | `phone` | `+62 811-2345-6789` |
| Kiri bawah | `EMAIL RESMI` | `mail` | `bambang.w@bugarin.fit` |
| Kanan bawah | `CABANG GYM` | `map-pin` | `Senopati Hub (Jakarta Selatan) - Lt. 2` (teks terpotong; field ini select) |

- Tinggi kartu kiri ±(sesuai konten); kartu kanan ±324px, tinggi kartu tidak harus sama.

### 8.5 Kartu kanan — "Aksi Kredensial & Kontrol Keamanan"

- Card putih, radius ±12px, **drop shadow** (terkonfirmasi di Figma), padding ±16px, lebar `692px` (6 kolom).
- Judul `Aksi Kredensial & Kontrol Keamanan` (semi-bold ±16px), subjudul `Kelola sesi aktif, reset sandi, dan status suspensi darurat akun pelatih` (±10px, `#777587`).
- **Blok password**
  - Label `Perbarui Password Personal Trainer` (bold ±12px, `#0B1C30`).
  - Input password: icon `key` kiri, nilai `••••••••`, icon `eye` kanan (toggle tampil/sembunyi), background `#EFF4FF`, radius ±8px.
  - Tombol `Paksa Reset Password`: rata kanan di bawah input, background `#F69665`, teks putih ±11px medium, radius ±6px, padding ±8×16px.
- **Blok Suspend**
  - Container background `#EFF4FF`, radius ±8px, padding ±12px, jarak ±16px dari blok password.
  - Judul `Kunci Sementara Akun Pelatih (Suspend)` (bold ±12px).
  - Deskripsi `Nonaktifkan akses login dan booking sesi jika pelatih sedang mengambil cuti panjang atau audit operasional.` (±10px, `#5A5E69`, lebar ±70%).
  - **Toggle switch** di kanan: state default **OFF** (track `#DCE9FF`, knob putih di kiri). State ON (rekomendasi): track `#BA1A1A` atau `#F69665`, knob di kanan.

### 8.6 Tombol simpan

**Tidak ada di desain.** Lihat catatan inkonsistensi nomor 1.

---

## 9. Style (khusus menu ini)

### 9.1 Color tokens (dari panel Selection colors Figma)

| Token (usulan) | Hex | Dipakai untuk |
|---|---|---|
| `bg-page` | `#F8F9FF` | Background halaman |
| `surface` | `#FFFFFF` | Card, tabel, filter bar, body modal |
| `surface-low` | `#EFF4FF` / `#F1F3FF` | Table header, input, background tab tidak aktif, header modal hapus |
| `surface-mid` | `#E5EEFF` | Tombol Edit/Hapus, badge tab tidak aktif |
| `track` | `#DCE9FF` | Track progress bar, track toggle OFF |
| `primary` | `#7DC04E` | Banner, halaman aktif pagination, fill progress "Naik BB" |
| `primary-light` | `#AFF67C` | Gradasi banner, background badge AKTIF (opacity ±40%) |
| `primary-dark` | `#326B00` / `#214C00` | Teks persentase "Naik BB", teks badge AKTIF |
| `mint` | `#82F9BE` | Background pill keahlian (opacity ±40%) |
| `mint-text` | `#006C47` | Teks pill keahlian |
| `accent-orange` | `#F69665` | Tab aktif, tombol Daftarkan PT Baru, Paksa Reset, Konfirmasi Pembuatan, pill "Tidak Ada PT", fill progress "Turun BB" |
| `accent-brown` | `#95491F` | Teks persentase "Turun BB", teks badge ONBOARDING (estimasi) |
| `danger` | `#BA1A1A` | Tombol Konfirmasi Hapus |
| `danger-dark` | `#A2361B` | Tanda `*` di modal hapus |
| `navy` | `#213145` | Header modal Daftarkan PT |
| `text-primary` | `#0B1C30` | Teks utama |
| `text-title` | `#181B25` | Judul modal |
| `text-secondary` | `#5A5E69` / `#464555` | Teks sekunder, label |
| `text-muted` | `#777587` | Subjudul card (halaman Edit PT) |
| `placeholder` | `#9CA3AF` | Placeholder input modal |
| `on-navy-muted` | `#C3C6D3` | Subjudul header modal navy |
| `misc` | `#41493A`, `#727A68` | Muncul di panel Figma (teks/icon sekunder bernuansa hijau-abu); belum jelas penggunaannya |

### 9.2 Spacing, radius, shadow

- Radius: card/banner `12px`, input/dropdown `8px`, tombol kecil `6px`, pill/badge penuh, modal hapus `16px`, modal daftar `20px`.
- Drop shadow card: tipis, mis. `0 1px 3px rgba(0,0,0,0.06)` (estimasi; Figma hanya menyebut "Drop shadow").
- Padding bawah section: stat row `24px`, filter bar `16px`.
- Grid halaman Edit PT: 12 kolom, gap ±16px.

---

## 10. State & interaksi

> Bagian ini rekomendasi standar kecuali ditandai **(desain)**.

| Elemen | State | Perilaku |
|---|---|---|
| Tab switcher | click | Ganti tab, perbarui query `?tab=`, reset filter dan halaman ke 1, ganti kolom tabel dan tombol aksi kanan **(desain: tombol kanan hanya di tab PT)** |
| Search | input | Debounce ±300ms, reset ke halaman 1 |
| Dropdown filter | change | Muat ulang data, reset ke halaman 1 |
| Pagination | click | Ganti halaman; tombol `|<` `<` disabled di halaman 1, `>|` `>` disabled di halaman terakhir |
| Baris tabel | hover | Background `#F8F9FF` |
| Tombol Edit (PT) | click | Navigasi ke halaman Edit PT |
| Tombol Edit (Klien) | click | **Belum diimplementasi** (TODO, belum ada desain) |
| Tombol Hapus (PT / Klien) | click | Buka modal konfirmasi hapus (varian sesuai tab) |
| Modal (semua) | open | Overlay, kunci scroll body, fokus ke elemen pertama; `Esc` dan klik overlay menutup (kecuali saat submit berjalan) |
| Modal Daftarkan PT | submit | Validasi semua field wajib (`*`), email harus berakhiran `@bugarin.fit`, WhatsApp format `+62...`; error tampil di bawah field dengan warna `#BA1A1A`; tombol loading saat submit; sukses → tutup modal, toast sukses, refresh tabel |
| Modal Hapus (PT / Klien) | confirm | Loading di tombol; sukses → tutup, toast, refresh tabel |
| Toggle Suspend | click | Tampilkan konfirmasi sebelum mengubah status; toast hasil |
| Paksa Reset Password | click | Tampilkan konfirmasi (dampak: sesi login PT keluar paksa), lalu kirim reset |
| Icon eye (password) | click | Toggle tampil/sembunyi |
| Tabel | loading | Skeleton baris (avatar bulat + 2 garis teks) |
| Tabel | empty | Ilustrasi/ikon + teks `Tidak ada data yang cocok` + tombol reset filter |
| Tabel | error | Pesan error dan tombol `Coba lagi` |

---

## 11. Data

```json
{
  "stats": { "totalActiveClients": 1428, "clientsConnectedToPT": 1392, "activeTrainers": 86 },
  "pagination": { "page": 1, "perPage": 5, "total": 1428, "totalPages": 286 },
  "clients": [
    { "name": "Sarah Jenkins", "email": "sarah.j@athlete.id", "trainer": "Bambang Wicaksono, CSCS", "program": "Naik Berat Badan", "progress": 67, "status": "AKTIF" },
    { "name": "Dimas Arya", "email": "dimas.arya@corpora", "trainer": null, "program": "Turun Berat Badan", "progress": 0, "status": "ONBOARDING" },
    { "name": "Linda Kusuma", "email": "linda.kusuma@techapac.com", "trainer": "Nadia Safitri, M.Or", "program": "Naik Berat Badan", "progress": 85, "status": "AKTIF" },
    { "name": "Michael Chen", "email": "mchen.arch@designstudio.id", "trainer": "Nadia Safitri, M.Or", "program": "Turun Berat Badan", "progress": 42, "status": "AKTIF" }
  ],
  "trainers": [
    { "name": "Bambang Wicaksono, CSCS", "trainerId": "PT-BGR-0881", "hub": "Senopati Hub", "specialization": "Naik BB", "email": "bambang.w@bugarin.fit", "createdAt": "2024-01-14", "status": "AKTIF", "branch": "pusatgym" }
  ],
  "trainerEditForm": {
    "fullName": "Bambang Wicaksono, S.Or, CSCS",
    "whatsapp": "+62 811-2345-6789",
    "email": "bambang.w@bugarin.fit",
    "branch": "Senopati Hub (Jakarta Selatan) - Lt. 2",
    "suspended": false
  },
  "createTrainerForm": {
    "fullName": "", "email": "", "whatsapp": "", "branch": "", "gender": "Laki-laki", "specialization": ""
  }
}
```

---

## 12. Responsive

Desain hanya tersedia untuk desktop (1728px).

| Breakpoint | Perilaku |
|---|---|
| ≥ 1280px | Sesuai desain |
| 768–1279px | Stat cards tetap 2 kolom. Filter bar membungkus (wrap) ke 2 baris. Tabel scroll horizontal di dalam container. Halaman Edit PT: kartu menjadi 1 kolom |
| < 768px | Stat cards 1 kolom. Tab switcher scroll horizontal, tombol "Daftarkan PT Baru" turun ke baris sendiri. Filter bar 1 kolom. Tabel diubah ke tampilan kartu per baris atau scroll horizontal. Modal hampir full-screen |

---

## 13. Catatan implementasi

1. **Komponen reusable**: `PageBanner` (varian tinggi), `StatCard` (varian tanpa icon, beda dengan Dashboard), `TabSwitcher` (dengan badge), `FilterBar`, `DataTable`, `StatusBadge`, `ProgressBar`, `AvatarWithText`, `Pagination`, `Modal` (header berwarna navy atau `#F1F3FF`), `ConfirmDialog` (dipakai Hapus PT dan nanti Hapus Klien), `ToggleSwitch`.
2. Satu halaman, dua tab: tab hanya mengganti kolom, data, teks filter, dan slot tombol kanan. Banner dan stat tetap.
3. Kolom tabel: gunakan CSS Grid dengan `grid-template-columns` yang sama untuk header dan baris supaya sejajar. Desain Figma punya sedikit pergeseran antar-baris (avatar/teks tidak persis sejajar), jangan ditiru.
4. Aksesibilitas: tombol icon-only (`X`, eye, ikon pagination) butuh `aria-label`; modal pakai `role="dialog"` + focus trap; toggle pakai `role="switch"`; badge status jangan hanya mengandalkan warna (teks sudah ada).
5. Jumlah per halaman: 5 baris (sesuai teks pagination "1 - 5").
6. Hak akses: halaman dan aksi ini khusus Admin.
7. Fitur yang sengaja **tidak** diimplementasi dulu: Edit Klien dan Tambah Klien (lihat 1.2). Jangan membuat route, modal, atau tombol baru untuk keduanya tanpa instruksi lanjutan.

---

## 14. Catatan Inkonsistensi Desain (konfirmasi sebelum implementasi)

1. **Halaman Edit PT tidak punya tombol Simpan.** Hanya ada `Batal & Kembali`. Rekomendasi: tambahkan tombol primary `Simpan Perubahan` (`#F69665`, putih) di bawah kartu Identitas atau di pojok kanan banner, dan tampilkan peringatan jika ada perubahan yang belum disimpan.
2. **Stat card sama di kedua tab** (1,428 dan 1,392 tampil juga di tab PT). Kemungkinan tab PT seharusnya menampilkan statistik PT (mis. total PT aktif, rata-rata klien per PT).
3. **Filter bar tab PT** memakai teks klien (`Semua Status Klien`, dst). Lihat rekomendasi di 5.2.
4. **Pagination "1 2 3 … 8"** tidak cocok dengan "Hal 1 dari 286". Gunakan nomor halaman terakhir yang dinamis (`286`).
5. **Tab Klien vs Tab PT**: tinggi row tab berbeda (56px vs 44px) dan hanya tab Klien yang punya container putih di belakang tab. Seragamkan.
6. **Tombol Hapus** bergaya netral (biru muda) sama seperti Edit. Tidak ada penanda bahaya (merah). Biarkan sesuai desain atau minta varian merah.
7. **Tanda `*` merah** di `Yakin Menghapus Akun PT?` kemungkinan tidak disengaja.
8. **Teks placeholder search** terpotong (`...atau`). Teks lengkap belum ada.
9. **Tab PT**: 5 baris data identik dan `pusatgym` mentah adalah placeholder.
10. **Field Spesialisasi** di modal Daftarkan PT berupa input teks dengan contoh `Naik BB or Turun BB`. Karena nilainya terbatas, rekomendasi dijadikan select/multi-select.
11. **Antar frame**: avatar topbar `AV` (inisial) vs foto, dan bell dengan/tanpa titik merah. Anggap variasi state, bukan komponen berbeda.
12. **Sidebar**: label di bawah logo **final `ADMIN`** (tanpa kata "Super"; sebagian frame Figma masih menulis `SUPER ADMIN`, abaikan). Nama menu `Profil` vs `Profil Admin` juga berbeda antar frame. Rujuk md sidebar sebagai sumber yang benar.
13. **Open question produk**: apakah klien bisa didaftarkan manual oleh admin (tombol "Daftarkan Klien Baru") atau hanya mendaftar sendiri lewat aplikasi? Sampai ada jawaban, tab Klien tanpa tombol tambah.
14. **Edit Klien** belum didesain, jadi tombol `Edit` di tab Klien hanya placeholder.
