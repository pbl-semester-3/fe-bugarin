import { api } from "@/services/api";
import type { AdminProfile } from "@/types/admin";

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
export async function getAdminProfile() {
  const res = await api.get<{ data: AdminProfileApi }>("/admin/profile");
  return toAdminProfile(res.data.data);
}

export type UpdateAdminProfileInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
};

// PUT /admin/profile
export async function updateAdminProfile(payload: UpdateAdminProfileInput) {
  await api.put("/admin/profile", {
    ...(payload.firstName !== undefined
      ? { namaDepan: payload.firstName }
      : {}),
    ...(payload.lastName !== undefined
      ? { namaBelakang: payload.lastName }
      : {}),
    ...(payload.email !== undefined ? { email: payload.email } : {}),
    ...(payload.phone !== undefined ? { phone: payload.phone } : {}),
    ...(payload.bio !== undefined ? { bio: payload.bio } : {}),
  });
}

export type UpdateAdminPasswordInput = {
  currentPassword: string;
  newPassword: string;
};

// PUT /admin/password
export async function updateAdminPassword(payload: UpdateAdminPasswordInput) {
  await api.put("/admin/password", {
    passwordSaatIni: payload.currentPassword,
    passwordBaru: payload.newPassword,
  });
}

// PUT /admin/theme
export async function updateAdminTema(tema: "siang" | "malam") {
  await api.put("/admin/theme", { tema });
}
