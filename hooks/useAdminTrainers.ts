import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { TrainerRow } from "@/lib/types/admin";

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
export function useAdminTrainers() {
  return useQuery({
    queryKey: queryKeys.admin.users("pt"),
    queryFn: () =>
      api
        .get<{ data: AdminPtApiItem[] }>("/admin/users?role=pt")
        .then((r) => r.data.data.map(toTrainerRow)),
  });
}

// DELETE /admin/users/:id (soft-delete di backend: hilang dari daftar).
export function useDeleteTrainer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/users/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.users("pt") });
      qc.invalidateQueries({ queryKey: queryKeys.admin.dashboard });
    },
  });
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
export function useUpdateTrainer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateTrainerPayload) =>
      api.put<{ data: { id: number; isActive: boolean } }>(
        `/admin/users/${id}`,
        payload
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.users("pt") });
      qc.invalidateQueries({ queryKey: queryKeys.admin.dashboard });
    },
  });
}

// POST /auth/forgot-password — kirim kode reset ke email PT.
export function useSendTrainerResetCode() {
  return useMutation({
    mutationFn: (email: string) =>
      api.post<{ data: string }>("/auth/forgot-password", { email }),
  });
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
export function useCreateTrainer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTrainerPayload) =>
      api.post<{ data: CreateTrainerResponse }>("/admin/users/pt", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.users("pt") });
      qc.invalidateQueries({ queryKey: queryKeys.admin.dashboard });
    },
  });
}
