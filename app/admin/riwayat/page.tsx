import { RiwayatView } from "@/components/admin/riwayat/riwayat-view";

// Riwayat Admin (design/admin/riwayat.md). Tab default: Daftar PT.
export default async function AdminRiwayatPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  return <RiwayatView initialTab={tab === "audit" ? "audit" : "pt"} />;
}
