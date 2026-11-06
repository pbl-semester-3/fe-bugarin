import { redirect } from "next/navigation";
import { ProfilView as AdminProfilView } from "@/app/(app)/profil/components/admin/profil-view";
import { PtProfilPage } from "./components/pt/pt-profil-page";
import { getMe } from "@/services/auth.server";

// Halaman profil shared: view dipilih dari role session server.
export default async function ProfilPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ tab }, me] = await Promise.all([searchParams, getMe()]);

  if (!me) redirect("/login");
  if (me.role === "admin") {
    return <AdminProfilView initialTab={tab === "keamanan" ? "keamanan" : "info"} />;
  }
  if (me.role === "pt") return <PtProfilPage />;
  redirect("/login");
}
