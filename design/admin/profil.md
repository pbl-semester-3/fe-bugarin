# Profil — Design Spec

> Halaman profil admin yang sedang login. Punya **banner profil** dan **2 tab**: "Informasi Data Diri" (form biodata + pengaturan Mode Tampilan Antarmuka) dan "Keamanan & Ganti Password" (form ganti kata sandi).
> Dokumen ini fokus pada tampilan konten. Sidebar dan jenis font (font family) ada di md terpisah. Topbar sama dengan `dashboard-admin.md`.
> Label peran di sidebar (di bawah logo Bugarin) adalah **`ADMIN`**, tanpa kata "Super".
> Tanda `(estimasi)` = nilai diperkirakan dari tampilan visual, bukan dari panel Figma.
> Bagian **"Catatan Inkonsistensi Desain"** di akhir wajib dibaca sebelum implementasi.

---

## 1. Overview

| Item | Nilai |
|---|---|
| Nama menu | Profil |
| Pengguna | Admin yang sedang login (contoh: "Alexandra Daniswara") |
| Tujuan | Melihat dan mengubah data diri admin, serta mengganti kata sandi |
| Frame desktop | 1728 × 1117 px |

### 1.1 Daftar layar

| # | Layar | Route (asumsi) | Sumber Figma |
|---|---|---|---|
| 1 | Tab "Informasi Data Diri" (default) | `/profil` atau `/profil?tab=info` | "Profil- Informasi data diri" |
| 2 | Tab "Keamanan & Ganti Password" | `/profil?tab=keamanan` | Frame keamanan |

### 1.2 Keputusan dan batasan

| Hal | Status | Instruksi implementasi |
|---|---|---|
| Ganti foto profil | **Tidak ada di desain** | Jangan dibuat tombol upload/ubah foto. Tampilkan foto yang sudah ada |
| Alur "Lupa kata sandi?" | **Belum ada desain** | Tautan tampil sesuai desain, aksinya TODO (jangan buat halaman baru) |
| Indikator kekuatan password / aturan password | **Tidak ada di desain** | Jangan dibuat visual tambahan. Validasi tetap dijalankan (lihat bagian 8) |
| Mode Tampilan Antarmuka (Terang/Gelap) | **UI ada di desain, palet gelap berupa usulan** | Buat kontrol dan penyimpanan preferensinya (bagian 4.4). Warna mode gelap mengikuti `dark-mode.md` (usulan, belum ditinjau desainer) |

---

## 2. Layout

- Frame root: auto layout vertikal, padding kiri `256px` (ruang sidebar), background `#F8F9FF`.
- Area konten: lebar `1472px` (Fill), padding **kiri/kanan `32px`**, **atas `64px`** (di bawah topbar), **bawah `32px`** (tab Informasi) / `24px` (tab Keamanan). Lebar efektif konten `1408px`.
- Tinggi area konten: tab Informasi ±900px, tab Keamanan ±843px (mengikuti isi).
- Urutan section (atas ke bawah), sama di kedua tab:

```
┌─────────────────────────────────────────────────────────┐
│ Topbar                                                   │
├─────────────────────────────────────────────────────────┤
│ 1. Banner Profil (foto + nama)                           │
│ 2. Tab Bar   [Informasi Data Diri] [Keamanan & ...]      │
│                              TERAKHIR DIUBAH: ... [kanan]│
│ 3. Card form (span 8 dari 12 kolom, rata kiri)           │
│    (tab Informasi: di dalamnya ada blok Mode Tampilan)   │
│    └─ kolom kanan (4 kolom) dibiarkan kosong             │
└─────────────────────────────────────────────────────────┘
```

- Jarak vertikal antar section: banner → tab bar ±24px, tab bar → card ±20px (estimasi).
- Card form mengisi **8 dari 12 kolom** grid (≈ 933px dengan gap 16px) dan **rata kiri**. Sisa ruang di kanan kosong pada desain.

---

## 3. Komponen Shared

### 3.1 Banner Profil

- Lebar penuh (1408px), tinggi ±140px (estimasi), background `#7DC04E`, radius ±12px, padding ±24px. Tanpa gradasi.
- Layout horizontal, item sejajar vertikal tengah:
  1. **Foto profil**: persegi rounded ±96px, radius ±12px, shadow halus, `object-fit: cover`.
  2. **Nama**: `Alexandra Daniswara` — putih, bold, ±28px, jarak ±24px dari foto.
- Tidak ada teks peran atau tombol di banner. Banner sama di kedua tab.

### 3.2 Tab Bar

- Container putih lebar penuh (1408px), tinggi ±48px, radius ±12px, padding horizontal ±8–12px, `justify-content: space-between`, item vertikal tengah.
- **Kiri: 2 tab**

| Tab | Label | Icon (estimasi) |
|---|---|---|
| 1 | `Informasi Data Diri` | `id-card` / `contact` |
| 2 | `Keamanan & Ganti Password` | `shield` / `history-lock` |

  - **Aktif**: pill `#F69665`, teks dan icon putih, ±12px medium, radius penuh, padding ±8×16px.
  - **Tidak aktif**: tanpa background, teks `#0B1C30` ±12px medium, icon sejajar.
  - Default saat halaman dibuka: tab **Informasi Data Diri**.
- **Kanan: info "terakhir diubah"**: icon jam/riwayat hijau tua `#326B00` + teks `TERAKHIR DIUBAH: HARI INI, 09:41 WIB` (uppercase, bold, ±10px, `#0B1C30`/`#41493A`, letter-spacing sedikit lebar). Teks sama di kedua tab pada desain.

### 3.3 Card Form

- Background `#FFFFFF`, drop shadow halus, rata kiri, span 8 kolom.
- Radius: tab Informasi ±16px, tab Keamanan ±24px (estimasi; rekomendasi seragamkan `16px`).
- Padding: tab Informasi ±24px, tab Keamanan ±32–56px horizontal (estimasi; rekomendasi seragamkan ±32px).
- Header card: judul (semi-bold ±20px, `#0B1C30`) + subjudul (±12px, `#41493A`/`#727A68`).
- **Input standar**: background `#EFF4FF`, radius ±8px, tinggi ±36px, icon abu `#727A68` ±14px di kiri, teks ±12px `#0B1C30`, tanpa border (rekomendasi: focus ring `#7DC04E`).
- **Label field**: ±11px, medium, `#0B1C30`, Title Case (bukan uppercase seperti halaman Edit PT), jarak ±6px ke input.

---

## 4. Tab "Informasi Data Diri"

### 4.1 Card

- Judul: `Data Diri Pejabat Eksekutif`
- Subjudul: `Informasi ini tercatat pada berkas audit internal platform Bugarin Enterprise.`

### 4.2 Field

Grid 2 kolom sama lebar, gap horizontal ±16px, jarak antar baris ±16–24px.

| Baris | Kolom | Label | Icon (estimasi) | Nilai contoh |
|---|---|---|---|---|
| 1 | Kiri | `Nama Depan` | `user` | `Alexandra` |
| 1 | Kanan | `Nama Belakang` | `building-2` / badge (di desain tampak seperti icon gedung/koper) | `Daniswara` |
| 2 | Kiri | `Email Admin` | `mail` | `alex.superadmin@bugarin.id` *(lihat catatan 3)* |
| 2 | Kanan | `Nomor Telepon / WhatsApp Verifikasi` | `phone` | `+62 812-9908-1120` |
| 3 | Penuh | `Catatan Biografi Singkat & Delegasi Wewenang` | tanpa icon | textarea |

- **Textarea** (baris 3): background `#EFF4FF`, radius ±8px, tinggi ±160px, padding ±12px, teks ±12px `#0B1C30`, lebar penuh. Nilai contoh: `Penanggung jawab arsitektur operasional pelatih, verifikasi personal trainer nasional, dan kepatuhan data privasi biometrik pengguna Bugarin Ecosystem.`
- Tidak ada penanda wajib (`*`) pada tab ini.

### 4.3 Tombol aksi

- **Rata kiri** di bawah form, jarak ±32px dari textarea, gap antar tombol ±8px.
- `Batalkan`: background `#E5EEFF` (atau `#DCE9FF`), teks `#0B1C30` ±12px medium, radius ±8px, padding ±8×14px.
- `Simpan`: background `#F69665`, teks putih ±12px medium, icon `save` (disket) putih di kiri, radius ±8px, padding ±8×16px, shadow halus.
- Di bawah tombol (jarak ±16px) terdapat blok **Mode Tampilan Antarmuka** (bagian 4.4), berada di dalam card yang sama tetapi **di luar form** biodata.

### 4.4 Blok "Mode Tampilan Antarmuka"

Pengaturan tema tampilan, berada di bagian bawah card tab Informasi (hanya di tab ini pada desain).

- Container: lebar penuh area dalam card (±883px pada desain), tinggi ±75px, background `#F1F3FF`, radius `16px`, padding `16px`, `clip content`, layout horizontal `justify-content: space-between`, item vertikal tengah.
- **Kiri (teks)**:
  - Judul `Mode Tampilan Antarmuka` — semi-bold, ±14px, `#181B25`.
  - Deskripsi `Pilih antara tampilan terang kontras tinggi dan mode gelap.` — ±11px, `#464555` / `#777587`.
- **Kanan: segmented control 2 opsi** (lebar total ±190px, tinggi ±36px)
  - Track: background `#EBEDFB`, radius penuh, padding ±4px.
  - Opsi `Terang`: icon matahari (`sun`, warna amber `#F59E0B`) + teks.
  - Opsi `Gelap`: icon bulan (`moon`, warna abu `#777587`) + teks.
  - **Opsi aktif**: pill putih `#FFFFFF`, shadow halus, teks `#181B25` bold ±12px. Di desain, `Terang` yang aktif.
  - **Opsi tidak aktif**: tanpa background, teks `#464555` / `#777587` ±12px.
- Kotak merah muda bergaris di Figma (area antara teks dan segmented control) hanyalah spacer layout (`flex: 1`), bukan elemen UI.
- Perilaku (asumsi, karena blok ini berada di luar form biodata): perubahan **langsung diterapkan** tanpa menekan `Simpan`, dan disimpan sebagai preferensi pengguna. Default: `Terang`.
- Kontrol ini adalah pengaturan yang **sama** dengan ikon bulan di topbar (lihat catatan 10). Keduanya harus sinkron.

---

## 5. Tab "Keamanan & Ganti Password"

### 5.1 Card

- Judul: `Ubah Kata Sandi Root Admin`
- Subjudul (2 baris): `Perbarui kata sandi akun super admin secara berkala untuk memitigasi risiko keamanan platform.` *(lihat catatan 3)*

### 5.2 Field (1 kolom, lebar penuh card, jarak antar field ±16–24px)

| # | Label | Icon kiri | Aksi kanan | Keterangan |
|---|---|---|---|---|
| 1 | `Kata Sandi Saat Ini *` | `lock` | `eye-off` (toggle) | Link `Lupa kata sandi?` di kanan atas label (hijau `#326B00`, ±10px, medium). Helper di bawah input: `Wajib dimasukkan untuk otorisasi perubahan.` (±10px, `#727A68`). Nilai desain: titik-titik (tersembunyi) |
| 2 | `Kata Sandi Baru *` | `lock` | `eye` (toggle) | Di desain ditampilkan dalam keadaan terlihat (plaintext) |
| 3 | `Konfirmasi Kata Sandi Baru *` | `rotate-ccw` / `lock-reset` | `eye` (toggle) | Di desain ditampilkan dalam keadaan terlihat |

- Tanda `*` pada label berwarna merah (`#BA1A1A`, estimasi).
- **Default semua field tipe password dan tersembunyi.** Keadaan terlihat di desain hanya untuk menunjukkan state toggle. Jangan hardcode nilai contoh (`K3any4!Bugarin#2024$UltraSecure`).
- Input: gaya standar (3.3), tinggi ±36–40px.

### 5.3 Tombol aksi

- **Rata kanan** di bawah form, jarak ±40px dari field terakhir, gap ±8px.
- `Batal`: background `#E5EEFF`/`#DCE9FF`, teks `#0B1C30` bold ±11px, radius ±8px.
- `Simpan Kata Sandi Baru`: background `#F69665`, teks putih ±11px bold, icon `key` putih di kiri, radius ±8px, shadow halus.

---

## 6. Style (khusus halaman ini)

### 6.1 Color tokens (dari panel Selection colors Figma)

| Token (usulan) | Hex | Dipakai untuk |
|---|---|---|
| `bg-page` | `#F8F9FF` | Background halaman |
| `surface` | `#FFFFFF` | Tab bar, card |
| `surface-low` | `#EFF4FF` | Input, textarea |
| `surface-mid` | `#E5EEFF` / `#DCE9FF` | Tombol Batal/Batalkan |
| `primary` | `#7DC04E` | Banner profil |
| `primary-text` | `#326B00` | Icon jam, link `Lupa kata sandi?` |
| `accent-orange` | `#F69665` | Tab aktif, tombol Simpan |
| `danger` | `#BA1A1A` | Tanda `*` wajib, pesan error (estimasi) |
| `text-primary` | `#0B1C30` | Judul, label, teks input |
| `text-secondary` | `#41493A` | Subjudul card, teks "terakhir diubah" |
| `text-muted` | `#727A68` | Icon input, helper text, placeholder |
| `surface-setting` | `#F1F3FF` | Background blok Mode Tampilan Antarmuka |
| `segmented-track` | `#EBEDFB` | Track segmented control Terang/Gelap |
| `text-strong` | `#181B25` | Judul blok Mode Tampilan, teks opsi aktif |
| `text-soft` | `#464555` / `#777587` | Deskripsi blok Mode Tampilan, opsi tidak aktif |
| `sun` | `#F59E0B` | Icon matahari (opsi Terang) |

### 6.2 Spacing, radius, shadow

- Padding area konten: `32px` kiri/kanan, `64px` atas, `32px`/`24px` bawah.
- Radius: banner `12px`, tab bar `12px`, card `16px` (rekomendasi), input `8px`, tombol `8px`, foto `12px`.
- Shadow: halus pada card, foto profil, dan tombol Simpan.

---

## 7. Aksi dan navigasi

| Elemen | Aksi |
|---|---|
| Tab `Informasi Data Diri` / `Keamanan & Ganti Password` | Ganti tab (client-side), perbarui `?tab=` |
| `Batalkan` (tab Informasi) | Kembalikan semua field ke nilai tersimpan terakhir |
| `Simpan` (tab Informasi) | Validasi lalu simpan data diri |
| `Batal` (tab Keamanan) | Kosongkan semua field password dan reset toggle ke tersembunyi |
| `Simpan Kata Sandi Baru` | Validasi lalu ubah kata sandi |
| `Lupa kata sandi?` | **TODO** (belum ada desain) |
| Icon mata | Toggle tampil/sembunyi per field |
| Segmented `Terang` / `Gelap` | Ganti tema aplikasi dan simpan preferensi (langsung, tanpa `Simpan`) |

---

## 8. State & interaksi

> Rekomendasi standar kecuali ditandai **(desain)**.

| Elemen | State | Perilaku |
|---|---|---|
| Form Informasi | pristine | `Simpan` dan `Batalkan` disabled (opacity ±50%) sampai ada perubahan |
| Form Informasi | validasi | `Nama Depan`, `Nama Belakang`, `Email Admin` wajib; email format valid; telepon format `+62...`; error tampil di bawah field (`#BA1A1A`, ±10px) |
| `Simpan` | loading | Tombol disabled + spinner; sukses → toast `Data diri berhasil disimpan`, perbarui teks `TERAKHIR DIUBAH`, nama di banner dan sidebar ikut berubah |
| Form Keamanan | validasi | Ketiga field wajib; kata sandi baru memenuhi aturan password platform (asumsi: min 8 karakter, kombinasi huruf besar/kecil, angka, simbol); konfirmasi harus sama; kata sandi baru tidak boleh sama dengan yang lama |
| Kata sandi saat ini | salah | Error di bawah field: `Kata sandi saat ini tidak sesuai` |
| `Simpan Kata Sandi Baru` | loading | Tombol disabled + spinner; sukses → toast `Kata sandi berhasil diubah`, kosongkan field |
| Tab dengan perubahan belum disimpan | pindah tab / navigasi | Peringatan konfirmasi `Perubahan belum disimpan` |
| Field | focus | Ring `#7DC04E` ±2px |
| Segmented Terang/Gelap | click | Terapkan tema langsung, geser pill aktif (transisi ±150ms), simpan preferensi ke akun (fallback: penyimpanan lokal), sinkronkan ikon bulan di topbar |
| Segmented Terang/Gelap | keyboard | `role="radiogroup"` dengan panah kiri/kanan untuk pindah opsi |
| Tema | halaman dimuat | Terapkan tema tersimpan sebelum render pertama (hindari kedipan tema) |
| Halaman | loading | Skeleton banner, tab bar, dan card |
| Halaman | error | Pesan error + tombol `Coba lagi` |

---

## 9. Data

```json
{
  "profile": {
    "firstName": "Alexandra",
    "lastName": "Daniswara",
    "email": "alex.admin@bugarin.id",
    "phone": "+62 812-9908-1120",
    "bio": "Penanggung jawab arsitektur operasional pelatih, verifikasi personal trainer nasional, dan kepatuhan data privasi biometrik pengguna Bugarin Ecosystem.",
    "photoUrl": "/assets/profile/alexandra.jpg",
    "role": "ADMIN",
    "lastUpdatedAt": "2024-10-24T09:41:00+07:00"
  },
  "preferences": { "theme": "light" },
  "changePasswordForm": {
    "currentPassword": "",
    "newPassword": "",
    "confirmPassword": ""
  }
}
```

- `lastUpdatedAt` ditampilkan relatif: `HARI INI, 09:41 WIB`; untuk tanggal lebih lama tampilkan `KEMARIN, ...` atau tanggal penuh.
- Email dummy pada JSON di atas sudah tanpa kata "superadmin" (lihat catatan 3).

---

## 10. Responsive

Desain hanya tersedia untuk desktop (1728px).

| Breakpoint | Perilaku |
|---|---|
| ≥ 1280px | Sesuai desain (card 8 kolom, rata kiri) |
| 768–1279px | Card melebar ke 12 kolom (lebar penuh). Banner dan tab bar tetap. Teks `TERAKHIR DIUBAH` pindah di bawah tab jika tidak muat |
| < 768px | Banner vertikal (foto di atas, nama di bawah) atau tetap horizontal dengan foto ±72px. Tab bar scroll horizontal. Grid 2 kolom di form menjadi 1 kolom. Tombol aksi lebar penuh dan bertumpuk |

---

## 11. Catatan implementasi

1. **Komponen reusable**: `ProfileBanner`, `TabBar` (varian dengan slot kanan), `FormCard`, `TextInput` (dengan icon kiri dan aksi kanan), `PasswordInput` (toggle mata), `Textarea`, `Button` (primary / secondary), `FormField` (label + input + helper + error).
2. Dua tab berbagi satu halaman; banner dan tab bar tidak berubah saat ganti tab.
3. Keamanan: kolom password harus `type="password"` dengan `autocomplete` yang sesuai (`current-password`, `new-password`). Jangan simpan nilai password di state global atau log.
4. Aksesibilitas: icon-only button (mata) butuh `aria-label` (`Tampilkan kata sandi` / `Sembunyikan kata sandi`) dan `aria-pressed`; label terhubung ke input (`for`/`id`); pesan error pakai `aria-live`; tanda wajib `*` disertai `aria-required`.
5. Data nama di banner, sidebar (user card), dan avatar topbar berasal dari profil yang sama. Perbarui keduanya setelah `Simpan`.
6. Aksi profil hanya mengubah data admin yang sedang login. Tidak ada aksi terhadap pengguna lain di halaman ini.
7. Tema: gunakan CSS variables untuk semua color token dan set atribut tema di root (mis. `data-theme="light|dark"`). `ThemeToggle` (segmented di Profil) dan ikon bulan di topbar memakai satu state/store yang sama. Palet mode gelap ada di `dark-mode.md`.

---

## 12. Catatan Inkonsistensi Desain (konfirmasi sebelum implementasi)

1. **Posisi tombol aksi berbeda**: tab Informasi rata **kiri**, tab Keamanan rata **kanan**. Rekomendasi: seragamkan (misal rata kanan). Dokumen ini mengikuti desain.
2. **Radius dan padding card berbeda** antar tab (Informasi ±16px / padding ±24px, Keamanan ±24px / padding ±32–56px). Rekomendasi: seragamkan.
3. **Teks yang memuat kata "super admin"**, padahal label peran sudah final `ADMIN`: subjudul card Keamanan (`...akun super admin...`), email dummy (`alex.superadmin@bugarin.id`), dan judul `Ubah Kata Sandi Root Admin`. Sementara ikuti teks Figma untuk judul dan subjudul, menunggu konfirmasi apakah diganti menjadi `...akun admin...` dan `Ubah Kata Sandi Admin`. Email dummy di JSON sudah diganti menjadi `alex.admin@bugarin.id`.
4. **"TERAKHIR DIUBAH"** sama di kedua tab. Di tab Keamanan kemungkinan seharusnya menunjukkan waktu terakhir **kata sandi** diubah. Belum jelas.
5. **Kata sandi baru dan konfirmasi tampil plaintext** di desain. Itu hanya demo state "terlihat". Default harus tersembunyi.
6. **Icon field `Nama Belakang`** tampak seperti icon gedung/koper (bukan `user`). Kemungkinan salah ambil icon. Rekomendasi: `user`/`user-round`.
7. **Label field** memakai Title Case, sedangkan halaman Edit PT memakai uppercase kecil. Biarkan sesuai desain masing-masing, atau tentukan satu gaya.
8. **Menu sidebar**: nama `Profil` (frame ini) vs `Profil Admin` (frame Edit PT). Rujuk md sidebar. Label di bawah logo final `ADMIN`.
9. **Tidak ada indikator kekuatan password dan aturan password** padahal ada validasi. Aturan di bagian 8 adalah asumsi, sesuaikan dengan kebijakan backend.
10. **Mode gelap belum ada frame di Figma.** Palet dan aturan mode gelap disusun sebagai usulan di `dark-mode.md` (diturunkan dari token yang ada, kontras sudah diverifikasi). Perlu ditinjau desainer sebelum dianggap final.
11. **Dua kontrol untuk satu pengaturan**: ikon bulan di topbar dan segmented di Profil. Pastikan sinkron. Ikon topbar di desain tidak menunjukkan state aktif/tidak aktif (bulan vs matahari).
12. **Deskripsi** `...tampilan terang kontras tinggi...` menyebut "kontras tinggi" sebagai sifat mode terang. Pastikan palet mode terang memang memenuhi kontras tinggi (WCAG AA minimal) atau ubah redaksi.
