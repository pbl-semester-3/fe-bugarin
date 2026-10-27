import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { ClientRow } from "@/lib/types/admin";

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
export function useAdminKlien() {
  return useQuery({
    queryKey: queryKeys.admin.users("klien"),
    queryFn: () =>
      api
        .get<{ data: AdminKlienApiItem[] }>("/admin/users?role=klien")
        .then((r) => r.data.data.map(toClientRow)),
  });
}

// DELETE /admin/users/:id (soft-delete: klien hilang dari daftar).
export function useDeleteKlien() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/users/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.users("klien") });
      qc.invalidateQueries({ queryKey: queryKeys.admin.dashboard });
    },
  });
}
