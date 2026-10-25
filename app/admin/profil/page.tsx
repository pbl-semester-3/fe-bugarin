import { ProfilView } from "@/components/admin/profil/profil-view";

// Profil Admin (design/admin/profil.md). Tab default: Informasi Data Diri.
export default async function AdminProfilPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  return <ProfilView initialTab={tab === "keamanan" ? "keamanan" : "info"} />;
}
