// TODO slicing: info klien, grafik BB (Recharts), review weekly plan
// (GET /pt/klien/:id & /pt/klien/:id/weekly-plan — PRD bab 4.3).
export default async function KlienDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Detail Klien #{id}</h1>
      <p className="text-sm text-muted-foreground">
        Placeholder — menunggu slicing UI dari Figma.
      </p>
    </div>
  );
}
