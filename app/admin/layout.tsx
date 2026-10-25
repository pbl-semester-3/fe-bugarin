import { redirect } from "next/navigation";
import { AdminShell } from "@/components/shell/admin-shell";
import { getMe } from "@/lib/auth";

// Guard lapisan kedua (setelah proxy.ts): validasi role asli dari GET /auth/me.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) redirect("/login");
  if (me.role !== "admin") {
    redirect(me.role === "pt" ? "/pt/dashboard" : "/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
