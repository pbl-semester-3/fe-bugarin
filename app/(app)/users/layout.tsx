import { redirect } from "next/navigation";
import { getMe } from "@/services/auth.server";

// /users hanya untuk Admin.
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) redirect("/login");
  if (me.role !== "admin") redirect("/dashboard");

  return children;
}
