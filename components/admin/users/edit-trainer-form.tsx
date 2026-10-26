"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { PageBanner } from "@/components/admin/page-banner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminTrainers, useSendTrainerResetCode, useUpdateTrainer } from "@/hooks/useAdminTrainers";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "cn";

const BRANCH_OPTIONS = [
  "Senopati Hub (Jakarta Selatan) - Lt. 2",
  "Kemang Hub (Jakarta Selatan)",
  "BSD Hub (Tangerang Selatan)",
  "Depok Hub (Jawa Barat)",
];

const inputClass =
  "h-9 w-full rounded-control bg-admin-low pl-8 pr-3 text-xs text-admin-heading outline-none placeholder:text-admin-secondary focus-visible:ring-2 focus-visible:ring-primary/40";
const labelClass =
  "text-[10px] font-bold tracking-widest text-admin-secondary uppercase";

// Halaman Edit PT (design/admin/kelola-pengguna.md §8).
export function EditTrainerForm({ trainerId }: { trainerId: number }) {
  const { data: trainers, isLoading } = useAdminTrainers();
  const trainer = trainers?.find((t) => t.id === trainerId);
  const updateProfile = useUpdateTrainer();
  const setActive = useUpdateTrainer();
  const sendResetCode = useSendTrainerResetCode();
  const branchOptions =
    trainer?.hub && !BRANCH_OPTIONS.includes(trainer.hub)
      ? [...BRANCH_OPTIONS, trainer.hub]
      : BRANCH_OPTIONS;

  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState(BRANCH_OPTIONS[0]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [suspended, setSuspended] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [suspendError, setSuspendError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  const [initialized, setInitialized] = useState(false);
  if (!initialized && trainer) {
    setInitialized(true);
    setFullName(trainer.name);
    setEmail(trainer.email);
    setWhatsapp(trainer.whatsapp ?? "");
    setBranch(
      trainer.hub && trainer.hub !== "-" ? trainer.hub : BRANCH_OPTIONS[0]
    );
    setSuspended(trainer.status === "NONAKTIF");
  }

  async function handleSave() {
    setSaveError(null);
    const normalizedWhatsapp = whatsapp.replace(/[^\d+]/g, "");
    try {
      await updateProfile.mutateAsync({
        id: trainerId,
        nama: fullName.trim(),
        email: email.trim(),
        tempatGym: branch,
        ...(normalizedWhatsapp ? { whatsapp: normalizedWhatsapp } : {}),
        ...(password ? { password } : {}),
      });
      setPassword("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setSaveError(apiErrorMessage(err, "Gagal menyimpan perubahan."));
    }
  }

  async function handleToggleSuspend() {
    const next = !suspended;
    if (
      next &&
      !window.confirm(
        "Suspend akun pelatih ini? Akses login dan booking sesi akan dinonaktifkan."
      )
    ) {
      return;
    }

    setSuspendError(null);
    try {
      const res = await setActive.mutateAsync({
        id: trainerId,
        isActive: !next,
      });
      setSuspended(res.data.data.isActive === false);
    } catch (err) {
      setSuspendError(apiErrorMessage(err, "Gagal mengubah status akun PT."));
    }
  }

  async function handleForceReset() {
    if (!trainer) return;
    if (
      !window.confirm(
        "Kirim kode reset password ke email PT? PT perlu memasukkan kode untuk membuat sandi baru."
      )
    ) {
      return;
    }

    setResetError(null);
    setResetMessage(null);
    try {
      await sendResetCode.mutateAsync(trainer.email);
      setResetMessage(
        "Jika akun aktif, kode reset telah dikirim ke email PT."
      );
    } catch (err) {
      setResetError(apiErrorMessage(err, "Gagal mengirim kode reset."));
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-40 animate-pulse rounded bg-admin-low" />
        <div className="h-16 animate-pulse rounded-card bg-admin-surface" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-card bg-admin-surface" />
          <div className="h-72 animate-pulse rounded-card bg-admin-surface" />
        </div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/users?tab=pt"
          className="inline-flex items-center gap-2 text-base font-medium text-admin-heading"
        >
          <ArrowLeft className="size-4" />
          Batal & Kembali
        </Link>
        <div className="rounded-card bg-admin-surface p-16 text-center shadow-card">
          <p className="text-sm text-admin-secondary">
            Data trainer tidak ditemukan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/users?tab=pt"
        className="inline-flex items-center gap-2 text-base font-medium text-admin-heading"
      >
        <ArrowLeft className="size-4" />
        Batal & Kembali
      </Link>

      <PageBanner
        gradient
        title="Edit Konfigurasi & Profil Personal Trainer"
        description="Perbarui profil kredensial, penyesuaian kuota klien, hak akses cabang, dan aksi keamanan akun pelatih."
        className="py-4"
        titleClassName="text-[22px]"
        descriptionClassName="text-xs max-w-none"
      />

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
        <section className="rounded-card bg-admin-surface p-4 shadow-card lg:col-span-6">
          <h2 className="text-base font-semibold text-admin-heading">
            Identitas & Biodata Operasional
          </h2>
          <p className="text-[10px] text-muted-foreground">
            Informasi identitas resmi dan penetapan unit operasional pelatih
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="edit-name" className={labelClass}>
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="edit-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="edit-wa" className={labelClass}>
                Nomor WhatsApp Operasional
              </label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="edit-wa"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="edit-email" className={labelClass}>
                Email Resmi
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="edit-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Cabang Gym</label>
              <div className="relative">
                <MapPin className="absolute top-1/2 left-2.5 z-10 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger className="h-9 w-full rounded-control border-0 bg-admin-low pl-8 text-xs text-admin-heading">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {branchOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-card bg-admin-surface p-4 shadow-card lg:col-span-6">
          <h2 className="text-base font-semibold text-admin-heading">
            Aksi Kredensial & Kontrol Keamanan
          </h2>
          <p className="text-[10px] text-muted-foreground">
            Kelola sesi aktif, reset sandi, dan status suspensi darurat akun
            pelatih
          </p>

          <div className="mt-4 space-y-1.5">
            <label htmlFor="edit-password" className="text-xs font-bold text-admin-heading">
              Perbarui Password Personal Trainer
            </label>
            <div className="relative">
              <KeyRound className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="edit-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kosongkan jika tidak diubah"
                className={cn(inputClass, "pr-9")}
              />
              <button
                type="button"
                aria-label={
                  showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                }
                aria-pressed={showPassword}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-admin-heading"
              >
                {showPassword ? (
                  <EyeOff className="size-3.5" />
                ) : (
                  <Eye className="size-3.5" />
                )}
              </button>
            </div>
            <div className="flex flex-col items-end gap-1">
              <button
                type="button"
                onClick={handleForceReset}
                disabled={sendResetCode.isPending}
                className="rounded-md bg-brand px-4 py-2 text-[11px] font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {sendResetCode.isPending
                  ? "Mengirim..."
                  : "Kirim Kode Reset Password"}
              </button>
              {resetMessage && (
                <p className="text-[10px] text-admin-green-text">
                  {resetMessage}
                </p>
              )}
              {resetError && (
                <p className="text-[10px] text-admin-danger-text">
                  {resetError}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 rounded-control bg-admin-low p-3">
            <div>
              <p className="text-xs font-bold text-admin-heading">
                Kunci Sementara Akun Pelatih (Suspend)
              </p>
              <p className="mt-0.5 max-w-[70%] text-[10px] text-admin-secondary">
                Nonaktifkan akses login dan booking sesi jika pelatih sedang
                mengambil cuti panjang atau audit operasional.
              </p>
              <p className="mt-1 text-[10px] font-bold tracking-wide uppercase">
                Status saat ini:{" "}
                <span
                  className={
                    suspended
                      ? "text-admin-danger-text"
                      : "text-admin-green-text"
                  }
                >
                  {suspended ? "NONAKTIF" : "AKTIF"}
                </span>
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={suspended}
              aria-label="Kunci sementara akun pelatih"
              disabled={setActive.isPending}
              onClick={handleToggleSuspend}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-pill transition-colors disabled:opacity-60",
                suspended ? "bg-danger-strong" : "bg-admin-track"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
                  suspended ? "right-0.5" : "left-0.5"
                )}
              />
            </button>
          </div>
          {suspendError && (
            <p className="mt-2 text-[10px] text-admin-danger-text">
              {suspendError}
            </p>
          )}
        </section>
      </div>

      {/* Desain belum punya tombol Simpan (catatan inkonsistensi no. 1) —
          ditambahkan sesuai rekomendasi md. */}
      <div className="flex flex-col items-end gap-1">
        <button
          type="button"
          onClick={handleSave}
          disabled={updateProfile.isPending}
          className="rounded-control bg-brand px-6 py-2.5 text-sm font-semibold text-on-accent shadow-card transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {updateProfile.isPending
            ? "Menyimpan..."
            : saved
              ? "Perubahan tersimpan"
              : "Simpan Perubahan"}
        </button>
        {saveError && (
          <p className="text-[10px] text-admin-danger-text">{saveError}</p>
        )}
      </div>
    </div>
  );
}
