import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

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
export function useAdminKlienDetail(id: number | null) {
  return useQuery({
    queryKey: ["admin", "users", "klien", id, "detail"],
    enabled: typeof id === "number" && id > 0,
    queryFn: () =>
      api
        .get<{ data: AdminKlienDetail }>(`/admin/users/${id}`)
        .then((r) => r.data.data),
  });
}
