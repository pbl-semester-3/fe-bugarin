import { redirect } from "next/navigation";
import { RiwayatView as AdminRiwayatView } from "@/app/(app)/riwayat/components/admin/riwayat-view";
import { PtRiwayatPage } from "./components/pt/pt-riwayat-page";
import { getMe } from "@/services/auth.server";

// Halaman riwayat shared: view dipilih dari role session server.
export default async function RiwayatPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ tab }, me] = await Promise.all([searchParams, getMe()]);

  if (!me) redirect("/login");
  if (me.role === "admin") {
    return <AdminRiwayatView initialTab={tab === "audit" ? "audit" : "pt"} />;
  }
  if (me.role === "pt") return <PtRiwayatPage />;
  redirect("/login");
}
