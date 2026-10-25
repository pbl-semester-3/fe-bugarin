"use client";

import { useState } from "react";
import { X } from "lucide-react";
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
import { useCreateTrainer } from "@/hooks/useAdminUsers";
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
};

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
  const [success, setSuccess] = useState(false);

  function setField<K extends keyof TrainerForm>(key: K, value: TrainerForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof TrainerForm, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Nama wajib diisi.";
    if (!form.email.trim()) next.email = "Email wajib diisi.";
    else if (!form.email.endsWith("@bugarin.fit"))
      next.email = "Email harus berakhiran @bugarin.fit.";
    if (!form.whatsapp.trim()) next.whatsapp = "Nomor WhatsApp wajib diisi.";
    else if (!form.whatsapp.startsWith("+62"))
      next.whatsapp = "Format nomor harus diawali +62.";
    if (!form.branch) next.branch = "Cabang wajib dipilih.";
    if (!form.specialization.trim())
      next.specialization = "Spesialisasi wajib diisi.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    createTrainer.mutate(form, {
      onSuccess: () => {
        setSuccess(true);
        setForm(INITIAL_FORM);
        setTimeout(() => {
          setSuccess(false);
          onOpenChange(false);
        }, 1200);
      },
    });
  }

  const inputClass =
    "h-12 w-full rounded-control bg-admin-low px-3 text-[15px] text-admin-heading outline-none placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-primary/40";
  const labelClass = "text-sm font-bold text-admin-heading";
  const errorClass = "mt-1 text-[11px] text-danger-strong";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-xl gap-0 overflow-hidden rounded-[20px] p-0"
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

        <form onSubmit={handleSubmit} className="bg-admin-surface p-8">
          <p className="text-xs font-bold tracking-widest text-admin-secondary uppercase">
            1. Identitas Personal Trainer
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Nama Lengkap & Gelar Resmi <span className="text-danger-strong">*</span>
              </label>
              <input
                id="fullName"
                value={form.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                placeholder="Contoh: Farhan Pratama, S.Or, CSCS"
                className={cn(inputClass, "mt-1.5")}
              />
              {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
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
                  Nomor WhatsApp Aktif <span className="text-danger-strong">*</span>
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
                {errors.branch && <p className={errorClass}>{errors.branch}</p>}
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
              </div>
            </div>

            <div>
              <label htmlFor="specialization" className={labelClass}>
                Spesialisasi Fokus Pembinaan{" "}
                <span className="text-danger-strong">*</span>
              </label>
              <input
                id="specialization"
                value={form.specialization}
                onChange={(e) => setField("specialization", e.target.value)}
                placeholder="Contoh: Naik BB or Turun BB"
                className={cn(inputClass, "mt-1.5")}
              />
              {errors.specialization && (
                <p className={errorClass}>{errors.specialization}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={createTrainer.isPending || success}
            className="mt-8 h-12 w-full rounded-[10px] bg-brand text-base font-semibold text-on-accent shadow-card transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {success
              ? "Akun PT berhasil didaftarkan"
              : createTrainer.isPending
                ? "Memproses..."
                : "Konfirmasi Pembuatan"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
