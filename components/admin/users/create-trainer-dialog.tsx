"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff, KeyRound, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTrainer } from "@/hooks/useAdminTrainers";
import { apiErrorMessage, getFieldErrors } from "@/lib/api";
import type { TrainerForm } from "@/lib/types/admin";
import { cn } from "cn";

const BRANCH_OPTIONS = [
  "Senopati Hub (Jakarta Selatan)",
  "Kemang Hub (Jakarta Selatan)",
  "BSD Hub (Tangerang Selatan)",
  "Depok Hub (Jawa Barat)",
];

const INITIAL_FORM: TrainerForm = {
  fullName: "",
  email: "",
  whatsapp: "",
  branch: "",
  gender: "Laki-laki",
  specialization: "",
  password: "",
};

function normalizeWhatsapp(value: string) {
  return value.replace(/[^\d+]/g, "");
}

// Modal Daftarkan Akun PT Baru (design/admin/kelola-pengguna.md §6).
export function CreateTrainerDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const createTrainer = useCreateTrainer();
  const [form, setForm] = useState<TrainerForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerForm, string>>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [createdUsername, setCreatedUsername] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function setField<K extends keyof TrainerForm>(key: K, value: TrainerForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function resetDialog() {
    setForm(INITIAL_FORM);
    setErrors({});
    setGeneralError(null);
    setShowPassword(false);
    setCreatedUsername(null);
    setCopied(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetDialog();
    onOpenChange(next);
  }

  function validate(): boolean {
    const next: Partial<Record<keyof TrainerForm, string>> = {};
    const whatsapp = normalizeWhatsapp(form.whatsapp);
    if (!form.fullName.trim()) next.fullName = "Nama wajib diisi.";
    if (!form.email.trim()) next.email = "Email wajib diisi.";
    else if (!form.email.endsWith("@bugarin.fit"))
      next.email = "Email harus berakhiran @bugarin.fit.";
    if (!form.whatsapp.trim()) next.whatsapp = "Nomor WhatsApp wajib diisi.";
    else if (!whatsapp.startsWith("+62"))
      next.whatsapp = "Format nomor harus diawali +62.";
    else {
      const digits = whatsapp.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 14)
        next.whatsapp = "Nomor WhatsApp harus 10-14 digit termasuk +62.";
    }
    if (!form.branch) next.branch = "Cabang wajib dipilih.";
    if (!form.specialization)
      next.specialization = "Spesialisasi wajib dipilih.";
    if (!form.password) next.password = "Password wajib diisi.";
    else if (form.password.length < 8)
      next.password = "Password minimal 8 karakter.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGeneralError(null);
    if (!validate()) return;

    createTrainer.mutate(
      {
        nama: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        whatsapp: normalizeWhatsapp(form.whatsapp),
        jenisKelamin: form.gender === "Laki-laki" ? "pria" : "wanita",
        tempatGym: form.branch,
        spesialisasi:
          form.specialization === "Naik BB" ? "naik_bb" : "turun_bb",
      },
      {
        onSuccess: (res) => {
          setCreatedUsername(res.data.data.username);
          setForm(INITIAL_FORM);
          setErrors({});
        },
        onError: (err) => {
          const fieldErrors = getFieldErrors(err);
          if (fieldErrors) {
            const next: Partial<Record<keyof TrainerForm, string>> = {};
            const pick = (key: keyof TrainerForm, field: string) => {
              const message = fieldErrors[field]?.[0];
              if (message) next[key] = message;
            };
            pick("fullName", "nama");
            pick("email", "email");
            pick("password", "password");
            pick("whatsapp", "whatsapp");
            pick("branch", "tempatGym");
            pick("specialization", "spesialisasi");
            pick("gender", "jenisKelamin");
            setErrors(next);
          }
          setGeneralError(apiErrorMessage(err, "Gagal membuat akun PT."));
        },
      }
    );
  }

  async function handleCopy() {
    if (!createdUsername) return;
    try {
      await navigator.clipboard.writeText(createdUsername);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard tidak tersedia: username tetap bisa dibaca manual.
    }
  }

  const inputClass =
    "h-12 w-full rounded-control bg-admin-low px-3 text-[15px] text-admin-heading outline-none placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-primary/40";
  const labelClass = "text-sm font-bold text-admin-heading";
  const errorClass = "mt-1 text-[11px] text-danger-strong";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[95vh] w-full max-w-[720px] gap-0 overflow-y-auto rounded-[20px] p-0 sm:max-w-[720px]"
      >
        <div className="flex items-start justify-between bg-admin-navy px-8 py-6">
          <div>
            <DialogTitle className="text-[22px] font-semibold text-white">
              Daftarkan Akun PT Baru
            </DialogTitle>
            <p className="mt-1 text-sm text-admin-on-navy">
              Penerbitan akun trainer resmi ekosistem Bugarin
            </p>
          </div>
          <DialogClose
            aria-label="Tutup"
            className="text-white transition-opacity hover:opacity-70"
          >
            <X className="size-5" />
          </DialogClose>
        </div>

        {createdUsername ? (
          <div className="bg-admin-surface p-8">
            <div className="rounded-card border border-admin-track bg-admin-low p-5">
              <p className="text-base font-semibold text-admin-heading">
                Akun PT berhasil dibuat
              </p>
              <p className="mt-1 text-xs text-admin-secondary">
                Username dibuat otomatis dan tidak dapat diubah. Password adalah
                yang Anda isi dan bisa diganti sendiri oleh PT.
              </p>

              <div className="mt-4 rounded-control bg-admin-surface px-3 py-2.5">
                <p className="text-[10px] font-bold tracking-widest text-admin-secondary uppercase">
                  Username PT
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <p className="font-mono text-sm font-semibold text-admin-heading">
                    @{createdUsername}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md bg-admin-mid px-3 py-1.5 text-[11px] font-medium text-admin-heading transition-colors hover:bg-admin-track"
                  >
                    {copied ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {copied ? "Tersalin" : "Salin"}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-6 h-12 w-full rounded-[10px] bg-brand text-base font-semibold text-on-accent shadow-card transition-opacity hover:opacity-90"
            >
              Selesai
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-admin-surface p-8">
            <p className="text-xs font-bold tracking-widest text-admin-secondary uppercase">
              1. Identitas Personal Trainer
            </p>

            {generalError && (
              <p className="mt-3 rounded-control bg-admin-danger-tint px-3 py-2 text-[11px] text-admin-danger-text">
                {generalError}
              </p>
            )}

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Nama Lengkap & Gelar Resmi{" "}
                  <span className="text-danger-strong">*</span>
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  placeholder="Contoh: Farhan Pratama, S.Or, CSCS"
                  className={cn(inputClass, "mt-1.5")}
                />
                {errors.fullName && (
                  <p className={errorClass}>{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Alamat Email Resmi (@bugarin.fit){" "}
                    <span className="text-danger-strong">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="farhan.p@bugarin.fit"
                    className={cn(inputClass, "mt-1.5")}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="whatsapp" className={labelClass}>
                    Nomor WhatsApp Aktif{" "}
                    <span className="text-danger-strong">*</span>
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => setField("whatsapp", e.target.value)}
                    placeholder="+62 812-xxxx-xxxx"
                    className={cn(inputClass, "mt-1.5")}
                  />
                  {errors.whatsapp && (
                    <p className={errorClass}>{errors.whatsapp}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Cabang Penempatan Utama Gym{" "}
                    <span className="text-danger-strong">*</span>
                  </label>
                  <Select
                    value={form.branch}
                    onValueChange={(v) => setField("branch", v)}
                  >
                    <SelectTrigger className="mt-1.5 h-12 w-full rounded-control border-0 bg-admin-low text-[15px] text-admin-heading">
                      <SelectValue placeholder="Pilih Cabang Resmi..." />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANCH_OPTIONS.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.branch && (
                    <p className={errorClass}>{errors.branch}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>
                    Jenis Kelamin <span className="text-danger-strong">*</span>
                  </label>
                  <Select
                    value={form.gender}
                    onValueChange={(v) =>
                      setField("gender", v as TrainerForm["gender"])
                    }
                  >
                    <SelectTrigger className="mt-1.5 h-12 w-full rounded-control border-0 bg-admin-low text-[15px] text-admin-heading">
                      <SelectValue placeholder="Laki-laki" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className={errorClass}>{errors.gender}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Spesialisasi Fokus Pembinaan{" "}
                  <span className="text-danger-strong">*</span>
                </label>
                <Select
                  value={form.specialization}
                  onValueChange={(v) =>
                    setField(
                      "specialization",
                      v as TrainerForm["specialization"]
                    )
                  }
                >
                  <SelectTrigger className="mt-1.5 h-12 w-full rounded-control border-0 bg-admin-low text-[15px] text-admin-heading">
                    <SelectValue placeholder="Pilih Spesialisasi..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Naik BB">Naik BB</SelectItem>
                    <SelectItem value="Turun BB">Turun BB</SelectItem>
                  </SelectContent>
                </Select>
                {errors.specialization && (
                  <p className={errorClass}>{errors.specialization}</p>
                )}
              </div>

              <div className="border-t border-admin-track pt-4">
                <p className="text-xs font-bold tracking-widest text-admin-secondary uppercase">
                  2. Kredensial Akun
                </p>

                <div className="mt-3">
                  <label htmlFor="password" className={labelClass}>
                    Password <span className="text-danger-strong">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <KeyRound className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setField("password", e.target.value)}
                      placeholder="Minimal 8 karakter"
                      className={cn(inputClass, "pr-10 pl-10")}
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-admin-heading"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className={errorClass}>{errors.password}</p>
                  )}
                  <p className="mt-1 text-[11px] text-admin-secondary">
                    Username dibuat otomatis dari email. Password bisa diganti
                    sendiri oleh PT setelah login.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={createTrainer.isPending}
              className="mt-8 h-12 w-full rounded-[10px] bg-brand text-base font-semibold text-on-accent shadow-card transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {createTrainer.isPending
                ? "Memproses..."
                : "Konfirmasi Pembuatan"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
