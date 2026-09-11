---
name: frontend-taste-bugarin
description: Arah desain visual untuk Web Dashboard PT & Admin Bugarin — tone, hierarki, dan anti-pattern yang harus dihindari supaya tidak terasa generic/template AI. Gunakan sebelum membangun halaman baru atau saat UI terasa flat/generic.
metadata:
  origin: bugarin-project
  adapted_from: "prinsip umum ECC frontend-design-direction (MIT, https://github.com/affaan-m/ECC), disesuaikan untuk domain dashboard kesehatan/monitoring"
---

# Frontend Taste — Web Dashboard Bugarin

Web PT & Admin adalah **tool operasional yang dipakai berulang setiap hari** (PT cek klien tiap pagi, Admin pantau statistik), bukan landing page atau produk yang butuh "wow factor" sekali lihat. Arah desainnya harus mengikuti kebutuhan itu, sebelum bicara soal styling detail dari Figma.

## Activation

- Sebelum membangun halaman dashboard/tabel/form baru.
- UI sudah jalan secara fungsional tapi terasa flat, generic, atau "kayak template AI".
- Review desain sebelum reskin ke Figma final.

## Arah Desain (tetapkan sebelum coding)

1. **Purpose**: PT/Admin butuh **scan cepat** kondisi klien/platform, ambil keputusan (terima/tolak, setuju/override, approve), lalu lanjut kerjaan lain. Bukan dijelajahi santai.
2. **Audience**: pengguna berulang harian, sudah familiar dengan layar setelah 2-3 kali pakai — tidak butuh penjelasan ulang tiap elemen tiap kali buka.
3. **Tone**: **dense, tenang, scannable** — bukan playful atau maximal. Ini tool kesehatan/monitoring, kepercayaan datang dari kejelasan data, bukan dari animasi atau warna mencolok.
4. **Detail yang memberi kesan intentional**: konsistensi badge status (warna semantik yang sama persis untuk "pending/aktif/selesai" di semua halaman — jangan beda kuning-oranye antar tabel), dan grafik BB (`Recharts`) yang benar-benar jadi pusat perhatian di halaman detail klien, bukan sekadar pelengkap kecil di pojok.

## Implementasi

- Bangun tabel/dashboard fungsional dulu (data benar, aksi jalan) sebelum polish visual — jangan kebalik.
- Pakai token warna/spacing shadcn/Tailwind yang sudah ada, jangan bikin skala warna baru tiap halaman.
- Badge status (`pending`, `diterima`, `ditolak`, `aktif`, `selesai`, `pending_review`, `disetujui`, `override`) — definisikan **satu** mapping warna→status di satu tempat (`lib/status-colors.ts`), pakai di semua tabel. Jangan hardcode warna per halaman.
- Grafik BB (PT lihat klien) adalah elemen paling penting di halaman detail klien — beri ruang dominan, bukan diperkecil jadi thumbnail.
- Angka besar (jumlah klien, statistik admin) pakai hierarki tipografi yang jelas (angka besar + label kecil di bawah), bukan disamakan ukurannya dengan teks body.
- Empty state (belum ada klien, belum ada plan, grafik BB kosong) harus dirancang eksplisit — jangan biarkan tabel/chart kosong terlihat seperti bug.
- Untuk badge notifikasi (feedback belum dibaca, request pending baru) — konsisten sama Mobile: warna dan posisi badge sebaiknya senada dengan konvensi yang sama di Mobile Klien, supaya brand Bugarin terasa satu kesatuan lintas platform.

## Anti-Patterns

- Jangan pakai gradient ungu dekoratif, blob, atau ilustrasi generic hero image — ini bukan landing page marketing.
- Jangan taruh card di dalam card (nested card) untuk sekadar grouping visual — pakai spacing/border-bottom sederhana.
- Jangan sembunyikan aksi utama (Terima/Tolak, Setuju/Override) di balik menu dropdown "..." kalau ruang masih cukup untuk tombol langsung — aksi yang sering dipakai harus 1 klik, bukan 2.
- Jangan animasi berlebihan di transisi data (loading skeleton boleh, tapi hindari animasi dekoratif yang memperlambat scanning cepat).
- Jangan buat layout yang bergeser (shifting) saat data ter-load — pakai skeleton dengan dimensi tetap, bukan konten yang "loncat" begitu data datang.

## Review Checklist

- [ ] Warna badge status konsisten di semua halaman (satu sumber mapping).
- [ ] Halaman pertama yang dilihat PT/Admin langsung menunjukkan apa yang perlu ditindaklanjuti (request pending, plan yang perlu direview) — bukan tersembunyi di tab kedua.
- [ ] Grafik BB dan angka statistik punya hierarki visual yang jelas, tidak tenggelam di antara teks lain.
- [ ] Empty state ada untuk setiap kondisi data kosong yang mungkin terjadi (klien baru, belum ada plan, dst).
- [ ] Tidak ada nested card, gradient dekoratif, atau elemen visual yang tidak melayani fungsi.
- [ ] Layout stabil (tidak shifting) saat loading → data ter-render.

## Related

- Skill: `shadcn-ui-patterns` — komponen konkret yang dipakai untuk menerapkan arah ini
- Referensi tambahan: kalau ingin panduan desain umum yang lebih luas (di luar konteks dashboard operasional ini), pertimbangkan install skill resmi `frontend-design` dari `anthropics/skills`.
