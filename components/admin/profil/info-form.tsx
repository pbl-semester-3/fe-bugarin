"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Save, User } from "lucide-react";
import { useAdminProfile, useUpdateAdminProfile } from "@/hooks/useAdminProfile";
import { apiErrorMessage } from "@/lib/api";
import { ThemeSegmented } from "./theme-segmented";
import { cn } from "cn";

const infoSchema = z.object({
  firstName: z.string().min(1, "Nama depan wajib diisi."),
  lastName: z.string().min(1, "Nama belakang wajib diisi."),
  email: z.string().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  phone: z
    .string()
    .min(1, "Nomor telepon wajib diisi.")
    .startsWith("+62", "Format nomor harus diawali +62."),
  bio: z.string(),
});

type InfoValues = z.infer<typeof infoSchema>;

const inputClass =
  "h-9 w-full rounded-control bg-admin-low pl-8 pr-3 text-xs text-admin-heading outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40";
const labelClass = "text-[11px] font-medium text-admin-heading";
const errorClass = "text-[10px] text-danger-strong";

// Card "Data Diri Pejabat Eksekutif" — tab Informasi Data Diri (design/admin/profil.md §4).
export function InfoForm() {
  const { data: profile } = useAdminProfile();
  const updateProfile = useUpdateAdminProfile();
  const [feedback, setFeedback] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<InfoValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        bio: profile.bio,
      });
    }
  }, [profile, reset]);

  function onSubmit(values: InfoValues) {
    setFeedback(null);
    updateProfile.mutate(values, {
      onSuccess: () => {
        setFeedback("Data diri berhasil disimpan.");
        reset(values);
      },
      onError: (err) => setFeedback(apiErrorMessage(err)),
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className={labelClass}>
              Nama Depan
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input id="firstName" className={inputClass} {...register("firstName")} />
            </div>
            {errors.firstName && (
              <p className={errorClass}>{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lastName" className={labelClass}>
              Nama Belakang
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input id="lastName" className={inputClass} {...register("lastName")} />
            </div>
            {errors.lastName && (
              <p className={errorClass}>{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className={labelClass}>
              Email Admin
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input id="email" type="email" className={inputClass} {...register("email")} />
            </div>
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className={labelClass}>
              Nomor Telepon / WhatsApp Verifikasi
            </label>
            <div className="relative">
              <Phone className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input id="phone" className={inputClass} {...register("phone")} />
            </div>
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="bio" className={labelClass}>
              Catatan Biografi Singkat & Delegasi Wewenang
            </label>
            <textarea
              id="bio"
              rows={6}
              className={cn(inputClass, "h-auto min-h-40 resize-none py-3 pl-3")}
              {...register("bio")}
            />
          </div>
        </div>

        {feedback && (
          <p className="mt-4 text-xs font-medium text-admin-green-text">
            {feedback}
          </p>
        )}

        <div className="mt-8 flex items-center gap-2">
          <button
            type="button"
            onClick={() => reset()}
            disabled={!isDirty || updateProfile.isPending}
            className="rounded-control bg-admin-mid px-3.5 py-2 text-xs font-medium text-admin-heading transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Batalkan
          </button>
          <button
            type="submit"
            disabled={!isDirty || updateProfile.isPending}
            className="flex items-center gap-2 rounded-control bg-brand px-4 py-2 text-xs font-medium text-on-accent shadow-card transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Save className="size-3.5" />
            {updateProfile.isPending ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>

      <div className="mt-4">
        <ThemeSegmented />
      </div>
    </div>
  );
}
