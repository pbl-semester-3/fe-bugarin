"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Moon, RotateCw, Sun } from "lucide-react";
import { cn } from "cn";
import {
  useForm,
  type Control,
  type FieldPath,
} from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePtPassword, useUpdatePtTheme } from "@/hooks/usePtProfile";
import type { PtProfile, PtTheme } from "@/lib/mock/pt-profile";
import {
  ptPasswordSchema,
  type PtPasswordForm,
} from "@/lib/schemas/pt-profile.schema";

// Section 2 — Preferences & Security Preview (design/PROFIL.md §4.2).
export function PreferencesSecurity({ profile }: { profile: PtProfile }) {
  const [theme, setTheme] = useState<PtTheme>(profile.tema);
  const [currentPassword, setCurrentPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const updateTheme = useUpdatePtTheme();
  const updatePassword = useUpdatePtPassword();

  const form = useForm<PtPasswordForm>({
    resolver: zodResolver(ptPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function applyTheme(next: PtTheme) {
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "malam");
    updateTheme.mutate(next);
  }

  function openChangePassword() {
    // Prefill dari field Current Password di tampilan utama.
    form.setValue("currentPassword", currentPassword);
    setDialogOpen(true);
  }

  function onSubmit(values: PtPasswordForm) {
    updatePassword.mutate(values, {
      onSuccess: () => {
        form.reset();
        setCurrentPassword("");
        setDialogOpen(false);
        setSuccessOpen(true);
      },
    });
  }

  return (
    <section className="space-y-6 rounded-panel bg-white p-6 shadow-card">
      <div>
        <h2 className="text-lg font-extrabold text-ink">
          Preferensi &amp; Keamanan
        </h2>
        <p className="text-xs text-ink-soft">
          Kontrol tampilan ruang kerja dan jaga keamanan akses akunmu.
        </p>
      </div>

      {/* Interface Appearance Mode */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-panel bg-surface-tint p-4">
        <div>
          <p className="text-sm font-bold text-ink">
            Mode Tampilan Antarmuka
          </p>
          <p className="text-xs text-ink-soft">
            Pilih antara tampilan terang kontras tinggi dan mode gelap.
          </p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-pill bg-surface-2 p-1">
          <button
            type="button"
            onClick={() => applyTheme("siang")}
            className={cn(
              "inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-xs font-bold transition-colors",
              theme === "siang"
                ? "bg-white text-ink shadow-card"
                : "text-muted-foreground"
            )}
          >
            <Sun className="size-3.5 text-warning" />
            Terang
          </button>
          <button
            type="button"
            onClick={() => applyTheme("malam")}
            className={cn(
              "inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-xs font-bold transition-colors",
              theme === "malam"
                ? "bg-white text-ink shadow-card"
                : "text-muted-foreground"
            )}
          >
            <Moon className="size-3.5" />
            Gelap
          </button>
        </div>
      </div>

      {/* Authentication Key Rotation — hanya Current Password di tampilan utama */}
      <div className="space-y-4">
        <div>
          <p className="text-sm font-bold text-ink">
            Rotasi Kunci Autentikasi
          </p>
          <p className="text-xs text-muted-foreground">
            Pastikan password berisi 12+ karakter termasuk simbol, huruf
            besar-kecil, dan angka.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            Password Saat Ini
          </label>
          <PasswordInput
            value={currentPassword}
            onChange={setCurrentPassword}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <RotateCw className="size-3.5" />
            Rotasi kunci terakhir {profile.lastPasswordRotationDays} hari lalu
          </span>
          <Button
            type="button"
            variant="accent"
            className="rounded-pill"
            onClick={openChangePassword}
          >
            Ganti Password
          </Button>
        </div>
      </div>

      {/* Jendela mengambang ganti password */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-panel sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ganti Password</DialogTitle>
            <DialogDescription>
              Masukkan password saat ini, password baru, dan konfirmasinya.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <PasswordField
                control={form.control}
                name="currentPassword"
                label="Password Saat Ini"
              />
              <PasswordField
                control={form.control}
                name="newPassword"
                label="Password Baru"
              />
              <PasswordField
                control={form.control}
                name="confirmPassword"
                label="Konfirmasi Password Baru"
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  className="rounded-pill"
                  disabled={updatePassword.isPending}
                >
                  Perbarui Password
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Alert sukses */}
      <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
        <AlertDialogContent className="rounded-panel" size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Password berhasil diubah!</AlertDialogTitle>
            <AlertDialogDescription>
              Password akunmu telah diperbarui.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="rounded-pill">
              Tutup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

// Input password berdiri sendiri (di luar Form), untuk tampilan utama.
function PasswordInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <KeyRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type={show ? "text" : "password"}
        className="rounded-card px-10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="••••••••"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-ink"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

function PasswordField({
  control,
  name,
  label,
}: {
  control: Control<PtPasswordForm>;
  name: FieldPath<PtPasswordForm>;
  label: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={show ? "text" : "password"}
                className="rounded-card px-10"
                {...field}
              />
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-ink"
              >
                {show ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
