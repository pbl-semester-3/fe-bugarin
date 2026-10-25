import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getMe } from "@/lib/auth";

// Server wrapper: sudah login -> langsung ke dashboard sesuai role.
// (Role klien tidak diarahkan ke mana pun; web ini untuk PT/Admin.)
export default async function LoginPage() {
  const me = await getMe();

  if (me?.role === "pt") redirect("/pt/dashboard");
  if (me?.role === "admin") redirect("/admin/dashboard");

  return <LoginForm />;
}
