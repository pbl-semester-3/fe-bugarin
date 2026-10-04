import { Avatar } from "@/components/pt/avatar";
import type { FeedbackThread } from "@/lib/mock/feedback";
import type { Klien } from "@/lib/mock/klien";

// Kartu profil atlet (design/FEEDBACK.md §4.1).
export function AthleteCard({
  klien,
  thread,
}: {
  klien: Klien;
  thread: FeedbackThread;
}) {
  return (
    <section className="flex items-center gap-4 rounded-panel bg-white p-6 shadow-card">
      <Avatar name={klien.nama} size={64} shape="square" />
      <div className="min-w-0">
        <h2 className="text-[22px] leading-snug font-bold tracking-[-0.33px] text-ink">
          {klien.nama}
        </h2>
        <p className="text-xs font-medium text-muted-foreground">
          Minggu {thread.week}/{thread.totalWeeks} • Target Makro:{" "}
          {thread.macroTarget}
        </p>
      </div>
    </section>
  );
}
