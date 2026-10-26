import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { AdminDashboardData } from "@/lib/types/admin";

// GET /admin/dashboard-summary
export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.admin.dashboard,
    queryFn: () =>
      api
        .get<{ data: AdminDashboardData }>("/admin/dashboard-summary")
        .then((r) => r.data.data),
  });
}
