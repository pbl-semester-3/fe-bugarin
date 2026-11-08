import { z } from "zod";

// Form Profil PT — hanya field yang boleh diubah PT.
// Read-only (hanya Admin): email, username, jenisKelamin, tempatGym, spesialisasi.
export const ptProfileSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  usia: z.coerce.number().int().min(13, "Usia minimal 13 tahun"),
  whatsapp: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^\+?[0-9]{8,14}$/.test(value),
      "Format WhatsApp hanya '+' dan angka"
    ),
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
