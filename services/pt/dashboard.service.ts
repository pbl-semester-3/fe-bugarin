import { api } from "@/services/api";
import type { DashboardSummary } from "@/types/pt";

// GET /pt/dashboard-summary
export async function getDashboardSummary() {
  const res = await api.get<{ data: DashboardSummary }>("/pt/dashboard-summary");
  return res.data.data;
}
