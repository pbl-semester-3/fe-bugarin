import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { AdminProfile } from "@/lib/types/admin";

type AdminProfileApi = {
  user: {
    id: number;
    email: string;
    username: string;
    tema: "siang" | "malam";
  };
  profile: {
    nama: string;
    namaDepan?: string;
    namaBelakang?: string;
    phone?: string;
    bio?: string;
    fotoUrl?: string | null;
  };
  updatedAt?: string;
};

function splitNama(nama: string) {
  const parts = nama.trim().split(/\s+/);
  return { depan: parts[0] ?? "", belakang: parts.slice(1).join(" ") };
}

function toAdminProfile(data: AdminProfileApi): AdminProfile {
  const fallback = splitNama(data.profile.nama);
  return {
    firstName: data.profile.namaDepan ?? fallback.depan,
    lastName: data.profile.namaBelakang ?? fallback.belakang,
    email: data.user.email,
    username: data.user.username,
    phone: data.profile.phone ?? "",
    bio: data.profile.bio ?? "",
    photoUrl: data.profile.fotoUrl ?? null,
    role: "ADMIN",
    tema: data.user.tema,
    lastUpdatedAt: data.updatedAt ?? "",
  };
}

// GET /admin/profile
export function useAdminProfile() {
  return useQuery({
    queryKey: queryKeys.admin.profile,
    queryFn: () =>
      api
        .get<{ data: AdminProfileApi }>("/admin/profile")
        .then((r) => toAdminProfile(r.data.data)),
  });
}

export type UpdateAdminProfileInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
};

// PUT /admin/profile
export function useUpdateAdminProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateAdminProfileInput) =>
      api.put("/admin/profile", {
        ...(payload.firstName !== undefined
          ? { namaDepan: payload.firstName }
          : {}),
        ...(payload.lastName !== undefined
          ? { namaBelakang: payload.lastName }
          : {}),
        ...(payload.email !== undefined ? { email: payload.email } : {}),
        ...(payload.phone !== undefined ? { phone: payload.phone } : {}),
        ...(payload.bio !== undefined ? { bio: payload.bio } : {}),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.admin.profile }),
  });
}

export type UpdateAdminPasswordInput = {
  currentPassword: string;
  newPassword: string;
};

// PUT /admin/password
export function useUpdateAdminPassword() {
  return useMutation({
    mutationFn: (payload: UpdateAdminPasswordInput) =>
      api.put("/admin/password", {
        passwordSaatIni: payload.currentPassword,
        passwordBaru: payload.newPassword,
      }),
  });
}

// PUT /admin/theme
export function useUpdateAdminTema() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tema: "siang" | "malam") =>
      api.put("/admin/theme", { tema }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.admin.profile }),
  });
}
