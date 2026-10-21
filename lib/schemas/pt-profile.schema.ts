import { z } from "zod";

// Selaraskan manual (mirror disiplin) dengan schema Zod backend:
// bugarin-backend/src/modules/pt/pt.schema.ts. Kontrak aturan dicek otomatis
// lewat contract/schema-contract.json (npm run schema:check).
// Form Profil PT — hanya field yang diizinkan backend (email/username read-only).
export const ptProfileSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  tempatGym: z.string().min(3, "Tempat gym minimal 3 karakter"),
  gender: z.enum(["pria", "wanita"]),
  usia: z.coerce.number().int().min(13, "Usia minimal 13 tahun"),
  spesialisasi: z.enum(["turun_bb", "naik_bb"]),
});

export type PtProfileForm = z.infer<typeof ptProfileSchema>;

// Backend: passwordBaru minimal 8 karakter (changePtPasswordSchema).
export const ptPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z.string().min(8, "Password baru minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export type PtPasswordForm = z.infer<typeof ptPasswordSchema>;
