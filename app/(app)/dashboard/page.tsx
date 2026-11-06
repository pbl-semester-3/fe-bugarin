import { redirect } from "next/navigation";
import { AdminDashboardView } from "./components/admin/admin-dashboard-view";
import { PtDashboardView } from "./components/pt/pt-dashboard-view";
import { getMe } from "@/services/auth.server";

// Halaman dashboard shared: view dipilih dari role session server.
export default async function DashboardPage() {
  const me = await getMe();

  if (!me) redirect("/login");
  if (me.role === "admin") return <AdminDashboardView />;
  if (me.role === "pt") return <PtDashboardView />;
  redirect("/login");
}
