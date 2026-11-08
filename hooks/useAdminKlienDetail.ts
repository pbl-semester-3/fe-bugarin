import { useQuery } from "@tanstack/react-query";
import { getAdminKlienDetail } from "@/services/admin/users.service";

// GET /admin/users/:id — detail read-only klien untuk modal "Lihat".
export function useAdminKlienDetail(id: number | null) {
  return useQuery({
    queryKey: ["admin", "users", "klien", id, "detail"],
    enabled: typeof id === "number" && id > 0,
    queryFn: () => getAdminKlienDetail(id as number),
  });
}

export type { AdminKlienDetail } from "@/services/admin/users.service";
