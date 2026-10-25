import { redirect } from "next/navigation";
import { PtShell } from "@/components/shell/pt-shell";
import { getMe } from "@/lib/auth";

// Guard lapisan kedua (setelah proxy.ts): validasi role asli dari GET /auth/me.
export default async function PtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) redirect("/login");
  if (me.role !== "pt") {
    redirect(me.role === "admin" ? "/admin/dashboard" : "/login");
  }

  return <PtShell>{children}</PtShell>;
}
