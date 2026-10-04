"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Mail, MapPin, Plus, Save, User, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePtProfile } from "@/hooks/usePtProfile";
import {
  BIO_MAX_LENGTH,
  SPECIALIZATION_OPTIONS,
  type PtProfile,
} from "@/lib/mock/pt-profile";
import {
  ptProfileSchema,
  type PtProfileForm,
} from "@/lib/schemas/pt-profile.schema";

// Section 1 — Personal Information (design/PROFIL.md §4.1).
export function PersonalInfoForm({ profile }: { profile: PtProfile }) {
  const mutation = useUpdatePtProfile();

  const form = useForm<PtProfileForm>({
    resolver: zodResolver(ptProfileSchema),
    defaultValues: {
      nama: profile.nama,
      email: profile.email,
      tempatGym: profile.tempatGym,
      gender: profile.gender,
      usia: profile.usia,
      spesialisasi: profile.spesialisasi,
      bio: profile.bio,
    },
  });

  const bio =
    useWatch({ control: form.control, name: "bio" }) ?? "";

  function onSubmit(values: PtProfileForm) {
    mutation.mutate(values);
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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Alamat Email</FieldLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="rounded-card pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
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
                  <div className="flex flex-wrap items-center gap-2">
                    {field.value.map((value) => (
                      <span
                        key={value}
                        className="inline-flex items-center gap-1.5 rounded-pill bg-accent-indigo/10 px-3 py-1 text-[10px] font-bold text-ink-soft"
                      >
                        {value}
                        <button
                          type="button"
                          aria-label={`Hapus ${value}`}
                          onClick={() =>
                            field.onChange(
                              field.value.filter((item) => item !== value)
                            )
                          }
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                    <AddSpecialty
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Bio / Coaching Philosophy */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FieldLabel
                  tone="muted"
                  tag={`${bio.length} / ${BIO_MAX_LENGTH} karakter`}
                >
                  Bio / Filosofi Bimbingan
                </FieldLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[119px] rounded-card"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  Ringkasan filosofi ini tampil di awal alur onboarding atletmu.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

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

const TAG_TONES = {
  indigo: "text-accent-indigo",
  success: "text-success",
  muted: "text-muted-foreground",
} as const;

function FieldLabel({
  children,
  tag,
  tone = "indigo",
}: {
  children: React.ReactNode;
  tag?: string;
  tone?: keyof typeof TAG_TONES;
}) {
  return (
    <FormLabel className="flex items-center justify-between text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
      <span>{children}</span>
      {tag && <span className={TAG_TONES[tone]}>{tag}</span>}
    </FormLabel>
  );
}

function AddSpecialty({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const remaining = SPECIALIZATION_OPTIONS.filter(
    (option) => !value.includes(option)
  );

  if (remaining.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded-pill bg-surface-3 px-3 py-1 text-[10px] font-semibold text-ink-soft transition-colors hover:bg-surface-4"
      >
        <Plus className="size-3" />
        Tambah Spesialisasi
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-52 rounded-card border border-outline/40 bg-white p-1 shadow-card">
          {remaining.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange([...value, option]);
                setOpen(false);
              }}
              className="block w-full rounded px-2 py-1.5 text-left text-xs text-ink transition-colors hover:bg-surface-tint"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
