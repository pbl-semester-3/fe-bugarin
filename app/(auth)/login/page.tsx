import { redirect } from "next/navigation";
import { LoginForm } from "@/app/(auth)/login/components/login-form";
import { getMe } from "@/services/auth.server";

// Server wrapper: sudah login -> langsung ke dashboard sesuai role.
// (Role klien tidak diarahkan ke mana pun; web ini untuk PT/Admin.)
export default async function LoginPage() {
  const me = await getMe();

  if (me?.role === "pt") redirect("/dashboard");
  if (me?.role === "admin") redirect("/dashboard");

  return <LoginForm />;
}
