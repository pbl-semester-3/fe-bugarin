# PROFIL.md — Bugarin PT Platform

Spesifikasi layout halaman **Profil** (Trainer Profile Settings). Token warna, font, dan komponen global mengacu ke `DESIGN_PT.md`. Angka diambil dari panel Inspect Figma (frame **1728 × 1308**, node `162:1344`).

> Lebar area konten: **1424 px**. `Main` padding `top 64, left/right 24`. Frame lebih tinggi dari halaman lain (**1308**) karena form panjang.

---

## 1. Struktur halaman

```
[Top Ambient Glow Gradient Backdrop: "Trainer Profile Settings" + subtitle]
[Command Navigation Tab Bar (placeholder)]
[Workspace 12 kolom]
  ├─ LEFT (4 kolom):  Profile Identity Hologram Card (kartu identitas coach)
  └─ RIGHT (8 kolom):
        ├─ Section 1: Personal Information (form 2 kolom + bio)
        └─ Section 2: Preferences & Security Preview
```

---

## 2. Header halaman

- `Top Ambient Glow Gradient Backdrop`: W 1424 × H 66, `padding` atas 8.
- **Judul** "Trainer Profile Settings": Plus Jakarta Sans **ExtraBold 40px**, `line height` 36, `letter spacing` **-0.70px**, `fill` `#181B25`.
- **Subtitle**: "Manage public coaching profile telemetry, clinical credentials, and encrypted authentication parameters." — **20px / 400**, `#464555`, `line height` 20.
- **Command Navigation Tab Bar** (1424×12) hanya berisi satu pill kecil **12×12** `radius 9999` `#EBEDFB` — placeholder, belum ada tab nyata.

---

## 3. LEFT COLUMN — Profile Identity Hologram Card

- Kartu: W **461** × H **300**, `radius` **16**, `fill` putih, `padding` **24**.
- **Cover gradient**: `Rectangle` 461×112 (di atas kartu), gradient berbasis `#7DC04E` (`--primary`).
- **Avatar Stack with Pulse Ring** (112×112):
  - Cincin pulse: `radius 9999`, `fill` `#493EE5` @30% (`--accent-indigo`).
  - Background: `radius 9999`, `fill` putih, `padding` 4.
  - Foto: 104×104 `radius 9999`.
  - **Tombol kamera**: 32×32 `radius 9999`, `fill` putih, ikon `#F69665` (13×12). Posisi pojok kanan-bawah avatar.
- **Nama** "Coach Alex Vance, CSCS": **18px / 800** `#181B25`, `line height` 24.
- **Handle** "@fithub_orlando": **12px / 700** `#181B25`, `line height` 16, ls 0.24.
- **Tombol "Change Avatar"**: W 413 × H 36, `radius` 9999, `fill` `#EBEDFB` (`--surface-2`), `padding` 10/16, `gap` 8. Ikon upload 11×11 `#F69665` + teks **12px / 700** `#181B25`.

> ⚠️ **Masalah layout:** `Container` di dalam kartu berukuran **413×356**, sedangkan kartu hanya **300** tinggi — konten (avatar + nama + tombol) meluber ke luar kartu dan menumpuk elemen lain. Kemungkinan elemen diposisikan absolut sehingga auto-layout `Hug` kartu salah. Perlu dirapikan di Figma.

---

## 4. RIGHT COLUMN — Settings Sections (8 kolom)

- Container: W **943** × H **1063**, auto layout vertikal, `gap` **24**.

### 4.1 Section 1 — Personal Information

- Kartu: 943×615, `radius` **16**, `fill` putih, `padding` **24**.
- **Judul** "Personal Information" **18px / 800**; **subtitle** "Primary identification displayed in the athlete ecosystem and coaching directories." **12px / 400** `#464555`, `line height` 18.

**Form** (`gap` 16), grid 2 kolom. Tiap field W **439** × H **60**, `gap` 6:

| Label (overline) | Field | Tag kanan label |
|---|---|---|
| PROFESSIONAL NAME | input "Alex Vance" | `public` (`#493EE5`) |
| EMAIL ADDRESS | input "alex.vance@apexpulse.io" | `verified` (`#006C47`) |
| Gym location | input "fithub_orlando" | `unique` (`#493EE5`) |
| GENDER | select "Male" | — |
| AGE | input "33" | — |
| SPECIALIZATIONS | select "Weight Loss, Weight Gain / Bulking" | `Multi-Select` |

- **Label**: overline **10px / 700** `#777587`, ls 0.5. **Tag**: **10px / 600**, ls 0.5.
- **Input / Select**: W 439 × H 40, `radius` **12**, `fill` `#F1F3FF`, `padding` atas 10 / kanan 16 / bawah 10 / kiri 40. Ikon prefix `#777587` di kiri; Select punya chevron `#777587` di kanan.
- Nilai input: **14px / 400** `#181B25`, `line height` 20.

**Specialization Chips** (`gap` 8):
- Chip terpilih: pill `radius 9999`, `fill` `#493EE5` @10%, `padding` 4/12, `gap` 6. Ikon + teks **10px / 700** `#464555` + tombol close (7×7). Contoh: "Weight Loss", "Weight Gain / Bulking".
- Chip "Add Specialty": pill `fill` `#E5E8F5`, ikon + teks **10px / 600** `#464555`.

**Bio / Coaching Philosophy** (895×163, `gap` 6):
- Label "BIO / COACHING PHILOSOPHY" + counter "342 / 600 chars" (keduanya overline **10px / 700** `#777587`).
- Textarea: W 895 × H 119, `radius` **12**, `fill` `#F1F3FF`, `padding` ≈14. Teks **14px / 400** `#181B25`, `line height` 22.75.
- Helper: "This philosophy summary appears at the top of your athlete onboarding workflow." **12px / 400** `#777587`.

**Form Action Buttons** (`gap` 16, align kanan):
- **Discard**: 87×36, `radius` 9999, `fill` `#EBEDFB`, teks **12px / 700** `#181B25`, `padding` 10/20.
- **Save Changes**: 161×36, `radius` 9999, `fill` `#F69665`, teks **12px / 700** putih, `padding` 10/28, ikon simpan putih.

### 4.2 Section 2 — Preferences & Security Preview

- Kartu: 943×424, `radius` **16**, `fill` putih, `padding` **24**, `gap` 24.
- **Judul** "Preferences & Security Preview" **18px / 800**; **subtitle** "Control visual workspace rendering and maintain cryptographic account access." **12px / 400** `#464555`.

**Interface Appearance Toggle Box** (895×88, `radius` 16, `fill` `#F1F3FF`, `padding` 16, `SPACE_BETWEEN`):
- Kiri: "Interface Appearance Mode" **14px / 700** `#181B25`; deskripsi "Toggle between daylight high-contrast and midnight telemetry viewports." **12px / 400** `#464555`.
- Kanan **Sun/Moon Capsule Segmented Control**: pill 173×36, `radius` 9999, `fill` `#EBEDFB`, `padding` 4.
  - "Light" **(aktif)**: `fill` putih, `padding` 6/16, `gap` 8, ikon matahari 15×15 `#F59E0B` (`--warning`), teks **12px / 700** `#181B25`.
  - "Dark": transparan, ikon bulan 12×12 `#777587`, teks **12px / 500** `#777587`.

**Change Password Form** (`gap` 16):
- "Authentication Key Rotation" **14px / 700** `#181B25`; helper "Ensure password contains 12+ characters including symbols, casing, and numerics." **12px / 400** `#777587`.
- **Current Password** field: W 288 × H 60, `gap` 6. Label overline **10px / 700** `#777587`; input 288×40, `radius` 12, `fill` `#F1F3FF`, `padding` 10/40, ikon key + ikon mata `#777587`.
- **Action Bar** (`padding` atas 4, `SPACE_BETWEEN`): kiri ikon 12×12 `#777587` + "Last key rotation executed 74 days ago" **12px / 400** `#777587`; kanan **Update Password** 179×36, `radius` 9999, `fill` `#F69665`, teks **12px / 700** putih + ikon.

---

## 5. Header & Sidebar (global)

- **Header** dan **Aside** identik dengan `KLIEN.md` §6–§7. Item menu **aktif = Profil**.

---

## 6. Hal yang perlu dikonfirmasi

1. **`Command Navigation Tab Bar`** (§2) hanya placeholder 12×12 — belum ada desain tab. Fungsinya apa?
2. **Overflow kartu profil** (§3): kontainer 413×356 > kartu 300 — perlu diperbaiki di Figma. Koordinat nama/avatar/tombol juga tumpang-tindih.
3. **Radius input = 12**, bukan 8 (token global) — konsisten dengan halaman lain yang memakai 10/12; token `--radius-control` perlu ditinjau.
4. **Data placeholder campur brand**: email `alex.vance@apexpulse.io`, password `cyberpulse_alex_2023`, handle `@fithub_orlando` — perlu diganti ke brand final.
5. **Counter bio "342 / 600 chars"** — apakah batas 600 karakter final?
6. **Dark mode** di-toggle tapi belum didesain (lihat `DESIGN_PT.md` §9 poin 2).
7. **Validasi & state tombol** (Save Changes/Update Password) belum dispesifikasi.
