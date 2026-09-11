---
name: form-validation-patterns
description: Pola react-hook-form + Zod resolver untuk form Web Dashboard PT & Admin Bugarin, selaras dengan validasi Zod di backend. Gunakan saat membangun form baru (Profil, Tambah PT, Override Weekly Plan).
metadata:
  origin: bugarin-project
---

# Form Validation Patterns (Bugarin)

Backend Bugarin sudah validasi tiap request pakai Zod (skill `express-typescript-patterns`). Frontend **tidak boleh** mengandalkan validasi backend sebagai satu-satunya lapisan (UX buruk — user baru tahu salah setelah submit) — tapi juga tidak boleh menganggap validasi frontend cukup (bisa dilewati lewat request langsung). Keduanya wajib ada, idealnya dengan rule yang sama persis.

## Activation

- Membangun form baru: Profil (PT/Admin), Tambah PT Baru, Tolak Request (alasan wajib), Override Weekly Plan.
- Ada bug: form lolos submit padahal data tidak valid, atau pesan error tidak jelas.

## Setup

```bash
npm install react-hook-form @hookform/resolvers zod
```

## Pola Dasar: Schema Zod → Form

Definisikan schema Zod **sekali**, dipakai untuk `resolver` react-hook-form **dan** idealnya mirror persis dengan schema Zod di backend (`modules/pt/pt.schema.ts`) — kalau backend ubah aturan validasi, frontend wajib disamakan (lihat protokol perubahan kontrak di skill `api-contract-bugarin`).

```typescript
// lib/schemas/pt-profile.schema.ts
import { z } from "zod";

export const ptProfileSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  jenisKelamin: z.enum(["pria", "wanita"]),
  usia: z.coerce.number().int().min(17, "Usia minimal 17 tahun"),
  spesialisasi: z.enum(["turun_bb", "naik_bb"]),
  tempatGym: z.string().min(3, "Tempat gym wajib diisi"), // field baru, wajib
});

export type PtProfileForm = z.infer<typeof ptProfileSchema>;
```

```tsx
// components/pt-profile-form.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ptProfileSchema, type PtProfileForm } from "@/lib/schemas/pt-profile.schema";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdatePtProfile } from "@/hooks/usePtProfile";

export function PtProfileForm({ defaultValues }: { defaultValues: PtProfileForm }) {
  const form = useForm<PtProfileForm>({ resolver: zodResolver(ptProfileSchema), defaultValues });
  const mutation = useUpdatePtProfile();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
        <FormField
          control={form.control}
          name="tempatGym"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempat Gym</FormLabel>
              <FormControl><Input placeholder="Contoh: GYM Fithub" {...field} /></FormControl>
              <FormMessage /> {/* otomatis tampilkan pesan error dari Zod di atas */}
            </FormItem>
          )}
        />
        {/* field lain pola sama */}
        <Button type="submit" disabled={mutation.isPending}>Simpan</Button>
      </form>
    </Form>
  );
}
```

## Menangani Error dari Backend (bukan cuma dari Zod frontend)

Response error validasi backend (lihat `api-contract-bugarin`): `{ "error": { "fields": { "email": ["sudah dipakai"] } } }`. Pasang error ini ke field form yang sesuai supaya user lihat pesan yang sama seperti validasi frontend:

```typescript
const mutation = useMutation({
  mutationFn: (values: PtProfileForm) => api.put("/pt/profile", values),
  onError: (err: AxiosError<{ error: { fields?: Record<string, string[]> } }>) => {
    const fields = err.response?.data?.error?.fields;
    if (fields) {
      Object.entries(fields).forEach(([field, messages]) => {
        form.setError(field as keyof PtProfileForm, { message: messages[0] });
      });
    }
  },
});
```

Ini penting terutama untuk validasi yang **tidak mungkin** dicek di frontend saja (mis. "email sudah dipakai" — hanya backend yang tahu, karena butuh cek database).

## Form Multi-Section dengan Submit Independen

Sesuai desain Profil (Informasi Diri / Detail Penting / Pengaturan Password / Tema — tiap section punya tombol Simpan sendiri, lihat `Bugarin_PRD_Frontend.md` bab 4.6): jangan gabung jadi satu `useForm` raksasa. Pisahkan **satu `useForm` per section**, supaya submit satu section tidak memvalidasi/mengirim field section lain yang belum tentu diisi.

## Anti-Patterns

| Anti-Pattern | Risiko | Perbaikan |
|---|---|---|
| Validasi cuma di frontend, backend percaya begitu saja | Bisa dilewati lewat request API langsung (Postman, dsb) | Backend tetap wajib validasi Zod sendiri, ini cuma UX layer |
| Satu `useForm` besar untuk seluruh halaman Profil (banyak section) | Submit satu section ikut mem-validasi field section lain yang kosong | Pisah `useForm` per section sesuai tombol Simpan masing-masing |
| Abaikan error field spesifik dari backend, cuma tampilkan toast generic | User tidak tahu field mana yang salah | `form.setError()` per field dari `error.fields` response |
| Duplikasi aturan validasi beda antara Zod frontend dan backend | User lolos di frontend tapi ditolak backend (atau sebaliknya, membingungkan) | Selaraskan manual — kalau backend schema berubah, update juga schema frontend |

## Related

- Skill: `api-contract-bugarin` — format error `{ error: { fields } }` yang di-parse di atas
- Skill: `express-typescript-patterns` — sumber schema Zod backend yang harus diselaraskan
- Skill: `shadcn-ui-patterns` — komponen `Form`/`FormField` yang dipakai di atas
