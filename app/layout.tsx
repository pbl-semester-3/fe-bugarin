import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

  return (
    <div className="flex min-h-screen">
      <nav className="w-56 border-r p-4">
        {/* TODO: nav item Dashboard, CRUD User, Riwayat, Profil */}
        <p className="font-semibold">Bugarin Admin</p>
      </nav>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
