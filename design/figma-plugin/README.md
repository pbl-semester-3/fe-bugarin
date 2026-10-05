# Figma Plugin — Bugarin Web App Replica

Plugin Figma untuk **membuat ulang tampilan web app `fe-bugarin`** ke Figma, di halaman **`UI Website PT`**.

Plugin **tidak mengganti/menghapus** desain yang sudah ada. Ia hanya **menambah 4 frame baru** di sebelah kanan frame yang ada:

1. `Login (Web App)`
2. `Dashboard (Web App)`
3. `Verifikasi (Web App)`
4. `Klien (Web App)`

Foto profil / avatar diganti **kotak abu + inisial nama** (sesuai permintaan).

> Catatan: Figma REST API bersifat read-only, jadi desain dibuat lewat plugin ini (dijalankan di Figma), bukan lewat API.

---

## Cara menjalankan

1. Buka file Figma Anda (`UI/UX PBL KEL 7`) di **Figma Desktop** (plugin development butuh desktop).
2. Menu **Plugins → Development → Import plugin from manifest…**
3. Pilih file `design/figma-plugin/manifest.json`.
4. Jalankan **Plugins → Development → Bugarin Web App Replica**.
5. Plugin otomatis membuat 4 frame baru di halaman **UI Website PT** (offset ke kanan, tidak menimpa frame lama).
6. Viewport akan otomatis zoom ke frame-frame baru.

---

## Yang dibangun (ringkas)

- **Shell PT**: sidebar `#2C303A` (brand "Bugarin" / "PT Platform", label "Main Command", menu + badge notifikasi "3" di Verifikasi, user card, Exit) + header putih (ikon bulan, lonceng + titik merah, avatar).
- **Dashboard**: banner hijau, 2 stat card (`Total Active Clients` 24, `Pending Verifications` 3), kartu "Daily Trajectory & Schedule" (badge AI Planned, navigator tanggal, week strip 7 hari, 4 baris sesi).
- **Verifikasi**: judul + deskripsi, toolbar (search + chip "All Pending (3)"), 3 kartu pengajuan (header identitas, kotak Athletic Target, tombol Tolak/Accept Trainee).
- **Klien**: judul "Active Client" + badge "6 Tracked", filter bar (search + chip All/Hypertrophy/Weight Loss + dropdown Status), grid 3 kolom (6 kartu klien), footer pagination.
- **Login**: split screen (panel kiri gradient, panel kanan form "Welcome Back, Coach").

---

## Sumber

- Web app: `app/`, `components/` di repo `fe-bugarin`.
- Token warna/font: `app/globals.css`, `design/DESIGN_PT.md`.
- Ikon: [lucide](https://lucide.dev) (ISC) — diekstrak dari `node_modules/lucide-react`.

## Font

Plugin memakai **Plus Jakarta Sans**. Kalau font itu belum tersedia di Figma Anda, plugin otomatis fallback ke **Inter** (dan memberi hasil yang tetap rapi).
Supaya persis 100%, pasang/aktifkan **Plus Jakarta Sans** di Figma (Google Fonts) lalu jalankan ulang plugin.

## Regenerasi ikon (opsional)

Kalau ada ikon baru yang perlu ditambah, sunting daftar di `build-icons.mjs` lalu:

```bash
node design/figma-plugin/build-icons.mjs
```
