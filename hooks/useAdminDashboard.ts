import { useQuery } from "@tanstack/react-query";
import { mockAdminDashboard } from "@/lib/mock/admin";
import { queryKeys } from "@/lib/query-keys";

// TODO(integrasi): ganti queryFn ke GET /admin/dashboard-summary lalu hapus mock.
export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.admin.dashboard,
    queryFn: () => Promise.resolve(mockAdminDashboard),
  });
}
