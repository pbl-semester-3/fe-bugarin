import { api } from "@/services/api";
import type { ClientRow, TrainerRow } from "@/types/admin";

// Bentuk item GET /admin/users?role=klien (klien nonaktif sudah difilter backend).
type AdminKlienApiItem = {
  id: number;
  email: string;
  username: string;
  isActive: boolean;
  klienProfile: {
    nama: string;
    usia: number | null;
    jenisKelamin: "pria" | "wanita" | null;
    tinggiBadanCm: number | null;
    alergiMakanan: string | null;
    ptId: number | null;
    ptNama: string | null;
    tujuan: "turun_bb" | "naik_bb" | null;
    progress: number;
    fotoUrl: string | null;
  } | null;
};

function toClientRow(item: AdminKlienApiItem): ClientRow {
  const profile = item.klienProfile;

  return {
    id: item.id,
    name: profile?.nama ?? item.username,
    email: item.email,
    photoUrl: profile?.fotoUrl ?? null,
    trainer: profile?.ptNama ?? null,
    program:
      profile?.tujuan === "naik_bb"
        ? "Naik Berat Badan"
        : profile?.tujuan === "turun_bb"
          ? "Turun Berat Badan"
          : null,
    progress: profile?.progress ?? 0,
    // Status hanya 2: AKTIF setelah PT menyetujui pairing (ptId terisi).
    status: profile?.ptId ? "AKTIF" : "ONBOARDING",
  };
}

// GET /admin/users?role=klien
export async function getAdminKlien() {
  const res = await api.get<{ data: AdminKlienApiItem[] }>(
    "/admin/users?role=klien"
  );
  return res.data.data.map(toClientRow);
}

// Bentuk item GET /admin/users?role=pt (field PT sudah termasuk di backend).
type AdminPtApiItem = {
  id: number;
  email: string;
  username: string;
  isActive: boolean;
  createdAt?: string;
  trainerId?: string;
  ptProfile: {
    nama: string | null;
    spesialisasi: "turun_bb" | "naik_bb";
    tempatGym: string | null;
    whatsapp: string | null;
    fotoUrl: string | null;
  } | null;
};

function toTrainerRow(item: AdminPtApiItem): TrainerRow {
  const profile = item.ptProfile;
  const gym = profile?.tempatGym ?? "-";

  return {
    id: item.id,
    name: profile?.nama ?? item.username,
    trainerId:
      item.trainerId ?? `PT-BGR-${String(item.id).padStart(4, "0")}`,
    hub: gym,
    specialization:
      profile?.spesialisasi === "naik_bb" ? "Naik BB" : "Turun BB",
    email: item.email,
    createdAt: item.createdAt ?? "",
    status: item.isActive ? "AKTIF" : "NONAKTIF",
    branch: gym,
    photoUrl: profile?.fotoUrl ?? null,
    whatsapp: profile?.whatsapp ?? null,
  };
}

// GET /admin/users?role=pt
export async function getAdminTrainers() {
  const res = await api.get<{ data: AdminPtApiItem[] }>(
    "/admin/users?role=pt"
  );
  return res.data.data.map(toTrainerRow);
}

// DELETE /admin/users/:id (soft-delete di backend).
export async function deleteAdminUser(id: number) {
  await api.delete(`/admin/users/${id}`);
}

type UpdateTrainerPayload = {
  id: number;
  nama?: string;
  email?: string;
  username?: string;
  password?: string;
  whatsapp?: string;
  tempatGym?: string;
  isActive?: boolean;
};

// PUT /admin/users/:id — profil PT dan/atau status aktif.
export async function updateAdminTrainer({
  id,
  ...payload
}: UpdateTrainerPayload) {
  const res = await api.put<{ data: { id: number; isActive: boolean } }>(
    `/admin/users/${id}`,
    payload
  );
  return res.data.data;
}

export type CreateTrainerPayload = {
  nama: string;
  email: string;
  password: string;
  whatsapp: string;
  jenisKelamin: "pria" | "wanita";
  tempatGym: string;
  spesialisasi: "turun_bb" | "naik_bb";
};

type CreateTrainerResponse = {
  id: number;
  email: string;
  username: string;
  role: "pt";
  ptProfile: {
    nama: string;
    usia: number | null;
    jenisKelamin: "pria" | "wanita" | null;
    whatsapp: string | null;
    tempatGym: string | null;
    spesialisasi: "turun_bb" | "naik_bb" | null;
  } | null;
};

// POST /admin/users/pt — username di-generate backend, password dari admin.
export async function createAdminTrainer(payload: CreateTrainerPayload) {
  const res = await api.post<{ data: CreateTrainerResponse }>(
    "/admin/users/pt",
    payload
  );
  return res.data.data;
}

export type AdminKlienDetail = {
  id: number;
  email: string;
  username: string;
  isActive: boolean;
  klienProfile: {
    nama: string;
    usia: number | null;
    jenisKelamin: "pria" | "wanita" | null;
    tinggiBadanCm: number | null;
    alergiMakanan: string | null;
    ptId: number | null;
    ptNama: string | null;
    fotoUrl: string | null;
    tujuan: "turun_bb" | "naik_bb" | null;
    progress: number;
  };
  activeCycle: {
    id: number;
    bbAwalKg: number;
    bbTujuanKg: number;
    tujuan: "turun_bb" | "naik_bb";
    durasiHari: number;
    targetKaloriPerHari: number;
    streak: number;
    status: "aktif" | "selesai";
    tanggalMulai: string;
  } | null;
  bbSekarangKg: number | null;
  weightLogs: { id: number; beratBadanKg: number; tanggal: string }[];
};

// GET /admin/users/:id — detail read-only klien untuk modal "Lihat".
export async function getAdminKlienDetail(id: number) {
  const res = await api.get<{ data: AdminKlienDetail }>(`/admin/users/${id}`);
  return res.data.data;
}
