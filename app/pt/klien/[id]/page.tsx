import { KlienDetail } from "@/components/pt/klien-detail";

// "View Full Profile & Program" — profil klien + program hasil generate AI.
export default async function KlienDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <KlienDetail id={Number(id)} />;
}
