import { Hourglass, Zap } from "lucide-react";
import { EmptyState } from "@/components/pt/empty-state";
import { Badge } from "@/components/ui/badge";
import type { DashboardSummary } from "@/lib/types/pt";
import { SessionRow } from "./session-row";

// Kartu "Jadwal Latihan Minggu Ini" (design/DASHBOARD.md, disederhanakan).
export function ScheduleCard({ data }: { data: DashboardSummary }) {
  const jadwal = data.jadwalLatihan;

  return (
    <section className="rounded-card bg-white p-6 shadow-card">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-ink">
          Jadwal Latihan Minggu Ini
        </h2>
        <Badge variant="ai">
          <Zap className="size-3" />
          Direncanakan AI
        </Badge>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Gabungan jadwal seluruh klien dari weekly plan yang telah disetujui.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {jadwal.length > 0 ? (
          jadwal.map((item, index) => (
            <SessionRow
              key={`${item.klienId}-${item.hari}-${item.jam}-${index}`}
              jadwal={item}
            />
          ))
        ) : (
          <EmptyState
            icon={<Hourglass />}
            title="Belum ada jadwal"
            description="Jadwal akan muncul setelah weekly plan klien disetujui."
          />
        )}
      </div>
    </section>
  );
}
