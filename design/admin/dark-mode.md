# Dark Mode — Design Spec (Usulan)

> Palet dan aturan mode gelap untuk seluruh aplikasi: Dashboard, Kelola Pengguna, Riwayat, Profil, dan semua modal.
> **Ini usulan, bukan dari Figma.** Seluruh warna diturunkan dari token yang sudah ada di desain terang, lalu diverifikasi kontrasnya (WCAG). Mohon ditinjau desainer sebelum dianggap final.
> Mode gelap dipicu dari pengaturan "Mode Tampilan Antarmuka" di halaman Profil (`profil.md`, bagian 4.4) dan ikon bulan di topbar. Keduanya satu state.
> Sidebar tidak dibahas detail (sudah gelap di mode terang, lihat md sidebar). Font tidak berubah.

---

## 1. Prinsip

1. **Basis navy, bukan hitam murni.** Warna teks utama mode terang (`#0B1C30`) menjadi background halaman mode gelap. Hasilnya terasa satu keluarga dengan sidebar navy yang sudah ada.
2. **Kedalaman lewat tingkat terang, bukan shadow.** Semakin "tinggi" elemen (modal, dropdown), semakin terang permukaannya. Shadow tetap ada tetapi lebih pekat dan dibantu border tipis.
3. **Warna brand dipertahankan.** Hijau `#7DC04E` dan oranye `#F69665` tetap dipakai sebagai warna isi (fill), karena sudah kontras terhadap latar gelap.
4. **Teks di atas warna brand berubah jadi gelap.** Putih di atas hijau/oranye hanya berkontras ±2.2:1 (di mode terang pun lemah). Di mode gelap, teks di atas `#7DC04E` dan `#F69665` memakai warna gelap.
5. **Warna teks hijau/cokelat versi terang diganti versi pastel.** `#326B00`, `#214C00`, `#95491F`, `#773308`, `#93000A` terlalu gelap di atas latar gelap, diganti versi terang dari hue yang sama.
6. **Badge memakai tint transparan.** Pola `warna @ 16–20%` dari mode terang dipertahankan, hanya teksnya diganti versi terang.

---

## 2. Skala permukaan (elevation)

| Level | Token | Hex | Dipakai untuk |
|---|---|---|---|
| 0 | `bg-page` | `#0B1C30` | Background halaman |
| 1 | `surface` | `#12283F` | Card, tab bar, tabel, topbar, pagination bar |
| 2 | `surface-raised` | `#17324D` | Modal, dropdown, tooltip |
| tint | `surface-low` | `#1B3550` | Header tabel, input, textarea, blok pengaturan, kotak pesan, tombol Detail |
| tint+ | `surface-mid` | `#244563` | Tombol Edit/Hapus/Batal, badge tab tidak aktif, pill aktif segmented |
| inset | `surface-inset` | `#0F2237` | Track segmented control, area cekung |
| — | `track` | `#2F5272` | Track progress bar, toggle OFF |
| — | `border` | `#2A4260` | Garis pemisah, gridline chart, border card |
| — | `border-input` | `#3D5A7A` | Border input/textarea (mode terang tanpa border) |
| — | `sidebar` | tetap (`#213145`-an) | Sidebar tidak berubah. Tambahkan border kanan 1px `#2A4260` agar terpisah dari halaman |

---

## 3. Pemetaan token terang → gelap

### 3.1 Permukaan dan teks

| Token | Terang | Gelap | Catatan |
|---|---|---|---|
| `bg-page` | `#F8F9FF` | `#0B1C30` | |
| `surface` | `#FFFFFF` | `#12283F` | |
| `surface-low` | `#EFF4FF` / `#F1F3FF` | `#1B3550` | Tambahkan border pada input |
| `surface-mid` | `#E5EEFF` / `#DCE9FF` | `#244563` | |
| `surface-setting` | `#F1F3FF` | `#1B3550` | Blok Mode Tampilan di Profil |
| `segmented-track` | `#EBEDFB` | `#0F2237` | |
| `modal-footer` | `#EAF1FF` | `#12283F` | |
| `track` | `#DCE9FF` | `#2F5272` | |
| `border-grid` | `#CBDBF5` (40–50%) | `#2A4260` | Gridline chart: `rgba(203,219,245,0.12)` |
| `text-primary` / `text-title` | `#0B1C30` / `#181B25` | `#E8EFF9` | |
| `text-secondary` | `#5A5E69` / `#464555` / `#41493A` | `#A8B7CB` | |
| `text-muted` / `placeholder` | `#727A68` / `#777587` / `#9CA3AF` | `#93A3B8` | |
| `on-navy-muted` | `#C3C6D3` | `#A8B7CB` | Subjudul header modal |

### 3.2 Warna brand dan aksen

| Token | Terang | Gelap | Catatan |
|---|---|---|---|
| `primary` (fill) | `#7DC04E` | `#7DC04E` | Tidak berubah |
| `on-primary` (teks di atas hijau) | `#FFFFFF` | `#0B1C30` | Halaman aktif pagination, menu aktif sidebar |
| `primary-text` | `#326B00` / `#214C00` | `#9BDD6B` | Link, cohort, persentase, label bulan aktif |
| `primary-tint` (bg) | `#7DC04E` @ 20% | `#7DC04E` @ 18% | |
| `banner` | `#7DC04E` | `#2F6B1C` | Banner teks putih tetap. Gradasi kanan: `#3E8227` |
| `accent-orange` (fill) | `#F69665` | `#F69665` | Tidak berubah |
| `on-accent` (teks di atas oranye) | `#FFFFFF` | `#2A1204` | Tombol Simpan, tab aktif, pill "Tidak Ada PT" |
| `accent-text` | `#95491F` | `#FFB68F` | Persentase "Turun BB", cohort Fat Loss |
| `accent-tint` | `#F69665` @ 30% / `#FF9E6C` @ 20% | `#F69665` @ 20% | |
| `mint` | `#82F9BE` @ 40% | `#82F9BE` @ 16% | Teks pill: `#82F9BE` |
| `danger` (tombol) | `#BA1A1A` | `#BA1A1A` | Teks putih tetap (6.5:1) |
| `danger-text` | `#A2361B` / `#93000A` | `#FFB4AB` | Tanda `*`, pesan error, badge DELETE |
| `danger-tint` | `#FFDAD6` | `#FFB4AB` @ 16% | |
| `warning-text` | `#773308` | `#FFE27A` | |
| `warning-tint` | `#FFF3AD` | `#FFF3AD` @ 16% | |
| `navy` (header modal) | `#213145` | `#0A1626` | |
| `sun` | `#F59E0B` | `#F59E0B` | Tidak berubah |

---

## 4. Badge dan pill

Pola umum: background `warna @ α` di atas `surface`, teks versi terang. Kontras dihitung terhadap background hasil blending di atas `#12283F`.

| Komponen | Background (gelap) | Teks (gelap) | Kontras |
|---|---|---|---|
| `AKTIF`, `CREATE`, `BERHASIL`, pill `Evaluasi Sesi Mingguan` | `rgba(125,192,78,0.18)` | `#9BDD6B` | 6.6:1 |
| `UPDATE`, pill `Koreksi Teknik` | `rgba(255,243,173,0.16)` | `#FFE27A` | 7.4:1 |
| `DELETE`, pill `Pemulihan & Cedera` | `rgba(255,180,171,0.16)` | `#FFB4AB` | 6.3:1 |
| `GAGAL`, `ONBOARDING`, pill `Progress Nutrisi` | `rgba(255,158,108,0.20)` | `#FFB68F` | 6.0:1 |
| Pill keahlian `Naik BB`, pill `Motivasi & Kepatuhan` | `rgba(130,249,190,0.16)` | `#82F9BE` | 7.5:1 |
| Pill `Evaluasi Bulanan` | `rgba(220,233,255,0.12)` | `#C9DBF7` | 7.7:1 |
| Pill "Tidak Ada PT" | `#F69665` solid | `#2A1204` | 8.0:1 |
| Badge jumlah di tab **aktif** (mis. `86 Aktif`) | `#2A1204` | `#FFD9C2` | tinggi |
| Badge jumlah di tab **tidak aktif** | `#244563` | `#E8EFF9` | 8.6:1 |

---

## 5. Aturan per komponen

### 5.1 Topbar
- Background `surface`, border bawah 1px `border`. Icon (moon, bell) `text-secondary`.
- Titik notifikasi `#FF5449`. Avatar inisial `AV`: background `surface-mid`, teks `text-primary`. Avatar foto tidak berubah.
- Ikon bulan di topbar: saat mode gelap aktif, tampilkan **matahari** (aksi kembali ke terang). Saat terang, tampilkan bulan.

### 5.2 Banner (Dashboard, Kelola Pengguna, Riwayat, Profil)
- Background `#2F6B1C` (kontras teks putih 6.5:1). Gradasi sisi kanan (Kelola Pengguna, Edit PT): `linear-gradient(90deg, #2F6B1C 0%, #2F6B1C 85%, #3E8227 100%)`.
- Judul dan deskripsi tetap putih. Foto profil di banner Profil: tambahkan ring 2px `rgba(255,255,255,0.2)`.

### 5.3 Card dan tabel
- Card: `surface`, border 1px `border`, shadow `0 1px 3px rgba(0,0,0,0.4)`.
- Header tabel: `surface-low`, teks `text-secondary`.
- Baris: `surface`, pemisah 1px `border`. **Zebra** (tab Audit): baris genap `rgba(255,255,255,0.03)`. **Hover**: `rgba(255,255,255,0.05)`.
- Teks sel utama `text-primary`, sekunder `text-secondary`.

### 5.4 Input, textarea, dropdown, search
- Background `surface-low`, border 1px `border-input`, teks `text-primary`, placeholder dan icon `text-muted`.
- Focus: border `#9BDD6B` + ring 2px `rgba(155,221,107,0.35)`. Error: border `#FFB4AB`, pesan `#FFB4AB`.
- Field disabled: opacity 50%.

### 5.5 Tombol
| Tombol | Background | Teks |
|---|---|---|
| Primary (Simpan, Konfirmasi Pembuatan, Daftarkan PT Baru, Paksa Reset Password, Simpan Kata Sandi Baru) | `#F69665` | `#2A1204` |
| Secondary (Batal, Batalkan, Edit, Hapus, Detail, Tutup Panel) | `surface-mid` | `text-primary` |
| Destruktif (Konfirmasi Hapus) | `#BA1A1A` | `#FFFFFF` |
- Hover primary: `#F9A57D`. Hover secondary: `#2D5176`. Disabled: opacity 50%.
- Shadow tombol primary: `0 1px 2px rgba(0,0,0,0.4)`.

### 5.6 Tab
- Tab bar: `surface`. Tab aktif: pill `#F69665`, teks `#2A1204`. Tab tidak aktif: tanpa background, teks `text-primary`.

### 5.7 Pagination
- Halaman aktif: `#7DC04E`, teks `#0B1C30`. Halaman lain: `text-primary`. Tombol ikon: `surface-mid`. Disabled: `text-muted` opacity 50%.
- Teks "Menampilkan…" `text-secondary`, angka bold `text-primary`.

### 5.8 Progress bar
- Track `track` (`#2F5272`). Fill "Naik BB" `#7DC04E`, "Turun BB" `#F69665`. Teks persentase `primary-text` / `accent-text`.

### 5.9 Chart (Dashboard)
- Gridline `rgba(203,219,245,0.12)`. Label sumbu `text-secondary`; label bulan aktif (`JUL`) `#9BDD6B`.
- Bar: gradien `#7DC04E` → `rgba(125,192,78,0.05)`. Bar aktif: solid `#7DC04E`, titik marker `#E8EFF9`.
- Line: gradien `#FF9E6C` → `#E0703C`. Marker: fill `#12283F`, border `#FF9E6C`.
- Donut: segmen "Turun Berat Badan" `#E5484D` (merah desain `#BA1A1A` hanya 2.3:1 di latar gelap, versi ini 3.8:1), segmen "Naik Berat Badan" `#82F9BE`. Teks tengah `text-primary`, `PELATIH AKTIF` `text-secondary`. Titik legend memakai warna segmen yang sama.
- Tooltip chart: `surface-raised`, border `border`, teks `text-primary`.

### 5.10 Stat card (Dashboard dan Kelola Pengguna)
- Background `surface`. Label `text-secondary`, nilai `text-primary`. Icon box oranye `#F69665` dengan icon `#2A1204`.

### 5.11 Modal (Daftarkan PT, Konfirmasi Hapus, Detail Feedback)
- Overlay `rgba(2,8,16,0.70)` + `backdrop-filter: blur(4px)`.
- Badan modal `surface-raised`, shadow `0 12px 32px rgba(0,0,0,0.55)`, border 1px `border`.
- Header modal navy (Daftarkan PT, Detail Feedback): `#0A1626`, judul `text-primary`, subjudul `#A8B7CB`, icon tutup `text-secondary`.
- Header modal Hapus (versi terang `#F1F3FF`): `surface-low`, judul `text-primary`.
- Footer modal: `surface`. Kotak pesan (Detail Feedback): `surface-low`. Kartu info (Coach/Klien): `surface`, border `border`.
- Tanda `*` dan pesan peringatan: `#FFB4AB`.

### 5.12 Segmented control "Terang / Gelap" (Profil)
- Track `surface-inset` (`#0F2237`). Pill aktif `surface-mid` dengan teks `text-primary` bold, shadow halus.
- Mode gelap aktif: opsi `Gelap` aktif, icon bulan `#A8C7FF`; icon matahari tetap `#F59E0B` saat tidak aktif; teks tidak aktif `text-secondary`.
- Blok pengaturan: `surface-low`, judul `text-primary`, deskripsi `text-secondary`.

### 5.13 Toggle switch (Suspend, halaman Edit PT)
- OFF: track `#2F5272`, knob `#E8EFF9`. ON: track `#F69665`, knob `#FFFFFF`.

### 5.14 Avatar dan gambar
- Foto avatar tidak diberi filter. Tambahkan ring 1px `rgba(255,255,255,0.12)` agar tepi tidak hilang di latar gelap.
- Avatar dengan ring oranye (klien Onboarding) tetap `#F69665`.

### 5.15 Scrollbar, seleksi teks, link
- Scrollbar thumb `#2F5272`, track transparan. Seleksi teks `rgba(125,192,78,0.35)`.
- Link: `#9BDD6B`, hover `#B6EC8F`.

---

## 6. Implementasi (CSS variables)

```css
:root,
[data-theme="light"] {
  --bg-page: #F8F9FF;
  --surface: #FFFFFF;
  --surface-raised: #FFFFFF;
  --surface-low: #EFF4FF;
  --surface-mid: #E5EEFF;
  --surface-inset: #EBEDFB;
  --track: #DCE9FF;
  --border: #CBDBF5;
  --border-input: transparent;
  --text-primary: #0B1C30;
  --text-secondary: #5A5E69;
  --text-muted: #727A68;
  --primary: #7DC04E;
  --on-primary: #FFFFFF;
  --primary-text: #326B00;
  --primary-tint: rgba(125,192,78,0.20);
  --banner: #7DC04E;
  --accent: #F69665;
  --on-accent: #FFFFFF;
  --accent-text: #95491F;
  --accent-tint: rgba(246,150,101,0.30);
  --danger: #BA1A1A;
  --danger-text: #93000A;
  --danger-tint: #FFDAD6;
  --warning-text: #773308;
  --warning-tint: #FFF3AD;
  --mint-text: #006C47;
  --mint-tint: rgba(130,249,190,0.40);
  --modal-header: #213145;
  --overlay: rgba(11,28,48,0.40);
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06);
  --focus-ring: rgba(125,192,78,0.40);
}

[data-theme="dark"] {
  --bg-page: #0B1C30;
  --surface: #12283F;
  --surface-raised: #17324D;
  --surface-low: #1B3550;
  --surface-mid: #244563;
  --surface-inset: #0F2237;
  --track: #2F5272;
  --border: #2A4260;
  --border-input: #3D5A7A;
  --text-primary: #E8EFF9;
  --text-secondary: #A8B7CB;
  --text-muted: #93A3B8;
  --primary: #7DC04E;
  --on-primary: #0B1C30;
  --primary-text: #9BDD6B;
  --primary-tint: rgba(125,192,78,0.18);
  --banner: #2F6B1C;
  --accent: #F69665;
  --on-accent: #2A1204;
  --accent-text: #FFB68F;
  --accent-tint: rgba(246,150,101,0.20);
  --danger: #BA1A1A;
  --danger-text: #FFB4AB;
  --danger-tint: rgba(255,180,171,0.16);
  --warning-text: #FFE27A;
  --warning-tint: rgba(255,243,173,0.16);
  --mint-text: #82F9BE;
  --mint-tint: rgba(130,249,190,0.16);
  --modal-header: #0A1626;
  --overlay: rgba(2,8,16,0.70);
  --shadow-card: 0 1px 3px rgba(0,0,0,0.40);
  --focus-ring: rgba(155,221,107,0.35);
}
```

> Nilai mode terang di atas adalah token yang sudah ada di keempat md halaman. Hanya token baru (`--on-primary`, `--on-accent`, `--surface-raised`, `--border-input`, dll.) yang ditambahkan agar komponen bisa berpindah tema tanpa percabangan.

### 6.1 Perilaku tema
- Atribut `data-theme="light|dark"` diset pada elemen root (`<html>`).
- Preferensi disimpan per pengguna (akun) dengan fallback penyimpanan lokal. Default: `light` (sesuai desain).
- Terapkan tema **sebelum render pertama** (skrip kecil inline di `<head>`) agar tidak ada kedipan terang saat halaman dimuat.
- Transisi antar tema: `background-color`, `color`, `border-color` ±150ms. Hormati `prefers-reduced-motion`.
- Satu store untuk segmented di Profil dan ikon di topbar.
- Opsional (di luar desain): jika pengguna belum pernah memilih, ikuti `prefers-color-scheme`. Segmented saat ini hanya punya 2 opsi, jadi tidak ada opsi "Sistem".
- Chart: warna diambil dari variabel (bukan hardcode) dan di-render ulang saat tema berubah.

---

## 7. Verifikasi kontras (WCAG)

| Pasangan | Rasio | Lolos |
|---|---|---|
| `text-primary` `#E8EFF9` di `bg-page` | 14.8:1 | AAA |
| `text-primary` di `surface` | 12.9:1 | AAA |
| `text-primary` di `surface-low` | 10.9:1 | AAA |
| `text-secondary` `#A8B7CB` di `surface` | 7.4:1 | AAA |
| `text-secondary` di `surface-low` | 6.2:1 | AA |
| `text-muted` `#93A3B8` di `surface` / `surface-low` | 5.8:1 / 4.9:1 | AA |
| `primary-text` `#9BDD6B` di `surface` | 9.2:1 | AAA |
| `accent-text` `#FFB68F` di `surface` | 8.8:1 | AAA |
| Putih di `banner` `#2F6B1C` | 6.5:1 | AA |
| `on-accent` `#2A1204` di `#F69665` | 8.0:1 | AAA |
| `on-primary` `#0B1C30` di `#7DC04E` | 7.8:1 | AAA |
| Putih di tombol `#BA1A1A` | 6.5:1 | AA |
| Donut merah `#E5484D` di `surface` (grafis) | 3.8:1 | ≥ 3:1 |
| Bar/fill hijau `#7DC04E` di `surface` (grafis) | 6.8:1 | ≥ 3:1 |

Catatan: batas antar permukaan (card di atas page, input di atas card) sengaja halus (±1.2–2:1) dan dibantu border. Fokus keyboard selalu terlihat lewat ring.

---

## 8. Hal yang berubah dibanding mode terang (ringkas untuk developer)

1. Teks di atas tombol/pill oranye dan hijau berubah dari putih menjadi gelap.
2. Input mendapat border tipis (mode terang tanpa border).
3. Card mendapat border tipis dan shadow lebih pekat.
4. Warna teks hijau tua dan cokelat diganti versi pastel.
5. Merah donut chart diganti `#E5484D`.
6. Banner hijau lebih gelap (`#2F6B1C`).
7. Ikon bulan di topbar berganti menjadi matahari saat mode gelap aktif.

---

## 9. Hal yang perlu dikonfirmasi

1. **Usulan ini belum ditinjau desainer.** Terutama banner hijau gelap (`#2F6B1C`) dan teks gelap di tombol oranye, karena mengubah kesan brand dibanding versi terang.
2. **Warna teks di atas hijau/oranye di mode terang** (putih, kontras ±2.2:1) sebaiknya ikut diperbaiki jika ingin memenuhi standar aksesibilitas. Di luar cakupan dokumen ini.
3. **Sidebar** tidak dibahas. Jika sidebar di mode gelap ingin dibedakan lebih jelas dari halaman, atur di md sidebar.
4. **Ikon topbar** (bulan/matahari) di desain tidak menunjukkan dua state. Perilaku di 5.1 adalah usulan.
5. **Default tema**: `light`. Ubah jika ingin mengikuti pengaturan sistem pengguna.
