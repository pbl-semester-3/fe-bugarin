# DASHBOARD.md — Bugarin PT Platform

Spesifikasi layout halaman **Dashboard**. Token warna, font, dan komponen global mengacu ke `DESIGN.md` — file ini hanya berisi detail spacing, ukuran, dan struktur khusus halaman ini, diambil langsung dari panel Inspect Figma.

> Lebar area konten (di luar sidebar): **1424 px** (frame 1728, sidebar ≈ 213 px, sisa jadi padding halaman kiri/kanan).

---

## 1. Struktur halaman

```
[Banner sapaan]
[Stat card: Total Active Clients] [Stat card: Pending Verifications]
[Card: Daily Trajectory & Schedule]
  ├─ Header (judul + badge + nav tanggal)
  ├─ Week strip (7 kartu hari)
  └─ Daftar sesi (list baris klien)
```

Urutan vertikal, gap antar-blok ≈ 24 px, lebar tiap blok **Fill 1424 px**.

---

## 2. Banner sapaan

- Auto layout **vertikal**, isi rata kiri.
- `Resizing`: W **Fill 1424**, H **Hug** (≈126 px dengan 1 baris subtitle, bisa bertambah hingga ≈140 px kalau subtitle 2 baris).
- `Padding`: **24** di semua sisi.
- `Gap`: 0 (judul dan subtitle langsung menumpuk, jarak hanya dari line-height).
- `Corner radius`: **12**.
- `Fill`: `#7DC04E` (`--primary`), opacity 100%.
- Isi: judul "Good morning, Coach {Nama}!" (putih, Hero) + subtitle "AI Generated Schedule is synchronized with client biometric streams." (putih, 14 px).

---

## 3. Baris Stat Card

- Container: auto layout **horizontal**, W **Fill 1424**, H **Hug** (≈140), `padding` 0, `gap` **20**, `corner radius` 0, tanpa fill (transparan — tiap card yang punya background).
- 2 kartu dengan lebar sama (grow/fill), masing-masing:
  - `Fill` putih, `corner radius` 12, `padding` ≈24.
  - Ikon dalam kotak 40×40, `corner radius` 8, `fill` `#F69665` (`--secondary`), ikon putih.
  - Overline 10–11 px uppercase `--muted` → "TOTAL ACTIVE CLIENTS" / "PENDING VERIFICATIONS".
  - Angka besar 36 px / 700 → "24" / "3".

> Catatan: hanya 2 stat card di desain saat ini. Kalau nanti nambah, pakai `gap 20` yang sama dan card tetap grow merata (W Fill, bukan Hug).

---

## 4. Card "Daily Trajectory & Schedule"

- Auto layout **vertikal**, W **Fill 1424**, H **Hug** (≈640, mengikuti jumlah baris sesi).
- `Padding`: **24** semua sisi.
- `Gap`: 0 antar sub-blok (header, week strip, list) — jarak visual berasal dari margin internal tiap elemen, bukan gap container.
- `Corner radius`: **12**. `Fill`: putih 100%.

### 4.1 Header

- Kiri: judul "Daily Trajectory & Schedule" (20/600) + badge "⚡ AI Planned" (pill, bg `secondary` tint, teks `secondary`) sejajar horizontal; di bawahnya subtitle "Real-time biometrics re-route sequence automatically based on HRV." (12 px `--muted`).
- Kanan: navigator tanggal — ikon ‹ , label "Thursday, 24 Oct" (pill `surface-tint`), ikon ›.

### 4.2 Week strip

- 7 kartu hari (MON–SUN), sama lebar, `gap` kecil (≈8–12), `corner radius` 8.
- Default: `fill` `surface-tint`, teks hari (overline `--muted`) + tanggal (16/600 `--ink`).
- **Hari ini** ("TODAY 24"): `fill` `secondary`, teks putih, sedikit shadow.
- Titik indikator kecil di bawah tanggal tiap hari (hijau/merah/abu) — lihat §7.2 DESIGN.md untuk asumsi artinya.

### 4.3 Daftar sesi (list wrapper)

- Auto layout **vertikal**, W **Fill 1376** (= 1424 − padding card 24×2), H **Hug** (≈454 untuk 4 baris).
- `Padding`: kanan **16**, sisi lain 0 (list menempel ke tepi kiri/atas/bawah card, hanya diberi jarak di kanan — kemungkinan ruang untuk scrollbar).
- `Gap` antar baris: **8**.

### 4.4 Baris sesi (item)

- Auto layout **horizontal**, W **Fill 1376**, H **Hug** (≈106).
- `Padding`: **16** semua sisi.
- `Gap`: **Auto** (space-between — elemen kiri dan kanan didorong ke ujung).
- `Corner radius`: **12**. `Fill`: `#F1F3FF` (`--surface-tint`).
- Isi per baris (kiri → kanan):
  1. **Kotak waktu**: default `fill` `surface-3`, label "TIME" overline + jam besar (16/700). Baris berikutnya ("NEXT UP"): `fill` `secondary`, teks putih. Baris selesai: ikon centang kecil bukan label, opacity konten diturunkan.
  2. **Avatar** 40×40 bulat.
  3. **Blok teks** (vertikal, 3 baris):
     - Nama klien (16/600) — "Marcus Sterling"
     - Durasi (12 px `--muted`) — "45 min"
     - Tag tujuan (12 px `--muted`) — "Loss Weight" / "Hypertrophy"
     - Lokasi gym (12 px `--muted`) — "pusatgym"
  4. **Badge status** (kanan): "Queued" (`surface-3`, teks `--muted`) atau "✓ Done" (`success-container`, teks `--success`).
  5. **Kebab menu** (⋮) — hanya muncul di baris non-"Done" terakhir sebelum badge, sebagai aksi tambahan.

> ⚠️ **Update dari versi sebelumnya:** baris sesi sekarang punya **3 baris meta-teks** (durasi, tujuan, lokasi gym), bukan cuma durasi. `DESIGN.md` §7.2 perlu disesuaikan — kabari kalau ingin aku update sekalian di sana.

---

## 5. Hal yang perlu dikonfirmasi

1. Di screenshot terbaru, label section **"MAIN COMMAND"** di atas menu sidebar tidak terlihat lagi (langsung logo → menu). Apakah ini memang dihapus dari desain, atau cuma terpotong saat screenshot?
2. Tag tujuan di baris sesi ("Loss Weight", "Hypertrophy") — apakah ini sama dengan badge "Weight Loss"/"Hypertrophy" di halaman Klien/Riwayat (pakai warna merah/hijau), atau di sini sengaja ditulis sebagai teks polos tanpa badge warna?
3. Lebar fix stat card row dibaca **H 140 Hug**, sedikit beda dari isi kartu (ikon+overline+angka biasanya ≈120). Kemungkinan ada padding vertikal ekstra pada card individual — nanti dicek lagi kalau kamu kirim detail stat card secara terpisah.

Kirim halaman berikutnya kapan saja — aku lanjutkan dengan format `.md` per halaman yang sama.
