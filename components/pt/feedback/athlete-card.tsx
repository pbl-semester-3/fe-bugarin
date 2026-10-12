import { Avatar } from "@/components/pt/avatar";
import { Badge } from "@/components/ui/badge";
import { tujuanLabel, type KlienListItem } from "@/lib/types/pt";

// Kartu profil atlet (design/FEEDBACK.md §4.1). Target tampil sebagai badge
// (merah = Turun BB, hijau = Naik BB) agar konsisten dengan halaman Riwayat.
export function AthleteCard({ klien }: { klien: KlienListItem }) {
  return (
    <section className="flex items-center gap-4 rounded-panel bg-white p-6 shadow-card">
      <Avatar name={klien.nama} size={64} shape="square" />
      <div className="min-w-0">
        <h2 className="text-[22px] leading-snug font-bold tracking-[-0.33px] text-ink">
          {klien.nama}
        </h2>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {klien.durasiHari !== null && (
            <>
              <span className="text-xs font-medium text-muted-foreground">
                {klien.durasiHari} Hari
              </span>
              <span className="text-xs text-muted-foreground">•</span>
            </>
          )}
          <span className="text-xs font-medium text-muted-foreground">
            Target:
          </span>
          <Badge
            variant={
              klien.tujuan === "turun_bb"
                ? "weight-loss"
                : klien.tujuan === "naik_bb"
                  ? "hypertrophy"
                  : "queued"
            }
          >
            {tujuanLabel(klien.tujuan)}
          </Badge>
        </div>
      </div>
    </section>
  );
}
