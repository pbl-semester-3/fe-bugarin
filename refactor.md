# Rencana Refactor Struktur App

Branch: `refactor/struktur-app` (dibuat dari `dev`).

Tujuan: merapikan struktur route, tipe, service layer, komponen, dan font tanpa mengubah logika bisnis atau tampilan.

## Keputusan

- Semua halaman role memakai URL bersih di dalam grup `app/(app)`.
- `/dashboard`, `/riwayat`, dan `/profil` dipakai bersama oleh Admin dan PT; tampilan dipilih berdasarkan role dari session server.
- `/users` hanya Admin.
- `/verifikasi`, `/klien`, `/klien/[id]`, dan `/feedback` hanya PT.
- Role yang salah diarahkan ke `/dashboard`.
- Proteksi role dilakukan di `layout.tsx` server masing-masing folder, bukan hanya menyembunyikan menu.
- Folder komponen halaman memakai nama `components` (bukan `_components`), dan tidak boleh berisi `page.tsx`.
- Komponen shared per role: `app/(app)/components/admin` dan `app/(app)/components/pt`.
- Komponen global: `components/shell` dan `components/ui`.
- Avatar yang dipakai Admin dan PT: `components/ui/avatar.tsx`.
- `types/` dan `services/` berada di root proyek.
- `services/auth.server.ts` memakai `import "server-only"`.
- `getMe()` dibungkus `cache()` dari React agar tidak dobel fetch per request.
- Tema ditentukan berdasarkan role dari `getMe()`, bukan dari prefix URL `/admin` atau `/pt`.
- Semua link/redirect setelah login memakai URL bersih.
- Tidak mengubah logika bisnis atau tampilan; hanya memindahkan file, memperbaiki import, dan mengubah struktur route/guard/tema.

## Target Struktur

```txt
app/
  (public)/
    page.tsx
    components/                 # komponen landing
  (auth)/
    login/
      page.tsx
      components/login-form.tsx
  (app)/
    layout.tsx                  # getMe + pilih AdminShell/PtShell
    components/
      admin/                    # komponen admin lintas halaman
      pt/                       # komponen PT lintas halaman
    dashboard/
      page.tsx
      components/
        admin/
        pt/
    users/
      layout.tsx                # admin only
      page.tsx
      components/
      pt/[id]/edit/page.tsx
    riwayat/
      page.tsx
      components/
        admin/
        pt/
    profil/
      page.tsx
      components/
        admin/
        pt/
    verifikasi/
      layout.tsx                # PT only
      page.tsx
      components/
    klien/
      layout.tsx                # PT only
      page.tsx
      [id]/page.tsx
      components/
    feedback/
      layout.tsx                # PT only
      page.tsx
      components/
components/
  shell/
  ui/
types/
  auth.ts
  admin.ts
  pt.ts
services/
  api.ts
  auth.service.ts
  auth.server.ts
  admin/
  pt/
```

## Urutan Commit

1. `docs: tambah rencana refactor struktur app`
2. `refactor(types): pindahkan tipe domain ke folder types`
3. `refactor(services): tambah service layer dan rampingkan hooks`
4. `refactor(routes): gunakan URL bersih dengan grup app`
5. `refactor(components): kolokasikan komponen per halaman`
6. `chore(fonts): pindahkan font ke public dan perbarui dokumentasi`

Setiap commit implementasi merujuk file ini melalui body commit `Ref: refactor.md` dan memperbarui checklist di bawah.

## Checklist Proteksi Role

- [x] `/users` dan `/users/pt/[id]/edit` hanya `admin`.
- [x] `/verifikasi`, `/klien`, `/klien/[id]`, `/feedback` hanya `pt`.
- [x] `/dashboard`, `/riwayat`, `/profil` shared dan memilih view berdasarkan role.
- [x] Role salah redirect ke `/dashboard`.
- [x] Guard ada di `layout.tsx` server folder terkait.
- [x] `proxy.ts` hanya cek cookie; validasi role tetap di server.
- [x] `getMe()` di `services/auth.server.ts`, memakai `server-only` dan `cache()`.

## Checklist Route dan Tema

- [x] Login dan redirect setelah login memakai `/dashboard`.
- [x] Semua link Admin/PT memakai URL bersih.
- [x] Tidak ada lagi ketergantungan pada `/admin` atau `/pt` untuk tema.
- [x] Script anti-kedip berada di `app/(app)/layout.tsx` dan memilih tema dari role.
- [x] `app/layout.tsx` hanya menangani kondisi publik/login.

## Checklist Validasi

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run schema:check` (dengan `CONTRACT_PATH` ke repo backend)
- [x] Smoke test login Admin dan PT (diuji user; keduanya diarahkan ke `/dashboard`).
- [x] Cek `/users`, `/verifikasi`, `/klien`, `/feedback`, `/dashboard`, `/riwayat`, `/profil`.
- [ ] Cek role salah redirect ke `/dashboard` (kode guard sudah ada; belum diuji dengan akun nyata).
- [x] Tidak ada `page.tsx` di folder `components`.
- [x] Tidak ada import lama `@/components/admin`, `@/components/pt`, `@/components/landing`, `@/components/auth`, `@/lib/types`, `@/lib/api`.
- [x] Font `public/fonts` termuat.

## Catatan

- Kerjakan implementasi tanpa `git add`/commit sampai review selesai.
- Setelah approved, staging dilakukan satu per satu sesuai urutan commit di atas.
