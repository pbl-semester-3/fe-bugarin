"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Lock, Mail, MapPin, Save, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdatePtProfile } from "@/hooks/usePtProfile";
import type { PtProfile } from "@/lib/types/pt";
import {
  ptProfileSchema,
  type PtProfileForm,
} from "@/lib/schemas/pt-profile.schema";

// Section 1 — Personal Information (design/PROFIL.md §4.1).
// email & username read-only (backend hanya izinkan Admin mengubahnya).
export function PersonalInfoForm({ profile }: { profile: PtProfile }) {
  const mutation = useUpdatePtProfile();

  const form = useForm<PtProfileForm>({
    resolver: zodResolver(ptProfileSchema),
    defaultValues: {
      nama: profile.profile.nama,
      tempatGym: profile.profile.tempatGym ?? "",
      gender: profile.profile.jenisKelamin ?? "pria",
      usia: profile.profile.usia ?? 17,
      spesialisasi: profile.profile.spesialisasi ?? "turun_bb",
    },
  });

  function onSubmit(values: PtProfileForm) {
    mutation.mutate(
      {
        nama: values.nama,
        tempatGym: values.tempatGym,
        jenisKelamin: values.gender,
        usia: values.usia,
        spesialisasi: values.spesialisasi,
      },
      { onSuccess: () => form.reset(values) }
    );
  }

  return (
    <section className="rounded-panel bg-white p-6 shadow-card">
      <h2 className="text-lg font-extrabold text-ink">Informasi Pribadi</h2>
      <p className="text-xs text-ink-soft">
        Identitas utama yang ditampilkan di ekosistem atlet dan direktori
        bimbingan.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Nama Profesional</FieldLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="rounded-card pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FieldLabel>Alamat Email (read-only)</FieldLabel>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="rounded-card bg-surface-2 pl-10"
                  value={profile.user.email}
                  disabled
                  readOnly
                />
              </div>
            </FormItem>

            <FormItem>
              <FieldLabel>Username (read-only)</FieldLabel>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="rounded-card bg-surface-2 pl-10"
                  value={`@${profile.user.username}`}
                  disabled
                  readOnly
                />
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="tempatGym"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Lokasi Gym</FieldLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="rounded-card pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Jenis Kelamin</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-card">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pria">Laki-laki</SelectItem>
                      <SelectItem value="wanita">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="usia"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Usia</FieldLabel>
                  <FormControl>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="number"
                        className="rounded-card pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="spesialisasi"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Spesialisasi</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-card">
                        <SelectValue placeholder="Pilih spesialisasi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="turun_bb">Turun BB</SelectItem>
                      <SelectItem value="naik_bb">Naik BB</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              className="rounded-pill bg-surface-2 hover:bg-surface-3"
              onClick={() => form.reset()}
            >
              Batalkan
            </Button>
            <Button
              type="submit"
              variant="accent"
              className="rounded-pill"
              disabled={mutation.isPending}
            >
              <Save className="size-4" />
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <FormLabel className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
      {children}
    </FormLabel>
  );
}
