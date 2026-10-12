import { Camera, Upload } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import type { PtProfile } from "@/lib/types/pt";

// Profile Identity Card (design/PROFIL.md §3).
export function ProfileIdentityCard({ profile }: { profile: PtProfile }) {
  return (
    <section className="overflow-hidden rounded-panel bg-white shadow-card">
      <div className="h-28 bg-primary" />

      <div className="px-6 pb-6">
        <div className="relative -mt-14 ml-2 w-fit">
          <span
            aria-hidden
            className="absolute -inset-2 rounded-full bg-accent-indigo/30"
          />
          <span className="relative block rounded-full bg-white p-1">
            <Avatar name={profile.profile.nama} size={104} />
          </span>
          <button
            type="button"
            aria-label="Ganti foto profil"
            className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full bg-white shadow-card"
          >
            <Camera className="size-4 text-brand" />
          </button>
        </div>

        <h2 className="mt-4 text-lg font-extrabold text-ink">
          Coach {profile.profile.nama}
        </h2>
        <p className="text-xs font-bold tracking-wide text-ink">
          @{profile.user.username}
        </p>

        <button
          type="button"
          className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-pill bg-surface-2 text-xs font-bold text-ink transition-colors hover:bg-surface-3"
        >
          <Upload className="size-3.5 text-brand" />
          Ganti Foto
        </button>
      </div>
    </section>
  );
}
