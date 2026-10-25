"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  Dumbbell,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Users,
} from "lucide-react";
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
import { useUpdatePtProfile } from "@/hooks/usePtProfile";
import {
  genderLabel,
  tujuanLabel,
  type PtProfile,
} from "@/lib/types/pt";
import {
  ptProfileSchema,
  type PtProfileForm,
} from "@/lib/schemas/pt-profile.schema";

// Section 1 — Personal Information (design/PROFIL.md §4.1).
// Editable PT: nama, usia, whatsapp. Read-only (hanya Admin): email, username,
// jenisKelamin, tempatGym, spesialisasi.
export function PersonalInfoForm({ profile }: { profile: PtProfile }) {
  const mutation = useUpdatePtProfile();

  const form = useForm<PtProfileForm>({
    resolver: zodResolver(ptProfileSchema),
    defaultValues: {
      nama: profile.profile.nama,
      usia: profile.profile.usia ?? 13,
      whatsapp: profile.profile.whatsapp ?? "",
    },
  });

  function onSubmit(values: PtProfileForm) {
    mutation.mutate(
      {
        nama: values.nama,
        usia: values.usia,
        // Kosong = jangan kirim (backend tidak menerima string kosong).
        ...(values.whatsapp.trim() ? { whatsapp: values.whatsapp.trim() } : {}),
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

            <ReadOnlyField
              label="Alamat Email"
              icon={<Mail className="size-4" />}
              value={profile.user.email}
            />

            <ReadOnlyField
              label="Username"
              icon={<Lock className="size-4" />}
              value={`@${profile.user.username}`}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Nomor WhatsApp</FieldLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="rounded-card pl-10"
                        placeholder="+6281234567890"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ReadOnlyField
              label="Jenis Kelamin"
              icon={<Users className="size-4" />}
              value={genderLabel(profile.profile.jenisKelamin)}
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

            <ReadOnlyField
              label="Lokasi Gym"
              icon={<MapPin className="size-4" />}
              value={profile.profile.tempatGym ?? "-"}
            />

            <ReadOnlyField
              label="Spesialisasi"
              icon={<Dumbbell className="size-4" />}
              value={tujuanLabel(profile.profile.spesialisasi)}
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

function ReadOnlyField({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
        {label} (read-only)
      </p>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input
          className="rounded-card bg-surface-2 pl-10"
          value={value}
          disabled
          readOnly
        />
      </div>
    </div>
  );
}
