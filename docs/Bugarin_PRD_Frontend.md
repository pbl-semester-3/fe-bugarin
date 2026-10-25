# Bugarin — PRD Turunan: Frontend (Web PT & Admin)

Dokumen ini adalah turunan dari `Bugarin_PRD.md` (PRD induk), khusus untuk tim/developer yang mengerjakan Web Dashboard PT dan Admin. Rujuk `Bugarin_PRD_Backend_AI.md` untuk detail kontrak API, dan `bugarin_erd.mermaid` untuk skema data.

---

## 1. Tech Stack Frontend

| Komponen | Pilihan |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Data fetching | TanStack Query + Axios |
| Chart (grafik BB, statistik) | Recharts |
| Form handling | react-hook-form + Zod resolver |

---

## 2. Autentikasi & Proteksi Rute

- Token JWT disimpan sebagai cookie `httpOnly; Secure; SameSite=Strict` (diterbitkan backend saat login, lihat PRD Backend).
- `proxy.ts` di root Next.js (bukan `middleware.ts` — nama file berubah di Next.js 16, lihat skill `nextjs-app-router-patterns`): cek keberadaan cookie session pada setiap request ke `/pt/*` dan `/admin/*`. Tidak ada token → redirect `/login`. Validasi role tetap dilakukan ulang di layout Server Component dan di backend Express — proxy hanya lapisan UX, bukan security boundary penuh.
- Role di dalam JWT (`pt` / `admin`) menentukan grup rute yang boleh diakses — role `pt` tidak boleh mengakses `/admin/*` dan sebaliknya (validasi middleware + validasi ulang di backend, jangan andalkan frontend saja).
- Axios instance dikonfigurasi `withCredentials: true` supaya cookie ikut terkirim ke backend (beda origin, sudah di-whitelist via CORS backend).

---

## 3. Struktur Routing (App Router)

```
app/
 ├─ (auth)/
 │   └─ login/page.tsx                  # shared login PT & Admin
 ├─ pt/                                 # folder biasa, bukan route group
 │   ├─ layout.tsx                      # guard role=pt, shell nav PT
 │   ├─ dashboard/page.tsx
 │   ├─ verifikasi/page.tsx
 │   ├─ klien/page.tsx                  # list klien
 │   ├─ klien/[id]/page.tsx             # detail + grafik + review plan
 │   ├─ riwayat/page.tsx
 │   ├─ feedback/page.tsx
 │   └─ profil/page.tsx
 └─ admin/
     ├─ layout.tsx                      # guard role=admin, shell nav Admin
     ├─ dashboard/page.tsx
     ├─ users/page.tsx                  # tab Klien & PT
     ├─ users/pt/[id]/edit/page.tsx     # edit konfigurasi PT
     ├─ riwayat/page.tsx                # tab Daftar PT & Audit Admin
     └─ profil/page.tsx                 # tab Informasi & Keamanan
```

> Catatan: `pt/` dan `admin/` sengaja folder biasa (bukan route group) agar
> tidak bentrok saat build. Lihat `docs/SETUP.md`.

---

## 4. Spesifikasi Halaman — PT

### 4.1 Dashboard (`/pt/dashboard`)
- Card jumlah klien aktif.
- List/tabel jadwal latihan minggu ini (gabungan semua klien, dari `GET /pt/dashboard-summary`) — kolom: nama klien, hari, jam, jenis, lokasi (`tempat_gym`).
- Komponen: shadcn `Card`, `Table`.

### 4.2 Verifikasi (`/pt/verifikasi`)
- Tabel daftar request pending (`GET /pt/pairing-requests`): nama klien, tujuan, tanggal request.
- Aksi per baris: tombol **Terima** (langsung `PUT /pt/pairing-requests/:id`) dan **Tolak** (buka `Dialog` shadcn berisi textarea alasan → submit).
- Setelah aksi, invalidate query list (TanStack Query `invalidateQueries`).

### 4.3 Klien (`/pt/klien` dan `/pt/klien/[id]`)
- List (`/pt/klien`): tabel klien diterima (`GET /pt/klien`), klik baris → ke halaman detail.
- Detail (`/pt/klien/[id]`):
  - Info klien (nama, usia, gender, BB awal-sekarang, tujuan).
  - **Grafik BB historis** (Recharts line chart) dari `weight_logs` klien (via `GET /pt/klien/:id`).
  - **Section Review Weekly Plan** (`GET /pt/klien/:id/weekly-plan`): tampilkan `workout_plan` dan `meal_plan` dalam format readable (list, bukan raw JSON) + 2 tombol:
    - **Setuju** → `PUT /pt/weekly-plan/:id/approve`.
    - **Override** → buka form edit (bisa berupa form terstruktur per hari/menu, bukan textarea JSON mentah, supaya PT tidak perlu paham JSON) → `PUT /pt/weekly-plan/:id/override`.

### 4.4 Riwayat (`/pt/riwayat`)
- Tabel ringkas seluruh klien: nama, usia, gender, BB awal, BB sekarang (`GET /pt/riwayat`). Read-only, tanpa aksi.

### 4.5 Feedback (`/pt/feedback`)
- List nama klien (mirip halaman Klien tapi ringkas) — klik nama → buka panel/`Dialog` form textarea feedback → `POST /pt/klien/:id/feedbacks`.

### 4.6 Profil (`/pt/profil`)
- Form data diri: nama, email, username, jenis kelamin, usia, spesialisasi (dropdown Turun BB/Naik BB), **tempat gym** (wajib diisi — field baru, penting untuk fitur jadwal AI).
- Form ganti password.
- Toggle tema siang/malam.
- Tiap form section punya tombol Simpan sendiri (`PUT /pt/profile`, `PUT /pt/password`, `PUT /pt/theme`).

---

## 5. Spesifikasi Halaman — Admin

> Status: seluruh UI Admin sudah di-slicing dan di-merge ke `dev` dengan **data
> dummy**. Autentikasi admin dan integrasi endpoint `/admin/*` belum dikerjakan
> (lihat `docs/CATATAN.md`).

### 5.1 Dashboard (`/admin/dashboard`)
- Banner sambutan + 2 stat card: total klien aktif dan total PT aktif.
- Chart tren aktivitas sesi & registrasi (bar + line, 7 bulan, bulan aktif ditandai).
- Donut komposisi spesialisasi PT (2 segmen, total dihitung dinamis).
- Endpoint: `GET /admin/dashboard-summary`.

### 5.2 Kelola Pengguna (`/admin/users`)
- Satu halaman, 2 tab: **Daftar Personal Trainer (PT)** dan **Daftar Klien**
  (default Klien), state tab di query `?tab=`.
- Filter bar: search (debounce ±300ms) + 3 dropdown per tab; pagination 5 baris.
- Tab Klien: profil/email, PT pendamping atau pill "Tidak Ada PT", program &
  progress, status `AKTIF`/`ONBOARDING`, aksi Edit/Hapus.
- Tab PT: profil/ID/hub, pill keahlian, kredensial, status, cabang gym, aksi
  Edit/Hapus.
- Aksi **Daftarkan PT Baru** (tab PT) membuka dialog form: nama+gelar, email
  `@bugarin.fit`, WhatsApp `+62`, cabang, jenis kelamin, spesialisasi.
- Halaman `/admin/users/pt/[id]/edit`: identitas & biodata, perbarui/paksa reset
  password, toggle suspend, tombol Simpan Perubahan.
- Konfirmasi hapus memakai dialog shared untuk PT dan Klien.
- Endpoint yang dibutuhkan: `GET /admin/users?role=...`, `POST /admin/users/pt`,
  `GET/PUT/DELETE /admin/users/:id`, `POST /admin/users/:id/force-reset-password`,
  `PUT /admin/users/:id/suspend`.
- **Belum diimplementasikan:** Edit Klien (belum ada desain) dan Tambah Klien
  (open question produk). Tombol Edit Klien masih placeholder.

### 5.3 Riwayat (`/admin/riwayat`)
- Read-only, 2 tab: **Daftar Personal Trainer (PT)** (default) dan **Audit Admin**.
- Tab PT: search + filter kategori, tabel 6 kolom (waktu/ID, PT, klien+cohort,
  kategori, catatan, Detail), modal Detail Feedback.
- Tab Audit: tabel 5 kolom dengan zebra, badge aksi `CREATE/UPDATE/DELETE` dan
  status `BERHASIL/GAGAL`. Filter/search sengaja ditunda.
- Endpoint: `GET /admin/riwayat` (feedback + audit).
- Tidak ada kolom rating/sentimen dan tidak ada aksi tulis.

### 5.4 Profil (`/admin/profil`)
- Banner profil + 2 tab (default Informasi Data Diri).
- Tab Informasi: nama depan/belakang, email, telepon, bio; tombol Batalkan/Simpan;
  blok "Mode Tampilan Antarmuka" (Terang/Gelap).
- Tab Keamanan: kata sandi saat ini, kata sandi baru, konfirmasi; toggle
  tampil/sembunyi; tautan "Lupa kata sandi?" masih TODO.
- Preferensi tema disimpan di `localStorage`; belum ada upload foto.
- Endpoint: `GET/PUT /admin/profile`, `PUT /admin/password`, opsional
  `PUT /admin/theme`.

---

## 6. Data Fetching Pattern (TanStack Query)

Gunakan query key konsisten per resource, contoh:

```ts
// hooks/usePairingRequests.ts
export function usePairingRequests() {
  return useQuery({
    queryKey: ["pt", "pairing-requests"],
    queryFn: () => api.get("/pt/pairing-requests").then(r => r.data),
  });
}

export function useRespondPairingRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number; action: "accept" | "reject"; alasan?: string }) =>
      api.put(`/pt/pairing-requests/${payload.id}`, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pt", "pairing-requests"] }),
  });
}
```

Terapkan pola serupa untuk seluruh resource di Bab 4 dan 5 — satu file hook per domain (`usePtDashboard.ts`, `useKlien.ts`, `useAdminUsers.ts`, dst) supaya query key dan invalidation gampang dilacak.

---

## 7. Validasi & Edge Cases

- Form "Tambah PT Baru": validasi email unik ditangani backend, tapi tampilkan pesan error inline dari response API (jangan asumsikan selalu sukses).
- Tombol **Setuju** pada Weekly Plan disable jika status plan bukan `pending_review` (sudah diproses sebelumnya) — cegah aksi ganda.
- Grafik BB kosong (klien baru, belum ada `weight_logs`) → tampilkan empty state, bukan chart kosong/error.
- Form Override Weekly Plan: validasi struktur data sebelum submit (jangan kirim field kosong yang bikin JSON tidak valid ke backend).
- Halaman `/pt/klien/[id]` dan `/pt/klien` harus validasi klien tsb benar terdaftar di bawah PT yang login (backend yang enforce, tapi frontend redirect ke 404/403 kalau API menolak).
