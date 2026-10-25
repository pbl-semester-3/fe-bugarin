"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { useUpdateAdminPassword } from "@/hooks/useAdminProfile";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "cn";

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Kata sandi saat ini wajib diisi."),
    newPassword: z
      .string()
      .min(8, "Minimal 8 karakter.")
      .regex(/[a-z]/, "Wajib ada huruf kecil.")
      .regex(/[A-Z]/, "Wajib ada huruf besar.")
      .regex(/[0-9]/, "Wajib ada angka.")
      .regex(/[^A-Za-z0-9]/, "Wajib ada simbol."),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi."),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi tidak sama dengan kata sandi baru.",
  })
  .refine((v) => v.newPassword !== v.currentPassword, {
    path: ["newPassword"],
    message: "Kata sandi baru tidak boleh sama dengan yang lama.",
  });

type SecurityValues = z.infer<typeof securitySchema>;

const labelClass = "text-[11px] font-medium text-admin-heading";
const errorClass = "text-[10px] text-danger-strong";

// Card "Ubah Kata Sandi Root Admin" — tab Keamanan (design/admin/profil.md §5).
export function SecurityForm() {
  const updatePassword = useUpdateAdminPassword();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [visible, setVisible] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  function toggle(field: keyof typeof visible) {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  function onSubmit(values: SecurityValues) {
    setFeedback(null);
    updatePassword.mutate(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          setFeedback("Kata sandi berhasil diubah.");
          reset();
        },
        onError: (err) => setFeedback(apiErrorMessage(err)),
      }
    );
  }

  function renderField(
    id: "currentPassword" | "newPassword" | "confirmPassword",
    label: string,
    visibleKey: keyof typeof visible,
    helper?: string,
    autocomplete?: string
  ) {
    const isVisible = visible[visibleKey];
    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className={labelClass}>
          {label} <span className="text-danger-strong">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            id={id}
            type={isVisible ? "text" : "password"}
            autoComplete={autocomplete}
            className="h-9 w-full rounded-control bg-admin-low pr-9 pl-8 text-xs text-admin-heading outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            {...register(id)}
          />
          <button
            type="button"
            aria-label={isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            aria-pressed={isVisible}
            onClick={() => toggle(visibleKey)}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-admin-heading"
          >
            {isVisible ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        </div>
        {helper && !errors[id] && (
          <p className="text-[10px] text-muted-foreground">{helper}</p>
        )}
        {errors[id] && <p className={errorClass}>{errors[id]?.message}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <div className="relative">
          {/* TODO(design): alur "Lupa kata sandi?" belum ada desain — tautan tampil, aksi TODO. */}
          <span className="absolute top-0 right-0 cursor-pointer text-[10px] font-medium text-admin-green-text">
            Lupa kata sandi?
          </span>
          {renderField(
            "currentPassword",
            "Kata Sandi Saat Ini",
            "current",
            "Wajib dimasukkan untuk otorisasi perubahan.",
            "current-password"
          )}
        </div>
        {renderField("newPassword", "Kata Sandi Baru", "next", undefined, "new-password")}
        {renderField(
          "confirmPassword",
          "Konfirmasi Kata Sandi Baru",
          "confirm",
          undefined,
          "new-password"
        )}
      </div>

      {feedback && (
        <p
          className={cn(
            "mt-4 text-xs font-medium",
            feedback.includes("berhasil")
              ? "text-admin-green-text"
              : "text-danger-strong"
          )}
        >
          {feedback}
        </p>
      )}

      <div className="mt-10 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => reset()}
          disabled={updatePassword.isPending}
          className="rounded-control bg-admin-mid px-4 py-2 text-[11px] font-bold text-admin-heading transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={updatePassword.isPending}
          className="flex items-center gap-2 rounded-control bg-brand px-4 py-2 text-[11px] font-bold text-on-accent shadow-card transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <KeyRound className="size-3.5" />
          {updatePassword.isPending ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
        </button>
      </div>
    </form>
  );
}
