# Bugarin Frontend — Workflow & Coding Rules

Dokumen ini mengatur cara kerja tim di repo `fe-bugarin`. Struktur sama persis dengan `WORKFLOW.md` di `be-bugarin` (biar konsisten lintas repo), disesuaikan untuk konteks kerja frontend.

---

## 1. Implementation Plan (Sebelum Coding)

Sama seperti Backend — task apa pun (halaman baru, komponen baru, integrasi endpoint baru) wajib mulai dari rencana tertulis dulu, direview, baru dieksekusi.

### Format Implementation Plan

```markdown
## Task: <nama task, mis. "Halaman Verifikasi PT">

**Referensi**: Bugarin_PRD_Frontend.md bab 4.2, skill shadcn-ui-patterns

**Endpoint backend yang dipakai**: GET /pt/pairing-requests, PUT /pt/pairing-requests/:id
(status endpoint ini di be-bugarin: sudah ada / masih stub — cek dulu sebelum mulai)

**Yang akan dibuat/diubah**:
- `app/pt/verifikasi/page.tsx`
- `hooks/usePairingRequests.ts` (query + mutation)
- `components/tolak-dialog.tsx`

**Komponen shadcn yang dipakai**: Table, Dialog, Textarea, Button

**Business logic penting**: tombol Tolak wajib isi alasan sebelum submit (validasi Zod)

**Risiko/hal yang perlu diperhatikan**:
- Endpoint backend masih stub — tampilkan dengan data dummy dulu kalau backend belum siap,
  tandai jelas dengan TODO, jangan block task ini nunggu backend
```

### Alur Approval

Sama seperti Backend: **post plan dulu → approve → baru coding**. Kalau di tengah jalan ternyata desain (Figma) berubah dari yang direncanakan, update plan dan minta approval ulang.

> Khusus Frontend: kalau task butuh endpoint yang **belum diimplementasikan di be-bugarin** (masih stub `/ping`), sebutkan itu di plan — kerjain UI dengan data dummy/mock dulu, jangan nunggu backend selesai duluan. Update lagi begitu endpoint aslinya siap.

---

## 2. Branching Strategy

Sama persis konvensi dengan `be-bugarin`:

```
main    ← selalu deployable (auto-deploy ke Vercel), cuma nerima merge dari dev via PR
 └─ dev
     ├─ feat/halaman-verifikasi-pt
     ├─ feat/dashboard-admin-statistik
     ├─ fix/role-guard-redirect-loop
     └─ chore/upgrade-shadcn-components
```

Prefix (`feat/`, `fix/`, `chore/`, `docs/`, `refactor/`) dan aturan merge (tidak ada commit langsung ke `main`/`dev`, PR minimal 1 approval) — sama seperti di `be-bugarin`.

---

## 3. Testing Lokal Wajib Sebelum Push

```bash
npm run lint         # harus 0 error
npm run typecheck    # harus 0 error
npm run build        # harus sukses (Next.js build penuh, bukan cuma dev server jalan)
```

**Kenapa `npm run build` bukan cuma `npm run dev`**: `next dev` bisa "kelihatan jalan" padahal ada error yang cuma muncul saat production build (mis. halaman yang butuh data dinamis tapi ke-generate sebagai static, atau error TypeScript yang di-skip di dev mode). Selalu build penuh sebelum push, sama seperti Backend.

Tambahan khusus Frontend — **cek manual di browser** sebelum push:
- Buka halaman yang diubah, pastikan nggak ada error di console browser (bukan cuma build sukses di terminal)
- Kalau ubah proxy.ts atau layout dengan role guard, test both authorized DAN unauthorized access (harus redirect benar)

---

## 4. Commit Rules

Sama persis format dengan Backend: **Conventional Commits, Bahasa Indonesia**.

```
feat: tambah halaman verifikasi PT dengan aksi terima/tolak
fix: perbaiki role guard yang redirect loop di halaman admin
chore: upgrade eslint-config-next ke versi terbaru
docs: update Bugarin_PRD_Frontend.md bagian CRUD user
refactor: pindahkan query key ke factory terpusat
```

Aturan sama: 1 commit = 1 perubahan logis, bukan narasi proses, referensikan issue kalau relevan.

---

## 5. Work Result (Setelah Task Selesai)

```markdown
## Work Result: <nama task>

**Branch**: feat/halaman-verifikasi-pt
**Implementation Plan**: [link]

**Yang selesai dikerjakan**:
- [x] Halaman `/pt/verifikasi` — tabel daftar request + aksi Terima/Tolak
- [x] Dialog alasan penolakan (wajib diisi sebelum submit)
- [x] Invalidation ke dashboard-summary setelah aksi (jumlah klien ikut update)

**Yang BELUM selesai / diluar scope**:
- Loading skeleton belum ditambahkan (pakai spinner sederhana dulu)

**Hasil testing lokal**:
- `npm run lint` → 0 error
- `npm run typecheck` → 0 error
- `npm run build` → sukses
- Manual test di browser: [screenshot halaman + console bersih]

**Endpoint backend yang dipakai**: GET/PUT /pt/pairing-requests — [status: sudah live di be-bugarin / masih pakai data dummy]

**Hal yang perlu diperhatikan reviewer**:
- UI masih pakai default shadcn styling, belum di-reskin sesuai Figma final (nunggu tim UI/UX)
```

---

## Ringkasan Alur Satu Task

```
1. Terima/ambil task
2. Cek status endpoint backend terkait di be-bugarin (siap / masih stub?)
3. Tulis Implementation Plan → post untuk direview
4. Approved → checkout branch baru dari dev (feat/xxx)
5. Coding (pakai data dummy kalau backend belum siap, tandai TODO)
6. npm run lint && npm run typecheck && npm run build → semua harus lolos
7. Cek manual di browser (console bersih, role guard benar)
8. Commit (Conventional Commits, Bahasa Indonesia)
9. Push branch → buka PR ke dev
10. Tulis Work Result di PR (sertakan screenshot)
11. Review → approve → merge ke dev
```
