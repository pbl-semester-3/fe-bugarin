import { FeedbackView } from "@/components/pt/feedback/feedback-view";
import { PageHeader } from "@/components/pt/page-header";

// Feedback Center (design/FEEDBACK.md). Klien terpilih dari query `?klien=<id>`
// yang dikirim ikon komen di kartu halaman Klien.
export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ klien?: string }>;
}) {
  const { klien: klienParam } = await searchParams;
  const parsed = klienParam ? Number(klienParam) : Number.NaN;
  const initialKlienId =
    Number.isFinite(parsed) && parsed > 0 ? parsed : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feedback Center"
        description="Real-time biometrics evaluation, video analysis reviews, and coaching dispatch."
      />
      <FeedbackView
        key={initialKlienId ?? "none"}
        initialKlienId={initialKlienId}
      />
    </div>
  );
}
