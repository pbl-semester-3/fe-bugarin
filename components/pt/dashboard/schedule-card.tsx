import { ChevronLeft, ChevronRight, Hourglass, Zap } from "lucide-react";
import { EmptyState } from "@/components/pt/empty-state";
import { Badge } from "@/components/ui/badge";
import type { DashboardSummary } from "@/lib/mock/pt";
import { SessionRow } from "./session-row";
import { WeekStrip } from "./week-strip";

// Kartu "Daily Trajectory & Schedule" (design/DASHBOARD.md §4).
export function ScheduleCard({ data }: { data: DashboardSummary }) {
  // Urutan: sesi terdekat di atas, sesi "done" selalu di paling bawah.
  const sesi = [...data.sesi].sort((a, b) => {
    const aDone = a.status === "done" ? 1 : 0;
    const bDone = b.status === "done" ? 1 : 0;
    if (aDone !== bDone) return aDone - bDone;
    return a.jam.localeCompare(b.jam);
  });

  return (
    <section className="rounded-card bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-ink">
              Trajektori &amp; Jadwal Harian
            </h2>
            <Badge variant="ai">
              <Zap className="size-3" />
              Direncanakan AI
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Urutan latihan disesuaikan otomatis berdasarkan data biometrik dan
            HRV.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Hari sebelumnya"
            className="text-muted-foreground transition-colors hover:text-ink"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="rounded-pill bg-surface-tint px-4 py-1.5 text-xs font-medium text-ink">
            Kamis, 24 Okt
          </span>
          <button
            type="button"
            aria-label="Hari berikutnya"
            className="text-muted-foreground transition-colors hover:text-ink"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <WeekStrip days={data.week} />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {sesi.length > 0 ? (
          sesi.map((item) => <SessionRow key={item.id} session={item} />)
        ) : (
          <EmptyState
            icon={<Hourglass />}
            title="Belum ada sesi hari ini"
            description="Jadwal latihan akan muncul di sini setelah klien terhubung."
          />
        )}
      </div>
    </section>
  );
}
