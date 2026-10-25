import { useQuery } from "@tanstack/react-query";
import { mockAdminRiwayat } from "@/lib/mock/admin";
import { queryKeys } from "@/lib/query-keys";

// TODO(integrasi): ganti queryFn ke GET /admin/riwayat lalu hapus mock.
export function useAdminRiwayat() {
  return useQuery({
    queryKey: queryKeys.admin.riwayat,
    queryFn: () => Promise.resolve(mockAdminRiwayat),
  });
}
