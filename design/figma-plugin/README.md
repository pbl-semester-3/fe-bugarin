# Figma Plugin — Bugarin Web App Replica

Plugin Figma untuk **membuat ulang tampilan web app `fe-bugarin`** ke Figma, di halaman **`UI Website PT`**.

Plugin **tidak mengganti/menghapus** desain yang sudah ada. Ia hanya **menambah 9 frame baru** di sebelah kanan frame yang ada:

1. `Login (Web App)`
2. `Dashboard (Web App)`
3. `Verifikasi (Web App)`
4. `Klien (Web App)`
5. `Riwayat (Web App)`
6. `Feedback (Web App)`
7. `Feedback - Kosong (Web App)`
8. `Profil (Web App)`
9. `Detail Klien (Web App)`

Foto profil / avatar diganti **kotak abu + inisial nama** (sesuai permintaan).

> Catatan: Figma REST API bersifat read-only, jadi desain dibuat lewat plugin ini (dijalankan di Figma), bukan lewat API.

---

## Cara menjalankan

1. Buka file Figma Anda (`UI/UX PBL KEL 7`) di **Figma Desktop** (plugin development butuh desktop).
2. Menu **Plugins → Development → Import plugin from manifest…**
3. Pilih file `design/figma-plugin/manifest.json`.
4. Jalankan **Plugins → Development → Bugarin Web App Replica**.
5. Plugin otomatis membuat 8 frame baru di halaman **UI Website PT** (offset ke kanan, tidak menimpa frame lama).
6. Viewport akan otomatis zoom ke frame-frame baru.

---

## Yang dibangun (sesuai web app versi `dev`)

- **Shell PT**: sidebar `#2C303A` (brand "Bugarin" / "PT Platform", menu, badge notifikasi "3" di Verifikasi, user card, Exit) + header putih (ikon bulan, lonceng + titik merah, avatar). Tanpa label "Main Command".
- **Login**: split screen (panel kiri gradient, panel kanan form "Welcome Back, Coach").
- **Dashboard**: banner "Selamat pagi, Coach Alex!", stat card "Total Klien Aktif" (24) & "Menunggu Verifikasi" (3), kartu "Trajektori & Jadwal Harian" (badge "Direncanakan AI", navigator "Kamis, 24 Okt", week strip SEN–MIN, 4 baris sesi).
- **Verifikasi**: "Antrian Pendaftaran Klien", toolbar search + chip "Semua Menunggu (3)", 3 kartu pengajuan (tombol "Tolak" / "Terima Klien").
- **Klien**: "Klien Aktif" + badge "6 Terpantau", filter (chip Semua/Naik BB/Turun BB + "Status: Aktif"), grid 3 kolom, footer "Menampilkan 1 - 6 dari 6 Klien terdaftar".
- **Riwayat**: "Progres & Biometrik Klien", segmented goal & gender, tabel "Matriks Progres Atletik".
- **Feedback**: master-detail, daftar percakapan + kartu atlet + composer "Pengiriman Protokol Bimbingan". Ditambah frame `Feedback - Kosong (Web App)` untuk state **belum ada klien dipilih** (empty state "Pilih klien").
- **Profil**: "Pengaturan Profil Pelatih", kartu identitas, form "Informasi Pribadi", "Preferensi & Keamanan".
- **Detail Klien**: tombol kembali, kartu profil + metrik, program AI "Penambahan Otot & Kekuatan".

---

## Sumber

- Web app: `app/`, `components/` di repo `fe-bugarin` (branch `dev`).
- Token warna/font: `app/globals.css`, `design/DESIGN_PT.md`.
- Ikon: [lucide](https://lucide.dev) (ISC) — diekstrak dari `node_modules/lucide-react`.

## Font

Plugin memakai **Plus Jakarta Sans** (sesuai web app). Kalau font itu belum ada di Figma Anda, plugin otomatis **fallback ke Inter** dan akan memberitahu lewat pesan setelah selesai (`Font: Inter (fallback)...`).

Supaya hasil **100%** sesuai web app, aktifkan Plus Jakarta Sans dulu:

1. Buka Figma Desktop → file apa saja.
2. Tekan `T` (Text tool), di panel kanan klik pemilih font, ketik **Plus Jakarta Sans**.
3. Kalau belum muncul, klik **"Plus Jakarta Sans"** pada link "Get more fonts" / Figma Fonts, lalu install dari Google Fonts (atau via Figma "Install font").
4. Setelah muncul di daftar font Figma, jalankan plugin — pesan akhir akan berbunyi `Font: Plus Jakarta Sans`.

## Struktur & regenerasi

- `plugin.source.js` — logika plugin (yang diedit kalau mau ubah desain).
- `icons.generated.js` — 49 ikon lucide (hasil generate).
- `code.js` — **hasil bundle** (ikon di-inline; dipakai Figma). Figma sandbox tidak mendukung `require`, jadi jangan `require` apa pun di `code.js`.

Setelah mengubah `plugin.source.js` atau daftar ikon di `build-icons.mjs`, jalankan:

```bash
node design/figma-plugin/build-icons.mjs   # regenerate ikon + bundle otomatis
# atau, bila hanya mengubah plugin.source.js:
node design/figma-plugin/bundle.mjs
```

`manifest.json` menunjuk ke `code.js`, jadi cukup jalankan ulang plugin di Figma.
