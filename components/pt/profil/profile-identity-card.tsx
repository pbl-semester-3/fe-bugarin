"use client";

import { useRef, useState } from "react";
import { Camera, Trash2, Upload } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { Button } from "@/components/ui/button";
import { useDeletePtPhoto, useUploadPtPhoto } from "@/hooks/usePtPhoto";
import { apiErrorMessage } from "@/lib/api";
import type { PtProfile } from "@/lib/types/pt";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

// Profile Identity Card (design/PROFIL.md §3) + wiring upload/hapus foto.
export function ProfileIdentityCard({ profile }: { profile: PtProfile }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = useUploadPtPhoto();
  const deletePhoto = useDeletePtPhoto();
  const fotoUrl = profile.profile.fotoUrl;

  function pilihFile() {
    inputRef.current?.click();
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // agar file yang sama bisa dipilih lagi
    if (!file) return;

    if (!ALLOWED_MIME.includes(file.type)) {
      setError("Format foto harus JPEG, PNG, atau WEBP.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Ukuran foto maksimal 2 MB.");
      return;
    }

    setError(null);
    upload.mutate(file, {
      onError: (err) => setError(apiErrorMessage(err)),
    });
  }

  function hapusFoto() {
    setError(null);
    deletePhoto.mutate(undefined, {
      onError: (err) => setError(apiErrorMessage(err)),
    });
  }

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
            <Avatar
              name={profile.profile.nama}
              src={fotoUrl}
              size={104}
            />
          </span>
          <button
            type="button"
            aria-label="Ganti foto profil"
            onClick={pilihFile}
            disabled={upload.isPending}
            className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full bg-white shadow-card disabled:opacity-60"
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

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/jpeg,image/png,image/webp"
          onChange={onChange}
        />

        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1 rounded-pill bg-surface-2 hover:bg-surface-3"
            onClick={pilihFile}
            disabled={upload.isPending}
          >
            <Upload className="size-3.5 text-brand" />
            {upload.isPending ? "Mengunggah..." : "Ganti Foto"}
          </Button>
          {fotoUrl && (
            <Button
              type="button"
              variant="ghost"
              className="rounded-pill text-danger-strong hover:bg-danger-container/40"
              onClick={hapusFoto}
              disabled={deletePhoto.isPending}
            >
              <Trash2 className="size-3.5" />
              Hapus Foto
            </Button>
          )}
        </div>

        {error && <p className="mt-2 text-xs text-danger-strong">{error}</p>}
      </div>
    </section>
  );
}
