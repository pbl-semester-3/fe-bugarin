# TODO Aset Landing Page

Saat ini aset asli dipakai langsung dari `public/landing/`. Optimasi/resize dapat dilakukan nanti jika performa terasa berat.

## Sudah terpasang

| Bagian | File | Catatan |
|---|---|---|
| Hero background | `beranda1.webp`–`beranda4.webp` | Carousel otomatis 3 detik |
| Section About | `tentang-bugarin.webp` | Foto pendampingan |
| Problem | `ilustrasi-masalah.webp` | Gambar kartu masalah |
| Solution | `ilustrasi-solusi.webp` | Gambar kartu solusi |
| FAQ | `faq.webp` | Foto di kolom kanan |

## Masih placeholder

| Bagian | File yang disarankan | Ukuran/format |
|---|---|---|
| Screenshot Beranda | `public/landing/app-beranda.webp` | 1080×2340, WebP |
| Screenshot PT Ku | `public/landing/app-pt-ku.webp` | 1080×2340, WebP |
| Screenshot Program | `public/landing/app-program.webp` | 1080×2340, WebP |
| Screenshot Riwayat | `public/landing/app-riwayat.webp` | 1080×2340, WebP |
| Screenshot Feedback | `public/landing/app-feedback.webp` | 1080×2340, WebP |

Setelah screenshot tersedia:
1. Taruh file di `public/landing/`.
2. Buka `lib/landing-content.ts`.
3. Ganti `imageSrc: null` pada `APP_SCREENS` menjadi path file.

## Konten dummy
- Jawaban FAQ di `lib/landing-content.ts`.
- Kontak footer (`FOOTER_CONTACTS`).
