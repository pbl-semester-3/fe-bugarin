import { redirect } from "next/navigation";
import { getMe } from "@/services/auth.server";

// /verifikasi hanya untuk PT.
export default async function VerifikasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) redirect("/login");
  if (me.role !== "pt") redirect("/dashboard");

  return children;
}
