import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getAdminRiwayat } from "@/services/admin/riwayat.service";

// GET /admin/riwayat — ambil batch besar lalu filter/pagination di client.
export function useAdminRiwayat() {
  return useQuery({
    queryKey: queryKeys.admin.riwayat,
    queryFn: getAdminRiwayat,
  });
}
