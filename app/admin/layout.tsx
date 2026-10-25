import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AdminShell } from "@/components/shell/admin-shell";

// TODO: ganti fetch dummy ini dengan panggilan nyata ke GET /admin/profile.
async function getRole(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  return "admin";
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = await getRole();
  if (role !== "admin") redirect("/login");

  return <AdminShell>{children}</AdminShell>;
}
