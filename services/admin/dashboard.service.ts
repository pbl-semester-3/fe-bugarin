import { api } from "@/services/api";
import type { AdminDashboardData } from "@/types/admin";

// GET /admin/dashboard-summary
export async function getAdminDashboard() {
  const res = await api.get<{ data: AdminDashboardData }>(
    "/admin/dashboard-summary"
  );
  return res.data.data;
}
