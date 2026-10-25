import { UsersView } from "@/components/admin/users/users-view";

// Kelola Pengguna (design/admin/kelola-pengguna.md). Tab default: Klien.
export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  return <UsersView initialTab={tab === "pt" ? "pt" : "klien"} />;
}
