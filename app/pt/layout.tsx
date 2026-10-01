import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PtShell } from "@/components/shell/pt-shell";

// Lapisan kedua setelah proxy.ts: proxy cuma cek "ada token atau tidak",
// layout ini yang cek "role-nya benar untuk grup ini atau tidak".
// TODO: ganti fetch dummy ini dengan panggilan nyata ke GET /pt/profile.
async function getRole(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  // Placeholder — di implementasi nyata, decode/verify atau panggil endpoint profile.
  return "pt";
}

export default async function PtLayout({ children }: { children: React.ReactNode }) {
  const role = await getRole();
  if (role !== "pt") redirect("/login");

  return <PtShell>{children}</PtShell>;
}
