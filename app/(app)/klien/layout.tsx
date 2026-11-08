import { redirect } from "next/navigation";
import { getMe } from "@/services/auth.server";

// /klien hanya untuk PT.
export default async function KlienLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) redirect("/login");
  if (me.role !== "pt") redirect("/dashboard");

  return children;
}
