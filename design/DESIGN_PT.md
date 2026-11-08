# DESIGN.md — Bugarin PT Platform

Acuan desain untuk website **Bugarin PT Platform** (dashboard Personal Trainer). Semua nilai diambil dari desain Figma (frame desktop **1728 × 1117**). Nilai ukuran yang ditandai `≈` adalah estimasi dari screenshot; kalau ada beda dengan Figma, **Figma yang menang** dan file ini diperbarui.

---

## 1. Ringkasan

| Item | Nilai |
|---|---|
| Produk | Web dashboard untuk Personal Trainer (Coach) |
| Halaman | Login, Dashboard, Verifikasi, Klien, Riwayat, Feedback, Profil |
| Font | Plus Jakarta Sans |
| Tone visual | Bersih, terang, kartu putih di atas background lavender-tint, sidebar gelap |
| Bahasa UI | Campuran: menu Indonesia (Verifikasi, Klien, Riwayat, Profil), konten Inggris |
| Mode | Light (default). Toggle Dark ada di UI, **desain dark belum tersedia** |

### Prinsip

1. **Hijau = identitas & navigasi.** Menu aktif, banner hero, tombol Sign In.
2. **Oranye = aksi & penekanan.** Filter aktif, tombol simpan/kirim, "Today", "Next Up", badge.
3. **Putih = surface.** Kartu, input di atas background tint, area konten.
4. **Netral kebiruan (lavender-gray)** untuk teks, border, dan background tint, jangan pakai abu netral murni.
5. Sudut membulat konsisten: 8 px (kontrol), 12 px (kartu), full (chip/pill).

---

## 2. Color Tokens

### 2.1 Brand (3 warna utama)

| Token | Hex | Pemakaian |
|---|---|---|
| `primary` | `#7DC04E` | Menu sidebar aktif, banner sapaan dashboard, tombol Sign In, cover profil (gradient) |
| `secondary` | `#F69665` | Filter/chip aktif, tombol Save/Send/Update, ikon stat card, "Today" & "Next Up", kamera avatar |
| `white` | `#FFFFFF` | Kartu, header, teks di atas warna brand & sidebar, background input login |

### 2.2 Neutral

| Token | Hex | Pemakaian |
|---|---|---|
| `ink` | `#181B25` | Teks utama, judul |
| `sidebar` | `#2C303A` | Background sidebar |
| `ink-soft` | `#464555` | Teks sekunder, isi paragraf |
| `muted` | `#777587` | Label kecil, deskripsi, placeholder, timestamp |
| `outline` | `#C7C4D8` | Border, divider, ikon nonaktif |
| `surface-tint` | `#F1F3FF` | Background halaman/panel, input, chip tidak aktif, search bar |
| `surface-alt` | `#F9F9FF` | Baris jadwal, kotak Session Slot, kartu list |
| `surface-2` | `#EBEDFB` | Hover/inactive lebih tegas, avatar inisial |
| `surface-3` | `#E5E8F5` | Tombol sekunder ("Save Draft", "View Full Profile"), tag |
| `surface-4` | `#DFE2EF` | Border halus, overlay (sering dipakai 10% opacity) |
| `surface-5` | `#E2DFFF` | Border editor & fokus lembut |

### 2.3 Semantic

| Token | Hex | Pemakaian |
|---|---|---|
| `success` | `#006C47` | Teks status sukses (Done, delta naik, tag "verified") |
| `success-container` | `#82F9BE` | Background badge sukses (dipakai 20–40% opacity) |
| `success-deep` | `#002113` | Teks di atas `success-container` bila perlu kontras tinggi |
| `danger` | `#FF6C6C` | Tombol/teks "Exit", titik notifikasi, indikator perhatian |
| `danger-strong` | `#BA1A1A` | Teks badge merah (Weight Loss, delta turun) |
| `danger-container` | `#FFDAD6` | Background badge merah |
| `on-secondary-strong` | `#A2361B` / `#C34E31` | Teks/aksen oranye tua (varian gelap `secondary`) |
| `accent-indigo` | `#493EE5` | Ikon jam Session Slot, border kartu terpilih, tag "public"/"unique", fokus |
| `warning` | `#F59E0B` | Ikon matahari (toggle Light) |

### 2.4 Teks di atas warna brand

Di Figma, teks di atas `primary` dan `secondary` memakai **putih**. Ini dijadikan token tunggal supaya gampang diganti:

```
--color-on-primary:   #FFFFFF;
--color-on-secondary: #FFFFFF;
```

> ⚠️ **Catatan aksesibilitas:** kontras putih di atas `#7DC04E` dan `#F69665` hanya ≈ **2.2 : 1** (standar WCAG AA: 4.5 : 1). Teks kecil (label tombol, item menu) akan sulit dibaca. Opsi perbaikan tanpa mengubah warna brand: ganti `on-primary` dan `on-secondary` menjadi `#181B25` (kontras ≈ 7.8 : 1). Selama belum diputuskan, ikuti Figma (putih).

### 2.5 Gradient

- **Cover profil:** linear gradient berbasis `primary` (`#7DC04E`), ke arah yang sedikit lebih terang/gelap.
- **Baris "Next Up" (Dashboard):** gradient horizontal sangat halus dari `surface-tint` ke transparan.

### 2.6 Opacity yang dipakai di Figma

`#FFFFFF` 80% dan 20%, `#F1F3FF` 60–70%, `#82F9BE` 20–40%, `#006C47` 15%, `#DFE2EF` 10%, `#C7C4D8` 50%, `#493EE5` 10% dan 30%, `#F69665` 10%. Semua dipakai untuk background tint badge/overlay.

---

## 3. Tipografi

Font: **Plus Jakarta Sans** (weight 400, 500, 600, 700, 800).

| Peran | Ukuran ≈ | Weight | Contoh |
|---|---|---|---|
| Display (login) | 40 px | 800 | "Welcome Back, Coach" |
| Hero banner | 40 px | 700 | "Good morning, Coach Alex!" |
| Page title | 30 px | 700 | "Active Client", "Feedback Center" |
| Stat value | 36 px | 700 | "24", "3" |
| Section / card title | 20 px | 600 | "Daily Trajectory & Schedule", "Athletic Progress Matrix" |
| Nama item (list/card) | 16 px | 600 | "Marcus Sterling" |
| Body | 14 px | 400 | Isi editor, deskripsi |
| Label form | 14 px | 500 | "Email Address" |
| Caption | 12 px | 400–500 | Email, timestamp, subtitle |
| Overline (UPPERCASE) | 10–11 px, tracking lebar | 600 | "TOTAL ACTIVE CLIENTS", "SESSION SLOT", header tabel |

Setup Next.js:

```ts
import { Plus_Jakarta_Sans } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});
```

---

## 4. Spacing, Radius, Shadow

- **Skala spacing:** 4 · 8 · 12 · 16 · 24 · 32 · 48 (kelipatan 4).
- **Padding konten halaman:** 24 px (kiri/kanan), jarak antar-kartu 16–24 px.
- **Radius:** `8` tombol, input, item menu · `12` kartu, banner, panel · `9999` chip, pill, search bar, badge.
- **Shadow kartu:** sangat halus, contoh `0 1px 3px rgba(24, 27, 37, 0.08)`. Kartu hanya terlihat terangkat tipis di atas `surface-tint`.
- **Border:** hampir tidak dipakai. Pemisah pakai warna background/`outline` 1 px. Pengecualian: kartu terpilih di Feedback memakai border `accent-indigo`.

---

## 5. Layout Global (App Shell)

Berlaku untuk semua halaman kecuali Login.

```
┌──────────┬───────────────────────────────────────────┐
│ Sidebar  │ Header (64px): 🌙 toggle · 🔔 · avatar     │
│ 256px    ├───────────────────────────────────────────┤
│ dark     │ Konten (padding 24px, bg surface-tint)    │
│          │                                           │
│ user card│                                           │
│ Exit     │                                           │
└──────────┴───────────────────────────────────────────┘
```

### 5.1 Sidebar

- Lebar ≈ 256 px, tinggi penuh, background `sidebar`.
- **Logo:** "Bugarin" (putih, bold) + "PT PLATFORM" (overline kecil, hijau/mint).
- **Section label:** "MAIN COMMAND" (overline, `muted`).
- **Menu (urutan tetap):** Dashboard · Verifikasi · Klien · Riwayat · Feedback · Profil. Masing-masing ikon 16–20 px + label 14 px.
  - Default: teks/ikon putih ~70%, tanpa background.
  - Aktif: background `primary`, teks putih, radius 8, lebar penuh.
- **User card** (bawah): background putih ~10%, radius 12, nama "Alex Vance" (putih, 600) + "Performance Coach" (`muted`).
- **Exit:** ikon + teks `danger`, kecil, di bawah user card.

### 5.2 Header

- Tinggi ≈ 64 px, background putih, konten rata kanan.
- Isi: ikon **bulan** (toggle tema), ikon **lonceng** dengan titik merah (`danger`) bila ada notifikasi, **avatar** bulat 32 px.

---

## 6. Komponen Global

### Button

| Varian | Background | Teks | Pemakaian |
|---|---|---|---|
| Primary (hijau) | `primary` | `on-primary` | Sign In (Login) |
| Accent (oranye) | `secondary` | `on-secondary` | Send Feedback, Save Changes, Update Password |
| Secondary | `surface-3` | `ink` | Save Draft, Discard, Change Avatar, View Full Profile & Program → |
| Small pill | `surface-3` | `ink` | "Full Profile" |

Radius 8, tinggi ≈ 40 (kecil 32), label 14 px weight 600. Tombol full-width di Login dan tombol "View Full Profile & Program →" (ikon panah kanan).

### Input / Select / Textarea

- Background `surface-tint` (di Login: putih), **tanpa border**, radius 8, tinggi ≈ 40.
- Ikon prefix di kiri (user, email, @, key, gender, umur) warna `muted`.
- Placeholder `muted`. Fokus: ring `accent-indigo`.
- Select punya ikon chevron atas-bawah di kanan.
- Password: ikon mata di kanan (toggle tampil/sembunyi).
- Label 14 px, opsional **tag kecil di kanan label** ("public", "unique", "verified", "Multi-Select"), warna `accent-indigo` (verified: `success`).

### Search Bar

Pill penuh, background `surface-tint`, ikon kaca pembesar kiri, placeholder `muted`, ikon filter di kanan (Verifikasi).

### Chip / Filter

- Aktif: background `secondary`, teks `on-secondary`, pill, contoh "All (24)", "All Pending (0)", "All Goals".
- Tidak aktif: background transparan/`surface-tint`, teks `ink-soft`.
- **Segmented control** (Riwayat, Profil): wadah pill `surface-tint`; item aktif berwarna `secondary` (filter goal) atau putih (filter gender, toggle Light/Dark).
- **Dropdown filter:** "Status: Active ⌄" dengan ikon filter.

### Badge / Tag

| Badge | Background | Teks |
|---|---|---|
| Count ("24 Tracked") | `surface-3` | `ink-soft`, 11 px |
| AI Planned | `secondary` 10% | `secondary`/`on-secondary-strong` |
| Queued | `surface-3` | `muted` |
| Done | `success-container` 20–40% | `success` (+ ikon centang) |
| Weight Loss | `danger-container` | `danger-strong` |
| Hypertrophy | `success-container` 40% | `success` |
| Delta turun (↓ -7.3 kg) | `danger-container` | `danger-strong` |
| Delta naik (↑ +4.8 kg) | `success-container` | `success` |
| Started Aug 12 | `surface-tint` | `ink-soft` + ikon kalender |
| Draft Auto-saved | `surface-tint` | `muted` |

Semua badge pill, teks 10–12 px weight 500–600.

### Card

Background putih, radius 12, shadow halus, padding 20–24. Judul kartu 20 px/600, subtitle 12 px `muted`.

### Avatar

- Bulat (list, tabel, header) atau kotak radius 8–12 (kartu klien, header feedback).
- Ukuran 32 / 40 / 48 / 80.
- Fallback inisial (DK, CB): background `surface-2`, teks `ink-soft`, 600.
- Titik status hijau di pojok kanan bawah (Riwayat).

### Row Menu (kebab)

Ikon tiga titik vertikal `muted`, di ujung kanan baris/kartu.

### Empty State

Ikon besar (hourglass + centang) hitam, judul 20 px, deskripsi `ink-soft`, rata tengah, di tengah area konten.

---

## 7. Spesifikasi Per Halaman

### 7.1 Login

- **Split screen 50 / 50.** Kiri: foto bertema fitness & makanan sehat (full height, `object-cover`). Kanan: background `surface-tint`, form di tengah vertikal, lebar maks ≈ 480 px.
- Isi form: judul "Welcome Back, Coach" (Display) → label **Email Address** + input (placeholder contoh email) → label **Password** + link **"Forgot Password?"** (kecil, rata kanan, sejajar label) + input dengan ikon mata → tombol **Sign In** (primary hijau, full width).
- Tidak memakai app shell.

### 7.2 Dashboard

1. **Banner sapaan:** background `primary`, radius 12, padding 24. Judul "Good morning, Coach Alex!" (putih, Hero) + subtitle putih 14 px.
2. **Stat cards** (2 kolom, tinggi sama): kartu putih. Ikon 40 px dalam kotak `secondary` radius 8 (ikon putih) · overline ("TOTAL ACTIVE CLIENTS", "PENDING VERIFICATIONS") · angka 36 px/700.
3. **Daily Trajectory & Schedule** (kartu putih):
   - Header: judul + badge "AI Planned", subtitle `muted`; kanan: navigasi tanggal (‹ "Thursday, 24 Oct" ›).
   - **Week strip:** 7 kartu hari (MON 21 … SUN 27), radius 8, `surface-tint`. Hari ini ("TODAY 24") berlatar `secondary` + shadow. Ada titik indikator kecil di bawah tanggal (hijau / merah / abu).
   - **Daftar sesi:** tiap baris `surface-alt`, radius 12: kotak waktu di kiri → avatar 40 → nama (16/600) → durasi dengan ikon jam (12 px `muted`) → badge status → kebab. Sesi berikutnya: kotak waktu berlatar `secondary` berlabel "NEXT UP" (putih), baris punya gradient halus. Sesi lain: kotak waktu `surface-3` berlabel "TIME". Sesi selesai: opacity turun, ikon centang di kotak waktu, badge "Done".

### 7.3 Verifikasi

- Judul "Pending Intake & Onboarding Queue" + deskripsi 12 px `ink-soft`.
- Toolbar dalam kartu putih: search bar pill + chip aktif "All Pending (0)".
- **Empty state** di tengah: ikon hourglass-centang, "Semua pengajuan sudah diproses", deskripsi "Belum ada pendaftar baru saat ini. Notifikasi otomatis akan muncul di sini begitu ada calon klien mendaftar."
- Saat ada data: ganti empty state dengan daftar pengajuan (belum ada desainnya, ikuti pola kartu klien §7.4).

### 7.4 Klien

- Judul "Active Client" + badge "24 Tracked".
- **Toolbar** (kartu putih, radius 12): search bar pill (placeholder "Search athlete by name, email, or protocol...") · chip "All (24)" (aktif, oranye), "Hypertrophy", "Weight Loss" · dropdown "Status: Active".
- **Grid kartu klien:** 3 kolom, gap 24. Tiap kartu:
  - Avatar kotak 40 (radius 8) + nama (16/600) + email (12 px `muted`); kanan: ikon chat + kebab.
  - Tag "Started Aug 12".
  - Kotak **Session Slot** (`surface-alt`, radius 8): overline "SESSION SLOT" + ikon jam `accent-indigo` + "Today 9:30 AM".
  - Tombol secondary full-width "View Full Profile & Program →".

### 7.5 Riwayat

- Judul "Client Progress & Biometrics" + badge "24 Tracked".
- **Kartu filter:** segmented 1 (All Goals aktif oranye · Weight Loss · Hypertrophy / Bulk) + segmented 2 (All aktif putih · Female · Male).
- **Kartu "Athletic Progress Matrix"** (tabel):
  - Kolom: CLIENT PROFILE · TARGET VECTOR · BB AWAL · BB SEKARANG · NET DELTA (overline 10 px `muted`).
  - Baris tinggi ≈ 72 px, divider 1 px `surface-3`.
  - Client Profile: avatar bulat + titik status hijau, nama 14/600, sub "Age 29 • Tier Elite" (11 px `muted`).
  - Target Vector: badge (Weight Loss merah / Hypertrophy hijau).
  - BB Awal / BB Sekarang: teks 14 px, satuan kg.
  - Net Delta: badge dengan panah ↓ / ↑.

### 7.6 Feedback

- Judul "Feedback Center" + subtitle "Real-time biometrics evaluation, video analysis reviews, and coaching dispatch."
- **Dua panel** (gap 24): kiri **daftar percakapan** ≈ 440 px, kanan **detail** (sisa lebar).
- **Item percakapan:** kartu putih radius 12. Avatar 40 (foto atau inisial) · nama 16/600 · waktu ("14m ago") `muted` kanan atas · preview maks 2 baris 12 px `muted`. **Terpilih:** border `accent-indigo` + strip hijau di sisi kiri.
- **Header klien** (kartu putih): avatar kotak 48, nama 20/600, "Week 8/12 • Macro Target: Hyper-Deficit", tombol kecil "Full Profile" di kanan.
- **Coaching Protocol Dispatch** (kartu putih):
  - Judul + subtitle; kanan: badge "Draft Auto-saved 1m ago".
  - Overline "DISPATCH TAXONOMY TAGS".
  - **Rich text editor:** wadah dengan border/ring `surface-5`, toolbar (Bold, Italic, bullet list, numbered list, code, emoji) + area teks putih 14 px, scroll internal.
  - Footer rata kanan: **Save Draft** (secondary) + **Send Feedback** (accent oranye).

### 7.7 Profil

- Judul "Trainer Profile Settings" + deskripsi. Dua kolom: kiri ≈ 1/3, kanan sisanya.
- **Kartu profil (kiri):** cover gradient hijau (radius atas 12) → avatar bulat 80 dengan border putih, badge kamera oranye di pojok → "Coach Alex Vance, CSCS" (16/600) → "@fithub_orlando" (`muted`) → tombol secondary "Change Avatar" (ikon upload).
- **Personal Information (kanan atas):** grid form 2 kolom: Professional Name (tag *public*) · Email Address (tag *verified*) · Gym Location (tag *unique*) · Gender (select) · Age · Specializations (select multi + chip terpilih "Weight Loss ×", "Weight Gain / Bulking ×" + "+ Add Specialty"). Di bawahnya **Bio / Coaching Philosophy** (textarea, counter "342 / 600 chars", helper text). Footer: **Discard** (secondary) + **Save Changes** (oranye, ikon simpan).
- **Preferences & Security Preview (kanan bawah):**
  - Baris **Interface Appearance Mode**: latar `surface-tint`, radius 12, deskripsi kiri + segmented **Light / Dark** kanan (aktif putih, ikon matahari `warning`).
  - **Authentication Key Rotation:** helper "Ensure password contains 12+ characters...", input "Current Password" (ikon key, ikon mata), teks "Last key rotation executed 74 days ago", tombol **Update Password** (oranye) di kanan.

---

## 8. Implementasi

### 8.1 CSS variables

```css
:root {
  /* brand */
  --primary: #7DC04E;
  --secondary: #F69665;
  --white: #FFFFFF;
  --on-primary: #FFFFFF;
  --on-secondary: #FFFFFF;

  /* neutral */
  --ink: #181B25;
  --sidebar: #2C303A;
  --ink-soft: #464555;
  --muted: #777587;
  --outline: #C7C4D8;
  --surface-tint: #F1F3FF;
  --surface-alt: #F9F9FF;
  --surface-2: #EBEDFB;
  --surface-3: #E5E8F5;
  --surface-4: #DFE2EF;
  --surface-5: #E2DFFF;

  /* semantic */
  --success: #006C47;
  --success-container: #82F9BE;
  --success-deep: #002113;
  --danger: #FF6C6C;
  --danger-strong: #BA1A1A;
  --danger-container: #FFDAD6;
  --secondary-strong: #C34E31;
  --secondary-deep: #A2361B;
  --accent-indigo: #493EE5;
  --warning: #F59E0B;

  /* shape */
  --radius-control: 8px;
  --radius-card: 12px;
  --radius-pill: 9999px;
  --shadow-card: 0 1px 3px rgba(24, 27, 37, 0.08);
}
```

### 8.2 Tailwind (`tailwind.config.ts`)

```ts
theme: {
  extend: {
    fontFamily: { sans: ["var(--font-jakarta)", "sans-serif"] },
    colors: {
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      ink: { DEFAULT: "var(--ink)", soft: "var(--ink-soft)" },
      sidebar: "var(--sidebar)",
      muted: "var(--muted)",
      outline: "var(--outline)",
      surface: {
        tint: "var(--surface-tint)",
        alt: "var(--surface-alt)",
        2: "var(--surface-2)",
        3: "var(--surface-3)",
        4: "var(--surface-4)",
        5: "var(--surface-5)",
      },
      success: { DEFAULT: "var(--success)", container: "var(--success-container)" },
      danger: { DEFAULT: "var(--danger)", strong: "var(--danger-strong)", container: "var(--danger-container)" },
      indigo: { accent: "var(--accent-indigo)" },
    },
    borderRadius: { control: "8px", card: "12px" },
    boxShadow: { card: "var(--shadow-card)" },
  },
}
```

---

## 9. Catatan & Asumsi (perlu dikonfirmasi)

1. **Kontras teks putih** di atas `primary`/`secondary` rendah (lihat §2.4). Diputuskan sebelum production.
2. **Dark mode** belum didesain (hanya toggle). Token sudah dipisah supaya mudah dibuat varian gelap.
3. **Responsive** belum ada desain. Sementara: sidebar jadi drawer di bawah `lg`, grid klien 3 → 2 → 1 kolom, panel Feedback dan Profil menumpuk vertikal di layar kecil.
4. Arti **titik indikator** di week strip (hijau, merah, abu) diasumsikan: hijau = ada sesi terjadwal, merah = perlu perhatian, abu = kosong.
5. Semua ukuran font/spacing bertanda `≈` diperkirakan dari screenshot, cek Inspect di Figma sebelum finalisasi.
6. Daftar pengajuan Verifikasi (saat tidak kosong), halaman detail klien ("View Full Profile & Program"), dan state error/loading belum ada desainnya.
