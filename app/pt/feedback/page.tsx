import { PageHeader } from "@/components/pt/page-header";
import { getKlienById } from "@/lib/mock/klien";

// Feedback Center (PRD bab 4.5). Klien terpilih datang dari query `?klien=<id>`
// yang dikirim ikon komen di kartu halaman Klien.
export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ klien?: string }>;
}) {
  const { klien: klienParam } = await searchParams;
  const selected = klienParam ? getKlienById(Number(klienParam)) : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feedback Center"
        description="Real-time biometrics evaluation, video analysis reviews, and coaching dispatch."
      />

      {selected ? (
        <div className="rounded-card bg-white p-6 shadow-card">
          <p className="text-sm text-muted-foreground">Menulis feedback untuk</p>
          <p className="text-xl font-semibold text-ink">{selected.nama}</p>
          {/* TODO: form textarea + POST /pt/klien/:id/feedbacks (PRD bab 4.5). */}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Pilih klien dari halaman Klien (ikon komen) untuk mulai menulis
          feedback.
        </p>
      )}
    </div>
  );
}
