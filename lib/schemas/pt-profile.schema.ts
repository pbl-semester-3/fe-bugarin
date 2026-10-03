import { z } from "zod";
import { BIO_MAX_LENGTH } from "@/lib/mock/pt-profile";

// Schema validasi form Profil PT — selaras dengan aturan validasi backend
// (skill form-validation-patterns). TODO: samakan bila schema backend berubah.
export const ptProfileSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  tempatGym: z.string().min(3, "Gym location wajib diisi"),
  gender: z.enum(["pria", "wanita"]),
  usia: z.coerce.number().int().min(17, "Usia minimal 17 tahun"),
  spesialisasi: z.array(z.string()).min(1, "Pilih minimal 1 spesialisasi"),
  bio: z.string().max(BIO_MAX_LENGTH, `Maksimal ${BIO_MAX_LENGTH} karakter`),
});

export type PtProfileForm = z.infer<typeof ptProfileSchema>;

export const ptPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z.string().min(12, "Password minimal 12 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export type PtPasswordForm = z.infer<typeof ptPasswordSchema>;
